import { useEffect, useState } from "react";
import Notifications from "./Notifications";
import Setup from "../setup/mainPopup/setup";
import CallModal from "./callModal";
import { useDispatch } from "react-redux";
import AuthActions from "../../actions/AuthActions";
import CreateIcon from "../../assets/images/create.png";
import NotificationIcon from "../../assets/images/notif.png";
import UserIcon from "../../assets/images/user.png";
import blueDownArrow from "../../assets/images/blueDownArrow.svg";
import callIcon1 from "../../assets/images/callicon1.svg";
import callIcon2 from "../../assets/images/callicon2.svg";
import callIcon3 from "../../assets/images/callicon3.svg";
import sms_icon from "../../assets/images/sms_icon.svg";
import email_icon from "../../assets/images/email_icon.svg";
import SettingIcon from "../../assets/images/settings.svg";
import SettingIconBlue from "../../assets/images/settings_blue.svg";
import DownloadIcon from "../../assets/images/download.svg";
import cross_white from "../../assets/images/cross_white.svg";
import userPhoto from "../../assets/images/userPhoto.png";
import editIcon_white from "../../assets/images/edit_white2.png";
import phone_call_icon_white from "../../assets/images/phone_call_icon_white.svg";
import email_icon_white from "../../assets/images/email_icon_white.svg";
import speaker_icon2 from "../../assets/images/speaker_icon2.svg";
import help_icon from "../../assets/images/help_icon.svg";
import headset_icon from "../../assets/images/headset_icon.svg";
import logout_icon from "../../assets/images/logout_icon.svg";
import { CallSetupService } from "../../services/setup/callSetupServices";
import { useStopwatch } from "react-timer-hook";
import { ImportContactServices } from "../../services/contact/importContact";
import * as actionTypes from "../../actions/types";
const { Device } = require("twilio-client");

