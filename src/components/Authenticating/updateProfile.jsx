import React from 'react'
import { getAuth, updateProfile } from "firebase/auth";

const updateProfile = () => {
const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});

  return (
    <div>
      
    </div>
  )
}

export default updateProfile
