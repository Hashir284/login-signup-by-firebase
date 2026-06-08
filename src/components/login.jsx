import React, { useEffect, useState } from "react";
import "./log.css";
import { Link, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { log } from "firebase/firestore/pipelines";

const Login = () => {
  const [email, semail] = useState("");
  const [password, spassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const checkTrim = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Plz! fill all fields");
      return false;
    } else {
      return true;
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    let checkEmpty = checkTrim();

    if (checkEmpty) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          semail("");
          spassword("");
          const user = userCredential.user;
          // console.log(user);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        })
        .catch((error) => {
          alert("Incorrect Email or Password");
          console.log("errorMessage", error.code);
          console.log("errorCode", error.message);
        });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submitData} autoComplete="off">
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
