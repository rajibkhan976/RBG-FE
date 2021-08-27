import React, { useState, useEffect } from "react";
import Overview from "./pages/Overview";
import Attendance from "./pages/Attendance";
import { Step, Steps, NavigationComponentProps} from "react-step-builder";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import minimize_icon from "../../../assets/images/minimize_icon.svg";
import cross_white from "../../../assets/images/cross_white.svg";
import user_100X100 from "../../../assets/images/user_100X100.png";
import camera_icon from "../../../assets/images/camera_icon.svg";
import editIcon_white from "../../../assets/images/editIcon_white.svg";
import phone_call_icon_white from "../../../assets/images/phone_call_icon_white.svg";
import email_icon_white from "../../../assets/images/email_icon_white.svg";
import histroy_icon_white from "../../../assets/images/histroy_icon_white.svg";
import user_icon_white from "../../../assets/images/user_icon_white.svg";
import tag_icon_white from "../../../assets/images/tag_icon_white.svg";
import battery_icon_white from "../../../assets/images/battery_icon_white.svg";
import exchange_icon_white from "../../../assets/images/exchange_icon_white.svg";
import pager_icon_white from "../../../assets/images/pager_icon_white.svg";
import note_icon_white from "../../../assets/images/note_icon_white.svg";


const ContactModal = (props) => {

    const Navigation = (navigation) => {
        return (
            <div>
                <button className={navigation.current == 1 ? "active" : ""} onClick={() => navigation.jump(1)}>Overview</button>
                <button className={navigation.current == 2 ? "active" : ""} onClick={() => navigation.jump(2)}>Attendance</button>
            </div>
        );
    }

    const config = {
        navigation: {
            component: Navigation, 
            location: "before"
        }
    };

    const [stickeyHeadStatus, setStickeyHeadStatus] = useState(false);
    const [contactModalOpenStatus, setContactModalOpenStatus] = useState(true);
    const dispatch = useDispatch();
    const closeContactModal = () => {
        dispatch({
            type: actionTypes.CONTACTS_MODAL_ID,
            contact_modal_id: '',
        });
    }

    const formScroll = (formScrollStatus) => {
        setStickeyHeadStatus(formScrollStatus);
    };
    useEffect(() => {
        console.log(props.contactId)
      }, []);
    return(
        <>
            <div className="modal contactModal">
                <div className="modalContainer">
                    <div className={stickeyHeadStatus ? "contactModalHeader stickey" : "contactModalHeader"}>
                        <div className="contactModalHeaderTopSec">
                            
                            <div className="modalCtrl">
                                <button className="minimize">
                                    <img src={minimize_icon} alt="" />
                                </button>
                                <button className="closeModal" onClick={() => closeContactModal()} >
                                    <img src={cross_white} alt=""/>
                                </button>
                            </div>
                            <div className="userInfoArea">
                                <div className="userImageWrap">
                                    <span className="userImage">
                                        <img src={user_100X100} alt="" />
                                    </span>
                                    <button className="editUserImg">
                                      <img src={camera_icon} alt="" />  
                                    </button>
                                </div>
                                <div className="userName">
                                    Richard Nile
                                    <button className="editUserName">
                                        <img src={editIcon_white} alt="" /> 
                                    </button>
                                </div>
                                <div className="ltValue">
                                    <header>Life Time Value :</header>
                                    <span>USD 32,546</span>
                                </div>
                                {/* <div className="userContacts">
                                    <div className="userPhone">
                                        <img src={phone_call_icon_white} alt="" /> 
                                        <span>+1-4132045887</span>
                                    </div>
                                    <div className="userEmail">
                                        <img src={email_icon_white} alt="" /> 
                                        <span>richardnile@gmail.com</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="contactModalHeaderBottomSec">
                            <div className="bottomLeftArea">
                                <div className="userContacts">
                                    <div className="userPhone">
                                        <img src={phone_call_icon_white} alt="" /> 
                                        <span>+1-4132045887</span>
                                    </div>
                                    <div className="userEmail">
                                        <img src={email_icon_white} alt="" /> 
                                        <span>richardnile@gmail.com</span>
                                    </div>
                                </div>
                                <div className="clockinArea">
                                    <button className="clockinBtn orangeBtn">
                                        <img src={histroy_icon_white} alt="" /> Check-in
                                    </button>
                                    <p className="logTime">Last attended 19 hrs ago</p>
                                </div>
                            </div>
                            <div className="bottomRightArea">
                                <div className="bottomRightAreaCol firstCol">
                                    <div className="userInfoCell">
                                        <span className="cellInfoIcon">
                                            <img src={user_icon_white} alt="" />
                                        </span>
                                        <span className="infoCellTxt">rank name</span>
                                    </div>
                                    <div className="userInfoCell">
                                        <span className="cellInfoIcon">
                                            <img src={battery_icon_white} alt="" />
                                        </span>
                                        <span className="infoCellTxt">Prospect - showed</span>
                                    </div>
                                </div>
                                <div className="bottomRightAreaCol">
                                    <div className="userInfoCell">
                                        <span className="cellInfoIcon">
                                            <img src={tag_icon_white} alt="" />
                                        </span>
                                        <span className="infoCellTxt">Tag One, Tag Two, Tag Three</span>
                                        <span className="extraTagNumber">+5</span>
                                    </div>
                                    <div className="userInfoCell">
                                        <button className="addNewTag">+ Add Tag</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="redBtnContainer">
                            <button className="redTabBtn">
                                <img src={exchange_icon_white} alt="" />
                            </button>
                            <button className="redTabBtn">
                                <img src={pager_icon_white} alt="" />
                            </button>
                            <button className="redTabBtn">
                                <img src={note_icon_white} alt="" />
                            </button>
                        </div> */}
                    </div>
                    <div className="tabBarArea">
                        <Steps config={config}>
                            <Step title="Overview" component={Overview} contactId={props.contactId} formScroll={(formScrollStatus) => formScroll(formScrollStatus)} />
                            <Step title="Attendance" component={Attendance} />
                        </Steps>
                    </div>

                    
                </div>
                <div className="modalOverlay" onClick={closeContactModal}></div>
            </div> 
        </>
    );
}

export default ContactModal;
