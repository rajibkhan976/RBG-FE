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

export default function AutomationHistory(props) {
    const { automationId } = useParams();
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

    useEffect(() => {
        setAutomationHistory(props.automationHistory);
        setPaginationData(props.paginationData);
        if (props && props.automationDetails && props.automationDetails.blueprint) {
            let steps = props.automationDetails.blueprint.filter(el => !el.id.includes('edge-'));
            setTotalSteps(steps.length);
        }

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
            queryParams.append("fromDate", from);
        }
        if (to) {
            // const toDt = to;
            // const localtime = moment.tz(toDt, "YYYY-MM-DD hh:mm A", timezone);
            // const toDate = localtime.clone().utc().format("YYYY-MM-DD");
            // // console.log(toDt);
            // console.log("UTC TO --",toDate);
            queryParams.append("toDate", to);
        }
        if (status) {
            queryParams.append("status", status);
        }

        return queryParams;
    }
    const handleFromDate = (e) => {
        const { value } = e.target;
        setFilterData(prevState => ({ ...prevState, fromDate: value }));
    };

    const handletoDate = (e) => {
        const { value } = e.target;
        setFilterData(prevState => ({ ...prevState, toDate: value }));
    };

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
            utils.addQueryParameter('fromDate', filterData.fromDate);
            utils.addQueryParameter('toDate', filterData.toDate);
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
                                <input
                                    type="date"
                                    name='fromdate'
                                    max={moment().format('YYYY-MM-DD')}
                                    onChange={handleFromDate}
                                    placeholder="dd/mm/yyyy"
                                    value={filterData.fromDate}
                                />
                            </div>
                        </div>
                        <div className="formField">
                            <p>To</p>
                            <div className="inFormField">
                                <input type="date"
                                    name='todate'
                                    min={filterData.fromDate}
                                    max={moment().format('YYYY-MM-DD')}
                                    disabled={(filterData.fromDate) ? false : true}
                                    onChange={handletoDate}
                                    value={(filterData.fromDate) ? filterData.toDate : ''}
                                    placeholder="dd/mm/yyyy" />
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
                                            <p onClick={() => openContactModal(elem.contactId)}>{ elem.firstName || elem.lastName ? (elem.firstName || "-") + " "+ (elem.lastName || "") :
                                                (elem.phone && elem.phone.full_number ? elem.phone.full_number : elem.email )}</p>
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
                                            {moment(elem.createdAt).format("YYYY-MM-DD")}
                                        </div>
                                        <div className="listCell cellWidth_15" onClick={() => toggleDetails(i)}>
                                            {/* {(elem?.completedAt) ? utils.convertUTCToTimezone(elem?.completedAt, timezone, "LLL") : "-"} */}
                                            {(elem?.completedAt) ? moment(elem.completedAt).format("YYYY-MM-DD") : "-"}
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
                                                                            <path d="M8.76509 15.9551C11.9747 15.5956 14.5469 13.0299 14.913 9.82031C15.3934 5.62366 12.1316 2.05128 8.04277 2.00552V0.12291C8.04277 0.0183201 7.91203 -0.037243 7.82378 0.0281254L3.94743 2.87492C3.88207 2.92395 3.88207 3.01873 3.94743 3.06776L7.82378 5.91455C7.91203 5.97992 8.04277 5.92109 8.04277 5.81977V3.94043C10.9157 3.98618 13.2167 6.43096 13.0206 9.35293C12.8539 11.8663 10.8046 13.9058 8.29117 14.066C5.6274 14.236 3.36239 12.3337 2.9571 9.81705C2.88193 9.34966 2.47338 9.00975 2.00272 9.00975C1.41768 9.00975 0.960097 9.52942 1.05161 10.1079C1.62032 13.6934 4.93123 16.3833 8.76509 15.9551Z" fill="#9BAEBC"/>
                                                                            </g>
                                                                            <defs>
                                                                            <clipPath id="clip0_2293_1014">
                                                                            <rect width="16" height="16" fill="white"/>
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
                                    <div className={ togOption === i ? "dropdownAutoHistory listOpen" : "dropdownAutoHistory listHide"}>
                                        <div className='autoIconDetails'>
                                            <div className='imgHolder trigger'></div>
                                            { elem.completedEvents && elem.completedEvents.length ? <div className='linr'></div> : ""}
                                            <div className='textOnIcon'>TriggerInitiated</div>
                                        </div>
                                        {
                                            elem.completedEvents ? elem.completedEvents.map((value, index) => {
                                                return (
                                                    <>
                                                        { value.includes("filter") ?
                                                            <div className='autoIconDetails'>
                                                                <div className='imgHolder'>
                                                                    <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M40.406 0C43.0581 3.59695e-05 45.6017 1.05363 47.477 2.929L60.071 15.523C61.9464 17.3983 63 19.9418 63 22.594V40.406C63 43.0581 61.9464 45.6017 60.071 47.477L47.477 60.071C45.6017 61.9464 43.0581 63 40.406 63H22.594C19.9418 63 17.3983 61.9464 15.523 60.071L2.929 47.477C1.05363 45.6017 3.59695e-05 43.0581 0 40.406L0 22.594C3.59695e-05 19.9418 1.05363 17.3983 2.929 15.523L15.523 2.929C17.3983 1.05363 19.9418 3.59695e-05 22.594 0L40.406 0Z" fill="#305671"/>
                                                                        <path d="M19.427 23.6518L28.661 34.3938V42.9098L34.338 39.1248V34.3938L43.573 23.6518C43.6908 23.5137 43.7663 23.3446 43.7905 23.1647C43.8146 22.9847 43.7865 22.8017 43.7094 22.6374C43.6323 22.473 43.5095 22.3344 43.3557 22.238C43.2019 22.1416 43.0235 22.0915 42.842 22.0938H20.158C19.9765 22.0915 19.7982 22.1416 19.6444 22.238C19.4906 22.3344 19.3678 22.473 19.2907 22.6374C19.2136 22.8017 19.1854 22.9847 19.2096 23.1647C19.2338 23.3446 19.3093 23.5137 19.427 23.6518V23.6518Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    </svg>
                                                                </div>
                                                                {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                <div className='textOnIcon'>FilterApplied</div>
                                                            </div>
                                                            : (value.includes("actionDelay") ?
                                                                <div className='autoIconDetails'>
                                                                    <div className='imgHolder'>
                                                                        <svg width="44" height="44" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M53 0H10C4.47715 0 0 4.47715 0 10V53C0 58.5228 4.47715 63 10 63H53C58.5228 63 63 58.5228 63 53V10C63 4.47715 58.5228 0 53 0Z" fill="#05D3F8"/>
                                                                            <path d="M34.587 30.181C36.1267 29.2687 37.3993 27.9673 38.277 26.4076C39.1546 24.8478 39.6064 23.0846 39.587 21.295C39.8778 21.2834 40.153 21.1603 40.3554 20.9512C40.5578 20.7421 40.6719 20.463 40.674 20.172V19.632C40.674 19.3326 40.5554 19.0455 40.3442 18.8333C40.133 18.6212 39.8464 18.5013 39.547 18.5H22.632C22.3318 18.5 22.0438 18.6193 21.8316 18.8316C21.6193 19.0438 21.5 19.3318 21.5 19.632V20.171C21.5014 20.4552 21.6106 20.7283 21.8054 20.9353C22.0003 21.1422 22.2664 21.2675 22.55 21.286C22.5266 23.0955 22.987 24.8784 23.8837 26.4503C24.7803 28.0222 26.0806 29.3261 27.65 30.227C27.9179 30.3771 28.1396 30.5978 28.2908 30.8651C28.4421 31.1324 28.5172 31.436 28.508 31.743V31.917C28.5032 32.2194 28.4155 32.5147 28.2546 32.7707C28.0936 33.0267 27.8654 33.2337 27.595 33.369C26.049 34.2679 24.7689 35.5605 23.885 37.1151C23.0011 38.6697 22.5449 40.4308 22.563 42.219C22.2803 42.2351 22.0142 42.3574 21.8178 42.5613C21.6214 42.7653 21.5093 43.0359 21.504 43.319V43.858C21.504 44.1582 21.6233 44.4462 21.8356 44.6584C22.0478 44.8707 22.3358 44.99 22.636 44.99H39.547C39.6957 44.99 39.8429 44.9607 39.9802 44.9038C40.1175 44.8469 40.2423 44.7636 40.3474 44.6584C40.4526 44.5533 40.5359 44.4285 40.5928 44.2912C40.6497 44.1539 40.679 44.0067 40.679 43.858V43.319C40.6769 43.028 40.5628 42.7489 40.3604 42.5398C40.158 42.3307 39.8828 42.2076 39.592 42.196C39.6065 40.416 39.1521 38.6635 38.2744 37.1149C37.3967 35.5662 36.1266 34.276 34.592 33.374C34.3229 33.2394 34.0956 33.0338 33.9347 32.7795C33.7739 32.5252 33.6854 32.2318 33.679 31.931V31.631C33.6837 31.3295 33.7708 31.035 33.9308 30.7794C34.0909 30.5238 34.3178 30.3169 34.587 30.181ZM22.413 20.171V19.632C22.413 19.6032 22.4187 19.5748 22.4297 19.5482C22.4407 19.5216 22.4568 19.4975 22.4771 19.4771C22.4975 19.4568 22.5216 19.4407 22.5482 19.4297C22.5748 19.4187 22.6032 19.413 22.632 19.413H39.547C39.6051 19.413 39.6608 19.4361 39.7019 19.4771C39.7429 19.5182 39.766 19.5739 39.766 19.632V20.171C39.766 20.2291 39.7429 20.2848 39.7019 20.3259C39.6608 20.3669 39.6051 20.39 39.547 20.39H22.632C22.5739 20.39 22.5182 20.3669 22.4771 20.3259C22.4361 20.2848 22.413 20.2291 22.413 20.171ZM39.766 43.314V43.853C39.766 43.9111 39.7429 43.9668 39.7019 44.0079C39.6608 44.0489 39.6051 44.072 39.547 44.072H22.632C22.5739 44.072 22.5182 44.0489 22.4771 44.0079C22.4361 43.9668 22.413 43.9111 22.413 43.853V43.314C22.413 43.2559 22.4361 43.2002 22.4771 43.1591C22.5182 43.1181 22.5739 43.095 22.632 43.095H39.547C39.6051 43.095 39.6608 43.1181 39.7019 43.1591C39.7429 43.2002 39.766 43.2559 39.766 43.314ZM34.166 34.181C35.5635 34.9975 36.7213 36.1678 37.5228 37.5739C38.3244 38.98 38.7414 40.5725 38.732 42.191H23.454C23.4421 40.5708 23.858 38.9761 24.6597 37.5681C25.4614 36.1601 26.6206 34.9886 28.02 34.172C28.4399 33.9616 28.794 33.6399 29.0436 33.2421C29.2933 32.8443 29.429 32.3856 29.436 31.916V31.742C29.4444 31.2687 29.3217 30.8024 29.0815 30.3945C28.8413 29.9867 28.4929 29.6532 28.075 29.431C26.6646 28.6039 25.4988 27.4175 24.6966 25.9927C23.8945 24.5679 23.4847 22.9559 23.509 21.321H38.688C38.7022 22.9498 38.2877 24.5536 37.4863 25.9716C36.6849 27.3896 35.5246 28.572 34.122 29.4C33.7064 29.6119 33.3565 29.9331 33.1098 30.329C32.8632 30.7249 32.7291 31.1806 32.722 31.647V31.93C32.7331 32.4009 32.8736 32.8597 33.1282 33.256C33.3827 33.6523 33.7414 33.971 34.165 34.177L34.166 34.181Z" fill="white" stroke="white" stroke-width="0.5"/>
                                                                        </svg>
                                                                    </div>
                                                                    {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                    <div className='textOnIcon'>Delay</div>
                                                                </div>
                                                                : ( value.includes('actionStatusPhaseUpdate') ?
                                                                    <div className='autoIconDetails'>
                                                                        <div className='imgHolder'>
                                                                            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M84.127 0H15.873C7.10659 0 0 7.10659 0 15.873V84.127C0 92.8934 7.10659 100 15.873 100H84.127C92.8934 100 100 92.8934 100 84.127V15.873C100 7.10659 92.8934 0 84.127 0Z" fill="#FF9CA4"/>
                                                                                <path d="M34.9159 65.0822C26.8614 57.0277 26.8614 43.9686 34.9159 35.9141M64.0842 35.9141C72.1387 43.9686 72.1387 57.0277 64.0842 65.0822M41.3977 58.6004C36.923 54.1257 36.923 46.8705 41.3977 42.3959M57.6022 42.3959C62.0771 46.8705 62.0771 54.1257 57.6022 58.6004M51.7917 50.498C51.7917 51.7637 50.7657 52.7897 49.5 52.7897C48.2343 52.7897 47.2083 51.7637 47.2083 50.498C47.2083 49.2326 48.2343 48.2064 49.5 48.2064C50.7657 48.2064 51.7917 49.2326 51.7917 50.498Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                        </div>
                                                                        {elem.completedEvents.length !== index + 1 ? <div className='linr'></div> : ""}
                                                                        <div className='textOnIcon'>Change Status & Phase</div>
                                                                    </div>
                                                                    : "" )) }
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
