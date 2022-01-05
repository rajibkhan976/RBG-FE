import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import arrowRightWhite from "../../../../src/assets/images/arrowRightWhite.svg";
import plus_icon from "../../../../src/assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../src/assets/images/info_3dot_icon.svg";
import info_3dot_white from "../../../../src/assets/images/info_3dot_white.svg";

import CategoryPhases from "./categoryPhases"
import StatusAddField from "./statusAddField"

const StatusPhases = (props) => {
  document.title = "Red Belt Gym - Status and Phases";
  const [isLoader, setIsLoader] = useState(false);
  const [option, setOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [statusToggleIndex, setStatusToggleIndex] = useState();
  
  const [phasesData, setPhasesData] = useState([
    {
        status_Name: "New",
        description: "This is a paying gym member that is current with all payments and is not having attendance...",
        created_at: "Dec 12, 2021"
    },
    {
        status_Name: "Paying",
        description: "This is a paying gym member that is current with all payments and is not having attendance...",
        created_at: "Dec 12, 2021"
     },
     {
        status_Name: "Expiring Soon",
        description: "This is a paying gym member that is current with all payments and is not having attendance...",
        created_at: "Dec 12, 2021"
     },
     {
        status_Name: "Failing",
        description: "This is a paying gym member that is current with all payments and is not having attendance...",
        created_at: "Dec 12, 2021"
     }
]);

const openAddStatusFieldHandler = (event) =>{
    setOpenModal(true);    
  }
const toggleOptions = (index) => {
    setOption(index !== option ? index : null);
  };
  const statusToogle = (index) =>{
    setStatusToggleIndex(index) ;    
  }
  const closeCustomModal = () =>{
    setOpenModal(false);
  }  
  return (
        <>
        <div className="dashInnerUI phases">
            <div class="userListHead phases">
                <div class="listInfo">
                    <ul class="listPath">
                    <li>Setup </li>
                    <li>Phases &amp; Status</li>
                    </ul>
                    <h2 class="inDashboardHeader">
                    Phases &amp; Status
                    </h2>
                    <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                </div>
                <button class="creatUserBtn" 
                  onClick={openAddStatusFieldHandler}
                  >
                   <img class="plusIcon" src={plus_icon} alt="" />
                       <span>Add a Status</span>
                </button>
            </div>
            <div className="userListBody">
                <ul class="customtableListing">
                    <li class="listHeading">
                        <div>Status Name</div>
                        <div className="bigspace">Description</div>
                        <div>Created at</div>
                        <div class="vacent"></div>
                    </li>
                    {phasesData.map((elem, key) => {
                    return (
                        <li>
                            <div>{elem.status_Name}</div>
                            <div className="bigspace colorFade">{elem.description}</div>
                            <div className="colorFade">{elem.created_at}</div>
                            <div> 
                            <label className={statusToggleIndex === key ? "toggleBtn active" : "toggleBtn"}>
                                <input type="checkbox" 
                                   onChange={() => {
                                    statusToogle(key);
                                    }}/>
                                    <span class="toggler"></span>
                            </label>
                            <div class="info_3dot_icon">
                                <button class="btn"  
                                    onClick={() => {
                                    toggleOptions(key);
                                    }}>
                                    <img src={info_3dot_icon} alt=""/>
                                </button>
                            </div>
                            <div className={
                                  option === key
                                    ? "dropdownOptions listOpen"
                                    : "listHide"
                                }> 
                                <button class="btn btnEdit"> 
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" class="editIcon"><g transform="translate(0.75 0.75)"><path class="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path class="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                </span> 
                                Edit
                                </button>
                                <button class="btn btnDelete">
                                <span>
                                    <svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path class="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path class="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line class="a" y2="3" transform="translate(4.397 6.113)"></line><line class="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                </span>
                                Delete
                                </button>
                            </div>
                            </div>
                        </li>
                        )}
                    )}
                </ul>
            </div>
        </div>
       
        <CategoryPhases/>
        {openModal && 
            <StatusAddField
             closeAddCustomModal={(param) => closeCustomModal(param)}
            />
        } 
        </>  
    )
};

export default StatusPhases;
