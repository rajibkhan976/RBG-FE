import { useState, useRef, useEffect } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import cross from "../../../../../assets/images/cross.svg";
import appointmentImg from "../../../../../assets/images/appointments.svg";
import tags from "../../../../../assets/images/tags.svg";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import crossWhite from "../../../../../assets/images/cross_w.svg";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../../Loader";
import Scrollbars from "react-custom-scrollbars-2";

import { TagServices } from "../../../../../services/setup/tagServices";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../../../actions/types";
import { AppointmentServices } from "../../../../../services/appointment/appointment";
import TagList from "../../../../appointment/TagList";
import { utils } from "../../../../../helpers"

const AddAppointmentModal = (props) => {
  const [date, setDate] = useState();
  const toggleTags = useRef(null);
  const [isLoader, setIsLoader] = useState(false);
  const [tagListToggle, setTagListToggle] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    agenda: "",
    date: "",
    fromTime: "",
    fromDateTime: "",
    toTime: "",
    toDateTime: "",
    tags: [],
    tagsDatas: [],
    contactId: props.contactId,
  });
  const [validationErrors, setValidationErrors] = useState({
    agenda: "",
    date: "",
    fromTime: "",
    toTime: "",
  });
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const todayDate = moment();
  const [calenderMinDate, setCalenderMinDate] = useState();


  // const appoPageList = (e) => {
  //   // console.log("appoPageList", e.target.scrollTop, (e.target.scrollHeight * 0.30));
  //   if(!isScroll){
  //     if(e.target.scrollTop > (e.target.scrollHeight * 0.30)) {
  //       fetchTags(tagsPage + 1)
  //       setTagsPage(tagsPage + 1)
  //     }
  //   }
  // }

  const toggleContactListFn = (e) => {
    e.preventDefault();

    //setTagTop(toggleTags.current.parentNode.offsetTop)
    setTagListToggle(!tagListToggle);
    //setSearchedTag("")
  };
  const checkThisTag = (tag, mode) => {
    let copySelTags = [...appointmentData.tags];

    if (mode) {
      copySelTags.push(tag);
    } else {
      copySelTags = copySelTags.filter((addedTag) => addedTag._id != tag._id);
    }

    setAppointmentData({ ...appointmentData, tags: copySelTags });
    setTagListToggle(false);
    //setSearchedTag("")
  };
  const timezoneOffset = useSelector((state) => (state.user?.data.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null);
  // useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:"UTC-06"); 
  useEffect(()=>{
    console.log("Add appointment create", timezoneOffset);
  })

  useEffect(() => {
    let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
    let formatedDateTime = moment(timezoneDateTime).format("YYYY-MM-DD HH:mm:ss").split(" ")[0];
    setCalenderMinDate(formatedDateTime);
  }, []);

  // validation on submission of form
  const validateAppointment = (e) => {
    let validErrors = { ...validationErrors };

    if (appointmentData.agenda.trim() === "") {
      validErrors.agenda = "Please fill up Agenda for the appointment";
    }

    if (appointmentData.date.trim() === "") {
      validErrors.date = "Invalid date of appointment.";
    }

    if (
      appointmentData.fromTime.trim() === ""
      // ||
      // parseFloat(appointmentData.fromTime.split(" ")[0].replace(":", "")) >=
      //   parseFloat(appointmentData.toTime.split(" ")[0].replace(":", ""))
    ) {
      validErrors.fromTime = "Time cannot be empty.";
    }

    if (
      appointmentData.toTime.trim() === ""
      // ||
      // parseFloat(appointmentData.toTime.split(" ")[0].replace(":", "")) <=
      //   parseFloat(appointmentData.fromTime.split(" ")[0].replace(":", ""))
    ) {
      validErrors.toTime = "Time cannot be empty.";
    }
    if (
      appointmentData.agenda.trim() !== "" &&
      appointmentData.date.trim() !== "" &&
      appointmentData.fromTime.trim() !== "" &&
      appointmentData.toTime.trim() !== ""
    ) {
      validErrors.agenda = "";
      validErrors.date = "";
      validErrors.fromTime = "";
      validErrors.toTime = "";

      return true;
    }

    setValidationErrors(validErrors);
  };

  

  // Add input values to new appointment
  const appointmentDataAdd = (e, type) => {
    let validErrors = { ...validationErrors };
    let isDisabled = false;
    if (e.target.value.trim() !== "") {
      if (type == "date") {
        const dateDiff = utils.dateDiff(e.target.value);
        if (dateDiff.difference <= 0) {
          console.log("Today")
          const fromTime = appointmentData.fromTime;
          if (fromTime) {
            console.log("From Time")
            const appDateTime = moment(`${e.target.value.toString()} ${appointmentData.fromTime.toString()}`).format("YYYY-MM-DD h:mm a");
            const diffFromToday = todayDate.diff(appDateTime, "minutes");
            console.log(diffFromToday);
            if (diffFromToday > 0) {
              console.log("Invalid time")
              validErrors.fromTime = "Invalid from time";
              isDisabled = true;
            } else {
              validErrors.fromTime = "";
              isDisabled = false;
            }
          }
        } else {
          validErrors.fromTime = "";
          isDisabled = false;
          validErrors.date = "";
          // let newDateString = e.target.value.split("-")[1] + "/" + e.target.value.split("-")[2] + "/" + e.target.value.split("-")[0];
          let newDateString = e.target.value;
          setAppointmentData({ 
            ...appointmentData, 
            date: newDateString,
            // fromDateTime: appointmentData.fromTime,
            // toDateTime: appointmentData.toTime
          });
        }
        // validErrors.fromTime = "";
        validErrors.date = "";
        isDisabled = false;
        let newDateString = e.target.value;
         
        setAppointmentData({ ...appointmentData, date: newDateString });
      }
      if (type == "agenda") {
        validErrors.agenda = "";
        setAppointmentData({ ...appointmentData, agenda: e.target.value });
      }
    } else {
      if (type == "agenda") {
        validErrors.agenda = "Please fill up Agenda for the appointment";
      }

      if (type == "date") {
        validErrors.date = "Invalid date of appointment.";
      }
    }

    setValidationErrors(validErrors);
    setIsDisabled(isDisabled);
  };

  const setStartDate = (val) => {
    console.log("date value:", val);
    const convertFromDateTime = utils.convertTimezoneToUTC(moment(val).format("YYYY-MM-DD")+ " " + utils.timeConversion(appointmentData?.fromTime), timezoneOffset);
    const convertToDateTime = utils.convertTimezoneToUTC(moment(val).format("YYYY-MM-DD")+ " " + utils.timeConversion(appointmentData?.toTime), timezoneOffset);
    console.log("convert from date time", convertFromDateTime);
    console.log("Convert to date time", convertToDateTime);
    let validErrors = {...validationErrors};
    let isDisabled = false;
    let formattedDate = `${val.getFullYear()}-${
        val.getMonth() + 1
      }-${val.getDate()}`;
    setDate(val);
    formattedDate = moment(formattedDate).format("YYYY-MM-DD");
    
    const dateDiff = utils.dateDiff(formattedDate);
    if (dateDiff.difference <= 0) {
      console.log("Today")
      const fromTime = appointmentData.fromTime;
      if (fromTime) {
        console.log("From Time")
        const appDateTime = moment(`${formattedDate.toString()} ${appointmentData.fromTime.toString()}`).format("YYYY-MM-DD h:mm a");
        const diffFromToday = todayDate.diff(appDateTime, "minutes");
        console.log(diffFromToday);
        if (diffFromToday > 0) {
          console.log("Invalid time")
          validErrors.fromTime = "Invalid from time";
          isDisabled = true;
        } else {
          validErrors.fromTime = "";
          isDisabled = false;
        }
      }
    } else {
      validErrors.fromTime = "";
      isDisabled = false;
      validErrors.date = "";
      // let newDateString = formattedDate.split("-")[1] + "/" + formattedDate.split("-")[2] + "/" + formattedDate.split("-")[0];
      let newDateString = formattedDate;
      setAppointmentData({ 
        ...appointmentData, 
        date: newDateString,
        fromDateTime: convertFromDateTime,
        toDateTime: convertToDateTime
      });
    }
    // validErrors.fromTime = "";
    validErrors.date = "";
    isDisabled = false;
    let newDateString = formattedDate;
      
    setAppointmentData({ 
      ...appointmentData, 
      date: newDateString,
      fromDateTime: convertFromDateTime,
      toDateTime: convertToDateTime,
    });
    setValidationErrors(validErrors);
    setIsDisabled(isDisabled);
    console.log("Appointment Data", appointmentData);
  }

  const fromDateAdd = (fromValue) => {
    console.log("From time::::::::::::::: ", fromValue.format("HH:mm:ss"));
    console.log("Local time============== ", moment().utc().format("YYYY-MM-DD HH:mm:ss"));
    const convertedChoosedTime = utils.convertTimezoneToUTC(utils.dateConversion(appointmentData.date) + " " + fromValue.format("HH:mm:ss"),timezoneOffset);
    const convertedLocalTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");

    const localTime = moment(convertedLocalTime, "YYYY-MM-DD HH:mm:ss");
    const choosedTime = moment(convertedChoosedTime, "YYYY-MM-DD HH:mm:ss");
    // console.log(fromValue && fromValue.format('h:mm a').toUpperCase());
    let validErrors = { ...validationErrors };
    let isDisabled = true;
    // console.log("App Date", appointmentData.date)
    // console.clear();

    // const appDateTime = moment(`${appointmentData.date.toString()} ${fromValue.format("h:mm a")}`).format("YYYY-MM-DD h:mm a");
    // const diffFromToday = todayDate.diff(appDateTime, "minutes");
    const diffFromToday = choosedTime.diff(localTime, "minutes");
    const fromTime = moment(`${appointmentData.date} ${fromValue.format("h:mm a")}`).format('MM/DD/YYYY h:mm a');
    const toTime = moment(`${appointmentData.date} ${appointmentData.toTime}`).format('MM/DD/YYYY h:mm a');
    console.log(";oooooooooooooooooooooooooooooooooooooooooooo", diffFromToday)
    if (fromValue && fromValue != null) {
      if (appointmentData.toTime.trim() === "") {
        validErrors.fromTime = "";
        isDisabled = false;
        //validErrors.toTime = "Invalid end time.";
        setAppointmentData({
          ...appointmentData,
          // fromTime: fromValue.format("h:mm a").toUpperCase(),
          fromTime: fromValue.format("h:mm a").toUpperCase(),
          fromDateTime:utils.convertTimezoneToUTC(utils.dateConversion(appointmentData.date) + " " + utils.timeConversion(fromValue.format("h:mm a").toUpperCase()), timezoneOffset).trim(),
        });
      } else {
        console.log(
          parseFloat(appointmentData.toTime.split(" ")[0].replace(":", "")),
          parseFloat(fromValue.format("h:mm a").split(" ")[0].replace(":", ""))
        );
        if (
          parseFloat(appointmentData.toTime.split(" ")[0].replace(":", "")) <=
          parseFloat(fromValue.format("h:mm a").split(" ")[0].replace(":", ""))
        ) {
          if (
            appointmentData.toTime.split(" ")[1] ===
            fromValue.format("h:mm a").split(" ")[1].toUpperCase()
          ) {
            //validErrors.fromTime = "Invalid start time.";
          } else {
            validErrors.fromTime = "";
            isDisabled = false;
          }
        } else {
          validErrors.fromTime = "";
          isDisabled = false;
        }
        setAppointmentData({
          ...appointmentData,
          fromTime: fromValue.format("h:mm a").toUpperCase(),
          fromDateTime: utils.convertTimezoneToUTC(utils.dateConversion(appointmentData.date) + " " + utils.timeConversion(fromValue.format("h:mm a").toUpperCase()), timezoneOffset).trim(),
        });
      }
      if (!appointmentData.date) {
        validErrors.date = "Please choose a date";
        isDisabled = true;
      } else if (diffFromToday < 2) {
        validErrors.fromTime = "Invalid from time";
        isDisabled = true;
      } else if (appointmentData.toTime && Math.sign(moment(fromTime).diff(toTime, "minutes")) > 0) {
        console.log("To Time is less than from");
        validErrors.fromTime = "To time cannot be less";
        isDisabled = true;
      } else {
        validErrors.fromTime = "";
        isDisabled = false;
      }
    }
    console.log("Is Disabled", isDisabled);
    setValidationErrors(validErrors);
    setIsDisabled(isDisabled);
  };

  const selectTag = (tag, mode) => {
    console.log(tag);
    let copySelTags = [...appointmentData.tagsDatas];
    let tagIds = [...appointmentData.tags];
    if (mode) {
      let searchTags = tagIds.filter((el) => el == tag._id);
      if (searchTags.length === 0) {
        copySelTags.push(tag);
        tagIds.push(tag._id);
      } else {
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: 'Tag already selected.',
          typeMessage: 'error'
        });
      }
    } else {
      copySelTags = copySelTags.filter((addedTag) => addedTag._id != tag._id);
      tagIds = tagIds.filter((addedTag) => addedTag != tag._id);
    }
    console.log(copySelTags, tagIds);
    setAppointmentData({
      ...appointmentData,
      tagsDatas: copySelTags,
      tags: tagIds,
    });
  };

  const toDateAdd = (toValue) => {
    // console.log(toValue && toValue.format('h:mm a'));
    let validErrors = { ...validationErrors };
    let isDisabled = false;
    // const appToDateTime = moment(`${appointmentData.date.toString()} ${moment(appointmentData.fromTime).format("h:mm a")}`).format("YYYY-MM-DD h:mm a");
    // const diffToFrom = moment(toValue).format("h:mm a").diff(appToDateTime, "minutes");
    // console.log("To Time Diff", diffToFrom);
    // console.clear();
    const toTime = moment(`${appointmentData.date} ${toValue.format("h:mm a")}`).format('MM/DD/YYYY h:mm a');
    const fromTime = moment(`${appointmentData.date} ${appointmentData.fromTime}`).format('MM/DD/YYYY h:mm a');
    // const diff = Math.sign(moment(toTime).diff(fromTime, "minutes"));
    // console.log("Fromtime < Totime", fromTime < toTime);
    if (toValue && toValue != null) {
      if (appointmentData.fromTime.trim() === "") {
        validErrors.toTime = "";
        isDisabled = false;
        //validErrors.fromTime = "Invalid start time.";
        setAppointmentData({
          ...appointmentData,
          // toTime: toValue.format("h:mm a").toUpperCase(),
          toTime: toValue.format("h:mm a").toUpperCase(),
          toDateTime: utils.convertTimezoneToUTC(utils.dateConversion(appointmentData.date) + " " + utils.timeConversion(toValue.format("h:mm a").toUpperCase()), timezoneOffset).trim()
        });
      } else {
        if (
          parseFloat(appointmentData.fromTime.split(" ")[0].replace(":", "")) >=
          parseFloat(toValue.format("h:mm a").split(" ")[0].replace(":", ""))
        ) {
          if (
            appointmentData.fromTime.split(" ")[1] ===
            toValue.format("h:mm a").split(" ")[1].toUpperCase()
          ) {
            //validErrors.toTime = "Invalid end time.";
          } else {
            validErrors.toTime = "";
            isDisabled = false;
          }
        } else {
          validErrors.toTime = "";
          isDisabled = false;
        }
        setAppointmentData({
          ...appointmentData,
          // toTime: toValue.format("h:mm a").toUpperCase(),
          toTime: toValue.format("h:mm a").toUpperCase(),
          toDateTime: utils.convertTimezoneToUTC(utils.dateConversion(appointmentData.date) + " " + utils.timeConversion(toValue.format("h:mm a").toUpperCase()), timezoneOffset).trim()
        });

      }
      console.clear();
      // const fromTime = moment(`${appointmentData.fromTime}`).format("hh:mm:ss");
      // const toTime = moment(`${appointmentData.toTime}`).format("h:m:s");
      console.log("I am here", moment(toTime).diff(fromTime, "minutes"));
      if (!appointmentData.date) {
        validErrors.date = "Please choose a date";
        isDisabled = true;
      } else if (fromTime && Math.sign(moment(toTime).diff(fromTime, "minutes")) < 0) {
        console.log("invalid")
        validErrors.toTime = "Invalid to time";
        isDisabled = true;
      } else {
        validErrors.toTime = "";
        // validErrors.fromTime = "";
        isDisabled = false;
      }
    } else {
      // validErrors.toTime = "Invalid end time.";
    }
    // parseInt(e.target.value.replace(":","")) <= parseInt(appointmentData.fromTime.replace(":",""))
    console.log("Is Disabled", isDisabled);
    setValidationErrors(validErrors);
    setIsDisabled(isDisabled);
    console.log("Appointment to date", appointmentData);
  };

  // on valid submission, send appointment to parent
  const submitAppointmentForm = async (e) => {
    e.preventDefault();
    // console.clear()
    let valid = validateAppointment();
    // console.log("Appointment date and time before conversion",utils.dateConversion(appointmentData.date) + " " + utils.timeConversion(appointmentData.fromTime));

    // let conversionFrom = utils.convertTimezoneToUTC(utils.dateConversion(appointmentData.date) + " " + utils.timeConversion(appointmentData.fromTime), timezoneOffset);
    // let conversionTo = utils.convertTimezoneToUTC(utils.dateConversion(appointmentData.date) + " " + utils.timeConversion(appointmentData.toTime), timezoneOffset);

    // console.log("From time conversion", conversionFrom);
    // console.log("To time conversion", conversionTo);
    // fromValue.format("h:mm a").toUpperCase()
    // setAppointmentData({
    //   ...appointmentData,
    //   fromDateTime: conversionFrom,
    //   toDateTime: conversionTo
    // })
    console.log("Appointment Date", appointmentData);
    if (valid && validationErrors.fromTime === "") {
      setIsLoader(true);
      try {
        let newAppointment = await AppointmentServices.saveAppointment(appointmentData);
        // let newAppointment;
        console.log('Appointment date', appointmentData)
        if (newAppointment) {
          newAppointment['tagNames'] = appointmentData.tagsDatas;
          console.log("newAppointment::::::", newAppointment);
          let updatedAppointments = [newAppointment, ...props.appointments];
          props.setAppointments(updatedAppointments);
          props.setAppointmentCreated("success");
          props.closeModal(false);
        }
      } catch (error) {
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error.message,
          typeMessage: "error",
        });
      } finally {
        setIsLoader(false);
      }
    }
  };

  return (
    <div className="modalCreateAppointment modalBackdrop">
      <div class="modalBackdropBg" onClick={() => props.closeModal(false)}></div>
      <div className="slickModalBody ">
        <div className="slickModalHeader">
          <h3>Set an Appointment</h3>
          <button
            className="topCross"
            onClick={() => props.closeModal(false)}
          >
            <img src={cross} alt="" />
          </button>
        </div>
        <div className="modalForm auto">

          <form
            method="post"
            className="dsiplay"
            onSubmit={(e) => submitAppointmentForm(e)}
          >
            {isLoader && <Loader />}
            {/* <div className="innerModalHeader">
              <div className="circleForIcon">
                <img src={appointmentImg} alt="" />
              </div>
              <h3>Set an Appointment</h3>
              <p>Please enter below information to set an appointment</p>
            </div> */}

            <div className="innerAppointmentModalBody">
              <div
                className={
                  validationErrors.agenda.trim() !== ""
                    ? "cmnFormRow error"
                    : "cmnFormRow "
                }
              >
                <div className="cmnFieldName">Agenda</div>
                <div className="cmnFormField clearfix">
                  <span className="inputTagArea">
                    <input
                      className="cmnFieldStyle createAppointment"
                      type="text"
                      placeholder="Eg. Martial Art Course Demo"
                      onChange={(e) => appointmentDataAdd(e, "agenda")}
                    />
                    <span
                      className={
                        tagListToggle
                          ? "tagSection d-flex f-align-center f-justify-center active"
                          : "tagSection d-flex f-align-center f-justify-center"
                      }
                      onClick={(e) => toggleContactListFn(e)}
                      ref={toggleTags}
                    >
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
                  </span>
                  {appointmentData.tagsDatas.length > 0 &&
                    appointmentData.tagsDatas.map((tag, i) => (
                      <span className="indTags" key={i}>
                        <span className="labelSelected">{tag.name}</span>
                        <span
                          className="closeTag"
                          onClick={() => checkThisTag(tag, false)}
                        >
                          <img src={crossWhite} alt="" />
                        </span>
                      </span>
                    ))}
                  {validationErrors.agenda.trim() !== "" ? (
                    <p className="errorMsg">{validationErrors.agenda}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="cmnFormRow">
                <div
                  className={
                    validationErrors.date.trim() !== ""
                      ? "cmnFormCol error"
                      : "cmnFormCol"
                  }
                >
                  <div className="cmnFieldName">Choose a date</div>
                  <div className="cmnFormField">
                    {/* <input
                      className="cmnFieldStyle"
                      type="date"
                      placeholder="mm/dd/yyyy"
                      min={calenderMinDate}
                      onChange={(e) => appointmentDataAdd(e, "date")}
                    /> */}
                    <DatePicker 
                        className="cmnFieldStyle"
                        selected={date}
                        format="dd/MM/yyyy"
                        dateFormat="dd/MM/yyyy"
                        placeholder="mm/dd/yyyy"  
                        minDate={new Date(calenderMinDate)}
                        onChange={(e) => setStartDate(e)} 
                    />
                  </div>
                  {validationErrors.date.trim() !== "" ? (
                    <p className="errorMsg">{validationErrors.date}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    validationErrors.fromTime.trim() !== ""
                      ? "cmnFormColquater error"
                      : "cmnFormColquater"
                  }
                >
                  <div className="cmnFieldName">From</div>
                  <div className="cmnFormField">
                    <TimePicker
                      showSecond={false}
                      defaultValue={null}
                      className="cmnFieldStyle"
                      popupClassName="timepickerPopup"
                      onChange={fromDateAdd}
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
                  {validationErrors.fromTime.trim() !== "" ? (
                    <p className="errorMsg">{validationErrors.fromTime}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    validationErrors.toTime.trim() !== ""
                      ? "cmnFormColquater error"
                      : "cmnFormColquater"
                  }
                >
                  <div className="cmnFieldName">To</div>
                  <div className="cmnFormField">
                    <TimePicker
                      showSecond={false}
                      defaultValue={null}
                      className="cmnFieldStyle"
                      popupClassName="timepickerPopup"
                      onChange={toDateAdd}
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
                  {validationErrors.toTime.trim() !== "" ? (
                    <p className="errorMsg">{validationErrors.toTime}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="modalbtnHolder w-100">
                <button className="saveNnewBtn" type="submit" disabled={isDisabled}>
                  Set Appointment <img src={arrow_forward} alt="" />
                </button>
              </div>
            </div>
          </form>

          {/* {toggleTagSuccess.status && (
              <>
                <div className="innerModalHeader appSuccess">
                  <div className="circleForIcon">
                    <img src={successApp} alt="" />
                  </div>
                  <h3 className="appSuccessH">Great</h3>
                  <p className="appSuccessP">
                    Appointment created successfully
                  </p>
                </div>
              </>
            )} */}
        </div>
      </div>
      <TagList tagListToggle={tagListToggle} selectTag={selectTag} />
    </div>
  );
};

export default AddAppointmentModal;
