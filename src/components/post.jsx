import React, { useEffect, useState } from "react";
import "./CSS/postCard.css";
import { collection, addDoc, setDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../initializeApp";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";

const Post = ({ image, title, user, porfileImage, id }) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [eachLike, setEachLike] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  const [eachComment, setEachComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!id || !currentUser) return;

    async function getTotalLikes() {
      try {
        const q = query(collection(db, `Posts/${id}/Likes`), where("like", "==", true));
        const querySnapshot = await getDocs(q);
        let allLikes = [];
        
        querySnapshot.forEach((doc) => {
          if (doc.id === currentUser.email) {
            setEachLike(true);
          }
          allLikes.push(doc.data());
        });

        setTotalLikes(allLikes.length);
      } catch (err) {
        console.error(err);
      }
    }

    getTotalLikes();
    getComments();
  }, [id, currentUser]);    

  async function like() {
    if (!currentUser) return;

    let newLike = !eachLike;
    setEachLike(newLike);
    
    if (newLike) {
      setTotalLikes(prev => prev + 1);
    } else {
      setTotalLikes(prev => (prev > 0 ? prev - 1 : 0));
    }

    try {
      await setDoc(doc(db, `Posts/${id}/Likes`, currentUser.email), {
        like: newLike
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function addComment() {
    if (!currentUser || eachComment.trim() === '') return;

    const commentText = eachComment;
    const commentUser = currentUser.displayName || "Anonymous";

    setEachComment('');

    try {
      const docRef = await addDoc(collection(db, `Posts/${id}/Comments`), {
        user: commentUser,
        eachComment: commentText,
        createdAt: new Date().toISOString()
      });

      setAllComments(prev => [...prev, { id: docRef.id, user: commentUser, eachComment: commentText }]);
    } catch (err) {
      console.error(err);
    }
  }

  async function getComments() {
    try {
      const q = query(collection(db, `Posts/${id}/Comments`));
      const querySnapshot = await getDocs(q);
      let allComment = [];
      
      querySnapshot.forEach((doc) => {
        allComment.push({ id: doc.id, ...doc.data() });
      });
      
      setAllComments(allComment);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card text-primary w-full max-w-md p-4 sm:p-6 pb-4 bg-loginconbg rounded-xl shadow-lg box-border">
      
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="profileId flex gap-3 items-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
              <img 
                src={porfileImage || "/4.png"} 
                alt="profile" 
                className="rounded-full w-full h-full object-cover border border-slate-700"
                referrerPolicy="no-referrer" 
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/4.png";
                }}
              />
            </div>
            <div className="font-bold text-base sm:text-lg truncate max-w-[180px] sm:max-w-[240px]">{user || "Anonymous"}</div>
          </div>
          <button className="text-secondary p-1 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
            <FontAwesomeIcon className="text-secondary" icon={faEllipsis} />
          </button>
        </div>
      </div>

      <div className="mb-3 text-sm sm:text-base break-words px-1">{title}</div>
      
      <div className="w-full border border-slate-800 rounded-lg overflow-hidden bg-black/20 flex justify-center items-center">
        <img 
          src={image} 
          alt="post" 
          className="w-full h-64 sm:h-80 object-cover"
          referrerPolicy="no-referrer" 
          loading="lazy"
          onError={(e) => {
            e.target.src = "/default-image.png";
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center gap-4 px-2 pt-4 border-t border-slate-800 mt-4 text-sm sm:text-base">
        <button 
          onClick={like} 
          className="flex gap-2 justify-center items-center cursor-pointer bg-transparent border-none text-white hover:text-button transition-colors"
        >
          {eachLike ? (
            <img src="blacklike.png" alt="liked" className="w-5 h-5 object-contain filter" />
          ) : (
            <FontAwesomeIcon icon={faThumbsUp} className="w-5 text-secondary h-5" />
          )}
          <span className="font-semibold text-primary">{totalLikes}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)} 
          className="flex gap-2 justify-center items-center cursor-pointer bg-transparent border-none text-white hover:text-button transition-colors font-semibold"
        >
          <img src="chat.png" alt="comments" className="w-5 h-5 object-contain filter invert" /> 
          <span className="text-primary">Comments</span>
        </button>
      </div>

      {showComments && (
        <div className="w-full transition-all">
          <div className="flex flex-col mb-2 mt-4">
            <div className="inputContainer flex justify-between gap-2 items-center pr-1 pl-3 bg-transparent text-inputBorder border-2 w-full rounded-md box-border">
              <input 
                value={eachComment}
                onChange={e => setEachComment(e.target.value)} 
                className="w-full text-secondary focus:outline-none py-2.5 bg-transparent text-sm sm:text-base" 
                name="comment" 
                type="text" 
                placeholder="Write a comment..." 
                onKeyDown={(e) => e.key === 'Enter' && addComment()}
              />
              <button 
                onClick={addComment} 
                className="hover:bg-buttonHover transition-all bg-button font-semibold text-white py-2 px-4 rounded-lg text-xs sm:text-sm cursor-pointer whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-1">
            {allComments.map((e) => (
              <div className="flex flex-col sm:flex-row sm:gap-2 items-start px-3 py-2.5 bg-slate-100/60 border border-slate-200 rounded-lg break-words w-full box-border" key={e.id || Math.random()}>
                <h4 className="font-bold text-primary text-xs sm:text-sm mb-0.5">{e.user}: </h4>
                <p className="leading-snug text-secondary text-xs sm:text-sm m-0">{e.eachComment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Post;