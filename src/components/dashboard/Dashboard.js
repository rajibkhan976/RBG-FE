import React, { useState, useEffect } from "react";


const Dashboard = () => {
  
  const [createButton, setCreateButton] = useState(null);
  useEffect(() => {
    document.title = "Red Belt Gym - Dashboard"
  });


  const toggleCreate = (e) => {
    console.log("DASHBOARD STRUCTURE:::", createButton);
    setCreateButton(e);
  };


  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
