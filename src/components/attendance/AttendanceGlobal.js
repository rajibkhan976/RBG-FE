import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

import Attendancehead from './Attendancehead';
//import * as actionTypes from "../../actions/types";
//import {useDispatch} from "react-redux";
import {AttendanceServices} from "../../services/attendance/attendanceServices";
import moment from "moment";
import comment from "../../assets/images/comment.svg";
import avatarImg from "../../assets/images/profile.png";

import Loader from "../shared/Loader";

const AppointmentGlobal = (props) => {
  
    const [isLoader, setIsLoader] = useState(false);
    const [events, setEvents] = useState([]);
    const [editAppointment, setEditAppointment] = useState(false)
    const [makeHeaderOpen, setMakeHeaderOpen] = useState(false)
    const calenderRef = useRef([]);
    const [dateRange, setDateRange] = useState(false);
    const headerToolbar = {
        left: 'today',
        center: 'prev,title,next',
        right: 'dayGridMonth,listMonth,listDay'
    }
    const buttonText = {
        listDay: "Day"
    }
    

     const clickOnDate = (e) => {
        let api = calenderRef.current.getApi()
        api.changeView('listDay', e.dateStr)
     }

    const renderEventContent = (e) => {
        // console.log("Render e", e.event.extendedProps, e)
        if (e.view.type == "listDay" || e.view.type == "listMonth") {
            let isHoliday =  e.event.extendedProps ?. isHoliday ? true : false;
            setMakeHeaderOpen(true);
            
            let eventDate = moment(e.event._instance.range.start).utc().format("Do MMM YYYY");
            let eventTime = moment(e.event._instance.range.start).utc().format("hh:mm A");
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
    useEffect(async () => {
        try {
            if (dateRange ?. start) {  
                let payload = {
                    fromDate: moment(dateRange.start).format("YYYY-MM-DD"),
                    toDate: moment(dateRange.end).format("YYYY-MM-DD"),
                }
                let attendances = await AttendanceServices.fetchAttendances(payload);
                
                let eventArr = []
                for(let atten of attendances.attendance) {
                    console.log("date", atten.checkedInAt, moment.utc(atten.checkedInAt, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"))
                    let eventObj = {
                        start: moment.utc(atten.checkedInAt, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"),
                        note: atten.note,
                        name: atten.contact.firstName + " " + atten.contact.lastName,
                        email: atten.contact.email,
                        checkInBy: atten.checkedInBy._id && atten.checkedInBy._id === atten.contact._id ? "Staff - " + atten.checkedInBy.firstName : "Self",
                        className: "hasAttendance",
                        backgroundColor: "#fff"
                    }
                    eventArr.push(eventObj);
                }
                if (attendances.holidays) {
                    for(let holiday of attendances.holidays) {            
                        let eventObj = {
                            start: holiday.fromDate,
                            end: holiday.toDate,
                            title: holiday.name,
                            isHoliday: true,
                            display: "background",
                            className: "hasHoliday"
                        }
                        eventArr.push(eventObj);
                    }
                }
            // console.log("eventArr", eventArr)
            setEvents(eventArr);
            }
        } catch (e) {
            console.log("error in set event", e.message)

        }
    }, [dateRange])

    const handleMonthChange = async (e) => {
        setDateRange(e);
    }

    const moreLinkContent = (e) => {
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
                        timeZone={"UTC"}
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