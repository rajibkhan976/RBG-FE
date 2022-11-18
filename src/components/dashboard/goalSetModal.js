import React, { useState, useLayoutEffect, useEffect } from "react";
import arrow_forward from "../../../src/assets/images/arrow_forward.svg";
import pluss from "../../../src/assets/images/pluss.svg";
import drag from '../../../src/assets/images/drag.svg';
import line_chart from '../../../src/assets/images/line-chart.svg';

//import Loader2 from "../../../";

import { useDispatch, useSelector } from 'react-redux';
const GoalSetModal = (props) => {
    let zIndexBody = useSelector((state) => state.modal.zIndexBody);
    return (
        <>
            <div className="sideMenuOuter filterUserMenu">
            <div className="dialogBg" onClick={props.closeModal}></div>
                <div className="sideMenuInner dashboardSideBar">
                    <button className="btn btn-closeSideMenu" onClick={props.closeModal}><span></span><span></span></button>
                    {/* <div className="sideMenuHeader">
                        <h3 className="liteHeading">MRR Goal Set</h3>
                        <p className="sideMenuPara">It is a long established fact that a reader will be readable content of a page when looking at its layout.</p>
                    </div> */}
                    <div className="sideMenuHeader">
            <h3>Widget Customization</h3>
            {/* <p>Lorem ipsum dolor sit amet.</p> */}
          </div>
                    {/* <div className="sideMenuBody">
                        <form className="formBody" >
                            
                        <div className="formField w-100 appModals formControl">
                            <label className="modalDashboardLabel">Set a Goal here</label>
                            <input type="text" placeholder="Ex. 100" name="" />
                            
                        </div>

                        <div className="permissionButtons enterRoleNameBtn">
                                    <button className="creatUserBtn createBtn">
                                        <img className="plus" src={pluss} alt="" />
                                        <span>Create New</span>
                                    </button>
                                    <button className="saveNnewBtn" ><span>Save &amp; Update</span>
                                        <img className="" src={arrow_forward} alt="" /></button>
                                </div>

                        </form>
                    </div> */}






<ul>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                 
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
            <li>
              <label>
                  <div className="customCheckbox">
                      <input type="checkbox"/>
                      <span></span>
                  </div>
                  
                  <span>Monthly Recurring Revenue Growth</span>
                  <img src={drag} className="dragImg"  />
              </label>
            </li>
          </ul>










                </div>
            </div>
        </>
    );
}


export default GoalSetModal;
