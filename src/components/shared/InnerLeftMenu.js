import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Redirect } from "react-router-dom";
import BuilderSidebar from "../automation/automationcanvas/BuilderSidebar";
import { InnerLeftMenuServices } from "../../services/shared/InnerLeftMenuService"

import white_arrow_right from "../../assets/images/white_arrow_right.svg";
import undraw_personal_settings_kihd from "../../assets/images/undraw_personal_settings_kihd.svg";
import SidebarLogo from "../../assets/images/sidebar-logo.png";
import SideMenuArrow from "../../assets/images/sideArrow.svg";

const InnerLeftMenu = (props) => {
  const pathURL = useLocation().pathname;
  const [automationObject, setAutomationObject] = useState({});
  // const rolesCount = useSelector((state) => state.role.count);
  // const groupsCount = useSelector((state) => state.group.count);
  const [rolesCount, setRolesCount] = useState(0);
  const [groupsCount, setGroupsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const automationCount = useSelector((state) => state.automation.count);
  const contactCount = useSelector((state) => state.contact.count);
  useEffect(() => {
    if (props.automationListItem) {
      setAutomationObject(props.automationListItem)
    }
    fetchCounts();
  }, []);

  // const toggleLeftSubMenu = (status) => {
  //   console.log("'status i n inner bar", status)

  //   //if(typeof props.toggleLeftSubmenu == "function"){
  //   props.toggleLeftSubMenu && props.toggleLeftSubMenu(status)
  //   //}
  // }

  const fetchCounts = async () => {
    try {
      const result = await InnerLeftMenuServices.fetchCounts();
      console.log("fetchCount function result", result)
      if (result) {
        setRolesCount(result.roles);
        setGroupsCount(result.groups);
        setUsersCount(result.users);
      }
    } catch (e) {
      console.log("Error in fetchCount", e);
      throw new Error(e);
    }
  }

  const RenderMenu = (prop) => {
    switch (prop.menuType) {
      case "auth":
        return (
          <React.Fragment>
            <div className="sidebarHeader">
              <h4>
                User & Controls
                {/* <img className="arrowIcon" src={white_arrow_right} alt="" onClick={() => toggleLeftSubMenu(false)} /> */}
              </h4>
            </div>
            <ul>
              <li>
                <NavLink className="leftMenuInnerLink" to="/roles">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">Roles</p>
                    <span className="notificationNumber">{rolesCount}</span>
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
                    <span className="notificationNumber">{groupsCount}</span>
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
                    <span className="notificationNumber">{usersCount}</span>
                    <br />
                    <p className="linkAbout">Manage users & sub-users</p>
                  </div>
                </NavLink>
              </li>
            </ul>
            <div className="linkImg">
              <img src={undraw_personal_settings_kihd} alt="" />
            </div>
          </React.Fragment>
        );
      case "contact":
        return (
          <React.Fragment>
            <div className="sidebarHeader">
              <h4>
                Contacts
              </h4>
            </div>
            <ul className="automationInDetails">
              <li>
                <NavLink className="leftMenuInnerLink active" to="/contacts">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">
                      My Contacts <span className="notificationNumber">{contactCount}</span>
                    </p>
                    <br />
                    <p className="linkAbout">Create, import & manage your contacts</p>
                  </div>
                </NavLink>
              </li>
            </ul>
          </React.Fragment>
        )
      case "automationList":
        return (
          <React.Fragment>
            <div className="sidebarHeader">
              <h4>
                Automations
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
          </React.Fragment>
        )
      case "automationBuilder":
        return <BuilderSidebar />
      case "automationDetails":
        return (
          <React.Fragment>
            <div className="sidebarHeader">
              <h4>
                Automation Details
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
          </React.Fragment>
        )
      case "setup":
        return (
          <React.Fragment>
            <div className="sidebarHeader">
              <h4>
                Setup
              </h4>
            </div>
            <ul>
              <li>
                <NavLink className="leftMenuInnerLink" to="/roles">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Personal Details</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt=""/>
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/groups">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Gym Details</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt=""/>
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/call-setup" activeClassName="active">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Communication Setup</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt=""/>
                    </button>
                  </div>
                  <ul className="sideSubMenu">
                    <li><a href="#">Email</a></li>
                    <li><a href="#">SMS</a></li>
                    <li>
                      <NavLink to="/call-setup" activeClassName="active">
                        Call  
                      </NavLink>  
                    </li>
                  </ul>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/products" activeClassName="active">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Products</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt=""/>
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/courses">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Courses</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt=""/>
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/groups">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Customizations</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt=""/>
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/audio-template" activeClassName="active">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Templates</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt=""/>
                    </button>
                  </div>
                  <ul className="sideSubMenu">
                    <li><a href="#">Email</a></li>
                    <li><a href="#">SMS</a></li>
                    <li>
                      <NavLink to="/audio-template" activeClassName="active">
                        Audio  
                      </NavLink>  
                    </li>
                    <li><a href="#">RVM</a></li>
                    <li><a href="#">Sales Bridge</a></li>
                  </ul>
                </NavLink>
              </li>
            </ul>
            <div className="linkImg">
              <img src={undraw_personal_settings_kihd} alt="" />
            </div>
          </React.Fragment>
        )
      default:
        return '';
    }
  };

  return (
    <div className="menuDetails">
      <figure className="logoSidebar">
        <img src={SidebarLogo} alt="" />
      </figure>

      <div className="innerMenuScroll">
        <RenderMenu menuType={props.routeMenu} />
      </div>
    </div>
  );
};

export default InnerLeftMenu;
