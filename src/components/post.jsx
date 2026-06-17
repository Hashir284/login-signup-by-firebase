import React from "react";
import "./CSS/postCard.css";

const Post = ({ image, title, user, porfileImage }) => {
  return (
    <div className="card">
      <div className="profileId">
        <div className="profileId">
          <div>
            <img src={porfileImage} alt="profile" className="porfileImage"
             referrerPolicy="no-referrer" loading="lazy"
  onError={(e) => {
    e.target.src = "/4.png";
  }}
  />
          </div>
          <div>{user}</div>
        </div>
        <div>
          {/* <button>
            Edit
          </button> */}
        </div>
      </div>
      <div>{title}</div>
      <div>
        <img src={image} alt="post" className="postImage"
         referrerPolicy="no-referrer" loading="lazy"
  onError={(e) => {
    e.target.src = "/default-image.png";
  }}
  />
      </div>
    </div>
  );
};

export default Post;
