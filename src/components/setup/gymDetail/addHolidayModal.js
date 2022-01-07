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
  const [modalPopMsgerror, setModalPopMsgerror] = useState(false);
  const [modalPopMsgsuccess, setModalPopMsgsuccess] = useState(false);
  const [holiday , setHoliday] = useState("");
  const [holidayStart , setHolidayStart] = useState("");
  const [holidayEnd , setHolidayEnd] = useState("");
    
  const holidayhandler = (e) =>{
    setHoliday(e.target.value);
  };
  const holidayStarthandler = (e) =>{
    setHolidayStart(e.target.value);
  };
  const holidayEndhandler = (e) =>{
    setHolidayEnd(e.target.value);
  };
  const createHoliday = async () =>{
    let payload = {
      "name": holiday,
      "fromDate": holidayStart,
      "toDate": holidayEnd
  }
    let result = await GymDetailsServices.gymHolidayCreate(payload);
    console.log(result);
  }
   const handleStatusSubmit = async (e) =>{
    e.preventDefault();
     if(holiday !== "" && holidayStart !== "" && holidayEnd !== "" ){
         createHoliday();
        setModalPopMsgsuccess(true);
         setTimeout(() => {
          props.closeAddHolidayModal();       
        }, 2000);
  
     }else{
         //console.log("failed aslkjlsh");
         setModalPopMsgerror(true)
     };
     
};
const handleStatusSubmitNew =(e) =>{
    e.preventDefault();
    if(holiday !== "" && holidayStart !== "" && holidayEnd !== "" ){
        //console.log("a",statusName,"b", statusDesc,"c", statusType);
        createHoliday();
        setModalPopMsgsuccess(true);
        setHoliday("");
        setHolidayStart("");
        setHolidayEnd("");
    }else{
        //console.log("failed aslkjlsh");
        setModalPopMsgerror(true)
    };    
};
useEffect(() => {
    if (modalPopMsgerror) setTimeout(() => { setModalPopMsgerror("") }, 2000);
    if (modalPopMsgsuccess) setTimeout(() => { setModalPopMsgsuccess("") }, 2000);

}, [modalPopMsgerror,modalPopMsgsuccess]);

  return (
    <>
     
      <div className="modalBackdrop holiday">  
        <div className="slickModalBody">
          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeAddHolidayModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={modalholidayIcon} alt="" /></div>
            <h3>Add a holiday</h3>
            <p>Select the holiday name and date below</p>
          </div>
          <div className="modalForm auto">
            <form>
              <div class="formControl">
                <label>Holiday Name</label>
                <input type="text" placeholder="Eg. Republic Day" name="" value={holiday}  onChange={holidayhandler}/>
              </div>
              
              <div className="d-flex justified-space-between">
                <div class="formControl half">
                <label>Choose a date</label>
                <input type="date"  name="" value={holidayStart} onChange={holidayStarthandler}/>
              </div>
              <div class="formControl half">
                <label>&nbsp;</label> 
                <input type="date"  name="" value={holidayEnd} onChange={holidayEndhandler}/>
              </div>
              </div>
              {(modalPopMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraClass="addStatsPopMsg"/> }
              { (modalPopMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg"/>}

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
