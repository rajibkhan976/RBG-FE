import React, { useState } from "react";

import userImg from "../../assets/images/user.png";
import plus_icon from "../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../assets/images/info_3dot_icon.svg";
import phone_icon_small_blue from "../../assets/images/phone_icon_small_blue.svg";
import mobile_icon_blue from "../../assets/images/mobile_icon_blue.svg";
import image_icon_blue from "../../assets/images/image_icon_blue.svg";
import BuyAndAssignNumber from "./buyNumberModal";


const NumberListing = () => {

  const [buyNumModalShow, setBuyNumModalShow] = useState(false);

  const buyNumber = () => {
    setBuyNumModalShow(true);
  }

  const closeBuyNumberModal = () => {
    setBuyNumModalShow(false);
  }

  return (
    <div className="dashInnerUI">
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Number Management</li>
            <li>Number Lists</li>
          </ul>
          <h2 className="inDashboardHeader">Number Lists (0)</h2>
          <p className="userListAbout">
            Lorem ipsum dolor sit amet. Semi headline should be here.
          </p>
        </div>
        <div className="listFeatures">
          <button className="creatUserBtn" onClick={buyNumber}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Buy & Assign Number</span>
          </button>
        </div>
      </div>
      <div class="userListBody">
        <div class="listBody">
          <ul class="tableListing">
            <li class="listHeading">
              <div class="userName ">User Name</div>
              <div class="phoneNum ">Organization</div>
              <div class="cell_xs">Number</div>
              <div class="cell_xs">Country</div>
              <div class="cell_xs">Region</div>
              <div class="cell_xs">Postal Code</div>
              <div class="cell_xs">Capacity</div>
              <div class="createDate">Created on</div>
            </li>
            <li class="owerInfo">
              <div class="userName">
                <button class="btn">
                  <span
                    class="blur"
                  >
                    <img
                      class="thumbImg"
                      src={userImg}
                      alt="avatar"
                    />
                  </span>
                  <p>T5 Krish</p>
                </button>
              </div>
              <div class="cell_xl">
                <p>Tier5 Technology Solutions Put Ltd</p>
              </div>
              <div class="cell_xs">
                <p>+13608136658</p>
              </div>
              <div class="cell_xs">
                <p>US</p>
              </div>
              <div class="cell_xs">
                <p>WA</p>
              </div>
              <div class="cell_xs">
                <p>98310</p>
              </div>
              <div class="cell_xs">
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
              </div>
              <div class="createDate">
                <button class="btn">10th Sep 2021</button>
                <div class="info_3dot_icon">
                  <button class="btn">
                    <img
                      src={info_3dot_icon}
                      alt=""
                    />
                  </button>
                </div>
                <div class="listHide">
                  <button class="btn btnEdit">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 13.553 13.553"
                        class="editIcon"
                      >
                        <g transform="translate(0.75 0.75)">
                          <path
                            class="a"
                            d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                            transform="translate(-2 -2.795)"
                          ></path>
                          <path
                            class="a"
                            d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                            transform="translate(-4.384 -2)"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    Edit
                  </button>
                  <button class="btn btnDelete">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.347"
                        height="13.553"
                        viewBox="0 0 12.347 13.553"
                        class="deleteIcon"
                      >
                        <g transform="translate(0.75 0.75)">
                          <path
                            class="a"
                            transform="translate(-3 -3.589)"
                          ></path>
                          <path
                            class="a"
                            d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                            transform="translate(-3.795 -2)"
                          ></path>
                          <line
                            class="a"
                            y2="3"
                            transform="translate(4.397 6.113)"
                          ></line>
                          <line
                            class="a"
                            y2="3"
                            transform="translate(6.397 6.113)"
                          ></line>
                        </g>
                      </svg>
                    </span>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      { buyNumModalShow && <BuyAndAssignNumber closeModal={closeBuyNumberModal} /> }
      
    </div>
  );
};

export default NumberListing;
