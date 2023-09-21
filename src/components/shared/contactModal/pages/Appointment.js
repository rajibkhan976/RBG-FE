import React, { useEffect, useRef, useState } from "react";
// import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import Loader from "../../Loader";
// import AlertMessage from "../../messages/alertMessage";
import { ContactService } from "../../../../services/contact/ContactServices";
import AddAppointmentModal from "./appointments/AddAppointmentModal";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import dropVector from "../../../../assets/images/dropVector.svg";
// import appointmentImg from "../../../../assets/images/appointments.svg";
// import tags from "../../../../assets/images/tags.svg";
// import crossWhite from "../../../../assets/images/cross_w.svg";
// import successApp from "../../../../assets/images/successApp.svg";
// import dot3gray from "../../../../assets/images/dot3gray.svg";
// import cross from "../../../../assets/images/cross.svg";
// import status1 from "../../../../assets/images/status1.svg";
// import status2 from "../../../../assets/images/status2.svg";
// import listsView from "../../../../assets/images/lists.svg";
// import calenderView from "../../../../assets/images/calemderList.svg";

import Scrollbars from "react-custom-scrollbars-2";
import * as actionTypes from "../../../../actions/types";
import {useDispatch, useSelector} from "react-redux";
import { AppointmentServices } from "../../../../services/appointment/appointment";
import { TagServices } from "../../../../services/setup/tagServices";
import AppointmentEditModal from "../../../appointment/AppointmentEditModal";
import { utils } from "../../../../helpers";
import moment from "moment";

