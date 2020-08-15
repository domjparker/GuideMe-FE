import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../util/API'
import Btn from '../Btn'
import './style.css'
// import loadingGif from './spinner.gif';

const url = 'https://api.cloudinary.com/v1_1/yestoskydiving/image/upload';
const preset = 'm5k8tql6';

function ImageForm(props) {

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const onChange = e => {
        setImage(e.target.files[0]);
    };
 let showHideModal = props.show ? 'reveal d-block' : 'reveal d-none'
 const handleModalClose = () => {
    props.handleModalClose()
  }

    const onSubmit = async () => {
        console.log("we got here 1")
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', preset);
        try {
          setLoading(true);
          const res = await axios.post(url, formData);
          console.log("we got here 2")
          const imageUrl = res.data.secure_url;
          console.log(imageUrl)
          const image = await API.updatePicture({profilePictureUrl: imageUrl})
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
        <Btn classes={"close-button"} handleClick={handleModalClose} aria-label={"Close modal"} type={"button"} text={<span aria-hidden="true">&times;</span>}/>
        </div>
    )
};

export default ImageForm