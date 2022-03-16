import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Redirect } from "react-router-dom";
import BuilderSidebar from "../automation/automationcanvas/BuilderSidebar";
import { InnerLeftMenuServices } from "../../services/shared/InnerLeftMenuService"

import white_arrow_right from "../../assets/images/white_arrow_right.svg";
import undraw_personal_settings_kihd from "../../assets/images/undraw_personal_settings_kihd.svg";
import SidebarLogo from "../../assets/images/logo_128_28.svg";
import SideMenuArrow from "../../assets/images/sideArrow.svg";
import * as actionTypes from "../../actions/types";

const InnerLeftMenu = (props) => {
  const pathURL = useLocation().pathname;
  const [automationObject, setAutomationObject] = useState({});
  const rolesStoreCount = useSelector((state) => state.role.count);
  const groupsStoreCount = useSelector((state) => state.group.count);
  const usersStoreCount = useSelector((state) => state.user.count);
  const organizationsStoreCount = useSelector((state) => state.organization.count);
  const associationsStoreCount = useSelector((state) => state.association.count);
  const automationCount = useSelector((state) => state.automation.count);
  const contactCount = useSelector((state) => state.contact.count);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.data);

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
      if (result) {
        // setRolesCount(result.roles);
        // UPDATE STORE
        dispatch({
          type: actionTypes.ROLE_COUNT,
          count: result.roles,
        });
        // setGroupsCount(result.groups);
        // UPDATE STORE
        dispatch({
          type: actionTypes.GROUP_COUNT,
          count: result.groups,
        });
        // setUsersCount(result.users);
        // UPDATE STORE
        dispatch({
          type: actionTypes.USER_COUNT,
          count: result.users,
        });
        // UPDATE STORE
        dispatch({
          type: actionTypes.ORGANIZATION_COUNT,
          count: result.organizations,
        });
        // UPDATE STORE
        dispatch({
          type: actionTypes.ASSOCIATION_COUNT,
          count: result.associations,
        });
      }
    } catch (e) {
      console.log("Error in fetchCount", e);
      // throw new Error(e);
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
                    <span className="notificationNumber">{rolesStoreCount}</span>
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
                    <span className="notificationNumber">{groupsStoreCount}</span>
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
                    <span className="notificationNumber">{usersStoreCount}</span>
                    <br />
                    <p className="linkAbout">Manage users & sub-users</p>
                  </div>
                </NavLink>
              </li>
              {loggedInUser && loggedInUser.organization && loggedInUser.organizationCode === 'RBG' ? <li>
                <NavLink className="leftMenuInnerLink" to="/organizations">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">Organizations</p>
                    <span className="notificationNumber">{organizationsStoreCount}</span>
                    <br />
                    <p className="linkAbout">Manage Organizations</p>
                  </div>
                </NavLink>
              </li> : ''}
              {loggedInUser && loggedInUser.organization && loggedInUser.organizationCode === 'RBG' ? <li>
                <NavLink className="leftMenuInnerLink" to="/associations">
                  <div className="indicator"></div>
                  <div className="linkDetails">
                    <p className="linkHeading">Associations</p>
                    <span className="notificationNumber">{associationsStoreCount}</span>
                    <br />
                    <p className="linkAbout">Manage Associations</p>
                  </div>
                </NavLink>
              </li> : ''}
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
                Automation
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
        case "report":
        return (
          <React.Fragment>
            <div className="sidebarHeader">
              <h4>
                Report
              </h4>
            </div>
            <ul>
              <li>
                <NavLink className="leftMenuInnerLink" to="/appointment">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Appointment</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                </NavLink>
              </li>
              
           
            </ul>
            <div className="linkImg">
              <img src={undraw_personal_settings_kihd} alt="" />
            </div>
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
                <NavLink className="leftMenuInnerLink" to="/personal-details">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Personal Details</p>
                    <p className="linkAbout">Manage your personal details</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/gym-details">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Gym Details</p>
                    <p className="linkAbout">Manage your Gym details</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/call-setup" activeClassName="active">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Communication Setup</p>
                    <p className="linkAbout">Set all kind of communications</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                  <ul className="sideSubMenu">
                    <li>
                      <NavLink to="/email-setup" activeClassName="active">
                        Email
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/sms-setup" activeClassName="active">
                        SMS
                      </NavLink>
                    </li>
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
                    <p className="linkAbout">Manage your POS products</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/courses">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Programs</p>
                    <p className="linkAbout">Manage your programs</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/customizations"> 
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Customizations</p>
                    <p className="linkAbout">Manage tax and custom fields</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                </NavLink>
              </li>
              <li>
                {console.log(pathURL === "/email-template" || pathURL === "/sms-template" || pathURL === "/audio-template")}
                <NavLink 
                  className={(pathURL === "/email-template" || pathURL === "/sms-template" || pathURL === "/audio-template") ? "leftMenuInnerLink active" : "leftMenuInnerLink"} 
                  to="/email-template" 
                  activeClassName="active">
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Templates</p>
                    <p className="linkAbout">Set communication templates</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
                  <ul className="sideSubMenu">
                    <li>
                      <NavLink to="/email-template" activeClassName="active">
                         Email
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/sms-template" activeClassName="active">
                         SMS
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/audio-template" activeClassName="active">
                        Audio
                      </NavLink>
                    </li>
                    <li><a href="javascript:void(0)">RVM</a></li>
                    <li><a href="javascript:void(0)">Sales Bridge</a></li>
                  </ul>
                </NavLink>

              </li>
              <li>
                <NavLink className="leftMenuInnerLink" to="/phases-status"> 
                  <div className="indicator"></div>
                  <div className="linkDetails setup">
                    <p className="linkHeading">Phases &amp; Status</p>
                    <p className="linkAbout">Lorem ipsum dolor sit</p>
                    <button className="btn sidemenuarrow">
                      <img src={SideMenuArrow} alt="" />
                    </button>
                  </div>
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
