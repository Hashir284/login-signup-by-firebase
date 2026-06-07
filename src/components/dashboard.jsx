import React from 'react'

const Dashboard = ({change}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <button onClick={change}>Logout</button>
    </div>
  )
}

export default Dashboard
