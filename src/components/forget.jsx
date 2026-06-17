import React, { useState } from "react";
import "./CSS/log.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {
  const auth = getAuth();
  const [email, semail] = useState("");

  const navigate = useNavigate()

  const forget = (e) => {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('check your email')
        // Password reset email sent!
        // ..
        navigate('/')
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message); 
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
        <Link ></Link>
        <Link to={"/login"}>Login with you account</Link>
        <br />
      </div>
    </div>
  );
};

export default Forget;
