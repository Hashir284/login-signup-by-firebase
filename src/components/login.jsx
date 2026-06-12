import React, { useState } from "react";
import "./log.css";
import { Link, useNavigate } from "react-router";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, semail] = useState("");
  const [password, spassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


  // console.log(auth);

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
          alert("Incorrect Email or Password");
          console.log("errorMessage", error.code);
          console.log("errorCode", error.message);
        });
    }
  };

  const contineWithGoogle = () =>{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    // const token = credential.accessToken;
    // The signed-in user info.
    // const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
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
