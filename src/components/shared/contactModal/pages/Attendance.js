import React, { useEffect, useRef, useState } from "react";

import history from "../../../../assets/images/histroy_icon_white.svg";
import comment from "../../../../assets/images/comment.svg";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { useSelector } from "react-redux";
import FullCalendar from '@fullcalendar/react'; // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid';// a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import { AttendanceServices } from "../../../../services/attendance/attendanceServices";
import AddCommentModal from './addCommentModal';
import cal_arrow1 from "../../../../assets/images/cal_arrow1.svg";
import cal_arrow2 from "../../../../assets/images/cal_arrow2.svg";
import dropArrow from "../../../../assets/images/dropArrow.svg";
import Loader from "../../Loader";
import momentTZ from "moment-timezone";
const moment = extendMoment(Moment);




const Attendance = (props) => {

  const [displayModal, setDisplayModal] = useState(false);
  const [contactID, setContactID] = useState("");
  const [events, setEvents] = useState([]);
  const [dateRange, setDateRange] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [enableCheckIn, setEnableCheckIn] = useState(false);
  const [isTodayHoliday, setIsTodayHoliday] = useState(false);
  const calenderRef = useRef([]);
  const listOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
  const listOfYear = Array(20).fill(2015).map((x, y) => x + y);
  const [initialDate, setInitialDate] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(moment().format("M"));
  const [calendarYear, setCalendarYear] = useState(moment().format("YYYY"));
  const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
  const dateFormat = "YYYY-MM-DD";
  
  const loggedInUser = useSelector((state) => state.user.data);
  const [tz, setTz] = useState(("UTC"));

  useEffect(() => {
    console.log("loggedInUser", loggedInUser)
    if (loggedInUser && loggedInUser.organizationTimezone) {
        setTz(loggedInUser.organizationTimezone)
    }
    
},[loggedInUser])

  const openCheckInModal = (e) => {
    e.preventDefault();
    setDisplayModal(true)
  }
  const closeHolidayModal = (e) => {
    setDisplayModal(false)
  }

  const checkInStatusCheck = async () => {
    let resp = await AttendanceServices.checkInStatus(props.contactId)
    if (resp.isAlreadyCheckedIn) {
      setEnableCheckIn(false);
    } else {
      setEnableCheckIn(true);
    }
  }

  useEffect(async () => {
    console.log("loggedInUser", loggedInUser)
    checkInStatusCheck();
  },[]);
  const fetchAttendances = async () => {
    try {
    if (dateRange?.start) {
      setIsLoader(true);
      let payload = {
        fromDate: moment(dateRange.start).add(1, "days").format("YYYY-MM-DD"),
        toDate: moment(dateRange.end).subtract(1, "days").format("YYYY-MM-DD"),
      }
      let todayDate = momentTZ.tz(tz);
      let attendances = await AttendanceServices.fetchAttendances(payload, props.contactId);
      let eventArr = [];
      let attenCount = attendances.attendance.length;
      setAttendanceCount(attenCount);
      // Set calander to last attendance date
      if (attenCount) {
        setInitialDate(attendances.attendance[attenCount-1].checkedInAt);
      }
      for (let atten of attendances.attendance) {
        let eventObj = {
          start: convertUTCtoTZ(atten.checkedInAt, "YYYY-MM-DD HH:mm:ss"),
          checkedInAt: convertUTCtoTZ(atten.checkedInAt), 
          note: atten.note,
          name: atten.contact.firstName + " " + atten.contact.lastName,
          email: atten.contact.email,
          checkInBy: atten.checkedInById === atten.contact._id ? "Self" : "Staff - " + atten.checkedInBy.firstName
        }
        console.log("event ", eventObj)
        eventArr.push(eventObj);
      }
      if (attendances.holidays) {
        for (let holiday of attendances.holidays) { 
          if (
            moment(todayDate).isBetween(holiday.fromDate, holiday.toDate) || 
            moment(todayDate).isSame(holiday.fromDate) ||
            moment(todayDate).isSame(holiday.toDate) 
          ) {
            setIsTodayHoliday(true);
          }
          
          let eventObj = {
            start:  holiday.fromDate,
            end: holiday.toDate,
            name: holiday.name,
            title: holiday.name,
            isHoliday: true,
            className: "hasHoliday"
          }
          eventArr.push(eventObj);
        }
      }

      // let payload.fromDate
      var range = moment().range(moment(dateRange.start), moment(dateRange.end));
      let dateRangeArr = Array.from(range.by('day', { step: 1 }));
      for (let mDate of dateRangeArr) {
        let eventObj = {
          start: mDate.format("YYYY-MM-DD"),
          isBlankDate: true
        }
        let isDateExist = false;
        for (let ev of eventArr) {
          if (moment(ev.start).format("YYYY-MM-DD") == eventObj.start) {
            isDateExist = true;
          }
        }
        if (!isDateExist) {
         eventArr.push(eventObj);
        }         
      }
      console.log("eventArr", eventArr)
      setEvents(eventArr);
      setIsLoader(false);
    }
    } catch (e) {
      setIsLoader(false);
      console.log("Error", e.message)
    }
  }
  useEffect(async () => {
    fetchAttendances();
  }, [dateRange])

  useEffect(async () => {
    let api = calenderRef.current.getApi()
    let month = calendarMonth < 10 ? "0" + calendarMonth : calendarMonth;
    let jumpTo = calendarYear + "-" + month + "-01";
    api.changeView('listMonth', jumpTo);
  }, [calendarMonth, calendarYear])

  const handleMonthChange = async (e) => {
    setDateRange(e);
  }
  const handleCalYearChange = (e) => {
    setCalendarYear(e.target.value);
  }
  const handleCalMonthChange = (e) => {
    setCalendarMonth(e.target.value);
  }
  
  const prevMonth = () => {
    if (calendarMonth == 1) {
      setCalendarMonth(12);
      setCalendarYear(Number(calendarYear) - 1);
    } else {
      setCalendarMonth(Number(calendarMonth) - 1);
    }
  }
  const nextMonth = () => {
    console.log("Next month", calendarMonth)
    if (calendarMonth == 12) {
      setCalendarMonth(1);
      setCalendarYear(Number(calendarYear) + 1);
    } else {
      setCalendarMonth(Number(calendarMonth) + 1);
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

  const renderEventContent = (e) => {
    // console.log("Render e", e.event.extendedProps, e)

    if (!e.event._instance.range && e.event._instance.range.start) {
        return false;
    }

    if (e.view.type == "listMonth") {
      let isHoliday = e.event.extendedProps?.isHoliday ? true : false;
      let dateSource = e.event.extendedProps.checkedInAt ? e.event.extendedProps.checkedInAt : e.event._instance.range.start;
      let eventDate = moment(momentTZ.tz(dateSource, tz)).format("ddd, DD");
      
      let eventTime = convertUTCtoTZ(dateSource, "hh:mm A");
      if (e.event.extendedProps.checkInBy) {
        console.log("event dateSource >>>", e.event.extendedProps.checkedInAt, convertUTCtoTZ(e.event.extendedProps.checkedInAt, "YYYY-MM-DD HH:mm:ss"))
      }
      
      return (
        <>
          {!isHoliday ?
            <>
              <span className='fc-list-dateTd'>{eventDate}</span>
              <span className='fc-list-event-time'>
                {e.event.extendedProps.checkInBy && 
                  <span className="norm" > {
                    eventTime ? eventTime : ''
                  }</span>
                }
              </span>
              <span className='fc-list-event-new-tooltip'>
                {e.event.extendedProps.note && <span className="eyeToolTips infoSpan"><img src={comment} /><span className="tooltiptextInfo">{e.event.extendedProps.note}</span></span>}
              </span>
              <span className='fc-list-checkinByTd'>{e.event.extendedProps.checkInBy}</span>
            </>
            :
            <>
              <span className='fc-list-dateTd'>{eventDate}</span>
              <span className='fc-list-event-time'>
                <span className="norm holiday" >{e.event.extendedProps.name}</span>
              </span>
              <span className='fc-list-event-new-tooltip'></span>
              <span className='fc-list-checkinByTd'></span>
            </>
          }

        </>
      )
    }
   
  }

  const eventsSet = (e) => {
    console.log("events arr after render", e.event?._def.range.start ? e.event._def.range.start : "Blank")
  }
  return (
    <div className="contactTabsInner appointmentPage attendencePage">
      <div className="modalcont_header">
        <div className="names">
          <h3 className="headingTabInner">Attendance</h3>
          <p className="subheadingTabInner">View monthly attendance data</p>
        </div>
        <div className="action"> 
          {enableCheckIn && !isTodayHoliday? 
          <button className="orangeBtn clockinBtn" onClick={openCheckInModal}>
            <img src={history} alt="" /> Check In
          </button>
          :
          <button className="checkedIn orangeBtn clockinBtn" disabled>
            <img src={history} alt="" /> {isTodayHoliday ? "Check In" : "Checked In"} 
          </button>
          }
        </div>
      </div>

      <div className="attendenceContactModal">
        
        <div className="attendanceTableHeader">
          <table>
            <tr>
              <td className="day">Day</td>
              <td className="checkin">Check-in</td>
              <td className="checkinby">Checked-in by</td>
            </tr>
          </table>
        </div>
        <div className="customCalendarHeader">
          <div className="tableHeader attendencePage">
            <div className="headMiddle">
               <button className="noBg" onClick={prevMonth}><img src={cal_arrow1} /></button>
                 <select
                  value={calendarMonth}
                  onChange={handleCalMonthChange}
                 >
                  {listOfMonth.map((el, key) => {               
                    return (
                      <option key={"m" + key} value={key + 1}>{el}</option>
                      )
                  })
                }
                 </select>
                 <select
                  value={calendarYear}
                  onChange={handleCalYearChange}
                 >
                  {listOfYear.map((el, key) => {               
                    return (
                      <option key={"y" + key} value={el}>{el}</option>
                      )
                  })
                }
                 </select>
               <button className="noBg" onClick={nextMonth}><img src={cal_arrow2} /></button>
            </div>
            <div className="attendanceCount">Attended  : <span> {attendanceCount} days</span></div>
          </div>
        </div>
        <FullCalendar
          plugins={[listPlugin]}
          headerToolbar={{
            left: '',
            center: 'prev,title,next',
            right: ''
          }}
          // timeZone={tz}
          listDaySideFormat={false}
          initialView='listMonth'
          initialDate={initialDate}
          events={events}
          eventsSet={eventsSet}
          ref={calenderRef}
          allDay= {false}
          datesSet={handleMonthChange}
          eventContent={renderEventContent}
          noEventsText={""}
        />

        {isLoader ? <Loader /> : ''}
      </div>
      {displayModal &&
        <>
          <AddCommentModal 
          closeAddHolidayModal={closeHolidayModal} 
          contactId={props.contactId} 
          checkInStatus={setEnableCheckIn}
          fetchAttendances={fetchAttendances}
          />
        </>
      }
    </div>


  );
};

export default Attendance;
