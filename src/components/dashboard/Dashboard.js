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
      <a href="https://xd.adobe.com/view/3e68ffa8-df37-4768-8446-0f7de594fdf4-6b3b/screen/70c06959-7b7a-469e-9e62-73ea48cc35a3?fullscreen" target="_blank">
        <span className="prototypeBatch">Prototype</span>
        <h1>Dashboard</h1>
      </a>
    </>
  );
};

export default Dashboard;
