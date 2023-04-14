import React, { useEffect, useRef, useState } from "react";
import { utils } from '../../../../helpers';

import history from "../../../../assets/images/histroy_icon_white.svg";
import comment from "../../../../assets/images/comment.svg";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { useDispatch, useSelector } from "react-redux";
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
import * as actionTypes from "../../../../actions/types";
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
  const listOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const listOfYear = Array(20).fill(2015).map((x, y) => x + y);
  const [initialDate, setInitialDate] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(moment().format("M"));
  const [calendarYear, setCalendarYear] = useState(moment().format("YYYY"));
  const [hasActiveContract, setHasActiveContract] = useState(0);
  const dispatch = useDispatch();
  const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
  const dateFormat = "YYYY-MM-DD";

  const loggedInUser = useSelector((state) => state.user.data);
  const [tz, setTz] = useState(("UTC"));

  useEffect(() => {
    // console.log("loggedInUser", loggedInUser)
    if (loggedInUser && loggedInUser.organizationTimezone) {
      setTz(loggedInUser.organizationTimezone);
      checkInStatusCheck();
    }
    
},[loggedInUser])
const timezoneOffset = useSelector((state) => (state.user?.data?.organizationTimezoneInfo?.utc_offset) ? state.user.data.organizationTimezoneInfo.utc_offset:null); 
useEffect(()=>{
    // console.log("Attandance time zone:", timezoneOffset)
},[timezoneOffset]);
  const openCheckInModal = (e) => {
    e.preventDefault();
    if (!hasActiveContract) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: "No Active contract found for this contact",
        typeMessage: "error",
      });
    } else {
      setDisplayModal(true)
    }
  }
  const closeHolidayModal = (e) => {
    setDisplayModal(false)
  }

  const checkInStatusCheck = async () => {
    let resp = await AttendanceServices.checkInStatus(props.contactId);
    if (resp.contractStatus) setHasActiveContract(1);
    if (resp.isAlreadyCheckedIn) {
      setEnableCheckIn(false);
    } else {
      setEnableCheckIn(true);
    }
  }

  const disableCheckBtn = () => {
    setEnableCheckIn(false);
  }

  useEffect(async () => {
    // console.log("loggedInUser", loggedInUser)
    checkInStatusCheck();
  },[]);
  const fetchAttendances = async () => {
    try {
    if (dateRange?.start) {
      setIsLoader(true);
      const convertFromDate = utils.convertTimezoneToUTC( dateRange.start.getFullYear() + "-" + String(dateRange.start.getMonth() + 1).padStart(2, "0") + "-" + String(dateRange.start.getDate()).padStart(2, "0") + " " + "00:00:01", timezoneOffset);
      const convertToDate = utils.convertTimezoneToUTC(dateRange.start.getFullYear() + "-" + String(dateRange.start.getMonth() + 1).padStart(2, "0") + "-" + new Date(dateRange?.start.getFullYear(), dateRange?.start.getMonth() + 1, 0).getDate() + " " + "23:59:59", timezoneOffset);
      console.log("Date range start and end", convertFromDate, convertToDate);

      let payload = {
        // fromDate: moment(dateRange.start).tz(tz).add(1, "days").format("YYYY-MM-DD"),
        // toDate: moment(dateRange.end).tz(tz).subtract(1, "days").format("YYYY-MM-DD"),
        fromDate: convertFromDate,
        toDate: convertToDate,
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
        const convertCheckInAt = utils.convertUTCToTimezone(atten?.checkedInAt, timezoneOffset);
        const checInAtProperFormat = moment(convertCheckInAt).format("YYYY-MM-DD hh:mm:ss")
        let eventObj = {
          // start: convertUTCtoTZ(atten.checkedInAt, "YYYY-MM-DD HH:mm:ss"),
          start: moment(convertCheckInAt).format("YYYY-MM-DD hh:mm:ss"),
          // checkedInAt: convertUTCtoTZ(atten.checkedInAt), 
          checkedInAt: checInAtProperFormat,
          note: atten.note,
          name: atten.contact.firstName + " " + atten.contact.lastName,
          email: atten.contact.email,
          checkInBy: atten.checkedInById === atten.contact._id ? "Self" : "Staff - " + atten.checkedInBy.firstName
        }
        eventArr.push(eventObj);
        console.log("event Array", eventArr);
      }
      // let payload.fromDate
      var range = moment().range(moment(dateRange.start), moment(dateRange.end));
      let dateRangeArr = Array.from(range.by('day', { step: 1 }));
      for (let mDate of dateRangeArr) {

        let eventObj = {
          start: mDate.format("YYYY-MM-DD"),
          isBlankDate: true
        }
        // for (let atten of attendances.attendance) {
        //   let eventObj = {
        //     start: convertUTCtoTZ(atten.checkedInAt, "YYYY-MM-DD HH:mm:ss"),
        //     checkedInAt: convertUTCtoTZ(atten.checkedInAt),
        //     note: atten.note,
        //     name: atten.contact.firstName + " " + atten.contact.lastName,
        //     email: atten.contact.email,
        //     checkInBy: atten.checkedInById === atten.contact._id ? "Self" : "Staff - " + atten.checkedInBy.firstName
        //   }
        //   // console.log("event ", eventObj)
        //   eventArr.push(eventObj);
        // }
        // let payload.fromDate
        var range = moment().range(moment(dateRange.start), moment(dateRange.end).subtract(1, "day"));
        let dateRangeArr = Array.from(range.by('day', { step: 1 }));
        // for (let mDate of dateRangeArr) {

        //   let eventObj = {
        //     start: mDate.format("YYYY-MM-DD"),
        //     isBlankDate: true
        //   }

        //   // Holiday filter
        //   if (attendances.holidays) {
        //     for (let holiday of attendances.holidays) {
        //       if (
        //         moment(mDate).isBetween(holiday.fromDate, holiday.toDate) ||
        //         moment(mDate).isSame(holiday.fromDate) ||
        //         moment(mDate).isSame(holiday.toDate)
        //       ) {
        //         eventObj = {
        //           start: mDate.format("YYYY-MM-DD"),
        //           name: holiday.name,
        //           title: holiday.name,
        //           isHoliday: true,
        //           className: "hasHoliday"
        //         }

        //       }
        //     }
        //   }
        //   eventArr.push(eventObj);
        // }

        console.clear();
        eventArr = dateRangeArr.map(el => {
          // console.log("Date", el.format("YYYY-MM-DD"));
          let eventObj = {
            start: el.format("YYYY-MM-DD"),
            isBlankDate: true
          };
          const checkedInObj = [];
          attendances?.attendance.length && attendances.attendance.forEach(atten => {
            console.log("Attendance=====", attendances);
            const convertCheckInAt = utils.convertUTCToTimezone(atten.checkedInAt, timezoneOffset);
            console.log("After conversion", convertCheckInAt);
            if (convertUTCtoTZ(convertCheckInAt, "YYYY-MM-DD") === eventObj.start) {
              checkedInObj.push({
                // checkedInAt: convertUTCtoTZ(atten.checkedInAt),
                checkedInAt: moment(convertCheckInAt).format("YYYY-MM-DD hh:mm:ss"),
                note: atten.note,
                name: atten.contact.firstName + " " + atten.contact.lastName,
                email: atten.contact.email,
                checkInBy: atten.checkedInById === atten.contact._id ? "Self" : "Staff - " + atten.checkedInBy.firstName,
                isBlankDate: false
              });
            }
          });
          console.log("Checked object", checkedInObj);
          const holidays = [];
          attendances?.holidays?.length && attendances.holidays.forEach(holiday => {
            // console.log("EL",moment(el).isBetween(holiday.fromDate, holiday.toDate));
            console.log("=============", holiday);
            const convertHolidayFrom = utils.convertUTCToTimezone(holiday?.fromDate, timezoneOffset);
            const convertHolidayTo = utils.convertUTCToTimezone(holiday?.toDate, timezoneOffset);
            // if(isToday(moment(holiday.fromDate).format("YYYY-MM-DD"),moment(holiday.toDate).format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))) {
            //   setIsTodayHoliday(true);
            // }
            if(isToday(moment(convertHolidayFrom).format("YYYY-MM-DD"),moment(convertHolidayTo).format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))) {
              setIsTodayHoliday(true);
            }
            // if (
            //   moment(el).isBetween(holiday.fromDate, holiday.toDate) ||
            //   moment(el).isSame(holiday.fromDate) ||
            //   moment(el).isSame(holiday.toDate)
            // ) {

            //   holidays.push({
            //     name: holiday.name,
            //     title: holiday.name,
            //     isHoliday: true,
            //     className: "hasHoliday",
            //     isBlankDate: false
            //   });

            // }
            if (
              moment(el).isBetween(convertHolidayFrom, convertHolidayTo) ||
              moment(el).isSame(convertHolidayFrom) ||
              moment(el).isSame(convertHolidayTo)
            ) {

              holidays.push({
                name: holiday.name,
                title: holiday.name,
                isHoliday: true,
                className: "hasHoliday",
                isBlankDate: false
              });

            }
          });

          // console.log("Checkin OBJ", checkedInObj);
          return {
            ...eventObj,
            ...checkedInObj[0],
            ...holidays[0]
          };
        });
        // console.log("Today", today);
        // attendances?.holidays?.length && attendances.holidays.forEach(el => {
        //   if(isToday(moment(el.fromDate).format("YYYY-MM-DD"),moment(el.toDate).format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"))) {
        //     setIsTodayHoliday(true);
        //   }
        // })

        // console.log("New Evt Arr", newEvtObj)
        // console.log("Attendances", attendances.attendance);
        // console.log("Date Range", dateRangeArr);
        // eventArr = newEvtObj;
        console.log("eventArr", eventArr);
        setEvents(eventArr);
        setIsLoader(false);
      }
      // console.log("eventArr", eventArr)
      setEvents(eventArr);
      setIsLoader(false);
    }
    } catch (e) {
      setIsLoader(false);
      // console.log("Error", e.message)
    }
  }

  const isToday = (fromDate, toDate, currentDate) => {
    const date = new Date(currentDate.toString());
    const start = new Date(fromDate.toString());
    const end = new Date(toDate.toString());

    if (date >= start && date <= end) {
      // console.log(currentDate, '✅ date is between the 2 dates');
      return true;
    } else {
      // console.log('⛔️ date is not in the range');
      return false;
    }
  }
  useEffect(() => {
    fetchAttendances();
  }, [dateRange])

  useEffect(() => {
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
    // console.log("Next month", calendarMonth)
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
    // console.log("raw date", date)
    // console.log("utcDate", utcDate)
    // console.log("convertedDate", convertedDate)
    return convertedDate;
  }

  const renderEventContent = (e) => {
    // console.clear()
    console.log("Render e", e.event.extendedProps.checkedInAt, e)

    if (!e.event._instance.range && e.event._instance.range.start) {
      return false;
    }
    // console.log("Start", e.event._instance.range.start);
    // console.log("End", e.event._instance.range.end);
    // console.log("Check In", e.event.extendedProps.checkedInAt);
    if (e.view.type == "listMonth") {
      let isHoliday = e.event.extendedProps?.isHoliday ? true : false;
      let dateSource = e.event.extendedProps.checkedInAt ? e.event.extendedProps.checkedInAt : e.event._instance.range.start;
      let eventDate = moment(dateSource).format("ddd, DD");

      console.log("Before conversion event date", dateSource);
      // let eventDate = utils.convertUTCToTimezone(convertUTCtoTZ(dateSource, "YYYY-MM-DD hh:mm:ss"), timezoneOffset).split(",")[0].split(" ").join(", ");
      // let convertUTCToTimezone = utils.convertUTCToTimezone(dateSource, timezoneOffset);
      // console.log("After conversion Event Date", convertUTCToTimezone);
      if (isHoliday) {
        // eventDate = moment(e.event._instance.range.start).format("ddd, DD");
        eventDate = moment(dateSource).format("ddd, DD");
      }
      // let eventTime = convertUTCtoTZ(dateSource, "hh:mm A");
      // let eventTime = utils.convertUTCToTimezone(dateSource, timezoneOffset).split(" ").splice(3,4).join(" ");
      let eventTime = dateSource;
      // console.log("dateSource event time", convertUTCToTimezone.split(" ").splice(3, 4).join(" "))
      if (e.event.extendedProps.checkInBy) {
        // console.log("event dateSource >>>", e.event.extendedProps.checkedInAt, convertUTCtoTZ(e.event.extendedProps.checkedInAt, "YYYY-MM-DD HH:mm:ss"))
      }

      return (
        <>
          {!isHoliday ?
            <>
              <span className='fc-list-dateTd'>{eventDate}</span>
              {/* <span className='fc-list-event-time'>
                {e.event.extendedProps.checkInBy &&
                  <span className="norm" > {
                    eventTime ? eventTime : ''
                  }</span>
                }
              </span> */}
              <span className='fc-list-event-time'>
                {e.event.extendedProps.checkInBy &&
                  <span className="norm" > {eventTime? moment(eventTime).format("hh:mm A"): ''}</span>
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
    // console.log("events arr after render", e.event?._def.range.start ? e.event._def.range.start : "Blank")
  }
  return (
    <div className="contactTabsInner appointmentPage attendencePage">
      <div className="modalcont_header">
        <div className="names">
          <h3 className="headingTabInner">Attendance</h3>
          <p className="subheadingTabInner">View monthly attendance data</p>
        </div>
        <div className="action">
          {enableCheckIn && !isTodayHoliday ?
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
          timeZone={false}
          listDaySideFormat={false}
          initialView='listMonth'
          initialDate={initialDate}
          events={events}
          eventsSet={eventsSet}
          ref={calenderRef}
          allDay={false}
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
            checkInStatus={disableCheckBtn}
            fetchAttendances={fetchAttendances}
          />
        </>
      }
    </div>


  );
};

export default Attendance;
