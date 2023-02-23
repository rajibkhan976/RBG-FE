import React, { useEffect, useRef, useState } from "react";

import Loader from "../../../Loader";
import cross from "../../../../../assets/images/cross_icon.svg";
import email_template from "../../../../../assets/images/email_template.svg";
import iconSmsOut from "../../../../../assets/images/iconSmsOut.svg";
import iconSmsIn from "../../../../../assets/images/iconSmsIn.svg";
import iconCallOut from "../../../../../assets/images/iconCallOut.svg";
import iconCallIn from "../../../../../assets/images/iconCallIn.svg";
import iconEmailOut from "../../../../../assets/images/iconEmailOut.svg";
import iconEmailIn from "../../../../../assets/images/iconEmailIn.svg";
//import { utils } from "../../../../../helpers";
//import {useDispatch} from "react-redux";
//import {EmailServices} from "../../../../../services/setup/EmailServices";
//import * as actionTypes from "../../../../../actions/types";

const EnlargeInbox = (props) => {

    const [isLoader, setIsLoader] = useState(false);
    







    return (
        <div className="modalEnlargeEmail modalBackdrop">
            <div class="modalBackdropBg" onClick={() => props.closeModal(false)}></div>
            {isLoader ? <Loader /> : ""}
            <div className="slickModalBody bigInbox">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => props.closeModal(false)}>
                        <img src={cross} alt="" />
                    </button>
                </div>
                <div className="modalForm showMSG">
                    <div className="enleargedBox">
                        {props.contentShowInModal?.type === "SMS" &&
                            <>
                            
                            <h3> 
                                <div className="msgTypeIcon">
                    
                                    <img src={props.contentShowInModal?.direction === "inbound" ? iconSmsIn : iconSmsOut }
                                            alt=""/>
                                </div>
                                <span>{ props.contentShowInModal?.message} </span>
                            </h3>
                            </>
                        }
                        {props.contentShowInModal?.type === "EMAIL" &&
                            <>
                            
                            <h3>
                                <div className="msgTypeIcon">
                    
                                    <img src={props.contentShowInModal?.direction === "inbound" ? iconEmailIn : iconEmailOut }
                                            alt=""/>
                                </div> 
                                <span> {  props.contentShowInModal?.subject}</span> </h3>
                            
                            <div className="description" dangerouslySetInnerHTML={{__html:  props.contentShowInModal?.template}}></div>
                            </>
                        }
                    </div>
               
                    
                     
                </div>
            </div>
        </div>
    )
}

export default EnlargeInbox;