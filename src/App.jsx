import "./App.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Forget from "./components/forget";
import { Navigate, Route, Routes } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import VerifyYourEmail from "./components/verifyYourEmail";
import auth from "./initializeApp";
import { initializeApp } from "firebase/app";
import Home from "./components/home";


function App() {
  

  // https://www.flaticon.com/free-icon/profile_3135715
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  // https://internship-portfolio-deploy.netlify.app/
  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUserLoggedIn(true);
          // ...
        } else {
          setUserLoggedIn(false);
          // User is signed out
          // ...
        }
      });
  }, []);

  const change = () => {
    signOut(auth)
      .then(() => {
        setUserLoggedIn(false);
      })
      .catch((err) => {        
        console.log("error", err);
      });
  };

  if (userLoggedIn === null) {
    return <h1>Loading</h1>;
  }
 
  return (
    <div className="App">
      {userLoggedIn ? (
        <Routes>
          <Route path="/" element={<Dashboard change={change} />} />
          <Route path="/verifyYourEmail" element={<VerifyYourEmail/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to={"/"} />} />
          {auth.currentUser.emailVerified && auth.currentUser.photoURL
                ? <Route path="/home" element={<Home />} />
                : null}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
