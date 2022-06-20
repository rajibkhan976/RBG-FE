import React, { useEffect, useRef, useState } from "react";

import history from "../../../../assets/images/histroy_icon_white.svg";
import comment from "../../../../assets/images/comment.svg";
import Moment from 'moment';
import { extendMoment } from 'moment-range';

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
const moment = extendMoment(Moment);



const Attendance = (props) => {

  const [displayModal, setDisplayModal] = useState(false);
  const [contactID, setContactID] = useState("");
  const [events, setEvents] = useState([]);
  const [dateRange, setDateRange] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [checkInStatus, setCheckInStatus] = useState(false);
  const [isTodayHoliday, setIsTodayHoliday] = useState(false);
  const calenderRef = useRef([]);
  const listOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
  const listOfYear = Array(20).fill(2015).map((x, y) => x + y);
  const [initialDate, setInitialDate] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(moment().format("M"));
  const [calendarYear, setCalendarYear] = useState(moment().format("YYYY"));
  

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
      setCheckInStatus(true);
    }
  }

  useEffect(async () => {
    checkInStatusCheck();
  },[]);
  const fetchAttendances = async () => {
    try {
    if (dateRange?.start) {
      setIsLoader(true);
      let payload = {
        fromDate: moment(dateRange.start).format("YYYY-MM-DD"),
        toDate: moment(dateRange.end).format("YYYY-MM-DD"),
      }
      let todayDate = moment().format("YYYY-MM-DD");
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
          start: atten.checkedInAt,
          note: atten.note,
          name: atten.contact.firstName + " " + atten.contact.lastName,
          email: atten.contact.email,
          checkInBy: atten.checkedInById === atten.contact._id ? "Self" : "Staff - " + atten.checkedInBy.firstName
        }
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
            start: holiday.fromDate,
            end: holiday.toDate,
            name: holiday.name,
            title: holiday.name,
            isHoliday: true,
            className: "hasHoliday"
          }
          eventArr.push(eventObj);
        }
      }

      // Push blank date
      var range = moment().range(payload.fromDate, payload.toDate);
      let dateRangeArr = Array.from(range.by('day', { step: 1 }));
      for (let mDate of dateRangeArr) {
        let eventObj = {
          start: mDate.format("YYYY-MM-DD")
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
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  }
  const nextMonth = () => {
    if (calendarMonth == 12) {
      setCalendarMonth(1);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  }

  const renderEventContent = (e) => {
    // console.log("Render e", e.event.extendedProps, e)

    if (e.view.type == "listMonth") {
      let isHoliday = e.event.extendedProps?.isHoliday ? true : false;
      let eventDate = moment(e.event._instance.range.start).utc().format("ddd, 	DD");
      let eventTime = moment(e.event._instance.range.start).utc().format("hh:mm A");
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

  return (
    <div className="contactTabsInner appointmentPage attendencePage">
      <div className="modalcont_header">
        <div className="names">
          <h3 className="headingTabInner">Attendance</h3>
          <p className="subheadingTabInner">View monthly attendance data</p>
        </div>
        <div className="action"> 
          {!checkInStatus && !isTodayHoliday? 
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
          timeZone={"UTC"}
          listDaySideFormat={false}
          initialView='listMonth'
          initialDate={initialDate}
          events={events}
          ref={calenderRef}
          allDay= {true}
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
          checkInStatus={setCheckInStatus}
          fetchAttendances={fetchAttendances}
          />
        </>
      }
    </div>


  );
};

export default Attendance;
