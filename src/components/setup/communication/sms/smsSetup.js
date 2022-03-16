import React, { useEffect, useState } from "react";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
//  import edit_icon from "../../../../assets/images/edit_grey.svg";
//  import delete_icon from "../../../../assets/images/delete_icon_grey.svg"

import SmsConfiguration from "./smsConfiguration";



const SmsSetup = () => {
    const [option, setOption] = useState(null);
    const [configModalShow, setConfigModalShow] = useState(false);
    const [editConfig, setEditConfig] = useState(false);
    
    const [tableList, setTableList ]= useState([
        {
            name : "Ajanta",
            days: "sun",
            status : "Active",
            created : "12th Dec,2020"
        },
        {
            name : "Ilora",
            days:  "mon",
            status : "inactive",
            created : "22nd Dec,2021"
        },
        {
            name : "Araku",
            days: "tue",
            status : "Active",
            created : "4th Jan,2020"
        }
    ]);
    const toggleOptions = (index) => {
      setOption(index !== option ? index : null);
    };
    const openConfigModal = () => {
      setConfigModalShow(true);
    }
    const closeConfigModal = () => {
        setConfigModalShow(false);  
    }
    const editConfigHandle = () => {
      setConfigModalShow(true);
      setOption(false);
    }

    return(
        <>
            {/* {isLoader ? <Loader /> : ''}
            {successMsg &&
            <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
            <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {isAlert.show &&
                <ConfirmBox
                    message={getDeleteConfigWarnningMsg()}
                    callback={(isConfirmed) => deleteConfig(isAlert.el, isConfirmed)}
                /> 
            }*/}
            <div className="dashInnerUI">
                <div className="userListHead">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Setup</li>
                            <li>Communication Setup</li>
                            <li>SMS</li>
                        </ul>
                        <h2 className="inDashboardHeader lighter">SMS Setup</h2>
                        <p className="userListAbout">Manage SMS configuration</p>
                    </div> 
                    <div className="listFeatures">
                        <button className="creatUserBtn" onClick={openConfigModal}>
                            <img className="plusIcon" src={plus_icon} alt=""/>
                            <span>Add a configuration</span>
                        </button>
                    </div> 
                </div>
                <div className="userListBody callListingTable">
                    <div className="assignedNumberArea">
                        <h3>Assigned Phone Number</h3>
                        <p>+1-8634000496 [ (863) 400-0496 ] </p>
                    </div>
                    <h3 className="callListTabHeading">Configurations</h3>
                    <div className="listBody">
                        <ul className="tableListing">
                            <li className="listHeading">
                                <div className="userName ">Name</div>
                                <div>Scheduled Day (s)</div>
                                <div >Status</div>
                                <div className="createDate ">Created on</div>
                            </li>
                            {
                            tableList.map((list, key) => {
                                    return (
                                        <>
                                         <li key={key}>
                                            <div className="userName">
                                                <button className="btn"><p>{list.name}</p></button>
                                            </div>
                                        
                                            <div className="weekDateList">
                                            <ul className="weekDateList">
                                                  <li
                                                    className={
                                                      (list.days === "sun")
                                                        ? "weekDate active"
                                                        : "weekDate"
                                                    }
                                                  >
                                                    <span>S</span>
                                                  </li>
                                                  <li
                                                    className={
                                                      (list.days === "mon")
                                                        ? "weekDate active"
                                                        : "weekDate"
                                                    }
                                                  >
                                                    <span>M</span>
                                                  </li>
                                                  <li
                                                    className={
                                                      (list.days === "tue")
                                                        ? "weekDate active"
                                                        : "weekDate"
                                                    }
                                                  >
                                                    <span>T</span>
                                                  </li>
                                                  <li
                                                    className={
                                                      (list.days === "wed")
                                                        ? "weekDate active"
                                                        : "weekDate"
                                                    }
                                                  >
                                                    <span>W</span>
                                                  </li>
                                                  <li
                                                    className={
                                                      (list.days === "thu")
                                                        ? "weekDate active"
                                                        : "weekDate"
                                                    }
                                                  >
                                                    <span>T</span>
                                                  </li>
                                                  <li
                                                    className={
                                                      (list.days === "fri")
                                                        ? "weekDate active"
                                                        : "weekDate"
                                                    }
                                                  >
                                                    <span>F</span>
                                                  </li>
                                                  <li
                                                    className={  (list.days === "sat")  ? "weekDate active"  : "weekDate"}
                                                  >
                                                    <span>S</span>
                                                  </li>
                                                </ul>
                                            </div>
                                        
                                            <div>
                                                <label className={(list.status === "Active") ? "toggleBtn active" : "toggleBtn inactive"}>
                                                    <input type="checkbox"/><span className="toggler"></span>
                                                </label>
                                            </div>
                                                    
                                            <div className="createDate">
                                                <button className="btn"><p>{list.created}</p></button>
                                                <div className="info_3dot_icon">
                                                    <button className="btn" onClick={() => {
                                                      toggleOptions(key);
                                                    }}><img src={info_3dot_icon} alt=""/></button>
                                                </div>
                                                <div className={
                                                    option === key
                                                      ? "dropdownOptions listOpen"
                                                      : "listHide"
                                                  }>
                                                    <button className="btn btnEdit" onClick={editConfigHandle}>
                                                      <span>
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 13.553 13.553"
                                                        className="editIcon"
                                                      >
                                                        <g transform="translate(0.75 0.75)">
                                                          <path
                                                            className="a"
                                                            d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                                                            transform="translate(-2 -2.795)"
                                                          />
                                                          <path
                                                            className="a"
                                                            d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                                                            transform="translate(-4.384 -2)"
                                                          />
                                                        </g>
                                                      </svg>
                                                      </span> Edit</button>
                                                    <button className="btn btnDelete"><span>
                                                    <svg
                                                    className="deleteIcon"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12.347"
                                                    height="13.553"
                                                    viewBox="0 0 12.347 13.553"
                                                  >
                                                    <g transform="translate(0.75 0.75)">
                                                      <path
                                                        className="a"
                                                        d="M3,6H13.847"
                                                        transform="translate(-3 -3.589)"
                                                        style={{
                                                          stroke: "#9baebc",
                                                        }}
                                                      />
                                                      <path
                                                        className="a"
                                                        d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                                        transform="translate(-3.795 -2)"
                                                        style={{
                                                          stroke: "#9baebc",
                                                        }}
                                                      />
                                                      <line
                                                        className="a"
                                                        y2="3"
                                                        transform="translate(4.397 6.113)"
                                                        style={{
                                                          stroke: "#9baebc",
                                                        }}
                                                      />
                                                      <line
                                                        className="a"
                                                        y2="3"
                                                        transform="translate(6.397 6.113)"
                                                        style={{
                                                          stroke: "#9baebc",
                                                        }}
                                                      />
                                                    </g>
                                                  </svg>
                                                      </span> Delete</button>
                                                </div>
                                            </div>
                                         </li>
                                     </> 
                                    )
                               })
                            }
                            
                        </ul>
                    </div>
                </div>
                { configModalShow && <SmsConfiguration  
                closeModal={closeConfigModal} 

                /> }
            </div>
        </>
    );
}

export default SmsSetup;