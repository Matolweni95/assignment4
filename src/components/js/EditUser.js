import React, {useEffect, useState} from 'react';
import '../css/Add.css';
import { Link } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import Home from './Home';



const EditUser = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(`http://localhost:5000/uploads/${user.image}`);
  const [name, setName] = useState(user.name);
  const [job, setJob] = useState(user.job_desc);
  
  const onSubmitForm = async e => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('job', job);
  formData.append('image', selectedImage);

  try {
    const image = selectedImage ? selectedImage.name: null;
    const body = { name, job, image}
    const response = await fetch(`http://localhost:5000/users/${user.user_id}`, {
      method: "PUT",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify(body)
    }) 
    console.log(body)
  
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

const handleImageChange = (e) => {
  e.preventDefault();

  const reader = new FileReader();
  const file = e.target.files[0];

  reader.onloadend = () => {
    setSelectedImage(file);
    setImagePreviewUrl(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  }


};

  return (
    <div className='add'>
      <div className='addbtn__container'>
          <Link to = "/">
          <button className='back_btn'>
              <svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67" fill="none">
                  <path d="M11.1667 33.5L10.8131 33.1464L10.4596 33.5L10.8131 33.8536L11.1667 33.5ZM53.0417 34C53.3178 34 53.5417 33.7761 53.5417 33.5C53.5417 33.2239 53.3178 33 53.0417 33V34ZM27.5631 16.3964L10.8131 33.1464L11.5202 33.8536L28.2702 17.1036L27.5631 16.3964ZM10.8131 33.8536L27.5631 50.6036L28.2702 49.8964L11.5202 33.1464L10.8131 33.8536ZM11.1667 34H53.0417V33H11.1667V34Z" fill="#164B60"/>
              </svg>
          </button>
          </Link>
      </div>
      <form onSubmit={onSubmitForm}>
      <div className='add__container'>
          <div className='image_background'>
            <div className='background__container'>
            {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Selected Preview"
              style={{ width: '100%', height: '200px' }}
              // onError="this.onerror=null;this.src='/path/to/error/image.png';"
            />
          )}
            </div>
          </div>
          <div className='sub__background'>
              <label htmlFor="files">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
              </label>     
          </div>
          <input className='hidden' 
          id='files' 
          accept='image/*'
          type='file'
          onChange={handleImageChange}
          />
          <input placeholder='Name'
          className='form-control'
          value={name}
          onChange={e => setName(e.target.value)}
          />
          <input placeholder='Job Title' 
          className='form-control'
          value={job}
          onChange={e => setJob(e.target.value)}/>
          <button type='submit'>update</button>
      </div>
      </form>
    </div>
  );
  
}

export default EditUser;
