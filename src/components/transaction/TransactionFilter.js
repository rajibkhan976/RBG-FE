import React, {useEffect, useState} from "react";

import arrowDown from "../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../assets/images/arrowRightWhite.svg";
import Loader from "../shared/Loader";
import { utils } from '../../helpers';
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function ImportTransactionFilter(props) {
    const [date, setDate] = useState();
    const [date2, setDate2] = useState();
    const [today, setToday] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const [selectStatus, setSelectStatus] = useState("");
    const [selectItem, setSelectItem] = useState("");
    const [selectName, setSelectName] = useState("");
    const [selectedTo, setSelectedTo] = useState("");
    const [selectedFrom, setSelectedFrom] = useState("");
    const timezoneOffset = useSelector((state)=> (state?.user?.data?.organizationTimezoneInfo.utc_offset) ? state?.user?.data?.organizationTimezoneInfo.utc_offset:null);
    useEffect(() => {
        let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
        setToday(timezoneDateTime);
    }, [timezoneOffset]);

    const selectStatusHandler = (e) =>{
        setSelectStatus(e.target.value)
    }
    const selectItemHandler = (e) =>{
        setSelectItem(e.target.value)
    }
    const selectNameHandler = (e) =>{
        setSelectName(e.target.value)
    }
    // const selectFromHandler = (e) =>{
    //     setSelectedFrom(e.target.value);
    //     console.log(selectedFrom);
    // }
    const setStartDate = (val) => {
        if (val) {
             const yyyy = val.getFullYear();
      let mm = val.getMonth() + 1; // Months start at 0!
      let dd = val.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      let formattedDate = `${yyyy}-${mm}-${dd}`;
            setSelectedFrom(formattedDate);
        } else {
            setSelectedFrom("");
        }
        setDate(val);
    }
    const setEndDate = (val) => {
        if (val) {
             const yyyy = val.getFullYear();
      let mm = val.getMonth() + 1; // Months start at 0!
      let dd = val.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      let formattedDate = `${yyyy}-${mm}-${dd}`;
            setSelectedTo(formattedDate);
        } else {
            setSelectedTo("");
        }
        setDate2(val);
    }
    const applyFilter = () => {
        if (selectStatus) {
            utils.addQueryParameter('status', selectStatus);
        } else {
            utils.removeQueryParameter('status');
        }
        if (selectItem) {
            utils.addQueryParameter('item', selectItem);
        } else {
            utils.removeQueryParameter('item');
        }
        if (selectName) {
            utils.addQueryParameter('contact', selectName);
        } else {
            utils.removeQueryParameter('contact');
        }
        if (selectedFrom) {
            const convertFrom = utils.convertTimezoneToUTC(selectedFrom + " " + "00:00:01", timezoneOffset);
            utils.addQueryParameter('fromDate', convertFrom);
        } else {
            utils.removeQueryParameter('fromDate');
        }
        if (selectedTo) {
            const convertTo = utils.convertTimezoneToUTC(selectedTo + " " + "23:59:59", timezoneOffset);
            utils.addQueryParameter('toDate', convertTo);
        } else {
            utils.removeQueryParameter('toDate');
        }
        utils.addQueryParameter("page", 1);
        props.getFilterStr();
    };

    useEffect(() => {
        setSelectStatus(utils?.getQueryVariable("status"));
        setSelectItem(utils?.getQueryVariable("item"));
        setSelectName(utils?.getQueryVariable("contact"));
        let fromDate = utils?.getQueryVariable("fromDate") || "";
        let toDate = utils?.getQueryVariable("toDate") || "";
        if (fromDate) {
            fromDate = decodeURIComponent(fromDate).replaceAll("+", " ").trim();
            fromDate = utils.convertUTCToTimezone(fromDate ,timezoneOffset, 'YYYY-MM-DD');
        }
        if (toDate) {
            toDate = decodeURIComponent(toDate).replaceAll("+", " ").trim();
            toDate = utils.convertUTCToTimezone(toDate ,timezoneOffset, 'YYYY-MM-DD');
        }
        setDate(fromDate);
        setDate2(toDate);
        setSelectedTo(toDate);
        setSelectedFrom(fromDate);
    }, []);
        
    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="dialogBg" onClick={props.closeFilter}></div>
                <div className="sideMenuInner importModalContainer updateContainer">
                    {isLoader ? <Loader/> : ''}
                    <div className="sideMenuHeader">
                        <h3>Apply Filter</h3>
                        <button className="btn btn-closeSideMenu" onClick={props.closeFilter}>
                            <span></span><span></span></button>
                    </div>
                    <div className="importModalBody setFilter">
                        <div className="filterOfContactListing">
                            <div className="infoInputs appModal">
                                <ul>
                                    <li className="blockLi">
                                        <div className="formField w-100 appModals formControl phasesSelection">
                                            <label>Payment status</label>
                                            <select value = {selectStatus} onChange={selectStatusHandler} style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option >Select </option>
                                                <option value="success">Success</option>
                                                <option value="failed">Failed</option>
                                                <option value="refund">Refund</option>
                                                <option value="overdue">Overdue</option>
                                              
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl statusSelection">
                                            <label>Item type</label>
                                            <select value= {selectItem} onChange={selectItemHandler} style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select</option>
                                                <option>Program</option>
                                                <option>Product</option>
                                                
                                            </select>
                                        </div>
                                    </li>
                                    <li className="dateRangeHeading"><p className="dateRange pTags">Date Range</p></li>
                                    <li className="halfDates noMargin">
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>From</label>
                                            <div className="inFormField duration">
                                                <DatePicker 
                                                    className="cmnFieldStyle"
                                                    selected={date ? new Date(date) : ""}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/yyyy"
                                                    onChange={(e) => setStartDate(e)}
                                                    maxDate={new Date(today)}
                                                />
                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>To</label>
                                            <div className="inFormField duration">
                                                <DatePicker
                                                    className="cmnFieldStyle"
                                                    selected={date2 ? new Date(date2) : ""}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/yyyy"
                                                    onChange={(e) => setEndDate(e)} 
                                                    minDate={new Date(date)}
                                                    maxDate={new Date(today)}
                                                />
                                            </div>
                                        </div>
                                    </li>
                        
                                    <li className="gapBtnRow">
                                        <div className="formField formControl w-50 appflex">
                                            <button type="button" className="saveNnewBtn" onClick={applyFilter}><span>Apply Filter</span><img
                                                src={arrowRightWhite} alt=""/></button>
                                        </div>
                                        <div className="formField w-50 appflex clearFilterBtns">
                                            <span className="clearFilter" onClick={props.clearFilter}>Clear</span>
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

export default ImportTransactionFilter;