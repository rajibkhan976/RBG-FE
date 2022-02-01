import React, { useEffect, useState } from "react";

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import Loader from "../../Loader";
import { ContactService } from "../../../../services/contact/ContactServices";

import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import updown from "../../../../assets/images/updown.png";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import icon_dependent from "../../../../assets/images/dependent.svg";
import appointmentImg from "../../../../assets/images/appointments.svg";
import tags from "../../../../assets/images/tags.svg";
import crossWhite from "../../../../assets/images/cross_w.svg";
import successApp from "../../../../assets/images/successApp.svg";
import dot3gray from "../../../../assets/images/dot3gray.svg";
import cross from "../../../../assets/images/cross.svg";
import setupIcon from "../../../../assets/images/setupicon8.svg";
import status1 from "../../../../assets/images/status1.svg";
import status2 from "../../../../assets/images/status2.svg";

import listsView from "../../../../assets/images/lists.svg";
import calenderView from "../../../../assets/images/calemderList.svg";

import Scrollbars from "react-custom-scrollbars-2";

const Appointment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [communication, setCommunication] = useState(false);
  const [addDependentModal, setAddDependentModal] = useState(false);
  const [toggleContactList, setToggleContactList] = useState({
    status: false,
    listContent: [],
  });

  const [toggleTagList, setToggleTagList] = useState({
    status: false,
  });

  const [toggleTagList1, setToggleTagList1] = useState({
    status: false,
  });

  const [toggleTagList2, setToggleTagList2] = useState({
    status: false,
  });

    const [toggleTagList3, setToggleTagList3] = useState({
    status: false,
  });


  const [toggleEditList, setToggleEditList] = useState({
    status: false,
  });


  const [toggleEditList2, setToggleEditList2] = useState({
    status: false,
  });


  const [toggleEditList3, setToggleEditList3] = useState({
    status: false,
  });


  const [toggleEditList4, setToggleEditList4] = useState({
    status: false,
  });

  const [toggleEditList5, setToggleEditList5] = useState({
    status: false,
  });

  const [toggleEditList6, setToggleEditList6] = useState({
    status: false,
  });


  const [toggleAppView, setToggleAppView] = useState({
    status: false,
  });



  const [toggleTagSuccess, setToggleTagSuccess] = useState({
    status: false,
    listTagSuccess: [],
  });

  const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
  };

  const addDependentModalFn = () => {
    setAddDependentModal(true);
  };

  const toggleContactListFn = (e) => {
    e.preventDefault();

    let contactListOp = toggleContactList;

    setToggleContactList({
      ...toggleContactList,
      status: !toggleContactList.status,
    });
  };



