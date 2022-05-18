import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

import Appointmenthead from './Appointmenthead';
import AppointmentEditModal from "../appointment/AppointmentEditModal"
import * as actionTypes from "../../actions/types";
import {useDispatch} from "react-redux";
import {AppointmentServices} from "../../services/appointment/appointment";
import moment from "moment";
import Loader from "../shared/Loader";
import CreateAppointment from './CreateAppointment';

const AppointmentGlobal = (props) => {
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);
    const [events, setEvents] = useState([]);
    const [editAppointment, setEditAppointment] = useState(false)
    const [editingApp, setEditingApp] = useState({})
    const calenderRef = useRef([]);
    const [createAppointmentModal, setCreateAppointmentModal] = useState(false)
    const fetchList = async () => {
        try {
            setIsLoader(true);
            let list = await AppointmentServices.fetchList();
            setIsLoader(false);
            if (list.appointments.length) {
                let eventArray = [];
                list.appointments.map(appointment => {
                    eventArray.push({
                        id: appointment._id,
                        title: appointment.agenda,
                        data: appointment,
                        start: moment(appointment.date, "MM/DD/YYYY").format("YYYY-MM-DD")+"T"+moment(appointment.fromTime, "hh:mm A").format("HH:mm:ss"),
                        end: moment(appointment.date, "MM/DD/YYYY").format("YYYY-MM-DD")+"T"+moment(appointment.toTime, "hh:mm A").format("HH:mm:ss")
                    });
                });
                // console.log(eventArray)
                setEvents(eventArray);
            }
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    }
    const clickOnEvent = (e) => {
        setEditingApp(e.event._def.extendedProps.data)
        setEditAppointment(true)
    }
    const clickOnDate = (e) => {
        let api = calenderRef.current.getApi()
        api.changeView('timeGridDay', e.dateStr)
    }
    const addDayClass = (e) => {
        for(var i = 0; i < events.length; i++) {
            // console.log(events[i].data.date == moment(e.date, "MM/DD/YYYY").format("MM/DD/YYYY"))
            if(events[i].data.date == moment(e.date, "MM/DD/YYYY").format("MM/DD/YYYY")) {
                return ["eventDay"]
            }
        }
    }
    const checkDay = (e) => {
        return e.text.split(" ")[0]
    }

    const updateAppointment = (appointment) => {
      let index = -1;
      const filteredObj = events.find(function (item, i) {
        if (item._id === appointment._id) {
          index = i;
          return i;
        }
      });
      if (filteredObj) {
        events[index] = appointment
        setEvents(events);
      }
    }
    const selectTags = (id, tag, mode) => {
      let index = -1;
      const filteredObj = events.find(function (item, i) {
        if (item._id == id) {
          index = i;
          return item;
        }
      });
  
      if (filteredObj) {
        let tagNames = filteredObj.tagNames;
        let tags = filteredObj.tags;
        if (mode) {
          tagNames.push(tag);
          tags.push(tag._id);
        } else {
          tagNames = tagNames.filter(addedTag => addedTag._id != tag._id);
          tags = tags.filter(addedTag => addedTag != tag._id);
        }
        events[index].tags = tags;
        events[index].tagNames = tagNames;
        setEvents(events)
      }
    }
    const changeStatus = (id, status, note) => {
      let index = -1;
      const filteredObj = events.find(function (item, i) {
        if (item._id == id) {
          index = i;
          return item;
        }
      });
      if (filteredObj) {
        let editedAppointments = events;
        editedAppointments[index].status = status;
        editedAppointments[index].note = note;
        setEvents(editedAppointments);
      }
    }
    const resheduleAppointment = (id, edited, user) => {
      let index = -1;
      const filteredObj = events.find(function (item, i) {
        if (item._id == id) {
          index = i;
          return item;
        }
      });
      if (filteredObj) {
        let editedAppointments = events;
        editedAppointments[index].rescheduleCount = events[index].rescheduleCount ? events[index].rescheduleCount + 1 : 1;
        let history = events[index].history ? events[index].history : []
        history.push({
          date: filteredObj.date,
          toTime: filteredObj.toTime,
          fromTime: filteredObj.fromTime,
          note: edited.note,
          rescheduledBy: user._id,
          rescheduledByName: user.fullName
        });
        editedAppointments[index].history = history;
        editedAppointments[index].date = edited.date;
        editedAppointments[index].toTime = edited.toTime;
        editedAppointments[index].fromTime = edited.fromTime;
        setEvents(editedAppointments);
      }
    }

    useEffect(() => {
        if(!editAppointment) {
            fetchList();
        }
    },[editAppointment])
    
    useEffect(() => {
        if(!createAppointmentModal) {
            fetchList();
        }
    }, [createAppointmentModal])

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <>
        <div className='dashInnerUI'>
            { isLoader ? <Loader/> : ""}
            <Appointmenthead
                setCreateAppointmentModal={setCreateAppointmentModal}
            />
            <div className='userListBody'>
                <div className='global-appointment'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: 'today',
                            center: 'prev,title,next',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        events={events}
                        eventLimit="true"
                        views={{
                            dayGridMonth: {
                              eventLimit: 3
                            },
                            timeGridWeek: {
                                titleFormat: {
                                    month: 'long',
                                    day: '2-digit'
                                }
                            },
                            timeGridDay: {
                                titleFormat: {
                                    day: 'numeric',
                                    month: 'long',
                                    // weekday: 'long'
                                }
                            }
                        }}
                        initialView='dayGridMonth'
                        height={700}
                        editable={false}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        eventClick={clickOnEvent}
                        dateClick={clickOnDate}
                        ref={calenderRef}
                        eventClassNames="eventItem"
                        dayCellClassNames={addDayClass}
                        dayHeaderContent={checkDay}
                        allDaySlot={false}
                    />
                </div>
            </div>

            {editAppointment && (
            <AppointmentEditModal
                appointmentEdit={editingApp}
                setEditAppointment={setEditAppointment}
                editVia="appointment-global" //contact-modal / appointment-global
                updateAppointment={updateAppointment}
                selectTags={selectTags}
                changeStatus={changeStatus}
                resheduleAppointment={resheduleAppointment}
            />
            )}
        </div>
        {createAppointmentModal &&
            <CreateAppointment
                setCreateAppointmentModal={setCreateAppointmentModal}
            />
        }
        </>
    );
};

export default AppointmentGlobal;