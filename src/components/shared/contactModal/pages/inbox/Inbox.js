import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Loader from "../../../Loader";
import iconSmsOut from "../../../../../assets/images/iconSmsOut.svg";
import iconSmsIn from "../../../../../assets/images/iconSmsIn.svg";
import iconCallOut from "../../../../../assets/images/iconCallOut.svg";
import iconCallIn from "../../../../../assets/images/iconCallIn.svg";
import iconEmailOut from "../../../../../assets/images/iconEmailOut.svg";
import iconEmailIn from "../../../../../assets/images/iconEmailIn.svg";
import smalCalendar from "../../../../../assets/images/smalCalendar.svg";
import arrowDown from "../../../../../assets/images/arrowDown.svg";
import callForword from "../../../../../assets/images/callforword.svg";
import iconCallforword from "../../../../../assets/images/iconCallForword.svg";
import iconMissedCall from "../../../../../assets/images/iconMissedCall.svg";
import Player from "../../../Player";
import "../../../../../assets/css/communicationLog.css";
import OpenPanel from "./OpenPanel.js";
import {utils} from "../../../../../helpers";
import moment from "moment";
import {communicationLogServices} from "../../../../../services/communicationLog/communicationLogServices";
import EnlargeInbox from "./EnlargeInbox";
import {useSelector} from "react-redux";
const Inbox = (props) => {
    const comLogRef = useRef();
    const [contactGenData, setContactgendata] = useState(props.contact);
    const [contactLogData, setContactLogData] = useState([]);
    const [isScroll, setIsScroll] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [device, setDevice] = useState(props.device);
    const [scrolledPosition, setScrolledPosition] = useState(null);
    const [clientHeight, setClientHeight] = useState(null);
    const [scrolledTop, setScrolledTop] = useState(null);
    const [scrolledHeight, setScrolledHeight] = useState(null);
    useEffect(() => {
        setDevice(props.device);
    }, [props.device]);
    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 10
    });
    const [newEmailData, setnewEmailData] = useState([]);
    const [showEmailmodal, setShowEmailmodal] = useState(false);
    const [contentShowInModal, setContentShowInModal] = useState({
        message: "",
        subject: "",
        template: "",
        direction: "",
        type: "",
    });
    const fetchInboxLogList = async (pageId) => {
        let contact_id = props.contactId;
        try {
            setIsLoader(true);
            setIsScroll(true);
            const result = await communicationLogServices.fetchInboxLog(pageId, contact_id);
            if (result.pagination.page === "1") {
                setContactLogData(result.data);
            } else {
                setContactLogData([...contactLogData, ...result.data]);
            }
            setPaginationData({
                ...paginationData,
                currentPage: result.pagination.currentPage,
                totalPages: result.pagination.totalPages
            });
            setScrolledPosition(comLogRef.current.scrollHeight);
            if (result.pagination.page === "1") {
                comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight;
            } else {
                comLogRef.current.scrollTop = (comLogRef.current.scrollHeight - scrolledPosition) + 260;
            }
        } catch (e) {

        } finally {
            setIsScroll(false);
            setIsLoader(false);
        }
    };

    const emailplaceholdingData = (data) => {
        let date = new Date();
        const keys = Object.keys(contactGenData);
        let subject = data.subject;
        let template = utils.decodeHTML(data.template);
        keys.map(el => {
            subject = subject.replaceAll('[' + el + ']', contactGenData && contactGenData[el] ? contactGenData[el] : "");
            subject = subject.replace(/  +/g, ' ');
            template = template.replaceAll('[' + el + ']', contactGenData && contactGenData[el] ? contactGenData[el] : "");
            template = template.replace(/  +/g, ' ');
        });
        setnewEmailData(current => [
            {
                ...newEmailData,
                log_type: "EMAIL",
                subject: subject,
                template: template,
                date: moment(date).format(),
            }
            , ...current])
        comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight
    }
    const smsPlaceholdingData = (data) => {
        let date = new Date();
        const keys = Object.keys(contactGenData);
        let body = data.body;

        keys.map(el => {
            body = body.replaceAll("[" + el + "]", contactGenData && contactGenData[el] ? contactGenData[el] : "");
            body = body.replace(/  +/g, ' ');
        });
        setnewEmailData(current => [
            {
                ...newEmailData,
                log_type: "SMS",
                message: body,
                date: moment(date).format(),
            }
            , ...current])
        comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight
    }

    useEffect(() => {
        fetchInboxLogList(1);
    }, []);

    const showBigMail = (data, type, direction) => {
        if (type === "SMS") {
            setContentShowInModal({
                ...contentShowInModal,
                message: data.message,
                direction: direction,
                type: type,
            })
        } else if (type === "EMAIL") {
            setContentShowInModal({
                ...contentShowInModal,
                subject: data.subject,
                template: data.template,
                direction: direction,
                type: type,
            })
        }
        setShowEmailmodal(true)
    }
    const closeModal = (e) => {
        setShowEmailmodal(false)
        setContentShowInModal({
            ...contentShowInModal,
            message: "",
            subject: "",
            template: "",
            direction: "",
            type: "",
        })
    }

    const showBigMailStatic = (data, type) => {
        if (type === "SMS") {
            setContentShowInModal({
                ...contentShowInModal,
                message: data,
                direction: "outbound",
                type: type,
            })
        } else if (type === "EMAIL") {
            setContentShowInModal({
                ...contentShowInModal,
                subject: data.subject,
                template: data.template,
                direction: "outbound",
                type: type,
            })
        }
        setShowEmailmodal(true)
    }

    const scrollHandel = async (inboxDiv) => {
        if (!isScroll) {
            setClientHeight(comLogRef.current?.clientHeight);
            setScrolledHeight(comLogRef.current?.scrollHeight)
            setScrolledTop(comLogRef.current?.scrollTop);
            if (comLogRef.current.scrollTop < 260) {
                if (paginationData.totalPages > paginationData.currentPage) {
                    await fetchInboxLogList(parseInt(paginationData.currentPage) + 1);
                }
            }
        }
    }

    const goToListBottom = (e) => {
        comLogRef.current.scrollTop = comLogRef.current.scrollHeight - comLogRef.current.clientHeight;
    }

    function badStringReplace(tempData, titleData) {
      let newdata = tempData.slice(0, 280 - titleData.length);
        const lastCh = newdata.charAt(newdata.length - 1);
        if (lastCh !== ">") {
            if (lastCh === "p" || lastCh === "/" || lastCh === "<" || lastCh === "1" || lastCh === "h" || lastCh === "n" || lastCh === "a" || lastCh === "s") {
                let newdata1 = newdata.split("<");
                newdata1.pop();
                newdata1.unshift("<");
                return newdata1.join("");
            } else {
                return newdata;
            }
        } else {
            return newdata;
        }
    }

    const areaOfText = useRef(contactLogData.slice(0).reverse().map(React.createRef));

    const [dimensions, setDimensions] = useState(0);

    useLayoutEffect(() => {
        if (areaOfText.current) {
            setDimensions(areaOfText.current?.offsetHeight);
        }
    }, [areaOfText.current?.offsetHeight]);
    const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset : null);
    return (
        <>
            {isLoader ? <Loader/> : ""}


            <div className="contactTabsInner">

                <div className="inboxPage" ref={comLogRef} style={{height: "100%", width: "100%"}}
                     onScroll={scrollHandel}>

                    {
                        (scrolledHeight > 2500 &&
                            scrolledTop <= scrolledHeight - clientHeight - 800)
                            ?

                            <button className="goData" onClick={goToListBottom}>Jump to latest Messages <img
                                src={arrowDown}/></button>
                            : ""
                    }
                    {contactLogData && contactLogData.length > 0 &&
                        <div className="noMoredata">This contact has no more communication </div>
                    }
                    {contactLogData && contactLogData.length > 0 &&
                        contactLogData.slice(0).reverse().map((elem, key) => {
                            return (
                                <div
                                    className={elem.direction === "inbound" ? "inboxChat incomingChat" : "inboxChat outgoingChat"}
                                    key={key}>
                                    <div className="msgTypeIcon">                                            
                                        <img src={
                                            elem?.log_type === "SMS" ? (elem?.direction === "outbound" ? iconSmsOut : iconSmsIn) :
                                            elem?.log_type === "EMAIL" ? (elem?.direction === "outbound" ? iconEmailOut : iconEmailIn) :
                                            elem?.log_type === "CALL" ? 
                                                (elem?.direction === "outbound" ? iconCallOut : 
                                                    (elem?.direction === "inbound" ?
                                                        (elem?.data?.status === "forwarded" ? iconCallforword : iconCallIn ?
                                                            (elem?.data?.callStatus === "no-answer" ? iconMissedCall : iconCallIn ?
                                                                (elem?.data?.callStatus === "ringing" ? iconCallOut : "" ): ""
                                                            ) : ""
                                                        )
                                                        : "")
                                                )
                                                : ""
                                        } alt=""/>
                                    </div>
                                    <div className="txtArea">
                                        <div className="areaOfText">
                                            {
                                                elem.log_type === "SMS" ?
                                                    <h3>{elem.data.message.slice(0, 280)}</h3>
                                                    : ( elem.log_type === "CALL" ? <div className="audioBox communicationAudioPlayer inboxAudioPlayer">
                                                      <Player
                                                          audioElement={new Audio(elem.data.recordingUrl)}
                                                          trackName={elem.direction + " " +elem.log_type.toLowerCase() + (elem.direction === "outbound" ? " to " + elem.to :" from " + elem.from)}
                                                          preview={true}
                                                      />
                                                    </div> : <>
                                                      <h3>Sub: {elem.data?.subject}</h3>

                                                      <div className="emailBody"
                                                           dangerouslySetInnerHTML={{__html: elem.data && elem.data.template ? elem.data.template.slice(0, 280 - elem.data?.subject.length) : ""}}></div>

                                                    </>)
                                            }
                                        </div>
                                        {
                                            ((elem.data?.template) ? elem.data?.template.length : "") +
                                            ((elem.data?.subject) ? elem.data?.subject.length : "") > 260 ? <button
                                                    onClick={() => showBigMail(elem.data, elem.log_type, elem.direction)}
                                                    className="noBg">read more</button> :
                                                elem.data?.message && elem.data?.message.length > 280 ? <button
                                                        onClick={() => showBigMail(elem.data, elem.log_type, elem.direction)}
                                                        className="noBg">read more</button> :
                                                    ""

                                        }
                                        <div className="info">
                                            <span><img
                                                src={smalCalendar}/>{utils.convertUTCToTimezone(elem.createdAt, timezoneOffset)}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                    }
                    {
                        (newEmailData.length > 0) &&

                        newEmailData.slice(0).reverse().map((elem, key) => {
                            return (
                                <div className="inboxChat outgoingChat" key={key}>
                                    <div className="msgTypeIcon">
                                        <img src={elem.log_type === "EMAIL" ? iconEmailOut : iconSmsOut}
                                             alt=""/>
                                    </div>
                                    <div className="txtArea">
                                        <div className="areaOfText">
                                            {
                                                elem.log_type === "EMAIL" ?
                                                    <>
                                                        <h3>Sub: {elem.subject}</h3>
                                                        <div className="emailBody" dangerouslySetInnerHTML={{
                                                            __html:
                                                                badStringReplace(elem?.template, elem?.subject)
                                                            //elem?.template.trim().slice(0, 280 - elem?.subject.length)
                                                        }}>
                                                            {/* {utils.decodeHTML(elem.template)} */}
                                                        </div>
                                                    </>
                                                    :
                                                    <h3>{elem.message.slice(0, 280)}</h3>
                                            }
                                        </div>
                                        {
                                            ((elem.template) ? utils.decodeHTML(elem.template).length : "") +
                                            ((elem.subject) ? elem.subject.trim().length : "") > 267 ?
                                                <button onClick={() => showBigMailStatic(elem, elem.log_type)}
                                                        className="noBg">read more</button> :
                                                elem?.message && elem.message.trim().length > 280 ? <button
                                                        onClick={() => showBigMailStatic(elem.message, elem.log_type)}
                                                        className="noBg">read more</button> :
                                                    ""

                                        }

                                        <div className="info">
                                            <span><img
                                                src={smalCalendar}/>{utils.convertUTCToTimezone(elem?.date, timezoneOffset)}</span>
                                        </div>

                                    </div>
                                </div>
                            )
                        })

                    }
                    {contactLogData && contactLogData.length === 0 && newEmailData.length === 0 &&
                        <div className="appListsWrap">
                            <div className="noDataFound">
                                <span><span>This contact doesn’t have any communication yet</span></span>
                            </div>
                        </div>
                    }
                </div>


            </div>

            {/* ........... start editing panel........................... */}
            <OpenPanel
                device={device}
                contactGenData={contactGenData}
                emailplaceholdingData={(data) => emailplaceholdingData(data)}
                smsPlaceholdingData={(data) => smsPlaceholdingData(data)}
            />
            {showEmailmodal &&
                <EnlargeInbox
                    closeModal={closeModal}
                    contentShowInModal={contentShowInModal}
                />
            }
        </>
    );
};

export default Inbox;
