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

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

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


  if (userLoggedIn === null) {
    return <h1>Loading</h1>;
  }


  const change = () => {
    signOut(auth)
      .then(() => {
        setUserLoggedIn(false);
      })
      .catch((err) => {        
        console.log("error", err);
      });
  };

  
  return (
    <div className="App">
      {userLoggedIn ? (
        <Routes>
          <Route path="/" element={<Dashboard change={change} />} />
          <Route path="/verifyYourEmail" element={<VerifyYourEmail/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to={"/"} />} />
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
