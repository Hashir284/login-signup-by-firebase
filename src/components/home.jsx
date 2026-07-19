import { getAuth, sendEmailVerification } from "firebase/auth";
import "./CSS/dashboard.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Home = ({ change }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  
  const id = user?.uid || "";
  const email = user?.email || "";
  const displayName = user?.displayName || "User";
  
  const [verifyEmail, setVerifyEmail] = useState(!user?.emailVerified);
  const [emailVerified, semailVerified] = useState(user?.emailVerified);

  const verify = () => {
    sendEmailVerification(user)
      .then(() => {
        alert("Verification link sent! Check your email inbox or spam folder.");
        checkEmailVerified();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong or too many requests. Please try again later.");
      });
  };

  const checkEmailVerified = () => {
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        semailVerified(true);
        setVerifyEmail(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-transparent p-4 md:p-6 box-border">
      <div className="w-full max-w-md flex flex-col gap-6 items-center">
        
        <div className="w-full bg-loginconbg relative flex flex-col items-center pt-10 pb-7 rounded-xl px-6 sm:px-10 shadow-xl box-border text-white text-center">
          
          <div className="relative w-20 h-20 mb-3">
            {user?.photoURL ? (
              <img 
                className="rounded-full object-cover w-full h-full border-2 border-button" 
                src={user.photoURL} 
                alt="User Profile" 
                referrerPolicy="no-referrer" 
                loading="lazy"
                onError={(e) => { e.target.src = "/4.png"; }} 
              />
            ) : (
              <div className="flex justify-center items-center text-white font-semibold text-3xl rounded-full w-full h-full bg-red-600 shadow-inner">
                {displayName.slice(0, 1).toUpperCase()}
              </div>
            )}
            
            <div 
              title="Edit your Profile" 
              onClick={() => navigate('./UpdateProfile')}
              className="absolute bottom-0 right-0 w-7 h-7 flex justify-center items-center bg-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform border border-slate-200"
            >
              <FontAwesomeIcon className="w-3.5 h-3.5 text-slate-800" icon={faPen} />
            </div>
          </div>

          <h2 className="font-extrabold text-2xl mb-1 tracking-tight truncate max-w-full">{displayName}</h2>
          <p className="text-buttonHover mb-5 text-sm sm:text-base font-semibold cursor-pointer hover:text-button truncate max-w-full">
            @{email ? email.split('@')[0] : "username"}
          </p>

          <div className="w-full text-left space-y-2 border-t border-slate-700/50 pt-4 mb-5 text-xs sm:text-sm text-secondary">
            <p className="flex justify-between">
              <span>Email Status:</span> 
              <span className={`font-semibold ${emailVerified ? "text-green-400" : "text-amber-400"}`}>
                {emailVerified ? "Verified" : "Not Verified"}
              </span>
            </p>
            <p className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-4">
              <span>UID:</span> 
              <span className="font-mono text-[10px] sm:text-xs text-slate-400 select-all truncate max-w-full">{id}</span>
            </p>
          </div>

          <div className="flex flex-col w-full gap-3">
            <Link 
              className="hover:bg-button hover:text-white hover:border-transparent transition-all w-full text-center border-button text-button border-2 font-semibold py-3 rounded-lg text-sm sm:text-base" 
              to="./UpdateProfile"
            >
              {user?.photoURL ? "Edit Profile Picture" : "Upload Profile Picture"}
            </Link>
            
            {emailVerified && (
              <button 
                onClick={async () => {
                  await user.reload();
                  if (!user.photoURL) {
                    alert("Please upload your profile picture before accessing the dashboard");
                  } else {
                    navigate('/dashboard');
                  }
                }} 
                className="hover:bg-button hover:text-white hover:border-transparent transition-all w-full text-center border-button text-button border-2 font-semibold py-3 rounded-lg text-sm sm:text-base cursor-pointer"
              >
                Go to Dashboard
              </button>
            )}

            <button 
              onClick={change} 
              className="hover:bg-buttonHover transition-all w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {verifyEmail && (
          <div className="w-full bg-loginconbg relative flex flex-col items-center pt-8 pb-8 rounded-xl px-6 sm:px-10 shadow-xl box-border text-white text-center">
            <div className="w-28 h-28 mb-4">
              <img 
                className="object-contain w-full h-full"  
                src={emailVerified ? '/verifyemail/img2.png' : '/verifyemail/img.png'} 
                alt="Verification Status" 
                onError={(e) => { e.target.src = "/4.png"; }} 
              />
            </div>

            <h2 className="font-bold text-xl sm:text-2xl mb-2">
              {emailVerified ? "Email Verified! 🎉" : "Verify your Email"}
            </h2>
            
            <p className="text-secondary text-xs sm:text-sm mb-6 leading-relaxed max-w-xs">
              {emailVerified ? (
                "Your email has been successfully verified. You can now access your dashboard and enjoy all features."
              ) : (
                "Your account is not verified yet. Please verify your email to unlock dashboard access."
              )}
            </p>

            {!emailVerified && (
              <button 
                onClick={verify} 
                className="hover:bg-buttonHover transition-all w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer"
              >
                Resend Verification Email
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;