import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import LeftMenu from "../shared/LeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import DashboardFooter from "../shared/FooterDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import AuthActions from "../../actions/AuthActions";

const Dashboard = () => {
  document.title = "Dashboard";
  const [createButton, setCreateButton] = useState(null);

  const toggleCreate = (e) => {
    console.log('DASHBOARD STRUCTURE:::', createButton)
    setCreateButton(e);
  };

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <div className="mainComponent">
      <div className="dashboardBody d-flex f-align-center">
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu />
          <div className="dashboardElComponent">
            <HeaderDashboard toggleCreate={(e) => toggleCreate(e)} />
            <div className="dashInnerStructure">
              <h1>Dashboard</h1>
              <div><button onClick={logOut}>Logout</button></div>
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
