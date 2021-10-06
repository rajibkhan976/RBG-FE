import React, { useEffect, useState } from "react";
import lineUser from "../../assets/images/lineUser.svg";
import makeCall from "../../assets/images/makeACall.svg";

const CallModal = (props) => {

 return(
    <div class="sideMenuOuter">
    <div class="sideMenuInner makeCall">
      <div className="modal_call_header">
       <button class="btn btn_empty"><img src=""/></button>
        <h3>Make a call</h3>
        <p>Enter number to Call</p>
        <div className="numberForCall">
          <form className="cont">
            <div className="leftSide">
              USA +1
            </div>
            <div className="rightSide">
              <input type="text" placeholder="Eg. (555) 555-1234"/>
            </div>
          </form>
        </div>
      </div>
      <div className="modalMakeCallBody">
        <div className="text-right"><a href="#" className="linkType">
          <img src={lineUser} alt=""/> Choose from Contacts</a>
        </div>

          
        <div className="makeCallForm">
          <form>
            <div className="slice">
              <label>Select Call Type</label>
              <div className="radioPlace">
                <label>
                  <div className="circleRadio">
                      <input type="radio" name="name1"/>
                      <span></span>
                  </div>
                  Pre-Recorded Call
                </label>
              </div>
              <div className="radioPlace">
                <label>
                  <div className="circleRadio">
                      <input type="radio" name="name1"/>
                      <span></span>
                  </div>
                  Browser Call
                </label>
              </div>
            </div>
            
            <div className="slice">
              <label>Select Record Type</label>
              <div className="radioPlace">
                <label>
                  <div className="circleRadio">
                      <input type="radio" name="name2"/>
                      <span></span>
                  </div>
                  Upload Audio
                </label>
              </div>
              <div className="radioPlace">
                <label>
                  <div className="circleRadio">
                      <input type="radio" name="name2"/>
                      <span></span>
                  </div>
                  Select from recordings
                </label>
              </div>
              <div className="radioPlace">
                <label>
                  <div className="circleRadio">
                      <input type="radio" name="name2"/>
                      <span></span>
                  </div>
                  Record new
                </label>
              </div>
              <div className="space20">
                Upload Audio File
              </div>
              <div className="upload">
                <input type="file" />
                <span>Choose File</span>
              </div>
            </div>
            <div className="slice">
              <label>Also Send SMS</label>
              <p className="space10">Message</p>
              <small>153/0 SMS - One message contains 153 chatracters max (SMS count can be changed if you are using keyword variable e.g. [fname])</small>  
              <textarea></textarea>
            </div>
            <div className="text-center">
               <button className="makeAcallBtn"><img src={makeCall} alt=""/></button>
            </div>
          </form>
          <div className="text-center"><div className="callSugession">Tap to start call</div></div>
        </div>
     
      </div>
    </div>
  </div>

   )
};


export default CallModal;