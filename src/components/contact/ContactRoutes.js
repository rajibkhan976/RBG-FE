import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import DashboardFooter from "../shared/FooterDashboard";
import HeaderDashboard from "../shared/HeaderDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import Contact from "./contact";
import contact from "./contact";
import SidebarLogo from "../../assets/images/logo_128_28.svg";

const ContactRoutes = (props) => {



  const [device, setDevice] = useState(props.device);
  useEffect(()=>{
    console.log("device in contact route", props.device)
    setDevice(props.device);
  }, [props.device])
  return (
    <React.Fragment>
      <div className="menuDetails lessLeftMenu">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
      </div>
      {/* <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="contact"/> */}
      <div className="dashboardElComponent fullWithContainer">
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <Switch>
            <Route exact path="/contacts" render={() => <Contact device={device} />}/>
          </Switch>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ContactRoutes;
