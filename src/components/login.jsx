import React, { useState } from "react";
import "./CSS/log.css";
import { Link, useNavigate } from "react-router";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

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
    const provider = new GoogleAuthProvider()
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    navigate('/')
  }).catch((error) => {
    console.log(error)
  });
  }
  
  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <div className="create rounded-xl mx-5 m-10 bg-loginconbg login pt-10 pb-11 px-9">
        <div className="text-center  flex flex-col justify-center items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-primary">Welcome Back</h2>
      <p className="text-secondary mb-1">Login to your account to continue</p>
      <img src="login.png" alt="" className="w-64 relative right-1 inline-block mb-3" />
      </div>
      <form onSubmit={submitData} autoComplete="off">

        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-4 text-inputBorder border-2 w-full rounded-md">
          <FontAwesomeIcon icon={faEnvelope} style={{color: "#475569",}} />
          <input
          className="focus:outline-none py-3 text-input text-base"
            type="email"
            value={email}
            placeholder="Email"
            id="email"
            onChange={(e) => {
              semail(e.target.value);
            }}
          />
        </div>
        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-2 text-inputBorder border-2 w-full rounded-md">
          <FontAwesomeIcon icon={faUnlockKeyhole} style={{color: "#475569",}} />
          <input
          className="focus:outline-none py-3 text-input text-base"
            type="password"
            value={password}
            onChange={(e) => {
              spassword(e.target.value);
            }}
            placeholder="Password"
            id="password"
          />
          </div>

        <div className="flex justify-between mb-5">
         <label htmlFor="remember" className="text-secondary flex gap-1 items-center justify-start"><input type="Checkbox" placeholder="rem" className="h-3 w-3" id="remember"/>
         <span>Remember me</span>
         </label>
          <div className="forget"><Link to={"/forget"} className="text-button hover:text-buttonHover hover:underline">Forget Password?</Link></div>
        </div>
        

        <div>
          <button type={"submit"} className="hover:bg-buttonHover transition-all  mb-6  inline-block w-full bg-button font-semibold text-white py-3 rounded-lg">
            Login
            </button>
        </div>
      </form>

            <div className="link text-secondary text-center">
                    Don't have an account?<Link to={"/signup"} className="text-loginLink hover:text-buttonHover hover:underline transition-all"> Sign up</Link>
                  </div>
                    <div>
                      <div className="or text-center mt-3 text-secondary">OR</div>
                      <button onClick={contineWithGoogle} className="hover:bg-buttonHover transition-all mt-5  inline-block w-full bg-button font-semibold text-white py-3 rounded-lg">Continue With Google</button>
                    </div>
                  </div>
    </div>
  );
};

export default Login;
