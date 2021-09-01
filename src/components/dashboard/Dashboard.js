import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthActions from "../../actions/AuthActions";

const Dashboard = () => {
  document.title = "Dashboard";
  const [createButton, setCreateButton] = useState(null);

  const toggleCreate = (e) => {
    console.log("DASHBOARD STRUCTURE:::", createButton);
    setCreateButton(e);
  };

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <button onClick={logOut}>Logout</button>
      </div>
    </>
  );
};

export default Dashboard;
