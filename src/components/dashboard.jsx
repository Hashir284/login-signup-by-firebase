import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Dashboard = ({change}) => {
  const auth = getAuth()
  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <button onClick={change}>Logout</button>
    </div>
  )
}

export default Dashboard
