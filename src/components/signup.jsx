import React, { useState } from "react";
import "./sign.css";
import { Link } from "react-router";
import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Signup = () => {
  const auth = getAuth();
  const [email, semail] = useState("");
  const [password, spassword] = useState("");
  const [name, sname] = useState("");

  const submitData = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      alert("Plz! fill all fields");
    } else if (password.length >= 8) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          window.location = "/dashboard";
          // auth.currentUser = name
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // console.log(userCredential);
        });
    } else {
      alert("Password must great than or equal to 8");
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={submitData}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            id="name"
            onChange={(e) => {
              sname(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            id="email"
            onChange={(e) => {
              semail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              spassword(e.target.value);
            }}
            placeholder="Enter your password"
            id="password"
          />
        </div>
        <div>
          <button type={"submit"}>Create Account</button>
        </div>
      </form>

      <div className="link">
        <Link to={"/"}>Already have an account?</Link>
      </div>
    </div>
  );
};

export default Signup;
