import { useState, useRef, useEffect } from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import cross from "../../../../../assets/images/cross.svg";
import appointmentImg from "../../../../../assets/images/appointments.svg";
import tags from "../../../../../assets/images/tags.svg";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import crossWhite from "../../../../../assets/images/cross_w.svg";

import Loader from "../../../Loader";
import Scrollbars from "react-custom-scrollbars-2";

import { TagServices } from "../../../../../services/setup/tagServices";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../../../actions/types";
import { AppointmentServices } from "../../../../../services/appointment/appointment";
import TagList from "../../../../appointment/TagList";

const AddAppointmentModal = (props) => {
  const toggleTags = useRef(null);
  const [isLoader, setIsLoader] = useState(false);
  const [tagListToggle, setTagListToggle] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    agenda: "",
    date: "",
    fromTime: "",
    toTime: "",
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

  // on valid submission, send appointment to parent
  const submitAppointmentForm = async (e) => {
    e.preventDefault();
    let valid = validateAppointment();
    if (valid) {
      setIsLoader(true);
      try {
        let newAppointment = await AppointmentServices.saveAppointment(
          appointmentData
        );
        console.log('asdsa', appointmentData)
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

  // Add input values to new appointment
  const appointmentDataAdd = (e, type) => {
    let validErrors = { ...validationErrors };

    if (e.target.value.trim() !== "") {
      if (type == "date") {
        if (new Date(e.target.value) <= new Date()) {
          validErrors.date = "Invalid date of appointment.";
        } else {
          validErrors.date = "";
          let newDateString =
            e.target.value.split("-")[1] +
            "/" +
            e.target.value.split("-")[2] +
            "/" +
            e.target.value.split("-")[0];
          setAppointmentData({ ...appointmentData, date: newDateString });
        }
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
  };

  const fromDateAdd = (fromValue) => {
    // console.log(fromValue && fromValue.format('h:mm a').toUpperCase());
    let validErrors = { ...validationErrors };

    if (fromValue && fromValue != null) {
      if (appointmentData.toTime.trim() === "") {
        validErrors.fromTime = "";
        //validErrors.toTime = "Invalid end time.";
        setAppointmentData({
          ...appointmentData,
          fromTime: fromValue.format("h:mm a").toUpperCase(),
        });
      } else {
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
          }
        } else {
          validErrors.fromTime = "";
        }
        setAppointmentData({
          ...appointmentData,
          fromTime: fromValue.format("h:mm a").toUpperCase(),
        });
      }
    } else {
      //validErrors.fromTime = "Invalid start time.";
    }
    // parseInt(e.target.value.replace(":","")) >= parseInt(appointmentData.toTime.replace(":",""))
    setValidationErrors(validErrors);
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

    if (toValue && toValue != null) {
      if (appointmentData.fromTime.trim() === "") {
        validErrors.toTime = "";
        //validErrors.fromTime = "Invalid start time.";
        setAppointmentData({
          ...appointmentData,
          toTime: toValue.format("h:mm a").toUpperCase(),
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
           // validErrors.toTime = "Invalid end time.";
          } else {
            validErrors.toTime = "";
          }
        } else {
          validErrors.toTime = "";
        }
        setAppointmentData({
          ...appointmentData,
          toTime: toValue.format("h:mm a").toUpperCase(),
        });
      }
    } else {
      //validErrors.toTime = "Invalid end time.";
    }
    // parseInt(e.target.value.replace(":","")) <= parseInt(appointmentData.fromTime.replace(":",""))
    setValidationErrors(validErrors);
  };

  return (
    <div className="modalCreateAppointment modalBackdrop">
      <div className="slickModalBody setAppointment">
        <div className="modalForm appointmentForm setappointment">
          <div className="slickModalHeader appointmentModalHeads">
            <button
              className="topCross setApp"
              onClick={() => props.closeModal(false)}
            >
              <img src={cross} alt="" />
            </button>
          </div>
          <form
            method="post"
            className="dsiplay"
            onSubmit={(e) => submitAppointmentForm(e)}
          >
            {isLoader && <Loader />}
            <div className="innerModalHeader">
              <div className="circleForIcon">
                <img src={appointmentImg} alt="" />
              </div>
              <h3>Set an Appointment</h3>
              <p>Please enter below information to set an appointment</p>
            </div>

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
                    <input
                      className="cmnFieldStyle"
                      type="date"
                      placeholder="mm/dd/yyyy"
                      min={new Date(Date.now() + ( 3600 * 1000 * 24)).toISOString().split("T")[0]}
                      onChange={(e) => appointmentDataAdd(e, "date")}
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
                <button className="saveNnewBtn" type="submit">
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