const toggleTagListFn = (e) => {
    e.preventDefault();

    //let contactTagOp = toggleTagList;

    setToggleTagList({
      ...toggleTagList,
      status: !toggleTagList.status,
    });
  };



  const toggleTagList1Fn = (e) => {
    e.preventDefault();

    //let contactTagOp = toggleTagList1;

    setToggleTagList1({
      ...toggleTagList1,
      status: !toggleTagList1.status,
    });
  };


  const toggleTagList2Fn = (e) => {
    e.preventDefault();

    //let contactTagOp = toggleTagList2;

    setToggleTagList2({
      ...toggleTagList2,
      status: !toggleTagList2.status,
    });
  };



  const toggleTagList3Fn = (e) => {
    e.preventDefault();

    //let contactTagOp = toggleTagList3;

    setToggleTagList3({
      ...toggleTagList3,
      status: !toggleTagList3.status,
    });
  };



  const toggleEditListFn = (e) => {
    e.preventDefault();

    setToggleEditList({
      ...toggleEditList,
      status: !toggleEditList.status,
    });
  };

  const toggleEditList2Fn = (e) => {
    e.preventDefault();

    setToggleEditList2({
      ...toggleEditList2,
      status: !toggleEditList2.status,
    });
  };


    const toggleEditList3Fn = (e) => {
    e.preventDefault();

    setToggleEditList3({
      ...toggleEditList3,
      status: !toggleEditList3.status,
    });
  };


    const toggleEditList4Fn = (e) => {
    e.preventDefault();

    setToggleEditList4({
      ...toggleEditList4,
      status: !toggleEditList4.status,
    });
  };


    const toggleEditList5Fn = (e) => {
    e.preventDefault();

    setToggleEditList5({
      ...toggleEditList5,
      status: !toggleEditList5.status,
    });
  };


    const toggleEditList6Fn = (e) => {
    e.preventDefault();

    setToggleEditList6({
      ...toggleEditList6,
      status: !toggleEditList6.status,
    });
  };


  const toggleAppViewFn = (e) => {
    e.preventDefault();

    setToggleAppView({
      ...toggleAppView,
      status: !toggleAppView.status,
    });
  };


  const toggleTagSuccessFn = (e) => {
    e.preventDefault();

    let contactTagSuccessOp = toggleTagSuccess;

    setToggleTagSuccess({
      ...toggleTagSuccess,
      status: !toggleTagSuccess.status,
    });
  };


  const closeModal = () => {
    setAddDependentModal(false);
    setCommunication(false);
  };

  useEffect(() => {
    fetchCountry();
  }, [phoneCountryCode]);

  return (
    <>
     <div className="contactTabsInner appointmentPage">
        <h3 className="headingTabInner">Appointment</h3>
        
          <div className="transHeader">
            <button className="saveNnewBtn" onClick={() => addDependentModalFn()}>
              Add an Appointment <img src={arrow_forward} alt="" />
            </button>
            <span>* Explanatory text blurb should be here.</span>
            <span className="listDisplayBtns">
              <span className="listViews" onClick={(e) => toggleAppViewFn(e)}>
                <img src={listsView} alt="" />
              </span>
              <span className="calenderViews" onClick={(e) => toggleAppViewFn(e)}>
                <img src={calenderView} alt="" />
              </span>
            </span>

            {/* If no listing is there this section will be dsiplayed */}

            {/* <div className="noDataFound appointmentTab">
              <span>
                <span>This contact doesn’t have a appointment yet.</span>
              </span>
            </div> */}


            {/* If appointment listing is there, this section will be dsiplayed */}

            <div className={
                  toggleAppView.status
                    ? "appointmentDataListing listView display"
                    : "appointmentDataListing listView"
                }>
                <div className="gymHolidayList appointmentListing header">
                  <div className="cell">Date &amp; Time</div>
                  <div className="cell statusCell">Status</div>
                  <div className="cell setCell">Set by</div>
                  <div className="cell rescheduledCell">No. Of Time Rescheduled</div>
                  <div className="cell"></div>
                </div>

                <div className="holidayListWrap appListsWrap">

                <div className="holidayListWrap appLists">     
                  <div className="gymHolidayList appointmentListing results">
                    <div className="cell">05/18/2021. 14:10</div>
                    <div className="cell statusCell"><img src={status1} alt="" /></div>
                    <div className="cell setCell">Santanu Singha</div>
                    <div className="cell rescheduledCell">4</div>
                    <div className="cell">
                      <div className="sideEditOption">
                        <button onClick={(e) => toggleEditListFn(e)}>
                          <img src={dot3gray} alt="" />
                        </button>

                        <div       
                        className={
                          toggleEditList.status
                            ? "dropdownOptions appLists listOpen"
                            : "dropdownOptions appLists"
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
                    </div>
                  </div>
                </div>

                <div className="holidayListWrap appLists">     
                  <div className="gymHolidayList appointmentListing results">
                    <div className="cell">05/12/2021. 14:10</div>
                    <div className="cell statusCell"><img src={status2} alt="" /></div>
                    <div className="cell setCell">Jit Talukdar</div>
                    <div className="cell rescheduledCell">8</div>
                    <div className="cell">
                      <div className="sideEditOption">
                        <button onClick={(e) => toggleEditList2Fn(e)}>
                          <img src={dot3gray} alt="" />
                        </button>

                        <div       
                        className={
                          toggleEditList2.status
                            ? "dropdownOptions appLists listOpen"
                            : "dropdownOptions appLists"
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
                    </div>
                  </div>
                </div>

                <div className="holidayListWrap appLists">     
                  <div className="gymHolidayList appointmentListing results">
                    <div className="cell">05/12/2021. 14:10</div>
                    <div className="cell statusCell"><img src={status1} alt="" /></div>
                    <div className="cell setCell">Santanu Singha</div>
                    <div className="cell rescheduledCell">7</div>
                    <div className="cell">
                      <div className="sideEditOption">
                        <button onClick={(e) => toggleEditList3Fn(e)}>
                          <img src={dot3gray} alt="" />
                        </button>

                        <div       
                        className={
                          toggleEditList3.status
                            ? "dropdownOptions appLists listOpen"
                            : "dropdownOptions appLists"
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
                    </div>
                  </div>
                </div>


                <div className="holidayListWrap appLists">     
                  <div className="gymHolidayList appointmentListing results">
                    <div className="cell">05/12/2021. 14:10</div>
                    <div className="cell statusCell"><img src={status2} alt="" /></div>
                    <div className="cell setCell">Jit Talukdar</div>
                    <div className="cell rescheduledCell">5</div>
                    <div className="cell">
                      <div className="sideEditOption">
                        <button onClick={(e) => toggleEditList4Fn(e)}>
                          <img src={dot3gray} alt="" />
                        </button>

                        <div       
                        className={
                          toggleEditList4.status
                            ? "dropdownOptions appLists listOpen"
                            : "dropdownOptions appLists"
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
                    </div>
                  </div>
                </div>


                <div className="holidayListWrap appLists">     
                  <div className="gymHolidayList appointmentListing results">
                    <div className="cell">05/12/2021. 14:10</div>
                    <div className="cell statusCell"><img src={status1} alt="" /></div>
                    <div className="cell setCell">Santanu Singha</div>
                    <div className="cell rescheduledCell">2</div>
                    <div className="cell">
                      <div className="sideEditOption">
                        <button onClick={(e) => toggleEditList5Fn(e)}>
                          <img src={dot3gray} alt="" />
                        </button>

                        <div       
                        className={
                          toggleEditList5.status
                            ? "dropdownOptions appLists listOpen"
                            : "dropdownOptions appLists"
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
                    </div>
                  </div>
                </div>


                 <div className="holidayListWrap appLists">     
                  <div className="gymHolidayList appointmentListing results">
                    <div className="cell">05/12/2021. 14:10</div>
                    <div className="cell statusCell"><img src={status1} alt="" /></div>
                    <div className="cell setCell">Jit Talukdar</div>
                    <div className="cell rescheduledCell">2</div>
                    <div className="cell">
                      <div className="sideEditOption">
                        <button onClick={(e) => toggleEditList6Fn(e)}>
                          <img src={dot3gray} alt="" />
                        </button>

                        <div       
                        className={
                          toggleEditList6.status
                            ? "dropdownOptions appLists listOpen"
                            : "dropdownOptions appLists"
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
                    </div>
                  </div>
                </div>

                </div>


              
            </div>



            <div className={
              toggleAppView.status
                ? "appointmentDataListing calenderViewOnly"
                : "appointmentDataListing calenderViewOnly display"
            }>

            <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
            />
            </div>




          </div>
       
        
      </div>

      {addDependentModal && (
        <div className="modalDependent modalBackdrop">
          {isLoader ? <Loader /> : ""}
          <div className="slickModalBody setAppointment">


          
            
            <div className={
                        toggleTagSuccess.status
                          ? "modalForm appointmentForm setappointment successApp"
                          : "modalForm appointmentForm setappointment"
                      }
                      >
                       <div className="slickModalHeader appointmentModalHeads">
                          <button className="topCross setApp" onClick={() => closeModal(false)}>
                            <img src={cross} alt="" />
                          </button>
                      </div>
               <Scrollbars
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical appModalScroll" />
                )}
              > 
                <form method="post" className={
                        toggleTagSuccess.status
                          ? "dsiplay none"
                          : "dsiplay"
                      }
                    >
                    <div className="innerModalHeader">
		              
		              <div className="circleForIcon">
		                <img src={appointmentImg} alt="" />
		              </div>
		              <h3>Set an Appointment</h3>
		            </div>


                <div className="innerAppointmentModalBody">

                  <div className="cmnFormRow">
                    <div className="cmnFieldName d-flex f-justify-between">
                      Agenda
                      
                    </div>
                    <div
                      className={
                        toggleContactList.status
                          ? "cmnFormField listActive"
                          : "cmnFormField"
                      }
                    >

                    <span className="inputTagArea">
                      <input className="cmnFieldStyle createAppointment" type="text" placeholder="Eg. Martial Art Course Demo"/>
                      <span className="tagSection" onClick={(e) => toggleContactListFn(e)} ><img src={tags} alt="" /></span>
                      {toggleContactList.status && (
                      	<>
                      <span className="tagLists">
                      	<ul className="">
                      		<li className={
                        toggleTagList.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagListFn(e)}>Hot Lead <span className="addTag">+</span><span className="delTag">-</span></li>

                      			<li className={
                        toggleTagList1.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagList1Fn(e)}>New Active <span className="addTag">+</span><span className="delTag">-</span></li>
								<li className={
                        toggleTagList2.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagList2Fn(e)}>Cold Lead <span className="addTag">+</span><span className="delTag">-</span></li>
								<li className={
                        toggleTagList3.status
                          ? "tagLi sellected"
                          : "tagLi"
                      } onClick={(e) => toggleTagList3Fn(e)}>In Stage <span className="addTag">+</span><span className="delTag">-</span></li>
							
                      
                      	</ul>
                      </span>
                      </>
                      )}
                      </span>
					            {toggleTagList.status && (
                      	<>
                          <span className="indTags">Hot Leads <span className="closeTag" onClick={(e) => toggleTagListFn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      {toggleTagList1.status && (
                      	<>
                          <span className="indTags">New Active <span className="closeTag" onClick={(e) => toggleTagList1Fn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      {toggleTagList2.status && (
                      	<>
                          <span className="indTags">Cold Leads <span className="closeTag" onClick={(e) => toggleTagList2Fn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      {toggleTagList3.status && (
                      	<>
                          <span className="indTags">In Stage <span className="closeTag" onClick={(e) => toggleTagList3Fn(e)}><img src={crossWhite} alt="" /></span></span>
                        </>
                      )}  

                      
                    </div>
                  </div>
                  <div className="cmnFormRow">
                    <div className="cmnFormCol">
                      <div className="cmnFieldName">Choose a date</div>
                      <div className="cmnFormField">
                        <input
                          className="cmnFieldStyle"
                          type="date"
                          placeholder="dd/mm/yyyy"
                        />
                      </div>
                    </div>
                    <div className="cmnFormColquater">
                      <div className="cmnFieldName">From</div>
	                      <div className="cmnFormField">
	                        <input
	                          className="cmnFieldStyle"
	                          type="time"
	                          placeholder="Select"/>
	                      </div>
                    </div>
                    <div className="cmnFormColquater">
                      <div className="cmnFieldName">To</div>
	                      <div className="cmnFormField">
	                        <input
	                          className="cmnFieldStyle"
	                          type="time"
	                          placeholder="Select"/>
	                      </div>
                    </div>
                  </div>

                   <div className="modalbtnHolder w-100">
                    <button onClick={(e) => toggleTagSuccessFn(e)} className="saveDependent saveNnewBtn">
                      Set Appointment <img src={arrow_forward} alt="" />
                    </button>
                  </div>

                  </div>
</form>


<div>

                    </div>




                    {toggleTagSuccess.status && (
                      	<>
	                      <div className="innerModalHeader appSuccess">
				             
				              <div className="circleForIcon">
				                <img src={successApp} alt="" />
				              </div>
				              <h3 className="appSuccessH">Great</h3>
				              <p className="appSuccessP">Appointment created successfully</p>
			              </div>
	                    </>
                    )}  

                 
                  

                  

                 
                
               </Scrollbars> 
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;
