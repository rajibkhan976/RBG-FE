import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../../../actions/types";
import {ContactService} from "../../../../services/contact/ContactServices";
import Loader from "../../Loader";
//import plus_icon from "../../../../assets/images/plus_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import {ErrorAlert, SuccessAlert} from "../../messages";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import cross_icon from "../../../../assets/images/cross_white.svg";
import verify_icon from "../../../../assets/images/verifyIcon.svg";
import {ImportContactServices} from "../../../../services/contact/importContact";
import arrowDown from "../../../../assets/images/arrowDown.svg";
import moment from "moment-timezone";
import {PhasesServices} from "../../../../services/contact/phasesServices";

const Overview = (props) => {
    const [formScrollStatus, setFormScrollStatus] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [basicinfoFname, setBasicinfoFname] = useState('');
    const [basicinfoLname, setBasicinfoLname] = useState('');
    const [basicinfoDob, setBasicinfoDob] = useState('');
    const [basicinfoEmail, setBasicinfoEmail] = useState('');
    const [basicinfoGender, setBasicinfoGender] = useState('');
    const [basicinfoCompany, setBasicinfoCompany] = useState('');
    const [basicinfoJobRole, setBasicinfoJobRole] = useState('');
    const [basicinfoMomName, setBasicinfoMomName] = useState('');
    const [basicinfoDadName, setBasicinfoDadName] = useState('');
    const [basicinfoAddress1, setBasicinfoAddress1] = useState('');
    const [basicinfoAddress2, setBasicinfoAddress2] = useState('');
    const [basicinfoCity, setBasicinfoCity] = useState('');
    const [basicinfoState, setBasicinfoState] = useState('');
    const [basicinfoZip, setBasicinfoZip] = useState('');
    const [basicinfoCountry, setBasicinfoCountry] = useState('');
    const [phoneCountryCode, setPhoneCountryCode] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const dispatch = useDispatch();
    const [customFieldsList, setCustomFieldsList] = useState({});
    const [customFieldsListNew, setCustomFieldsListNew] = useState({});
    const [customFieldsError, setCustomFieldsError] = useState({});
    const [customFields, setCustomFields] = useState([]);
    const [toggleCustom, setToggleCustom] = useState([]);
    const [phases, setPhases] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPhase, setSelectedPhase] = useState("");
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
    const [contact, setContact] = useState('');

    const [formErrorMsg, setFormErrorMsg] = useState({
        email: "",
        phone: "",
        fName: "",
        lName: "",
        phase: "",
        status: ""
    });

    const fetchCountry = async () => {
        let conntryResponse = await ContactService.fetchCountry();
        setPhoneCountryCode(conntryResponse);
    };
    const fetchPhases = async () => {
        setIsLoader(true);
        let phases = await PhasesServices.fetchPhases();
        setIsLoader(false);
        setPhases(phases.phases);
    }
    useEffect(() => {
        fetchCustomFields();
        fetchCountry();
        fetchPhases();
    }, []);
    const fetchCustomFields = async () => {
        let cFileds = await ImportContactServices.fetchCustomFields();
        if (cFileds.customFields.length > 0) {
            let customObjects = {};
            let customErrorObjects = {};
            let newToggleCustom = {};
            cFileds.customFields.map((custom) => {
                customObjects[custom.alias] = "";
                customErrorObjects[custom.alias] = false;
                newToggleCustom[custom.alias] = false;
            });
            setCustomFieldsList(customObjects);
            setCustomFieldsListNew(customObjects);
            setCustomFieldsError(customErrorObjects);
            setToggleCustom(newToggleCustom);
            const rows = cFileds.customFields.reduce(function (rows, key, index) {
                return (index % 2 == 0 ? rows.push([key])
                    : rows[rows.length-1].push(key)) && rows;
            }, []);
            setCustomFields(rows);
        } else {
            setCustomFields([]);
        }
        return true;
    }
    useEffect(() => {
        Object.keys(customFieldsList).map((value) => {
            if (contact[value] !== undefined) {
                setCustomFieldsList(prevState => ({...prevState, [value]: contact[value]}));
            }
        });
    }, [customFieldsListNew]);
    const getContact = async (contactId) => {
        setIsLoader(true);
        if (contactId !== 0) {
            let payload = {
                id: contactId
            }
            let contact = await ContactService.fetchContact(JSON.stringify(payload));
            props.getContactDetails(contact);
            setContact(contact.contact);
            setBasicinfoFname(contact.contact.firstName);
            setBasicinfoLname(contact.contact.lastName);
            setBasicinfoDob(contact.contact.dob);
            setBasicinfoEmail(contact.contact.email);
            setBasicinfoGender(contact.contact.gender);
            setBasicinfoPhone({
                countryCode: contact.contact.phone ? (contact.contact.phone.countryCode ? contact.contact.phone.countryCode : "US") : "US",
                dailCode: contact.contact.phone ? (contact.contact.phone.dailCode ? contact.contact.phone.dailCode : "+1") : "+1",
                number: contact.contact.phone ? (contact.contact.phone.number ? contact.contact.phone.number : "") : "",
                full_number: contact.contact.phone ? (contact.contact.phone.full_number ? contact.contact.phone.full_number : "") : "",
                original_number: contact.contact.phone ? (contact.contact.phone.original_number ? contact.contact.phone.original_number : "") : "",
                location: contact.contact.phone ? (contact.contact.phone.location ? contact.contact.phone.location : "None") : "None",
                country: contact.contact.phone ? (contact.contact.phone.country ? contact.contact.phone.country : "") : "",
                carrier: contact.contact.phone ? (contact.contact.phone.carrier ? contact.contact.phone.carrier : "None") : "None",
                timezone: contact.contact.phone ? (contact.contact.phone.timezone ? contact.contact.phone.timezone : "America/New_York") : "America/New_York",
                is_valid: contact.contact.phone ? (contact.contact.phone.is_valid ? contact.contact.phone.is_valid : false) : false,
            });
            setBasicinfoMobilePhone({
                countryCode: contact.contact.mobile ? (contact.contact.mobile.countryCode ? contact.contact.mobile.countryCode : "US") : "US",
                dailCode: contact.contact.mobile ? (contact.contact.mobile.dailCode ? contact.contact.mobile.dailCode : "+1") : "+1",
                number: contact.contact.mobile ? (contact.contact.mobile.number ? contact.contact.mobile.number : "") : "",
                full_number: contact.contact.mobile ? (contact.contact.mobile.full_number ? contact.contact.mobile.full_number : "") : "",
                original_number: contact.contact.mobile ? (contact.contact.mobile.original_number ? contact.contact.mobile.original_number : "") : "",
                location: contact.contact.mobile ? (contact.contact.mobile.location ? contact.contact.mobile.location : "None") : "None",
                country: contact.contact.mobile ? (contact.contact.mobile.country ? contact.contact.mobile.country : "") : "",
                carrier: contact.contact.mobile ? (contact.contact.mobile.carrier ? contact.contact.mobile.carrier : "None") : "None",
                timezone: contact.contact.mobile ? (contact.contact.mobile.timezone ? contact.contact.mobile.timezone : "America/New_York") : "America/New_York",
                is_valid: contact.contact.mobile ? (contact.contact.mobile.is_valid ? contact.contact.mobile.is_valid : false) : false,
            });
            setBasicinfoMomPhone({
                countryCode: contact.contact.momPhone ? (contact.contact.momPhone.countryCode ? contact.contact.momPhone.countryCode : "US") : "US",
                dailCode: contact.contact.momPhone ? (contact.contact.momPhone.dailCode ? contact.contact.momPhone.dailCode : "+1") : "+1",
                number: contact.contact.momPhone ? (contact.contact.momPhone.number ? contact.contact.momPhone.number : "") : "",
                full_number: contact.contact.momPhone ? (contact.contact.momPhone.full_number ? contact.contact.momPhone.full_number : "") : "",
                original_number: contact.contact.original_number ? (contact.contact.momPhone.original_number ? contact.contact.momPhone.original_number : "") : "",
                location: contact.contact.momPhone ? (contact.contact.momPhone.location ? contact.contact.momPhone.location : "None") : "None",
                country: contact.contact.momPhone ? (contact.contact.momPhone.country ? contact.contact.momPhone.country : "") : "",
                carrier: contact.contact.momPhone ? (contact.contact.momPhone.carrier ? contact.contact.momPhone.carrier : "None") : "None",
                timezone: contact.contact.momPhone ? (contact.contact.momPhone.timezone ? contact.contact.momPhone.timezone : "America/New_York") : "America/New_York",
                is_valid: contact.contact.momPhone ? (contact.contact.momPhone.is_valid ? contact.contact.momPhone.is_valid : false) : false,
            });
            setBasicinfoDadPhone({
                countryCode: contact.contact.dadPhone ? (contact.contact.dadPhone.countryCode ? contact.contact.dadPhone.countryCode : "US") : "US",
                dailCode: contact.contact.dadPhone ? (contact.contact.dadPhone.dailCode ? contact.contact.dadPhone.dailCode : "+1") : "+1",
                number: contact.contact.dadPhone ? (contact.contact.dadPhone.number ? contact.contact.dadPhone.number : "") : "",
                full_number: contact.contact.dadPhone ? (contact.contact.dadPhone.full_number ? contact.contact.dadPhone.full_number : "") : "",
                original_number: contact.contact.dadPhone ? (contact.contact.dadPhone.original_number ? contact.contact.dadPhone.original_number : "") : "",
                location: contact.contact.dadPhone ? (contact.contact.dadPhone.location ? contact.contact.dadPhone.location : "None") : "None",
                country: contact.contact.dadPhone ? (contact.contact.dadPhone.country ? contact.contact.dadPhone.country : "") : "",
                carrier: contact.contact.dadPhone ? (contact.contact.dadPhone.carrier ? contact.contact.dadPhone.carrier : "None") : "None",
                timezone: contact.contact.dadPhone ? (contact.contact.dadPhone.timezone ? contact.contact.dadPhone.timezone : "America/New_York") : "America/New_York",
                is_valid: contact.contact.dadPhone ? (contact.contact.dadPhone.is_valid ? contact.contact.dadPhone.is_valid : false) : false,
            });
            setBasicinfoCompany(contact.contact.company);
            setBasicinfoJobRole(contact.contact.jobRole);
            setBasicinfoMomName(contact.contact.momName);
            setBasicinfoDadName(contact.contact.dadName);
            setBasicinfoAddress1(contact.contact.address1);
            setBasicinfoAddress2(contact.contact.address2);
            setBasicinfoCity(contact.contact.city);
            setBasicinfoState(contact.contact.state);
            setBasicinfoZip(contact.contact.zip);
            setBasicinfoCountry(contact.contact.country);
        }
        setIsLoader(false);
        if (props.page > 1) {
            props.jump(props.page)
        }
    }

    useEffect(() => {
        getContact(props.contactId);
    }, []);


    const handelBasicinfoFname = (e) => {
        e.preventDefault();
        setBasicinfoFname(e.target.value);
        setFormErrorMsg(prevState => ({...prevState, fName: false}));
    }

    const handelBasicinfoLname = (e) => {
        setBasicinfoLname(e.target.value);
        setFormErrorMsg(prevState => ({...prevState, lName: false}));
    }

    const handelBasicinfoDob = (e) => {
        setBasicinfoDob(e.target.value);
    }

    const handelBasicinfoEmail = (event) => {
        setBasicinfoEmail(event.target.value);
        setFormErrorMsg(prevState => ({...prevState, email: false}));
    };

    const handelBasicinfoCompany = (e) => {
        setBasicinfoCompany(e.target.value);
    }

    const handelBasicinfoJobRole = (e) => {
        setBasicinfoJobRole(e.target.value);
    }

    const handelBasicinfoMomName = (event) => {
        setBasicinfoMomName(event.target.value);
    };

    const handelBasicinfoDadName = (event) => {
        setBasicinfoDadName(event.target.value);
    };
    const handelBasicinfoAddress1 = (event) => {
        setBasicinfoAddress1(event.target.value);
    };

    const handelBasicinfoAddress2 = (event) => {
        setBasicinfoAddress2(event.target.value);
    };

    const handelBasicinfoCity = (event) => {
        setBasicinfoCity(event.target.value);
    };

    const handelBasicinfoState = (event) => {
        setBasicinfoState(event.target.value);
    };

    const handelBasicinfoZip = (event) => {
        setBasicinfoZip(event.target.value);
    };

    const handelBasicinfoCountry = (event) => {
        setBasicinfoCountry(event.target.value);
    };
    const handelBsicInfoGender = (event) => {
        setBasicinfoGender(event.target.value);
    }

    const handelBasicinfoMobilePhone = (event) => {
        const {name, value} = event.target;
        if (name === "countryCode") {
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoMobilePhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoMobilePhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            setFormErrorMsg(prevState => ({...prevState, mobile: false}));
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                setBasicinfoMobilePhone(prevState => ({...prevState, [name]: ""}));
                return false;
            } else {
                setBasicinfoMobilePhone(prevState => ({...prevState, [name]: value}));
                setBasicinfoMobilePhone(prevState => ({...prevState, full_number: basicinfoMobilePhone.dailCode + value}));
                setBasicinfoMobilePhone(prevState => ({...prevState, original_number: basicinfoMobilePhone.dailCode.replace("+", "") + value}));
            }
        }
    };

    const handelBasicinfoPhone = (event) => {
        const {name, value} = event.target;
        if (name === "countryCode") {
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoPhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoPhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            setFormErrorMsg(prevState => ({...prevState, phone: ''}));
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                setBasicinfoPhone(prevState => ({...prevState, number: ""}));
                return false;
            } else {
                setBasicinfoPhone(prevState => ({...prevState, number: value}));
                setBasicinfoPhone(prevState => ({...prevState, full_number: basicinfoPhone.dailCode + value}));
                setBasicinfoPhone(prevState => ({...prevState, original_number: basicinfoPhone.dailCode.replace("+","") + value}));
            }
        }
    };

    const handelBasicinfoMomPhone = (event) => {
        const {name, value} = event.target;

        if (name === "countryCode") {
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoMomPhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoMomPhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            setFormErrorMsg(prevState => ({...prevState, momPhone: ''}));
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                setBasicinfoDadPhone(prevState => ({...prevState, number: ""}));
                return false;
            } else {
                setBasicinfoMomPhone(prevState => ({...prevState, number: value}));
                setBasicinfoMomPhone(prevState => ({...prevState, full_number: basicinfoMomPhone.dailCode + value}));
                setBasicinfoMomPhone(prevState => ({...prevState, original_number: basicinfoMomPhone.dailCode.replace("+","") + value}));
            }
        }
    };

    const handelBasicinfoDadPhone = (event) => {
        const {name, value} = event.target;
        if (name === "countryCode") {
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoDadPhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoDadPhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            setFormErrorMsg(prevState => ({...prevState, dadPhone: ''}));
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                setBasicinfoDadPhone(prevState => ({...prevState, number: ""}));
                return false;
            } else {
                setBasicinfoDadPhone(prevState => ({...prevState, [name]: value}));
                setBasicinfoDadPhone(prevState => ({...prevState, full_number: basicinfoDadPnone.dailCode + value}));
                setBasicinfoDadPhone(prevState => ({...prevState, original_number: basicinfoDadPnone.dailCode.replace("+","") + value}));
            }
        }
    };

    const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
            return (
                <option value={el.code} data-dailcode={el.prefix} key={key}>{el.code} ({el.prefix})</option>
            )
        }
    ) : '';

    const formScroll = (event) => {
        if (event.target.scrollTop > 120) {
            setFormScrollStatus(true);
        } else {
            setFormScrollStatus(false);
        }

        props.formScroll(formScrollStatus);
        // console.log(event.target.scrollTop)
    };


    const onContactSubmit = async (e) => {
        e.preventDefault();
        setIsLoader(true);
        let formErrorsCopy = formErrorMsg;
        let isError = false;
        if (!basicinfoFname) {
            isError = true;
            formErrorsCopy.fName = "Please fill up First Name."
        }
        if (!basicinfoLname) {
            isError = true;
            formErrorsCopy.lName = "Please fill up Last Name."
        }
        if (phases !== "" && status === "") {
            isError = true;
            formErrorsCopy.status = "Please Select a status."
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
            } else if (basicinfoPhone.number !== "") {
                let pattern = new RegExp(/^[0-9\b]+$/);
                if (!basicinfoEmail && (basicinfoPhone.number === "" || !pattern.test(basicinfoPhone.number))) {
                    isError = true;
                    formErrorsCopy.phone = "Please fill up your phone number";
                }
            }
        }
        if (isError) {
            setIsLoader(false);
            setFormErrorMsg(formErrorsCopy);
            const body = document.querySelector('#scrollDiv');
            body.scrollTo(0,0)
            setTimeout(() => setFormErrorMsg({
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
                dob: basicinfoDob ? basicinfoDob : "",
                email: basicinfoEmail ? basicinfoEmail : "",
                phone: basicinfoPhone ? basicinfoPhone : "",
                mobile: basicinfoMobilePhone ? basicinfoMobilePhone : "",
                momPhone: basicinfoMomPhone ? basicinfoMomPhone : "",
                dadPhone: basicinfoDadPnone ? basicinfoDadPnone : "",
                company: basicinfoCompany ? basicinfoCompany : "",
                jobRole: basicinfoJobRole ? basicinfoJobRole : "",
                momName: basicinfoMomName ? basicinfoMomName : "",
                dadName: basicinfoDadName ? basicinfoDadName : "",
                address1: basicinfoAddress1 ? basicinfoAddress1 : "",
                address2: basicinfoAddress2 ? basicinfoAddress2 : "",
                city: basicinfoCity ? basicinfoCity : "",
                state: basicinfoState ? basicinfoState : "",
                zip: basicinfoZip ? basicinfoZip : "",
                country: basicinfoCountry ? basicinfoCountry : "",
                gender: basicinfoGender ? basicinfoGender : "",
                status: selectedStatus ? selectedStatus : "",
                phase: selectedPhase ? selectedPhase : ""
            }
            let newPayload = Object.assign(payload, customFieldsList);
            let contactIdNew = contact ? contact._id : 0;
            try {
                let updateContact = await ContactService.updateContact(newPayload, contactIdNew);
                if (updateContact) {
                    if (contactIdNew == 0) {
                        setSuccessMsg('Contact saved successfully.');
                        dispatch({
                            type: actionTypes.CONTACTS_MODAL_ID,
                            contact_modal_id: '',
                        });
                        setTimeout(() => {
                            dispatch({
                                type: actionTypes.CONTACTS_MODAL_ID,
                                contact_modal_id: updateContact.data.insertedId,
                            });
                        }, 300);
                    } else {
                        setSuccessMsg('Contact updated successfully.');
                        props.getContactDetails(contactIdNew);
                        getContact(contactIdNew);
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
    const verify = async (number) => {
        setIsLoader(true);
        let verification =  await ContactService.verifyNumber(number);
        setIsLoader(false);
        return verification;
    }
    const verifyNumber = async (e,field) => {
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
                      setFormErrorMsg(prevState => ({...prevState, phone: result.message}));
                  }
              } else {
                  setFormErrorMsg(prevState => ({...prevState, phone: 'Number not given.'}));
              }
              break;
          case 'mobile':
              if (basicinfoMobilePhone.number) {
                  let payload = {
                      isPrefixGiven: true,
                      prefix: basicinfoMobilePhone.dailCode,
                      number: basicinfoMobilePhone.number
                  }
                  let result = await verify(payload);
                  if (result.success) {
                      setBasicinfoMobilePhone(result.data);
                      setSuccessMsg(result.message);
                  } else {
                      setFormErrorMsg(prevState => ({...prevState, mobile: result.message}));
                  }
              } else {
                  setFormErrorMsg(prevState => ({...prevState, mobile: 'Number not given.'}));
              }
              break;
          case 'momPhone':
              if (basicinfoMomPhone.number) {
                  let payload = {
                      isPrefixGiven: true,
                      prefix: basicinfoMomPhone.dailCode,
                      number: basicinfoMomPhone.number
                  }
                  let result = await verify(payload);
                  if (result.success) {
                      setBasicinfoMomPhone(result.data);
                      setSuccessMsg(result.message);
                  } else {
                      setFormErrorMsg(prevState => ({...prevState, momPhone: result.message}));
                  }
              } else {
                  setFormErrorMsg(prevState => ({...prevState, momPhone: 'Number not given.'}));
              }
              break;
          case 'dadPhone':
              if (basicinfoDadPnone.number) {
                  let payload = {
                      isPrefixGiven: true,
                      prefix: basicinfoDadPnone.dailCode,
                      number: basicinfoDadPnone.number
                  }
                  let result = await verify(payload);
                  if (result.success) {
                      setBasicinfoDadPhone(result.data);
                      setSuccessMsg(result.message);
                  } else {
                      setFormErrorMsg(prevState => ({...prevState, dadPhone: result.message}));
                  }
              } else {
                  setFormErrorMsg(prevState => ({...prevState, dadPhone: 'Number not given.'}));
              }
              break;
          default:
              break;
      }
    }
    const toggleCustomField = (e, field, value) => {
        e.preventDefault();
        setToggleCustom(prevState => ({...prevState, [field]: !value}));
    }
    const handlerCustomFieldChange = (event) => {
        const {name, value} = event.target;
        setCustomFieldsList(prevState => ({...prevState, [name]: value}));
        setCustomFieldsError(prevState => ({...prevState, [name]: false}));
    }
    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
        if (event.target.value) {
            let searchResultPhases = phases.find(ele => ele._id === event.target.value);
            setStatus(searchResultPhases.statuses)
        } else {
            setStatus([]);
        }
    }
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    }
    useEffect(() => {
        if (successMsg) setTimeout(() => {
            setSuccessMsg("")
        }, 5000)
        if (errorMsg) setTimeout(() => {
            setErrorMsg("")
        }, 5000)
    }, [successMsg, errorMsg]);

    return (
        <div className={formScrollStatus ? "contactModalTab expanded" : "contactModalTab"} id="scrollDiv" onScroll={formScroll}>
            {successMsg &&
                <div className="contactOverview">
                <SuccessAlert message={successMsg}></SuccessAlert>
                </div>
            }
            {errorMsg &&
                <div className="contactOverview">
                <ErrorAlert message={errorMsg}></ErrorAlert>
                </div>
            }
            {props.contactId !== 0 &&
                <div className="overviewList">
                    <ul>
                        <li>
                            <div className="val">0</div>
                            <p className="label">Touch Points</p>
                        </li>
                        <li>
                            <div className="val">0</div>
                            <p className="label">Calls</p>
                        </li>
                        <li>
                            <div className="val">0</div>
                            <p className="label">SMS</p>
                        </li>
                        <li>
                            <div className="val">0</div>
                            <p className="label">Emails</p>
                        </li>
                        <li>
                            <div className="val">0</div>
                            <p className="label">Classes attended</p>
                        </li>
                    </ul>
                </div>
            }
            <form>
                <div className="overviewFormWrap overviewInfos">
                    {isLoader ? <Loader/> : ""}
                    <div className="overviewForm cmnForm">
                        <div className="cmnFormHead">
                            <h3>Basic Info</h3>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    First name <span className="mandatory">*</span>
                                </div>
                                <div className={formErrorMsg.fName ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" defaultValue={basicinfoFname}
                                           placeholder="" onChange={handelBasicinfoFname}/>
                                    {formErrorMsg.fName ? <p className="errorMsg">{formErrorMsg.fName}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Last Name <span className="mandatory">*</span>
                                </div>
                                <div className={formErrorMsg.lName ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoLname} onChange={handelBasicinfoLname}/>
                                    {formErrorMsg.lName ? <p className="errorMsg">{formErrorMsg.lName}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Date of Birth
                                </div>
                                <div className={formErrorMsg.dob ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="date" className="cmnFieldStyle" placeholder="" max={moment().format('YYYY-MM-DD')}
                                           defaultValue={basicinfoDob} onChange={handelBasicinfoDob}/>
                                    {formErrorMsg.dob ? <p className="errorMsg">{formErrorMsg.dob}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Email <span className="mandatory">*</span>
                                </div>
                                <div className={formErrorMsg.email ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="email" className="cmnFieldStyle" placeholder="Eg. Jon.doe@domain.com"
                                           defaultValue={basicinfoEmail} onChange={handelBasicinfoEmail}/>
                                    {formErrorMsg.email ? <p className="errorMsg">{formErrorMsg.email}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Phone
                                </div>
                                <div
                                    className={formErrorMsg.phone ? "cmnFormField countryCodeField phoneNumberField errorField" : "cmnFormField phoneNumberField countryCodeField"}>
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
                                    <button className="verifyNumberButton" onClick={(e) => verifyNumber(e,'phone')}>
                                        <img src={verify_icon} alt=""/> Verify
                                    </button>
                                    {formErrorMsg.phone ? <p className="errorMsg">{formErrorMsg.phone}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Mobile
                                </div>
                                <div
                                    className={formErrorMsg.mobile ? "cmnFormField countryCodeField phoneNumberField errorField" : "cmnFormField phoneNumberField countryCodeField"}>
                                    <div className="countryCode cmnFieldStyle">
                                        <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                        <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                        <select className="selectCountry" name="countryCode"
                                                defaultValue={basicinfoMobilePhone.countryCode}
                                                onChange={handelBasicinfoMobilePhone}>
                                            {countrycodeOpt}
                                        </select>
                                    </div>
                                    <input type="phone" className="cmnFieldStyle" name="number"
                                           placeholder="Eg. (555) 555-1234" value={basicinfoMobilePhone.number}
                                           onChange={handelBasicinfoMobilePhone}/>
                                    <button className="verifyNumberButton" onClick={(e) => verifyNumber(e,'mobile')}>
                                        <img src={verify_icon} alt=""/> Verify
                                    </button>
                                    {formErrorMsg.mobile ? <p className="errorMsg">{formErrorMsg.mobile}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Phase
                                </div>
                                <div className={formErrorMsg.phase ? "cmnFormField errorField" : "cmnFormField"}>
                                    <select name="phase" className="cmnFieldStyle btnSelect" value={selectedPhase} onChange={handlePhaseChange}>
                                        <option value="">Select a Phase</option>
                                        {
                                            phases.map(ele => {
                                                if (ele.statuses.length) {
                                                    return (<option value={ele._id}>{ele.name}</option>)
                                                }
                                            })
                                        }
                                    </select>
                                    {formErrorMsg.phase ? <p className="errorMsg">{formErrorMsg.phase}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Status
                                </div>
                                <div className={formErrorMsg.status ? "cmnFormField errorField" : "cmnFormField"}>
                                    <select name="status" className="cmnFieldStyle btnSelect" value={selectedStatus} onChange={handleStatusChange}>
                                        <option value="">Select a Status</option>
                                        {
                                            status.map(ele => {
                                                return (<option value={ele._id}>{ele.name}</option>)
                                            })
                                        }
                                    </select>
                                    {formErrorMsg.status ? <p className="errorMsg">{formErrorMsg.status}</p> : ""}
                                </div>
                            </div>

                        </div>
                        {/* <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                            Full Address
                            </div>
                            <div className="cmnFormField">
                                <textarea className="cmnFieldStyle" placeholder="Eg. The Park Appt, Suit 204, 1/2A Street Name,TX"></textarea>
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Gender
                            </div>
                            <div className="cmnFormField radioGroup">
                                <label className="cmnFormRadioLable">
                                    <div className="circleRadio">
                                        <input type="radio" name="gender" value="skip" />
                                        <span></span>
                                    </div>
                                    Male
                                </label>
                                <label className="cmnFormRadioLable">
                                    <div className="circleRadio">
                                        <input type="radio" name="gender" value="skip" />
                                        <span></span>
                                    </div>
                                    Female
                                </label>
                                <label className="cmnFormRadioLable">
                                    <div className="circleRadio">
                                        <input type="radio" name="gender" value="skip" />
                                        <span></span>
                                    </div>
                                    Others
                                </label>
                            </div>

                            <div className="cmnFieldName bestSizeField">
                                Belt Size
                            </div>
                            <div className="cmnFormField">
                                <input type="number" className="cmnFieldStyle" />
                            </div>
                        </div>
                    </div> */}
                    </div>
                    <div className="overviewForm cmnForm">
                        <div className="cmnFormHead">
                            <h3>Work</h3>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Company
                                </div>
                                <div className={formErrorMsg.company ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoCompany} onChange={handelBasicinfoCompany}/>
                                    {formErrorMsg.company ? <p className="errorMsg">{formErrorMsg.company}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Job Role
                                </div>
                                <div className={formErrorMsg.jobRole ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoJobRole} onChange={handelBasicinfoJobRole}/>
                                    {formErrorMsg.jobRole ? <p className="errorMsg">{formErrorMsg.jobRole}</p> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overviewForm cmnForm">
                        <div className="cmnFormHead">
                            <h3>Personal</h3>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Mother's Name
                                </div>
                                <div className={formErrorMsg.momName ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoMomName} onChange={handelBasicinfoMomName}/>
                                    {formErrorMsg.momName ? <p className="errorMsg">{formErrorMsg.momName}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Mother's Phone Number
                                </div>
                                <div
                                    className={formErrorMsg.momPhone ? "cmnFormField countryCodeField phoneNumberField errorField" : "cmnFormField phoneNumberField countryCodeField"}>
                                    <div className="countryCode cmnFieldStyle">
                                        <div className="countryName">{basicinfoMomPhone.countryCode}</div>
                                        <div className="daileCode">{basicinfoMomPhone.dailCode}</div>
                                        <select className="selectCountry" name="countryCode"
                                                defaultValue={basicinfoMomPhone.countryCode}
                                                onChange={handelBasicinfoMomPhone}>
                                            {countrycodeOpt}
                                        </select>
                                    </div>
                                    <input type="phone" className="cmnFieldStyle" name="number"
                                           placeholder="Eg. (555) 555-1234" defaultValue={basicinfoMomPhone.number}
                                           onChange={handelBasicinfoMomPhone}/>
                                    <button className="verifyNumberButton" onClick={(e) => verifyNumber(e,'momPhone')}>
                                        <img src={verify_icon} alt=""/> Verify
                                    </button>
                                    {formErrorMsg.momPhone ? <p className="errorMsg">{formErrorMsg.momPhone}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Father's Name
                                </div>
                                <div className={formErrorMsg.dadName ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoDadName} onChange={handelBasicinfoDadName}/>
                                    {formErrorMsg.dadName ? <p className="errorMsg">{formErrorMsg.dadName}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Father's Phone Number
                                </div>
                                <div
                                    className={formErrorMsg.dadPhone ? "cmnFormField countryCodeField phoneNumberField errorField" : "cmnFormField phoneNumberField countryCodeField"}>
                                    <div className="countryCode cmnFieldStyle">
                                        <div className="countryName">{basicinfoDadPnone.countryCode}</div>
                                        <div className="daileCode">{basicinfoDadPnone.dailCode}</div>
                                        <select className="selectCountry" name="countryCode"
                                                defaultValue={basicinfoDadPnone.countryCode}
                                                onChange={handelBasicinfoDadPhone}>
                                            {countrycodeOpt}
                                        </select>
                                    </div>
                                    <input type="phone" className="cmnFieldStyle" name="number"
                                           placeholder="Eg. (555) 555-1234" defaultValue={basicinfoDadPnone.number}
                                           onChange={handelBasicinfoDadPhone}/>
                                    <button className="verifyNumberButton" onClick={(e) => verifyNumber(e,'dadPhone')}>
                                        <img src={verify_icon} alt=""/> Verify
                                    </button>
                                    {formErrorMsg.dadPhone ? <p className="errorMsg">{formErrorMsg.dadPhone}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Gender
                                </div>
                                <div className="cmnFormField radioGroup">
                                    <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                            <input type="radio" name="gender" value="male"
                                                   checked={basicinfoGender === 'male'}
                                                   onChange={handelBsicInfoGender}/>
                                            <span></span>
                                        </div>
                                        Male
                                    </label>
                                    <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                            <input type="radio" name="gender" value="female"
                                                   checked={basicinfoGender === 'female'}
                                                   onChange={handelBsicInfoGender}/>
                                            <span></span>
                                        </div>
                                        Female
                                    </label>
                                    <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                            <input type="radio" name="gender" value="others"
                                                   checked={basicinfoGender === 'others'}
                                                   onChange={handelBsicInfoGender}/>
                                            <span></span>
                                        </div>
                                        Others
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overviewForm cmnForm">
                        <div className="cmnFormHead">
                            <h3>Address</h3>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Address 1
                                </div>
                                <div className={formErrorMsg.address1 ? "cmnFormField errorField" : "cmnFormField"}>
                                    <textarea className="cmnFieldStyle"
                                              placeholder="Eg. The Park Appt, Suit 204, 1/2A Street Name,TX"
                                              defaultValue={basicinfoAddress1}
                                              onChange={handelBasicinfoAddress1}></textarea>
                                    {formErrorMsg.address1 ? <p className="errorMsg">{formErrorMsg.address1}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Address 2
                                </div>
                                <div className={formErrorMsg.address2 ? "cmnFormField errorField" : "cmnFormField"}>
                                    <textarea className="cmnFieldStyle"
                                              placeholder="Eg. The Park Appt, Suit 204, 1/2A Street Name,TX"
                                              defaultValue={basicinfoAddress2}
                                              onChange={handelBasicinfoAddress2}></textarea>
                                    {formErrorMsg.address2 ? <p className="errorMsg">{formErrorMsg.address2}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    City
                                </div>
                                <div className={formErrorMsg.city ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoCity} onChange={handelBasicinfoCity}/>
                                    {formErrorMsg.city ? <p className="errorMsg">{formErrorMsg.city}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    State
                                </div>
                                <div className={formErrorMsg.state ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoState} onChange={handelBasicinfoState}/>
                                    {formErrorMsg.state ? <p className="errorMsg">{formErrorMsg.state}</p> : ""}
                                </div>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Zip
                                </div>
                                <div className={formErrorMsg.zip ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoZip} onChange={handelBasicinfoZip}/>
                                    {formErrorMsg.zip ? <p className="errorMsg">{formErrorMsg.zip}</p> : ""}
                                </div>
                            </div>
                            <div className="cmnFormCol">
                                <div className="cmnFieldName">
                                    Country
                                </div>
                                <div className={formErrorMsg.country ? "cmnFormField errorField" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" placeholder=""
                                           defaultValue={basicinfoCountry} onChange={handelBasicinfoCountry}/>
                                    {formErrorMsg.country ? <p className="errorMsg">{formErrorMsg.country}</p> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overviewForm cmnForm">
                        {
                            customFields.length > 0 &&
                            <>
                                <div className="cmnFormHead">
                                    <h3>Custom Fields</h3>
                                </div>
                                {
                                    customFields.map((row, index) => (
                                        <div className="cmnFormRow" key={index}>
                                            { row.map((col, index2) => (
                                                <div className="cmnFormCol" key={index2}>
                                                    <div className="cmnFieldName">
                                                        {col.fieldName}
                                                    </div>
                                                    <div className={formErrorMsg.zip ? "cmnFormField errorField" : "cmnFormField"}>
                                                        {(() => {
                                                            switch (col.fieldType) {
                                                                case 'text':
                                                                    return <input type="text" className="cmnFieldStyle" name={col.alias} placeholder={col.fieldName} pattern={col.fieldRegex}
                                                                                  defaultValue={contact ? contact[col.alias] : ""} onChange={handlerCustomFieldChange}/>;
                                                                case 'number':
                                                                    return <input type="number" className="cmnFieldStyle" name={col.alias} placeholder={col.fieldName} pattern={col.fieldRegex}
                                                                                  defaultValue={contact ? contact[col.alias] : ""} onChange={handlerCustomFieldChange}/>;
                                                                case 'email':
                                                                    return <input type="email" className="cmnFieldStyle" name={col.alias} placeholder={col.fieldName} pattern={col.fieldRegex}
                                                                                  defaultValue={contact ? contact[col.alias] : ""} onChange={handlerCustomFieldChange}/>;
                                                                case 'textarea':
                                                                    return <textarea className="cmnFieldStyle"
                                                                                     placeholder={col.fieldName}
                                                                                     name={col.alias}
                                                                                     defaultValue={contact ? contact[col.alias] : ""} pattern={col.fieldRegex}
                                                                                     onChange={handlerCustomFieldChange}></textarea>;
                                                                default:
                                                                    return <input type="text" className="cmnFieldStyle" name={col.alias} placeholder={col.fieldName} pattern={col.fieldRegex}
                                                                                  defaultValue={contact ? contact[col.alias] : ""} onChange={handlerCustomFieldChange}/>;
                                                            }
                                                        })()}

                                                        {customFieldsError[col.alias] ? <p className="errorMsg">Please give a valid input.</p> : ""}
                                                    </div>
                                                </div>
                                                /*<div className="cmnFormCol-3" key={index2}>
                                                    <div className={"overviewCustomFieldBox cmnFieldStyle " + (customFieldsError[col.alias] ? 'error' : '') + (toggleCustom[col.alias] ? 'toggleActive' : 'toggleInactive' )}>
                                                        <span>{col.fieldName}</span>
                                                        <button className="addOverviewCustomFiel" onClick={(e) => toggleCustomField(e,col.alias, toggleCustom[col.alias])}>
                                                            {
                                                                toggleCustom[col.alias] ? <img className="crossIcon" src={cross_icon} alt="" /> : <img className="plusIcon" src={plus_icon} alt="" />
                                                            }
                                                        </button>
                                                        { toggleCustom[col.alias] &&
                                                            <div className="extraCustonbox">
                                                                <input type="text" name={col.alias} value={customFieldsList[col.alias]} onChange={handlerCustomFieldChange}/>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>*/
                                            )) }
                                        </div>
                                    ))
                                }
                            </>
                        }
                        <div className="cmnFormRow">
                            <div className="formActBtnWrap">
                                <button className="saveNnewBtn saveOverview" type="button"
                                        onClick={(e) => onContactSubmit(e)}> {props.contactId === 0 ? 'Save' : 'Update'} <img src={arrow_forward}
                                                                                                 alt=""/></button>
                                <button className="btn-link" onClick={props.closeContactModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Overview;
