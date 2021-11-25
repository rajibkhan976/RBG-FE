import React, { useState, useEffect } from "react";


const Dashboard = () => {
  document.title = "Red Belt Gym - Dashboard";
  const [createButton, setCreateButton] = useState(null);

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
