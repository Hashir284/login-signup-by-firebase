import React, { useState } from "react";
import "./CSS/log.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Forget = () => {
  const auth = getAuth();
  const [email, semail] = useState("");
  const navigate = useNavigate();

  const forget = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      alert("Please enter your email address");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Check your email for reset link!');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message); 
      });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 box-border">
      <div 
        className="w-full rounded-xl bg-loginconbg login pt-8 pb-10 px-6 sm:px-9 mx-auto shadow-xl"
        style={{ maxWidth: "420px" }}
      >
        <div className="text-center flex flex-col justify-center items-center">
          <img src="/forget/image.png" alt="Forget Password" className="w-36 h-36 sm:w-44 sm:h-44 object-contain mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-primary">Forget Password?</h2>
          <p className="text-sm sm:text-base text-secondary mb-6 leading-relaxed">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={forget} autoComplete="off">
          <div className="inputContainer flex gap-3 items-center px-3 mb-6 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
            <FontAwesomeIcon icon={faEnvelope} style={{color: "#475569"}} />
            <input
              className="focus:outline-none py-3 text-input text-sm sm:text-base bg-transparent w-full"
              type="email"
              value={email}
              onChange={(e) => semail(e.target.value)}
              placeholder="Email Address"
              id="email"
              required
            />
          </div>

          <button 
            type="submit" 
            className="hover:bg-buttonHover transition-all mb-6 w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        <div className="forget text-center text-sm text-secondary">
          Back to <Link to={"/login"} className="text-button hover:text-buttonHover hover:underline font-medium transition-all ml-1">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Forget;