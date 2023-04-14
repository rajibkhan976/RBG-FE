import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { NavLink, useLocation, Link } from "react-router-dom";
import LogoImg from "../../assets/images/logo_img.png";

function LeftMenu(props) {
  const pathURL = useLocation().pathname;
  const loggedInUser = useSelector((state) => state.user.data);
  let isAssociationOwner = loggedInUser ? loggedInUser.isAssociationOwner : false;
  let isOrganizationOwner = loggedInUser ? loggedInUser.isOrganizationOwner : false;

  const [tglLeftMenuStatus, setTglLeftMenuStatus] = useState(false);

  const toggleLeftSubMenu = (status) => {
    if (tglLeftMenuStatus) {
      setTglLeftMenuStatus(false);
    } else {
      setTglLeftMenuStatus(true);
    }
    props.toggleLeftSubMenu && props.toggleLeftSubMenu(tglLeftMenuStatus);
  };

  // Permission Set
  const [permissions, setPermissions] = useState(JSON.parse(localStorage.getItem("permissions")));

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
            activeClassName="selected nobg"
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
        {/* {!isAssociationOwner ?
        <li className="prototypeLink"> */}
          {/* <Link to={{ pathname: "https://xd.adobe.com/view/51a2c0f4-74d2-4ab7-9635-d6b625301742-04f1/?fullscreen" }}
            target="_blank"> */}
            {/* <a href="javascript:void(0)"> */}
            {/* <div className="prototypeBatch">Prototype</div> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
              <g id="_tower_icon_svg" transform="translate(-0.75 -0.75)">
                <rect id="Rectangle_537" data-name="Rectangle 537" width="1" height="1" transform="translate(28 28)" fill="#305671" stroke="#305671" strokeWidth="0.5" />
                <rect id="Rectangle_538" data-name="Rectangle 538" width="1" height="1" transform="translate(1 28)" fill="#305671" stroke="#305671" strokeWidth="0.5" />
                <path id="Path_438" data-name="Path 438" d="M22.377,10.879l4.042,2.694h1.034V11.283a2.245,2.245,0,0,0,0-4.4V4.592H26.419L22.377,7.287H20.995l-.9-1.8H17.574V3.612a1.347,1.347,0,1,0-.9,0V5.491H14.153l-.9,1.8H11.872L7.83,4.592H6.8V6.883a2.245,2.245,0,0,0,0,4.4v2.291H7.83l4.042-2.694h.26l-1.7,15.268h-.5a2.25,2.25,0,0,0-2.2,1.8H5v.9H29.249v-.9h-2.74a2.249,2.249,0,0,0-2.2-1.8h-.5l-1.7-15.268ZM17.125,1.9a.449.449,0,1,1-.449.449A.449.449,0,0,1,17.125,1.9ZM28.351,9.083a1.345,1.345,0,0,1-.9,1.265V7.819A1.344,1.344,0,0,1,28.351,9.083Zm-1.8-3.5v7L22.962,10.19V7.976Zm-11.847.807h4.834l.449.9H14.259Zm-2.523,1.8h9.879v1.8H19.7a3.136,3.136,0,0,0-5.152,0H12.185Zm.269,11.676,4.671-2.2,4.67,2.2Zm9.341.9-4.671,2.2-4.671-2.2Zm-9.664-1.74.392-3.522,3.546,1.669Zm3.938,4.434-4.675,2.2.465-4.181Zm1.055.5,4.671,2.2H12.454Zm1.055-.5,4.21-1.981.465,4.181Zm0-6.287L21.726,15.5l.392,3.522Zm3.442-2.613-4.5,2.116-4.5-2.116.019-.172,1.856-.873a3.138,3.138,0,0,0,5.243,0l1.856.873Zm-6.742-2.776a2.245,2.245,0,1,1,2.245,2.245A2.248,2.248,0,0,1,14.879,11.777ZM5.9,9.083a1.345,1.345,0,0,1,.9-1.265v2.529A1.344,1.344,0,0,1,5.9,9.083Zm1.8,3.5v-7l3.592,2.395V10.19Zm6.419-1.706a3.123,3.123,0,0,0,0,1.816l-1.355.638.273-2.454Zm11.46,17.064H8.675a1.345,1.345,0,0,1,1.265-.9h14.37A1.345,1.345,0,0,1,25.574,27.943ZM21.486,13.333,20.131,12.7a3.123,3.123,0,0,0,0-1.816h1.078Z" transform="translate(-2.204)" fill="#305671" stroke="#305671" strokeWidth="0.5" />
              </g>
            </svg>
            <span className="menuName">Comm.</span>
            </a> */}
          {/* </Link> */}
        {/* </li> : ''} */}
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
        {permissions && permissions.findIndex(p => p.entity === "authentication" || 'roles' || 'groups' || 'users') >= 0 ?
          <li>
            <NavLink
              className="leftMenuLink"
              isActive={() => ["/roles", "/groups", "/users"]}
              activeClassName={
                pathURL === "/roles" ||
                  pathURL === "/groups" ||
                  pathURL === "/users" ||
                  pathURL === "/organizations" ||
                  pathURL === "/associations"
                  ? "selected"
                  : ""
              }
              to="/users"
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
        {/* {!isAssociationOwner && permissions && permissions.findIndex(p => p.entity === "automation") >= 0 ?
          <li className="prototypeLink"> */}
            {/* <Link to={{ pathname: "https://xd.adobe.com/view/c9a94693-8d3c-4ffb-9a8b-6b07f07ef79c-9cfa/?fullscreen" }}
              target="_blank"> */}
              {/* <a href="javascript:void(0)"> */}
              {/* <div className="prototypeBatch">Prototype</div> */}
              {/* <svg
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
              </a> */}
            {/* </Link> */}
          {/* </li> : ""} */}
        {/*{permissions && permissions.findIndex(p => p.entity === "automation") >= 0 ?*/}
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
          </li> {/*: ""}*/}
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
        </li>  */}
         {/* <li className="prototypeLink">
           <NavLink to="/appointment"
           className="leftMenuLink"
            
              isActive={() => ["/appointment", "/attendence", "/revenue"]}
              activeClassName={
                  pathURL === "/appointment" ||
                  pathURL === "/attendence" ||
                  pathURL === "/revenue"
                  ? "selected"
                  : ""
              }


           > */}
            {/* <div className="prototypeBatch">Prototype</div>  */}
             {/* <svg
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
            </svg> */}
            {/* <span className="menuName">Report</span>
          </NavLink>
        </li>  */}
        <li>
          <NavLink
            className="leftMenuLink"
            activeClassName="selected"
            to="/appointment-global"
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
            <span className="menuName">Appointment</span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected nobg"
            to="/attendance-global"
            onClick={(e) => props.clickedSetupStatus(e)}
          >
           <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" id="ico-10">
            <path className="a" d="M18.7 2.3H16.5V1.15C16.5 0.845001 16.3841 0.552494 16.1778 0.336827C15.9715 0.12116 15.6917 0 15.4 0C15.1083 0 14.8285 0.12116 14.6222 0.336827C14.4159 0.552494 14.3 0.845001 14.3 1.15V2.3H7.7V1.15C7.7 0.845001 7.58411 0.552494 7.37782 0.336827C7.17153 0.12116 6.89174 0 6.6 0C6.30826 0 6.02847 0.12116 5.82218 0.336827C5.61589 0.552494 5.5 0.845001 5.5 1.15V2.3H3.3C2.42479 2.3 1.58542 2.66348 0.966548 3.31048C0.347678 3.95748 0 4.835 0 5.75V19.55C0 20.465 0.347678 21.3425 0.966548 21.9895C1.58542 22.6365 2.42479 22.8 3.3 22.8H11H18.7C19.5752 22.8 20.4146 22.6365 21.0335 21.9895C21.6523 21.3425 22 20.465 22 19.55V5.75C22 4.835 21.6523 3.95748 21.0335 3.31048C20.4146 2.66348 19.5752 2.3 18.7 2.3ZM19.8 19.55C19.8 19.855 19.6841 20.1475 19.4778 20.3632C19.2715 20.5788 18.9917 20.7 18.7 20.7H3.3C3.00826 20.7 2.72847 20.5788 2.52218 20.3632C2.31589 20.1475 2.2 19.855 2.2 19.55V9.2H19.8V19.55ZM19.8 9.2H2.2V5.75C2.2 5.445 2.31589 5.15249 2.52218 4.93683C2.72847 4.72116 3.00826 4.6 3.3 4.6H5.5V5.75C5.5 6.055 5.61589 6.34751 5.82218 6.56317C6.02847 6.77884 6.30826 6.9 6.6 6.9C6.89174 6.9 7.17153 6.77884 7.37782 6.56317C7.58411 6.34751 7.7 6.055 7.7 5.75V4.6H14.3V5.75C14.3 6.055 14.4159 6.34751 14.6222 6.56317C14.8285 6.77884 15.1083 6.9 15.4 6.9C15.6917 6.9 15.9715 6.77884 16.1778 6.56317C16.3841 6.34751 16.5 6.055 16.5 5.75V4.6H18.7C18.9917 4.6 19.2715 4.72116 19.4778 4.93683C19.6841 5.15249 19.8 5.445 19.8 5.75V9.2Z" />
            <path className="a" d="M13.9384 15.3864C14.5093 14.7811 14.8962 14.013 15.0505 13.1786C15.2048 12.3443 15.1196 11.4809 14.8056 10.697C14.4916 9.91307 13.9629 9.24363 13.2858 8.77281C12.6088 8.30198 11.8137 8.05078 11.0004 8.05078C10.1871 8.05078 9.39198 8.30198 8.71494 8.77281C8.03789 9.24363 7.50916 9.91307 7.19518 10.697C6.88121 11.4809 6.79601 12.3443 6.9503 13.1786C7.10459 14.013 7.49148 14.7811 8.06233 15.3864C6.98478 15.829 6.05944 16.5998 5.40643 17.5988C4.75343 18.5979 4.40291 19.7789 4.40039 20.9887C4.40033 21.102 4.42163 21.2141 4.46306 21.3187C4.5045 21.4233 4.56527 21.5184 4.64189 21.5984C4.71851 21.6785 4.80948 21.742 4.9096 21.7853C5.00973 21.8286 5.11703 21.8508 5.22539 21.8508H16.7754C16.8837 21.8508 16.9911 21.8286 17.0912 21.7853C17.1913 21.742 17.2823 21.6785 17.3589 21.5984C17.4355 21.5184 17.4963 21.4233 17.5377 21.3187C17.5792 21.2141 17.6005 21.102 17.6004 20.9887C17.5979 19.7789 17.2474 18.5979 16.5944 17.5988C15.9413 16.5998 15.016 15.829 13.9384 15.3864ZM11.0004 9.78228C11.4899 9.78228 11.9684 9.93395 12.3754 10.2181C12.7824 10.5023 13.0997 10.9062 13.287 11.3787C13.4743 11.8513 13.5233 12.3713 13.4278 12.8729C13.3323 13.3746 13.0966 13.8354 12.7505 14.197C12.4043 14.5587 11.9633 14.805 11.4832 14.9048C11.0031 15.0046 10.5055 14.9534 10.0532 14.7576C9.601 14.5619 9.21446 14.2304 8.9425 13.8052C8.67055 13.3799 8.52539 12.8799 8.52539 12.3684C8.52612 11.6827 8.78711 11.0254 9.25111 10.5406C9.7151 10.0557 10.3442 9.78304 11.0004 9.78228ZM6 21C6 19.5 6.83099 18.2798 7.56738 17.6517C8.30377 17.0237 9.22482 16.68 10.1754 16.6786H11.8254C12.776 16.68 13.697 17.0237 14.4334 17.6517C15.1698 18.2798 16 19.5 16 21H6Z" />
           </svg>
            <span className="menuName">Attendance</span>
          </NavLink>
        </li>
        
        <li>
          <NavLink activeClassName="selected nobg"
            to="/transaction-global"
            onClick={(e) => props.clickedSetupStatus(e)}
          >
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" id="ico-12">
                <path className="a" d="M27.5 9.68V23.32C27.5 25.41 27.3075 26.895 26.8125 27.9538C26.8125 27.9675 26.7987 27.995 26.785 28.0088C26.4825 28.3938 26.0838 28.5863 25.6163 28.5863C24.8875 28.5863 24.0075 28.105 23.0588 27.0875C21.9313 25.8775 20.1987 25.9737 19.2087 27.2937L17.82 29.1363C17.27 29.8788 16.5412 30.25 15.8125 30.25C15.0838 30.25 14.355 29.8788 13.805 29.1363L12.4025 27.28C11.4263 25.9738 9.70749 25.8775 8.57999 27.0737L8.56622 27.0875C7.01247 28.7513 5.63753 28.9988 4.84003 28.0088C4.82628 27.995 4.8125 27.9675 4.8125 27.9538C4.3175 26.895 4.125 25.41 4.125 23.32V9.68C4.125 7.59 4.3175 6.105 4.8125 5.04625C4.8125 5.0325 4.81253 5.01875 4.84003 5.005C5.62378 4.00125 7.01247 4.24875 8.56622 5.9125L8.57999 5.92625C9.70749 7.1225 11.4263 7.02625 12.4025 5.72L13.805 3.86375C14.355 3.12125 15.0838 2.75 15.8125 2.75C16.5412 2.75 17.27 3.12125 17.82 3.86375L19.2087 5.70625C20.1987 7.02625 21.9313 7.1225 23.0588 5.9125C24.0075 4.895 24.8875 4.41375 25.6163 4.41375C26.0838 4.41375 26.4825 4.62 26.785 5.005C26.8125 5.01875 26.8125 5.0325 26.8125 5.04625C27.3075 6.105 27.5 7.59 27.5 9.68Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path className="a" d="M11 14.0938H22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path className="a" d="M11 18.9062H19.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <span className="menuName">Transaction</span>
          </NavLink>
        </li>
      </ul>
      {/* <div className="leftMenuToggle">
        {(pathURL === "/users" || pathURL === "/organizations" || pathURL === "/associations") &&  (loggedInUser && loggedInUser.organization && loggedInUser.organizationCode === 'rbg')  ?
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
          : ""
           }
      
      </div> */}
     <div className="leftMenuToggle">
     {
       
       ((pathURL !== "/dashboard" && pathURL !== "/automation-builder" && pathURL !== "/automation-list" && pathURL !== "/contacts" 
       && pathURL !== "/appointment-global" && pathURL !== "/attendance-global" && pathURL !== "/transaction-global"
       && pathURL !== "/communicationLog" && pathURL !== "/users" && pathURL !== "/organizations" && pathURL !== "/associations") ? 
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
          </> : 
       
       (pathURL === "/users" || pathURL === "/organizations" || pathURL === "/associations") &&  (loggedInUser && loggedInUser.organization && loggedInUser.organizationCode === 'rbg')  ?
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
   </> : 
        "")
        
   
          }
          </div>
    </div>
  );
}

export default LeftMenu;
