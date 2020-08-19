//Image upload component to update new image to database --at the moment member of Profile page component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../util/API'
import Btn from '../Btn'
import './style.css'

// base url for Cloudinary query needed to upload images
const url = 'https://api.cloudinary.com/v1_1/yestoskydiving/image/upload';

function ImageForm(props) {
  //handles visibility of this form
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  const handleModalClose = () => {
    props.handleModalClose()
  }

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const onChange = e => {
    setImage(e.target.files[0]);
  };

  // preset codes needed for image upload, depending on which picture uploading
  let preset = "";
  if (props.type === "profilePic") {
    preset = 'guidemeprofilepic';
  } else if ( props.type === "bannerPic") { 
    preset = 'guidemebannerpic'
  } else { 
    preset = 'guidemeadventurepic'}

  // on submit, a new FormData object is constructed
  const onSubmit = async () => {
    console.log("we got here 1")
    const formData = new FormData();
    // the intended image and the preset are appended to the FormData object
    formData.append('file', image);
    formData.append('upload_preset', preset);
    try {
      setLoading(true);
      // axios call is made to cloudinary url in order to load the FormData object, and awaited response is assigned to variable 'res'
      const res = await axios.post(url, formData);
      console.log("we got here 2")
      // from the response received back, the secure url for the image is assigned to variable imageUrl
      const imageUrl = res.data.secure_url;
      console.log(imageUrl)

      // call the route w and the url content
      //IF base on the props.type this call depend of the props.type API.updateBanner(imageUrl)
      if (props.type === "profilePic") {
        API.updatePicture({ profilePictureUrl: imageUrl })
        console.log("imageUrl was sent to backend profilePictureUrl")
      }
      else if (props.type === "bannerPic"){
        API.updateBanner({ profileBannerUrl: imageUrl })
        console.log("imageUrl was sent to backend profileBannerUrl")
      }else{
        console.log("No api calls!");
        props.urlUpdate(imageUrl)
       
      }
      

      setLoading(false);
      setImage(image.data);
      handleModalClose()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={showHideModal} id="exampleModal1">
      <h3>Upload {props.modalTitle}</h3>
      <div className='container'>
        <div className='file-field input-field'>
          <div className='button small expanded'>
            {/* <span>Browse</span> */}
            <input type='file' name='image' onChange={onChange} />
          </div>
        </div>
        <div className='center'>
          <button onClick={onSubmit} className='button small expanded'>
            upload
          </button>
        </div>
      </div>
      {/* close modal button */}
      <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
    </div>
  )
};

export default ImageForm