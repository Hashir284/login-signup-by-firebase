import React, { useEffect, useState } from "react";
import { getDoc, getFirestore, orderBy } from "firebase/firestore";
import {
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../initializeApp";
import { getAuth } from "firebase/auth";
import Post from "./post";
import axios from "axios";

const Home = () => {
  const [postDetails, spostDetails] = useState([]);
  const [postImage, sPostImage] = useState("");
  const [postTitle, sPostTitle] = useState("");
  

  useEffect(() => {
    getData();
  }, []);

  

  const auth = getAuth();

  const fireStoreData = async () => {
    if (!postImage || !postTitle){
    alert('Plz! fill all feilds')
    return
  }
  const formData = new FormData();

  formData.append("file", postImage);
  console.log(postImage);
  
  formData.append("upload_preset", "upload_preset");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dl4g6bgml/upload",
      formData
    );

    console.log(res);

    let obj = {
      email: auth?.currentUser?.email,
      currentUser: auth?.currentUser?.displayName,
      photoURL: auth?.currentUser?.photoURL,
      Id: auth?.currentUser?.uid,
      postImage: res.data.url,
      postTitle,
      createdAt: serverTimestamp()
    };
    await addDoc(collection(db, "Posts"), obj);
spostDetails(prev=> [obj, ...prev])
  } catch (err) {
    console.log(err.response?.data || err.message );
  }
};

  const enterData = (e) => {
    e.preventDefault();
    fireStoreData();
  };

  const getData = async () => {
    try {
      const q = query(collection(db, "Posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      let obj = []
      querySnapshot.forEach((doc) => {
        // doc.data() i s never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        obj.push({ id: doc.id, ...doc.data() })
      });
      spostDetails(obj)
    } catch (err) {
      console.log(err.code);
      console.log('err',err.message);
    }
  };

  return (
    <div className="home">
      <form onSubmit={enterData}>
        <div>
          <label htmlFor="postImage">PostURL</label>
          <input
            type="file"
            name=""
            id="postImage"
            placeholder="Enter your Post image url"
            onChange={(e) => sPostImage(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="postTitle"></label>
          <input
            type="text"
            name=""
            id="postTitle"
            placeholder="Enter your Post title"
            onChange={(e) => sPostTitle(e.target.value)}
          />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>

      <div className="post">
        {postDetails.map((e, i) => {
          return (
            <Post
              image={e.postImage}
              title={e.postTitle}
              user={e.currentUser}
              porfileImage={e.photoURL}
              key={i}
            />
          );
        })}

      </div>
    </div>
  );
};

export default Home;
