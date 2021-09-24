import React, { useState } from "react";

import search_icon_white from "../../assets/images/search_icon_white.svg";
import phone_icon_small_blue from "../../assets/images/phone_icon_small_blue.svg";
import mobile_icon_blue from "../../assets/images/mobile_icon_blue.svg";
import image_icon_blue from "../../assets/images/image_icon_blue.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import button_loading_icon from "../../assets/images/button_loading_icon.svg";

const BuyAndAssignNumber = (props) => {
  const [searchLoadStatus, setSearchLoadStatus] = useState(false);
  const [numListLoaded, setNumListLoaded] = useState(false);

  const searchNumber = (event) => {
    event.preventDefault();  
    setSearchLoadStatus(true);
    setTimeout(() => {
      setSearchLoadStatus(false);
      setNumListLoaded(true);
    }, 3000);
  };


  return (
    <div className="sideMenuOuter">
      <div className="sideMenuInner buyNumberModal">
        <button class="btn btn-closeSideMenu" onClick={props.closeModal}>
          <span></span>
          <span></span>
        </button>
        <div class="sideMenuHeader">
          <h3>Buy & Assign Number</h3>
          <p>Lorem Epsom dollar sit amen</p>
        </div>
        <div className="sideMenuBody">
          <form className="formBody">
            <div className="infoInputs">
              <div className="cmnFormRow">
                <div className="cmnFieldName">Assign to</div>
                <div class="cmnFormField">
                  <select name="" id="" className="cmnFieldStyle selectBox">
                    <option value="">Select a Gym Owner</option>
                  </select>
                </div>
              </div>
              <div className="cmnFormRow">
                <p class="formSecHeading">Search for Available Numbers</p>
              </div>
              <div className="cmnFormRow">
                <div className="cmnFieldName">Select Country</div>
                <div class="cmnFormField">
                  <select name="" id="" className="cmnFieldStyle selectBox">
                    <option value="US">United States</option>
                  </select>
                </div>
              </div>
              <div className="cmnFormRow">
                <div className="cmnFieldName">Type</div>
                <div className="cmnFormField radioGroup">
                  <label className="cmnFormRadioLable">
                    <div className="circleRadio">
                      <input type="radio" name="gender" value="skip" />
                      <span></span>
                    </div>
                    Local
                  </label>
                  <label className="cmnFormRadioLable">
                    <div className="circleRadio">
                      <input type="radio" name="gender" value="skip" />
                      <span></span>
                    </div>
                    Mobile
                  </label>
                  <label className="cmnFormRadioLable">
                    <div className="circleRadio">
                      <input type="radio" name="gender" value="skip" />
                      <span></span>
                    </div>
                    Toll free
                  </label>
                </div>
              </div>
              <div className="cmnFormRow">
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Enter Region</div>
                  <div class="cmnFormField">
                    <input type="text" className="cmnFieldStyle" />
                  </div>
                </div>
                <div className="cmnFormCol">
                  <div className="cmnFieldName">Enter Area Code</div>
                  <div class="cmnFormField">
                    <input type="text" className="cmnFieldStyle" />
                  </div>
                </div>
              </div>
              <div className="cmnFormRow">
                <div className="cmnFieldName">Choose Address</div>
                <div class="cmnFormField">
                  <select name="" id="" className="cmnFieldStyle selectBox">
                    <option value="">Choose an Address (Optional)</option>
                  </select>
                </div>
              </div>
              <div className="cmnFormRow">
                <button
                  className={
                    searchLoadStatus
                      ? "saveNnewBtn numSearch searching"
                      : "saveNnewBtn numSearch"
                  }
                  type="submit" 
                  onClick={searchNumber}
                >
                  <img
                    src={
                      searchLoadStatus ? button_loading_icon : search_icon_white
                    }
                    alt=""
                  />{" "}
                  {searchLoadStatus ? "" : "Search"}
                </button>
              </div>

              {numListLoaded ? 
              <>
                <div class="formSecHeading">Available Numbers</div>
              
              <div className="availNumList">
                <table>
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Capacity</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>+12102390508</td>
                      <td>
                        <div className="numberCapacity">
                          <span>
                            <img src={phone_icon_small_blue} alt="" />
                          </span>
                          <span>
                            <img src={mobile_icon_blue} alt="" />
                          </span>
                          <span>
                            <img src={image_icon_blue} alt="" />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="circleRadio">
                          <input type="radio" name="selectedNumber" value="" />
                          <span></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>+12102390508</td>
                      <td>
                        <div className="numberCapacity">
                          <span>
                            <img src={phone_icon_small_blue} alt="" />
                          </span>
                          <span>
                            <img src={mobile_icon_blue} alt="" />
                          </span>
                          <span>
                            <img src={image_icon_blue} alt="" />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="circleRadio">
                          <input type="radio" name="selectedNumber" value="" />
                          <span></span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>+12102390508</td>
                      <td>
                        <div className="numberCapacity">
                          <span>
                            <img src={phone_icon_small_blue} alt="" />
                          </span>
                          <span>
                            <img src={mobile_icon_blue} alt="" />
                          </span>
                          <span>
                            <img src={image_icon_blue} alt="" />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="circleRadio">
                          <input type="radio" name="selectedNumber" value="" />
                          <span></span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="cmnFormRow">
                <div className="formActBtnWrap numList">
                  <button className="saveNnewBtn numSave">
                    Save <img src={arrow_forward} alt="" />
                  </button>
                  <button className="saveNnewBtn numSaneNnew" type="submit">
                    Save & New <img src={arrow_forward} alt="" />
                  </button>
                </div>
              </div>
              </>
              : ""}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyAndAssignNumber;
