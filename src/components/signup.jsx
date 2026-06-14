import React, { useState } from "react";
import "./sign.css";
import { Link, useNavigate } from "react-router";
import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, semail] = useState("");
  const [password, spassword] = useState("");
  const [name, sname] = useState("");
  const [login, slogin] = useState(false);
  // const

  const submitData = (e) => {
    e.preventDefault();
    // slogin(true);
    // const user = auth.currentUser.emailVerified

    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      alert("Plz! fill all fields");
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
          alert(error.code);
        });
    } else {
      alert("Password must great than or equal to 8");
    }
  };

  // const Profile = () => {
  //   updateProfile(auth.currentUser, {
  //     displayName: name,
  //     photoURL: "",
  //   })
  //     .then(() => {
  //       // Profile updated!
  //       // ...
  //     })
  //     .catch((error) => {
  //       // An error occurred
  //       // ...
  //     });
  // };

  if (login) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={submitData}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            id="name"
            onChange={(e) => {
              sname(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            id="email"
            onChange={(e) => {
              semail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              spassword(e.target.value);
            }}
            placeholder="Enter your password"
            id="password"
          />
        </div>
        <div>
          <button type={"submit"}>Create Account</button>
        </div>
      </form>

      <div className="link">
        <Link to={"/"}>Already have an account?</Link>
      </div>
    </div>
  );
};

export default Signup;
