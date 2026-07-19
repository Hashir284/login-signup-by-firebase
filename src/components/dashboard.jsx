import React, { useEffect, useState } from "react";
import { getFirestore, orderBy } from "firebase/firestore";
import {
  query,
  getDocs,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../initializeApp";
import { getAuth } from "firebase/auth";
import Post from "./post";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faUnity } from "@fortawesome/free-brands-svg-icons";

const Dashboard = () => {
  const [postDetails, spostDetails] = useState([]);
  const [postImage, sPostImage] = useState("");
  const [postTitle, sPostTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const auth = getAuth();

  const fireStoreData = async () => {
    if (!postImage || !postTitle.trim()) {
      alert('Plz! fill all fields');
      return;
    }
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", postImage);
    formData.append("upload_preset", "upload_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dl4g6bgml/upload",
        formData
      );

      let obj = {
        email: auth?.currentUser?.email,
        currentUser: auth?.currentUser?.displayName || "Anonymous",
        photoURL: auth?.currentUser?.photoURL || "",
        Id: auth?.currentUser?.uid,
        postImage: res.data.secure_url || res.data.url,
        postTitle: postTitle.trim(),
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "Posts"), obj);
      
      const localObj = { ...obj, id: docRef.id };
      spostDetails(prev => [localObj, ...prev]);
      
      sPostTitle("");
      sPostImage("");
      document.getElementById("File").value = "";
      alert("Post added successfully!");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to upload post!");
    } finally {
      setIsLoading(false);
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
      let obj = [];
      querySnapshot.forEach((doc) => {
        obj.push({ id: doc.id, ...doc.data() });
      });
      spostDetails(obj);
    } catch (err) {
      console.log('err', err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-12 px-4 box-border bg-transparent">
      <div className="w-full max-w-md flex flex-col items-center">
        
        <form onSubmit={enterData} className="w-full bg-loginconbg rounded-xl pt-8 pb-9 px-6 sm:px-9 mb-12 shadow-xl box-border text-white">
          <div className="mb-4">
            <label htmlFor="File" className="text-secondary mb-2 text-sm sm:text-base inline-block">Upload your Image</label>
            <div className="inputContainer flex gap-3 items-center px-3 mb-4 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
              <FontAwesomeIcon icon={faFileArrowUp} style={{color: "#475569"}} />
              <input
                className="focus:outline-none text-input py-3 text-sm sm:text-base bg-transparent w-full file:hidden cursor-pointer"
                type="file"
                id="File"
                accept="image/*"
                onChange={(e) => sPostImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="text-secondary mb-2 text-sm sm:text-base inline-block">Post Title</label>
            <div className="inputContainer flex gap-3 items-center px-3 mb-4 text-inputBorder border-2 w-full rounded-md bg-transparent box-border">
              <FontAwesomeIcon icon={faUnity} style={{color: "#475569"}} />
              <input  
                className="focus:outline-none w-full py-3 text-input text-sm sm:text-base bg-transparent"
                type="text"
                value={postTitle}
                placeholder="Enter your post title"
                id="title"
                onChange={(e) => sPostTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="hover:bg-buttonHover transition-all w-full bg-button font-semibold text-white py-3 rounded-lg text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Uploading..." : "Add"}
            </button>
          </div>
        </form>

        <div className="w-full grid grid-cols-1 gap-y-8">
          {postDetails.map((e) => (
            <Post
              image={e.postImage}
              title={e.postTitle}
              user={e.currentUser}
              porfileImage={e.photoURL}
              id={e.id}
              key={e.id || Math.random()}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;