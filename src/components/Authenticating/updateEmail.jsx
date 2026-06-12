import React from 'react'
import { getAuth, updateEmail } from "firebase/auth";

const updateEmail = () => {
const auth = getAuth();
updateEmail(auth.currentUser, "user@example.com").then(() => {
  // Email updated!
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

export default updateEmail
