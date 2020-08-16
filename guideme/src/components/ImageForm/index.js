import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../util/API'
import Btn from '../Btn'
import './style.css'

// base url for Cloudinary query needed to upload images
const url = 'https://api.cloudinary.com/v1_1/yestoskydiving/image/upload';
// preset code needed for image upload
const preset = 'm5k8tql6';

function ImageForm(props) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadBtn, setUploadBtn] = useState('');
  const onChange = e => {
    setImage(e.target.files[0]);
  };
  // if 'show' property initiated from profile page, show modal
  let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
  //  function to close modal 
  const handleModalClose = () => {
    props.handleModalClose()
  }
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
      if (props.type === "profilePic" ) {
       API.updatePicture({profilePictureUrl: imageUrl})
      }
      else{
        API.updateBanner({profileBannerUrl: imageUrl})
      }

      // const image = await props.axiosURL
      // setUploadBtn('Update Profile Pic')

      setLoading(false);
      setImage(image.data);
      handleModalClose()
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={showHideModal} id="exampleModal1">
      <h1>Upload picture</h1>
      <div className='container'>
        {/* <h1 className='center red-text'>{uploadBtn}</h1> */}
        <div className='file-field input-field'>
          <div className='button'>
            <span>Browse</span>
            <input type='file' name='image' onChange={onChange} />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <div className='center'>
          <button onClick={onSubmit} className='button expanded'>
            upload
                </button>
        </div>
      </div>
      <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>} />
    </div>
  )
};

export default ImageForm