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
        // console.log("Render e", e.event.extendedProps, e)
        // if (!e.event._instance.range && e.event._instance.range.start) {
        //     return false;
        // }
        console.log("renderEventContent called", e.view.type)
        if (e.view.type == "listDay" || e.view.type == "listMonth") {
            let isHoliday =  e.event.extendedProps ?. isHoliday ? true : false;
            setMakeHeaderOpen(true);

            console.log("Range start", e.event._instance.range.start, "tz", tz, e.event.extendedProps.checkedInAt)
            // let eventDate = momentTZ.tz(e.event._instance.range.start, tz).format("ddd, DD");
            // let eventTime = momentTZ.tz(e.event._instance.range.start, tz).format("hh:mm A");

            let dateSource = e.event.extendedProps.checkedInAt ? e.event.extendedProps.checkedInAt : e.event._instance.range.start;
            let eventDate = dateSource.toString().split(" ").splice(0,3).join(" ");
            let eventTime = dateSource.toString().split(" ").splice(3,4).join(" ");

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
            if (tz !== "UTC" && dateRange?.start && timezoneOffset) {
                console.log("=================", dateRange?.start, dateRange?.end)
                const convertFromDate = utils.convertTimezoneToUTC(moment(dateRange.start).format("YYYY-MM-DD") + " " + "00:00:01", timezoneOffset).trim();
                const conversionToDate = utils.convertTimezoneToUTC(moment(dateRange.end).format("YYYY-MM-DD")+ " " + "23:59:59", timezoneOffset).trim();
                console.log("after conversion", convertFromDate, conversionToDate);
                let payload = {
                    // fromDate: moment(dateRange.start).format("YYYY-MM-DD"),
                    // toDate: moment(dateRange.end).format("YYYY-MM-DD"),
                    fromDate: convertFromDate,
                    toDate: conversionToDate,
                }
                let attendances = await AttendanceServices.fetchAttendances(payload);
                
                let eventArr = []
                for(let atten of attendances.attendance) {
                    const convertTimezone = utils.convertUTCToTimezone(atten?.checkedInAt, timezoneOffset);
                    console.log("After convert =====", convertTimezone, atten?.checkedInAt);
                    let eventObj = {
                        start: atten.checkedInAt,
                        note: atten.note,
                        name: atten.contact.firstName + " " + atten.contact?.lastName,
                        email: atten.contact.email,
                        checkInBy: atten.checkedInById === atten.contact._id ? "Self" : "Staff - " + atten.checkedInBy.firstName,
                        className: "hasAttendance",
                        backgroundColor: "#fff",
                        // checkedInAt: convertUTCtoTZ(atten.checkedInAt),
                        checkedInAt: convertTimezone,
                    }
                    eventArr.push(eventObj);
                }
                if (attendances.holidays) {
                    for(let holiday of attendances.holidays) {
                        const convertHolidayStart = utils.convertUTCToTimezone(holiday?.fromDate, timezoneOffset);
                        const convertHolidayEnd = utils.convertUTCToTimezone(holiday?.toDate, timezoneOffset);
                        let eventObj = {
                            // start: holiday.fromDate,
                            // end: holiday.toDate,
                            start: convertHolidayStart,
                            end: convertHolidayEnd,
                            isHoliday: true,
                            display: "background",
                            className: "hasHoliday"
                        }
                        eventArr.push(eventObj);
                    }
                }
                console.log("eventArr", eventArr)
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