function HeaderDashboard(props) {
  const [setupModalStatus, setSetupModalStatus] = useState(false);
  const [stateNotifMenu, setStateNotifMenu] = useState(false);
  const [stateUserMenu, setStateUserMenu] = useState(false);
  const [locationLoaded, setLocationLoaded] = useState("user");
  const [showActionState, setShowActionState] = useState(false);
  const [device, setDevice] = useState(new Device());
  const [deviceMessage, setDeviceMessage] = useState("loading");
  const [connection, setConnection] = useState({});
  const { seconds, minutes, hours, start, reset, pause } = useStopwatch({
    autoStart: false,
  });

  const toggleNotifications = (e) => {
    setStateNotifMenu(!stateNotifMenu);
  };

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(AuthActions.logout());
  };

  const tglActionList = () => {
    setShowActionState(!showActionState);
  };

  const toggleUserMenu = () => {
    setStateUserMenu(true);
  };
  const closeUserMenu = () => {
    setStateUserMenu(false);
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
  const fetchCapabilityToken = async () => {
    try {
      const result = await CallSetupService.getCapabilityToken();
      let conf = {};
      if (result.ringtone !== "") {
        conf = {
          sounds: {
            incoming: result.ringtone,
          },
        };
      }
      setDevice(device.setup(result.token, conf));
    } catch (e) {
      console.log("error", e);
    }
  };
  const acceptConnection = () => {
    if (Object.keys(connection).length > 0) {
      connection.accept();
    }
  };
  const hangup = () => {
    if (Object.keys(connection).length > 0) {
      if (connection.status() === "pending") {
        connection.reject();
        setDeviceMessage("Call Hangup");
        setTimeout(function () {
          setDeviceMessage("Ready");
        }, 3000);
      } else {
        device.disconnectAll();
        setDeviceMessage("Ready");
      }
      setConnection({});
      pause();
    } else {
      device.disconnectAll();
      setDeviceMessage("Ready");
      setConnection({});
      pause();
    }
  };
  useEffect(() => {
    if (Object.keys(connection).length) {
      if (connection._direction === "INCOMING") {
        setDeviceMessage(
          "Call Established with " +
            connection.parameters.From +
            " for " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
        );
      } else {
        setDeviceMessage(
          "Call Established with " +
            connection.parameters.To +
            " for " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
        );
      }
    }
  }, [hours, minutes, seconds]);
  const getContactDetails = async (number) => {
    try {
      let payload = {
        number: number,
      };
      const result = await ImportContactServices.saveContact(payload);
      return result.data;
    } catch (e) {
      return {
        success: false,
      };
    }
  };
  useEffect(() => {
    if (Object.keys(connection).length) {
      connection.on("disconnect", function (conn) {
        setDeviceMessage("Ready");
        pause();
      });
    }
  }, [connection]);
  useEffect(() => {
    // getContactDetails("+18124051848")
    fetchCapabilityToken();
    device.on("incoming", async (connection) => {
      setConnection(connection);
      if (connection._direction === "INCOMING") {
        setDeviceMessage("Incoming Call from " + connection.parameters.From);
      } else {
        setDeviceMessage("Outgoing Call to " + connection.parameters.To);
      }
    });

    device.on("ready", (device) => {
      setDeviceMessage("Ready");
      pause();
    });
    device.on("connect", async (connection) => {
      setConnection(connection);
      reset();
      start();
      let contactId = "";
      if (connection._direction === "INCOMING") {
        setDeviceMessage(
          "Call Established with " +
            connection.parameters.From +
            " for " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
        );
        contactId = await getContactDetails(connection.parameters.From);
      } else {
        setDeviceMessage(
          "Call Established with " +
            connection.message.To +
            " for " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds
        );
        contactId = await getContactDetails(connection.message.To);
      }
      if (contactId.success) {
        dispatch({
          type: actionTypes.CONTACTS_MODAL_ID,
          contact_modal_id: contactId.data,
        });
      }
    });

    device.on("disconnect", (connection) => {
      setConnection(connection);
      setDeviceMessage("Ready");
      pause();
    });
    window.location.pathname === "/roles"
      ? setLocationLoaded("roles")
      : window.location.pathname === "/groups"
      ? setLocationLoaded("groups")
      : window.location.pathname === "/users"
      ? setLocationLoaded("user")
      : window.location.pathname ===
        ("/automation-list" || "/automation-builder")
      ? setLocationLoaded("automation")
      : setLocationLoaded(null);
  }, []);

  const toggleSetup = () => {
    setSetupModalStatus(!setupModalStatus);
  };
  const [modalMakeCall, setModalMakeCall] = useState(false);
  const makeCallModalHandle = () => {
    setModalMakeCall(true);
    setShowActionState(false);
  };
  const callModalOffhandler = () => {
    setModalMakeCall(false);
  };
  const makeOutgoingCall = (to) => {
    setDeviceMessage("Establishing Call..");
    device.connect({
      To: to,
    });
  };

  const clickedLink = (e) => {
    e.target && setSetupModalStatus(!setupModalStatus);
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
        <div className="headerCallToAction">
          <div className="leftListArea">
            <div className="leftList">
              <button className="callToActionBtn">
                <span className="callBtn green">
                  <img src={callIcon3} alt="" />
                </span>
                <span className="actionName">Call</span>
              </button>
              <button className="listDropBtn" onClick={tglActionList}>
                <img src={blueDownArrow} alt="" />
              </button>
              {showActionState ? (
                <div className="leftBtnList">
                  <ul>
                    <li className="active">
                      <input
                        type="radio"
                        name="ces"
                        value="call"
                        onClick={makeCallModalHandle}
                      />
                      <span className="callBtn green">
                        <img src={callIcon3} alt="" />
                      </span>
                      <span className="actionName">Call</span>
                    </li>
                    <li>
                      <input type="radio" name="ces" value="sms" />
                      <span className="callBtn violet">
                        <img src={sms_icon} alt="" />
                      </span>
                      <span className="actionName">SMS</span>
                    </li>
                    <li>
                      <input type="radio" name="ces" value="email" />
                      <span className="callBtn blue">
                        <img src={email_icon} alt="" />
                      </span>
                      <span className="actionName">Email</span>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="rightDetails">
            <p>{deviceMessage}</p>
            <div className="d-flex">
              <button className="btn callBtn green" onClick={acceptConnection}>
                <img src={callIcon2} alt="" />
              </button>
              <button className="btn callBtn red" onClick={hangup}>
                <img src={callIcon1} alt="" />
              </button>
            </div>
          </div>
        </div>
        <button className="btn buttonHeaderIcons">
          <img src={DownloadIcon} alt="" />
        </button>
        <button
          className={
            setupModalStatus
              ? "btn buttonHeaderIcons active"
              : "btn buttonHeaderIcons"
          }
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
            <i>
              <img src={blueDownArrow} alt="" />
            </i>
          </button>
          {/* */}
        </div>
      </div>

      {stateUserMenu && (
        <div class="sideMenuOuter">
          <div class="sideMenuInner userModal">
            <div class="modal_call_header">
              <button class="btn btn_empty" onClick={closeUserMenu}>
                <img src={cross_white} alt="" />
              </button>
              <div className="user_details">
                <div className="user_profile">
                  <img src={userPhoto} alt="" />
                </div>
                <div className="userContacts">
                  <h3>
                    Steve Mile
                    <p>Gym Owner</p>
                  </h3>
                  <div className="userPhone">
                    <img src={phone_call_icon_white} alt="" />
                    <span>+1-4132045887</span>
                  </div>
                  <div className="userEmail">
                    <img src={email_icon_white} alt="" />
                    <span>williamblake@gmail.com</span>
                  </div>
                  <div className="userPhone">
                    <img src={editIcon_white} alt="" />
                    <span>Edit</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="user_modal_body">
              <div className="user_modal_cont">
                <p>Organization</p>
                <h3>The Wellness Society</h3>
                <div className="creditText">
                  <span>Credit Balance </span>
                  <span className="blue">14600</span>
                </div>
                <div className="userPlan">
                  <div>
                    <span>Current Plan</span>
                    <p>SILVER</p>
                  </div>
                  {/* <button className="btn orangeBtn">UPGRADE</button> */}
                </div>
              </div>
              <div className="user_modal_menu">
                <p>
                  {" "}
                  <button>
                    {" "}
                    <img src={help_icon} alt="" /> Help
                  </button>
                </p>
                <p>
                  {" "}
                  <button>
                    <img src={headset_icon} alt="" /> Contact Support
                  </button>
                </p>
                <p>
                  {" "}
                  <button>
                    <img src={speaker_icon2} alt="" /> What's New{" "}
                  </button>
                </p>
                <p>
                  {stateUserMenu ? (
                    <button onClick={logOut}>
                      <img src={logout_icon} alt="" /> Logout
                    </button>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {setupModalStatus && <Setup clickedLink={(e) => clickedLink(e)} />}

      {modalMakeCall && (
        <CallModal
          callModalOff={callModalOffhandler}
          makeOutgoingCall={makeOutgoingCall}
          device={device}
        />
      )}
    </>
  );
}

export default HeaderDashboard;
