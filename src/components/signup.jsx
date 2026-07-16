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
  const [login, slogin] = useState(false);

  const submitData = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      alert("Plz! fill all fields");
    }else if(cpassword != password){
      alert('Password Not Match')
    } else if (password.length >= 8) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "",
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          auth.currentUser.displayName = name;
          const user = userCredential.user;
          console.log(user);
          
          navigate("/");
          slogin(true);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.code);
          console.log(error.message);
        });
    } else {
      alert("Password must great than or equal to 8");
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
      console.log(error.message)
      console.log(error.code)
    });
    }

  if (login) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full min-h-full flex justify-center items-center">
      <div className="create rounded-xl mx-5 m-10 bg-loginconbg login pt-10 pb-11 px-9">
        <div className="text-center  flex flex-col justify-center items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-primary">Create Account</h2>
      <p className="text-secondary mb-5">Join us and Start sharing your thoughts</p>
      </div>
      <form onSubmit={submitData}>
        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-4 text-inputBorder border-2 w-full rounded-md">
          <FontAwesomeIcon icon={faUser} style={{color: "#475569",}} />
          <input
          className="focus:outline-none py-3 text-input text-base"
            type="text"
            value={name}
            placeholder="Full name"
            id="name"
            onChange={(e) => {
              sname(e.target.value);
            }}
          />
        </div>
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
        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-4 text-inputBorder border-2 w-full rounded-md">
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
        <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-7 text-inputBorder border-2 w-full rounded-md">
          <FontAwesomeIcon icon={faUnlockKeyhole} style={{color: "#475569",}} />
          <input
          className="focus:outline-none py-3 text-input text-base"
            type="password"
            value={cpassword}
            onChange={(e) => {
              scpassword(e.target.value);
            }}
            placeholder="Confirm Password"
            id="password"
          />
        </div>
        <div>
          <button type={"submit"} className="hover:bg-buttonHover transition-all  mb-5  inline-block w-full bg-button font-semibold text-white py-3 rounded-lg">Sign Up</button>
        </div>
      </form>

      <div className="link text-secondary text-center">
        Already have an account?<Link to={"/"} className="text-loginLink hover:text-buttonHover hover:underline transition-all"> Login</Link>
      </div>
        <div>
          <div className="or text-center mt-3 text-secondary">OR</div>
          <button onClick={contineWithGoogle} className="hover:bg-buttonHover transition-all mt-5  inline-block w-full bg-button font-semibold text-white py-3 rounded-lg">Continue With Google</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
