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
    const [selectedTo, setSelectedTo] = useState(false);
    const [selectedFrom, setSelectedFrom] = useState(false);
    const [clickedOnFilter, setClickedOnFilter] = useState(false);
    
     

    const handleDirectionChange = (event) => {
        setSelectedDirection(event.target.value);
    }
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    }
    const handleToChange = (event) => {
        const datee = new Date(event.target.value + " 23:59 UTC");
        setSelectedTo(datee.toISOString());
    }
    const handleFromChange = (event) => {
        const datee = new Date(event.target.value)
        setSelectedFrom(datee.toISOString());
        console.log(selectedFrom);
    }
    const applyFilter = (event) => {
        event.preventDefault();
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
            // let filter = [];
            // if(selectedDirection){
            //     filter.push(selectedDirection)
            // }
            // if(selectedType){
            //     filter.push(selectedType)
            // }
            //props.filterSection(filter);
            setClickedOnFilter(true);         
        }else{ 
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please select any filter first.',
                typeMessage: 'warning'
            });
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


    // useEffect(() => {
    //     setSelectedDirection(utils?.getQueryVariable("direction"));
    //     setSelectedType(utils?.getQueryVariable("type"));
    //     const dateTo = utils?.getQueryVariable("toDate");
    //     const dateFrom = utils?.getQueryVariable("fromDate");
    //     //console.log( moment(dateFrom.replaceAll("%3A",":")).format('YYYY-MM-DD') , moment(dateTo.replaceAll("%3A",":")).format('YYYY-MM-DD'));
    //     //if(dateTo){
    //     setSelectedTo(moment(dateTo?.replaceAll("%3A",":")).format('YYYY-MM-DD'));

    //     //}
    //     //if(dateFrom){
    //         setSelectedFrom(moment(dateFrom?.replaceAll("%3A",":")).format('YYYY-MM-DD'));

    //     //}
    // }, []);



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
                                                <input type="date" placeholder="dd/mm/yyyy" name="" onChange={handleFromChange}/>

                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>To</label>
                                            <div className="inFormField duration">
                                            <input type="date" placeholder="dd/mm/yyyy" name="" onChange={handleToChange}/>

                                            </div>
                                        </div>
                                    </li>
                                  
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