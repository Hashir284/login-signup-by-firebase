import "./App.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import UpdateProfile from "./components/UpdateProfile";
import Forget from "./components/forget";
import { Navigate, Route, Routes } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "./initializeApp";
import Home from "./components/home";


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
      return (<div className="App w-full flex justify-center items-center h-screen">
         <h1>Loading</h1>;
      </div>)
  }
 
  return (
    <div className="App max-width-1400px bg-loginbg w-full ">
        {userLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home change={change} />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="*" element={<Navigate to={"/"} />} />
          {auth.currentUser.emailVerified && auth.currentUser.photoURL
                ? <Route path="/dashboard" element={<Dashboard />} />
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
