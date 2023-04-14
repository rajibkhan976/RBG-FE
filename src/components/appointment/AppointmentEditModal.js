import React, { useEffect, useRef, useState } from "react";

import cross from "../../../src/assets/images/cross_white.svg";
import edit from "../../../src/assets/images/edit_grey.svg";
import crossWhite from "../../../src/assets/images/cross_w.svg";
import userWhite from "../../../src/assets/images/user_icon_white.svg"
import TimePicker from "rc-time-picker";
import {AppointmentServices} from "../../services/appointment/appointment";
import * as actionTypes from "../../actions/types";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../shared/Loader";
import TagList from "./TagList";
import moment from "moment";
import { utils } from '../../helpers';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const AppointmentEditModal = (props) => {
  const [date, setDate] = useState();
  const agendaRef = useRef(null);
  const reschDate = useRef(null);
  const noteReschedule = useRef(null);
  const cancelNote = useRef(null)
  const [errorEdit, setErrorEdit] = useState({});
  const [isEditAgenda, setIsEditAgenda] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [editedAgenda, setEditedAgenda] = useState("");
  const [editedTags, setEditedTags] = useState([]);
  const [editedTagNames, setEditedTagNames] = useState([]);
  const [shouldCancel, setShouldCancel] = useState(false);
  const [shouldReschedule, setShouldReschedule] = useState(false);
  const [tagListToggle, setTagListToggle] = useState(false);
  const [appointmentEditContact, setAppointmentEditContact] = useState(null)
  const [rescheduleErrors, setRescheduleErrors] = useState({
    date: "",
    fromTime: "",
    toTime: "",
    note: "",
  });
  const [canceledError, setCancelledError] = useState({note: ""})
  const [editedReschedule, setEditedReschedule] = useState({
    date: props.appointmentEdit.date,
    fromTime: props.appointmentEdit.fromTime,
    toTime: props.appointmentEdit.toTime,
    note: "",
    fromDateTime:"",
    toDateTime:""
  });
  const [canceled, setCancelled] = useState({note: ""})
  const loggedInUser = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [calenderMinDate, setCalenderMinDate] = useState();
  const resetAgenda = (e) => {
    e.preventDefault();
    setIsEditAgenda(false);
    agendaRef.current.value = editedAgenda;
    setErrorEdit({ errorEdit, agenda: "" });
  };
  useEffect(()=>{
    console.log("appointment edit data", props.appointmentEdit, moment(props.appointmentEdit.date, "YYYY-mm-dd").format("mm/DD/YYYY"))
  },[props.appointmentEdit])

  const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null); 
  useEffect(()=>{
      console.log("transaction time zone:", timezoneOffset);
  },[timezoneOffset]);

  useEffect(() => {
    let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
    let formatedDateTime = moment(timezoneDateTime).format("YYYY-MM-DD HH:mm:ss").split(" ")[0];
    setCalenderMinDate(formatedDateTime);

    // let selectedDate = moment(utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime, timezoneOffset)).format("YYYY-MM-DD");
    // setDate("2023-04-16");
  }, []);

  const confirmAgenda = async (e) => {
    e.preventDefault();
    try {
      if (agendaRef.current.value.trim() === "") {
        setErrorEdit({ errorEdit, agenda: "Agenda cannot be empty" });
      } else {
        if(agendaRef.current.value.length > 30){
          setErrorEdit({ errorEdit, agenda: "Agenda cannot be more than 30 characters" });
        } else {
          setIsLoader(true);
          await AppointmentServices.editAgenda(props.appointmentEdit._id, {
            agenda: agendaRef.current.value
          });
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "Agenda updated successfully.",
            typeMessage: 'success'
          });
          setIsLoader(false);
          let appoint = props.appointmentEdit;
          appoint.agenda = agendaRef.current.value;
          props.updateAppointment(appoint);
          setEditedAgenda(agendaRef.current.value);
          setIsEditAgenda(false);
          setErrorEdit({ errorEdit, agenda: "" });
        }
      }
    } catch (e) {
      setIsLoader(false);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    }
  };
  const selectTag = async (tag, mode) => {
    let tags = editedTags;
    let tagNames = editedTagNames;
    if (mode) {
      try {
        setIsLoader(true);
        await AppointmentServices.addTagToAppointment(props.appointmentEdit._id, {
          tag: tag._id
        });
        props.selectTags(props.appointmentEdit._id, tag, mode);
        tags = tags.filter(addedTag => addedTag != tag._id);
        tagNames = tagNames.filter(addedTag => addedTag._id != tag._id);
        tags.push(tag._id);
        tagNames.push(tag);
        setIsLoader(false);
      } catch (e) {
        setIsLoader(false);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: e.message,
          typeMessage: 'error'
        });
      }
    } else {
      try {
        setIsLoader(true);
        await AppointmentServices.removeTagFromAppointment(props.appointmentEdit._id, {
          tag: tag._id
        });
        props.selectTags(props.appointmentEdit._id, tag, mode)
        tags = tags.filter(addedTag => addedTag != tag._id);
        tagNames = tagNames.filter(addedTag => addedTag._id != tag._id);
        setIsLoader(false);
      } catch (e) {
        setIsLoader(false);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: e.message,
          typeMessage: 'error'
        });
      }
    }
    console.log('tags', tags, tag);
    setEditedTags(tags);
    setEditedTagNames(tagNames);
    setTagListToggle(false);
  }
  const initiateCancellation = (e) => {
    e.preventDefault();
    setCancelledError({note: ""})
    setCancelled({note: ""})
    setShouldCancel(!shouldCancel);
  };

  const completeAppointment = async (e) => {
    e.preventDefault();
    try {
      setIsLoader(true);
      await AppointmentServices.completeAppointment(props.appointmentEdit._id);
      props.editVia !== "appointment-global" && props.changeStatus(props.appointmentEdit._id, "completed", "");
      setIsLoader(false);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: "Appointment completed successfully.",
        typeMessage: 'success'
      });

      props.setEditAppointment(false)
    } catch (e) {
      setIsLoader(false);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    }
  };

  const completeCancellation = async (e) => {
    e.preventDefault();
    let editAppointmentPlaceholder = {...props.appointmentEdit};

    if (cancelNote.current.value.trim() !== "") {
      setCancelledError({note: ""})
      editAppointmentPlaceholder.note = cancelNote.current.value;
      
      try {
        setIsLoader(true);
        await AppointmentServices.cancelAppointment(props.appointmentEdit._id, {
          note: cancelNote.current.value
        });
        props.editVia !== "appointment-global" && props.changeStatus(props.appointmentEdit._id, "canceled", "");
        props.updateAppointment(editAppointmentPlaceholder)
        props.setEditAppointment(false);
        setIsLoader(false);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: "Appointment canceled successfully.",
          typeMessage: 'success'
        });
      } catch (e) {
        setIsLoader(false);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: e.message,
          typeMessage: 'error'
        });
      }
    } else {
      setCancelledError({note: "Please enter a valid note."})
    }

    // setCancelled({note: cancelNote.current.value})
  };

  useEffect(()=>{
    if(canceled.note.trim() === "") {
      setCancelledError({note: "Please enter a valid note."})
    } else {
      setCancelledError({note: ""})
    }
  },[canceled])

  const initiateReschedule = (e) => {
    e.preventDefault();
    setShouldReschedule(true);
  };

  const getEditedDate = (e) => {
    let validErrors = { ...rescheduleErrors };
    setEditedReschedule({ ...editedReschedule, date: e.target.value });
    
    const convertedChoosedTime = utils.convertTimezoneToUTC(e.target.value + " " + moment(editedReschedule.fromTime, "HH:mm:ss").format("HH:mm:ss"),timezoneOffset);
    const convertedLocalTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    const localTime = moment(convertedLocalTime, "YYYY-MM-DD HH:mm:ss");
    const choosedTime = moment(convertedChoosedTime, "YYYY-MM-DD HH:mm:ss");
    const diffFromToday = choosedTime.diff(localTime, "minutes");
    
    if (diffFromToday < 2) {
      validErrors.fromTime = "Please choose valid time";
    } else {
      validErrors.fromTime = "";
      
    }

    setRescheduleErrors(validErrors);
  };

  const setStartDate = (val) => {
    let validErrors = {...rescheduleErrors};
    let formattedDate = `${val.getFullYear()}-${
        val.getMonth() + 1
      }-${val.getDate()}`;
    setDate(val);
    console.log("Date val=========================================", val);

    const convertedChoosedTime = utils.convertTimezoneToUTC(formattedDate + " " + moment(editedReschedule.fromTime, "HH:mm:ss").format("HH:mm:ss"),timezoneOffset);
    const convertedLocalTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    const localTime = moment(convertedLocalTime, "YYYY-MM-DD HH:mm:ss");
    const choosedTime = moment(convertedChoosedTime, "YYYY-MM-DD HH:mm:ss");
    const diffFromToday = choosedTime.diff(localTime, "minutes");
    
    if (diffFromToday < 2) {
      validErrors.fromTime = "Please choose valid time";
    } else {
      validErrors.fromTime = "";
      
    }

    setRescheduleErrors(validErrors);
  }
  

  const fromScheduleDateEdit = (fromReschedule) => {
    // console.log(fromValue && fromValue.format('h:mm a').toUpperCase());
    const convertedChoosedTime = utils.convertTimezoneToUTC(utils.dateConversion(editedReschedule.date) + " " + fromReschedule.format("HH:mm:ss"),timezoneOffset);
    const convertedLocalTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    const localTime = moment(convertedLocalTime, "YYYY-MM-DD HH:mm:ss");
    const choosedTime = moment(convertedChoosedTime, "YYYY-MM-DD HH:mm:ss");
    const diffFromToday = choosedTime.diff(localTime, "minutes");
    console.log()
    console.log("Time diff ======================== ", diffFromToday, rescheduleErrors, editedReschedule  );



    let validErrors = { ...rescheduleErrors };
    
    if(fromReschedule && fromReschedule != null) {
        if(editedReschedule.toTime.trim() === ""){
          validErrors.fromTime = ""
          //validErrors.toTime = "Invalid end time.";
          setEditedReschedule({...editedReschedule, fromTime: fromReschedule.format('h:mm a').toUpperCase()})
        }
        else if(diffFromToday < 2) {
          validErrors.fromTime = "Please choose valid time"
        }
        else {
            console.log(parseFloat(editedReschedule.toTime.split(" ")[0].replace(":", "")), parseFloat(fromReschedule.format('h:mm a').split(" ")[0].replace(":", "")));
          if(parseFloat(editedReschedule.toTime.split(" ")[0].replace(":", "")) <= parseFloat(fromReschedule.format('h:mm a').split(" ")[0].replace(":", ""))) {
            if(editedReschedule.toTime.split(" ")[1] === fromReschedule.format('h:mm a').split(" ")[1].toUpperCase()) {
              //validErrors.fromTime = "Invalid start time.";
            }
            else {
              validErrors.fromTime = ""
            }
          }
          else {
            validErrors.fromTime = ""
          }
          setEditedReschedule({...editedReschedule, fromTime: fromReschedule.format('h:mm a').toUpperCase()})
          
        }
    }
    else {
     // validErrors.fromTime = "Invalid start time.";
    }
    // parseInt(e.target.value.replace(":","")) >= parseInt(appointmentData.toTime.replace(":",""))
    setRescheduleErrors(validErrors);
  };

  const toScheduleDateEdit = (toReschedule) => {
    // console.log(toReschedule);
    let validErrors = { ...rescheduleErrors };

    let choosedFromTime = moment(editedReschedule.date + " " + editedReschedule.fromTime, "YYYY-MM-DD HH:mm:ss");
    let choosedToTime = moment(editedReschedule.date + " " + toReschedule.format("HH:mm:ss"), "YYYY-MM-DD HH:mm:ss");
    let timeDiff = choosedToTime.diff(choosedFromTime, "minutes");
    console.log("To time ============= ", toReschedule);

    if(toReschedule && toReschedule != null) {
      if(editedReschedule.fromTime.trim() === ""){
        validErrors.toTime = ""
       // validErrors.fromTime = "Invalid start time.";
        setEditedReschedule({...editedReschedule, toTime: toReschedule.format('h:mm a').toUpperCase()})
      } else if (timeDiff < 1) {
        validErrors.toTime = "Please choose valid time";
        console.log("Invalid to time ============= ", timeDiff);
      }
      else {
        if(parseFloat(editedReschedule.fromTime.split(" ")[0].replace(":", "")) >= parseFloat(toReschedule.format('h:mm a').split(" ")[0].replace(":", ""))) {
          if(editedReschedule.fromTime.split(" ")[1] === toReschedule.format('h:mm a').split(" ")[1].toUpperCase()) {
           // validErrors.toTime = "Invalid end time.";
          }
          else {
            validErrors.toTime = ""
          }
        }
        else {
          validErrors.toTime = ""
        }
        setEditedReschedule({...editedReschedule, toTime: toReschedule.format('h:mm a').toUpperCase()})
      }
    }
    else {
     // validErrors.toTime = "Invalid end time.";
    }
    // parseInt(e.target.value.replace(":","")) <= parseInt(appointmentData.fromTime.replace(":",""))
    setRescheduleErrors(validErrors);
  };

  const closeReschedule = () => {
    setShouldReschedule(false);
    setEditedReschedule({
      date: "",
      fromTime: "",
      toTime: "",
      note: "",
    });
    setRescheduleErrors({
      date: "",
      fromTime: "",
      toTime: "",
      note: "",
    });
  };

  const rescheduleAppointment = async (e) => {
    e.preventDefault();
    console.clear();
    console.log("Date", editedReschedule.date, props.appointmentEdit.date);
    console.log("From Time", editedReschedule.fromTime, props.appointmentEdit.fromTime);
    console.log("To Time", editedReschedule.toTime, props.appointmentEdit.toTime);
    let fromDateConversion;
    let toDateConversion;

    if(props.appointmentEdit.fromTime){
      fromDateConversion = utils.convertTimezoneToUTC(editedReschedule.date + " " + utils.timeConversion(props.appointmentEdit.fromTime), timezoneOffset).trim();
    }
    if(props.appointmentEdit.toTime){
      toDateConversion = utils.convertTimezoneToUTC(editedReschedule.date + " " + utils.timeConversion(props.appointmentEdit.toTime), timezoneOffset).trim();
    }
    if(editedReschedule?.fromTime){
      fromDateConversion = utils.convertTimezoneToUTC(editedReschedule.date + " " + utils.timeConversion(editedReschedule.fromTime), timezoneOffset).trim();
    }
    if(editedReschedule?.toTime){
      toDateConversion = utils.convertTimezoneToUTC(editedReschedule.date + " " + utils.timeConversion(editedReschedule.toTime), timezoneOffset).trim();
    }
    console.log("=============", fromDateConversion, toDateConversion);
    // setEditedReschedule({
    //   ...editedReschedule,
    //   fromDateTime: fromDateConversion,
    //   toDateTime: toDateConversion
    // })
    editedReschedule['fromDateTime'] = fromDateConversion;
    editedReschedule['toDateTime'] = toDateConversion;

    console.log("edit reschedule payload", fromDateConversion, toDateConversion, editedReschedule);
    if (rescheduleErrors.date === "" &&
    rescheduleErrors.fromTime === "" &&
    rescheduleErrors.toTime === "" && 
    rescheduleErrors.note === ""){
      try {
        setIsLoader(true);
        const result = await AppointmentServices.rescheduleAppointment(props.appointmentEdit._id, editedReschedule);
        if(result){
          props.resheduleAppointment(props.appointmentEdit._id, editedReschedule, loggedInUser);
          setIsLoader(false);
          setShouldReschedule(false)
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "Appointment rescheduled successfully.",
            typeMessage: 'success'
          });
          props.setEditAppointment(false);
        }
      } catch (e) {
        setIsLoader(false);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: e.message,
          typeMessage: 'error'
        });
      }
    } else {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: 'Please choose valid "From" or "To" time',
        typeMessage: 'error'
      });
    }
  };

  const rescheduleDisabled = () => {
    if(editedReschedule.note.trim() == "") {
      console.log("NOTE empty");
      return true
    }
    else {
      if(rescheduleErrors.date.trim() === "" &&
      rescheduleErrors.fromTime.trim() === "" &&
      rescheduleErrors.toTime.trim() === "") {
        return false
      }
      if(rescheduleErrors.date.trim() !== "" &&
      rescheduleErrors.fromTime.trim() !== "" &&
      rescheduleErrors.toTime.trim() !== "") {
        return true
      }
    }

    // if (
    //   rescheduleErrors.date.trim() === "" &&
    //   rescheduleErrors.fromTime.trim() === "" &&
    //   rescheduleErrors.toTime.trim() === "" &&
    //   rescheduleErrors.note.trim() === ""
    // ) {
    //   if(editedReschedule.date.trim() === "" && editedReschedule.fromTime.trim() === "" && editedReschedule.toTime.trim() === "" && editedReschedule.note.trim() === "") {
    //     return true
    //   } else {
    //     return false
    //   }
    // } 
    // else {
    //   console.log("all NOT empty");
    //   else {
    //     console.log("all NOT empty, NOTE NOT EMPTY");
    //     return false;
    //   }
    // }
  };

  const addNoteForEdit = (e) => {
    let validErrors = { ...rescheduleErrors };
    let edtiedSchedule = {...editedReschedule}

    if(e.target.value.trim() === "") {
      validErrors.note = "Please enter a proper note after making a change to the Appointment data."
    }
    else {
      validErrors.note = ""
    }

    edtiedSchedule.note = e.target.value
    setEditedReschedule(edtiedSchedule)
    setRescheduleErrors(validErrors);
  }
  const toggleContactListFn = (e) => {
    e.preventDefault();
    setTagListToggle(!tagListToggle);
  };
  useEffect(() => {
    setIsLoader(true)
    try {
      console.log('props appointment edit', props.appointmentEdit, editedReschedule);
      setAppointmentEditContact(props.appointmentEdit.contactDetails)
      setEditedAgenda(props.appointmentEdit.agenda);
      setEditedTags(props.appointmentEdit.tags);
      setEditedTagNames(props.appointmentEdit.tagNames);
      // console.log(props.appointmentEdit.tags);
      console.log("Date========", props.appointmentEdit.date)
      setIsLoader(false)
      setEditedReschedule({
        ...editedReschedule,
        date: props?.appointmentEdit?.date
      })
    } catch(err) {
      console.log(err);
    } finally {
    }
  }, []);

  const [fromDateTime, setFromDateTime] = useState();
  const [toDateTime, setToDateTime] = useState();
  useEffect(()=>{
    setFromDateTime(moment(utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime, timezoneOffset)));
    setToDateTime(moment(utils.convertUTCToTimezone(props.appointmentEdit.toDateTime, timezoneOffset)));
    console.log("props appointment", fromDateTime, toDateTime);
  },[props.appointmentEdit])

  

  return (
    <div className="appointmentEditModal modalBackdrop">
       <div className="modalBackdropBg" onClick={() => props.setEditAppointment(false)}></div> 
      <div className="slickModalBody">
        <div
          className={"slickModalHeader " + props.appointmentEdit.status + "Row"}
        >
          {props.editVia === "contact-modal" && (
            <h4>
              Appointment <span className="appStatusTag">{props.appointmentEdit.status}</span>
            </h4>
          )}
          {props.editVia === "appointment-global" && (
            <div className="contactDetailsheader d-flex">
              {(appointmentEditContact && appointmentEditContact.profilePic) ? 
                <figure className="contactImage"
                  style={{
                    backgroundImage: `url(${appointmentEditContact.profilePic})`
                  }}
                ></figure> : <figure style={{
                  backgroundImage: `url(${userWhite})`
                }}></figure>
              }
              <div className="infoDataheaderApp">
                <h4>
                  {appointmentEditContact && (appointmentEditContact.firstName+" "+appointmentEditContact.lastName)}
                </h4>
                <ul>
                  {appointmentEditContact && appointmentEditContact.phone && appointmentEditContact.phone.full_number &&
                  <li>
                    <a href={"tel:"+appointmentEditContact.phone.full_number}>
                      <figure>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.19416 2.91474C7.66179 3.00594 8.09157 3.23464 8.42847 3.57153C8.76536 3.90843 8.99406 4.33821 9.08526 4.80584M7.19416 1C8.16557 1.10801 9.0714 1.54306 9.76297 2.23374C10.4545 2.92443 10.8907 3.8297 11 4.80098M10.5211 8.6235V10.0594C10.5217 10.1926 10.4944 10.3245 10.441 10.4466C10.3877 10.5687 10.3095 10.6783 10.2114 10.7684C10.1132 10.8586 9.99739 10.9272 9.87123 10.97C9.74506 11.0129 9.61135 11.0289 9.47864 11.0171C8.00524 10.8575 6.58982 10.3545 5.34614 9.54855C4.18912 8.81272 3.2084 7.83105 2.47369 6.67332C1.66446 5.42423 1.16088 4.00206 1.00376 2.52206C0.992001 2.38976 1.00789 2.25645 1.05042 2.13062C1.09295 2.00479 1.16118 1.88918 1.25079 1.79114C1.3404 1.6931 1.44943 1.61477 1.57094 1.56113C1.69245 1.50749 1.82379 1.47971 1.95661 1.47955H3.39318C3.62534 1.47741 3.85038 1.55968 4.02642 1.71104C4.20247 1.86241 4.31753 2.07258 4.3502 2.30244C4.41076 2.76215 4.52314 3.21353 4.6852 3.64796C4.74917 3.81954 4.76261 4.00586 4.72393 4.18484C4.68525 4.36382 4.59607 4.52796 4.46696 4.6578L3.85884 5.26593C4.54034 6.46449 5.53273 7.45688 6.73129 8.13838L7.33942 7.53026C7.46957 7.40162 7.63385 7.31296 7.81281 7.27478C7.99178 7.2366 8.17794 7.25049 8.34926 7.3148C8.78369 7.47686 9.23507 7.58924 9.69478 7.6498C9.92755 7.68264 10.1401 7.79995 10.292 7.97937C10.4438 8.1588 10.5244 8.38781 10.5184 8.6228L10.5211 8.6235Z"
                            stroke="#9BAEBC"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </figure>
                      <span>{appointmentEditContact.phone.full_number}</span>
                    </a>
                  </li>
}
                  {appointmentEditContact && appointmentEditContact.email && 
                  <li>
                    <a href={"mailto:"+(appointmentEditContact.email)}>
                      <figure>
                        <svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9993 1.17237C11.9993 0.861563 11.8759 0.563477 11.6562 0.343636C11.4364 0.123796 11.1384 0.000193287 10.8276 0L1.17237 0C0.861437 0 0.56324 0.123517 0.343379 0.343379C0.123517 0.56324 0 0.861437 0 1.17237L0 8.81244C0 9.12337 0.123517 9.42157 0.343379 9.64143C0.56324 9.86129 0.861437 9.98481 1.17237 9.98481H10.8276C11.1386 9.98481 11.4368 9.86129 11.6566 9.64143C11.8765 9.42157 12 9.12337 12 8.81244L11.9993 1.17237ZM1.1782 0.936873H10.8364C10.867 0.936681 10.8974 0.94256 10.9257 0.95417C10.9541 0.965781 10.9798 0.982894 11.0015 1.00452C11.0232 1.02615 11.0404 1.05186 11.0521 1.08016C11.0638 1.10847 11.0698 1.13882 11.0697 1.16945V1.17966L6.17316 6.07692C6.15143 6.09866 6.12562 6.1159 6.09723 6.12766C6.06883 6.13942 6.03839 6.14548 6.00766 6.14548C5.97692 6.14548 5.94648 6.13942 5.91809 6.12766C5.88969 6.1159 5.86389 6.09866 5.84215 6.07692L0.943435 1.17893V1.16654C0.944395 1.10504 0.969599 1.04641 1.01356 1.0034C1.05753 0.960391 1.1167 0.936482 1.1782 0.936873ZM10.8364 9.04794H1.1782C1.1158 9.04755 1.05609 9.0225 1.01211 8.97824C0.968122 8.93398 0.943434 8.87411 0.943435 8.81172V2.50441L5.1765 6.73966C5.2853 6.84849 5.41448 6.93483 5.55665 6.99373C5.69883 7.05263 5.85121 7.08295 6.0051 7.08295C6.159 7.08295 6.31138 7.05263 6.45356 6.99373C6.59573 6.93483 6.72491 6.84849 6.83371 6.73966L11.0675 2.50513V8.81099C11.0679 8.87294 11.0439 8.93256 11.0006 8.97692C10.9573 9.02127 10.8983 9.04679 10.8364 9.04794Z"
                            fill="#9BAEBC"
                          />
                        </svg>
                      </figure>
                      <span>{appointmentEditContact.email}</span>
                    </a>
                  </li>
                  }
                </ul>
              </div>
            </div>
          )}
          <button
            className="topCross setApp"
            onClick={() => props.setEditAppointment(false)}
          >
            <img src={cross} alt="" />
          </button>
        </div>
        <div className="editModalDetails">
          { isLoader ? <Loader/> : ""}
          <form>
            <div
              className={
                isEditAgenda
                  ? `formControl agendaEdit d-flex isEditing ${errorEdit.agenda && errorEdit.agenda.trim() !== "" ? "error" : ""}`
                  : `formControl agendaEdit d-flex  ${errorEdit.agenda && errorEdit.agenda.trim() !== "" ? "error" : ""}`
              }
            >
              <input
                type="text"
                className="cmnFieldStyle editInput"
                disabled={!isEditAgenda}
                defaultValue={props.appointmentEdit.agenda}
                ref={agendaRef}
              />
              <div className="editInputOpts d-flex">
                {!isEditAgenda && (
                  <button
                    className="inlinle-btn editAgenda"
                    onClick={() => setIsEditAgenda(true)}
                  >
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6008 2.51841L11.4808 0.397412C11.2263 0.142952 10.8812 0 10.5213 0C10.1614 0 9.81626 0.142952 9.56178 0.397412L0.674779 9.28241C0.589782 9.36744 0.535287 9.47819 0.519779 9.59741L0.00577881 13.3784C-0.00650688 13.4621 0.000857845 13.5475 0.02729 13.6279C0.0537221 13.7082 0.098496 13.7813 0.158067 13.8414C0.217639 13.9014 0.290372 13.9468 0.370509 13.9739C0.450647 14.001 0.535989 14.009 0.619779 13.9974L4.40078 13.4784C4.51894 13.4623 4.62854 13.4078 4.71278 13.3234L13.6008 4.43641C13.8552 4.18193 13.9982 3.83679 13.9982 3.47691C13.9982 3.11703 13.8552 2.7719 13.6008 2.51741V2.51841ZM4.07178 12.4184L1.17978 12.8114L1.57278 9.91941L7.87278 3.61941L10.3728 6.11941L4.07178 12.4184ZM12.8288 3.66141L11.1448 5.35341L8.64478 2.85341L10.3328 1.16541C10.3827 1.11558 10.4503 1.08759 10.5208 1.08759C10.5913 1.08759 10.6589 1.11558 10.7088 1.16541L12.8318 3.28841C12.8816 3.33829 12.9096 3.40591 12.9096 3.47641C12.9096 3.54692 12.8816 3.61453 12.8318 3.66441L12.8288 3.66141Z"
                        fill="#9BAEBC"
                      />
                    </svg>
                  </button>
                )}
                {isEditAgenda && (
                  <>
                    <button
                      className="inlinle-btn confirmEdit"
                      onClick={confirmAgenda}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 21L17.5 25.5L28 15"
                          stroke="#00CC52"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                    <button
                      className="inlinle-btn cancelEdit"
                      onClick={resetAgenda}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 26L26 14"
                          stroke="#ED707A"
                          strokeWidth="2"
                        />
                        <path
                          d="M26 26L14 14"
                          stroke="#ED707A"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {errorEdit.agenda && errorEdit.agenda.trim() !== "" ? (
                <p className="errorMsg">{errorEdit.agenda}</p>
              ) : (
                ""
              )}
            </div>
            <div className="formControl d-flex">
                    <ul>
                {editedTagNames && editedTagNames.map((appTags, i) => (
                      <li className="indTags" key={i}>
                        <span className="labelSelected">{appTags.name}</span>
                        <span className="closeTag" onClick={() => selectTag(appTags, false)}>
                          <img src={crossWhite} alt="" />
                        </span>
                      </li>
                ))}
                </ul>
              <span className={
                      tagListToggle
                          ? "tagSection d-flex f-align-center f-justify-center active"
                          : "tagSection d-flex f-align-center f-justify-center"
                    }
                    onClick={(e) => toggleContactListFn(e)}>
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.3953 1.10391C15.7136 1.10391 16.0188 1.23033 16.2438 1.45538C16.4689 1.68042 16.5953 1.98565 16.5953 2.30391V7.10391L8.56231 15.1369C8.35825 15.3429 8.08652 15.468 7.79736 15.4891C7.5082 15.5103 7.22116 15.426 6.98931 15.2519L15.3953 6.80391V1.10391ZM8.79531 0.503906H13.5953C13.9136 0.503906 14.2188 0.630334 14.4438 0.855378C14.6689 1.08042 14.7953 1.38565 14.7953 1.70391V6.50391L6.76131 14.5399C6.64983 14.6518 6.51736 14.7405 6.3715 14.8011C6.22563 14.8617 6.06925 14.8929 5.91131 14.8929C5.75338 14.8929 5.59699 14.8617 5.45113 14.8011C5.30527 14.7405 5.1728 14.6518 5.06131 14.5399L0.754313 10.2359C0.642442 10.1244 0.553677 9.99195 0.493111 9.84609C0.432544 9.70023 0.401367 9.54384 0.401367 9.38591C0.401367 9.22797 0.432544 9.07159 0.493111 8.92572C0.553677 8.77986 0.642442 8.64739 0.754313 8.53591L8.79131 0.503906H8.79531ZM11.4953 4.70391C11.3173 4.70391 11.1433 4.65112 10.9953 4.55223C10.8473 4.45334 10.7319 4.31277 10.6638 4.14832C10.5957 3.98387 10.5779 3.80291 10.6126 3.62832C10.6473 3.45374 10.7331 3.29338 10.8589 3.16751C10.9848 3.04164 11.1452 2.95593 11.3197 2.9212C11.4943 2.88647 11.6753 2.9043 11.8397 2.97241C12.0042 3.04053 12.1447 3.15589 12.2436 3.30389C12.3425 3.4519 12.3953 3.6259 12.3953 3.80391C12.3953 3.9221 12.372 4.03913 12.3268 4.14832C12.2816 4.25751 12.2153 4.35673 12.1317 4.4403C12.0481 4.52388 11.9489 4.59017 11.8397 4.6354C11.7305 4.68063 11.6135 4.70391 11.4953 4.70391Z"
                    fill="#9BAEBC"
                  />
                </svg>
              </span>
              <TagList tagListToggle={tagListToggle} selectTag={selectTag}/>
            </div>
            {!shouldReschedule && (
              <>
                <div className="formControl d-flex">
                  <label className="labelAppointment">Date:</label>
                  <span className="textAppointment">
                    {/* {props?.appointmentEdit.fromDateTime} */}
                  {props.appointmentEdit?.fromDateTime && utils.convertUTCToTimezone(props.appointmentEdit?.fromDateTime.trim(), timezoneOffset).split(" ").splice(0,3).join(" ")}
                    {/* {props.appointmentEdit.date} */}
                  </span>
                  {(props.appointmentEdit.rescheduleCount && props.appointmentEdit.rescheduleCount > 0) ? (
                      <span className="rescheduleCount creatUserBtn">
                        {props.appointmentEdit.rescheduleCount} Time(s)
                        Rescheduled
                      </span>
                    ) : ""}
                    {console.log("props.appointmentEdit", props.appointmentEdit)}
                  <button
                    className="inlinle-btn rescheduleBtn"
                    onClick={(e) => initiateReschedule(e)}
                  >
                    <figure>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.83478 7.05008e-06C7.80595 -0.000162352 8.76554 0.210913 9.64701 0.618595C10.5285 1.02628 11.3107 1.62081 11.9395 2.36096L12.867 1.53838C12.9657 1.45211 13.0871 1.39603 13.2167 1.37684C13.3464 1.35765 13.4788 1.37615 13.5982 1.43013C13.7177 1.48412 13.819 1.57132 13.8903 1.68133C13.9615 1.79134 13.9996 1.91951 14 2.05057V4.77712C14 4.95808 13.9281 5.13163 13.8002 5.25959C13.6722 5.38755 13.4986 5.45944 13.3177 5.45944H10.2464C10.1078 5.45929 9.97254 5.41701 9.85856 5.33821C9.74457 5.25941 9.65725 5.14782 9.60816 5.01823C9.55908 4.88865 9.55055 4.7472 9.58372 4.61266C9.6169 4.47812 9.6902 4.35685 9.79389 4.26493L10.9223 3.25775C10.4189 2.66246 9.79175 2.18407 9.08457 1.85588C8.37739 1.52768 7.60717 1.35757 6.82754 1.3574C5.82674 1.35725 4.84515 1.6322 3.99005 2.15221C3.13495 2.67222 2.43924 3.41727 1.97896 4.30594C1.51867 5.19461 1.31152 6.19271 1.38014 7.19116C1.44876 8.1896 1.79051 9.14998 2.36804 9.96733C2.94558 10.7847 3.73668 11.4275 4.65488 11.8257C5.57308 12.2238 6.58305 12.3619 7.57442 12.2248C8.56579 12.0878 9.50042 11.6808 10.2761 11.0485C11.0519 10.4161 11.6389 9.58274 11.973 8.63936C12.033 8.46835 12.1584 8.32819 12.3218 8.2497C12.4851 8.17121 12.673 8.16083 12.844 8.22083C13.015 8.28083 13.1551 8.4063 13.2336 8.56964C13.3121 8.73299 13.3225 8.92082 13.2625 9.09182C12.8466 10.2728 12.114 11.3166 11.1446 12.109C10.1753 12.9014 9.00665 13.4119 7.7666 13.5847C6.52656 13.7574 5.26289 13.5857 4.11389 13.0884C2.96489 12.591 1.97483 11.7872 1.25207 10.7649C0.529302 9.74255 0.101682 8.54111 0.0160021 7.29202C-0.0696774 6.04294 0.189886 4.79435 0.766287 3.68291C1.34269 2.57146 2.21371 1.63999 3.28404 0.990414C4.35437 0.340842 5.58276 -0.00179223 6.83478 7.05008e-06Z"
                          fill="#9BAEBC"
                        />
                        <path
                          d="M4.27458 9.55574C4.42242 9.5558 4.56628 9.50785 4.68451 9.41909L7.41468 7.37124C7.49876 7.30783 7.56703 7.22581 7.61412 7.13162C7.66122 7.03742 7.68588 6.9336 7.68616 6.82828V4.0954C7.68616 3.91444 7.61427 3.74089 7.48631 3.61293C7.35835 3.48497 7.1848 3.41309 7.00384 3.41309C6.82288 3.41309 6.64933 3.48497 6.52137 3.61293C6.39341 3.74089 6.32152 3.91444 6.32152 4.0954V6.48441L3.86374 8.32685C3.74884 8.41271 3.66391 8.53259 3.62104 8.66947C3.57816 8.80635 3.57952 8.95327 3.62491 9.08933C3.6703 9.2254 3.75741 9.34371 3.87388 9.42743C3.99034 9.51116 4.13023 9.55606 4.27367 9.55574H4.27458Z"
                          fill="#9BAEBC"
                        />
                      </svg>
                    </figure>
                    <span>Reschedule</span>
                  </button>
                </div>
                    <br></br>
                    {/* {utils.dateConvertsation(props.appointmentEdit.date)} */}
                    {/* <br></br>
                    {utils.timeConversion(props.appointmentEdit.date) + " " + utils.dateConversion(props.appointmentEdit.fromTime)}
                    {moment(props.appointmentEdit.date).format("YYYY-MM-DD") + " " + moment(props.appointmentEdit.fromTime, "hh:ss A").format("hh:mm:ss")}
                    <br></br>
                    {utils.timeConversion(props.appointmentEdit.date) + " " + utils.dateConversion(props.appointmentEdit.toTime)} */}
                    
                <div className="formControl d-flex">
                  <label className="labelAppointment">Time:</label>
                  <span className="textAppointment">
                    {/* {props.appointmentEdit.date + " " + moment(props.appointmentEdit.fromTime, "hh:mm:ss").format("hh:mm:ss")} */}
                    {/* {props.appointmentEdit.fromDateTime.trim() + " " + props.appointmentEdit.toDateTime.trim()} */}
                    {/* {props.appointmentEdit.fromDateTime +"-" + props.appointmentEdit.toDateTime.trim()}<br></br> */}
                    {props.appointmentEdit?.fromDateTime && utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime.trim(), timezoneOffset).split(" ").splice(3,5).join(" ")} -{" "}
                    {props.appointmentEdit?.toDateTime && utils.convertUTCToTimezone(props.appointmentEdit.toDateTime.trim(), timezoneOffset).split(" ").splice(3, 5).join(" ")}
                  </span>
                </div>
                {/* {console.log("props.appointmentEdit", props.appointmentEdit.rescheduleCount)} */}
                {(props.appointmentEdit.rescheduleCount === undefined || props.appointmentEdit.rescheduleCount === 0) ? (
                    <div className="formControl d-flex">
                      <label className="labelAppointment">
                        Appointment set by:
                      </label>
                      <span className="textAppointment">
                        {props.appointmentEdit.createdBy}
                      </span>
                    </div>
                  ) : ""}
              </>
            )}
            {shouldReschedule && (
              <div className="rescheduleData">
                <header className="d-flex f-align-center f-justify-between">
                  <h5>Reschedule</h5>
                  <button
                    className="inlinle-btn confirmEdit"
                    onClick={(e) => rescheduleAppointment(e)}
                    disabled={rescheduleDisabled()}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 21L17.5 25.5L28 15"
                        stroke="#00CC52"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                  <button
                    className="inlinle-btn cancelEdit"
                    onClick={closeReschedule}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14 26L26 14" stroke="#ED707A" strokeWidth="2" />
                      <path d="M26 26L14 14" stroke="#ED707A" strokeWidth="2" />
                    </svg>
                  </button>
                </header>

                <div className="bodyReschedule">
                  <div className="cmnFormRow">
                    <div
                      className={
                        rescheduleErrors.date.trim() !== ""
                          ? "cmnFormCol error"
                          : "cmnFormCol"
                      }
                    >
                      {/* {props.appointmentEdit.date} */}
                      {/* <input value="2018-07-22" type="date"/> */}
                      <div className="cmnFieldName">Choose a date</div>
                      <div className="cmnFormField">
                        {moment(utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime, timezoneOffset)).format("YYYY-MM-DD")}
                        {/* <input
                          className="cmnFieldStyle"
                          type="date"
                          placeholder="mm/dd/yyyy"
                          defaultValue={moment(utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime, timezoneOffset)).format("YYYY-MM-DD")}
                          // defaultValue={moment(props.appointmentEdit.date).format("YYYY-MM-DD") ? moment(props.appointment.date, "YYYY-MM-DD").format("YYYY-MM-DD"): moment(props.appointment.date, "MM/DD/YYYY").format("YYYY-MM-DD")}
                          min={calenderMinDate}
                          ref={reschDate}
                          onChange={getEditedDate}
                          // value={moment(props.appointmentEdit.date, "MM/DD/YYYY").format("YYYY-MM-DD")}
                        />
                        {console.log('llllllll', date)} */}
                        <DatePicker 
                            className="cmnFieldStyle"
                            selected={date === undefined ? new Date(moment(utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime, timezoneOffset)).format("YYYY-MM-DD")) : date}
                            format="dd/MM/yyyy"
                            dateFormat="dd/MM/yyyy"
                            placeholder="mm/dd/yyyy"  
                            minDate={new Date(calenderMinDate)}
                            onChange={(e) => setStartDate(e)} 
                        />
                      </div>
                      {rescheduleErrors.date.trim() !== "" ? (
                        <p className="errorMsg">{rescheduleErrors.date}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={
                        rescheduleErrors.fromTime.trim() !== ""
                          ? "cmnFormColquater error"
                          : "cmnFormColquater"
                      }
                    >
                      <div className="cmnFieldName">From</div>
                      {/* <p>{moment(utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime, timezoneOffset)).format('LT')}</p> */}
                      {/* <input value={moment(utils.convertUTCToTimezone(props.appointmentEdit.fromDateTime, timezoneOffset)).format('LT')} /> */}
                      <div className="cmnFormField" id="fromEditTime">
                        <TimePicker
                          showSecond={false}
                          // defaultValue={moment(props.appointmentEdit.fromTime, "LT")}
                          defaultValue={fromDateTime}
                          className="cmnFieldStyle"
                          popupClassName="timepickerPopup"
                          onChange={fromScheduleDateEdit}
                          getPopupContainer={node => {
                            return document.getElementById("fromEditTime");
                          }}
                          format={"hh:mm a"}
                          use12Hours
                          inputReadOnly
                          allowEmpty={false}
                        />
                        
                        {/* <input
                      className="cmnFieldStyle"
                      type="time"
                      placeholder="Select"
                      onChange={(e) => appointmentDataAdd(e, "fromTime")}
                    /> */}
                      </div>
                      {rescheduleErrors.fromTime.trim() !== "" ? (
                        <p className="errorMsg">{rescheduleErrors.fromTime}</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={
                        rescheduleErrors.toTime.trim() !== ""
                          ? "cmnFormColquater error"
                          : "cmnFormColquater"
                      }
                    >
                      <div className="cmnFieldName">To</div>
                      
                      {utils.convertUTCToTimezone(props.appointmentEdit.toDateTime, timezoneOffset).split(" ").splice(3,4).join(" ").toString()}
                      {/* {moment(props.appointmentEdit?.toTime, "LT")} */}
                      <div className="cmnFormField" id="toEditTime">
                        <TimePicker
                          showSecond={false}
                          // defaultValue={moment(props.appointmentEdit.toTime, "LT")}
                          defaultValue={toDateTime}
                          className="cmnFieldStyle"
                          popupClassName="timepickerPopup"
                          onChange={toScheduleDateEdit}
                          getPopupContainer={node => {
                            return document.getElementById("toEditTime");
                          }}
                          format={"hh:mm a"}
                          use12Hours
                          inputReadOnly
                          allowEmpty={false}
                        />
                        {/* <input
                      className="cmnFieldStyle"
                      type="time"
                      placeholder="Select"
                      onChange={(e) => appointmentDataAdd(e, "toTime")}
                    /> */}
                      </div>
                      {rescheduleErrors.toTime.trim() !== "" ? (
                        <p className="errorMsg">{rescheduleErrors.toTime}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={rescheduleErrors.note.trim() !== "" ? "cmnFormRow error" : "cmnFormRow"}>
                    <textarea
                      placeholder="Note *"
                      ref={noteReschedule}
                      className="cmnFieldStyle"
                      required={true}
                      onChange={addNoteForEdit}
                    ></textarea>
                    {rescheduleErrors.note.trim() !== "" ? (
                      <p className="errorMsg">{rescheduleErrors.note}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            )}
            {
              props.appointmentEdit.rescheduleCount > 0 ?
                  <div className="formControl d-flex">
                <label className="labelAppointment">Rescheduled by:</label>
                <span className="textAppointment">
                {props.appointmentEdit.history &&
                    props.appointmentEdit.history[
                    props.appointmentEdit.history.length - 1
                        ] &&
                    props.appointmentEdit.history[
                    props.appointmentEdit.history.length - 1
                        ].rescheduledByName
                }
              </span>
              </div> :
                  <div className="formControl d-flex">
                    <label className="labelAppointment">Scheduled by:</label>
                    <span className="textAppointment">
                    { props.appointmentEdit.createdBy}
              </span>
                  </div>
            }
            <footer className="formControl d-flex f-align-center f-justify-center">
              <button
                className={
                  shouldCancel ? "btn btnCancel active" : "btn btnCancel"
                }
                onClick={initiateCancellation}
                disabled={shouldReschedule}
              >
                {!shouldCancel ? "Cancel Appointment" : "Abort Cancellation"}
              </button>
              <button
                className="btn btnApprove"
                onClick={(e) => completeAppointment(e)}
                disabled={shouldReschedule}
              >
                Complete Appointment
              </button>

              {shouldCancel && (
                <div className={canceledError.note ? "cancelNote error" : "cancelNote"}>
                  <input
                    type="text"
                    className="cmnFieldStyle"
                    placeholder="Write your note here ..."
                    onChange={(e) => setCancelled({note: e.target.value})}
                    ref={cancelNote}
                  />
                  
                  {canceledError.note.trim() !== "" ? (
                    <p className="errorMsg">{canceledError.note}</p>
                  ) : (
                    ""
                  )}

                  <div className="confirmCancellation">
                    <button
                      className="btn btnAbortCancellation"
                      onClick={initiateCancellation}
                    >
                      No
                    </button>
                    <button
                      className="btn btnCancelAppointment btn-dBlue"
                      onClick={(e) => completeCancellation(e)}
                      disabled={canceled.note.trim() === ""}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentEditModal;