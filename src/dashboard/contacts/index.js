import { useEffect } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import HeaderDashboard from "../../common/HeaderDashboard";
import SidebarLogo from "../../assets/images/sidebar-logo.png";
import ContactDetails from "./components/ContactDetails";

function ContactsComponent(props) {
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
      <Switch>
        <div className="dashboardElComponent">
          <HeaderDashboard />
          <div className="dashInnerStructure">
            <Redirect exact from="/contacts" to="/contacts/contact-details" />
            <Route
              strict
              path="/contacts/contact-details"
              component={ContactDetails}
            />
          </div>
        </div>
      </Switch>
    </>
  );
}

export default ContactsComponent;
