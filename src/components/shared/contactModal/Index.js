import React, { useState, useEffect } from "react";
import Overview from "./pages/Overview";
import Attendance from "./pages/Attendance";
import Transaction from "./pages/Transaction";
import TransactionChoose from "./pages/TransactionChoose";
import Loader from "../Loader";
import Billing from "./pages/Billing";
import { Step, Steps, NavigationComponentProps } from "react-step-builder";
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
                <button className={navigation.current == 2 ? "active nNav" : "nNav"} onClick={() => navigation.jump(2)} disabled={props.contactId ? false : true}>Attendance</button>
                <button className={navigation.current == 3 ? "active nNav" : "nNav"} onClick={() => navigation.jump(3)} disabled={props.contactId ? false : true}>
                    Transaction
                </button>
                <button className={navigation.current == 4 ? "active nNav" : "nNav"} onClick={() => navigation.jump(4)} disabled={props.contactId ? false : true}>
                    Billing
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
    const [contactName,  setContactName] = useState("");
    const [contactData, setContactData] = useState({
        firstName: "",
        lastName: ""
    });
    const [ltv, setLtv] = useState("Calculating...");
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

    const getContactDetails = async (contactId) => {
      if (contactId !== 0) {
        let payload = {
            id: contactId
        }
        const contact = await ContactService.fetchContact(JSON.stringify(payload));
        setContactData(contact.contact);
        let firstName = contact.contact.firstName ? contact.contact.firstName : "";
        let lastName =  contact.contact.lastName ? contact.contact.lastName : ""
        setContactName(firstName + " "  + lastName);
        const ltvVal = (contact.contact.ltv + contact.contact.ltvPOS).toLocaleString("en-US");
        setLtv("USD "+ltvVal);
      }
    }

    useEffect(() => {
        getContactDetails(props.contactId);
    }, []);

    const [goToTransactionClicked, setGoToTransactionClicked] = useState(false);
    const goToTransactionHandler = () => {
        setGoToTransactionClicked(true)
    }
    const backToTransListHandler = () => {
        setGoToTransactionClicked(false)
    }

    return (
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
                                    <img src={cross_white} alt="" />
                                </button>
                            </div>
                            { props.contactId !== 0 &&
                              <div className="userInfoArea">
                                  <div className="userImageWrap">
                                      <span className="userImage">
                                          <img src={user_100X100} alt="" />
                                      </span>
                                      <button className="editUserImg">
                                          <img src={camera_icon} alt="" />
                                      </button>
                                  </div>
                                  <div className="userName" title={contactName}>
                                      { contactName.length > 20 ? contactName.substring(0, 20) + "..." : contactName }
                                  </div>
                                  <div className="ltValue">
                                      <header>Life Time Value :</header>
                                      <span>{ltv}</span>
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
                            }
                        </div>
                        {props.contactId !== 0 &&
                          <div className="contactModalHeaderBottomSec">
                              <div className="bottomLeftArea">
                                  <div className="userContacts">
                                      {(contactData.phone && contactData.phone.number) &&
                                        <div className="userPhone">
                                            <img src={phone_call_icon_white} alt="" />
                                            <span>{contactData.phone && contactData.phone.dailCode && contactData.phone.number ?
                                                contactData.phone.dailCode + "-" + contactData.phone.number : ""}</span>
                                        </div>
                                      }
                                      {contactData.email &&
                                        <div className="userEmail">
                                            <img src={email_icon_white} alt="" />
                                            <span>{contactData.email}</span>
                                        </div>
                                      }
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
                                      {contactData.jobRole &&
                                        <div className="userInfoCell jobRole">
                                            <span className="cellInfoIcon">
                                                <img src={user_icon_white} alt="" />
                                            </span>
                                            <span className="infoCellTxt">{contactData.jobRole}</span>
                                        </div>
                                      }
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
                        }
                    </div>
                    <div className="tabBarArea">
                        {/* <div className="redBtnContainer">
                             <button className="redTabBtn visibleH">
                                 <img src={exchange_icon_white} alt="" />
                            </button>
                            <button className="redTabBtn visibleH">
                                <img src={pager_icon_white} alt="" />
                            </button>
                            <button className="redTabBtn">
                                <img src={note_icon_white} alt="" />
                            </button>
                        </div> */}
                        <Steps config={config}>
                            <Step title="Overview" contact={contactData} component={Overview}
                            getContactDetails={(id) => getContactDetails(id)}  contactId={props.contactId} formScroll={(formScrollStatus) => formScroll(formScrollStatus)} />
                            <Step title="Attendance" component={Attendance} />
                            <Step title="Transaction"
                            contactId={props.contactId}
                            backToTransList={backToTransListHandler}
                            goToTransaction={goToTransactionHandler}
                            component={goToTransactionClicked ? TransactionChoose : Transaction}
                            refetchContact={() => getContactDetails(props.contactId)}/>
                            <Step title="Billing" component={Billing} contactId={props.contactId} />
                        </Steps>
                    </div>
                </div>
                <div className="modalOverlay" onClick={closeContactModal}></div>
            </div>
        </>
    );
}

export default ContactModal;
