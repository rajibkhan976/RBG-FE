import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Redirect } from "react-router-dom";
import BuilderSidebar from "../automation/automationLists/automationcanvas/BuilderSidebar";
import { InnerLeftMenuServices } from "../../services/shared/InnerLeftMenuService"

import white_arrow_right from "../../assets/images/white_arrow_right.svg";
import undraw_personal_settings_kihd from "../../assets/images/undraw_personal_settings_kihd.svg";
import SidebarLogo from "../../assets/images/sidebar-logo.png";

const InnerLeftMenu = (props) => {
  const pathURL = useLocation().pathname;
  const [automationObject, setAutomationObject] = useState({});
  // const rolesCount = useSelector((state) => state.role.count);
  // const groupsCount = useSelector((state) => state.group.count);
  const [rolesCount, setRolesCount] = useState(0);
  const [groupsCount, setGroupsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const automationCount = useSelector((state) => state.automation.count);

  useEffect(() => {
    if (props.automationListItem) {
      setAutomationObject(props.automationListItem)
    }

    fetchCounts();
  }, []);

  const toggleLeftSubMenu = (status = false) => {
    console.log("'status i n inner bar", status)
    
    //if(typeof props.toggleLeftSubmenu == "function"){
      props.toggleLeftSubMenu && props.toggleLeftSubMenu(status)
    //}
  }

  /**
     * Function to fetch users
     * @returns 
     */
   const fetchCounts = async () => {
    try {
        const result = await InnerLeftMenuServices.fetchCounts();
        console.log("fetchCount function result", result)
        if(result) {
          setRolesCount(result.roles);
          setGroupsCount(result.groups);
          setUsersCount(result.users);
        }
    } catch (e) {
        console.log("Error in fetchCount", e);
        throw new Error(e);
    }
}

  return (
    <div className="menuDetails">
      <figure className="logoSidebar">
        <img src={SidebarLogo} alt="" />
      </figure>

      {console.log("------------------------", props)}

      <div className="innerMenuScroll">
        {(pathURL === "/roles" ||
          pathURL === "/groups" ||
          pathURL === "/users") && (
          <>
            <div className="sidebarHeader">
              <h4>
                User & Controls
                <img className="arrowIcon" src={white_arrow_right} alt="" onClick={() => toggleLeftSubMenu(false)} />
              </h4>
            </div>
            <ul>
              <li>
                <NavLink className="leftMenuInnerLink" to="/roles">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">Roles</p>
                    <span className="notificationNumber">{ rolesCount }</span>
                    <br />
                    <p className="linkAbout">Manage user roles</p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/groups">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">Groups</p>
                    <span className="notificationNumber">{ groupsCount}</span>
                    <br />
                    <p className="linkAbout">Manage user groups</p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/users">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">Users</p>
                    <span className="notificationNumber">{ usersCount }</span>
                    <br />
                    <p className="linkAbout">Manage users & sub-users</p>
                  </div>
                </NavLink>
              </li>
            </ul>
            <div className="linkImg">
              <img src={undraw_personal_settings_kihd} alt="" />
            </div>
          </>
        )}
        {pathURL === "/automation-list" ?
          (props.createButton === null || props.createButton === undefined) && (
            <>
              <div className="sidebarHeader">
                <h4>
                  Automations
                  <img className="arrowIcon" src={white_arrow_right} alt="" onClick={() => toggleLeftSubMenu(false)} />
                </h4>
              </div>
              <ul>
                <li>
                  <NavLink className="leftMenuInnerLink" to="/automation-list">
                    <div className="indicator"></div>
                    <div className="linkDetails">
                      <p className="linkHeading">Automation Lists</p>
                      <span className="notificationNumber">{automationCount}</span>
                      <br />
                      <p className="linkAbout">Manage your automations</p>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </>
          ) : pathURL === "/automation-builder" ? (
          <>
            <BuilderSidebar />
          </>
        ) : (pathURL === "/automation-details" && automationObject._id) ? (
          <>
            <div className="sidebarHeader">
              <h4>
                Automation Details
                <img className="arrowIcon" src={white_arrow_right} alt="" onClick={() => toggleLeftSubMenu(false)} />
              </h4>
            </div>
            <ul className="automationInDetails">
              <li>
                <span className="leftMenuInnerLink">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">
                      {automationObject.name}
                    </p>
                    <br />
                    <p className="linkAbout">Manage your automation details</p>
                  </div>
                </span>
              </li>
            </ul>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default InnerLeftMenu;
