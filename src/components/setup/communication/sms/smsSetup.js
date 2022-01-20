import React, { useEffect, useState } from "react";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import orange_add_icon from "../../../../assets/images/orange_add_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg"
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg"

const SmsSetup = () => {
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
    const handleCheck = (val, list) => {
        let exists = false;
        list.some((el) => {
            if (el.day.includes(val))
                exists = true;
        });
        return exists;
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
            <div class="dashInnerUI">
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
                        <button className="creatUserBtn">
                            <img className="plusIcon" src={plus_icon} alt=""/>
                            <span>Add a configuration</span>
                        </button>
                    </div> 
                </div>
                <div className="userListBody callListingTable">
                    <div class="assignedNumberArea">
                        <h3>Assigned Phone Number</h3>
                        <p>+1-8634000496 [ (863) 400-0496 ] </p>
                    </div>
                    <h3 class="callListTabHeading">Configurations</h3>
                    <div class="listBody">
                        <ul class="tableListing">
                            <li class="listHeading">
                                <div class="userName ">Name</div>
                                <div>Scheduled Day (s)</div>
                                <div class="">Status</div>
                                <div class="createDate ">Created on</div>
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
                                                <label class={(list.status === "Active") ? "toggleBtn active" : "toggleBtn inactive"}>
                                                    <input type="checkbox"/><span class="toggler"></span>
                                                </label>
                                            </div>
                                                    
                                            <div className="userName">
                                                <button className="btn"><p>{list.created}</p></button>
                                            </div>
                                         </li>
                                     </> 
                                    )
                               })
                            }
                             {/* <li>
                                <div class="userName">
                                    <button class="btn"><p>Name1</p></button>
                                </div>
                                <div>
                                    <ul class="weekDateList">
                                        <li class="weekDate active"><span>S</span></li>
                                        <li class="weekDate"><span>M</span></li>
                                        <li class="weekDate"><span>T</span></li>
                                        <li class="weekDate"><span>W</span></li>
                                        <li class="weekDate"><span>T</span></li>
                                        <li class="weekDate"><span>F</span></li>
                                        <li class="weekDate active"><span>S</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <label class="toggleBtn inactive">
                                        <input type="checkbox"/><span class="toggler"></span>
                                    </label>
                                </div>
                                <div class="createDate">
                                    <button class="btn">23rd Dec 2021</button>
                                    <div class="info_3dot_icon">
                                        <button class="btn"><img src={info_3dot_icon} alt=""/></button>
                                    </div>
                                    <div class="listHide">
                                        <button class="btn btnEdit"><span></span>Edit</button>
                                        <button class="btn btnDelete"><span></span>Delete</button>
                                    </div>
                                </div>
                            </li>  */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SmsSetup;