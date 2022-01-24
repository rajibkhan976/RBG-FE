import React, {useEffect, useState, useRef} from "react";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";


const CallConfiguration = (props) => {

  const [autoResponder , setAutoResponder] = useState(false);
  const [enableSms , setEnableSms] = useState(false);
  const [sendNotification , setSendNotification] = useState(false);
    
  const addAnotherTime = (e) => {
    e.preventDefault();
    let conf = [{
        day: [],
        startTime: "00:00",
        endTime: "24:00"
    }];  
  }
  const handleCheckboxAutoResponder = (e) => {
    setAutoResponder(!autoResponder);
  }  
  const handleCheckboxEnableSms = (e) => {
    setEnableSms(!enableSms)
  } 
  const handleCheckboxSendNotification = (e) => {
    setSendNotification(!sendNotification)
  } 
    return (
      <div className="sideMenuOuter">
        <div className="sideMenuInner callConfigModal">
          {/* {isLoader ? <Loader /> : ""} */}
          <button className="btn btn-closeSideMenu" onClick={props.closeModal}>
            <span></span>
            <span></span>
          </button>
          <div className="sideMenuHeader">
            <h3>Create a SMS Configuration</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className="sideMenuBody">
            <form className="formBody">
              <div className="cmnFormRow">
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Config Name</div>
                  <div className="cmnFormField">
                    <input
                      type="text"
                      className="cmnFieldStyle"
                      value="My Sample SMS config One"
                    />
                  </div>
                </div>
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Response Type</div>
                  <div className="cmnFormField">
                    <select
                      className="cmnFieldStyle selectBox"
                      defaultValue="Auto Response"  
                    >
                      <option value="receive_calls">Receive Calls</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="scheduleList">
                <div className="cmnFormRow">
                    <h4 className="formSecHeading">Schedule</h4>
                </div>
                <div className="cmnFormRow scheduleRow">
                    <div className="cmnFormCol">
                        <div className="cmnFieldName">Select Day (s)</div>
                        <div className="cmnFormField">
                            <ul className="weekDateList">
                                <li className="weekDate active">
                                    <input type="checkbox" value="sun" checked=""/><span>S</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="mon" checked=""/><span>M</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="tue" checked=""/><span>T</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>W</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>T</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>F</span>
                                </li>
                                <li className="weekDate">
                                    <input type="checkbox" value="wed" checked=""/><span>S</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="cmnFormCol">
                        <div className="cmnFieldName">Set Time Slot</div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFormField">
                                    <label className="cmnFieldName">From</label>
                                    <select className="cmnFieldStyle timeInput"><option value="00:00">00:00</option></select>
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFormField">
                                    <label className="cmnFieldName">To</label>
                                    <select className="cmnFieldStyle timeInput"><option value="00:00">00:00</option><option value="01:00">01:00</option><option value="02:00">02:00</option><option value="03:00">03:00</option></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>     
              </div>
              <div class="cmnFormRow setupForms sms">
                    <h4 class="formSecHeading">Setup</h4>
                    <div class="setupFormLists">
                        <div class="setupFormRow">
                            <div class="setupFormRowHead">
                                <label>
                                    <div class="customCheckbox">
                                        <input 
                                        type="checkbox"
                                        onChange={handleCheckboxAutoResponder}
                                        /><span></span>
                                    </div>
                                    <span class="fomrListHeadName">Auto Responders available</span>
                                </label>
                            </div>
                          
                            {autoResponder ? (
                               <div className="setupFormRowBody">
                                 <div className="autoresponderRow">
                                   <div className="checking"> </div>
                                   <div className="autoresponderHeader">
                                     <div>Name</div>
                                     <div>Description</div>
                                   </div>
                                 </div>
                                 <div className="autoresponderRow">
                                    <div className="checking">
                                      <div class="circleRadio">
                                        <input 
                                        type="radio" name="radio"
                                        /><span></span>
                                    </div>
                                    </div>
                                    <div className="autoresponderBody">
                                      <div>Text response by San</div>
                                      <div>
                                        <span>I’ve added this auto responder to check few feature. please ignore this.</span>
                                        <button className="btn"><img src={info_3dot_icon} alt=""/></button>
                                      </div>
                                    </div>
                                 </div>
                                 <div className="autoresponderRow">
                                    <div className="checking">
                                      
                                    <div class="circleRadio">
                                        <input 
                                        type="radio" name="radio"
                                        /><span></span>
                                    </div>
                                    </div>
                                    <div className="autoresponderBody">
                                      <div>Text response One</div>
                                      <div>
                                        <span>I’ve added this auto responder to check few feature</span>
                                        <button className="btn"><img src={info_3dot_icon} alt=""/></button>
                                      </div>
                                    </div>
                                 </div>

                               </div>
                            ) : ""}
                          </div>
                        <div class="setupFormRow">
                            <div class="setupFormRowHead">
                                <label>
                                    <div class="customCheckbox">
                                        <input type="checkbox" defaultChecked="" onChange={handleCheckboxEnableSms}/><span></span>
                                    </div>
                                    <span class="fomrListHeadName">Enable SMS notification</span>
                                </label>
                            </div>
                            {enableSms ? (
                               <div className="setupFormRowBody">
                                 <div className="cmnFormRow addNumForm">
                                     
                                          <div className="cmnFormRow full_width">
                                              <div className="cmnFormField countryCodeField">
                                                  <div className="countryCode cmnFieldStyle">
                                                      <div className="countryName">US</div>
                                                      <div className="daileCode">+1</div>
                                                      <select class="selectCountry"><option value="AF_93">AF (+93)</option></select>
                                                  </div>
                                                  <input type="text" className="cmnFieldStyle" placeholder="Eg. 5143654785" value=""/>
                                              </div>
                                              <button className="cmnBtn"><span>Save</span><img src={arrow_forward} alt=""/></button>
                                          </div>
                                      
                                  </div>
                               </div>
                            ) : ""}
                        </div>
                        <div className="setupFormRow">
                            <div className="setupFormRowHead">
                                <label>
                                    <div className="customCheckbox">
                                        <input type="checkbox" defaultChecked="" onChange={handleCheckboxSendNotification}/><span></span>
                                    </div>
                                    <span className="fomrListHeadName">Send notifications to this email</span>
                                </label>
                            </div>   
                            {sendNotification ? (
                               <div className="setupFormRowBody">
                                   <div className="cmnFormRow"><span className="formHeadText">Send notifications to this email</span></div>
                                   <div className="cmnFormRow addNumForm">
                                     
                                     <div className="cmnFormRow full_width">
                                         <div className="cmnFormField countryCodeField full_width">
                                             <input type="text" className="cmnFieldStyle" placeholder="alert@xyz.com" value=""/>
                                         </div>
                                         <button className="cmnBtn"><span>Save</span><img src={arrow_forward} alt=""/></button>
                                     </div>
                                 
                                    </div>
                               </div>
                            ) : ""}
                        </div>
                    </div>
                </div>
              
              <div className="text-center">
                <button className="cmnBtn"><span>Save</span><img src={arrow_forward} alt=""/></button> 
                &nbsp;   
                <button className="cmnBtn"><span>Save &amp; New</span><img src={arrow_forward} alt=""/></button> 
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}


export default CallConfiguration;