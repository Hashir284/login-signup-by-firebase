import React, { useEffect, useState } from "react";
import "./CSS/postCard.css";
import { collection, addDoc, updateDoc, setDoc, doc, getDocs, query, where } from "firebase/firestore";
import auth, { db } from "../initializeApp";
import { getDoc } from "firebase/firestore";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { all } from "axios";
import { getAuth } from "firebase/auth";


const Post = ({ image, title, user, porfileImage, id }) => {

  const auth = getAuth()

  const [eachLike, setEachLike] = useState(false)
  const [totalLikes, setTotalLikes] = useState(null)

  const [eachComment, setEachComment] = useState('')
  const [allComments, setAllComments] = useState([])
  const [showComments, setShowComments] = useState(false)

  useEffect(()=>{
    async function getTotalLikes (){
      const q = query(collection(db, `Posts/${id}/Likes`), where("like", "==", true));
      let allLikes = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  if(doc.id === auth.currentUser.email){
    setEachLike(true)
  }
  allLikes.push(doc.data())
});

setTotalLikes(allLikes.length)
}
getTotalLikes()

getComments()
  },[])
  // useEffect(() => {
  //   // getTotalLikes()
  // }, [])
  //     async function getTotalLikes() {     
  //       const q = query(collection(db, "Posts/id/Likes"), where("Like", "==", true));
  // const querySnapshot = await getDocs(q);
  // let allLikes = []
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  //   if(doc.data().like){
  //     allLikes.push({...doc.data(), id:doc.id})
  //   }
  // });
  // if(allLikes.id === auth.currentUser.email){
  //   setTotalLikes(allLikes || 0)
  //   setEachLike(true)
  // }else{
  //   setTotalLikes(allLikes || 0)
  //   setEachLike(false)
  // }
  //     }

  //     const manageLikes = async ()=>{
  //       let totalLikeManage
  //         if(eachLike){
  //         totalLikeManage = totalLikes+1
  //       }else if(totalLikes === 0){
  //         // setTotalLikes(totalLikes)
  //       }else{
  //         totalLikeManage = totalLikes-1
  //       }
  //       setTotalLikes(totalLikeManage)

  //       await setDoc(doc(db, `Posts/${id}/Likes`,auth.currentUser.email), {
  //   like:eachLike
  // });
  //       }      

  async function like() {
    let newLike = !eachLike
    setEachLike(newLike)
    if (newLike) {
      setTotalLikes(prev=> prev + 1)
    } else {
      if(totalLikes !== 0){
        setTotalLikes(prev=> prev - 1)
      }
    }
    await setDoc(doc(db, `Posts/${id}/Likes`, auth.currentUser.email), {
      like: newLike
    });
  }

  async function addComment() {
    // Add a new document with a generated id.
    if (eachComment.trim() !== '') {
      setAllComments([...allComments, { user: auth.currentUser.displayName, eachComment }])
      const docRef = await addDoc(collection(db, `Posts/${id}/Comments`), {
        user: auth.currentUser.displayName, eachComment,
      });
      console.log("Document written with ID: ", docRef);
    }
    else {
      console.log(1);
    }
  }

  async function getComments(params) {
    const q = query(collection(db, `Posts/${id}/Comments`));

    const querySnapshot = await getDocs(q);
    let allComment = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allComment.push({ id: doc.id, ...doc.data() })
      console.log(doc.id, " => ", doc.data());
    });
    setAllComments([...allComment])
  }

  return (
    <div className="card w-full max-w-96 p-6 pb-4 bg-loginconbg rounded-lg text-primary">
      <div className="mb">
        <div className="flex justify-between">
          <div className="profileId flex gap-3">
            <div>
              <img src={porfileImage} alt="profile" className="porfileImage rounded-full w-14 h-14"
                referrerPolicy="no-referrer" loading="lazy"
                onError={(e) => {
                  e.target.src = "/4.png";
                }}
              />
            </div>
            <div className="font-semibold text-lg">{user}</div>
          </div>
          <div>
            <FontAwesomeIcon icon={faEllipsis} className="text-secondary" />
          </div>
        </div>
      </div>
      <div className="mb-2 ml-1">{title}</div>
      <div className="w-full border-2 rounded-md overflow-hidden">
        <img src={image} alt="post" className="postImage w-full h-80"
          referrerPolicy="no-referrer" loading="lazy"
          onError={(e) => {
            e.target.src = "/default-image.png";
          }}
        />
      </div>
      <div className="flex flex-row justify-between items-center gap-7 px-3 pt-6 mx-6">
        <div>
          {
            eachLike ?
              <div className='flex gap-1 justify-center items-center cursor-pointer' onClick={like}><img src="blacklike.png" alt="" />{totalLikes || 0}</div>
              : <div className='flex gap-1 justify-center items-center cursor-pointer' onClick={like}><FontAwesomeIcon icon={faThumbsUp} /> {totalLikes || 0}</div>
          }
        </div>
        <div className='flex gap-1 cursor-pointer' onClick={() => setShowComments(!showComments)}><img src="chat.png" alt="" /> Comments</div>
      </div>
      {
        showComments ?
          <>
            <div className="flex flex-col g-4 mb-1 mt-6">
              <div className="inputContainer flex justify-between gap-2 items-center pr-0 pl-3 mb-4 text-inputBorder border-2 w-full rounded-md">
                <input onChange={e => setEachComment(e.target.value)} className="input w-full focus:outline-none py-3 text-input text-base" name="comment" type="text" placeholder="Enter the Comment" />
                <div className="mr-1">
                  <button onClick={addComment} className="hover:bg-buttonHover transition-all inline-block w-full bg-button font-semibold text-white py-2 px-4 rounded-lg">
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-1">
              {
                allComments.map((e, i) => {
                  return <div className="flex items-start gap-3 mb-2 px-3 py-3 bg-slate-100 rounded-lg" key={i}>
                    <h3 className="font-bold text-input">{e.user}:</h3>
                    <p className="leading-tight text-secondary" style={{ marginTop: '2px' }}>{e.eachComment}</p>
                  </div>
                })
              }
            </div>
          </>
          : null
      }
    </div>
  );
};

export default Post;
