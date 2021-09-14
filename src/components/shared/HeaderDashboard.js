import { useEffect, useState } from "react";

import Notifications from "./Notifications";
import Setup from "../setup/mainPopup/setup";

import CreateIcon from "../../assets/images/create.png";
import NotificationIcon from "../../assets/images/notif.png";
import UserIcon from "../../assets/images/user.png";
import arrowDown from "../../assets/images/arrowDown.svg";
import callIcon1 from "../../assets/images/callicon1.svg";
import callIcon2 from "../../assets/images/callicon2.svg";
import callIcon3 from "../../assets/images/callicon3.svg";
import SettingIcon from "../../assets/images/settings.svg";
import SettingIconBlue from "../../assets/images/settings_blue.svg";
import DownloadIcon from "../../assets/images/download.svg";


function HeaderDashboard(props) {
  const [setupModalStatus, setSetupModalStatus] = useState(false);
  const [stateNotifMenu, setStateNotifMenu] = useState(false);
  const [stateUserMenu, setStateUserMenu] = useState(false);
  const [locationLoaded, setLocationLoaded] = useState("user");

  const toggleNotifications = (e) => {
    setStateNotifMenu(!stateNotifMenu);
  };

  const toggleUserMenu = () => {
    setStateUserMenu(!stateUserMenu);
  };

  const toggleCreateHeader = () => {
    window.location.pathname === "/roles"
      ? props.toggleCreate("roles")
      : window.location.pathname === "/groups"
      ? props.toggleCreate("groups")
      : window.location.pathname === "/users"
      ? props.toggleCreate("user")
      : window.location.pathname === "/automation-list"
      ? props.toggleCreate("automation")
      : props.toggleCreate(null);
  };

  const closeSideMenu = (e) => {
    e.preventDefault();
    setStateNotifMenu(false);
  };

  useEffect(() => {
    window.location.pathname === "/roles"
      ? setLocationLoaded("roles")
      : window.location.pathname === "/groups"
      ? setLocationLoaded("groups")
      : window.location.pathname === "/users"
      ? setLocationLoaded("user")
      : window.location.pathname === ("/automation-list" || "/automation-builder")
      ? setLocationLoaded("automation")
      : setLocationLoaded(null);
  }, []);

  const toggleSetup = () => {
    setSetupModalStatus(!setupModalStatus);
  }

  return (
    <>
      <div className="dashboardHeader">
        <div className="headerSearch d-flex">
          <input type="search" placeholder="Search" />
          <span className="searchIco">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19.069"
              height="19"
              viewBox="0 0 19.069 19"
              id="search-ico"
            >
              <g transform="translate(-1.5 -1.5)">
                <path
                  className="a"
                  d="M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z"
                />
                <path
                  className="a"
                  d="M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z"
                  transform="translate(-7.142 -7.143)"
                />
              </g>
            </svg>
          </span>
        </div>
        <div className="headerCallToAction">
          <div className="leftList">
              <span className="callBtn blueCall">
                <img src={callIcon3} alt="" />
              </span>
              call
              <i><img src={arrowDown} alt="" /></i>
          </div>
          <div className="rightDetails">
            <p>
              <span> Incoming Call</span> 
              +1 234 567 8901
            </p>
            <div className="d-flex">
              <button className="btn callBtn redCall">
                <img src={callIcon2} alt="" />
              </button>
              <button className="btn callBtn greenCall">
                <img src={callIcon1} alt="" />
              </button>
            </div>  
          </div>
        </div>
        <button
          className="btn buttonHeaderIcons"
        >
          <img src={DownloadIcon} alt="" />
        </button>
        <button
          className={setupModalStatus ? "btn buttonHeaderIcons active" : "btn buttonHeaderIcons"} 
          onClick={toggleSetup}
        >
          <img src={setupModalStatus ? SettingIconBlue : SettingIcon} alt="" />
        </button>
        <button
          className="btn buttonNotifications newNotifications"
          onClick={(e) => toggleNotifications(e)}
        >
          <img src={NotificationIcon} alt="" />
        </button>
        {locationLoaded === "user" && (
          <button
            className="btn buttonCreate"
            id="createUser"
            data-create="create-user"
            onClick={toggleCreateHeader}
          >
            <img src={CreateIcon} alt="" />
          </button>
        )}
        {locationLoaded === "roles" && (
          <button
            className="btn buttonCreate"
            id="createUser"
            data-create="create-user"
            onClick={toggleCreateHeader}
          >
            <img src={CreateIcon} alt="" />
          </button>
        )}
        {locationLoaded === "groups" && (
          <button
            className="btn buttonCreate"
            id="createUser"
            data-create="create-user"
            onClick={toggleCreateHeader}
          >
            <img src={CreateIcon} alt="" />
          </button>
        )}
        {locationLoaded === "automation" && (
          <button
            className="btn buttonCreate"
            id="createAutomation"
            data-create="create-automation"
            onClick={toggleCreateHeader}
          >
            <img src={CreateIcon} alt="" />
          </button>
        )}
        <div className="menuUser">
          <button className="btn btnUserMenu" onClick={toggleUserMenu}>
            <figure
              style={{
                backgroundImage: "url(" + UserIcon + ")",
              }}
            ></figure>

            <div className="menuUserDetail">
              <span>User</span>
              <h3>Steve M.</h3>
            </div>
            <i><img src={arrowDown} alt="" /></i>
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS SIDE MENU */}
      {stateNotifMenu && (
        <div className="sideMenuOuter notificationsMenu">
          <div className="sideMenuInner">
            <div className="sideMenuHeader">
              <h3>
                Notifications{" "}
                <button className="inlinle-btn btn-link">
                  Mark all as read
                </button>
              </h3>
              <p>Check all the notifications</p>
              <button
                className="btn btn-closeSideMenu"
                onClick={(e) => closeSideMenu(e)}
              >
                <span></span>
                <span></span>
              </button>
            </div>

            <div className="sideMenuBody">
              <Notifications />
            </div>
          </div>
        </div>
      )}
      {/* NOTIFICATIONS SIDE MENU */}

      {setupModalStatus && <Setup/>}
      
    </>
  );
}

export default HeaderDashboard;
