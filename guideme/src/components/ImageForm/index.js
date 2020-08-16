import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../util/API'

const url = 'https://api.cloudinary.com/v1_1/yestoskydiving/image/upload';
const preset = 'm5k8tql6';

function ImageForm(props) {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadBtn, setUploadBtn] = useState('');
    const onChange = e => {
        setImage(e.target.files[0]);
    };

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

            const image = await props.axiosURL
            setUploadBtn('Update Profile Pic')

          setLoading(false);
          setImage(image.data);
        } catch (err) {
          console.error(err);
        }
      };

    return (
        <div className='container'>
            <h1 className='center red-text'>{uploadBtn}</h1>
            <div className='file-field input-field'>
                <div className='btn'>
                    <span>Browse</span>
                    <input type='file' name='image' onChange={onChange} />
                </div>
                <div className='file-path-wrapper'>
                    <input className='file-path validate' type='text' />
                </div>
            </div>
            <div className='center'>
                <button onClick={onSubmit} className='btn center'>
                    upload
                </button>
            </div>
        </div>
    )
};

export default ImageForm