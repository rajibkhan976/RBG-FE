import React, { useEffect, useState } from "react";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import crossTop from "../../../assets/images/cross.svg";
import modalholidayIcon from "../../../assets/images/modalholidayIcon.svg";

import { GymDetailsServices } from "../../../services/gymDetails/GymDetailsServices";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../actions/types";

const AddHolidayModal = (props) => {

  const [option, setOption] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalPopMsgerror1, setModalPopMsgerror1] = useState(false);
  const [modalPopMsgerror2, setModalPopMsgerror2] = useState(false);
  const [modalPopMsgerror3, setModalPopMsgerror3] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();
  const [modalPopMsgsuccess, setModalPopMsgsuccess] = useState(false);
  const [holiday, setHoliday] = useState(props.holiday);
  const [fromDateHoliday, setFromDateHoliday] = useState('');
  const [toDateHoliday, setToDateHoliday]= useState('');
  // const [holidayStart , setHolidayStart] = useState(props.holiday.fromDate);
  // const [holidayEnd , setHolidayEnd] = useState(props.holiday.toDate);
  // const [holidayId, setHolidayId] = useState(props.holiday._id);
  const [editHoliday, setEditHoliday] = useState(props.editHoliday);
  const [editHolidayFrom, setEditHolidayFrom] = useState('');
  const [editHolidayTo, setEditHolidayTo] = useState('');
  const [loader, setLoader] = useState(false);
  console.log("Edit status=== " + editHoliday);
  // if (!editHoliday) {
  //   console.log("Holiday reset===");
  //   setHoliday("");
  //   setHolidayStart("");
  //   setHolidayEnd("");
  //   setHolidayId("");
  // }

  const holidayhandler = (e) => {
    setHoliday({
      ...holiday,
      name: e.target.value
    });
  };
  const [dateStatus, setDatastatus] = useState(false);
  const timezoneOffset = useSelector((state) => (state?.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset : null)
  useEffect(() => {
    console.log("gym add time zone", timezoneOffset);
  }, [timezoneOffset]);

  const holidayStarthandler = (e) => {
    console.log("From holiday", utils.convertTimezoneToUTC(e.target.value + " " + "00:00:01", timezoneOffset))

    setHoliday({
      ...holiday,
      fromDate: e.target.value,
      toDate: e.target.value,
      // fromDate: utils.convertTimezoneToUTC(e.target.value + " " + "00:00:01", timezoneOffset).trim(),
      // toDate: utils.convertTimezoneToUTC(e.target.value + " " + "00:00:01", timezoneOffset).trim(),
    });
    console.log(holiday);
  };
  const holidayEndhandler = (e) => {
    // console.log("To holiday", utils.convertTimezoneToUTC(e.target.value + " " + "00:00:01", timezoneOffset))
    setHoliday({
      ...holiday,
      toDate: e.target.value,
      // toDate: utils.convertTimezoneToUTC(e.target.value + " " + "00:00:01", timezoneOffset).trim()
    });
    console.log(holiday);
  };
  const addfromDate = new Date(holiday.fromDate);
  const addtoDate = new Date(holiday.toDate);
  
  const holidayDuration = ((addtoDate - addfromDate) / (1000 * 3600 * 24)) + 1;
  console.log("holidayDuration::::::::::", holiday?.fromDate, holiday?.toDate, holidayDuration)


  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, 5000);
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, 5000);
  }, [errorMsg, successMsg]);
  


  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    // console.log("form date", utils.convertTimezoneToUTC(holiday.fromDate + " " +"00:00:01", timezoneOffset));
    
    let fromDate = new Date(holiday.fromDate);
    let ftoDate = new Date(holiday.toDate);
    const dayNow = new Date();
    console.log("Holiday payload", holiday);

    if (holiday.name != "" && holiday.fromDate != undefined && holiday.toDate != undefined && holiday.fromDate != "" && holiday.toDate != "") {
      console.log("I am in parent if = ", typeof (holiday.fromDate));
      if (Math.ceil(ftoDate - fromDate) < 0) {
        setErrorMsg("Please choose End-Date on or after Start-Date");
      } else if (Math.ceil(fromDate - dayNow) < 0) {
        setErrorMsg("Please choose a Holiday after today");
      } else {
        //console.log("Holiday Obj", holiday);
        createHoliday();
        // console.log("API calling ====================================================");
        setModalPopMsgsuccess(true);
        setTimeout(() => {
          props.closeAddHolidayModal();
        }, 1000);
      }
      setModalPopMsgerror1(false);
      setModalPopMsgerror2(false);
      setModalPopMsgerror3(false);
    }
    else {

      //setErrorMsg("Please fill up the fields properly!");
      if (holiday.name === "") {
        setModalPopMsgerror1(true);
      } else {
        setModalPopMsgerror1(false);
      };
      if (holiday.fromDate === undefined || holiday.fromDate === "") {
        setModalPopMsgerror2(true);
      } else {
        setModalPopMsgerror2(false);
      };
      if (holiday.toDate === undefined || holiday.toDate === "") {
        setModalPopMsgerror3(true);
      } else {
        setModalPopMsgerror3(false);
      };
    };
    console.log(holiday.name, ",,,,", holiday.fromDate, ",,,,,,", holiday.toDate);
    console.log(holiday.name, "holiday.fromDate.typeOF", typeof (holiday.fromDate), "holiday.toDate.typeOF", typeof (holiday.toDate));
  };
  const handleStatusSubmitNew = (e) => {
    e.preventDefault();

    let fromDate = new Date(holiday.fromDate);
    let ftoDate = new Date(holiday.toDate);
    const dayNow = new Date();


    if (holiday.name != "" && holiday.fromDate != undefined && holiday.toDate != undefined && holiday.fromDate != "" && holiday.toDate != "") {
      //console.log("a",statusName,"b", statusDesc,"c", statusType);
      if (Math.ceil(ftoDate - fromDate) < 0) {
        setErrorMsg("Please choose End-Date on or after Start-Date");
      } else if (Math.ceil(fromDate - dayNow) < 0) {
        setErrorMsg("Please choose a Holiday after today");
      } else {

        setModalPopMsgsuccess(true);
        setEditHoliday(false);
        setHoliday({
          ...holiday,
          _id: "",
          name: "",
          fromDate: "",
          toDate: ""
        });
        createHoliday();
      }
      setModalPopMsgerror1(false);
      setModalPopMsgerror2(false);
      setModalPopMsgerror3(false);
    } else {
      if (holiday.name === "") {
        setModalPopMsgerror1(true);
      } else {
        setModalPopMsgerror1(false);
      };
      if (holiday.fromDate === undefined || holiday.fromDate === "") {
        setModalPopMsgerror2(true);
      } else {
        setModalPopMsgerror2(false);
      };
      if (holiday.toDate === undefined || holiday.toDate === "") {
        setModalPopMsgerror3(true);
      } else {
        setModalPopMsgerror3(false);
      };

      //setErrorMsg("Please fill up the fields properly!");
    };
    console.log(holiday.name, ",,,,", holiday.fromDate, ",,,,,,", holiday.toDate);
    console.log(holiday.name, "holiday.fromDate.typeOF", typeof (holiday.fromDate), "holiday.toDate.typeOF", typeof (holiday.toDate));
  };

  const createHoliday = async () => {
    // e.preventDefault();
    
    try {
      setLoader(true);
      
      if (editHoliday) {
        let convertFromDate;
        let convertToDate;
        if(holiday?.fromDate.toString().split(" ").length === 2){
          convertFromDate = utils.convertTimezoneToUTC(holiday?.fromDate.trim(), timezoneOffset);
        }else{
          convertFromDate = utils.convertTimezoneToUTC(holiday?.fromDate.trim() + " " + "00:00:01", timezoneOffset);
        }
        if(holiday?.toDate.toString().split(" ").length === 2){
          convertToDate = utils.convertTimezoneToUTC(holiday?.toDate.trim(), timezoneOffset);
        }else{
          convertToDate = utils.convertTimezoneToUTC(holiday?.toDate.trim() + " " + "00:00:01", timezoneOffset);
        }

        // let convertToDate = utils.convertTimezoneToUTC(holiday?.toDate.trim(), timezoneOffset);
        console.log("Conver from time and to date", holiday.fromDate);
        console.log("Convert to date", holiday.toDate);
        holiday['fromDate'] = convertFromDate.trim();
        holiday['toDate'] = convertToDate.trim();

        // setHoliday({
        //   ...holiday,
        //   fromDate: convertFromDate,
        //   toDate: convertToDate
        // })
        console.log("Holiday payload change", holiday);
        let result = await GymDetailsServices.gymHolidayUpdate(holiday);
        // setSuccessMsg(result.message);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: result.message,
          typeMessage: 'success'
        })
      } else {
        let convertFromDate = utils.convertTimezoneToUTC(holiday?.fromDate + " " + "00:00:01", timezoneOffset);
        let convertToDate = utils.convertTimezoneToUTC(holiday?.toDate.trim() + " " + "23:59:59", timezoneOffset);
        console.log("Conver from time and to date", convertFromDate);
        console.log("Convert to date", convertToDate);
        holiday['fromDate'] = convertFromDate.trim();
        holiday['toDate'] = convertToDate.trim();
        // setHoliday({
        //   ...holiday,
        //   fromDate: convertFromDate,
        //   toDate: convertToDate
        // })
        console.log("Holiday payload change", holiday);
        let result = await GymDetailsServices.gymHolidayCreate(holiday);
        setSuccessMsg(result.message);
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: result.message,
          typeMessage: 'success'
        })
      }

    } catch (e) {
      // setErrorMsg(e.message);
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      })
    } finally {
      setLoader(false);
      props.fetchGymDetails();
    }
  };
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    console.log(dd, mm, yyyy);
    return yyyy + "-" + mm + "-" + dd;
  };
  
  useEffect(()=>{
    if(holiday?.fromDate.split(" ").length === 2){
      const convertFromDate = utils.convertUTCToTimezone(holiday?.fromDate, timezoneOffset);
      const dd = String(new Date(convertFromDate).getDate()).padStart(2, "0");
      const mm = String(new Date(convertFromDate).getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = new Date(convertFromDate).getFullYear();
      console.log(convertFromDate);
      setEditHolidayFrom(yyyy + "-" + mm + "-" + dd);
    }
    if(holiday?.toDate.split(" ").length === 2){
      const convertToDate = utils.convertUTCToTimezone(holiday?.toDate, timezoneOffset);
      const dd = String(new Date(convertToDate).getDate()).padStart(2, "0");
      const mm = String(new Date(convertToDate).getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = new Date(convertToDate).getFullYear();
      console.log(convertToDate);
      setEditHolidayTo(yyyy + "-" + mm + "-" + dd);
    }
  },[holiday])

  return (
    <>

      <div className="modalBackdrop modalAddholiday">
        <div className="modalBackdropBg" onClick={props.closeAddHolidayModal}></div>
        {loader && <Loader />}
        {successMsg &&
          <SuccessAlert message={successMsg} extraclassName="addStatsPopMsg"></SuccessAlert>
        }
        {errorMsg &&
          <ErrorAlert message={errorMsg} extraclassName="addStatsPopMsg"></ErrorAlert>
        }
        <div className="slickModalBody">

          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeAddHolidayModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={modalholidayIcon} alt="" /></div>
            <h3>Add a holiday</h3>
            <p>Select the holiday name and date below</p>
          </div>
          <div className="modalForm auto">
            <form >
              <p>{props.holidayValue}</p>
              <div className="formControl">
                <label>Holiday Name</label>
                <input type="text" placeholder="Eg. Republic Day" name="" value={holiday.name} onChange={holidayhandler} />
                {modalPopMsgerror1 && <div className="errorMsg">Please fill up the holiday name field</div>}
              </div>

              <div className="d-flex justified-space-between" style={{ alignItems: "flex-start" }}>
                <div className="formControl half firstHalf">
                  <label style={{ paddingBottom: "9px" }}>Choose a date</label>
                  <div className="flatForm">
                    <span>From</span>
                    {/* <input type="date" name="" value={holiday?.fromDate} onChange={holidayStarthandler}
                      // min={disablePastDate()} 
                      max={holiday?.toDate?.split(" ")[0]} /> */}
                      <input type="date" name="" value={holiday?.fromDate.split(" ").length === 2 ? editHolidayFrom: holiday?.fromDate} onChange={holidayStarthandler}
                      // min={disablePastDate()} 
                      max={holiday?.toDate?.split(" ")[0]} />
                  </div>
                  {modalPopMsgerror2 && <div className="errorMsg">Please fill up the start date</div>}
                </div>
                <div className="formControl half secondHalf">
                  <label style={{ paddingBottom: "9px" }}></label>
                  <div className="flatForm">
                    <span>To</span>
                    <input type="date" name="" value={holiday?.toDate.split(" ").length ===2 ? editHolidayTo : holiday?.toDate} onChange={holidayEndhandler} min={holiday?.fromDate?.split(" ")[0]} />
                  </div>
                  {modalPopMsgerror3 && <div className="errorMsg">Please fill up the end date</div>}
                </div>
              </div>

              <div className="showHolidayDateValue">
                <h3>Holiday Duration :</h3>
                <div className="show"><span>{holidayDuration ? holidayDuration.toString().split(".")[0] : "0"}</span>     Day(S)</div>
              </div>
              {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraclassName="addStatsPopMsg"/> }
              { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraclassName="addStatsPopMsg"/>} */}

              <div className="modalbtnHolder">
                <button type="submit"
                  onClick={handleStatusSubmit}
                  className="saveNnewBtn"><span>Save</span><img src={arrowRightWhite} alt=""
                  /></button>
                <button type="reset"
                  onClick={handleStatusSubmitNew}
                  className="saveNnewBtn"><span>Save &amp; New</span><img src={arrowRightWhite} alt="" /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHolidayModal;
