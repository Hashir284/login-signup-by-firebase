import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  
  const [imageUrl, simageUrl] = useState('');
  const [name, sname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const Profile = (e) => {
    e.preventDefault(); // Pehle hi prevent karenge taake page reload na ho

    if (imageUrl.trim() === '') {
      alert('Plz! enter the image url');
      return;
    }

    setIsLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name.trim() !== '' ? name : auth.currentUser.displayName,
      photoURL: imageUrl,
    })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        alert('Something went wrong!');
      });
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-loginconbg text-white">
        <h1 className="text-xl sm:text-2xl font-bold animate-pulse">Updating Profile...</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 box-border">
      <div 
        className="w-full rounded-xl bg-loginconbg login pt-8 pb-10 px-6 sm:px-9 mx-auto shadow-xl"
        style={{ maxWidth: "420px" }}
      >
        <div className="text-center flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-primary">Hey User</h2>
          <p className="text-sm sm:text-base text-secondary mb-4">Set your Profile's Name and Image</p>
          <img src="/updateprofile/img.png" alt="Profile setup" className="w-24 sm:w-28 max-w-full h-auto mb-5 object-contain" />
        </div>

        <form onSubmit={Profile} autoComplete="off">
          <div className="inputContainer flex gap-3 items-center px-3 mb-4 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
            <FontAwesomeIcon icon={faUser} style={{color: "#475569"}} />
            <input
              className="focus:outline-none py-3 text-input text-sm sm:text-base bg-transparent w-full"
              type="text"
              value={name}
              placeholder="Profile Name"
              id="profileName"
              onChange={(e) => sname(e.target.value)}
            />
          </div>

          <div className="inputContainer flex gap-3 items-center px-3 mb-6 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
            <FontAwesomeIcon icon={faLink} style={{color: "#475569"}} />
            <input
              className="focus:outline-none py-3 text-input text-sm sm:text-base bg-transparent w-full"
              type="url"
              value={imageUrl}
              placeholder="Profile Image URL"
              id="profileUrl"
              onChange={(e) => simageUrl(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="hover:bg-buttonHover transition-all w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer"
          >
            Update Profile
          </button>
        </form>

      </div>
    </div>
  );
};

export default UpdateProfile;