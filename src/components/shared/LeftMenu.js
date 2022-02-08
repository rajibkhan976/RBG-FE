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
        {!isAssociationOwner ?
        <li className="prototypeLink">
          <Link to={{ pathname: "https://xd.adobe.com/view/51a2c0f4-74d2-4ab7-9635-d6b625301742-04f1/?fullscreen" }}
            target="_blank">
            <div className="prototypeBatch">Prototype</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
              <g id="_tower_icon_svg" transform="translate(-0.75 -0.75)">
                <rect id="Rectangle_537" data-name="Rectangle 537" width="1" height="1" transform="translate(28 28)" fill="#305671" stroke="#305671" strokeWidth="0.5" />
                <rect id="Rectangle_538" data-name="Rectangle 538" width="1" height="1" transform="translate(1 28)" fill="#305671" stroke="#305671" strokeWidth="0.5" />
                <path id="Path_438" data-name="Path 438" d="M22.377,10.879l4.042,2.694h1.034V11.283a2.245,2.245,0,0,0,0-4.4V4.592H26.419L22.377,7.287H20.995l-.9-1.8H17.574V3.612a1.347,1.347,0,1,0-.9,0V5.491H14.153l-.9,1.8H11.872L7.83,4.592H6.8V6.883a2.245,2.245,0,0,0,0,4.4v2.291H7.83l4.042-2.694h.26l-1.7,15.268h-.5a2.25,2.25,0,0,0-2.2,1.8H5v.9H29.249v-.9h-2.74a2.249,2.249,0,0,0-2.2-1.8h-.5l-1.7-15.268ZM17.125,1.9a.449.449,0,1,1-.449.449A.449.449,0,0,1,17.125,1.9ZM28.351,9.083a1.345,1.345,0,0,1-.9,1.265V7.819A1.344,1.344,0,0,1,28.351,9.083Zm-1.8-3.5v7L22.962,10.19V7.976Zm-11.847.807h4.834l.449.9H14.259Zm-2.523,1.8h9.879v1.8H19.7a3.136,3.136,0,0,0-5.152,0H12.185Zm.269,11.676,4.671-2.2,4.67,2.2Zm9.341.9-4.671,2.2-4.671-2.2Zm-9.664-1.74.392-3.522,3.546,1.669Zm3.938,4.434-4.675,2.2.465-4.181Zm1.055.5,4.671,2.2H12.454Zm1.055-.5,4.21-1.981.465,4.181Zm0-6.287L21.726,15.5l.392,3.522Zm3.442-2.613-4.5,2.116-4.5-2.116.019-.172,1.856-.873a3.138,3.138,0,0,0,5.243,0l1.856.873Zm-6.742-2.776a2.245,2.245,0,1,1,2.245,2.245A2.248,2.248,0,0,1,14.879,11.777ZM5.9,9.083a1.345,1.345,0,0,1,.9-1.265v2.529A1.344,1.344,0,0,1,5.9,9.083Zm1.8,3.5v-7l3.592,2.395V10.19Zm6.419-1.706a3.123,3.123,0,0,0,0,1.816l-1.355.638.273-2.454Zm11.46,17.064H8.675a1.345,1.345,0,0,1,1.265-.9h14.37A1.345,1.345,0,0,1,25.574,27.943ZM21.486,13.333,20.131,12.7a3.123,3.123,0,0,0,0-1.816h1.078Z" transform="translate(-2.204)" fill="#305671" stroke="#305671" strokeWidth="0.5" />
              </g>
            </svg>
            <span className="menuName">Comm.</span>
          </Link>
        </li> : ''}
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
        {!isAssociationOwner && permissions && permissions.findIndex(p => p.entity === "automation") >= 0 ?
          <li className="prototypeLink">
            <Link to={{ pathname: "https://xd.adobe.com/view/c9a94693-8d3c-4ffb-9a8b-6b07f07ef79c-9cfa/?fullscreen" }}
              target="_blank">
              <div className="prototypeBatch">Prototype</div>
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
            </Link>
          </li> : ""}
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
        </li>  */}
        {isOrganizationOwner ? <li className="prototypeLink">
          <NavLink to="/appointment"
          className="leftMenuLink"
              activeClassName="selected"
          onClick={(e) => props.clickedSetupStatus(e)}

          // {{ pathname: "https://xd.adobe.com/view/1a813aee-7ec1-42ca-9093-051ac3823496-4fd2/screen/b9e30ce7-1846-4d55-aedd-1639f29e7f28/?fullscreen" }}
          //
          >
            <div className="prototypeBatch">Prototype</div>
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
            <span className="menuName">Report</span>
          </NavLink>
        </li> : ''}
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
