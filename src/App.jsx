import "./App.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import { initializeApp } from "firebase/app";
import { Navigate, Route, Routes } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  console.log(userLoggedIn);
  const firebaseConfig = {
    apiKey: "AIzaSyCjueCq4DqttJW0yqR0LG1MiBz-XfbhHBg",
    authDomain: "login-signup-24a03.firebaseapp.com",
    projectId: "login-signup-24a03",
    storageBucket: "login-signup-24a03.firebasestorage.app",
    messagingSenderId: "486434325542",
    appId: "1:486434325542:web:0620a41a0f68a56fded2e7",
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();

  useEffect(() => {
    {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);

          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(user);
          setUserLoggedIn(true);
          // ...
        } else {
          setUserLoggedIn(false);
          // User is signed out
          // ...
        }
      });
    }
  }, []);

  if (userLoggedIn === null) {
    return <h1>Loading</h1>;
  }

  const change = () => {
    setUserLoggedIn(false);
  };

  return (
    <div className="App">
      {userLoggedIn ? (
        <Routes>
          <Route path="/" element={<Dashboard change={change} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
