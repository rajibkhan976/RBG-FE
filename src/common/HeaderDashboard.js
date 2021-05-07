import { useState } from "react";

import Notifications from "./Notifications";
import CreateIcon from "../assets/images/create.png";
import NotificationIcon from "../assets/images/notif.png";
import UserIcon from "../assets/images/user.png";

function HeaderDashboard(props) {
  const [stateNotifMenu, setStateNotifMenu] = useState(false);
  const [stateUserMenu, setStateUserMenu] = useState(false);

  const toggleNotifications = () => {
    setStateNotifMenu(!stateNotifMenu);
  };

  const toggleUserMenu = () => {
    setStateUserMenu(!stateUserMenu);
  };

  const closeSideMenu = (e) => {
    e.preventDefault();
    setStateNotifMenu(false);
  };

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
        <button
          className="btn buttonNotifications newNotifications"
          onClick={toggleNotifications}
        >
          <img src={NotificationIcon} alt="" />
        </button>
        <button className="btn buttonCreate">
          <img src={CreateIcon} alt="" />
        </button>
        <div className="menuUser">
          <button className="btn btnUserMenu" onClick={toggleUserMenu}>
            <figure
              style={{
                backgroundImage: "url(" + UserIcon + ")",
              }}
            ></figure>
          </button>
          <div className="menuUser"></div>
        </div>
      </div>
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
              <Notifications/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderDashboard;
