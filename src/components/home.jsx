import { getAuth, sendEmailVerification } from "firebase/auth";
import "./CSS/dashboard.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Home = ({ change }) => {
  const navigate = useNavigate()
  const auth = getAuth();
  const id = auth.currentUser.uid;
  
  const email = auth.currentUser.email;
  
const [verifyEmail, setVerifyEmail] = useState(
  !auth.currentUser.emailVerified
);
  const [emailVerified, semailVerified] = useState(
    auth.currentUser.emailVerified,
  );
  console.log(auth.currentUser.photoURL);

  const verify = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Check your Email");
        checkEmailVerified()
      })
      .catch((error) => {
        console.log(error);
        alert("Check your Email");
      });
  };

  const checkEmailVerified = () =>{
    const interval = setInterval(async()=>{
      await auth.currentUser.reload()
          if(auth.currentUser.emailVerified){
            semailVerified(auth.currentUser.emailVerified)
            console.log(true);
            clearInterval(interval)
          }else{  
            console.log(false);
          }
        }, 300)
  }

  return (
    <>
    <div className="flex justify-center flex-col items-center min-h-screen">
      <div className="card bg-loginconbg relative flex flex-col items-center pt-11 pb-7 mt-7 rounded-xl px-10">
          {
          auth.currentUser.photoURL
           ? (
            <img className="rounded-full object-cover w-20 h-20 inline-block mb-1"  src={auth.currentUser.photoURL} alt="User Profile" referrerPolicy="no-referrer" loading="lazy"
            onError={(e) => {
              e.target.src = "/4.png";
            }} />
          ) : (<div className="flex justify-center items-center text-white font-semibold text-4xl rounded-full w-20 h-20 bg-red-600 mb-3">{auth.currentUser.displayName.slice(0,1)}</div>)}
  <div title="Edit you Profile" className="absolute cursor-pointer shadow-2xl border m-1 top-24 right-36 w-6 h-6 flex justify-center items-center bg-white rounded-full">
           <FontAwesomeIcon onClick={()=>navigate('./UpdateProfile')} className="w-4 h-4 p-2 hue-rotate-60" icon={faPen} style={{color: "rgb(32, 35, 37)",}} />
  </div>
          <h2 className="pofileName font-bold text-2xl mb-1">{auth.currentUser.displayName}</h2>
          <p className="text-buttonHover mb-5 text-lg font-semibold  cursor-pointer hover:text-button">
            @{email.slice(0, -10)}
          </p>
          <p className="text-secondary mb-1">
            Email Verify: <span>{emailVerified ? "Verified" : "Not "}</span>
          </p>
          <p className="text-secondary mb-2">
            Uid: <span>{id}</span>
          </p>
          <div className="flex flex-col mb-5">
            <Link className="hover:bg-button hover:text-white hover:border-white transition-all mt-5 mb-3 inline-block w-60 text-center border-button text-button border-2 font-semibold py-3 rounded-lg" to="./UpdateProfile">
              {auth.currentUser.photoURL
                ? "Edit your profile picture"
                : "Upload your profile picture"}
            </Link>
            {
            emailVerified ?
            // null ? 
            (
              <Link onClick={async()=>{
                if(!auth.currentUser.photoUrl || !auth.currentUser.emailVerified){
                  await auth.currentUser.reload()
                }
                if(!auth.currentUser.photoURL){
                  alert("Please upload your profile picture before accessing the dashboard")
                }else if(!auth.currentUser.emailVerified){
                  alert("Please verify your email before accessing the dashboard.")
                }else if(!auth.currentUser.emailVerified && !auth.currentUser.photoURL){
                  alert("Please upload your profile picture and verify your email before accessing the dashboard.")
                }
                navigate('/dashboard')
              }} className="hover:bg-button hover:text-white hover:border-white transition-all  inline-block w-60 text-center border-button text-button border-2 mb-3 font-semibold py-3 rounded-lg" to="/dashboard">Go to Dashboard</Link>
            ) : (
              // <div >Please Verify your Account and  to Home Page</div>
              null
            )}
            <button onClick={change} className="hover:bg-buttonHover transition-all inline-block px-9 bg-button font-semibold text-white py-3 rounded-lg">Logout</button>
          </div>
      </div>

    {
      verifyEmail ? 
      <>
      <div className=" pt-11 pb-7 rounded-xl px-10">
            <div className="bg-loginconbg relative flex flex-col items-center pt-11 pb-7 rounded-xl px-10">
              <div>
                { emailVerified ?
                <img className="object-cover w-36 h-36 inline-block mb-3"  src='/verifyemail/img2.png' alt="User Profile" referrerPolicy="no-referrer" loading="lazy"
            onError={(e) => {
              e.target.src = "/4.png";
            }} />
            : 
            <img className="object-cover w-36 h-36 inline-block mb-3"  src='/verifyemail/img.png' alt="User Profile" referrerPolicy="no-referrer" loading="lazy"
        onError={(e) => {
          e.target.src = "/4.png";
        }} />
          }
              </div>

 {  emailVerified ? <h2 className="pofileName font-bold text-2xl mb-3">Email Verified! 🎉</h2>
 : <h2 className="pofileName font-bold text-2xl mb-3">Verify your Email</h2> }
              
              <p className="text-secondary mb-6">
                {  emailVerified ?
<>
<div className="text-center mb-1">Your email has been successfully verified.</div>
<div className="text-center w-50">You can now access your dashboard and enjoy all features.</div></>
:
<>
            <div className="text-center mb-1">Your account is not verified yet.</div>
<div className="text-center w-50">"Please verify your email before accessing the dashboard."</div>
            </>
                }
          </p>
            <div>
              {
                auth.currentUser.emailVerified ? null : <button onClick={verify} className="hover:bg-buttonHover transition-all inline-block px-9 bg-button font-semibold text-white py-3 rounded-lg">Resend Verification Email</button>
              }
            </div>
            </div>
    </div>
      </>
      : null
    }

    </div>
</>
  );
};

export default Home;