const Appointment = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [editAppointment, setEditAppointment] = useState(false);
  const [appointmentCreated, setAppointmentCreated] = useState(false)
  const [appointmentToEdit, setAppointmentToEdit] = useState({});
  const [appHistory, setAppHistory] = useState(null);
  const [alertMsg, setAlertMsg] = useState({
    type: null,
    message: null,
    time: 5000, //ms
  });
  const [isEditing, setIsEditing] = useState(false);
  const [communication, setCommunication] = useState(false);
  const [addDependentModal, setAddDependentModal] = useState(false);
  const [toggleContactList, setToggleContactList] = useState(false);
  const scrollAppDetail = useRef(null)
  const dispatch = useDispatch();
  const timezone = useSelector((state) => (state.user?.data?.organizationTimezone) ? state.user.data.organizationTimezone : "UTC");

  const [toggleEditList, setToggleEditList] = useState(null);
  const [noteOnHover, setNoteOnHover] = useState(false)
  const [isScroll, setIsScroll] = useState(false);
  const [upcomingPagination, setUpcomingPagination ] = useState({});
  const fetchCountry = async () => {
    let conntryResponse = await ContactService.fetchCountry();
    setPhoneCountryCode(conntryResponse);
  };

  const addDependentModalFn = () => {
    setAddDependentModal(true);
  };

  const toggleEditListFn = (e, id) => {
    e.preventDefault();

    setToggleEditList(toggleEditList == id ? null : id);
  };
  const savedTag = useSelector((state) => state.tag.savedTag);
  
  const closeModal = () => {
    setAddDependentModal(false);
    setCommunication(false);
    console.log("Save tag", savedTag);
  };

  const fetchAppointment = async (page) => {
    try {
      setIsLoader(true);
      setIsScroll(true);
      let appointmentResult = await AppointmentServices.fetchContactAppointment(props.contactId, page);
      setIsScroll(false);
      if (page === 1) {
        setAppointments(appointmentResult.appointments);
      } else {
        setAppointments([...appointments, ...appointmentResult.appointments]);
      }
      setUpcomingPagination(appointmentResult.pagination);
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: "error",
      });
    } finally {
      setIsLoader(false);
    }
  };

  const editThisAppointment = (e, appointment, status) => {
    e.preventDefault();
    if (
      status !== "canceled" && status !== "completed"
    ) {
      setEditAppointment(true);
      setAppointmentToEdit(appointment);
    } else {
      setEditAppointment(false);
      setAppointmentToEdit({});
    }
  };

  const showAppDetails = (e, appId) => {
    e.preventDefault()
    setNoteOnHover(false)
    setAppHistory(appId)
    setTimeout(()=>{
      scrollAppDetail.current.scrollIntoView({behavior: 'smooth'})
    },400)
  }
  const updateAppointment = (appointment) => {
    let index = -1;
    const filteredObj = appointments.find(function (item, i) {
      if (item._id === appointment._id) {
        index = i;
        return i;
      }
    });
    if (index > -1) {
      setTimeout(() => {
        fetchAppointment(1)
      }, 400);
      // appointments[index] = appointment
      // setAppointments(appointments);
    }
  }
  const selectTags = (id, tag, mode) => {
    let index = -1;
    const filteredObj = appointments.find(function (item, i) {
      if (item._id == id) {
        index = i;
        return item;
      }
    });

    if (filteredObj) {
      let tagNames = filteredObj.tagNames;
      let tags = filteredObj.tags;
      if (mode) {
        tagNames = tagNames.filter(addedTag => addedTag._id != tag._id);
        tags = tags.filter(addedTag => addedTag != tag._id);
        tagNames.push(tag);
        tags.push(tag._id);
      } else {
        tagNames = tagNames.filter(addedTag => addedTag._id != tag._id);
        tags = tags.filter(addedTag => addedTag != tag._id);
      }
      appointments[index].tags = tags;
      appointments[index].tagNames = tagNames;
      setAppointments(appointments)
    }
  }
  const changeStatus = (id, status, note) => {
    let index = -1;
    const filteredObj = appointments.find(function (item, i) {
      if (item._id == id) {
        index = i;
        return item;
      }
    });
    if (filteredObj) {
      let editedAppointments = appointments;
      editedAppointments[index].status = status;
      editedAppointments[index].note = note;
      setAppointments(editedAppointments);
    }
  }
  const resheduleAppointment = (id, edited, user) => {
    let index = -1;
    const filteredObj = appointments.find(function (item, i) {
      if (item._id == id) {
        index = i;
        return item;
      }
    });
    if (filteredObj) {
      fetchAppointment(1)
      let editedAppointments = appointments;
      editedAppointments[index].rescheduleCount = appointments[index].rescheduleCount ? appointments[index].rescheduleCount + 1 : 1;
      let history = appointments[index].history ? appointments[index].history : []
      history.push({
        date: filteredObj.date,
        toTime: filteredObj.toTime,
        fromTime: filteredObj.fromTime,
        note: edited.note,
        rescheduledBy: user._id,
        rescheduledByName: user.fullName
      });
      editedAppointments[index].history = history;
      editedAppointments[index].date = edited.date;
      editedAppointments[index].toTime = edited.toTime;
      editedAppointments[index].fromTime = edited.fromTime;
      setAppointments(editedAppointments);
    }
  }
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        appHistory &&
        // titleAppRef.current &&
        !scrollAppDetail.current.contains(e.target)
      ) {
        setAppHistory(null)
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [appHistory]);
  
  useEffect(()=>{
    if(appointmentCreated === "success"){
      fetchAppointment(1)
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: "Appointment successfully created",
        typeMessage: "success",
      });
      setAddDependentModal(false)
    }
    // if(appointmentCreated === "error"){
    //   console.log("appointmentCreated", appointmentCreated);
      // dispatch({
      //   type: actionTypes.SHOW_MESSAGE,
      //   message: "Some issue in creating Appointment",
      //   typeMessage: "error",
      // });
    // }
  },[appointmentCreated])
  const upcomingAppointmentPageNo = (element) => {
    if (!isScroll && upcomingPagination.totalPages >= upcomingPagination.currentPage) {
      if ((element.target.scrollHeight - element.target.scrollTop === element.target.clientHeight)) {
        if(upcomingPagination.currentPage < upcomingPagination.totalPages) {
          fetchAppointment(upcomingPagination.currentPage + 1);
        }
      }
    }
  }
  useEffect(() => {
    fetchCountry();
    fetchAppointment(1);
    
  }, []);
  const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null); 

  return (
    <>
      <div className="contactTabsInner appointmentPage" >
        <div className="contactTabsScrollSpace" onScroll={upcomingAppointmentPageNo}>
          <h3 className="headingTabInner">Appointment</h3>

          <div className="transHeader">
            <button
              className="saveNnewBtn"
              onClick={() => addDependentModalFn()}
            >
              Add an Appointment <img src={arrow_forward} alt="" />
            </button>
            <span></span>
            {/* <span className="listDisplayBtns">
              <span className="listViews" onClick={(e) => toggleAppViewFn(e)}>
                <img src={listsView} alt="" />
              </span>
              <span className="calenderViews" onClick={(e) => toggleAppViewFn(e)}>
                <img src={calenderView} alt="" />
              </span>
            </span> */}

            {/* If no listing is there this section will be dsiplayed */}

            {/* <div className="noDataFound appointmentTab">
              <span>
                <span>This contact doesn’t have a appointment yet.</span>
              </span>
            </div> */}
          </div>

          {/* If appointment listing is there, this section will be dsiplayed */}

          <div className="appointmentModalListing">
            <div className="appointmentListingHeader d-flex">
              <div className="cell cellDateNTime">Schedule at</div>
              <div className="cell cellAgenda">Agenda</div>
              <div className="cell setCell">Set by</div>
              <div className="cell statusCell">Status</div>
              {/* <div className="cell"></div> */}
            </div>

            <div className="appListsWrap">
              {appointments.length > 0 ? (
                appointments.map((appointment, i) => (
                  <div
                    className={
                      appHistory == appointment._id
                        ? `appListRowWrap ${appointment.status}Row show`
                        : `appListRowWrap ${appointment.status}Row`
                    }
                    key={i}
                  >
                    <div
                      className="modalAppointmentsListing d-flex"
                      onClick={(e) => editThisAppointment(e, appointment, appointment.status)}
                    >
                      <div className="cell cellDateNTime f-align-center">
                        <figure className="icoHolderApp">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.3073 13.9997H2.69267C1.97866 13.9997 1.29389 13.7161 0.788939 13.2113C0.283988 12.7065 0.000206241 12.0218 0 11.3078V3.76884C0 3.0547 0.283691 2.36981 0.788664 1.86484C1.29364 1.35986 1.97853 1.07617 2.69267 1.07617H11.3073C12.0215 1.07617 12.7064 1.35986 13.2113 1.86484C13.7163 2.36981 14 3.0547 14 3.76884V11.3078C13.9998 12.0218 13.716 12.7065 13.2111 13.2113C12.7061 13.7161 12.0213 13.9997 11.3073 13.9997ZM2.69267 2.15339C2.26422 2.15339 1.85333 2.32359 1.55037 2.62655C1.24742 2.9295 1.07722 3.3404 1.07722 3.76884V11.3078C1.07722 11.7363 1.24742 12.1472 1.55037 12.4501C1.85333 12.7531 2.26422 12.9233 2.69267 12.9233H11.3073C11.7358 12.9233 12.1467 12.7531 12.4496 12.4501C12.7526 12.1472 12.9228 11.7363 12.9228 11.3078V3.76884C12.9228 3.3404 12.7526 2.9295 12.4496 2.62655C12.1467 2.32359 11.7358 2.15339 11.3073 2.15339H2.69267Z"
                              fill="white"
                            />
                            <path
                              d="M11.3065 11.8457H9.15443C9.01169 11.8457 8.87479 11.789 8.77385 11.6881C8.67292 11.5872 8.61621 11.4503 8.61621 11.3075V9.15541C8.61621 9.01266 8.67292 8.87577 8.77385 8.77483C8.87479 8.67389 9.01169 8.61719 9.15443 8.61719H11.3073C11.4501 8.61719 11.587 8.67389 11.6879 8.77483C11.7888 8.87577 11.8455 9.01266 11.8455 9.15541V11.3083C11.8454 11.379 11.8314 11.4489 11.8043 11.5142C11.7771 11.5795 11.7374 11.6387 11.6874 11.6887C11.6373 11.7386 11.5779 11.7781 11.5126 11.8051C11.4472 11.832 11.3772 11.8458 11.3065 11.8457ZM9.69188 10.7693H10.7683V9.69363H9.69266L9.69188 10.7693Z"
                              fill="white"
                            />
                            <path
                              d="M13.4618 5.38504H0.538222C0.395477 5.38504 0.258578 5.32833 0.157642 5.2274C0.0567053 5.12646 0 4.98956 0 4.84682C0 4.70407 0.0567053 4.56717 0.157642 4.46624C0.258578 4.3653 0.395477 4.30859 0.538222 4.30859H13.4618C13.6045 4.30859 13.7414 4.3653 13.8424 4.46624C13.9433 4.56717 14 4.70407 14 4.84682C14 4.98956 13.9433 5.12646 13.8424 5.2274C13.7414 5.32833 13.6045 5.38504 13.4618 5.38504Z"
                              fill="white"
                            />
                            <path
                              d="M4.30678 3.22856C4.16403 3.22856 4.02713 3.17185 3.9262 3.07091C3.82526 2.96998 3.76855 2.83308 3.76855 2.69033V0.538222C3.76855 0.395477 3.82526 0.258578 3.9262 0.157642C4.02713 0.0567053 4.16403 0 4.30678 0C4.44952 0 4.58642 0.0567053 4.68736 0.157642C4.78829 0.258578 4.845 0.395477 4.845 0.538222V2.69033C4.845 2.76101 4.83108 2.831 4.80403 2.8963C4.77698 2.9616 4.73734 3.02094 4.68736 3.07091C4.63738 3.12089 4.57805 3.16054 4.51275 3.18759C4.44745 3.21463 4.37746 3.22856 4.30678 3.22856Z"
                              fill="white"
                            />
                            <path
                              d="M9.69252 3.22856C9.54977 3.22856 9.41288 3.17185 9.31194 3.07091C9.211 2.96998 9.1543 2.83308 9.1543 2.69033V0.538222C9.1543 0.395477 9.211 0.258578 9.31194 0.157642C9.41288 0.0567053 9.54977 0 9.69252 0C9.83526 0 9.97216 0.0567053 10.0731 0.157642C10.174 0.258578 10.2307 0.395477 10.2307 0.538222V2.69033C10.2307 2.83308 10.174 2.96998 10.0731 3.07091C9.97216 3.17185 9.83526 3.22856 9.69252 3.22856Z"
                              fill="white"
                            />
                          </svg>
                        </figure>
                        <p>
                          {/* {appointment.fromTime} */}
                          {utils.convertUTCToTimezone(appointment.fromDateTime.trim(), timezoneOffset).split(" ").splice(0, 3).join(" ")}
                          <strong className="appTime">
                          {utils.convertUTCToTimezone(appointment.fromDateTime.trim(), timezoneOffset).split(" ").splice(3,4).join(" ")} - {utils.convertUTCToTimezone(appointment.toDateTime.trim(), timezoneOffset).split(" ").splice(3,4).join(" ")} 
                            {/* {appointment.fromTime} - {appointment.toTime} */}
                            {/* {
                            utils.convertUTCToTimezone(moment(appointment.date, "MM/DD/YYYY").format("YYYY-MM-DD") + " " + moment(appointment.fromTime, "hh:mm A").format("hh:mm:ss"), timezone, "YYYY-MM-DD,h:mm A").split(",")[1]
                            + " - " +
                            utils.convertUTCToTimezone(moment(appointment.date, "MM/DD/YYYY").format("YYYY-MM-DD") + " " + moment(appointment.toTime, "hh:mm A").format("hh:mm:ss"), timezone, "YYYY-MM-DD,h:mm A").split(",")[1]
                            } */}
                          </strong>
                        </p>
                      </div>
                      <div className="cell cellAgenda">
                        {appointment.agenda}
                      </div>
                      <div className="cell setCell">
                        {appointment.createdBy}
                      </div>
                      <div className="cell statusCell">
                        <span className="appStatusTag">
                          {appointment.status}
                        </span>
                        {appointment.status === "canceled" ?
                          <div className="notePop">
                            <div className="notePopIcon"></div>
                            <div className="notePopContent">
                              <span>Reason: </span>
                              { appointment.note }
                            </div>
                          </div> : "" }
                      </div>
                    </div>
                    <div className="appointmentDetails">
                      {(appHistory !== appointment._id || appHistory == null) &&
                        appointment.history &&
                        appointment.history.length > 0 && (
                          <button
                            className="btn showMore"
                            onClick={(e) => showAppDetails(e, appointment._id)}
                          >
                            {<img src={dropVector} alt="" />}
                          </button>
                        )}
                      {appHistory == appointment._id ? (
                        <div className="appDetails" ref={scrollAppDetail}>
                          {appointment.history.map((histItem, index) => (
                            <div className="appDetail d-flex" key={index}>
                              <figure className="icoHolderApp s">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.81744 6.30879e-06C7.79079 -0.00132748 8.75275 0.208844 9.63641 0.615904C10.5201 1.02296 11.3042 1.61714 11.9343 2.3571L12.8629 1.53297C12.9616 1.44606 13.0832 1.38937 13.2134 1.3697C13.3435 1.35004 13.4766 1.36824 13.5966 1.42211C13.7166 1.47598 13.8185 1.56324 13.8901 1.67343C13.9616 1.78361 13.9998 1.91205 14 2.04332V4.76901C14 4.94948 13.9281 5.12256 13.8002 5.25018C13.6722 5.37779 13.4987 5.44949 13.3178 5.44949H10.2325C10.094 5.44886 9.95889 5.40632 9.84514 5.32748C9.73139 5.24864 9.64431 5.13721 9.59543 5.00794C9.54654 4.87867 9.53815 4.73764 9.57136 4.60351C9.60458 4.46938 9.67783 4.34847 9.78143 4.25676L10.909 3.25495C10.4044 2.66183 9.77631 2.18549 9.0684 1.85906C8.36049 1.53263 7.58977 1.36394 6.80986 1.36474C5.8083 1.36482 4.82603 1.63949 3.9704 2.15873C3.11476 2.67797 2.41869 3.4218 1.95824 4.30894C1.4978 5.19607 1.2907 6.19238 1.35957 7.18898C1.42845 8.18557 1.77065 9.14411 2.34879 9.95984C2.92692 10.7756 3.71874 11.4171 4.63772 11.8143C5.55669 12.2116 6.56745 12.3492 7.55956 12.2122C8.55165 12.0752 9.48691 11.6689 10.2631 11.0376C11.0393 10.4063 11.6266 9.57431 11.9608 8.6326C11.9877 8.54461 12.032 8.46293 12.0913 8.39248C12.1506 8.32203 12.2235 8.26425 12.3057 8.22262C12.388 8.18099 12.4778 8.15637 12.5698 8.15024C12.6618 8.1441 12.7541 8.15658 12.8411 8.18692C12.9282 8.21727 13.0082 8.26485 13.0763 8.3268C13.1444 8.38876 13.1993 8.46382 13.2376 8.54747C13.276 8.63112 13.2969 8.72163 13.2993 8.81357C13.3017 8.9055 13.2854 8.99697 13.2514 9.08247C12.833 10.2574 12.0989 11.2951 11.1293 12.0823C10.1598 12.8694 8.99201 13.3757 7.75357 13.5459C6.51513 13.716 5.25362 13.5435 4.10679 13.0472C2.95995 12.5509 1.9719 11.7498 1.2505 10.7315C0.529111 9.71311 0.102119 8.51664 0.0161522 7.2727C-0.0698142 6.02876 0.18855 4.78517 0.763034 3.67773C1.33752 2.57029 2.20603 1.64158 3.27374 0.993006C4.34145 0.34443 5.5673 0.000927523 6.81744 6.30879e-06Z" fill="white"/>
                                <path d="M4.25688 9.53807C4.4045 9.53807 4.54814 9.49031 4.66623 9.40197L7.39902 7.35676C7.48375 7.29338 7.55252 7.21118 7.59989 7.1167C7.64726 7.02221 7.67192 6.91802 7.67192 6.81238V4.0867C7.67192 3.90597 7.59994 3.73265 7.47181 3.60486C7.34369 3.47707 7.16992 3.40527 6.98872 3.40527C6.80753 3.40527 6.63375 3.47707 6.50563 3.60486C6.3775 3.73265 6.30552 3.90597 6.30552 4.0867V6.47214L3.84185 8.31132C3.72651 8.39677 3.64115 8.51636 3.59796 8.65304C3.55477 8.78972 3.55594 8.93651 3.60132 9.07248C3.64669 9.20845 3.73394 9.32667 3.85064 9.41027C3.96734 9.49388 4.10752 9.5386 4.2512 9.53807H4.25688Z" fill="white"/>
                              </svg>
                              </figure>
                              <p>
                                {/* {histItem.date} */}
                                {utils.convertUTCToTimezone(histItem?.fromDateTime.trim(), timezoneOffset).split(" ").splice(0,3).join(" ")}
                                <strong className="appTime">
                                  {/* {histItem.date + " " + utils.timeConversion(histItem.fromTime)} */}
                                  {/* {histItem.date + " " + utils.timeConversion(histItem.toTime)} */}
                                  {utils.convertUTCToTimezone(histItem?.fromDateTime.trim(), timezoneOffset).split(" ").splice(3,4).join(" ")} - {utils.convertUTCToTimezone(histItem?.toDateTime.trim(), timezoneOffset).split(" ").splice(3,4).join(" ")}
                                  {/* {histItem.fromTime}-{histItem.toTime} */}
                                </strong>
                              </p>
                              {histItem.note && (
                                <div className="noteResch d-flex f-align-center">
                                  <label>Note: </label>
                                  <div className="notePop">
                                    <div className="notePopIcon"></div>
                                    <div className="notePopContent">
                                      {/* <span>Reason: </span> */}
                                      {histItem.note}
                                    </div>
                                  </div>
                                  {/* <span
                                  className="notePopIcon"
                                    onMouseEnter={(e)=>{
                                      setNoteOnHover(true)
                                    }}
                                    onMouseLeave={(e)=>{
                                      setNoteOnHover(false)
                                    }}
                                  >
                                  </span>
                                  <div className={noteOnHover ? "noteOnHover hoveredOn" : "noteOnHover"}>
                                    {histItem.note}
                                  </div> */}
                                </div>
                              )}
                              <div className="rescheduledBy">
                                {histItem.rescheduledByName}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="noDataFound appointmentTab">
                  <span>
                    <span>This contact doesn’t have a appointment yet.</span>
                  </span>
                </div>
              )}
              {isLoader ? <div className="bottomLoader"></div> : ""}
            </div>
          </div>

          {/* <div className={
              toggleAppView.status
                ? "appointmentDataListing calenderViewOnly"
                : "appointmentDataListing calenderViewOnly display"
            }>

            <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
            />
            </div> */}

          {/* </div> */}
        </div>
      </div>

      {addDependentModal && (
        <AddAppointmentModal
          appointments={appointments}
          setAppointments={setAppointments}
          closeModal={closeModal}
          contactId={props.contactId}
          setAppointmentCreated={setAppointmentCreated}
        />
      )}

      {editAppointment && (
        <AppointmentEditModal
          appointmentEdit={appointmentToEdit}
          setEditAppointment={setEditAppointment}
          updateAppointment={updateAppointment}
          selectTags={selectTags}
          changeStatus={changeStatus}
          resheduleAppointment={resheduleAppointment}
          editVia="contact-modal" //contact-modal / appointment-global
        />
      )}
    </>
  );
};

export default Appointment;
