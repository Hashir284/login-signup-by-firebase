import React, { useState } from "react";
import "./CSS/log.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";

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
    <div className="w-full min-h-full flex justify-center items-center">
      <div className="create rounded-xl mx-5 m-10 bg-loginconbg login pt-9 pb-10 px-9">
        <div className="text-center  flex flex-col justify-center items-center">
          <img src="/forget/image.png" alt="" className="w-44 h-44" />
<h2 className="text-3xl font-extrabold mb-3 mt-3 text-primary">Forget Password?</h2>
      <p className="text-secondary mb-6">Enter you email and we'll send you link to reset you password</p>
                </div>
      <form onSubmit={forget} autoComplete="off">
        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-7 text-inputBorder border-2 w-full rounded-md">
                  <FontAwesomeIcon icon={faUnlockKeyhole} style={{color: "#475569",}} />
                  <input
                  className="focus:outline-none py-3 text-input text-base w-full"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      semail(e.target.value);
                    }}
                    placeholder="Email"
                    id="password"
                  />
                </div>

        <div>
          <button type={"submit"} className="hover:bg-buttonHover transition-all  mb-6  inline-block w-full bg-button font-semibold text-white py-3 rounded-lg">
            Sent Reset Link
            </button>
        </div>
      </form>

      <div className="forget text-center">Back to <Link to={"/login"} className="text-button hover:text-buttonHover hover:underline">login</Link></div>
    </div>
    </div>
  );
};

export default Forget;
