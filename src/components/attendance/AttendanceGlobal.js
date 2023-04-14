import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

import Attendancehead from './Attendancehead';
//import * as actionTypes from "../../actions/types";
import { useSelector } from "react-redux";
import {AttendanceServices} from "../../services/attendance/attendanceServices";
import moment from "moment";
import comment from "../../assets/images/comment.svg";
import avatarImg from "../../assets/images/profile.png";
import momentTZ from "moment-timezone";

import Loader from "../shared/Loader";
import { utils } from '../../helpers';

const AppointmentGlobal = (props) => {
    
    const loggedInUser = useSelector((state) => state.user.data);
    const [isLoader, setIsLoader] = useState(false);
    const [events, setEvents] = useState([]);
    const [editAppointment, setEditAppointment] = useState(false)
    const [makeHeaderOpen, setMakeHeaderOpen] = useState(false)
    const calenderRef = useRef([]);
    const [dateRange, setDateRange] = useState(false);
    const [tz, setTz] = useState(("UTC"));
    const [defaultDate, setDefaultDate] = useState();
    const headerToolbar = {
        left: 'today',
        center: 'prev,title,next',
        right: 'dayGridMonth,listMonth,listDay'
    }
    const buttonText = {
        listDay: "Day"
    }
    
    useEffect(() => {
        console.log("loggedInUser", loggedInUser)
        if (loggedInUser && loggedInUser.organizationTimezone) {
            console.log("set tz")
            setTz(loggedInUser.organizationTimezone)
        }
        
    },[loggedInUser])
     const clickOnDate = (e) => {
        let api = calenderRef.current.getApi()
        api.changeView('listDay', e.dateStr)
     }
     
    const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null); 
    useEffect(()=>{
        console.log("Attandance time zone:", timezoneOffset)
    },[timezoneOffset]);
    const renderEventContent = (e) => {
        // console.log("Render e", e.event.extendedProps)
        // if (!e.event._instance.range && e.event._instance.range.start) {
        //     return false;
        // }
        // console.log("Range event content called", e.view.type)
        if (e.view.type == "listDay" || e.view.type == "listMonth") {
            let isHoliday =  e.event.extendedProps ?. isHoliday ? true : false;
            setMakeHeaderOpen(true);
            console.log("Range start", e.event._instance.range.start, "Checked at", e.event.extendedProps.checkedInAt);

            // let eventDate = momentTZ.tz(e.event._instance.range.start, tz).format("ddd, DD");
            // let eventTime = momentTZ.tz(e.event._instance.range.start, tz).format("hh:mm A");
            // let eventDate = moment(momentTZ.tz(dateSource, tz)).format("ddd, DD");
            // let momentTimeZone = moment(momentTZ.tz(dateSource, tz)).format("yyyy-DD-mm hh:mm:ss");
            // let eventTime = convertUTCtoTZ(dateSource, "hh:mm A");
            let dateSource = e.event.extendedProps.checkedInAt ? e.event.extendedProps.checkedInAt : e.event._instance.range.start;
            console.log("Range date source", dateSource)
            let eventDate = e.event.extendedProps.checkedInAt.toString().split(" ").splice(0,3).join(" ");
            let eventTime = e.event.extendedProps.checkedInAt.toString().split(" ").splice(3,4).join(" ");

            console.log("<br>");
            return (
                <>
                    {!isHoliday ? 
                        <>
                            <b>{e.event.extendedProps.title}</b>
                            <span className='fc-list-nameTd'>{e.event.extendedProps.name}</span>
                            <span className='fc-list-emailTd'>{e.event.extendedProps.email}</span>
                            <span className='fc-list-dateTd'>{eventDate}</span>
                            <span className='fc-list-event-time'>{eventTime}</span>
                            <span className='fc-list-event-new-tooltip'>
                            {e.event.extendedProps.note && <span className="eyeToolTips infoSpan"><img src={comment}/><span className="tooltiptextInfo">{e.event.extendedProps.note}</span></span>}
                            </span>
                            <span className='fc-list-checkinByTd'>{e.event.extendedProps.checkInBy}</span>
                        </>
                        : "" 
                    }
                    
                </>
            )
        }
        if (e.view.type == "dayGridMonth") {
           setMakeHeaderOpen(false);
        }
    }

    const convertUTCtoTZ = (date, format) => {
        let utcDate = momentTZ.tz(date, "UTC");
        let convertedDate = momentTZ.tz(utcDate, tz);
        if (format) {
            convertedDate = convertedDate.format(format);
        }
        console.log("raw date", date)
        console.log("utcDate", utcDate)
        console.log("convertedDate", convertedDate)
        return convertedDate;
    }
    
    useEffect(async () => {
        try {
            if (dateRange?.start && timezoneOffset) {
                const convertFromDate = utils.convertTimezoneToUTC(moment(dateRange?.start).format("YYYY-MM-DD") + " " + "00:00:01", timezoneOffset).trim();
                const conversionToDate = utils.convertTimezoneToUTC(moment(dateRange?.end).format("YYYY-MM-DD")+ " " + "23:59:59", timezoneOffset).trim();
                // console.log("after conversion", convertFromDate, conversionToDate);
                let payload = {
                    // fromDate: moment(dateRange.start).format("YYYY-MM-DD"),
                    // toDate: moment(dateRange.end).format("YYYY-MM-DD"),
                    fromDate: convertFromDate,
                    toDate: conversionToDate,
                }
                let attendances = await AttendanceServices.fetchAttendances(payload);
                
                let eventArr = []
                for(let atten of attendances.attendance) {
                    // console.log("before check in", atten?.checkedInAt);
                    const convertTimezone = utils.convertUTCToTimezone(atten?.checkedInAt, timezoneOffset);
                    // console.log("After convert check in", convertTimezone);
                    let convertToCheckInFormat = moment(convertTimezone).format("YYYY-MM-DD hh:mm:ss");
                    // let convertToCheckInFormat = moment(convertTimezone).format('YYYY-MM-DDTHH:mm:ss[Z]');
                    // let convertToCheckInFormat = "2023-04-10T11:45:00.12Z";
                    console.log("format check in", convertToCheckInFormat)
                    setDefaultDate(moment(convertTimezone).format('YYYY-MM-DD'));
                    let eventObj = {
                        // start: atten.checkedInAt,
                        start: convertToCheckInFormat,
                        note: atten.note,
                        name: atten.contact.firstName + " " + atten.contact?.lastName,
                        email: atten.contact.email,
                        checkInBy: atten.checkedInById === atten.contact._id ? "Self" : "Staff - " + atten.checkedInBy.firstName,
                        className: "hasAttendance",
                        backgroundColor: "#fff",
                        // checkedInAt: convertUTCtoTZ(atten.checkedInAt),
                        checkedInAt: convertTimezone,
                    }
                    // console.log("After check in", eventObj.checkedInAt);
                    eventArr.push(eventObj);
                }
                if (attendances.holidays) {
                    for(let holiday of attendances.holidays) {
                        // console.log("Holiday====", holiday);
                        const convertHolidayStart = utils.convertUTCToTimezone(holiday?.fromDate, timezoneOffset);
                        const convertHolidayEnd = utils.convertUTCToTimezone(holiday?.toDate, timezoneOffset);          
                        let eventObj = {
                            // start: holiday.fromDate,
                            // end: holiday.toDate,
                            start: convertHolidayStart,
                            end: convertHolidayEnd,
                            title: holiday.name,
                            isHoliday: true,
                            display: "background",
                            className: "hasHoliday"
                        }
                        console.log("Holiday payload", eventObj);
                        eventArr.push(eventObj);
                    }
                }
            console.log("event Arr", eventArr)
                setEvents(eventArr);
            }
        } catch (e) {
            console.log("error in set event", e.message);
            setIsLoader(false);

        }
    }, [dateRange, tz])

    const handleMonthChange = async (e) => {
        setDateRange(e);
    }


    const moreLinkContent = (e) => {
        console.log("all member", e);
        return (
            <>
                <span className='dayCellEvent'><span className='number'>{ e.num }</span> <span>Member attended</span></span>
            </>
        )
    }    

    const moreLinkClick = (e) => {
        let api = calenderRef.current.getApi()
        api.changeView('listDay', e.date)
    }
    useEffect(()=>{
        // const todayDate = moment(new Date()).format("YYYY-MM-DD");
        // const todayTime = moment(new Date()).format("hh:mm:ss");
        // setActiveStart(moment(utils.convertUTCToTimezone(todayDate + " " + todayTime, timezoneOffset)).format('YYYY-MM-DD'));
        console.log("Today date", defaultDate);
    }, [timezoneOffset && defaultDate]);


    return (
        <div className='dashInnerUI'>
            { isLoader ? <Loader/>: "" }
            <Attendancehead/>
            <div className='userListBody'>
                <div className='global-attendance'>
                    {makeHeaderOpen && 
                     <div className='madeUpTableHeader'>
                        <div>Contact Name</div>
                        <div>Email</div>
                        <div>Date</div>
                        <div>Check-In</div>
                        <div>Checked-in by</div>
                    </div>}
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={headerToolbar}
                        buttonText={buttonText}
                        events={events}
                        initialView='dayGridMonth'
                        allDay= {false}
                        dayMaxEvents={0}
                        moreLinkContent={moreLinkContent}
                        moreLinkClick={moreLinkClick}
                        dateClick={clickOnDate}
                        ref={calenderRef}
                        defaultDate={defaultDate}
                        // initialDate={}
                        // start={'2018-09-01T12:30:00Z'}
                        noEventsText={"No record found"}
                        eventContent={renderEventContent}
                        datesSet={handleMonthChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppointmentGlobal;