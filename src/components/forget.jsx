import React, { useState } from "react";
import "./log.css";
import { Link } from "react-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {
  const auth = getAuth();
  const [email, semail] = useState("");

  const forget = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('check your email')
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        
        // ..
      });
  };

  return (
    <div className="container">
      <h2>Forget</h2>
      <form onSubmit={forget} autoComplete="off">
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            id="iemail"
            onChange={(e) => {
              semail(e.target.value);
            }}
          />
        </div>

        <div>
          <button>Submit</button>
        </div>
      </form>

      <div className="link">
        <Link to={"/login"}>Login with you account</Link>
        <br />
      </div>
    </div>
  );
};

export default Forget;
