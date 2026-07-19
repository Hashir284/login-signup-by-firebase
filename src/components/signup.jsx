import React, { useState } from "react";
// import "./CSS/sign.css";
import { Link, useNavigate } from "react-router";
import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, semail] = useState("");
  const [password, spassword] = useState("");
  const [cpassword, scpassword] = useState("");
  const [name, sname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitData = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      alert("Plz! fill all fields");
      return;
    }
    if (cpassword !== password) {
      alert('Password Not Match');
      return;
    } 
    if (password.length < 8) {
      alert("Password must be greater than or equal to 8 characters");
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "",
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log("Profile update error", error);
            navigate("/"); // Phir bhi navigate karwa rahe hain kyunki account ban gaya hai
          });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.code);
        alert(error.message);
      });
  };

  const contineWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/');
      }).catch((error) => {
        console.log(error.message);
      });
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-loginconbg text-white">
        <h1 className="text-xl sm:text-2xl font-bold animate-pulse">Creating Account...</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 box-border">
      <div 
        className="w-full rounded-xl bg-loginconbg login pt-8 pb-10 px-6 sm:px-9 mx-auto shadow-xl"
        style={{ maxWidth: "420px" }}
      >
        <div className="text-center flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-primary">Create Account</h2>
          <p className="text-sm sm:text-base text-secondary mb-6">Join us and Start sharing your thoughts</p>
        </div>

        <form onSubmit={submitData} autoComplete="off">
          <div className="inputContainer flex gap-3 items-center px-3 mb-4 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
            <FontAwesomeIcon icon={faUser} style={{color: "#475569"}} />
            <input
              className="focus:outline-none py-3 text-input text-sm sm:text-base bg-transparent w-full"
              type="text"
              value={name}
              placeholder="Full name"
              id="name"
              onChange={(e) => sname(e.target.value)}
            />
          </div>

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

          <div className="inputContainer flex gap-3 items-center px-3 mb-6 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
            <FontAwesomeIcon icon={faUnlockKeyhole} style={{color: "#475569"}} />
            <input
              className="focus:outline-none py-3 text-input text-sm sm:text-base bg-transparent w-full"
              type="password"
              value={cpassword}
              onChange={(e) => scpassword(e.target.value)}
              placeholder="Confirm Password"
              id="cpassword"
            />
          </div>

          <button type="submit" className="hover:bg-buttonHover transition-all mb-4 w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer">
            Sign Up
          </button>
        </form>

        <div className="link text-secondary text-center text-xs sm:text-sm mt-4">
          Already have an account? 
          <Link to={"/login"} className="text-loginLink hover:text-buttonHover hover:underline transition-all font-medium ml-1">
            Login
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

export default Signup;