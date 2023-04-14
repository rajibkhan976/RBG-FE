import React, {useEffect, useState} from "react";
import arrowDown from "../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../assets/images/arrowRightWhite.svg";
import Loader from "../shared/Loader";
import {utils} from "../../helpers";
import * as actionTypes from "../../actions/types";
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

function CommunicationLogFilter(props) {
    const dispatch = useDispatch();

    const [isLoader, setIsLoader] = useState(false);
    const [selectedDirection, setSelectedDirection] = useState(false);
    const [selectedType, setSelectedType] = useState(false);
    const [selectedTo, setSelectedTo] = useState("");
    const [selectedFrom, setSelectedFrom] = useState("");
    const [clickedOnFilter, setClickedOnFilter] = useState(false);
    const [error, setError] = useState("");
    const [today, setToday] = useState();
    const timezoneOffset = useSelector((state)=>(state?.user?.data?.organizationTimezoneInfo?.utc_offset)? state.user.data.organizationTimezoneInfo.utc_offset:null)
    useEffect(() => {
        let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
        setToday(timezoneDateTime);
    }, [timezoneOffset]);

    const handleDirectionChange = (event) => {
        setSelectedDirection(event.target.value);
    }
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    }
    const handleToChange = (val) => {
        if (val) {
            let formattedDate = `${val.getFullYear()}-${
                val.getMonth() + 1
            }-${val.getDate()}`;
            setSelectedTo(formattedDate);
        } else {
            setSelectedTo("");
        }
    }
    const handleFromChange = (val) => {
        if (val) {
            let formattedDate = `${val.getFullYear()}-${
                val.getMonth() + 1
            }-${val.getDate()}`;
            setSelectedFrom(formattedDate);
        } else {
            setSelectedFrom("");
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
            }
            if (selectedType) {
                utils.addQueryParameter('type', selectedType);
            }
            if (selectedFrom) {
                utils.addQueryParameter('fromDate', utils.convertTimezoneToUTC(selectedFrom + " " + "00:00:01", timezoneOffset));
            }
            if (selectedTo) {
                utils.addQueryParameter('toDate',  utils.convertTimezoneToUTC(selectedTo + " " + "23:59:59", timezoneOffset));
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
    }, 500);

    const clearFilter = () => {
        setSelectedDirection("");
        setSelectedType("");
        setSelectedTo("");
        setSelectedFrom("");
    }


    useEffect(() => {

        setSelectedDirection(utils?.getQueryVariable("direction"));
        setSelectedType(utils?.getQueryVariable("type"));
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
        setSelectedTo(toDate);
        setSelectedFrom(fromDate);

    }, []);



    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="dialogBg" onClick={ props.hideFilter}></div>
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
                                                <DatePicker
                                                    className="cmnFieldStyle"
                                                    selected={selectedFrom ? new Date(selectedFrom) : ""}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/yyyy"
                                                    onChange={(e) => handleFromChange(e)}
                                                    maxDate={new Date(today)}
                                                />

                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>To</label>
                                            <div className="inFormField duration">
                                                <DatePicker
                                                    className="cmnFieldStyle"
                                                    selected={selectedTo ? new Date(selectedTo) : ""}
                                                    format="dd/MM/yyyy"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/yyyy"
                                                    onChange={(e) => handleToChange(e)}
                                                    minDate={new Date(selectedFrom)}
                                                    maxDate={new Date(today)}
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