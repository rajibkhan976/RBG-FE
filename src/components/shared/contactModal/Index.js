import React, { useState, useEffect } from "react";
import Overview from "./pages/Overview";
import Attendance from "./pages/Attendance";
import Transaction from "./pages/Transaction";
import Billing from "./pages/Billing";
import { Step, Steps, NavigationComponentProps} from "react-step-builder";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import { ContactService } from "../../../services/contact/ContactServices";

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
                <button className={navigation.current == 1 ? "active nNav" : "nNav"} onClick={() => navigation.jump(1)}>Overview</button>
                <button className={navigation.current == 2 ? "active nNav" : "nNav"} onClick={() => navigation.jump(2)}>Attendance</button>
                <button className={navigation.current == 3 ? "active nNav" : "nNav"} onClick={() => navigation.jump(3)} id="transNav">                
                   <svg  className="" xmlns="http://www.w3.org/2000/svg" width="11.428" height="14.148" viewBox="0 0 11.428 14.148">
                        <g transform="translate(311.96 148.974)">
                            <path class="a" d="M12.318,5.6a1.013,1.013,0,0,0-1.1.22L7.837,9.2a1.013,1.013,0,1,0,1.433,1.433l1.648-1.648v9.676a1.013,1.013,0,0,0,2.026,0V6.539A1.013,1.013,0,0,0,12.318,5.6Z" transform="translate(-319.5 -154.5)" />
                            <path class="a" d="M20.134,14.568l-1.648,1.648V6.539a1.013,1.013,0,0,0-2.026,0V18.661a1.013,1.013,0,0,0,1.729.716L21.566,16a1.013,1.013,0,0,0-1.433-1.433Z" transform="translate(-322.395 -154.5)" />
                        </g>
                    </svg>
                </button>
                <button className={navigation.current == 4 ? "active nNav" : "nNav"} onClick={() => navigation.jump(4)} id="billNav">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14.029" height="14.029" viewBox="0 0 14.029 14.029">
                        <path class="a" d="M13.386,3.507H12.276V2.4a.649.649,0,0,0-.643-.643H10.522V.643A.649.649,0,0,0,9.879,0H.643A.649.649,0,0,0,0,.643V9.879a.649.649,0,0,0,.643.643H1.754v1.111a.649.649,0,0,0,.643.643H3.507v1.111a.649.649,0,0,0,.643.643h9.236a.649.649,0,0,0,.643-.643V4.15A.649.649,0,0,0,13.386,3.507ZM1.754,2.4V9.353H1.169V1.169H9.353v.585H2.4A.649.649,0,0,0,1.754,2.4ZM3.507,4.15v6.956H2.923V2.923h8.184v.585H4.15A.649.649,0,0,0,3.507,4.15Zm9.353,8.71H4.676V4.676H12.86Z" />
                        <rect class="a" width="4.88" height="1.22" transform="translate(6.1 7.32)" />
                        <rect class="a" width="4.88" height="1.22" transform="translate(6.1 6.1)" />
                        <rect class="a" width="4.88" height="1.22" transform="translate(6.1 9.76)" />
                        <rect class="a" width="4.88" height="1.22" transform="translate(6.1 8.54)" />
                        <rect class="a" width="4.88" height="1.22" transform="translate(6.1 10.979)" />
                    </svg>
                </button>
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
    const [contactModalOpenError, setContactModalOpenError] = useState("");
    const [contactData, setContactData] = useState({
        firstName: "",
        lastName: ""
    });
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

    const getContact = async (contactId) => {
        let payload = {
            id: contactId
        }
        const contact = await ContactService.fetchContact(JSON.stringify(payload));
        if (contact.status === 200) {
            setContactData(contact.data.contact);
        } else {
            setContactModalOpenError(contact.message);
            setTimeout(() => {
                setContactModalOpenError("");
            }, 500);
            console.log(contact.message);
        }
        
        console.log(contact, "kjfdlsjl dlj ldlfjldfjs");
    }

    useEffect(() => {
        console.log(props.contactId);
        getContact(props.contactId);
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
                                    {contactData.firstName + " " + contactData.lastName}
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
                                        <span>{contactData.mobile}</span>
                                    </div>
                                    <div className="userEmail">
                                        <img src={email_icon_white} alt="" /> 
                                        <span>{contactData.email}</span>
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
                                    <div className="userInfoCell jobRole">
                                        <span className="cellInfoIcon">
                                            <img src={user_icon_white} alt="" />
                                        </span>
                                        <span className="infoCellTxt">{contactData.jobRole}</span>
                                    </div>
                                    <div className="userInfoCell prospect">
                                        <span className="cellInfoIcon">
                                            <img src={battery_icon_white} alt="" />
                                        </span>
                                        <span className="infoCellTxt">Prospect - showed</span>
                                    </div>
                                </div>
                                <div className="bottomRightAreaCol tags">
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
                        
                    </div>
                    <div className="tabBarArea">
                        <div className="redBtnContainer">
                             <button className="redTabBtn visibleH">
                                 <img src={exchange_icon_white} alt="" />
                            </button>
                            <button className="redTabBtn visibleH">
                                <img src={pager_icon_white} alt="" />
                            </button>
                            <button className="redTabBtn">
                                <img src={note_icon_white} alt="" />
                            </button>
                        </div>
                        <Steps config={config}>
                            <Step title="Overview" contact={contactData} component={Overview} contactId={props.contactId} formScroll={(formScrollStatus) => formScroll(formScrollStatus)} />
                            <Step title="Attendance" component={Attendance} />
                            <Step title="Transaction" component={Transaction} />
                            <Step title="Transaction" component={Billing} />
                        </Steps>
                        
                    </div>

                    
                </div>
                <div className="modalOverlay" onClick={closeContactModal}></div>
            </div> 
        </>
    );
}

export default ContactModal;
