import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actionTypes from '../../actions/types';
import CommunicationLogHeader from './CommunicationLogHeader';
import info_3dot_icon from "../../assets/images/info_3dot_icon.svg";
import outgoing from "../../assets/images/outgoing.svg";
import missedcall from "../../assets/images/missedcall.svg";
import outgoing_SMS from "../../assets/images/outgoing_SMS.svg";
import incoming_SMS from "../../assets/images/incoming_SMS.svg";
import outgoing_Mail from "../../assets/images/outgoing_Mail.svg";
import incoming_Mail from "../../assets/images/incoming_Mail.svg";
import outgoing_Call from "../../assets/images/outgoing.svg";
import incoming_Call from "../../assets/images/missedcall.svg";
import voice_Mail from "../../assets/images/voice_Mail.svg";
import messenger from "../../assets/images/messenger.svg";
import inArrow from "../../assets/images/inArrow.svg";
import outArrow from "../../assets/images/outArrow.svg";
import circle_play_icon from "../../assets/images/circle_play_icon.svg";
import cross from "../../assets/images/cross.svg";
import callForword from "../../assets/images/callforword.svg";
import noCommunication from "../../assets/images/no-communication-icon.svg";
import CommunicationLogFilter from "./CommunicationLogFilter";
import {communicationLogServices} from "../../services/communicationLog/communicationLogServices";
import Loader from "../shared/Loader";
import {utils} from "../../helpers";
import {Scrollbars} from "react-custom-scrollbars-2";
import Player from "../shared/Player";


