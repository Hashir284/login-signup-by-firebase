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
import { faDevpost } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faUnity } from "@fortawesome/free-brands-svg-icons";

const Dashboard = () => {
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
        obj.push({ id: doc.id, ...doc.data() })
      });
      spostDetails(obj)
    } catch (err) {
      console.log(err.code);
      console.log('err', err.message);
    }
  };

  return (
    <div className="home w-full justify-center items-center flex flex-col py-12 px-4">
      <form onSubmit={enterData} className="create rounded-xl bg-loginconbg login pt-8 pb-9 px-9 mb-12">
        <div className="mb-4">
          <label htmlFor="" className="text-secondary mb-2 text-base inline-block">Upload your Image</label>
          <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-4 text-inputBorder border-2 w-full rounded-md">
          <FontAwesomeIcon icon={faFileArrowUp} style={{color: "#475569",}} />
          <input
          className="focus:outline-none text-input py-3 text-base"
            type="file"
            placeholder="Upload your File"
            id="File"
              onChange={(e) => sPostImage(e.target.files[0])}
          />
        </div>
        </div>
        <div className="mb-6">
          <label htmlFor="" className="text-secondary mb-2 text-base inline-block">Post Title</label>
          <div className="inputContainer flex gap-2 items-center px-3 mx-0 mb-4 text-inputBorder border-2 w-full rounded-md">
                  <FontAwesomeIcon icon={faUnity} style={{color: "#475569",}} />
                  <input  
                  className="focus:outline-none w-full py-3 text-input text-base"
                    type="text"
                    value={postTitle}
                    placeholder="Enter your post title"
                    id="title"
                    onChange={(e) => {
                      sPostTitle(e.target.value);
                    }}
                  />
                </div>
        </div>
        <div>
          <button type={"submit"} className="hover:bg-buttonHover transition-all inline-block w-full bg-button font-semibold text-white py-3 rounded-lg">
            Add
            </button>
        </div>
      </form>

      <div className="post grid grid-cols-1 gap-x-5 gap-y-12 ">
        {postDetails.map((e, i) => {
          return (
            <Post
              image={e.postImage}
              title={e.postTitle}
              user={e.currentUser}
              porfileImage={e.photoURL}
              id={e.id}
              key={i}
            />
          );
        })}

      </div>
    </div>
  );
};

export default Dashboard;
