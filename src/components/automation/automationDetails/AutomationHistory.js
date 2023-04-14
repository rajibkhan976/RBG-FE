import React, { Fragment, useCallback, useEffect, useState } from 'react'
import TableOptionsDropdown from '../../shared/TableOptionsDropdown';
import DefaultUserImage from "../../../assets/images/user.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import noRecords from '../../../assets/images/noRecords.svg';
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import { useParams } from 'react-router-dom';
import { AutomationServices } from '../../../services/automation/AutomationServices';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import * as actionTypes from '../../../actions/types'
import Pagination from '../../shared/Pagination';
import moment from 'moment';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default function AutomationHistory(props) {
    const [date, setDate] = useState();
    const [date2, setDate2] = useState();
    const [calenderMinDate, setCalenderMinDate] = useState();
    const { automationId } = useParams();
    const [trigger, setTrigger] = useState("trigger");
    const [automationHistory, setAutomationHistory] = useState(props.automationHistory);
    const [paginationData, setPaginationData] = useState(props.paginationData);
    const [totalSteps, setTotalSteps] = useState(0);
    const [option, setOption] = useState(null);
    const [filterData, setFilterData] = useState({
        fromDate: "",
        toDate: "",
        status: ""
    });
    const [togOption, setTogOption] = useState(null);
    const timezone = props.timezone;
    const dispatch = useDispatch();


    const timezoneOffset = useSelector((state)=> (state?.user?.data?.organizationTimezoneInfo.utc_offset) ? state?.user?.data?.organizationTimezoneInfo.utc_offset:null);
    useEffect(()=>{
        console.log("transaction filter time zone", timezoneOffset);
    })

    useEffect(() => {
        let localDateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        let timezoneDateTime = utils.convertUTCToTimezone(localDateTime ,timezoneOffset);
        let formatedDateTime = moment(timezoneDateTime).format("YYYY-MM-DD HH:mm:ss").split(" ")[0];
        setCalenderMinDate(formatedDateTime);
        
        setFilterData(prevState => ({ ...prevState, fromDate: formatedDateTime }));
        setFilterData(prevState => ({ ...prevState, toDate: formatedDateTime }));
        setDate(new Date(timezoneDateTime));
        setDate2(new Date(timezoneDateTime));
    }, []);

    useEffect(() => {
        setAutomationHistory(props.automationHistory);
        setPaginationData(props.paginationData);
        if (props && props.automationDetails && props.automationDetails.blueprint) {
            let trigger = props.automationDetails.blueprint.filter(el => el.type.includes('Trigger'));
            if (trigger.length) {
                setTrigger(trigger[0].type);
            }
            let steps = props.automationDetails.blueprint.filter(el => !el.id.includes('edge-'));
            setTotalSteps(steps.length);
        }
        console.log("timezoneOffset",timezoneOffset);
    }, [props]);
    const toggleOptions = (index) => {
        setOption(index !== option ? index : null);
    };
    const getQueryParams = async () => {
        const from = utils.getQueryVariable('fromDate');
        const to = utils.getQueryVariable('toDate');
        const status = utils.getQueryVariable('status');
        const queryParams = new URLSearchParams();
        console.clear();
        if (from) {
            // const fromDt = from;
            // const localtime = moment.tz(fromDt, "YYYY-MM-DD hh:mm A", timezone);
            // const fromDate = localtime.clone().utc().format("YYYY-MM-DD");
            // console.log("UTC FROM --",fromDate);
            // console.log(fromDt)
            queryParams.append("fromDate", decodeURIComponent(from));
        }
        if (to) {
            // const toDt = to;
            // const localtime = moment.tz(toDt, "YYYY-MM-DD hh:mm A", timezone);
            // const toDate = localtime.clone().utc().format("YYYY-MM-DD");
            // // console.log(toDt);
            // console.log("UTC TO --",toDate);
            queryParams.append("toDate", decodeURIComponent(to));
            // console.log("filterData.fromDate", decodeURIComponent((utils.convertTimezoneToUTC(filterData.fromDate + " " + "00:00:01", timezoneOffset))));
        }
        if (status) {
            queryParams.append("status", status);
        }

        return queryParams;
    }
    const paginationCallbackHandle = useCallback(() => {
        props.fetchHistory();
    }, []);

    // const handleFromDate = (e) => {
    //     const { value } = e.target;
    //     setFilterData(prevState => ({ ...prevState, fromDate: value }));
    //     //setFilterData(prevState => ({ ...prevState, fromDate: utils.convertTimezoneToUTC(value + " " + "00:00:01", timezoneOffset)  }));
    // };

    const setStartDate = (val) => {
        let formattedDate = `${val.getFullYear()}-${
            val.getMonth() + 1
          }-${val.getDate()}`;
        setDate(val);

        setFilterData(prevState => ({ ...prevState, fromDate: formattedDate }));
    }

    // const handletoDate = (e) => {
    //     const { value } = e.target;
    //     setFilterData(prevState => ({ ...prevState, toDate: value }));
    //     //setFilterData(prevState => ({ ...prevState, toDate: utils.convertTimezoneToUTC(value + " " + "00:00:01", timezoneOffset) }));
    // };

    const setEndDate = (val) => {
        let formattedDate = `${val.getFullYear()}-${
            val.getMonth() + 1
          }-${val.getDate()}`;
        setDate2(val);

        setFilterData(prevState => ({ ...prevState, toDate: formattedDate }));
    }

    const handleStatus = (e) => {
        const { value } = e.target;
        setFilterData(prevState => ({ ...prevState, status: value }));
    };
    const handleApplyFilter = () => {
        if (filterData.fromDate && !filterData.toDate) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: "To date is mandatory if you're choosing from date",
                typeMessage: 'error'
            });
            return;
        }
        // const queryParams = Object.entries(filterData).filter(el => el[1] !== '').map(el => `${el[0]}=${el[1]}`).join("&");
        // fetchHistory(queryParams)
        
        if (filterData.fromDate) {
            //utils.addQueryParameter('fromDate', filterData.fromDate);
            //utils.addQueryParameter('toDate', filterData.toDate);
            utils.addQueryParameter('fromDate', utils.convertTimezoneToUTC(filterData.fromDate + " " + "00:00:01", timezoneOffset).replace(' ', 'T').trim() + '.000Z');
            utils.addQueryParameter('toDate', utils.convertTimezoneToUTC(filterData.toDate + " " + "23:59:59", timezoneOffset).replace(' ', 'T').trim() + '.000Z');

            console.log("utils.convertTimezoneToUTC",filterData.fromDate, utils.convertTimezoneToUTC(filterData.fromDate + " " + "00:00:01", timezoneOffset).replace(' ', 'T') + '.000Z')
            console.log("utils.convertTimezoneToUTC",filterData.toDate, utils.convertTimezoneToUTC(filterData.toDate + " " + "23:59:59", timezoneOffset).replace(' ', 'T') + '.000Z')
            //console.log("utils.convertTimezoneToUTC Trim", utils.convertTimezoneToUTC(filterData.toDate + " " + "00:00:01", timezoneOffset).replace(' ', 'T').trim() + '.000Z')
            //console.log("+06%3A00%3A01+", decodeURIComponent("+06%3A00%3A01+").replaceAll("+", " "));

        } else {
            utils.removeQueryParameter('fromDate');
            utils.removeQueryParameter('toDate');
        }
        if (filterData.status) {
            utils.addQueryParameter('status', filterData.status);
        } else {
            utils.removeQueryParameter('status');
        }
        utils.removeQueryParameter('page');
        props.fetchHistory();
    }
    const openContactModal = (id) => {
        dispatch({
            type: actionTypes.CONTACTS_MODAL_ID,
            contact_modal_id: id,
        });
    }
    const refresh = async (data) => {
        try {
            setOption(null);
            props.changeIsLoading(true);
            await AutomationServices.refreshHistory(data);
            setTimeout(() => {
                props.fetchHistory();
            }, 500);
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            props.changeIsLoading(false);
        }

    }

    const toggleDetails = (index) => {
        setTogOption(index !== togOption ? index : null);
    };

    return (
        <Fragment>
            <div className="tabBodyInner">
                <div className="overviewFilter auto_history">
                    <div className="formBody">
                        <div className="formField">
                            <p>From</p>
                            <div className="inFormField">
                                {/* <input
                                    type="date"
                                    name='fromdate'
                                    max={moment().format('YYYY-MM-DD')}
                                    // onChange={handleFromDate}
                                    placeholder="dd/mm/yyyy"
                                    // value={filterData.fromDate}
                                /> */}
                                {console.log("DATE---------------------", timezoneOffset)}
                                <DatePicker 
                                    style={{width:"133px"}}
                                    className="cmnFeldStyle autoHistoryDateInput"
                                    selected={date === undefined ? new Date() : date}
                                    format="dd/MM/yyyy"
                                    dateFormat="dd/MM/yyyy"
                                    placeholder="mm/dd/yyyy"
                                    onChange={(e) => setStartDate(e)} 
                                    maxDate={new Date()}
                                />
                            </div>
                        </div>
                        <div className="formField">
                            <p>To</p>
                            <div className="inFormField">
                                {/* <input type="date"
                                    name='todate'
                                    min={filterData.fromDate}
                                    max={moment().format('YYYY-MM-DD')}
                                    disabled={(filterData.fromDate) ? false : true}
                                    onChange={handletoDate}
                                    value={(filterData.fromDate) ? filterData.toDate : ''}
                                    placeholder="dd/mm/yyyy" /> */}

                                    <DatePicker 
                                        className="cmnFieldStyle autoHistoryDateInput"
                                        selected={date2 === undefined ? new Date() : date2}
                                        disabled={(filterData.fromDate) ? false : true}
                                        format="dd/MM/yyyy"
                                        dateFormat="dd/MM/yyyy"
                                        placeholder="mm/dd/yyyy"
                                        onChange={(e) => setEndDate(e)} 
                                        minDate={new Date(date)}
                                        maxDate={moment().format('YYYY-MM-DD')}
                                    />
                            </div>
                        </div>
                        <div className="formField selectStatusOverview">
                            <div className="inFormField">
                                <select onChange={handleStatus} value={filterData.status} style={{ backgroundImage: "url(" + arrowDown + ")" }}>
                                    <option value="">Select status</option>
                                    <option value="Initialized">In-Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </div>
                        </div>

                        <button className="btn btn-dBlue btn-Overviewfilter"
                            onClick={handleApplyFilter}>
                            Apply Filter
                            <img className="" src={arrow_forward} alt="" />
                        </button>
                    </div>
                </div>

                <div className="overviewTable">
                    <div className="listHead auto_history">
                        <div className="listCell cellWidth_20">
                            Contact Details
                        </div>
                        {/*<div className="listCell cellWidth_45">
                            Stages Completed
                        </div>*/}
                        <div className="listCell cellWidth_20">Status</div>
                        <div className="listCell cellWidth_15">
                            Created Date
                        </div>
                        <div className="listCell cellWidth_15">
                            Completed Date
                        </div>
                        <div className="listCell cellWidth_5">
                            &nbsp;
                        </div>
                    </div>

                    {automationHistory.length > 0 ?
                        automationHistory.map((elem, i) => {
                            return (
                                <>
                                    {/* {console.log(elem)} */}
                                    <div className={togOption === i ? "listRow opened" : "listRow"} key={"automation_history_" + i} >
                                        <div className="listCell cellWidth_20">
                                            <figure
                                                className="contactImage"
                                                style={{
                                                    backgroundImage:
                                                        "url(" +
                                                        (elem.contactDisplay
                                                            ? elem.contactDisplay
                                                            : owner_img_1) +
                                                        ")",
                                                }}
                                                onClick={() => openContactModal(elem.contactId)}
                                            ></figure>
                                            <p onClick={() => openContactModal(elem.contactId)}>{elem.firstName || elem.lastName ? (elem.firstName || "-") + " " + (elem.lastName || "") :
                                                (elem.phone && elem.phone.full_number ? elem.phone.full_number : elem.email)}</p>
                                        </div>
                                        {/*<div className="listCell cellWidth_45">
                                            <span>
                                                {(elem.completedEvents ? elem.completedEvents.length + 1 : 1)} of {totalSteps}
                                            </span>
                                            <div className="progressBar">
                                                <div className="bar">
                                                    <div
                                                        className="fill"
                                                        style={{
                                                            width:
                                                                ((elem.completedEvents ? elem.completedEvents.length + 1 : 1) /
                                                                    totalSteps) *
                                                                100 +
                                                                "%",
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                        </div>*/}
                                        <div className="listCell cellWidth_20" onClick={() => toggleDetails(i)}>
                                            <span
                                                style={{
                                                    color:
                                                        (elem.automationStatus.toLowerCase() === "failed")
                                                            ? "#ED707A"
                                                            : elem.automationStatus.toLowerCase() === "initialized"
                                                                ? "#FF9D00"
                                                                : (togOption === i ? "#305671" : "#46D35C"),
                                                }}
                                            >
                                                {(elem.automationStatus.toLowerCase() === 'initialized') ? 'In-Progress' : elem.automationStatus}
                                            </span>
                                        </div>
                                        <div className="listCell cellWidth_15" onClick={() => toggleDetails(i)}>
                                            {/* {utils.convertUTCToTimezone(elem.createdAt, timezone, "LLL")} */}
                                            {/* {moment(elem.createdAt).format("YYYY-MM-DD")}  */}
                                            {utils.convertUTCToTimezone(elem.createdAt,timezoneOffset)
                                            //.split(" ").splice(0,3).join(" ")
                                            }
                                            
                                        </div>
                                        <div className="listCell cellWidth_15" onClick={() => toggleDetails(i)}>
                                            {/* {(elem?.completedAt) ? utils.convertUTCToTimezone(elem?.completedAt, timezone, "LLL") : "-"} */}
                                            {/* {(elem ?.completedAt) ? moment(elem.completedAt).format("YYYY-MM-DD") : "-"} */}
                                            {(elem ?.completedAt) ? utils.convertUTCToTimezone(elem.completedAt,timezoneOffset)
                                            //.split(" ").splice(0,3).join(" ") 
                                            : "-"}

                                        </div>
                                        <div className="listCell cellWidth_5">
                                            <div className="info_3dot_icon">
                                                <button
                                                    className="btn"
                                                    onClick={() => toggleOptions(i)}
                                                >
                                                    <img src={info_3dot_icon} alt="" />
                                                </button>
                                            </div>
                                            <React.Fragment key={i + "_fragment"}>
                                                <div
                                                    className={
                                                        option === i ? "dropdownOptions listOpen" : "listHide"
                                                    }
                                                >
                                                    <button className="btn btnEdit"
                                                        onClick={() => refresh(elem._id)}>
                                                        <span>

                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g clip-path="url(#clip0_2293_1014)">
                                                                    <path d="M8.76509 15.9551C11.9747 15.5956 14.5469 13.0299 14.913 9.82031C15.3934 5.62366 12.1316 2.05128 8.04277 2.00552V0.12291C8.04277 0.0183201 7.91203 -0.037243 7.82378 0.0281254L3.94743 2.87492C3.88207 2.92395 3.88207 3.01873 3.94743 3.06776L7.82378 5.91455C7.91203 5.97992 8.04277 5.92109 8.04277 5.81977V3.94043C10.9157 3.98618 13.2167 6.43096 13.0206 9.35293C12.8539 11.8663 10.8046 13.9058 8.29117 14.066C5.6274 14.236 3.36239 12.3337 2.9571 9.81705C2.88193 9.34966 2.47338 9.00975 2.00272 9.00975C1.41768 9.00975 0.960097 9.52942 1.05161 10.1079C1.62032 13.6934 4.93123 16.3833 8.76509 15.9551Z" fill="#9BAEBC" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_2293_1014">
                                                                        <rect width="16" height="16" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>

                                                        </span>
                                                        Refresh
                                                    </button>
                                                </div>
                                            </React.Fragment>
                                        </div>
                                    </div>
                                    <div className={togOption === i ? "dropdownAutoHistory listOpen" : "dropdownAutoHistory listHide"}>
                                        <div className='autoIconDetails'>
                                            <div className='imgHolder'>
                                                {(() => {
                                                    switch (trigger) {
                                                        case 'trigger':
                                                            return (
                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="#5570C9" />
                                                                    <path d="M50.2061 30.1563C48.288 30.1475 46.4165 30.747 44.8605 31.8686C43.3046 32.9902 42.1442 34.5763 41.5463 36.3988C40.9484 38.2213 40.9437 40.1864 41.5328 42.0118C42.1219 43.8372 43.2746 45.4288 44.8251 46.5579L40.3172 53.9897L40.2108 53.9659C39.3916 53.7452 38.5211 53.8155 37.7479 54.1647C36.9746 54.514 36.3464 55.1206 35.9703 55.8812C35.5943 56.6417 35.4936 57.5092 35.6855 58.3357C35.8774 59.1622 36.35 59.8965 37.0228 60.4136C37.6955 60.9306 38.5267 61.1983 39.3748 61.1711C40.2228 61.1439 41.0351 60.8234 41.6733 60.2643C42.3115 59.7052 42.7361 58.9421 42.8746 58.105C43.0132 57.2679 42.8571 56.4087 42.4331 55.6738C42.2723 55.4148 42.081 55.176 41.8632 54.9627L46.8172 46.8183L47.3013 46.0246L46.5077 45.569C45.4029 44.9223 44.4876 43.9965 43.8535 42.8844C43.2195 41.7723 42.8889 40.513 42.895 39.2329C42.9012 37.9528 43.2437 36.6967 43.8884 35.5908C44.5331 34.4848 45.4572 33.5678 46.5681 32.9316C47.679 32.2955 48.9377 31.9626 50.2178 31.9663C51.4979 31.97 52.7546 32.3102 53.8618 32.9528C54.969 33.5954 55.8877 34.5178 56.526 35.6275C57.1642 36.7372 57.4995 37.9952 57.4981 39.2754C57.5012 39.9995 57.3942 40.7199 57.1807 41.4119L58.9188 41.9516C59.1856 41.0847 59.3199 40.1824 59.3172 39.2754C59.3155 36.8588 58.3553 34.5415 56.6472 32.8319C54.9391 31.1224 52.6227 30.1601 50.2061 30.1563ZM50.2061 35.623C49.6837 35.6139 49.1655 35.7169 48.6864 35.9252C48.2072 36.1336 47.7784 36.4423 47.4289 36.8306C47.0793 37.2188 46.8172 37.6776 46.6601 38.1759C46.5031 38.6742 46.4548 39.2003 46.5186 39.7189C46.5824 40.2374 46.7567 40.7362 47.0298 41.1816C47.3029 41.627 47.6684 42.0086 48.1016 42.3006C48.5348 42.5926 49.0256 42.7882 49.5409 42.8742C50.0563 42.9602 50.584 42.9347 51.0886 42.7992L55.4727 50.7436L55.8997 51.5373L56.7251 51.1103C57.796 50.5127 59.002 50.1991 60.2283 50.1992C61.4223 50.199 62.598 50.4921 63.6522 51.0527C64.7064 51.6133 65.6067 52.4242 66.2742 53.4141C66.9417 54.4041 67.3558 55.5429 67.4801 56.7303C67.6045 57.9178 67.4353 59.1177 66.9874 60.2244C66.5395 61.3312 65.8267 62.3111 64.9115 63.0779C63.9963 63.8447 62.9068 64.375 61.7387 64.6222C60.5706 64.8694 59.3597 64.8259 58.2123 64.4956C57.065 64.1653 56.0163 63.5582 55.1584 62.7278L53.9061 64.0389C54.979 65.0743 56.2897 65.8304 57.7232 66.2409C59.1566 66.6514 60.6689 66.7037 62.1272 66.3932C63.5856 66.0827 64.9454 65.4189 66.0873 64.4601C67.2292 63.5013 68.1183 62.2769 68.6764 60.8942C69.2345 59.5116 69.4447 58.013 69.2884 56.5302C69.1321 55.0474 68.6141 53.6256 67.78 52.3897C66.9459 51.1538 65.8211 50.1416 64.5044 49.4419C63.1877 48.7423 61.7193 48.3766 60.2283 48.377C59.0093 48.3987 57.8076 48.6688 56.6965 49.1706L52.6823 41.9167C53.22 41.4209 53.5953 40.7741 53.759 40.0612C53.9226 39.3484 53.8668 38.6027 53.599 37.922C53.3312 37.2414 52.8639 36.6576 52.2584 36.2473C51.6529 35.8371 50.9375 35.6194 50.2061 35.623ZM37.0505 48.6389C35.423 49.0244 33.933 49.8507 32.744 51.0271C31.555 52.2035 30.7129 53.6846 30.3101 55.3079C29.9073 56.9313 29.9592 58.6343 30.4603 60.23C30.9613 61.8258 31.8922 63.2528 33.1507 64.3545C34.4091 65.4562 35.9467 66.1901 37.5948 66.4757C39.2428 66.7613 40.9376 66.5876 42.4935 65.9736C44.0493 65.3596 45.406 64.329 46.4148 62.9949C47.4236 61.6607 48.0455 60.0746 48.2124 58.4103H56.7267C56.9485 59.2709 57.4766 60.0211 58.212 60.5201C58.9474 61.0191 59.8395 61.2328 60.7212 61.121C61.6028 61.0092 62.4135 60.5797 63.001 59.9129C63.5886 59.2461 63.9128 58.3879 63.9128 57.4992C63.9128 56.6105 63.5886 55.7523 63.001 55.0855C62.4135 54.4187 61.6028 53.9892 60.7212 53.8774C59.8395 53.7656 58.9474 53.9793 58.212 54.4783C57.4766 54.9773 56.9485 55.7275 56.7267 56.5881H46.568V57.4992C46.5705 58.8662 46.1887 60.2064 45.4661 61.3668C44.7434 62.5272 43.7091 63.461 42.4811 64.0617C41.2532 64.6624 39.881 64.9058 38.5214 64.764C37.1618 64.6222 35.8694 64.1011 34.7918 63.2599C33.7141 62.4188 32.8947 61.2917 32.427 60.0072C31.9593 58.7227 31.8622 57.3325 32.1467 55.9954C32.4312 54.6584 33.0859 53.4282 34.0361 52.4454C34.9863 51.4626 36.1936 50.7668 37.5204 50.4373L37.0505 48.6389Z" fill="white" />
                                                                </svg>
                                                            );
                                                        case 'appointmentTrigger':
                                                            return (
                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63Z" fill="#5570C9" />
                                                                    <path d="M42 21H21.001V41.999H42V21Z" stroke="#C1CDE2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M25.5289 28.7891H23.043V31.275H25.5289V28.7891Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M32.5182 28.7891H30.0322V31.275H32.5182V28.7891Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M39.5065 28.7891H37.0205V31.275H39.5065V28.7891Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M25.5289 35.6797H23.043V38.1656H25.5289V35.6797Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M32.5182 35.6797H30.0322V38.1656H32.5182V35.6797Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M39.5065 35.6797H37.0205V38.1656H39.5065V35.6797Z" stroke="#C1CDE2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M42 25H21V42H42V25Z" stroke="#C1CDE2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                            );
                                                        case 'fieldActionTrigger':
                                                            return (
                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63Z" fill="#007EDB" />
                                                                    <path d="M44.735 28.0291H19V20.7561C19.0005 20.3113 19.1775 19.8848 19.4921 19.5702C19.8066 19.2556 20.2331 19.0787 20.678 19.0781H43.057C43.5019 19.0787 43.9284 19.2556 44.2429 19.5702C44.5575 19.8848 44.7345 20.3113 44.735 20.7561V28.0291ZM20.119 26.9101H43.619V20.7561C43.619 20.6076 43.56 20.4652 43.455 20.3601C43.35 20.2551 43.2075 20.1961 43.059 20.1961H20.678C20.5295 20.1961 20.387 20.2551 20.282 20.3601C20.177 20.4652 20.118 20.6076 20.118 20.7561L20.119 26.9101ZM43.057 44.3941H20.678C20.2331 44.3936 19.8066 44.2166 19.4921 43.9021C19.1775 43.5875 19.0005 43.161 19 42.7161V29.8481H44.735V42.7151C44.7345 43.1603 44.5574 43.587 44.2426 43.9018C43.9279 44.2165 43.5011 44.3936 43.056 44.3941H43.057ZM20.119 30.9671V42.7151C20.119 42.8636 20.178 43.0061 20.283 43.1111C20.388 43.2161 20.5305 43.2751 20.679 43.2751H43.057C43.2055 43.2751 43.348 43.2161 43.453 43.1111C43.558 43.0061 43.617 42.8636 43.617 42.7151V30.9671H20.119Z" fill="white" stroke="white" stroke-width="0.3" />
                                                                    <path d="M40.2601 25.2326C40.1733 25.2326 40.0877 25.2124 40.0101 25.1735C39.9325 25.1346 39.865 25.0781 39.8131 25.0086L38.1351 22.7706C38.046 22.6519 38.0077 22.5027 38.0286 22.3558C38.0495 22.2088 38.1279 22.0762 38.2466 21.9871C38.3653 21.898 38.5145 21.8597 38.6614 21.8806C38.8084 21.9015 38.941 21.9799 39.0301 22.0986L40.2611 23.7396L41.4921 22.0986C41.5812 21.9799 41.7138 21.9015 41.8608 21.8806C42.0077 21.8597 42.1569 21.898 42.2756 21.9871C42.3943 22.0762 42.4727 22.2088 42.4936 22.3558C42.5145 22.5027 42.4762 22.6519 42.3871 22.7706L40.7091 25.0086C40.657 25.0784 40.5892 25.135 40.5112 25.1739C40.4332 25.2128 40.3472 25.2329 40.2601 25.2326ZM32.1481 24.1136H23.1971C23.0528 24.1075 22.9164 24.0459 22.8165 23.9416C22.7166 23.8374 22.6608 23.6985 22.6608 23.5541C22.6608 23.4097 22.7166 23.2708 22.8165 23.1666C22.9164 23.0623 23.0528 23.0007 23.1971 22.9946H32.1481C32.2236 22.9914 32.2989 23.0035 32.3696 23.0302C32.4402 23.0569 32.5048 23.0976 32.5593 23.1499C32.6138 23.2021 32.6572 23.2649 32.6868 23.3343C32.7165 23.4038 32.7318 23.4786 32.7318 23.5541C32.7318 23.6296 32.7165 23.7044 32.6868 23.7739C32.6572 23.8433 32.6138 23.9061 32.5593 23.9584C32.5048 24.0106 32.4402 24.0513 32.3696 24.078C32.2989 24.1047 32.2236 24.1168 32.1481 24.1136ZM35.7851 34.8836H22.3571C22.2816 34.8868 22.2063 34.8747 22.1357 34.848C22.065 34.8213 22.0004 34.7806 21.9459 34.7284C21.8914 34.6761 21.848 34.6133 21.8184 34.5439C21.7887 34.4744 21.7734 34.3996 21.7734 34.3241C21.7734 34.2486 21.7887 34.1738 21.8184 34.1044C21.848 34.0349 21.8914 33.9721 21.9459 33.9198C22.0004 33.8676 22.065 33.8269 22.1357 33.8002C22.2063 33.7735 22.2816 33.7614 22.3571 33.7646H35.7841C35.9284 33.7707 36.0648 33.8323 36.1647 33.9366C36.2646 34.0408 36.3204 34.1797 36.3204 34.3241C36.3204 34.4685 36.2646 34.6074 36.1647 34.7116C36.0648 34.8159 35.9284 34.8775 35.7841 34.8836H35.7851ZM41.3801 40.4786H22.3571C22.2816 40.4818 22.2063 40.4697 22.1357 40.443C22.065 40.4163 22.0004 40.3756 21.9459 40.3234C21.8914 40.2711 21.848 40.2083 21.8184 40.1389C21.7887 40.0694 21.7734 39.9946 21.7734 39.9191C21.7734 39.8436 21.7887 39.7688 21.8184 39.6994C21.848 39.6299 21.8914 39.5671 21.9459 39.5148C22.0004 39.4626 22.065 39.4219 22.1357 39.3952C22.2063 39.3685 22.2816 39.3564 22.3571 39.3596H41.3791C41.5234 39.3657 41.6598 39.4273 41.7597 39.5316C41.8596 39.6358 41.9154 39.7747 41.9154 39.9191C41.9154 40.0635 41.8596 40.2024 41.7597 40.3066C41.6598 40.4109 41.5234 40.4725 41.3791 40.4786H41.3801Z" fill="white" stroke="white" stroke-width="0.3" />
                                                                </svg>
                                                            );
                                                        case 'transactionTrigger':
                                                            return (
                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63Z" fill="#27C9B0" />
                                                                    <path d="M36.4973 41.8067C34.11 42.9687 31.3936 43.2659 28.8116 42.6475C26.2297 42.0291 23.9424 40.5334 22.3402 38.4158C20.738 36.2983 19.9202 33.6901 20.0266 31.0366C20.1329 28.383 21.1567 25.8487 22.9232 23.8662L22.6105 25.4872C22.5829 25.6254 22.6113 25.769 22.6895 25.8863C22.7676 26.0036 22.8892 26.085 23.0274 26.1127C23.1656 26.1403 23.3091 26.1119 23.4264 26.0337C23.5436 25.9555 23.625 25.8339 23.6527 25.6957C24.1008 23.4544 24.3145 22.3546 24.3092 22.4068C24.3223 22.3313 24.3185 22.2539 24.2982 22.18C24.2779 22.1061 24.2416 22.0377 24.1919 21.9794C24.1421 21.9212 24.0802 21.8747 24.0104 21.8431C23.9406 21.8116 23.8647 21.7958 23.7882 21.7969L20.4532 21.8751C20.3151 21.8751 20.1825 21.93 20.0848 22.0278C19.9871 22.1255 19.9322 22.2581 19.9322 22.3963C19.9322 22.5346 19.9871 22.6671 20.0848 22.7649C20.1825 22.8626 20.3151 22.9176 20.4532 22.9176L22.4386 22.8706C20.4219 24.9943 19.2142 27.7585 19.0259 30.6815C18.8376 33.6045 19.6807 36.5008 21.4082 38.8658C23.1358 41.2308 25.6382 42.9145 28.4794 43.6233C31.3205 44.3322 34.3203 44.0213 36.9559 42.7449C37.0802 42.684 37.1754 42.5763 37.2203 42.4453C37.2653 42.3143 37.2564 42.1708 37.1956 42.0464C37.1348 41.922 37.027 41.8269 36.8961 41.7819C36.7651 41.7369 36.6217 41.7458 36.4973 41.8067Z" fill="#98FFEF" stroke="#98FFEF" stroke-width="0.3" />
                                                                    <path d="M42.4949 40.0939L40.5096 40.1408C48.1434 32.2026 42.4115 19 31.4688 19C29.567 18.9965 27.6898 19.4298 25.9818 20.2666C25.9197 20.2961 25.8641 20.3377 25.8181 20.3889C25.7721 20.4401 25.7367 20.4998 25.7139 20.5648C25.6912 20.6297 25.6815 20.6985 25.6854 20.7672C25.6894 20.8359 25.7069 20.9031 25.7369 20.965C26.258 21.9606 27.3002 20.0425 31.4688 20.0425C41.2964 20.0425 46.6323 31.7543 40.0146 39.1453L40.3272 37.5243C40.3548 37.386 40.3264 37.2425 40.2483 37.1252C40.1701 37.0079 40.0485 36.9265 39.9103 36.8988C39.7721 36.8712 39.6286 36.8996 39.5114 36.9778C39.3941 37.056 39.3127 37.1776 39.285 37.3158C38.5712 40.8862 38.6024 40.6777 38.6389 40.8288C38.7796 41.3501 38.988 41.2198 42.4897 41.1364C42.5581 41.1367 42.6259 41.1236 42.6893 41.0977C42.7526 41.0718 42.8103 41.0337 42.8589 40.9855C42.9075 40.9374 42.9462 40.8801 42.9727 40.817C42.9992 40.7539 43.013 40.6862 43.0134 40.6177C43.0137 40.5493 43.0006 40.4814 42.9747 40.4181C42.9488 40.3547 42.9107 40.2971 42.8626 40.2484C42.8144 40.1998 42.7572 40.1611 42.6941 40.1346C42.631 40.1081 42.5633 40.0943 42.4949 40.0939Z" fill="#98FFEF" stroke="#98FFEF" stroke-width="0.3" />
                                                                    <path d="M27.8211 30.4677H29.9054C30.0436 30.4677 30.1761 30.4128 30.2738 30.315C30.3716 30.2173 30.4265 30.0847 30.4265 29.9465C30.4265 29.8082 30.3716 29.6757 30.2738 29.5779C30.1761 29.4802 30.0436 29.4253 29.9054 29.4253H28.8632V28.904C28.8632 28.7658 28.8083 28.6332 28.7106 28.5355C28.6129 28.4377 28.4803 28.3828 28.3421 28.3828C28.2039 28.3828 28.0714 28.4377 27.9737 28.5355C27.876 28.6332 27.8211 28.7658 27.8211 28.904V29.4253C27.4065 29.4253 27.0088 29.59 26.7157 29.8832C26.4225 30.1765 26.2578 30.5742 26.2578 30.9889C26.2578 31.4036 26.4225 31.8014 26.7157 32.0946C27.0088 32.3879 27.4065 32.5526 27.8211 32.5526H28.8632C29.0014 32.5526 29.134 32.6075 29.2317 32.7053C29.3294 32.803 29.3843 32.9356 29.3843 33.0738C29.3843 33.2121 29.3294 33.3446 29.2317 33.4424C29.134 33.5401 29.0014 33.595 28.8632 33.595H26.7789C26.6407 33.595 26.5082 33.65 26.4104 33.7477C26.3127 33.8455 26.2578 33.978 26.2578 34.1163C26.2578 34.2545 26.3127 34.3871 26.4104 34.4848C26.5082 34.5826 26.6407 34.6375 26.7789 34.6375H27.8211V35.1587C27.8211 35.2969 27.876 35.4295 27.9737 35.5273C28.0714 35.625 28.2039 35.6799 28.3421 35.6799C28.4803 35.6799 28.6129 35.625 28.7106 35.5273C28.8083 35.4295 28.8632 35.2969 28.8632 35.1587V34.6375C29.2778 34.6375 29.6754 34.4727 29.9686 34.1795C30.2618 33.8863 30.4265 33.4885 30.4265 33.0738C30.4265 32.6591 30.2618 32.2614 29.9686 31.9681C29.6754 31.6749 29.2778 31.5101 28.8632 31.5101H27.8211C27.6829 31.5101 27.5503 31.4552 27.4526 31.3575C27.3549 31.2597 27.3 31.1272 27.3 30.9889C27.3 30.8507 27.3549 30.7181 27.4526 30.6204C27.5503 30.5226 27.6829 30.4677 27.8211 30.4677Z" fill="#98FFEF" stroke="#98FFEF" stroke-width="0.3" />
                                                                    <path d="M36.94 24.2109H31.2082C30.8627 24.2109 30.5313 24.3482 30.287 24.5926C30.0427 24.837 29.9055 25.1684 29.9055 25.514V26.52C29.0341 26.2699 28.1159 26.2301 27.2262 26.4039C26.3365 26.5776 25.5007 26.96 24.7874 27.5196C24.0741 28.0792 23.5037 28.8 23.1229 29.6229C22.7421 30.4457 22.5619 31.3472 22.5971 32.2533C22.6322 33.1594 22.8817 34.0442 23.325 34.8351C23.7684 35.626 24.3929 36.3004 25.1474 36.8031C25.9019 37.3057 26.7648 37.6221 27.6653 37.7264C28.5658 37.8307 29.4782 37.7199 30.3275 37.4031C30.8486 37.8878 30.7131 37.7627 36.94 37.7627C37.2855 37.7627 37.6169 37.6254 37.8612 37.3811C38.1055 37.1367 38.2427 36.8053 38.2427 36.4597C38.2427 34.6927 38.3001 34.5416 37.977 34.1142C38.3105 33.6711 38.2427 33.4574 38.2427 31.7687C38.2401 31.4863 38.147 31.2123 37.977 30.9868C38.147 30.7614 38.2401 30.4873 38.2427 30.205C38.2427 28.4381 38.3001 28.2869 37.977 27.8595C38.3105 27.4165 38.2427 27.2028 38.2427 25.514C38.2414 25.1688 38.1037 24.8382 37.8597 24.5941C37.6157 24.35 37.2851 24.2123 36.94 24.2109ZM30.9476 25.514C30.949 25.4453 30.9768 25.3798 31.0254 25.3312C31.074 25.2826 31.1395 25.2547 31.2082 25.2534H36.94C37.284 25.2534 37.2006 25.5296 37.2006 27.0777C37.1993 27.1464 37.1714 27.2119 37.1228 27.2605C37.0742 27.3091 37.0087 27.3369 36.94 27.3383C30.5464 27.3383 32.0106 27.4738 30.9476 26.9265V25.514ZM37.2006 28.6413V30.205C37.1993 30.2737 37.1714 30.3392 37.1228 30.3878C37.0742 30.4364 37.0087 30.4643 36.94 30.4656H33.85C33.635 29.7028 33.2642 28.9929 32.761 28.3807H36.9296C36.9645 28.38 36.9992 28.3862 37.0317 28.3989C37.0642 28.4117 37.0939 28.4307 37.1191 28.4549C37.1442 28.4791 37.1644 28.508 37.1784 28.54C37.1924 28.572 37.1999 28.6064 37.2006 28.6413ZM37.2006 31.7687V33.3323C37.1993 33.401 37.1714 33.4666 37.1228 33.5151C37.0742 33.5637 37.0087 33.5916 36.94 33.5929H33.85C34.0585 32.919 34.1346 32.211 34.0741 31.5081H36.94C37.0087 31.5094 37.0742 31.5373 37.1228 31.5859C37.1714 31.6345 37.1993 31.7 37.2006 31.7687ZM23.6525 32.0293C23.6525 31.1015 23.9275 30.1945 24.4429 29.4231C24.9582 28.6517 25.6906 28.0504 26.5475 27.6954C27.4045 27.3403 28.3474 27.2474 29.2571 27.4284C30.1669 27.6094 31.0025 28.0562 31.6583 28.7122C32.3142 29.3683 32.7609 30.2041 32.9418 31.1141C33.1228 32.0241 33.0299 32.9673 32.675 33.8244C32.32 34.6816 31.7189 35.4143 30.9477 35.9297C30.1765 36.4452 29.2698 36.7203 28.3422 36.7203C27.0984 36.7203 25.9056 36.2261 25.0261 35.3463C24.1466 34.4666 23.6525 33.2734 23.6525 32.0293ZM37.2006 36.4597C37.1993 36.5284 37.1714 36.5939 37.1228 36.6425C37.0742 36.6911 37.0087 36.7189 36.94 36.7203H31.625C32.3906 36.1824 33.0146 35.467 33.4436 34.6354H36.94C37.0087 34.6367 37.0742 34.6646 37.1228 34.7132C37.1714 34.7618 37.1993 34.8273 37.2006 34.896V36.4597Z" fill="#98FFEF" stroke="#98FFEF" stroke-width="0.3" />
                                                                </svg>
                                                            );
                                                        case 'attendanceTrigger':
                                                            return (
                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63Z" fill="#DE3A48" />
                                                                    <path d="M36.85 21.5219V21.6719H37H39.4C40.3125 21.6719 41.1893 22.0528 41.8369 22.7333C42.4848 23.4141 42.85 24.339 42.85 25.3048V40.4364C42.85 41.4022 42.4848 42.3271 41.8369 43.0079C41.204 43.673 40.3395 43.85 39.4 43.85H31H22.6C21.6605 43.85 20.796 43.673 20.1631 43.0079C19.5152 42.3271 19.15 41.4022 19.15 40.4364V25.3048C19.15 24.339 19.5152 23.4141 20.1631 22.7333C20.8107 22.0528 21.6875 21.6719 22.6 21.6719H25H25.15V21.5219V20.261C25.15 19.964 25.2623 19.6806 25.4601 19.4727C25.6577 19.2651 25.924 19.15 26.2 19.15C26.476 19.15 26.7423 19.2651 26.9399 19.4727C27.1377 19.6806 27.25 19.964 27.25 20.261V21.5219V21.6719H27.4H34.6H34.75V21.5219V20.261C34.75 19.964 34.8623 19.6806 35.0601 19.4727C35.2577 19.2651 35.524 19.15 35.8 19.15C36.076 19.15 36.3423 19.2651 36.5399 19.4727C36.7377 19.6806 36.85 19.964 36.85 20.261V21.5219ZM40.75 28.9377V25.3048C40.75 24.9329 40.6095 24.5749 40.3572 24.3098C40.1047 24.0444 39.7605 23.8939 39.4 23.8939H37H36.85V24.0439V25.3048C36.85 25.6018 36.7377 25.8852 36.5399 26.0931C36.3423 26.3006 36.076 26.4158 35.8 26.4158C35.524 26.4158 35.2577 26.3006 35.0601 26.0931C34.8623 25.8852 34.75 25.6018 34.75 25.3048V24.0439V23.8939H34.6H27.4H27.25V24.0439V25.3048C27.25 25.6018 27.1377 25.8852 26.9399 26.0931C26.7423 26.3006 26.476 26.4158 26.2 26.4158C25.924 26.4158 25.6577 26.3006 25.4601 26.0931C25.2623 25.8852 25.15 25.6018 25.15 25.3048V24.0439V23.8939H25H22.6C22.2395 23.8939 21.8953 24.0444 21.6428 24.3098C21.3905 24.5749 21.25 24.9329 21.25 25.3048V28.9377V29.0877V29.2377V40.4364C21.25 40.8083 21.3905 41.1663 21.6428 41.4314C21.8953 41.6968 22.2395 41.8474 22.6 41.8474H39.4C39.7605 41.8474 40.1047 41.6968 40.3572 41.4314C40.6095 41.1663 40.75 40.8083 40.75 40.4364V29.2377V29.0877V28.9377Z" fill="#FFBCBC" stroke="#DE3A48" stroke-width="0.3" />
                                                                    <path d="M34.205 35.8637C34.8277 35.2 35.2498 34.3578 35.4181 33.443C35.5864 32.5281 35.4935 31.5814 35.1509 30.7219C34.8084 29.8623 34.2316 29.1283 33.493 28.612C32.7544 28.0958 31.887 27.8203 30.9998 27.8203C30.1126 27.8203 29.2452 28.0958 28.5066 28.612C27.768 29.1283 27.1912 29.8623 26.8487 30.7219C26.5062 31.5814 26.4132 32.5281 26.5815 33.443C26.7498 34.3578 27.1719 35.2 27.7947 35.8637C26.6191 36.349 25.6097 37.1943 24.8973 38.2897C24.1849 39.3851 23.8026 40.6801 23.7998 42.0067C23.7997 42.1308 23.823 42.2538 23.8682 42.3685C23.9134 42.4832 23.9797 42.5874 24.0633 42.6752C24.1468 42.763 24.2461 42.8326 24.3553 42.8801C24.4645 42.9276 24.5816 42.952 24.6998 42.9519H37.2998C37.418 42.952 37.5351 42.9276 37.6443 42.8801C37.7535 42.8326 37.8528 42.763 37.9364 42.6752C38.0199 42.5874 38.0862 42.4832 38.1314 42.3685C38.1766 42.2538 38.1999 42.1308 38.1998 42.0067C38.1971 40.6801 37.8147 39.3851 37.1023 38.2897C36.3899 37.1943 35.3805 36.349 34.205 35.8637ZM30.9998 29.7189C31.5338 29.7189 32.0558 29.8852 32.4998 30.1968C32.9439 30.5084 33.2899 30.9512 33.4943 31.4694C33.6986 31.9875 33.7521 32.5577 33.6479 33.1077C33.5437 33.6578 33.2866 34.1631 32.909 34.5596C32.5314 34.9562 32.0503 35.2263 31.5265 35.3357C31.0028 35.4451 30.4599 35.3889 29.9666 35.1743C29.4732 34.9597 29.0515 34.5962 28.7548 34.1299C28.4582 33.6636 28.2998 33.1154 28.2998 32.5545C28.3006 31.8027 28.5853 31.082 29.0915 30.5503C29.5977 30.0187 30.284 29.7197 30.9998 29.7189ZM25.5448 42.019C25.5448 40.3743 26.4514 39.0363 27.2547 38.3477C28.058 37.659 29.0628 37.2821 30.0998 37.2806H31.8998C32.9368 37.2821 33.9416 37.659 34.7449 38.3477C35.5482 39.0363 36.4539 40.3743 36.4539 42.019H25.5448Z" fill="#FFBCBC" />
                                                                </svg>
                                                            );
                                                        case 'tagTrigger':
                                                            return (
                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63Z" fill="#2DB6FF" />
                                                                    {/* <g clip-path="url(#clip0_28632_22927)"> */}
                                                                    <path d="M27.9676 43.3265L27.8969 43.3972L27.9676 43.3265L20.6657 36.0142C20.6657 36.0142 20.6657 36.0142 20.6657 36.0142C19.6367 34.9832 19.6367 33.3053 20.6657 32.2745L20.6657 32.2745L30.5088 22.4125L30.438 22.3419L30.5088 22.4125C31.5044 21.415 32.8286 20.8656 34.2383 20.8656H40.4832C41.9423 20.8656 43.1298 22.0528 43.1298 23.5122V29.7379C43.1298 31.1466 42.581 32.4703 41.5844 33.4658L31.7108 43.3291C31.7108 43.3291 31.7107 43.3291 31.7107 43.3291C31.2108 43.8284 30.5468 44.1031 29.8404 44.1031H29.8403H29.8403H29.8403H29.8403H29.8403H29.8403H29.8402H29.8402H29.8402H29.8402H29.8402H29.8401H29.8401H29.8401H29.8401H29.8401H29.8401H29.84H29.84H29.84H29.84H29.84H29.84H29.8399H29.8399H29.8399H29.8399H29.8399H29.8399H29.8398H29.8398H29.8398H29.8398H29.8398H29.8398H29.8397H29.8397H29.8397H29.8397H29.8397H29.8397H29.8397H29.8396H29.8396H29.8396H29.8396H29.8396H29.8396H29.8395H29.8395H29.8395H29.8395H29.8395H29.8395H29.8395H29.8394H29.8394H29.8394H29.8394H29.8394H29.8394H29.8393H29.8393H29.8393H29.8393H29.8393H29.8393H29.8392H29.8392H29.8392H29.8392H29.8392H29.8392H29.8391H29.8391H29.8391H29.8391H29.8391H29.8391H29.839H29.839H29.839H29.839H29.839H29.839H29.839H29.8389H29.8389H29.8389H29.8389H29.8389H29.8389H29.8388H29.8388H29.8388H29.8388H29.8388H29.8388H29.8387H29.8387H29.8387H29.8387H29.8387H29.8387H29.8386H29.8386H29.8386H29.8386H29.8386H29.8386H29.8385H29.8385H29.8385H29.8385H29.8385H29.8385H29.8384C29.1315 44.1026 28.4673 43.827 27.9676 43.3265ZM21.8201 33.4267L21.8909 33.4973L21.8201 33.4267C21.4251 33.8225 21.4251 34.4659 21.8201 34.8617L21.8201 34.8617L29.122 42.1741C29.3134 42.3658 29.5685 42.4719 29.8397 42.4721H29.8398H29.8405C30.1113 42.4721 30.3665 42.3664 30.558 42.1752L30.5581 42.1752L40.4317 32.3119C41.1197 31.6248 41.4987 30.7102 41.4987 29.7379V23.5122C41.4987 22.9522 41.0433 22.4967 40.4832 22.4967H34.2383C33.2653 22.4967 32.3505 22.8762 31.6633 23.5647L21.8201 33.4267ZM36.5921 29.9582C35.1328 29.9582 33.9455 28.771 33.9455 27.3116C33.9455 25.8523 35.1328 24.6651 36.5921 24.6651C38.0513 24.6651 39.2387 25.8523 39.2387 27.3116C39.2387 28.771 38.0513 29.9582 36.5921 29.9582ZM36.5921 26.2961C36.032 26.2961 35.5766 26.7516 35.5766 27.3116C35.5766 27.8717 36.032 28.3272 36.5921 28.3272C37.1523 28.3272 37.6076 27.8717 37.6076 27.3116C37.6076 26.7516 37.1523 26.2961 36.5921 26.2961Z" fill="#CFEEFF" stroke="#2DB6FF" stroke-width="0.2" />
                                                                    {/* </g> */}
                                                                    {/* <defs>
                                                                        <clipPath id="clip0_28632_22927">
                                                                            <rect width="25" height="25" fill="white" transform="translate(19 20)" />
                                                                        </clipPath>
                                                                    </defs> */}
                                                                </svg>
                                                            );
                                                        default:
                                                            return (
                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z" fill="#5570C9" />
                                                                    <path d="M50.2061 30.1563C48.288 30.1475 46.4165 30.747 44.8605 31.8686C43.3046 32.9902 42.1442 34.5763 41.5463 36.3988C40.9484 38.2213 40.9437 40.1864 41.5328 42.0118C42.1219 43.8372 43.2746 45.4288 44.8251 46.5579L40.3172 53.9897L40.2108 53.9659C39.3916 53.7452 38.5211 53.8155 37.7479 54.1647C36.9746 54.514 36.3464 55.1206 35.9703 55.8812C35.5943 56.6417 35.4936 57.5092 35.6855 58.3357C35.8774 59.1622 36.35 59.8965 37.0228 60.4136C37.6955 60.9306 38.5267 61.1983 39.3748 61.1711C40.2228 61.1439 41.0351 60.8234 41.6733 60.2643C42.3115 59.7052 42.7361 58.9421 42.8746 58.105C43.0132 57.2679 42.8571 56.4087 42.4331 55.6738C42.2723 55.4148 42.081 55.176 41.8632 54.9627L46.8172 46.8183L47.3013 46.0246L46.5077 45.569C45.4029 44.9223 44.4876 43.9965 43.8535 42.8844C43.2195 41.7723 42.8889 40.513 42.895 39.2329C42.9012 37.9528 43.2437 36.6967 43.8884 35.5908C44.5331 34.4848 45.4572 33.5678 46.5681 32.9316C47.679 32.2955 48.9377 31.9626 50.2178 31.9663C51.4979 31.97 52.7546 32.3102 53.8618 32.9528C54.969 33.5954 55.8877 34.5178 56.526 35.6275C57.1642 36.7372 57.4995 37.9952 57.4981 39.2754C57.5012 39.9995 57.3942 40.7199 57.1807 41.4119L58.9188 41.9516C59.1856 41.0847 59.3199 40.1824 59.3172 39.2754C59.3155 36.8588 58.3553 34.5415 56.6472 32.8319C54.9391 31.1224 52.6227 30.1601 50.2061 30.1563ZM50.2061 35.623C49.6837 35.6139 49.1655 35.7169 48.6864 35.9252C48.2072 36.1336 47.7784 36.4423 47.4289 36.8306C47.0793 37.2188 46.8172 37.6776 46.6601 38.1759C46.5031 38.6742 46.4548 39.2003 46.5186 39.7189C46.5824 40.2374 46.7567 40.7362 47.0298 41.1816C47.3029 41.627 47.6684 42.0086 48.1016 42.3006C48.5348 42.5926 49.0256 42.7882 49.5409 42.8742C50.0563 42.9602 50.584 42.9347 51.0886 42.7992L55.4727 50.7436L55.8997 51.5373L56.7251 51.1103C57.796 50.5127 59.002 50.1991 60.2283 50.1992C61.4223 50.199 62.598 50.4921 63.6522 51.0527C64.7064 51.6133 65.6067 52.4242 66.2742 53.4141C66.9417 54.4041 67.3558 55.5429 67.4801 56.7303C67.6045 57.9178 67.4353 59.1177 66.9874 60.2244C66.5395 61.3312 65.8267 62.3111 64.9115 63.0779C63.9963 63.8447 62.9068 64.375 61.7387 64.6222C60.5706 64.8694 59.3597 64.8259 58.2123 64.4956C57.065 64.1653 56.0163 63.5582 55.1584 62.7278L53.9061 64.0389C54.979 65.0743 56.2897 65.8304 57.7232 66.2409C59.1566 66.6514 60.6689 66.7037 62.1272 66.3932C63.5856 66.0827 64.9454 65.4189 66.0873 64.4601C67.2292 63.5013 68.1183 62.2769 68.6764 60.8942C69.2345 59.5116 69.4447 58.013 69.2884 56.5302C69.1321 55.0474 68.6141 53.6256 67.78 52.3897C66.9459 51.1538 65.8211 50.1416 64.5044 49.4419C63.1877 48.7423 61.7193 48.3766 60.2283 48.377C59.0093 48.3987 57.8076 48.6688 56.6965 49.1706L52.6823 41.9167C53.22 41.4209 53.5953 40.7741 53.759 40.0612C53.9226 39.3484 53.8668 38.6027 53.599 37.922C53.3312 37.2414 52.8639 36.6576 52.2584 36.2473C51.6529 35.8371 50.9375 35.6194 50.2061 35.623ZM37.0505 48.6389C35.423 49.0244 33.933 49.8507 32.744 51.0271C31.555 52.2035 30.7129 53.6846 30.3101 55.3079C29.9073 56.9313 29.9592 58.6343 30.4603 60.23C30.9613 61.8258 31.8922 63.2528 33.1507 64.3545C34.4091 65.4562 35.9467 66.1901 37.5948 66.4757C39.2428 66.7613 40.9376 66.5876 42.4935 65.9736C44.0493 65.3596 45.406 64.329 46.4148 62.9949C47.4236 61.6607 48.0455 60.0746 48.2124 58.4103H56.7267C56.9485 59.2709 57.4766 60.0211 58.212 60.5201C58.9474 61.0191 59.8395 61.2328 60.7212 61.121C61.6028 61.0092 62.4135 60.5797 63.001 59.9129C63.5886 59.2461 63.9128 58.3879 63.9128 57.4992C63.9128 56.6105 63.5886 55.7523 63.001 55.0855C62.4135 54.4187 61.6028 53.9892 60.7212 53.8774C59.8395 53.7656 58.9474 53.9793 58.212 54.4783C57.4766 54.9773 56.9485 55.7275 56.7267 56.5881H46.568V57.4992C46.5705 58.8662 46.1887 60.2064 45.4661 61.3668C44.7434 62.5272 43.7091 63.461 42.4811 64.0617C41.2532 64.6624 39.881 64.9058 38.5214 64.764C37.1618 64.6222 35.8694 64.1011 34.7918 63.2599C33.7141 62.4188 32.8947 61.2917 32.427 60.0072C31.9593 58.7227 31.8622 57.3325 32.1467 55.9954C32.4312 54.6584 33.0859 53.4282 34.0361 52.4454C34.9863 51.4626 36.1936 50.7668 37.5204 50.4373L37.0505 48.6389Z" fill="white" />
                                                                </svg>
                                                            );
                                                    }
                                                })()}
                                            </div>
                                            {elem.completedEvents && elem.completedEvents.length ? <div className='linr'></div> : ""}
                                            <div className='textOnIcon'>Trigger Initiated</div>
                                        </div>
                                        {
                                            elem.completedEvents ? elem.completedEvents.map((value, index) => {
                                                return (
                                                    <>
                                                        {value.includes("filter") ?
                                                            <div className='autoIconDetails'>
                                                                <div className='imgHolder'>
                                                                    <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M40.406 0C43.0581 3.59695e-05 45.6017 1.05363 47.477 2.929L60.071 15.523C61.9464 17.3983 63 19.9418 63 22.594V40.406C63 43.0581 61.9464 45.6017 60.071 47.477L47.477 60.071C45.6017 61.9464 43.0581 63 40.406 63H22.594C19.9418 63 17.3983 61.9464 15.523 60.071L2.929 47.477C1.05363 45.6017 3.59695e-05 43.0581 0 40.406L0 22.594C3.59695e-05 19.9418 1.05363 17.3983 2.929 15.523L15.523 2.929C17.3983 1.05363 19.9418 3.59695e-05 22.594 0L40.406 0Z" fill="#305671" />
                                                                        <path d="M19.427 23.6518L28.661 34.3938V42.9098L34.338 39.1248V34.3938L43.573 23.6518C43.6908 23.5137 43.7663 23.3446 43.7905 23.1647C43.8146 22.9847 43.7865 22.8017 43.7094 22.6374C43.6323 22.473 43.5095 22.3344 43.3557 22.238C43.2019 22.1416 43.0235 22.0915 42.842 22.0938H20.158C19.9765 22.0915 19.7982 22.1416 19.6444 22.238C19.4906 22.3344 19.3678 22.473 19.2907 22.6374C19.2136 22.8017 19.1854 22.9847 19.2096 23.1647C19.2338 23.3446 19.3093 23.5137 19.427 23.6518V23.6518Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                </div>
                                                                {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                <div className='textOnIcon'>FilterApplied</div>
                                                            </div>
                                                            : (value.includes("actionDelay") ?
                                                                <div className='autoIconDetails'>
                                                                    <div className='imgHolder'>
                                                                        <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#05D3F8" />
                                                                            <path d="M34.587 30.181C36.1267 29.2687 37.3993 27.9673 38.277 26.4076C39.1546 24.8478 39.6064 23.0846 39.587 21.295C39.8778 21.2834 40.153 21.1603 40.3554 20.9512C40.5578 20.7421 40.6719 20.463 40.674 20.172V19.632C40.674 19.3326 40.5554 19.0455 40.3442 18.8333C40.133 18.6212 39.8464 18.5013 39.547 18.5H22.632C22.3318 18.5 22.0438 18.6193 21.8316 18.8316C21.6193 19.0438 21.5 19.3318 21.5 19.632V20.171C21.5014 20.4552 21.6106 20.7283 21.8054 20.9353C22.0003 21.1422 22.2664 21.2675 22.55 21.286C22.5266 23.0955 22.987 24.8784 23.8837 26.4503C24.7803 28.0222 26.0806 29.3261 27.65 30.227C27.9179 30.3771 28.1396 30.5978 28.2908 30.8651C28.4421 31.1324 28.5172 31.436 28.508 31.743V31.917C28.5032 32.2194 28.4155 32.5147 28.2546 32.7707C28.0936 33.0267 27.8654 33.2337 27.595 33.369C26.049 34.2679 24.7689 35.5605 23.885 37.1151C23.0011 38.6697 22.5449 40.4308 22.563 42.219C22.2803 42.2351 22.0142 42.3574 21.8178 42.5613C21.6214 42.7653 21.5093 43.0359 21.504 43.319V43.858C21.504 44.1582 21.6233 44.4462 21.8356 44.6584C22.0478 44.8707 22.3358 44.99 22.636 44.99H39.547C39.6957 44.99 39.8429 44.9607 39.9802 44.9038C40.1175 44.8469 40.2423 44.7636 40.3474 44.6584C40.4526 44.5533 40.5359 44.4285 40.5928 44.2912C40.6497 44.1539 40.679 44.0067 40.679 43.858V43.319C40.6769 43.028 40.5628 42.7489 40.3604 42.5398C40.158 42.3307 39.8828 42.2076 39.592 42.196C39.6065 40.416 39.1521 38.6635 38.2744 37.1149C37.3967 35.5662 36.1266 34.276 34.592 33.374C34.3229 33.2394 34.0956 33.0338 33.9347 32.7795C33.7739 32.5252 33.6854 32.2318 33.679 31.931V31.631C33.6837 31.3295 33.7708 31.035 33.9308 30.7794C34.0909 30.5238 34.3178 30.3169 34.587 30.181ZM22.413 20.171V19.632C22.413 19.6032 22.4187 19.5748 22.4297 19.5482C22.4407 19.5216 22.4568 19.4975 22.4771 19.4771C22.4975 19.4568 22.5216 19.4407 22.5482 19.4297C22.5748 19.4187 22.6032 19.413 22.632 19.413H39.547C39.6051 19.413 39.6608 19.4361 39.7019 19.4771C39.7429 19.5182 39.766 19.5739 39.766 19.632V20.171C39.766 20.2291 39.7429 20.2848 39.7019 20.3259C39.6608 20.3669 39.6051 20.39 39.547 20.39H22.632C22.5739 20.39 22.5182 20.3669 22.4771 20.3259C22.4361 20.2848 22.413 20.2291 22.413 20.171ZM39.766 43.314V43.853C39.766 43.9111 39.7429 43.9668 39.7019 44.0079C39.6608 44.0489 39.6051 44.072 39.547 44.072H22.632C22.5739 44.072 22.5182 44.0489 22.4771 44.0079C22.4361 43.9668 22.413 43.9111 22.413 43.853V43.314C22.413 43.2559 22.4361 43.2002 22.4771 43.1591C22.5182 43.1181 22.5739 43.095 22.632 43.095H39.547C39.6051 43.095 39.6608 43.1181 39.7019 43.1591C39.7429 43.2002 39.766 43.2559 39.766 43.314ZM34.166 34.181C35.5635 34.9975 36.7213 36.1678 37.5228 37.5739C38.3244 38.98 38.7414 40.5725 38.732 42.191H23.454C23.4421 40.5708 23.858 38.9761 24.6597 37.5681C25.4614 36.1601 26.6206 34.9886 28.02 34.172C28.4399 33.9616 28.794 33.6399 29.0436 33.2421C29.2933 32.8443 29.429 32.3856 29.436 31.916V31.742C29.4444 31.2687 29.3217 30.8024 29.0815 30.3945C28.8413 29.9867 28.4929 29.6532 28.075 29.431C26.6646 28.6039 25.4988 27.4175 24.6966 25.9927C23.8945 24.5679 23.4847 22.9559 23.509 21.321H38.688C38.7022 22.9498 38.2877 24.5536 37.4863 25.9716C36.6849 27.3896 35.5246 28.572 34.122 29.4C33.7064 29.6119 33.3565 29.9331 33.1098 30.329C32.8632 30.7249 32.7291 31.1806 32.722 31.647V31.93C32.7331 32.4009 32.8736 32.8597 33.1282 33.256C33.3827 33.6523 33.7414 33.971 34.165 34.177L34.166 34.181Z" fill="white" stroke="white" stroke-width="0.5" />
                                                                        </svg>
                                                                    </div>
                                                                    {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                    <div className='textOnIcon'>Delay</div>
                                                                </div>
                                                                : (value.includes('actionStatusPhaseUpdate') ?
                                                                    <div className='autoIconDetails'>
                                                                        <div className='imgHolder'>
                                                                            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M84.127 0H15.873C7.10659 0 0 7.10659 0 15.873V84.127C0 92.8934 7.10659 100 15.873 100H84.127C92.8934 100 100 92.8934 100 84.127V15.873C100 7.10659 92.8934 0 84.127 0Z" fill="#FF9CA4" />
                                                                                <path d="M34.9159 65.0822C26.8614 57.0277 26.8614 43.9686 34.9159 35.9141M64.0842 35.9141C72.1387 43.9686 72.1387 57.0277 64.0842 65.0822M41.3977 58.6004C36.923 54.1257 36.923 46.8705 41.3977 42.3959M57.6022 42.3959C62.0771 46.8705 62.0771 54.1257 57.6022 58.6004M51.7917 50.498C51.7917 51.7637 50.7657 52.7897 49.5 52.7897C48.2343 52.7897 47.2083 51.7637 47.2083 50.498C47.2083 49.2326 48.2343 48.2064 49.5 48.2064C50.7657 48.2064 51.7917 49.2326 51.7917 50.498Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                        {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                        <div className='textOnIcon'>Change Status & Phase</div>
                                                                    </div>
                                                                    : (value.includes('actionMessage') ?
                                                                        <div className='autoIconDetails'>
                                                                            <div className='imgHolder'>
                                                                                <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#009DFF" />
                                                                                    <path d="M36 36H43" stroke="#9AD8FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" />
                                                                                    <path d="M40 43C43.866 43 47 39.866 47 36C47 32.134 43.866 29 40 29C36.134 29 33 32.134 33 36C33 39.866 36.134 43 40 43Z" stroke="#9AD8FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" />
                                                                                    <path d="M39.9004 39L43.0004 36L39.9004 33" stroke="#9AD8FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" />
                                                                                    <path d="M42 29.7V20H21V41C24.5116 38.1442 28.6084 36.0958 33 35" stroke="#9AD8FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" />
                                                                                    <path d="M27 26H33" stroke="#9AD8FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <path d="M27 30H30" stroke="#9AD8FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                                                </svg>
                                                                            </div>
                                                                            {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                            <div className='textOnIcon'>Message send</div>
                                                                        </div>
                                                                        : (value.includes('actionApplyTag') ?
                                                                            <div className='autoIconDetails'>
                                                                                <div className='imgHolder'>
                                                                                    <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#2157AF" />
                                                                                        <path d="M37.5 44C33.916 44 31 41.084 31 37.5C31 33.916 33.916 31 37.5 31C41.084 31 44 33.916 44 37.5C44 41.084 41.084 44 37.5 44ZM37.5 32C34.467 32 32 34.467 32 37.5C32 40.533 34.467 43 37.5 43C40.533 43 43 40.533 43 37.5C43 34.467 40.533 32 37.5 32Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4" />
                                                                                        <path d="M37.5 41C37.224 41 37 40.776 37 40.5V34.5C37 34.224 37.224 34 37.5 34C37.776 34 38 34.224 38 34.5V40.5C38 40.776 37.776 41 37.5 41Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4" />
                                                                                        <path d="M40.5 38H34.5C34.224 38 34 37.776 34 37.5C34 37.224 34.224 37 34.5 37H40.5C40.776 37 41 37.224 41 37.5C41 37.776 40.776 38 40.5 38Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4" />
                                                                                        <path d="M29.5 44C28.826 44 28.198 43.737 27.732 43.259L20.736 36.263C20.263 35.802 20 35.174 20 34.5C20 33.86 20.252 33.234 20.691 32.782L31.96 21.093C32.627 20.389 33.531 20 34.5 20H41.5C42.878 20 44 21.122 44 22.5V29.5C44 29.933 43.921 30.356 43.759 30.794C43.663 31.053 43.375 31.187 43.116 31.089C42.857 30.993 42.725 30.705 42.821 30.446C42.941 30.122 43 29.813 43 29.5V22.5C43 21.673 42.327 21 41.5 21H34.5C33.808 21 33.162 21.278 32.683 21.784L21.41 33.477C21.149 33.746 21 34.118 21 34.5C21 34.902 21.156 35.276 21.439 35.552L28.443 42.556C28.916 43.041 29.709 43.136 30.272 42.777C30.506 42.629 30.814 42.698 30.962 42.932C31.11 43.165 31.041 43.474 30.807 43.622C30.418 43.87 29.966 44 29.5 44Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4" />
                                                                                        <path d="M39 27C37.897 27 37 26.103 37 25C37 23.897 37.897 23 39 23C40.103 23 41 23.897 41 25C41 26.103 40.103 27 39 27ZM39 24C38.449 24 38 24.449 38 25C38 25.551 38.449 26 39 26C39.551 26 40 25.551 40 25C40 24.449 39.551 24 39 24Z" fill="#8EB6F7" stroke="#8EB6F7" stroke-width="0.4" />
                                                                                    </svg>
                                                                                </div>
                                                                                {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                                <div className='textOnIcon'>Apply tag</div>
                                                                            </div>
                                                                            : (value.includes('actionRemoveTag') ?
                                                                                <div className='autoIconDetails'>
                                                                                    <div className='imgHolder'>
                                                                                        <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M53 0.5H10C4.47715 0.5 0 4.97715 0 10.5V53.5C0 59.0228 4.47715 63.5 10 63.5H53C58.5228 63.5 63 59.0228 63 53.5V10.5C63 4.97715 58.5228 0.5 53 0.5Z" fill="#6C22B5" />
                                                                                            <path d="M38.5 45C34.916 45 32 42.084 32 38.5C32 34.916 34.916 32 38.5 32C42.084 32 45 34.916 45 38.5C45 42.084 42.084 45 38.5 45ZM38.5 33C35.467 33 33 35.467 33 38.5C33 41.533 35.467 44 38.5 44C41.533 44 44 41.533 44 38.5C44 35.467 41.533 33 38.5 33Z" fill="#C9ADFF" stroke="#C9ADFF" stroke-width="0.4" />
                                                                                            <path d="M41.5 39H35.5C35.224 39 35 38.776 35 38.5C35 38.224 35.224 38 35.5 38H41.5C41.776 38 42 38.224 42 38.5C42 38.776 41.776 39 41.5 39Z" fill="#C9ADFF" stroke="#C9ADFF" stroke-width="0.4" />
                                                                                            <path d="M30.5 45C29.826 45 29.198 44.737 28.732 44.259L21.736 37.263C21.263 36.802 21 36.174 21 35.5C21 34.86 21.252 34.234 21.691 33.782L32.96 22.093C33.627 21.389 34.531 21 35.5 21H42.5C43.878 21 45 22.122 45 23.5V30.5C45 30.933 44.921 31.356 44.759 31.794C44.663 32.053 44.375 32.187 44.116 32.089C43.857 31.993 43.725 31.705 43.821 31.446C43.941 31.122 44 30.813 44 30.5V23.5C44 22.673 43.327 22 42.5 22H35.5C34.808 22 34.162 22.278 33.683 22.784L22.41 34.477C22.149 34.746 22 35.118 22 35.5C22 35.902 22.156 36.276 22.439 36.552L29.443 43.556C29.916 44.041 30.709 44.136 31.272 43.777C31.506 43.629 31.814 43.698 31.962 43.932C32.11 44.165 32.041 44.474 31.807 44.622C31.418 44.87 30.966 45 30.5 45Z" fill="#C9ADFF" stroke="#C9ADFF" stroke-width="0.4" />
                                                                                            <path d="M40 28C38.897 28 38 27.103 38 26C38 24.897 38.897 24 40 24C41.103 24 42 24.897 42 26C42 27.103 41.103 28 40 28ZM40 25C39.449 25 39 25.449 39 26C39 26.551 39.449 27 40 27C40.551 27 41 26.551 41 26C41 25.449 40.551 25 40 25Z" fill="#C9ADFF" stroke="#C9ADFF" stroke-width="0.4" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                                    <div className='textOnIcon'>Remove tag</div>
                                                                                </div>
                                                                                : (value.includes('notificationTag') ?
                                                                                    <div className='autoIconDetails'>
                                                                                        <div className='imgHolder'>
                                                                                            <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#4ACB69" />
                                                                                                <g clip-path="url(#clip0_28807_10446)">
                                                                                                    <path d="M32.9989 41.892H24.4683C24.1065 41.892 23.8883 41.6821 23.7903 41.5571C23.6213 41.3411 23.5559 41.06 23.6109 40.7857C24.491 36.3929 28.2219 33.1852 32.529 33.0811C32.6005 33.0839 32.6723 33.0858 32.7446 33.0858C35.9223 33.0858 38.5077 30.3996 38.5077 27.0976C38.5077 23.7956 35.9223 21.1094 32.7446 21.1094C29.5668 21.1094 26.9816 23.7956 26.9816 27.0976C26.9816 29.0573 27.8923 30.8003 29.2972 31.8933C28.0102 32.3335 26.8023 33.0182 25.7454 33.9215C23.8075 35.5778 22.4601 37.8881 21.9515 40.4267C21.7921 41.2222 21.9831 42.0392 22.4754 42.6684C22.9652 43.2942 23.6917 43.6532 24.4683 43.6532H32.9989C33.4669 43.6532 33.8464 43.259 33.8464 42.7726C33.8464 42.2862 33.4669 41.892 32.9989 41.892ZM28.6766 27.0976C28.6766 24.7669 30.5014 22.8706 32.7446 22.8706C34.9877 22.8706 36.8127 24.7669 36.8127 27.0976C36.8127 29.3949 35.0397 31.27 32.8408 31.3233C32.8092 31.3196 32.7773 31.3171 32.7446 31.3171C32.6784 31.3171 32.6124 31.3182 32.5463 31.3194C30.395 31.2117 28.6766 29.3593 28.6766 27.0976Z" fill="#C2FFD1" />
                                                                                                    <path d="M17.4803 37.5271L17.4196 37.8267H17.7253H18.8933C19.1712 37.8267 19.4377 37.9371 19.6341 38.1336C19.8306 38.33 19.941 38.5965 19.941 38.8744C19.941 39.1523 19.8306 39.4188 19.6341 39.6153C19.4377 39.8118 19.1712 39.9222 18.8933 39.9222H16.2978C16.0199 39.9222 15.7534 39.8118 15.5569 39.6153C15.3604 39.4188 15.25 39.1523 15.25 38.8744L15.25 38.874C15.2474 37.1959 15.7237 35.5519 16.623 34.1351C17.5223 32.7183 18.8073 31.5875 20.3269 30.8757L20.6324 30.7326L20.4066 30.482C19.8076 29.8169 19.4014 29.001 19.2318 28.1221C19.0622 27.2433 19.1355 26.3348 19.444 25.4946C19.7525 24.6544 20.2844 23.9142 20.9824 23.3539C21.6805 22.7937 22.5181 22.4344 23.4052 22.315L23.4052 22.3151L23.4129 22.3138C23.5518 22.2907 23.6938 22.2957 23.8307 22.3287C23.9675 22.3617 24.0963 22.4219 24.2093 22.5057L24.357 22.3066L24.2093 22.5057C24.3224 22.5895 24.4174 22.6953 24.4887 22.8167L24.7042 22.69L24.4887 22.8167C24.5599 22.938 24.6061 23.0725 24.6242 23.2121C24.6424 23.3516 24.6322 23.4934 24.5944 23.629C24.5566 23.7646 24.4918 23.8911 24.404 24.0011C24.3162 24.1111 24.2071 24.2022 24.0832 24.2691C23.9594 24.336 23.8234 24.3773 23.6832 24.3905L23.6832 24.3902L23.6713 24.3919C22.9966 24.4883 22.3794 24.8248 21.9329 25.3397C21.4864 25.8545 21.2405 26.5131 21.2405 27.1947C21.2405 27.8762 21.4864 28.5348 21.9329 29.0496C22.3794 29.5645 22.9966 29.901 23.6713 29.9974L23.6713 29.9974L23.6732 29.9977C23.936 30.0331 24.1755 30.1669 24.3435 30.3719C24.5116 30.577 24.5956 30.8381 24.5788 31.1027C24.5619 31.3673 24.4453 31.6157 24.2526 31.7977C24.0599 31.9798 23.8053 32.082 23.5401 32.0838L23.5064 32.084L23.4739 32.0932L23.4739 32.0932L23.4738 32.0932L23.4736 32.0932L23.4727 32.0935L23.4692 32.0945L23.4557 32.0983L23.406 32.1121C23.3642 32.1238 23.307 32.1396 23.2454 32.1562C23.1205 32.19 22.9887 32.2243 22.9249 32.2372C21.5907 32.4676 20.3571 33.0955 19.3857 34.0387C18.4134 34.9829 17.7492 36.1988 17.4803 37.5271Z" fill="#C2FFD1" stroke="#4ACB69" stroke-width="0.5" />
                                                                                                    <path d="M42.0674 47.0243C45.8961 47.0243 48.9999 43.9205 48.9999 40.0918C48.9999 36.263 45.8961 33.1592 42.0674 33.1592C38.2386 33.1592 35.1348 36.263 35.1348 40.0918C35.1348 43.9205 38.2386 47.0243 42.0674 47.0243Z" fill="#C2FFD1" stroke="#4ACB69" stroke-width="2" />
                                                                                                </g>
                                                                                                <defs>
                                                                                                    <clipPath id="clip0_28807_10446">
                                                                                                        <rect width="35" height="35" fill="white" transform="translate(14 14)" />
                                                                                                    </clipPath>
                                                                                                </defs>
                                                                                            </svg>
                                                                                        </div>
                                                                                        {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                                        <div className='textOnIcon'>Notification</div>
                                                                                    </div>
                                                                                    : "")))))) }
                                                    </>
                                                )
                                            }) : ""
                                        }
                                    </div>
                                </>
                            );
                        }) : (<div className="createNew noInfos">
                            <div className="noRecordsImgWraper">
                                <img src={noRecords} className="noRecords" alt="" />
                                <h4>No Automation History Found</h4>
                                <p>No automation history have been listed here</p>
                            </div>
                        </div>)}
                </div>
                {paginationData.count > 10 ? (
                    <Pagination
                        paginationData={paginationData}
                        dataCount={paginationData.count}
                        callback={() => props.fetchHistory(props.automationId)}
                    />
                ) : (
                        ""
                    )}
            </div>
        </Fragment>
    )
}
