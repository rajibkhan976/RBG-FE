import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import LogoImg from "../../assets/images/logo_img.png";

function LeftMenu(props) {
  const pathURL = useLocation().pathname;

  const [tglLeftMenuStatus, setTglLeftMenuStatus] = useState(false);

  const toggleLeftSubMenu = (status) => {
    if (tglLeftMenuStatus) {
      setTglLeftMenuStatus(false);
    } else {
      setTglLeftMenuStatus(true);
    }
    console.log("'status i n inner bar", tglLeftMenuStatus);
    props.toggleLeftSubMenu && props.toggleLeftSubMenu(tglLeftMenuStatus);
  };

  // Permission Set
  const [permissions, setPermissions] = useState(JSON.parse(localStorage.getItem("permissions")));
  console.log('Having permission', permissions);

  return (
    <div className="routeMenu"
    >
      <div className="closedMenuLogo">
        <NavLink to="/dashboard"
          onClick={(e) => props.clickedSetupStatus(e)}>
          <img src={LogoImg} alt="Logo img" />
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/dashboard"
            onClick={(e) => props.clickedSetupStatus(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
              id="ico-1"
            >
              <g transform="translate(-1.987 -2)">
                <g transform="translate(1.987 2)">
                  <path
                    className="a"
                    d="M15.994,30A14,14,0,0,1,3.546,9.6a1,1,0,1,1,1.778.915A12.016,12.016,0,1,0,7.512,7.515,1,1,0,0,1,6.1,6.1,14,14,0,0,1,25.888,25.9,13.892,13.892,0,0,1,15.994,30Z"
                    transform="translate(-1.987 -2)"
                  />
                </g>
                <g transform="translate(10.994 10)">
                  <path
                    className="a"
                    d="M16,20a4,4,0,0,1-2.829-6.828c1.257-1.257,7.272-3.639,8.465-4.1a1,1,0,0,1,1.3,1.3c-.465,1.193-2.847,7.209-4.1,8.465A3.967,3.967,0,0,1,16,20Zm4.188-8.187a30.112,30.112,0,0,0-5.6,2.773,2,2,0,0,0,0,2.828,2.048,2.048,0,0,0,2.829,0A30.192,30.192,0,0,0,20.188,11.813Z"
                    transform="translate(-12.001 -9)"
                  />
                </g>
              </g>
            </svg>
            <span className="menuName">Dashboard</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/page-two"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24.213 24.001"
              id="ico-2"
            >
              <g transform="translate(-1.407 -1.906)">
                <path
                  className="a"
                  d="M32.044,83.586H19.252a1.142,1.142,0,1,1,0-2.284H32.044a1.142,1.142,0,1,1,0,2.284Z"
                  transform="translate(-12.134 -57.679)"
                />
                <path
                  className="a"
                  d="M24.478,57.123H2.549a1.142,1.142,0,1,1,0-2.284H24.478a1.142,1.142,0,1,1,0,2.284Z"
                  transform="translate(0 -38.454)"
                />
                <path
                  className="a"
                  d="M29.014,30.659H12.568a1.142,1.142,0,1,1,0-2.284H29.014a1.142,1.142,0,0,1,0,2.284Z"
                  transform="translate(-7.279 -19.229)"
                />
                <path
                  className="a"
                  d="M24.478,4.19H2.549a1.142,1.142,0,1,1,0-2.284H24.478a1.142,1.142,0,1,1,0,2.284Z"
                  transform="translate(0 0)"
                />
              </g>
            </svg>
          </NavLink>
        </li> */}
        {permissions && permissions.findIndex(p => p.entity === "authentication") >= 0 ?
        <li>
          <NavLink
            className="leftMenuLink"
            isActive={() => ["/roles", "/groups", "/users"]}
            activeClassName={
              pathURL === "/roles" ||
                pathURL === "/groups" ||
                pathURL === "/users"
                ? "selected"
                : ""
            }
            to="/roles"
            onClick={(e) => props.clickedSetupStatus(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 27"
              id="ico-3"
            >
              <path
                className="a"
                d="M21.947,16.332a8.017,8.017,0,1,0-1.714,1.444A11.978,11.978,0,0,1,27.959,28H4.042A12.006,12.006,0,0,1,8.12,19.949a1,1,0,1,0-1.314-1.508A14,14,0,0,0,2,29a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1A13.975,13.975,0,0,0,21.947,16.332ZM10,11a6,6,0,1,1,6,6A6.006,6.006,0,0,1,10,11Z"
                transform="translate(-2 -3)"
              />
            </svg>
            <span className="menuName">User & Controls</span>
          </NavLink>
        </li> : ''}
        {/* <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/page-four"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28.018"
              height="28.018"
              viewBox="0 0 28.018 28.018"
              id="ico-4"
            >
              <g transform="translate(0 5.253)">
                <path
                  className="a"
                  d="M19.262,24H3.5A3.5,3.5,0,0,0,0,27.5v15.76a3.5,3.5,0,0,0,3.5,3.5h15.76a3.5,3.5,0,0,0,3.5-3.5V27.5A3.5,3.5,0,0,0,19.262,24Zm1.751,19.262a1.752,1.752,0,0,1-1.751,1.751H3.5a1.753,1.753,0,0,1-1.751-1.751V27.5A1.753,1.753,0,0,1,3.5,25.751h15.76A1.752,1.752,0,0,1,21.013,27.5Z"
                  transform="translate(0 -24)"
                />
              </g>
              <path
                className="a"
                d="M24,49.751H36.258V48H24Z"
                transform="translate(-18.747 -37.493)"
              />
              <path
                className="a"
                d="M24,65.751H36.258V64H24Z"
                transform="translate(-18.747 -49.991)"
              />
              <path
                className="a"
                d="M24,81.751H36.258V80H24Z"
                transform="translate(-18.747 -62.489)"
              />
              <path
                className="a"
                d="M24,97.751h7V96H24Z"
                transform="translate(-18.747 -74.987)"
              />
              <path
                className="a"
                d="M43.262,0H27.5A3.5,3.5,0,0,0,24,3.5h1.751A1.753,1.753,0,0,1,27.5,1.751h15.76A1.752,1.752,0,0,1,45.013,3.5v15.76a1.752,1.752,0,0,1-1.751,1.751v1.751a3.5,3.5,0,0,0,3.5-3.5V3.5A3.5,3.5,0,0,0,43.262,0Z"
                transform="translate(-18.747)"
              />
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/page-five"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              id="ico-5"
            >
              <g transform="translate(-21 -443)">
                <rect
                  className="a"
                  width="28"
                  height="2"
                  transform="translate(21 443)"
                />
                <rect
                  className="a"
                  width="28"
                  height="2"
                  transform="translate(21 469)"
                />
                <rect
                  className="a"
                  width="28"
                  height="2"
                  transform="translate(23 443) rotate(90)"
                />
                <rect
                  className="a"
                  width="28"
                  height="2"
                  transform="translate(49 443) rotate(90)"
                />
                <rect
                  className="a"
                  width="18"
                  height="2"
                  transform="translate(36 443) rotate(90)"
                />
                <rect
                  className="a"
                  width="24"
                  height="2"
                  transform="translate(23 459)"
                />
              </g>
            </svg>
          </NavLink>
        </li> */}
        {false && permissions && permissions.findIndex(p => p.entity === "automation") >= 0 ?
        <li>
          <NavLink
            className="leftMenuLink"
            isActive={() => ["/automation-list", "/automation-builder"]}
            activeClassName={
              pathURL === "/automation-list" ||
                pathURL === "/automation-builder" ||
                pathURL === "/automation-details"
                ? "selected"
                : ""
            }
            to="/automation-list"
            title="Automation"
            onClick={(e) => props.clickedSetupStatus(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.438"
              height="28.033"
              viewBox="0 0 20.438 28.033"
              id="ico-6"
            >
              <g transform="translate(-15.28 -10.11)">
                <path
                  className="a"
                  d="M31.375,11.11l-15.1,13.3h8.55L18.992,37.143l15.726-16.12H26.288Z"
                />
              </g>
            </svg>
            <span className="menuName">Automation</span>
          </NavLink>
        </li> : ""}
        {permissions && permissions.findIndex(p => p.entity === "contact") >= 0 ?
        <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/contacts"
            onClick={(e) => props.clickedSetupStatus(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              id="ico-7"
            >
              <g transform="translate(-21 -693)">
                <g className="a" transform="translate(21 693)">
                  <rect className="c" width="28" height="28" rx="3" />
                  <rect
                    className="d"
                    x="1"
                    y="1"
                    width="26"
                    height="26"
                    rx="2"
                  />
                </g>
                <g transform="translate(17.662 687.707)">
                  <circle
                    className="b"
                    cx="2.438"
                    cy="2.438"
                    r="2.438"
                    transform="translate(17.86 15.113)"
                  />
                  <path
                    className="b"
                    d="M26.5,40.1c0-3.365,2.184-6.1,4.877-6.1s4.877,2.731,4.877,6.1Z"
                    transform="translate(-11.078 -14.011)"
                  />
                  <circle
                    className="b"
                    cx="2.454"
                    cy="2.454"
                    r="2.454"
                    transform="translate(11.603 12.5)"
                  />
                  <path
                    className="b"
                    d="M15.756,32.6H9.5c0-3.365,2.184-6.1,4.877-6.1A4.74,4.74,0,0,1,18.5,29.332"
                    transform="translate(0 -9.123)"
                  />
                </g>
              </g>
            </svg>
            <span className="menuName">Contacts</span>
          </NavLink>
        </li> : ''}
        {/* <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/page-eight"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27.5"
              height="27.5"
              viewBox="0 0 27.5 27.5"
              id="ico-8"
            >
              <g transform="translate(-6561.444 -176.302)">
                <rect
                  className="a"
                  width="26"
                  height="26"
                  transform="translate(6562.194 177.052)"
                />
                <rect
                  className="a"
                  width="3.078"
                  height="3.078"
                  transform="translate(6564.722 186.703)"
                />
                <rect
                  className="a"
                  width="3.078"
                  height="3.078"
                  transform="translate(6573.376 186.703)"
                />
                <rect
                  className="a"
                  width="3.078"
                  height="3.078"
                  transform="translate(6582.029 186.703)"
                />
                <rect
                  className="a"
                  width="3.078"
                  height="3.078"
                  transform="translate(6564.722 195.222)"
                />
                <rect
                  className="a"
                  width="3.078"
                  height="3.078"
                  transform="translate(6573.376 195.222)"
                />
                <rect
                  className="a"
                  width="3.078"
                  height="3.078"
                  transform="translate(6582.029 195.222)"
                />
                <rect
                  className="a"
                  width="25.442"
                  height="21.097"
                  transform="translate(6562.194 181.397)"
                />
              </g>
            </svg>
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/number-list"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22.612"
              height="27.5"
              viewBox="0 0 22.612 27.5"
              id="ico-9"
            >
              <g transform="translate(1015.742 1216.078)">
                <path
                  className="a"
                  d="M-955.937-1212.622h-5.194v-2.707h5.194Z"
                  transform="translate(-45.902 0)"
                />
                <g transform="translate(-1014.992 -1212.622)">
                  <path
                    className="a"
                    d="M-201.891-156.445H-223v-23.294h21.112Z"
                    transform="translate(223.004 179.738)"
                  />
                  <path
                    className="a"
                    d="M-183.28-173.007h-13.3v-1.018h13.3Z"
                    transform="translate(200.489 174.869)"
                  />
                </g>
                <g transform="translate(-1010.368 -1206.61)">
                  <g transform="translate(0 0)">
                    <path
                      className="b"
                      d="M-4413.208-247.148h11.771"
                      transform="translate(4413.306 251.379)"
                    />
                    <path
                      className="b"
                      d="M-4413.208-275.78h11.771"
                      transform="translate(4413.306 275.78)"
                    />
                    <path
                      className="b"
                      d="M-4413.208-218.517h11.771"
                      transform="translate(4413.306 226.978)"
                    />
                    <path
                      className="b"
                      d="M-4413.872-189.885h11.771"
                      transform="translate(4413.872 202.578)"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span className="menuName">Number List</span>
          </NavLink>
        </li> */}
      </ul>
      <div className="leftMenuToggle">
        {pathURL !== "/dashboard" ?
          <>
            <button
              className={
                tglLeftMenuStatus ? "leftMenuToggleBtn active" : "leftMenuToggleBtn"
              }
              onClick={() => toggleLeftSubMenu()}
            ></button>
            <span className={tglLeftMenuStatus ? "menuName active" : "menuName"}>
              {tglLeftMenuStatus ? "Open" : "Close"}
            </span>
          </>
          : ''}
      </div>
    </div>
  );
}

export default LeftMenu;
