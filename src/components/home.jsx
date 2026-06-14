import React, { useEffect, useState } from "react";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc, Timestamp ,query, where, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../initializeApp";
import { getAuth } from "firebase/auth";
import Post from "./post";

const Home = () => {

  const [postDetails, spostDetails] = useState([])

  const [postImage, sPostImage] = useState("");
  const [postTitle, sPostTitle] = useState("");

  useEffect(()=>{
    getData()
  },[])
  
  const auth= getAuth()

  const fireStoreData = async () => {
    // Add a new document in collection "cities"
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db,'Posts'), {
        email: auth.currentUser.email,
        currentUser: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        Id: auth.currentUser.uid,
        postImage,
        postTitle,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log("error", err);
    }
    getData()
  };

  const enterData = (e) => {
    e.preventDefault();
    fireStoreData();
  };

  const getData = async () => {
try{
  const q = query(collection(db, 'Posts'));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  spostDetails(prev => [...prev, {id:doc.id, ...doc.data()}])
});
}
catch(err){
  console.log(err);
}
  }

  return (
    <div className="home">
      <form onSubmit={enterData}>
        <div>
          <label htmlFor="postImage">PostURL</label>
          <input
            type="text"
            name=""
            id="postImage"
            placeholder="Enter your Post image url"
            onChange={(e) => sPostImage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postTitle"></label>
          <input
            type="text"
            name=""
            id="postTitle"
            onChange={(e) => sPostTitle(e.target.value)}
          />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>

      <div className="post">
        {
          postDetails.map((e,i)=>{
            return <Post image={e.postImage} title={e.postTitle} user={e.currentUser} porfileImage={e.photoURL} key={i}/>
          })
        }
      </div>

    </div>

  );
};

export default Home;
