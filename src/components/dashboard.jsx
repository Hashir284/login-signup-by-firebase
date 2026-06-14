import {
  getAuth,
  sendEmailVerification
} from "firebase/auth";
import "./dashboard.css";
import { Link } from "react-router";
import { useState } from "react";


const Dashboard = ({ change }) => {
  const auth = getAuth();
  const id = auth.currentUser.uid;
  const email = auth.currentUser.email;
  const [emailVerified, semailVerified] = useState(
    auth.currentUser.emailVerified
  );
    console.log(auth.currentUser.displayName);
    console.log(auth.currentUser.uid);
    console.log(auth.currentUser.photoURL);


  const verify = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
        alert('Check your Email')
      })
      .catch((error) => {
        console.log(error);
        alert('Check your Email')
      });
      if(!emailVerified){
      setInterval(()=>{
        semailVerified(auth.currentUser.emailVerified)
        console.log(auth.currentUser.emailVerified);
      }
    ,3000)
  };
}

  return (
    <div>
      <div className="card">
        <div className="grey"></div>
        {auth.currentUser.photoURL ? <div className="shade-green"></div> : null}
        <div className="details">
          <h2>{auth.currentUser.displayName}</h2>
          {auth.currentUser.photoURL ? (
            (<img src={auth.currentUser.photoURL} alt="User Profile" />)
          ) : null}
          <p>
            Email: <span>{email}</span>
          </p>
          <p>
            Email Verify: <span>{emailVerified ? "Verified" : "Not "}</span>
          </p>
          <p>
            Uid: <span>{id}</span>
          </p>
          <button onClick={change}>Logout</button>
          <br />
          <span className="links">
            <Link to="./verifyYourEmail">
              {auth.currentUser.photoURL
                ? "Edit your profile picture"
                : "Upload your profile picture"}
            </Link>
            <br />
            <br />  
           
              {auth.currentUser.emailVerified && auth.currentUser.photoURL
                ?  <Link to='/home'>Go to Home Page </Link>
                : <div>Please Verify your Account to Home Page</div>}
           
          </span>
                {!emailVerified ? <p>
  Email verification is pending.
    <button className="verify" onClick={verify}>Verify now</button>
</p> : null}
 </div>
        <div className="grey"></div>
      </div>
    </div>
    // <div>
    //   <h1>Dashboard</h1>
    //   <br />
    // <button onClick={verify}>Verify you Email</button>
    // </div>
  );
};

export default Dashboard;
