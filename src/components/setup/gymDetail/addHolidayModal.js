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
import DatePicker from "react-datepicker";
import moment from "moment/moment";

const AddHolidayModal = (props) => {
  const [tomorrow, setTomorrow] = useState();
  const [today, setToday] = useState();
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

  const holidayhandler = (e) => {
    setHoliday({
      ...holiday,
      name: e.target.value
    });
  };
  const [dateStatus, setDatastatus] = useState(false);
  const timezoneOffset = useSelector((state) => (state?.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset : null)
  useEffect(() => {
    let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
    setToday(timezoneDateTime);
    let tomorrowDate = moment().add(1, 'days').utc().format("YYYY-MM-DD HH:mm:ss");
    let tomorrowsDateConverted = utils.convertUTCToTimezone(tomorrowDate ,timezoneOffset, "YYYY-MM-DD");
    setTomorrow(tomorrowsDateConverted);
  }, [timezoneOffset]);

  const holidayStarthandler = (val) => {
    if (val) {
      const yyyy = val.getFullYear();
      let mm = val.getMonth() + 1; // Months start at 0!
      let dd = val.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      let formattedDate = `${yyyy}-${mm}-${dd}`;
      
      setHoliday({
        ...holiday,
        fromDate: utils.convertTimezoneToUTC(formattedDate + " 00:00:00" ,timezoneOffset),
        toDate: utils.convertTimezoneToUTC(formattedDate + " 23:59:59" ,timezoneOffset),
      });
    } else {
      setHoliday({
        ...holiday,
        fromDate: "",
        toDate: "",
      });
    }
  };
  const holidayEndhandler = (val) => {
    if (val) {
      const yyyy = val.getFullYear();
      let mm = val.getMonth() + 1; // Months start at 0!
      let dd = val.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      let formattedDate = `${yyyy}-${mm}-${dd}`;
      setHoliday({
        ...holiday,
        toDate: utils.convertTimezoneToUTC(formattedDate + " 23:59:59" ,timezoneOffset),
      });
    } else {
      setHoliday({
        ...holiday,
        toDate: "",
      });
    }
  };
  const addfromDate = new Date(utils.convertUTCToTimezone(holiday.fromDate, timezoneOffset));
  const addtoDate = new Date(utils.convertUTCToTimezone(holiday.toDate, timezoneOffset));
 
  
  const holidayDuration = ((addtoDate - addfromDate) / (1000 * 3600 * 24)) + 1;

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
      } else if (Math.ceil(fromDate - today) < 0) {
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
          convertFromDate = utils.convertTimezoneToUTC(holiday?.fromDate, timezoneOffset);
        }else{
          convertFromDate = utils.convertTimezoneToUTC(holiday?.fromDate.split(" ")[0] + " " + "00:00:01", timezoneOffset);
        }

        if(holiday?.toDate.toString().split(" ").length === 2){
          convertToDate = utils.convertTimezoneToUTC(holiday?.toDate, timezoneOffset);
        }else{
          convertToDate = utils.convertTimezoneToUTC(holiday?.toDate.split(" ")[0] + " " + "00:00:01", timezoneOffset);
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
        let convertFromDate = utils.convertTimezoneToUTC(holiday?.fromDate.split(" ")[0] + " " + "00:00:01", timezoneOffset);
        let convertToDate = utils.convertTimezoneToUTC(holiday?.toDate.split(" ")[0] + " " + "23:59:59", timezoneOffset);
        console.log("Formatted date-------------------", holiday?.fromDate, timezoneOffset);
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
                    <DatePicker
                        className="cmnFieldStyle"
                        selected={holiday && holiday.fromDate ? new Date(utils.convertUTCToTimezone(holiday.fromDate ,timezoneOffset)) : ""}
                        format="dd/MM/yyyy"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        onChange={(e) => holidayStarthandler(e)}
                        minDate={new Date(tomorrow)}
                    />
                  </div>
                  {modalPopMsgerror2 && <div className="errorMsg">Please fill up the start date</div>}
                </div>
                <div className="formControl half secondHalf">
                  <label style={{ paddingBottom: "9px" }}></label>
                  <div className="flatForm">
                    <span>To</span>
                    <DatePicker
                        className="cmnFieldStyle"
                        selected={holiday && holiday.toDate ? new Date(utils.convertUTCToTimezone(holiday.toDate ,timezoneOffset)) : ""}
                        format="dd/MM/yyyy"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        onChange={(e) => holidayEndhandler(e)}
                        minDate={holiday && holiday.fromDate ? new Date(new Date(utils.convertUTCToTimezone(holiday.fromDate ,timezoneOffset))): new Date(tomorrow)}
                    />
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
