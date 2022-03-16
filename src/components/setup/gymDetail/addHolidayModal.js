import React, { useEffect, useState } from "react";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import crossTop from "../../../assets/images/cross.svg";
import modalholidayIcon from "../../../assets/images/modalholidayIcon.svg";

import { GymDetailsServices } from "../../../services/gymDetails/GymDetailsServices";


const AddHolidayModal = (props) => {

  const [option, setOption] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalPopMsgerror1, setModalPopMsgerror1] = useState(false);
  const [modalPopMsgerror2, setModalPopMsgerror2] = useState(false);
  const [modalPopMsgerror3, setModalPopMsgerror3] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [modalPopMsgsuccess, setModalPopMsgsuccess] = useState(false);
  const [holiday , setHoliday] = useState(props.holiday);
  // const [holidayStart , setHolidayStart] = useState(props.holiday.fromDate);
  // const [holidayEnd , setHolidayEnd] = useState(props.holiday.toDate);
  // const [holidayId, setHolidayId] = useState(props.holiday._id);
  const [editHoliday, setEditHoliday] = useState(props.editHoliday);
  const [loader, setLoader] = useState(false);
  console.log("Edit status=== " + editHoliday);
  // if (!editHoliday) {
  //   console.log("Holiday reset===");
  //   setHoliday("");
  //   setHolidayStart("");
  //   setHolidayEnd("");
  //   setHolidayId("");
  // }

  const holidayhandler = (e) =>{
    setHoliday({
        ...holiday,
        name: e.target.value
      });
  };
  const holidayStarthandler = (e) =>{
    setHoliday({
      ...holiday,
      fromDate: e.target.value,
      toDate: e.target.value 
    });
  };
  const holidayEndhandler = (e) =>{
    setHoliday({
      ...holiday,
      toDate: e.target.value 
    });
  };
   const addfromDate = new Date(holiday.fromDate);
   const addtoDate = new Date(holiday.toDate);
   const holidayDuration = ((addtoDate - addfromDate)/ (1000 * 3600 * 24)) + 1;
   console.log("holidayDuration::::::::::",addtoDate,addfromDate, holidayDuration)

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, 5000);
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, 5000);
  }, [errorMsg, successMsg]);

  const createHoliday = async () =>{
   
      try {
        setLoader(true);
        if(editHoliday){
          let result = await GymDetailsServices.gymHolidayUpdate(holiday);
          setSuccessMsg(result.message);
        } else {
          let result = await GymDetailsServices.gymHolidayCreate(holiday);
          setSuccessMsg(result.message);
        }
        
      } catch (e) {
        setErrorMsg(e.message);
      } finally {
        setLoader(false);
        props.fetchGymDetails();
      }
  };

   const handleStatusSubmit = async (e) =>{
    e.preventDefault();

    let fromDate = new Date(holiday.fromDate);
    let ftoDate = new Date(holiday.toDate);
    const dayNow = new Date();
    
      if(holiday.name != "" && holiday.fromDate != undefined && holiday.toDate != undefined && holiday.fromDate != "" && holiday.toDate != "" ){
        console.log("I am in parent if = ", typeof(holiday.fromDate));
        if (Math.ceil(ftoDate - fromDate) < 0) {
          setErrorMsg("Please choose End-Date on or after Start-Date");
        } else if(Math.ceil(fromDate - dayNow) < 0){
         setErrorMsg("Please choose a Holiday after today");
        }else {
          //console.log("Holiday Obj", holiday);
          createHoliday();
         // console.log("API calling ====================================================");
          setModalPopMsgsuccess(true);
          setTimeout(() => {
           props.closeAddHolidayModal();       
         }, 5000);
        }
        setModalPopMsgerror1(false);
        setModalPopMsgerror2(false);
        setModalPopMsgerror3(false);
      }
      else{
          
         //setErrorMsg("Please fill up the fields properly!");
          if(holiday.name === ""){
          setModalPopMsgerror1(true);
          }else{
            setModalPopMsgerror1(false);
          };
          if (holiday.fromDate === undefined || holiday.fromDate === ""){
            setModalPopMsgerror2(true);
          }else{
            setModalPopMsgerror2(false);
          };
          if(holiday.toDate === undefined || holiday.toDate === ""){
            setModalPopMsgerror3(true);
          }else{
            setModalPopMsgerror3(false);
          };
      };
      console.log(holiday.name, ",,,,", holiday.fromDate,",,,,,,", holiday.toDate) ;
      console.log(holiday.name, "holiday.fromDate.typeOF", typeof(holiday.fromDate),"holiday.toDate.typeOF", typeof(holiday.toDate)) ;
};
const handleStatusSubmitNew =(e) =>{
    e.preventDefault();

    let fromDate = new Date(holiday.fromDate);
    let ftoDate = new Date(holiday.toDate);
    const dayNow = new Date();
    

    if(holiday.name != "" && holiday.fromDate != undefined && holiday.toDate != undefined && holiday.fromDate != "" && holiday.toDate != "" ){
        //console.log("a",statusName,"b", statusDesc,"c", statusType);
        if (Math.ceil(ftoDate - fromDate) < 0) {
          setErrorMsg("Please choose End-Date on or after Start-Date");
        } else if(Math.ceil(fromDate - dayNow) < 0){
         setErrorMsg("Please choose a Holiday after today");
        } else {
          
          setModalPopMsgsuccess(true);
          setEditHoliday(false);
          setHoliday({
            ...holiday,
            _id : "",
            name: "",
            fromDate : "",
            toDate :  ""
          });
          createHoliday();
        }
        setModalPopMsgerror1(false);
        setModalPopMsgerror2(false);
        setModalPopMsgerror3(false);
    } else {
        if(holiday.name === ""){
        setModalPopMsgerror1(true);
        }else{
          setModalPopMsgerror1(false);
        };
        if (holiday.fromDate === undefined || holiday.fromDate === ""){
          setModalPopMsgerror2(true);
        }else{
          setModalPopMsgerror2(false);
        };
        if(holiday.toDate === undefined || holiday.toDate === ""){
          setModalPopMsgerror3(true);
        }else{
          setModalPopMsgerror3(false);
        };
      
      //setErrorMsg("Please fill up the fields properly!");
    };  
    console.log(holiday.name, ",,,,", holiday.fromDate,",,,,,,", holiday.toDate) ;
    console.log(holiday.name, "holiday.fromDate.typeOF", typeof(holiday.fromDate),"holiday.toDate.typeOF", typeof(holiday.toDate)) ;
};


  return (
    <>
     
      <div className="modalBackdrop holiday">  
      { loader && <Loader /> }
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
                <input type="text" placeholder="Eg. Republic Day" name="" value={holiday.name}  onChange={holidayhandler}/>
                {modalPopMsgerror1 && <div className="errorMsg">Please fill up the holiday name field</div>}
              </div>
              
              <div className="d-flex justified-space-between">
                <div className="formControl half">
                <label>Choose a date</label>
                <div className="flatForm">
                  <span>From</span>
                  <input type="date"  name="" value={holiday.fromDate} onChange={holidayStarthandler}/>
                </div> 
                {modalPopMsgerror2 && <div className="errorMsg">Please fill up the start date</div>}
              </div>
              <div className="formControl half">
                <label>&nbsp;</label> 
                <div className="flatForm">
                  <span>To</span>
                  <input type="date"  name="" value={holiday.toDate} onChange={holidayEndhandler}/>  
                </div>
                {modalPopMsgerror3 &&  <div className="errorMsg">Please fill up the end date</div>} 
              </div>
              </div>
              
              <div className="showHolidayDateValue">
                <h3>Holiday Duration :</h3>
                <div className="show"><span>{holidayDuration ? holidayDuration : "0"}</span>     Day(S)</div>
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
