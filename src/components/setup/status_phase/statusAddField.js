import React, { useEffect, useState , useForm} from "react";
import Loader from "../../shared/Loader";
import crossTop from "../../../../src/assets/images/cross.svg";
import arrow_forward from "../../../../src/assets/images/arrow_forward.svg";
import custom_icon from "../../../../src/assets/images/loading1.svg";
import ErrorAlert from "../../shared/messages/error"
import SuccessAlert from "../../shared/messages/success"
import { Scrollbars } from "react-custom-scrollbars-2";

const StatusAddField = (props) => {
  const [isLoader, setIsLoader] = useState(false);

  const [statusName, setStatusName] = useState("");
  const [statusDesc, setStatusDesc] = useState("");
  const [statusType, setStatusType] = useState("");
  
  const [popMsgerror, setPopMsgerror] = useState(false);
  const [popMsgsuccess, setPopMsgsuccess] = useState(false);
  

const addStatusNameHandler = (e) =>{
    setStatusName(e.target.value);
};
const addStatusDescHandler = (e) =>{
    setStatusDesc(e.target.value);
};
const addStatusTypeHandler = (e) =>{
    setStatusType(e.target.value);
};
const handleStatusSubmit =(e) =>{
    e.preventDefault();
     if(statusName !== "" && statusDesc !== "" && statusType !== "" ){
        // console.log("a",statusName,"b", statusDesc,"c", statusType);
         setPopMsgsuccess(true);
         setTimeout(() => {
            props.closeAddCustomModal()
        }, 2000);
     }else{
         //console.log("failed aslkjlsh");
         setPopMsgerror(true)
     };
    
};
const handleStatusSubmitNew =(e) =>{
    e.preventDefault();
    if(statusName !== "" && statusDesc !== "" && statusType !== "" ){
        //console.log("a",statusName,"b", statusDesc,"c", statusType);
        setPopMsgsuccess(true);
        setStatusName("");
        setStatusDesc("");
        setStatusType("");
    }else{
        //console.log("failed aslkjlsh");
        setPopMsgerror(true)
    };    
};
useEffect(() => {
    if (popMsgsuccess) setTimeout(() => { setPopMsgsuccess("") }, 2000);
    if (popMsgerror) setTimeout(() => { setPopMsgerror("") }, 2000);

}, [popMsgerror,popMsgsuccess]);
     return(
         
        <div className="modalBackdrop">
            <div className="slickModalBody">
                <div className="slickModalHeader">
                <button className="topCross" onClick={props.closeAddCustomModal}><img src={crossTop} alt="" /></button>  
                <div className="circleForIcon"><img src={custom_icon} alt="" /></div>
                <h3>Add a Custom Field</h3>
                <p>Fill out below details to create a custom field</p>
                </div>
                <div className="modalForm heightAddjust">
                <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />}>
                    <form >
                   
                    <div className="formControl" >
                        <label>Select Phase</label>
                        <select name="category" onChange={addStatusTypeHandler} value={statusType}>
                            <option>select</option>
                            <option>Text</option>
                            <option>Number</option>
                            <option>Email</option>
                            <option>Textarea</option>
                        </select>
                    </div>
                    <div className="formControl">
                        <label>Status Name</label>
                        <input type="text" name="" onChange={addStatusNameHandler} value={statusName}/>
                    </div>
                    <div className="formControl">
                        <label>Status Description</label>
                        <textarea  onChange={addStatusDescHandler} value={statusDesc}> </textarea>
                    </div>
                    {(popMsgerror === true) && <ErrorAlert  message="Fill Up all the field" extraClass="addStatsPopMsg"/> }
                
                    { (popMsgsuccess === true) && <SuccessAlert message="You Successfully added a status" extraClass="addStatsPopMsg"/>}

                    <div className="modalbtnHolder">
                        <button onClick={handleStatusSubmit} type="submit"
                        className="saveNnewBtn">
                        <span>Save</span><img src={arrow_forward} alt="" /></button>
                        <button onClick={handleStatusSubmitNew} type="reset"
                        className="saveNnewBtn">
                        <span>Save &amp; New</span><img src={arrow_forward} alt="" /></button>
                    </div>
                    </form>
                </Scrollbars>
                </div>

            </div>
        </div>
     )
};

export default StatusAddField;
