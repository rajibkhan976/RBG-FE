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
  const [modalPopMsgerror, setModalPopMsgerror] = useState(false);
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
      fromDate: e.target.value
    });
  };
  const holidayEndhandler = (e) =>{
    setHoliday({
      ...holiday,
      toDate: e.target.value
    });
  };

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

    console.log(Math.ceil(ftoDate - fromDate));
    
     if(holiday.name !== "" && holiday.fromDate !== "" && holiday.toDate !== "" ){
       if (Math.ceil(ftoDate - fromDate) < 0) {
         setErrorMsg("Please chose End-Date on or after Start-Date");
       } else {
         createHoliday();
         setModalPopMsgsuccess(true);
         setTimeout(() => {
          props.closeAddHolidayModal();       
        }, 5000);
       }
     }else{
         //console.log("failed aslkjlsh");
         setErrorMsg("Please fill up the fields properly!");
     };
     
};
const handleStatusSubmitNew =(e) =>{
    e.preventDefault();

    let fromDate = new Date(holiday.fromDate);
    let ftoDate = new Date(holiday.toDate);

    if(holiday.name !== "" && holiday.fromDate !== "" && holiday.toDate !== "" ){
        //console.log("a",statusName,"b", statusDesc,"c", statusType);
        if (Math.ceil(ftoDate - fromDate) < 0) {
          setErrorMsg("Please chose End-Date on or after Start-Date");
        } else {
          createHoliday();
          setModalPopMsgsuccess(true);
          setEditHoliday(false);
          setHoliday({
            ...holiday,
            _id : "",
            name: "",
            fromDate : "",
            toDate :  ""
          });
        }
        
    } else {
      setErrorMsg("Please fill up the fields properly!");
    };    
};


  return (
    <>
     
      <div className="modalBackdrop holiday">  
      { loader && <Loader /> }
      {successMsg &&
        <SuccessAlert message={successMsg} extraClass="addStatsPopMsg"></SuccessAlert>
      }
      {errorMsg &&
        <ErrorAlert message={errorMsg} extraClass="addStatsPopMsg"></ErrorAlert>
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
              <div class="formControl">
                <label>Holiday Name</label>
                <input type="text" placeholder="Eg. Republic Day" name="" value={holiday.name}  onChange={holidayhandler}/>
              </div>
              
              <div className="d-flex justified-space-between">
                <div class="formControl half">
                <label>Choose a date</label>
                <input type="date"  name="" value={holiday.fromDate} onChange={holidayStarthandler}/>
              </div>
              <div class="formControl half">
                <label>&nbsp;</label> 
                <input type="date"  name="" value={holiday.toDate} onChange={holidayEndhandler}/>
              </div>
              </div>
              {/* {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraClass="addStatsPopMsg"/> }
              { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg"/>} */}

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
