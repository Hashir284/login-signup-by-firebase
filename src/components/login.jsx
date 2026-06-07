import React, { useState } from "react";
import "./log.css";
import { Link } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, semail] = useState("");
  const [password, spassword] = useState("");

  const auth = getAuth();

  const submitData = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("Plz! fill all fields");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          window.location = "/dashboard";
          // Signed in
          const user = userCredential.user;
          console.log(user);
          semail("");
          spassword("");
        })
        .catch((error) => {
          alert("Incorrect Email or Password");
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorMessage", error.code);
          console.log("errorCode", error.message);
        });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submitData}>
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
          <label>Password</label>
          <input
            value={password}
            type="password"
            placeholder="Enter your password"
            id="ipassword"
            onChange={(e) => {
              spassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button type={"submit"}>Login</button>
        </div>
      </form>

      <div className="link">
        <Link to={"/signup"}>Create new account</Link>
      </div>
    </div>
  );
};

export default Login;
