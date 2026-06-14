import React from "react";
import "./postCard.css";

const Post = ({ image, title, user, porfileImage }) => {
  return (
    <div className="card">
      <div className="profileId">
        <div className="profileId">
          <div>
            <img src={porfileImage} alt="" className="porfileImage" />
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
        <img src={image} alt="images" className="postImage" />
      </div>
    </div>
  );
};

export default Post;
