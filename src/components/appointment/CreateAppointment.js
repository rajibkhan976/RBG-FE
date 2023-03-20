import React, {useEffect, useRef, useState} from "react";
import Loader from "../shared/Loader";
import {ErrorAlert, SuccessAlert} from "../shared/messages";
import crossTop from "../../assets/images/cross.svg";
import crossWhite from "../../assets/images/cross_w.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import cross from "../../assets/images/cross.svg";
import updown from "../../assets/images/updown.png";
import verify_icon from "../../assets/images/verifyIcon.svg";

import {TagServices} from "../../services/setup/tagServices";
import {ContactService} from "../../services/contact/ContactServices";
import {DependentServices} from "../../services/contact/DependentServices";
import {AppointmentServices} from "../../services/appointment/appointment";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../actions/types";
import Scrollbars from "react-custom-scrollbars-2";
import TimePicker from "rc-time-picker";
import TagList from "./TagList";
import moment from "moment";
import { utils } from "../../helpers";

const initialDependentState = {
    name: "",
    contactId: "",
};

const CreateAppointment = (props) => {
    const todayDate = moment();
    const titleAppRef = useRef(null);
    const toggleTags = useRef(null);
    const searchInputTag = useRef(null);
    const scrollBodyTags = useRef(null);
    const contactSelect = useRef(null)
    const [loader, setLoader] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [tagListToggle, setTagListToggle] = useState(false);
    const [searchedTag, setSearchedTag] = useState("");
    const [tagTop, setTagTop] = useState(null);
    const [tagList, setTagList] = useState([]);
    const [isScroll, setIsScroll] = useState(false);
    const [tagLoader, setTagLoader] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [addManually, setAddManually] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [tagsPage, setTagsPage] = useState(1);
    const [phoneCountryCode, setPhoneCountryCode] = useState([]);
    const [selectedContact, setSelectedContact] = useState({});
    const [dependant, setDependant] = useState({
        ...initialDependentState,
    });

    const [contact, setContact] = useState('');
    const [basicinfoFname, setBasicinfoFname] = useState('');
    const [basicinfoLname, setBasicinfoLname] = useState('');
    const [basicinfoEmail, setBasicinfoEmail] = useState('');
    const [basicinfoPhone, setBasicinfoPhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: "",
        full_number: "",
        original_number: "",
        location: "None",
        country: "",
        carrier: "None",
        timezone: "America/New_York",
        is_valid: false,
        is_mobile: false
    });
    const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: "",
        full_number: "",
        original_number: "",
        location: "None",
        country: "",
        carrier: "None",
        timezone: "America/New_York",
        is_valid: false,
        is_mobile: false
    });
    const [basicinfoMomPhone, setBasicinfoMomPhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: "",
        full_number: "",
        original_number: "",
        location: "None",
        country: "",
        carrier: "None",
        timezone: "America/New_York",
        is_valid: false,
        is_mobile: false
    });
    const [basicinfoDadPnone, setBasicinfoDadPhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: "",
        full_number: "",
        original_number: "",
        location: "None",
        country: "",
        carrier: "None",
        timezone: "America/New_York",
        is_valid: false,
        is_mobile: false
    });
    const [formErrors, setFormErrors] = useState({
        fName: "",
        lName: "",
        phone: "",
        email: ""
    });
    const [appointmentErrors, setAppointmentErrors] = useState({
        agenda: "",
        date: "",
        toTime: "",
        fromTime: "",
        contactId: "",
    });
    const [appointmentData, setAppointmentData] = useState({
        agenda: "",
        date: "",
        fromTime: "",
        toTime: "",
        tags: [],
        tagsDatas: [],
        contactId: "",
    });
    const [toggleContactList, setToggleContactList] = useState({
        status: false,
        contacts: [],
        isCross: false,
    });
    const fetchTags = async (pageNumber) => {
        try {
            setIsScroll(true);
            setTagLoader(true);
            let result = await TagServices.fetchTags(pageNumber, null);
            setIsScroll(false);

            setTagList(result.tags);
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: "error",
            });
        } finally {
            setTagLoader(false);
        }
    };
    const dispatch = useDispatch();

    const toggleTagsListFn = (e) => {
        e.preventDefault();

        setTagTop(toggleTags.current.parentNode.offsetTop);
        setTagListToggle(!tagListToggle);
        setSearchedTag("");
    };

    const appointmentDataAdd = (e, type) => {
        let validErrors = {...appointmentErrors};
        let isDisabled = false;
        if (e.target.value.trim() !== "") {
            // console.clear();
            // console.log(e.target.value);
            // console.log("Check", new Date(Date.now()).toISOString().split("T")[0])
            if (type === "date") {
                const dateDiff = utils.dateDiff(e.target.value);
                if(dateDiff.difference <= 0) {
                    console.log("Today")
                    const fromTime = appointmentData.fromTime;
                    if(fromTime) {
                        console.log("From Time")
                        const appDateTime = moment(`${e.target.value.toString()} ${appointmentData.fromTime.toString()}`).format("YYYY-MM-DD h:mm a");
                        const diffFromToday = todayDate.diff(appDateTime, "minutes");
                        console.log(diffFromToday);
                        if(diffFromToday > 0) {
                            console.log("Invalid time")
                            validErrors.fromTime = "Invalid from time";
                            isDisabled = true;
                        } else {
                            validErrors.fromTime = "";
                            isDisabled = false;
                        }
                    }
                } else {
                    validErrors.fromTime = "";
                    isDisabled = false;
                }
                // validErrors.fromTime = "";
                validErrors.date = "";
                isDisabled = false;
                let newDateString =
                    e.target.value.split("-")[1] +
                    "/" +
                    e.target.value.split("-")[2] +
                    "/" +
                    e.target.value.split("-")[0];
                setAppointmentData({...appointmentData, date: newDateString});
            }
            if (type == "agenda") {
                validErrors.agenda = "";
                isDisabled = false;
                setAppointmentData({...appointmentData, agenda: e.target.value});
            }
        } else {
            if (type == "agenda") {
                validErrors.agenda = "Please fill up Agenda for the appointment";
                isDisabled = true;
            }

            if (type == "date") {
                validErrors.date = "Invalid date of appointment.";
                isDisabled = true;
            }
        }

        setAppointmentErrors(validErrors);
        setIsDisabled(isDisabled)
    };

    const handleContactName = async (e) => {
        e.preventDefault();

        if (e.target.value.trim() !== "") {
            setAppointmentErrors({
                ...appointmentErrors,
                contactId: ""
            })
        }
        //Set dependant name
        setDependant({...dependant, name: e.target.value});

        //Name character limit
        if (e.target.value.length >= 30) {
            //Length 30 char limit
            console.log("char checking");
            setAppointmentErrors({
                ...appointmentErrors,
                name: "Name should not be more than 30 characters",
            });
            setIsDisabled(true);
        }
        //Name special character checking
        let isSpecialCharacterformat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (isSpecialCharacterformat.test(e.target.value)) {
            console.log("Special checkig");
            setAppointmentErrors({
                ...appointmentErrors,
                name: "Name should not contain any special characters",
            });
            setIsDisabled(true);
        }
        if (
            e.target.value.length >= 3 &&
            e.target.value.length <= 30 &&
            !isSpecialCharacterformat.test(e.target.value)
        ) {
            handelBasicinfoFname(e)
            try {
                setProcessing(true);
                let operationMethod = "searchContacts";
                let payload = {
                    guardianId: 0,
                    keyword: e.target.value,
                };
                await DependentServices[operationMethod](payload).then((result) => {
                    console.log("Search contacts result", result);
                    setToggleContactList({
                        ...toggleContactList,
                        contacts: result.contacts,
                        status: true,
                    });
                    // if (result && result.contacts.length) {
                    // }
                });
            } catch (e) {
                console.log("Error in contact search: ", e);
            } finally {
                setProcessing(false);
                // setAddManually(true);
                setIsDisabled(false);
                setAppointmentErrors({...appointmentErrors, name: ""});
                console.log("setBasicinfoFname", e.target.value.indexOf(" "));
            }

            if (e.target.value.length == 0) {
                setAddManually(false)
            }
        }

        if(e.target.value.trim() == "") {
            setToggleContactList({
                status: false,
                contacts: [],
                isCross: false,
            });
        }
    }

    const fromDateAdd = (fromValue) => {
        // console.log(fromValue && fromValue.format('h:mm a').toUpperCase());
        let validErrors = {...appointmentErrors};
        let isDisabled = false;
        // console.log("App Date", appointmentData.date)
        // console.clear();
        const appDateTime = moment(`${appointmentData.date.toString()} ${fromValue.format("h:mm a")}`).format("YYYY-MM-DD h:mm a");
        const diffFromToday = todayDate.diff(appDateTime, "minutes");
        const fromTime = moment(`${appointmentData.date} ${fromValue.format("h:mm a")}`).format('MM/DD/YYYY h:mm a');
        const toTime = moment(`${appointmentData.date} ${appointmentData.toTime}`).format('MM/DD/YYYY h:mm a');

        if (fromValue && fromValue != null) {
            if (appointmentData.toTime.trim() === "") {
                validErrors.fromTime = "";
                isDisabled = false;
                //validErrors.toTime = "Invalid end time.";
                setAppointmentData({
                    ...appointmentData,
                    fromTime: fromValue.format("h:mm a").toUpperCase(),
                });
            } else {
                console.log(
                    parseFloat(appointmentData.toTime.split(" ")[0].replace(":", "")),
                    parseFloat(fromValue.format("h:mm a").split(" ")[0].replace(":", ""))
                );
                if (
                    parseFloat(appointmentData.toTime.split(" ")[0].replace(":", "")) <=
                    parseFloat(fromValue.format("h:mm a").split(" ")[0].replace(":", ""))
                ) {
                    if (
                        appointmentData.toTime.split(" ")[1] ===
                        fromValue.format("h:mm a").split(" ")[1].toUpperCase()
                    ) {
                        //validErrors.fromTime = "Invalid start time.";
                    } else {
                        validErrors.fromTime = "";
                        isDisabled = false;
                    }
                } else {
                    validErrors.fromTime = "";
                    isDisabled = false;
                }
                setAppointmentData({
                    ...appointmentData,
                    fromTime: fromValue.format("h:mm a").toUpperCase(),
                });
            }
            // console.clear()
            // console.log("Time Diff", appointmentData.toTime);
            if(!appointmentData.date) {
                validErrors.date = "Please choose a date";
                isDisabled = true;
            } else if(diffFromToday > 0) {
                validErrors.fromTime = "Invalid from time";
                isDisabled = true;
            } else if(appointmentData.toTime && Math.sign(moment(fromTime).diff(toTime, "minutes")) > 0) {
                // console.log("To Time is less than from", moment(fromTime).diff(toTime, "minutes"));
                validErrors.fromTime = "Invalid from time";
                isDisabled = true;
            } else {
                validErrors.fromTime = "";
                isDisabled = false;
            }
        } else {
            // validErrors.fromTime = "Invalid start time.";
        }
        // parseInt(e.target.value.replace(":","")) >= parseInt(appointmentData.toTime.replace(":",""))
        setAppointmentErrors(validErrors);
        console.log("Disabled",isDisabled);
        setIsDisabled(isDisabled);
    };

    const toDateAdd = (toValue) => {
        // console.log(toValue && toValue.format('h:mm a'));
        let validErrors = {...appointmentErrors};
        let isDisabled = false;
        // const appDateTime = moment(`${appointmentData.date.toString()} ${toValue.format("h:mm a")}`).format("YYYY-MM-DD h:mm a");
        // const diffFromToday = todayDate.diff(appDateTime, "minutes");
        const toTime = moment(`${appointmentData.date} ${toValue.format("h:mm a")}`).format('MM/DD/YYYY h:mm a');
        const fromTime = moment(`${appointmentData.date} ${appointmentData.fromTime}`).format('MM/DD/YYYY h:mm a');
        // const diff = Math.sign(moment(toTime).diff(fromTime, "minutes"));
        // console.log("Fromtime < Totime", fromTime < toTime);
        if (toValue && toValue != null) {
            if (appointmentData.fromTime.trim() === "") {
                validErrors.toTime = "";
                isDisabled = false;
                //validErrors.fromTime = "Invalid start time.";
                setAppointmentData({
                    ...appointmentData,
                    toTime: toValue.format("h:mm a").toUpperCase(),
                });
            } else {
                if (
                    parseFloat(appointmentData.fromTime.split(" ")[0].replace(":", "")) >=
                    parseFloat(toValue.format("h:mm a").split(" ")[0].replace(":", ""))
                ) {
                    if (
                        appointmentData.fromTime.split(" ")[1] ===
                        toValue.format("h:mm a").split(" ")[1].toUpperCase()
                    ) {
                        //validErrors.toTime = "Invalid end time.";
                    } else {
                        validErrors.toTime = "";
                        isDisabled = false;
                    }
                } else {
                    validErrors.toTime = "";
                    isDisabled = false;
                }
                setAppointmentData({
                    ...appointmentData,
                    toTime: toValue.format("h:mm a").toUpperCase(),
                });
            }

            if(!appointmentData.date) {
                validErrors.date = "Please choose a date";
                isDisabled = true;
            } else if(fromTime && Math.sign(moment(toTime).diff(fromTime, "minutes")) < 0) {
                validErrors.toTime = "Invalid to time";
                isDisabled = true;
            } else {
                validErrors.toTime = "";
                // validErrors.fromTime = "";
                isDisabled = false;
            }
        } else {
           // validErrors.toTime = "Invalid end time.";
        }
        // parseInt(e.target.value.replace(":","")) <= parseInt(appointmentData.fromTime.replace(":",""))
        setAppointmentErrors(validErrors);
        setIsDisabled(isDisabled);
    };

    const selectTag = (tag, mode) => {
        let copySelTags = [...appointmentData.tagsDatas];
        let tagIds = [...appointmentData.tags];
        if (mode) {
            let searchTags = tagIds.filter((el) => el == tag._id);
            if (searchTags.length === 0) {
                copySelTags.push(tag);
                tagIds.push(tag._id);
            } else {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: 'Tag already selected.',
                    typeMessage: 'error'
                });
            }
        } else {
            copySelTags = copySelTags.filter((addedTag) => addedTag._id != tag._id);
            tagIds = tagIds.filter((addedTag) => addedTag != tag._id);
        }

        setAppointmentData({
            ...appointmentData,
            tagsDatas: copySelTags,
            tags: tagIds,
        });
    };

    const handleContactSelect = (e, contact) => {
        console.log("contact:::::", contact);
        setDependant({
            name: contact.firstName + " " + (contact.lastName ? contact.lastName : ""),
            contactId: contact._id,
        });
        setAppointmentData({
            ...appointmentData,
            contactId: contact._id,
        });
        setAddManually(false)
        setToggleContactList({
            ...toggleContactList,
            status: false,
            contacts: [],
            isCross: true,
        });
    };
    const resetContactName = (e) => {
        e.preventDefault();
        setAppointmentData({
            ...appointmentData,
            contactId: "",
        });
        setDependant({name: "", contactId: ""});
        setAddManually(false)
        setToggleContactList({
            ...toggleContactList,
            status: false,
            contacts: [],
            isCross: false,
        });
    };

    // validation on submission of form
    const validateAppointment = (e) => {
        let validErrors = {...appointmentErrors};

        if (appointmentData.contactId.trim() === "") {
            validErrors.contactId = "Please select a contact to create Appointment with";
        }

        if (appointmentData.agenda.trim() === "") {
            validErrors.agenda = "Please fill up Agenda for the appointment";
        }

        if (appointmentData.date.trim() === "") {
            validErrors.date = "Invalid date of appointment.";
        }
        if (appointmentData.toTime.trim() === "") {
            validErrors.toTime = "Invalid end time.";
        }
        if (appointmentData.fromTime.trim() === "") {
            validErrors.fromTime = "Invalid start time.";
        }
        if (
            appointmentData.fromTime.trim() === "" ||
            parseFloat(appointmentData.fromTime.split(" ")[0].replace(":", "")) >=
            parseFloat(appointmentData.toTime.split(" ")[0].replace(":", ""))
        ) {
            //validErrors.fromTime = "Invalid start time.";
        }

        if (
            appointmentData.toTime.trim() === "" ||
            parseFloat(appointmentData.toTime.split(" ")[0].replace(":", "")) <=
            parseFloat(appointmentData.fromTime.split(" ")[0].replace(":", ""))
        ) {
           // validErrors.toTime = "Invalid end time.";
        }
        if (
            appointmentData.contactId.trim() !== "" &&
            appointmentData.agenda.trim() !== "" &&
            appointmentData.date.trim() !== "" &&
            appointmentData.fromTime.trim() !== "" &&
            appointmentData.toTime.trim() !== ""
        ) {
            validErrors.agenda = "";
            validErrors.date = "";
            validErrors.fromTime = "";
            validErrors.toTime = "";
            validErrors.contactId = ""

            return true;
        }

        setAppointmentErrors(validErrors);
    };

    // on valid submission, send appointment to parent
    const createAppointment = async (e) => {
        e.preventDefault();
        let valid = validateAppointment();
        if (valid) {
            setIsLoader(true);
            try {
                let newAppointment = await AppointmentServices.saveAppointment(
                    appointmentData
                );

                if (newAppointment) {
                    console.log("newAppointment", newAppointment);
                    // let updatedAppointments = [newAppointment, ...props.appointments];
                    // props.setAppointments(updatedAppointments);
                    // //props.setAppointmentCreated("success");
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: "Appointment successfully created",
                        typeMessage: "success",
                    });
                    props.setCreateAppointmentModal(false);
                }
            } catch (error) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: error.message,
                    typeMessage: "error",
                });
            } finally {
                setIsLoader(false);
            }
        }
    };


    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                tagListToggle &&
                titleAppRef.current &&
                !titleAppRef.current.contains(e.target)
            ) {
                setTagListToggle(false);
                setSearchedTag("")
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [tagListToggle]);

    const fetchCountry = async () => {
        let conntryResponse = await ContactService.fetchCountry();
        setPhoneCountryCode(conntryResponse);
    };

    const handelBasicinfoPhone = (event) => {
        console.log(event);
        const {name, value} = event.target;
        if (name === "countryCode") {
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoPhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoPhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            setFormErrors(prevState => ({...prevState, phone: ''}));
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                setBasicinfoPhone(prevState => ({...prevState, number: ""}));
                return false;
            } else {
                setBasicinfoPhone(prevState => ({...prevState, number: value}));
                setBasicinfoPhone(prevState => ({...prevState, full_number: basicinfoPhone.dailCode + value}));
                setBasicinfoPhone(prevState => ({
                    ...prevState,
                    original_number: basicinfoPhone.dailCode.replace("+", "") + value
                }));
            }
        }
    };

    const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
            return (
                <option value={el.code} data-dailcode={el.prefix} key={key}>{el.code} ({el.prefix})</option>
            )
        }
    ) : '';

    const handelBasicinfoEmail = (event) => {
        console.log("hi");
        setBasicinfoEmail(event.target.value);
        setFormErrors(prevState => ({...prevState, email: ''}));
    };

    const verify = async (number) => {
        setIsLoader(true);
        let verification = await ContactService.verifyNumber(number);
        setIsLoader(false);
        return verification;
    }
    const verifyNumber = async (e, field) => {
        e.preventDefault();
        switch (field) {
            case 'phone':
                if (basicinfoPhone.number) {
                    let payload = {
                        isPrefixGiven: true,
                        prefix: basicinfoPhone.dailCode,
                        number: basicinfoPhone.number
                    }
                    let result = await verify(payload);
                    if (result.success) {
                        setBasicinfoPhone(result.data);
                        setSuccessMsg(result.message);
                    } else {
                        setFormErrors(prevState => ({...prevState, phone: result.message}));
                    }
                } else {
                    setFormErrors(prevState => ({...prevState, phone: 'Number not given.'}));
                }
                break;
            default:
                break;
        }
    }

    const handelBasicinfoFname = (e) => {
        e.preventDefault();
        setBasicinfoFname(e.target.value);
        setFormErrors(prevState => ({...prevState, fName: ''}));
    }

    const handelBasicinfoLname = (e) => {
        setBasicinfoLname(e.target.value);
        setFormErrors(prevState => ({...prevState, lName: ''}));
    }

    const onContactSubmit = async (e) => {
        console.log('here on contact update', basicinfoPhone)
        e.preventDefault();
        setIsLoader(true);
        let formErrorsCopy = formErrors;
        let isError = false;
        if (!basicinfoFname) {
            isError = true;
            formErrorsCopy.fName = "Please fill up First Name"
        }
        if (!basicinfoLname) {
            isError = true;
            formErrorsCopy.lName = "Please fill up Last Name."
        }
        if (!basicinfoEmail && basicinfoPhone.number === "") {
            isError = true;
            formErrorsCopy.email = "Please fill up your email or phone";
        } else {
            if (basicinfoEmail) {
                if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(basicinfoEmail))) {
                    isError = true;
                    formErrorsCopy.email = "Please enter a valid email address";
                }
            }
            if (basicinfoPhone.number !== "") {
                let pattern = new RegExp(/^[0-9\b]+$/);
                if (!basicinfoEmail && (basicinfoPhone.number === "" || !pattern.test(basicinfoPhone.number))) {
                    isError = true;
                    formErrorsCopy.phone = "Please fill up your phone number";
                }
            }
        }
        if (isError) {
            setIsLoader(false);
            setFormErrors(prevState => ({...prevState, formErrorsCopy}));
            // const body = document.querySelector('#scrollDiv');
            // body.scrollTo(0,0)
            setTimeout(() => setFormErrors({
                email: "",
                phone: "",
                fName: "",
                lName: "",
                phase: "",
                status: ""
            }), 50000);
        } else {
            let payload = {
                firstName: basicinfoFname ? basicinfoFname : "",
                lastName: basicinfoLname ? basicinfoLname : "",
                dob: "",
                email: basicinfoEmail ? basicinfoEmail : "",
                phone: basicinfoPhone ? basicinfoPhone : "",
                mobile: "",
                momPhone: "",
                dadPhone: "",
                company: "",
                jobRole: "",
                momName: "",
                dadName: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                gender: "",
                status: "",
                phase: ""
            }
            // let newPayload = Object.assign(payload, customFieldsList);
            let contactIdNew = contact ? contact._id : 0;
            try {
                let createContact = await ContactService.updateContact(payload, contactIdNew);
                if (createContact) {
                    if (contactIdNew == 0) {
                        console.log("createContact", createContact.data.ops[0]._id);
                        setSuccessMsg('Contact saved successfully.');
                        dispatch({
                            type: actionTypes.CONTACTS_MODAL_ID,
                            contact_modal_id: '',
                        });
                        setTimeout(() => {
                            dispatch({
                                type: actionTypes.CONTACTS_MODAL_ID,
                                contact_modal_id: createContact.data.insertedId,
                            });
                        }, 300);
                        setAppointmentData({
                            ...appointmentData,
                            contactId: createContact.data.ops[0]._id
                        })
                        setAddManually(false);
                        handleContactSelect(e, createContact.data.ops[0]);
                        setTimeout(() => {
                            setSuccessMsg('');
                        }, 3000);
                    }
                } else {
                    setErrorMsg('Something went wrong.')
                }
            } catch (e) {
                setErrorMsg(e.message);
            }
            setIsLoader(false);
        }
    }

    useEffect(() => {
        fetchCountry();
        fetchTags(tagsPage);
    }, []);

    return (
        <div className="modalBackdrop modalCreateAppointment">
            <div className="modalBackdropBg" onClick={() => props.setCreateAppointmentModal(false)}></div>
            {isLoader && <Loader/>}
            {successMsg && <SuccessAlert message={successMsg}></SuccessAlert>}
            {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button
                        className="topCross"
                        onClick={() => props.setCreateAppointmentModal(false)}
                    >
                        <img src={crossTop} alt=""/>
                    </button>
                    <div className="circleForIcon">
                        <svg
                            width="30"
                            height="28"
                            viewBox="0 0 30 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M29.25 27.9893H0.5V5.18945H6.4502V1.71289C6.45072 1.45138 6.55473 1.20045 6.73975 1.01563C6.92476 0.830801 7.1755 0.726827 7.43701 0.726563C7.69897 0.726297 7.95014 0.829795 8.13574 1.01465C8.32135 1.1995 8.42596 1.45094 8.42676 1.71289V5.18945H21.3271V1.71289C21.3274 1.45147 21.4314 1.20048 21.6162 1.01563C21.8011 0.830772 22.0516 0.726828 22.313 0.726563C22.5745 0.726827 22.8252 0.830801 23.0103 1.01563C23.1953 1.20045 23.2993 1.45138 23.2998 1.71289V5.18945H29.25V27.9893ZM2.47314 7.16309V26.0127H27.2729V7.16309H2.47314ZM13.833 20.627L9.54395 16.3379L10.6211 15.2559L13.833 18.4561L19.1328 13.1602L20.2139 14.2373L13.8379 20.627H13.833Z"
                                fill="#305671"
                            />
                        </svg>
                    </div>
                    <h3>Create an appointment</h3>
                    <p>Please enter below information to create a new appointment</p>
                </div>
                <div className="modalForm auto">
                    <form onSubmit={createAppointment}>
                        <div
                            className={addManually && formErrors.fName.trim() !== "" ? "cmnFormRow error" : "cmnFormRow"}
                            ref={contactSelect}>
                            <label className="cmnFieldName d-flex f-justify-between">
                                {addManually ? "First Name" : "Select a Contact"}
                            </label>
                            <div
                                className={
                                    toggleContactList.status ? `cmnFormField listActive ${appointmentErrors.contactId.trim() !== "" ? "error" : ""}` : `cmnFormField ${appointmentErrors.contactId.trim() !== "" ? "error" : ""}`
                                }
                            >
                                <input
                                    className={processing ? "cmnFieldStyle loading" : "cmnFieldStyle"}
                                    type="text"
                                    style={{
                                        backgroundImage: toggleContactList.status
                                            ? `url(${updown})`
                                            : "",
                                    }}
                                    placeholder="Eg. Name"
                                    onChange={(e) => handleContactName(e)}
                                    value={dependant.name ? dependant.name : ""}
                                    disabled={toggleContactList.isCross && !addManually}
                                />
                                {toggleContactList.isCross ? (
                                    <button
                                        className="btn crossContact"
                                        onClick={(e) => resetContactName(e)}
                                    >
                                        <img src={cross} alt="cross"/>
                                    </button>
                                ) : (
                                    ""
                                )}
                                {toggleContactList.status && (
                                    <>
                                        <div className="contactListItems">
                                            <ul>
                                                {toggleContactList.contacts.length > 0 ? toggleContactList.contacts.map((contact) => (
                                                    <li
                                                        key={contact._id}
                                                        data-id={contact._id}
                                                        onClick={(e) => {
                                                            handleContactSelect(e, contact);
                                                        }}
                                                        className="appContact"
                                                    >
                                                        <figure
                                                            style={{
                                                                backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
                                                            }}
                                                        >
                                                            {console.log(`rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`)}
                                                            {contact.firstName ? contact.firstName[0] : ""}
                                                            {contact.lastName ? contact.lastName[0] : ""}
                                                        </figure>
                                                        <p>
                              <span>
                                  {(contact.firstName ? contact.firstName : "") +
                                      " " +
                                      (contact.lastName ? contact.lastName : "")}
                                </span>
                                                            {contact.email ?
                                                                <small>
                                                                    {contact.email}
                                                                </small> : ""}
                                                        </p>
                                                    </li>
                                                )) : <li className="noContactFound">No Contact Found</li>}
                                            </ul>
                                            <button
                                                className="btn"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setAddManually(true);
                                                    setToggleContactList({
                                                        ...toggleContactList,
                                                        status: false,
                                                        contacts: [],
                                                        isCross: true,
                                                    });
                                                }}
                                            >
                                                + Add Manually
                                            </button>
                                        </div>
                                    </>
                                )}
                                {appointmentErrors.contactId.trim() !== "" ? (
                                    <p className="errorMsg">{appointmentErrors.contactId}</p>
                                ) : (
                                    ""
                                )}
                            </div>
                            {formErrors.fName.trim() !== "" ? (
                                <p className="errorMsg">{formErrors.fName}</p>
                            ) : (
                                ""
                            )}
                        </div>

                        {addManually &&
                            <>
                                <div className={formErrors.lName.trim() != "" ? "cmnFormRow error" : "cmnFormRow"}>
                                    <label className="cmnFieldName">
                                        Last Name
                                    </label>
                                    <div className="cmnFormField">
                                        <input type="text" placeholder="Last Name" className="cmnFieldStyle"
                                               name="email" onChange={handelBasicinfoLname}/>
                                    </div>
                                    {formErrors.lName.trim() !== "" ? (
                                        <p className="errorMsg">{formErrors.lName}</p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className={formErrors.email.trim() != "" ? "cmnFormRow error" : "cmnFormRow"}>
                                    <label className="cmnFieldName">
                                        Email
                                    </label>
                                    <div className="cmnFormField">
                                        <input type="email" placeholder="Email" className="cmnFieldStyle" name="email"
                                               onChange={handelBasicinfoEmail}/>
                                    </div>
                                    {formErrors.email.trim() !== "" ? (
                                        <p className="errorMsg">{formErrors.email}</p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className={formErrors.phone.trim() != "" ? "cmnFormRow error" : "cmnFormRow"}>
                                    <label className="cmnFieldName">
                                        Phone
                                    </label>
                                    <div
                                        className={formErrors.phone ? "cmnFormField countryCodeField phoneNumberField errorField" : "cmnFormField phoneNumberField countryCodeField"}>
                                        <div className="countryCode cmnFieldStyle">
                                            <div className="countryName">{basicinfoPhone.countryCode}</div>
                                            <div className="daileCode">{basicinfoPhone.dailCode}</div>
                                            <select className="selectCountry" name="countryCode"
                                                    defaultValue={basicinfoPhone.countryCode}
                                                    onChange={handelBasicinfoPhone}>
                                                {countrycodeOpt}
                                            </select>
                                        </div>
                                        <input type="phone" className="cmnFieldStyle" name="number"
                                               placeholder="Eg. (555) 555-1234" value={basicinfoPhone.number}
                                               onChange={handelBasicinfoPhone}/>
                                        <button className="verifyNumberButton"
                                                onClick={(e) => verifyNumber(e, 'phone')}>
                                            <img src={verify_icon} alt=""/> Verify
                                        </button>
                                        {formErrors.phone ? <p className="errorMsg">{formErrors.phone}</p> : ""}
                                    </div>
                                </div>
                            </>
                        }
                        {!addManually &&
                            <>
                                <div
                                    className={
                                        appointmentErrors.agenda.trim() !== ""
                                            ? "cmnFormRow error"
                                            : "cmnFormRow "
                                    }
                                >
                                    <div className="cmnFieldName">Agenda</div>
                                    <div className="cmnFormField clearfix">
                    <span className="inputTagArea" ref={titleAppRef} vv="yu">
                      <input
                          className="cmnFieldStyle createAppointment"
                          type="text"
                          placeholder="Eg. Martial Art Course Demo"
                          onChange={(e) => appointmentDataAdd(e, "agenda")}
                      />
                      <span
                          className={
                              tagListToggle
                                  ? "tagSection d-flex f-align-center f-justify-center active"
                                  : "tagSection d-flex f-align-center f-justify-center"
                          }
                          onClick={(e) => toggleTagsListFn(e)}
                          ref={toggleTags}
                      >
                        <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.3953 1.10391C15.7136 1.10391 16.0188 1.23033 16.2438 1.45538C16.4689 1.68042 16.5953 1.98565 16.5953 2.30391V7.10391L8.56231 15.1369C8.35825 15.3429 8.08652 15.468 7.79736 15.4891C7.5082 15.5103 7.22116 15.426 6.98931 15.2519L15.3953 6.80391V1.10391ZM8.79531 0.503906H13.5953C13.9136 0.503906 14.2188 0.630334 14.4438 0.855378C14.6689 1.08042 14.7953 1.38565 14.7953 1.70391V6.50391L6.76131 14.5399C6.64983 14.6518 6.51736 14.7405 6.3715 14.8011C6.22563 14.8617 6.06925 14.8929 5.91131 14.8929C5.75338 14.8929 5.59699 14.8617 5.45113 14.8011C5.30527 14.7405 5.1728 14.6518 5.06131 14.5399L0.754313 10.2359C0.642442 10.1244 0.553677 9.99195 0.493111 9.84609C0.432544 9.70023 0.401367 9.54384 0.401367 9.38591C0.401367 9.22797 0.432544 9.07159 0.493111 8.92572C0.553677 8.77986 0.642442 8.64739 0.754313 8.53591L8.79131 0.503906H8.79531ZM11.4953 4.70391C11.3173 4.70391 11.1433 4.65112 10.9953 4.55223C10.8473 4.45334 10.7319 4.31277 10.6638 4.14832C10.5957 3.98387 10.5779 3.80291 10.6126 3.62832C10.6473 3.45374 10.7331 3.29338 10.8589 3.16751C10.9848 3.04164 11.1452 2.95593 11.3197 2.9212C11.4943 2.88647 11.6753 2.9043 11.8397 2.97241C12.0042 3.04053 12.1447 3.15589 12.2436 3.30389C12.3425 3.4519 12.3953 3.6259 12.3953 3.80391C12.3953 3.9221 12.372 4.03913 12.3268 4.14832C12.2816 4.25751 12.2153 4.35673 12.1317 4.4403C12.0481 4.52388 11.9489 4.59017 11.8397 4.6354C11.7305 4.68063 11.6135 4.70391 11.4953 4.70391Z"
                              fill="#9BAEBC"
                          />
                        </svg>
                      </span>
                      <TagList tagListToggle={tagListToggle} selectTag={selectTag}/>
                    </span>
                                        {console.log("appointmentData", appointmentData)}
                                        {appointmentData.tagsDatas.length > 0 &&
                                            appointmentData.tagsDatas.map((tag, i) => (
                                                <span className="indTags" key={i}>
                          <span className="labelSelected">{tag.name}</span>
                          <span
                              className="closeTag"
                              onClick={() => selectTag(tag, false)}
                          >
                            <img src={crossWhite} alt=""/>
                          </span>
                        </span>
                                            ))}
                                        {appointmentErrors.agenda.trim() !== "" ? (
                                            <p className="errorMsg">{appointmentErrors.agenda}</p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="cmnFormRow">
                                    <div
                                        className={
                                            appointmentErrors.date.trim() !== ""
                                                ? "cmnFormCol error"
                                                : "cmnFormCol"
                                        }
                                    >
                                        <div className="cmnFieldName">Choose a date</div>
                                        <div className="cmnFormField">
                                            <input
                                                className="cmnFieldStyle"
                                                type="date"
                                                placeholder="mm/dd/yyyy"
                                                min={new Date(Date.now()).toISOString().split("T")[0]}
                                                onChange={(e) => appointmentDataAdd(e, "date")}
                                            />
                                        </div>
                                        {appointmentErrors.date.trim() !== "" ? (
                                            <p className="errorMsg">{appointmentErrors.date}</p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div
                                        className={
                                            appointmentErrors.fromTime.trim() !== ""
                                                ? "cmnFormColquater error"
                                                : "cmnFormColquater"
                                        }
                                    >
                                        <div className="cmnFieldName">From</div>
                                        <div className="cmnFormField" id="fromParent">
                                            <TimePicker
                                                showSecond={false}
                                                defaultValue={null}
                                                className="cmnFieldStyle"
                                                popupClassName="timepickerPopup"
                                                onChange={fromDateAdd}
                                                format={"hh:mm a"}
                                                use12Hours
                                                inputReadOnly
                                                allowEmpty={false}
                                                getPopupContainer={node => {
                                                    return document.getElementById("fromParent")
                                                }}
                                            />
                                            {/* <input
                          className="cmnFieldStyle"
                          type="time"
                          placeholder="Select"
                          onChange={(e) => appointmentDataAdd(e, "fromTime")}
                        /> */}
                                        </div>
                                        {appointmentErrors.fromTime.trim() !== "" ? (
                                            <p className="errorMsg">{appointmentErrors.fromTime}</p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div
                                        className={
                                            appointmentErrors.toTime.trim() !== ""
                                                ? "cmnFormColquater error"
                                                : "cmnFormColquater"
                                        }
                                    >
                                        <div className="cmnFieldName">To</div>
                                        <div className="cmnFormField" id="toParent">
                                            <TimePicker
                                                showSecond={false}
                                                defaultValue={null}
                                                className="cmnFieldStyle"
                                                popupClassName="timepickerPopup"
                                                onChange={toDateAdd}
                                                format={"hh:mm a"}
                                                use12Hours
                                                inputReadOnly
                                                allowEmpty={false}
                                                getPopupContainer={node => {
                                                    return document.getElementById("toParent")
                                                }}
                                            />
                                            {/* <input
                          className="cmnFieldStyle"
                          type="time"
                          placeholder="Select"
                          onChange={(e) => appointmentDataAdd(e, "toTime")}
                        /> */}
                                        </div>
                                        {appointmentErrors.toTime.trim() !== "" ? (
                                            <p className="errorMsg">{appointmentErrors.toTime}</p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div className="modalbtnHolder w-100">
                                    <button
                                        className="saveDependent saveNnewBtn"
                                        disabled={isDisabled}
                                    >
                                        Set an Appointment <img src={arrow_forward} alt=""/>
                                    </button>
                                </div>
                            </>
                        }
                        {
                            addManually &&
                            <>
                                <div className="modalbtnHolder w-100">
                                    <button
                                        className="saveDependent saveNnewBtn"
                                        onClick={(e) => onContactSubmit(e)}
                                    >
                                        Save Contact <img src={arrow_forward} alt=""/>
                                    </button>
                                </div>
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAppointment;