const CommunicationLog = (props) => {
    const dispatch = useDispatch();

    const [isFilter, setIsFilter] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [logList, setLogList] = useState([]);
    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 10
    });

    const [isLoaderScroll, setIsLoaderScroll] = useState(false);
    const [isScroll, setIsScroll] = useState(false);

    const comLogRef = useRef();
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [isFilteringOn, setIsFilteringOn] = useState(false);
    const [selectDirection, setSelectDirection] = useState("");
    const [selectType, setSelectType] = useState("");
    const [selectTodate, setSelectTodate] = useState("");
    const [selectFromdate, setSelectFromdate] = useState("");
    const [dataLenght, setDataLenght] = useState(true);
    const [scrolledPosition, setScrolledPosition] = useState(null);


    const hideFilter = () => {
        setIsFilter(false);
    }
    const showFilter = () => {
        setIsFilter(true);
    }


    const timezoneOffset = useSelector((state) => (state?.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset : null)
    const fetchCommunicationLogList = async (pageId) => {
        const queryParams = await getQueryParams();
        //let contactID = props.contactId;
        try {
            setIsLoader(true);
            setIsScroll(true);
            //setIsLoaderScroll(true);
            const result = await communicationLogServices.fetchCommLog(pageId, queryParams);
            if (result) {
                // console.log("result", result.pagination.currentPage);
                if (result.pagination.currentPage == "1") {
                    // console.log("result", "pppppp")
                    setLogList(result.data);
                } else {
                    setLogList([...logList, ...result.data]);
                }
                if (result.data.length === 0) {
                    setDataLenght(false);
                } else {
                    setDataLenght(true)
                }
                setScrolledPosition(comLogRef.current.scrollHeight);
                if (result.pagination.currentPage != "1") {
                    comLogRef.current.scrollTop = (comLogRef.current.scrollHeight - scrolledPosition) - 200;
                    // console.log("scroll data: ", comLogRef.current.scrollTop);
                }
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages,
                    count: result.pagination.count
                });
            }
            // console.log("", logList);
        } catch (e) {

        } finally {
            setIsLoader(false);
            //setIsLoaderScroll(false);
            setIsScroll(false);
        }
    };

    const getQueryParams = async () => {
        const keyword = utils.getQueryVariable("search");
        const type = utils.getQueryVariable("type");
        const direction = utils.getQueryVariable("direction");
        const toDate = utils.getQueryVariable("toDate");
        const fromDate = utils.getQueryVariable("fromDate");
        const queryParams = new URLSearchParams();
        if (keyword) {
            queryParams.append("search", decodeURIComponent(keyword.replaceAll("+", " ")));
        }
        if (type) {
            queryParams.append("type", type);
        }
        if (direction) {
            queryParams.append("direction", direction);
        }
        if (fromDate) {
            queryParams.append("fromDate", fromDate.replaceAll("+", " "));

        }
        if (toDate) {
            queryParams.append("toDate", toDate.replaceAll("+", " "));
        }
        return queryParams;
    };

    const listPageNo = async (e) => {
        if (!isScroll) {
            let scrollHeight = e.target.scrollHeight;
            let scrollTop = e.target.scrollTop;
            let clientHeight = e.target.clientHeight;
            let maxScroll = scrollHeight - clientHeight;
            if ((maxScroll - scrollTop) < 100) {
                if (paginationData.totalPages > paginationData.currentPage) {
                    await fetchCommunicationLogList(parseInt(paginationData.currentPage) + 1);
                }
            }

        }
    };

    useEffect(() => {
        fetchCommunicationLogList(1);
    }, []);

    const clickOnSearch = (data) => {
        setIsSearchOn(data)
    }
    const clickedOnFilter = (data) => {
        setIsFilteringOn(data);
    }

    useEffect(() => {
        if (isSearchOn) {
            fetchCommunicationLogList(1);
        }
    }, [isSearchOn]);


    useEffect(() => {
        if (isFilteringOn) {
            fetchCommunicationLogList(1);
        }
    }, [isFilteringOn]);


    useEffect(() => {
        const type = utils.getQueryVariable("type");
        setSelectType(type);
    }, [utils.getQueryVariable("type")]);

    useEffect(() => {
        const direction = utils.getQueryVariable("direction");
        setSelectDirection(direction);
    }, [utils.getQueryVariable("direction")]);

    useEffect(() => {
        const toDate = utils.getQueryVariable("toDate");
        setSelectTodate(toDate);
    }, [utils.getQueryVariable("toDate")]);

    useEffect(() => {
        const fromDate = utils.getQueryVariable("fromDate");
        setSelectFromdate(fromDate);
    }, [utils.getQueryVariable("fromDate")]);

    const removeType = () => {
        utils.removeQueryParameter('type');
        fetchCommunicationLogList(1);
    }
    const removeDirection = () => {
        utils.removeQueryParameter('direction');
        fetchCommunicationLogList(1);
    }
    const removeTodate = () => {
        utils.removeQueryParameter('toDate');
        fetchCommunicationLogList(1);
    }
    const removeFromdate = () => {
        utils.removeQueryParameter('fromDate');
        fetchCommunicationLogList(1);
    }
    const removeAllFilter = () => {
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');
        utils.removeQueryParameter('direction');
        utils.removeQueryParameter('type');
        fetchCommunicationLogList(1);
    }

    const openContactModal = (elem) => {
        dispatch({
            type: actionTypes.CONTACTS_MODAL_ID,
            contact_modal_id: {
                "id": elem.contactId,
                "page": 9
            },
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CONTACTS_MODAL_ID,
                contact_modal_id: {
                    "id": elem.contactId,
                },
            }, 100);
        })
    }

    return (
        <>
            {isLoader ? <Loader/> : ""}
            <CommunicationLogHeader showFilter={showFilter}
                                    countCommLog={paginationData.count}
                                    clickOnSearch={(data) => clickOnSearch(data)}
            />

            {(selectDirection || selectType || selectFromdate || selectTodate) &&
                <div className='filterCommunication'>
                    {selectDirection &&
                        <div className="contactsTags">
                            <span
                                className="pageInfo">Direction : {selectDirection === "outbound" ? "Outgoing" : "Incoming"}</span>
                            <span className="crossTags" onClick={removeDirection}><img src={cross} alt=""/></span>
                        </div>}
                    {selectType &&
                        <div className="contactsTags">
                            <span className="pageInfo">Type : {selectType}</span>
                            <span className="crossTags" onClick={removeType}><img src={cross} alt=""/></span>
                        </div>}

                    {selectFromdate &&
                        <div className="contactsTags">
                            {/* <span className="pageInfo">From date : { moment(decodeURIComponent(selectFromdate.replaceAll(":","%3A"))).format('YYYY-MM-DD')}</span> */}
                            <span
                                className="pageInfo">From date : {utils.convertUTCToTimezone(decodeURIComponent(selectFromdate).replaceAll("+", " "), timezoneOffset)
                            }</span>
                            <span className="crossTags" onClick={removeFromdate}><img src={cross} alt=""/></span>
                        </div>
                    }
                    {selectTodate &&
                        <div className="contactsTags">
                            {/* <span className="pageInfo">To date : {moment(decodeURIComponent(selectTodate.replaceAll(":","%3A"))).format('YYYY-MM-DD')}</span> */}
                            {<span
                                className="pageInfo">To date : {utils.convertUTCToTimezone(decodeURIComponent(selectTodate).replaceAll("+", " "), timezoneOffset)}{/*decodeURIComponent(selectTodate).split("+").splice(0,1).join(" ")*/}</span>}
                            <span className="crossTags" onClick={removeTodate}><img src={cross} alt=""/></span>
                        </div>
                    }
                    <div className="contactsTags clearAlls" onClick={removeAllFilter}><span
                        className="allDel">Clear All</span></div>
                </div>
            }

            <div className='communicationList'>
                <div className="userListBody">
                    <div className="listBody" style={{}}>
                        <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical"/>} ref={comLogRef}
                                    onScroll={listPageNo}>
                            <ul className="tableListing noHeader">
                                {
                                    (logList && logList.length > 0) ?
                                        <>{
                                            logList.map((elem, key) => {
                                                return (
                                                    <li className='space' key={key}>
                                                        <div className='iconType'  onClick={() => openContactModal(elem)}>
                                                            <div
                                                                className=
                                                                {`
                                                                    ${elem?.log_type === "SMS" ? (elem?.direction === "inbound" ? "roundIconBase sms inbound" : "roundIconBase sms outbound" ) : ""} 
                                                                    ${elem?.log_type === "EMAIL" ? (elem?.direction === "inbound" ? "roundIconBase email inbound" : "roundIconBase email outbound") : ""}
                                                                    ${elem?.log_type === "CALL" ? (elem?.direction === "inbound" ? 
                                                                                (elem?.data?.callStatus === "no-answer" && elem?.data?.callStatus !== "" ? "roundIconBase call misscall" 
                                                                                            : "roundIconBase" ? (elem?.data?.status === "forwarded" ? "roundIconBase call forwarded" 
                                                                                            : "roundIconBase" ? 
                                                                                                (elem?.data?.callStatus === "ringing" ? "roundIconBase call outbound" : "roundIconBase") : "") 
                                                                                            : "roundIconBase")
                                                                        : "roundIconBase call outbound")
                                                                    : ""}
                                                                `}
                                                                >
                                                                <img src={
                                                                    elem?.log_type === "SMS" ? (elem?.direction === "outbound" ? outgoing_SMS : incoming_SMS) :
                                                                    elem?.log_type === "EMAIL" ? (elem?.direction === "outbound" ? outgoing_Mail : incoming_Mail) :
																	elem?.log_type === "CALL" ? 
                                                                        (elem?.direction === "outbound" ? outgoing_Call : 
                                                                            (elem?.direction === "inbound" ?
                                                                                (elem?.data?.status === "forwarded" ? callForword : incoming_Call ?
                                                                                    (elem?.data?.callStatus === "no-answer" ? missedcall : incoming_Call ?
                                                                                        (elem?.data?.callStatus === "ringing" ? outgoing_Call : "" ): ""
                                                                                    ) : ""
                                                                                )
                                                                             : "")
                                                                        )
                                                                        : ""
                                                                } alt=""/>
                                                            </div>
                                                        </div>
                                                        <div className='nameCommunication'  onClick={() => openContactModal(elem)}>
                                                            <span
                                                                className="comLogText">{elem.direction === "outbound" ? "To" : "From"}: {elem.contactName && elem.contactName.trim() ? (elem.contactName + "(" + elem.alias_ref + ")"): elem.alias_ref}</span>
                                                        </div>
                                                        <div onClick={() => openContactModal(elem)}>
                                                            <span className="comLogText"><img
                                                                src={elem.direction === "outbound" ? outArrow : inArrow}
                                                                alt=""/> {elem.direction === "outbound" ? "Outgoing " : "Incoming "}</span>
                                                        </div>
                                                        <div className='detailCommunication' onClick={() => openContactModal(elem)}>
                                                            {
                                                                elem.log_type === "CALL" ? (
                                                                    <>
                                                                        {
                                                                            elem.direction === "outbound" ?
                                                                                <span className="comLogText">
                                                                                    <span className='skytext'>{elem.createdBy} </span> <span className='doomed'> made a </span> Browser call
                                                                                </span> :
                                                                                (elem.data.callStatus === "no-answer" ?
                                                                                    <span  className="comLogText">
                                                                                        <span className='doomed'> You have got a </span> <span className="redTxt">Missed Call</span>
                                                                                    </span>: <span  className="comLogText">
                                                                                    <span className='skytext'>Received call </span> <span className='doomed'> from </span> {elem.contactName && elem.contactName.trim() ? elem.contactName : elem.from}
                                                                                </span>)
                                                                        }
                                                                    </>
                                                                ) : (elem.direction === "outbound" ?
                                                                    <>
                                                                    <span className="comLogText">
                                                                       <span
                                                                           className='skytext'>{elem.createdBy} </span> send {elem.log_type === "SMS" ? "a " + elem.log_type : "an " + elem.log_type}
                                                                        <span
                                                                            className='doomed'> "{elem.log_type === "SMS" ? (elem.data.message.length > 160 ? (elem.data.message.slice(0, 160) + "...") : elem.data.message) : elem.log_type === "EMAIL" ? (elem.data.subject.length > 160 ? (elem.data.subject.slice(0, 160) + "...") : elem.data.subject) : ""}"</span>
                                                                    </span>
                                                                    </> :
                                                                    <span className="comLogText">
												                    Received {elem.log_type === "SMS" ? "a " + elem.log_type : "an " + elem.log_type}
                                                                        <span className='doomed'> from</span> {elem.from}
                                                                        <span
                                                                            className='doomed'> "{elem.log_type === "SMS" ? (elem.data.message.length > 160 ? (elem.data.message.slice(0, 160) + "...") : elem.data.message) : elem.log_type === "EMAIL" ? (elem.data.subject.length > 160 ? (elem.data.subject.slice(0, 160) + "...") : elem.data.subject) : ""}"</span>
											                    </span>)
                                                            }
                                                        </div>
                                                        <div className="audioPlayer">
                                                            {
                                                                elem.log_type === "CALL" && elem?.data?.duration ?
                                                                    <div className="audioBox communicationAudioPlayer">
                                                                        <Player
                                                                            audioElement={new Audio(elem.data.recordingUrl)}
                                                                            trackName={elem.direction + " " +elem.log_type.toLowerCase() + (elem.direction === "outbound" ? " to " + elem.to :" from " + elem.from)}
                                                                            preview={true}
                                                                        />
                                                                    </div> : ""
                                                            }
                                                        </div>
                                                        <div className='dateCommunication' onClick={() => openContactModal(elem)}>
                                                            <span className="comLogText"><span className="doomed">
                                                                {utils.convertUTCToTimezone(elem.createdAt, timezoneOffset)}
                                                            </span></span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                            <div className="appListsWrap">
                                                <div className="noMoredata">No more communication Found</div>
                                            </div>
                                        </>
                                        :
                                        <div className="appListsWrap">
                                            <div className="noDataFound">
                                                <span><span><img src={noCommunication}/>No communication happened so far</span></span>
                                            </div>
                                        </div>
                                }
                            </ul>
                        </Scrollbars>

                    </div>
                </div>
            </div>
            {isFilter &&

                <CommunicationLogFilter
                    hideFilter={hideFilter}
                    clickedOnFilter={(data) => clickedOnFilter(data)}
                    //applyFilter={()=>applyFilter()}
                    //filterSection={(data)=> filter(data)}
                />
            }
        </>
    );
};

export default CommunicationLog;
