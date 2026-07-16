import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';

const UpdateProfile = () => {

    const navigate = useNavigate()

    const auth = getAuth()
    const[imageUrl, simageUrl] = useState('')
    const[name, sname] = useState('')

    const Profile = (e) => {
        if(imageUrl.trim() !== ''){
            e.preventDefault()
        updateProfile(auth.currentUser, {
          displayName: name || auth.currentUser.displayName,
          photoURL: imageUrl,
        })
          .then(() => {
            // Profile updated!
            // ...
            navigate('/')
          })
          .catch((error) => {
            console.log(error);
            // An error occurred
            // ...
          });
        }else{alert('Plz! enter the image url')}
      };

  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <div className="create rounded-xl sm:mx-5 sm:m-10 m-9 mx-3 bg-loginconbg login pt-9 pb-7 px-4 sm:px-9">
        <div className="text-center  flex flex-col justify-center items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-primary">Hey User</h2>
      <p className="text-secondary mb-1">Set your Profile's Name and Image</p>
      <img src="/updateprofile/img.png" alt="" className="w-28 relative right-1 inline-block mt-2 mb-5" />
      </div>
      <form onSubmit={Profile} autoComplete="off">
        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-4 text-inputBorder border-2 w-full rounded-md">
                    <FontAwesomeIcon icon={faUser} style={{color: "#475569",}} />
          <input
          className="focus:outline-none py-3 text-input text-base"
            type="text"
            value={name}
            placeholder="Profile Name"
            id=""
            onChange={(e) => {
              sname(e.target.value);
            }}
          />
        </div>
        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-4 text-inputBorder border-2 w-full rounded-md">
                    <FontAwesomeIcon icon={faLink} style={{color: "#475569",}} />
          <input
          className="focus:outline-none py-3 text-input text-base"
            type="url"
            required
            value={imageUrl}
            placeholder="Profile Image URl"
            id=""
            onChange={(e) => {
              simageUrl(e.target.value);
            }}
          />
        </div>
        <div>
          <button type={"submit"} className="hover:bg-buttonHover transition-all  mb-6  inline-block w-full bg-button font-semibold text-white py-3 rounded-lg">
            Update Profile
            </button>
        </div>
      </form>

                  </div>
    </div>
  )
}

export default UpdateProfile

