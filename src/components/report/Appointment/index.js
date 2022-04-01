import { useEffect, useState } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import DashboardFooter from "../shared/FooterDashboard";
import HeaderDashboard from "../shared/HeaderDashboard";
import SidebarLogo from "../../assets/images/sidebar-logo.png";
import ContactDetails from "./components/ContactDetails";

function ContactsComponent(props) {
  const toggleCreate = (e) => {
    console.log(e);
  };
  useEffect(() => {});
  return (
    <>
      <div className="menuDetails">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
        <ul>
          <li>
            <NavLink
              className="leftMenuInnerLink"
              to="/contacts/contact-details"
            >
              Contact Details
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="dashboardElComponent">
        <HeaderDashboard toggleCreate={toggleCreate} /> 
        <div className="dashInnerStructure">
          <div className="dashInnerUI">
            <Switch>
              <Redirect exact from="/contacts" to="/contacts/contact-details" />
              <Route
                strict
                path="/contacts/contact-details"
                component={ContactDetails}
              />
            </Switch>
          </div>
          <DashboardFooter />
        </div>
      </div>
      
    </>
  );
}

export default ContactsComponent;
