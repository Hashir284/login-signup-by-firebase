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

  const contineWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/');
      }).catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 box-border">
      <div 
        className="w-full rounded-xl bg-loginconbg login pt-8 pb-10 px-6 sm:px-9 mx-auto shadow-xl"
        style={{ maxWidth: "420px" }}
      >
        <div className="text-center flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-primary">Welcome Back</h2>
          <p className="text-sm sm:text-base text-secondary mb-4">Login to your account to continue</p>
          <img src="login.png" alt="" className="w-44 sm:w-64 max-w-full h-auto mb-4 object-contain" />
        </div>

        <form onSubmit={submitData} autoComplete="off">
          <div className="inputContainer flex gap-3 items-center px-3 mb-4 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
            <FontAwesomeIcon icon={faEnvelope} style={{color: "#475569"}} />
            <input
              className="focus:outline-none py-3 text-input text-sm sm:text-base bg-transparent w-full"
              type="email"
              value={email}
              placeholder="Email"
              id="email"
              onChange={(e) => semail(e.target.value)}
            />
          </div>

          <div className="inputContainer flex gap-3 items-center px-3 mb-4 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
            <FontAwesomeIcon icon={faUnlockKeyhole} style={{color: "#475569"}} />
            <input
              className="focus:outline-none py-3 text-input text-sm sm:text-base bg-transparent w-full"
              type="password"
              value={password}
              onChange={(e) => spassword(e.target.value)}
              placeholder="Password"
              id="password"
            />
          </div>

          <div className="flex justify-between items-center mb-6 text-xs sm:text-sm gap-2">
            <label htmlFor="remember" className="text-secondary flex gap-2 items-center cursor-pointer select-none whitespace-nowrap">
              <input type="checkbox" className="h-4 w-4 rounded accent-button cursor-pointer" id="remember"/>
              <span>Remember me</span>
            </label>
            <div className="forget whitespace-nowrap">
              <Link to={"/forget"} className="text-button hover:text-buttonHover hover:underline transition-colors">
                Forget Password?
              </Link>
            </div>
          </div>

          <button type="submit" className="hover:bg-buttonHover transition-all mb-4 w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer">
            Login
          </button>
        </form>

        <div className="link text-secondary text-center text-xs sm:text-sm mt-4">
          Don't have an account? 
          <Link to={"/signup"} className="text-loginLink hover:text-buttonHover hover:underline transition-all font-medium ml-1">
            Sign up
          </Link>
        </div>

        <div className="flex items-center my-4 before:flex-1 before:border-t before:border-slate-700/50 after:flex-1 after:border-t after:border-slate-700/50 text-center text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
          <span className="px-3">OR</span>
        </div>

        <button onClick={contineWithGoogle} className="hover:bg-buttonHover transition-all w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer">
          Continue With Google
        </button>

      </div>
    </div>
  );
};

export default Login;