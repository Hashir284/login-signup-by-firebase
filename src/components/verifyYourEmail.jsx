import { getAuth, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';

const VerifyYourEmail = () => {

    const navigate = useNavigate()

    const auth = getAuth()
    const[imageUrl, simageUrl] = useState('')

    const Profile = (e) => {
        if(imageUrl.trim() !== ''){
            e.preventDefault()
        updateProfile(auth.currentUser, {
          displayName: auth.currentUser.displayName,
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
    <div className="container">
      <form onSubmit={Profile} autoComplete="off" >
        <div>
          <label> Set your Profile's Image</label>

          <input
            value={imageUrl}
            type="text"
            placeholder="Enter your Image url"
            id="ipassword"
            onChange={(e) => {
              simageUrl(e.target.value);
            }}
          />
        </div>

        <div>
          <button type={"submit"}>Submit</button>
        </div>
      </form>

      <div className="link">
        <div><Link to={"/"}>Back to Dashboard</Link></div>
      </div>
    </div>
  )
}

export default VerifyYourEmail
