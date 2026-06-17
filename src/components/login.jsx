import React, { useState } from "react";
import "./CSS/log.css";
import { Link, useNavigate } from "react-router";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, semail] = useState("");
  const [password, spassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

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
          setTimeout(() => {
            navigate("/");
          }, 5000);
        })
        .catch((error) => {
          console.log("errorMessage", error.code);
          console.log("errorCode", error.message);
        });
    }
  };

  const contineWithGoogle = () =>{
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    console.log(error)
  });
  }
  
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

      <div className="link"><br />
        <div className="signup">Don'have an Account <Link to={"/signup"}>Sign up</Link></div>
        <div className="forget"><Link to={"/forget"}>Forget Password?</Link></div>
        <div className="or">or</div> 
        <div>
          <button onClick={contineWithGoogle}>Continue With Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
