import React, {useEffect, useState} from "react";

import {Steps, Step} from "react-step-builder";

import arrowDown from "../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../assets/images/arrowRightWhite.svg";
// import {PhasesServices} from "../../../services/contact/phasesServices";
import Loader from "../shared/Loader";
 import {utils} from "../../helpers";
 import * as actionTypes from "../../actions/types";
 import {useDispatch} from "react-redux";
 import moment from "moment";

function CommunicationLogFilter(props) {
    const dispatch = useDispatch();

    const [isLoader, setIsLoader] = useState(false);
    const [selectedDirection, setSelectedDirection] = useState(false);
    const [selectedType, setSelectedType] = useState(false);
    const [selectedTo, setSelectedTo] = useState("");
    const [selectedFrom, setSelectedFrom] = useState("");
    const [clickedOnFilter, setClickedOnFilter] = useState(false);
    const [error, setError] = useState("");
    
     

    const handleDirectionChange = (event) => {
        setSelectedDirection(event.target.value);
    }
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    }
    const handleToChange = (event) => {
        let toDate = new Date(event.target.value);
        const dayNow = new Date();
        
        setSelectedTo(event.target.value);
        if(Math.ceil(dayNow - toDate) >= 0){
            setError("")
        }
    }
    const handleFromChange = (event) => {    
        let fromDate = new Date(event.target.value);
        const dayNow = new Date(); 
        setSelectedFrom(event.target.value);
        if(Math.ceil(dayNow - fromDate) >= 0){
            setError("")
        }
    }

    const applyFilter = (event) => {
        event.preventDefault();
        let toDate = new Date(selectedTo);
        let fromDate = new Date(selectedFrom);
        const dayNow = new Date();

        
        
            if(Math.ceil(toDate - fromDate) < 0){
                setError("Please choose To-Date on or after From-Date")
            }else if(Math.ceil(dayNow - fromDate) < 0){
                setError("Please choose a date that is today or previous");
            } else {

                if (selectedDirection) {
                    utils.addQueryParameter('direction', selectedDirection);
                // } else {
                //     utils.removeQueryParameter('direction')
                }
                if (selectedType) {
                    utils.addQueryParameter('type', selectedType);
                // } else {
                //     utils.removeQueryParameter('type')
                }
                if (selectedFrom) {
                    utils.addQueryParameter('fromDate', selectedFrom);
                // } else {
                //      utils.removeQueryParameter('fromDate')
                }
                if (selectedTo) {
                    utils.addQueryParameter('toDate', selectedTo);

                // } else {
                //     utils.removeQueryParameter('toDate')
                }
                if (selectedDirection || selectedType || selectedFrom || selectedTo ) {
                    setClickedOnFilter(true);   

                }else{ 
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Please select any filter first.',
                        typeMessage: 'warning'
                    });
                }


            }      
        }
       
    
    setTimeout(() => {
        props.clickedOnFilter(clickedOnFilter);
         if(clickedOnFilter){
                 props.hideFilter();
             }
       // console.log("ssssssssssssssssssss", clickedOnFilter);     
      }, 500); 
      
    const clearFilter = () => {
        setSelectedDirection("");
        setSelectedType("");
        utils.removeQueryParameter('direction')
        utils.removeQueryParameter('type');
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');
        setClickedOnFilter(true); 
    } 


    useEffect(() => {

        setSelectedDirection(utils?.getQueryVariable("direction"));
        setSelectedType(utils?.getQueryVariable("type"));
        setSelectedTo( utils?.getQueryVariable("toDate"));
        setSelectedFrom( utils?.getQueryVariable("fromDate"));
   
    }, []);



    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div class="dialogBg" onClick={ props.hideFilter}></div>
                <div className="sideMenuInner importModalContainer updateContainer">
                    {isLoader ? <Loader/> : ''} 
                    <div className="sideMenuHeader">
                        <h3>Apply Filter</h3>
                        <button className="btn btn-closeSideMenu" onClick={ props.hideFilter}>
                            <span></span><span></span></button>
                    </div>
                    <div className="importModalBody setFilter">
                        <div className="filterOfContactListing">
                            <div className="infoInputs appModal">
                                <ul>
                                    <li className="blockLi">
                                        <div className="formField w-100 appModals formControl phasesSelection">
                                            <label>Direction</label>
                                            <select 
                                                onChange={handleDirectionChange}
                                                value={selectedDirection}
                                                    style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select a Direction</option>
                                                <option value="inbound">Incoming</option>
                                                <option value="outbound">Outgoing</option>
                                               
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl statusSelection">
                                            <label>Type</label>
                                            <select 
                                            onChange={handleTypeChange}
                                            value={selectedType}
                                            style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select a Type</option>
                                                <option value="SMS">SMS</option>
                                                <option value="EMAIL">Email</option>
                                            </select>
                                        </div>
                                       
                                    </li>
                                    <li className="dateRangeHeading"><p className="dateRange pTags">Date Range</p></li>
                                    <li className="halfDates dateRange">
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>From</label>
                                            <div className="inFormField duration">
                                                <input type="date" placeholder="dd/mm/yyyy" name="" 
                                                onChange={handleFromChange}
                                                value={selectedFrom}
                                                />

                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>To</label>
                                            <div className="inFormField duration">
                                            <input type="date" placeholder="dd/mm/yyyy" name="" 
                                            onChange={handleToChange}
                                            value={selectedTo}
                                            />

                                            </div>
                                        </div>
                                    </li>
                                    <div className="errorMsg">{error}</div>
                                  
                                    <li className="lastLiApp btnLi">
                                        <div className="formField formControl w-50 appflex">
                                            <button type="submit" className="saveNnewBtn" 
                                            onClick={applyFilter}><span>Apply Filter</span><img
                                                src={arrowRightWhite} alt=""/></button>
                                        </div>
                                        <div className="formField w-50 appflex clearFilterBtns">
                                            <span className="clearFilter" onClick={clearFilter}>Clear</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CommunicationLogFilter;