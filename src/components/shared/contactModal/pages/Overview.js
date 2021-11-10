import React, { useState, useEffect } from "react";
import { ContactService } from "../../../../services/contact/ContactServices";
import Loader from "../../Loader";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import {ErrorAlert, SuccessAlert} from "../../messages";

const Overview = (props) => {
    const [formScrollStatus, setFormScrollStatus] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [basicinfoFname, setBasicinfoFname] = useState('');
    const [basicinfoLname, setBasicinfoLname] = useState('');
    const [basicinfoDob, setBasicinfoDob] = useState('');
    const [basicinfoEmail, setBasicinfoEmail] = useState('');
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
    const [basicinfoPhone, setBasicinfoPhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: ""
    });
    const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: ""
    });
    const [basicinfoMomPhone, setBasicinfoMomPhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: ""
    });
    const [basicinfoDadPnone, setBasicinfoDadPhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: ""
    });
    const [contact, setContact] = useState('');

    const [formErrorMsg, setFormErrorMsg] = useState({
        email: "",
        phone: "",
        fName: "",
        lName: ""
    });


    const fetchCountry = async () => {
        let conntryResponse = await ContactService.fetchCountry();
        setPhoneCountryCode(conntryResponse);
    };

    useEffect(() => {
        fetchCountry();
    }, []);

    const getContact = async () => {
        setIsLoader(true);
        let payload = {
            id: props.contactId
        }
        let contact = await ContactService.fetchContact(JSON.stringify(payload));
        setContact(contact.contact);
        setBasicinfoFname(contact.contact.firstName);
        setBasicinfoLname(contact.contact.lastName);
        setBasicinfoDob(contact.contact.dob);
        setBasicinfoEmail(contact.contact.email);
        setBasicinfoPhone({
            countryCode: contact.contact.phone ? (contact.contact.phone.countryCode ? contact.contact.phone.countryCode : "US") : "US",
            dailCode: contact.contact.phone ? (contact.contact.phone.dailCode ? contact.contact.phone.dailCode : "+1") : "+1",
            number: contact.contact.phone ? (contact.contact.phone.number ? contact.contact.phone.number : "") : ""
        });
        setBasicinfoMobilePhone({
            countryCode: contact.contact.mobile ? (contact.contact.mobile.countryCode ? contact.contact.mobile.countryCode : "US") : "US",
            dailCode: contact.contact.mobile ? (contact.contact.mobile.dailCode ? contact.contact.mobile.dailCode : "+1") : "+1",
            number: contact.contact.mobile ? (contact.contact.mobile.number ? contact.contact.mobile.number : "") : ""
        });
        setBasicinfoMomPhone({
            countryCode: contact.contact.momPhone ? ( contact.contact.momPhone.countryCode ? contact.contact.momPhone.countryCode : "US") : "US",
            dailCode: contact.contact.momPhone ? (contact.contact.momPhone.dailCode ? contact.contact.momPhone.dailCode : "+1")  : "+1",
            number: contact.contact.momPhone ? (contact.contact.momPhone.number ? contact.contact.momPhone.number : "") : ""
        });
        setBasicinfoDadPhone({
            countryCode: contact.contact.dadPhone ? (contact.contact.dadPhone.countryCode ? contact.contact.dadPhone.countryCode : "US") : "US",
            dailCode: contact.contact.dadPhone ? (contact.contact.dadPhone.dailCode ? contact.contact.dadPhone.dailCode : "+1") : "+1" ,
            number: contact.contact.dadPhone ? (contact.contact.dadPhone.number ? contact.contact.dadPhone.number : "") : ""
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
        setIsLoader(false);
    }

    useEffect(() => {
        getContact();
    }, []);


    const handelBasicinfoFname = (e) => {
        e.preventDefault();
        setBasicinfoFname(e.target.value);
    }

    const handelBasicinfoLname = (e) => {
        setBasicinfoLname(e.target.value);
    }

    const handelBasicinfoDob = (e) => {
        setBasicinfoDob(e.target.value);
    }

    const handelBasicinfoEmail = (event) => {
        setBasicinfoEmail(event.target.value);
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


    const handelBasicinfoMobilePhone = (event) => {
        const {name, value} = event.target;
        if(name === "countryCode"){
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoMobilePhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoMobilePhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                return false;
            } else {
                setBasicinfoMobilePhone(prevState => ({...prevState, [name]: value}));
            }
        }
    };

    const handelBasicinfoPhone = (event) => {
        const {name, value} = event.target;
        if(name === "countryCode"){
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoPhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoPhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                return false;
            } else {
                setBasicinfoPhone(prevState => ({...prevState, number: value}));
            }
        }
    };

    const handelBasicinfoMomPhone = (event) => {
        const {name, value} = event.target;

        if(name === "countryCode"){
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoMomPhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoMomPhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                return false;
            } else {
                setBasicinfoMomPhone(prevState => ({...prevState, number: value}));
            }
        }
    };

    const handelBasicinfoDadPhone = (event) => {
        const {name, value} = event.target;
        if(name === "countryCode"){
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex !== undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoDadPhone(prevState => ({...prevState, dailCode: dailCode}));
            setBasicinfoDadPhone(prevState => ({...prevState, countryCode: value}));
        }
        if (name === "number") {
            let pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(event.target.value)) {
                return false;
            } else {
                setBasicinfoDadPhone(prevState => ({...prevState, [name]: value}));
            }
        }
    };

    const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
        return(
            <option value={el.code} data-dailcode={el.prefix} key={key} >{el.code} ({el.prefix})</option>
        )}
    ) : '';

    const formScroll = (event) => {
        if(event.target.scrollTop > 120){
            setFormScrollStatus(true);
        } else {
            setFormScrollStatus(false);
        }

        props.formScroll(formScrollStatus);
        // console.log(event.target.scrollTop)
    };


    const onContactSubmit = async (e) => {
        e.preventDefault();
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
        if (!basicinfoEmail && basicinfoPhone.number === "") {
            isError = true;
            formErrorsCopy.email = "Please fill up your email or phone";
        } else {
            if (basicinfoEmail) {
                console.log((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(basicinfoEmail)))
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
            setFormErrorMsg(formErrorsCopy);
            setTimeout(() => setFormErrorMsg({
                    email: "",
                    phone: "",
                    fName: "",
                    lName: ""
                }), 10000);
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
                company: basicinfoCompany ? basicinfoCompany : "" ,
                jobRole: basicinfoJobRole ? basicinfoJobRole : "",
                momName: basicinfoMomName ? basicinfoMomName : "",
                dadName: basicinfoDadName ? basicinfoDadName : "",
                address1: basicinfoAddress1 ? basicinfoAddress1 : "",
                address2: basicinfoAddress2 ? basicinfoAddress2 : "",
                city: basicinfoCity ? basicinfoCity : "",
                state: basicinfoState ? basicinfoState : "",
                zip: basicinfoZip ? basicinfoZip : "",
                country: basicinfoCountry ? basicinfoCountry : ""
            }
            let updateContact = await ContactService.updateContact(payload, contact._id);
            if (updateContact) {
                setSuccessMsg('Contact updated successfully.')
            } else {
                setErrorMsg('Something went wrong.')
            }
        }
    }

    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, 5000)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, 5000)
    }, [successMsg, errorMsg]);

    return(
        <div className={formScrollStatus ? "contactModalTab expanded" : "contactModalTab"} onScroll={formScroll}>
            {isLoader ? <Loader /> : ''}
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            <div className="overviewList">
                <ul>
                    <li>
                        <div className="val">999</div>
                        <p className="label">Touch Points</p>
                    </li>
                    <li>
                        <div className="val">999</div>
                        <p className="label">Calls</p>
                    </li>
                    <li>
                        <div className="val">999</div>
                        <p className="label">SMS</p>
                    </li>
                    <li>
                        <div className="val">999</div>
                        <p className="label">Emails</p>
                    </li>
                    <li>
                        <div className="val">999</div>
                        <p className="label">Classes attended</p>
                    </li>
                </ul>
            </div>
            <form>
            <div className="overviewFormWrap">
                <div className="overviewForm cmnForm">
                    <div className="cmnFormHead">
                        <h3>Basic Info</h3>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                First name
                            </div>
                            <div className={formErrorMsg.fName ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="text" className="cmnFieldStyle" defaultValue={basicinfoFname} placeholder="" onChange={handelBasicinfoFname} />
                                {formErrorMsg.fName ? <p className="errorMsg">{formErrorMsg.fName}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             Last Name
                            </div>
                            <div className={formErrorMsg.lName ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoLname} onChange={handelBasicinfoLname} />
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
                                <input type="date" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoDob} onChange={handelBasicinfoDob} />
                                {formErrorMsg.dob ? <p className="errorMsg">{formErrorMsg.dob}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Email
                            </div>
                            <div className={formErrorMsg.email ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="email" className="cmnFieldStyle" placeholder="Eg. Jon.doe@domain.com" defaultValue={basicinfoEmail} onChange={handelBasicinfoEmail}/>
                                {formErrorMsg.email ? <p className="errorMsg">{formErrorMsg.email}</p> : ""}
                            </div>
                        </div>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Phone
                            </div>
                            <div className={formErrorMsg.phone ? "cmnFormField countryCodeField errorField" : "cmnFormField countryCodeField"}>
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoPhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoPhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoPhone.countryCode} onChange={handelBasicinfoPhone}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" value={basicinfoPhone.number} onChange={handelBasicinfoPhone} />
                                {formErrorMsg.phone ? <p className="errorMsg">{formErrorMsg.phone}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Mobile
                            </div>
                            <div className={formErrorMsg.mobile ? "cmnFormField countryCodeField errorField" : "cmnFormField countryCodeField"}>
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhone}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" value={basicinfoMobilePhone.number} onChange={handelBasicinfoMobilePhone} />
                                {formErrorMsg.mobile ? <p className="errorMsg">{formErrorMsg.mobile}</p> : ""}
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
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoCompany} onChange={handelBasicinfoCompany} />
                                {formErrorMsg.company ? <p className="errorMsg">{formErrorMsg.company}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             Job Role
                            </div>
                            <div className={formErrorMsg.jobRole ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoJobRole} onChange={handelBasicinfoJobRole} />
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
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoMomName} onChange={handelBasicinfoMomName} />
                                {formErrorMsg.momName ? <p className="errorMsg">{formErrorMsg.momName}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Mother's Phone Number
                            </div>
                            <div className={formErrorMsg.momPhone ? "cmnFormField countryCodeField errorField" : "cmnFormField countryCodeField"}>
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoMomPhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMomPhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMomPhone.countryCode} onChange={handelBasicinfoMomPhone}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" defaultValue={basicinfoMomPhone.number} onChange={handelBasicinfoMomPhone} />
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
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoDadName} onChange={handelBasicinfoDadName} />
                                {formErrorMsg.dadName ? <p className="errorMsg">{formErrorMsg.dadName}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Father's Phone Number
                            </div>
                            <div className={formErrorMsg.dadPhone ? "cmnFormField countryCodeField errorField" : "cmnFormField countryCodeField"}>
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoDadPnone.countryCode}</div>
                                    <div className="daileCode">{basicinfoDadPnone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoDadPnone.countryCode} onChange={handelBasicinfoDadPhone}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" defaultValue={basicinfoDadPnone.number} onChange={handelBasicinfoDadPhone} />
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
                                        <input type="radio" name="gender" value="male" />
                                        <span></span>
                                    </div>
                                    Male
                                </label>
                                <label className="cmnFormRadioLable">
                                    <div className="circleRadio">
                                        <input type="radio" name="gender" value="female" />
                                        <span></span>
                                    </div>
                                    Female
                                </label>
                                <label className="cmnFormRadioLable">
                                    <div className="circleRadio">
                                        <input type="radio" name="gender" value="others" />
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
                                <textarea className="cmnFieldStyle" placeholder="Eg. The Park Appt, Suit 204, 1/2A Street Name,TX" defaultValue={basicinfoAddress1} onChange={handelBasicinfoAddress1}></textarea>
                                {formErrorMsg.address1 ? <p className="errorMsg">{formErrorMsg.address1}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                            Address 2
                            </div>
                            <div className={formErrorMsg.address2 ? "cmnFormField errorField" : "cmnFormField"}>
                                <textarea className="cmnFieldStyle" placeholder="Eg. The Park Appt, Suit 204, 1/2A Street Name,TX" defaultValue={basicinfoAddress2} onChange={handelBasicinfoAddress2}></textarea>
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
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoCity} onChange={handelBasicinfoCity} />
                                {formErrorMsg.city ? <p className="errorMsg">{formErrorMsg.city}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             State
                            </div>
                            <div className={formErrorMsg.state ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoState} onChange={handelBasicinfoState} />
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
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoZip} onChange={handelBasicinfoZip} />
                                {formErrorMsg.zip ? <p className="errorMsg">{formErrorMsg.zip}</p> : ""}
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             Country
                            </div>
                            <div className={formErrorMsg.country ? "cmnFormField errorField" : "cmnFormField"}>
                                <input type="text" className="cmnFieldStyle" placeholder="" defaultValue={basicinfoCountry} onChange={handelBasicinfoCountry} />
                                {formErrorMsg.country ? <p className="errorMsg">{formErrorMsg.country}</p> : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overviewForm cmnForm">
                    {/* <div className="cmnFormHead">
                        <h3>Custom Fields</h3>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol-3">
                            <div className="overviewCustomFieldBox cmnFieldStyle">
                                <span>Secondary Address</span>
                                <button className="addOverviewCustomFiel">
                                    <img src={plus_icon} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="cmnFormCol-3">
                            <div className="overviewCustomFieldBox cmnFieldStyle">
                                <span>Business Reg. No.</span>
                                <button className="addOverviewCustomFiel">
                                    <img src={plus_icon} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="cmnFormCol-3">
                            <div className="overviewCustomFieldBox cmnFieldStyle">
                                <span>Custom Field 3</span>
                                <button className="addOverviewCustomFiel">
                                    <img src={plus_icon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div> */}
                    <div className="cmnFormRow">
                        <div className="formActBtnWrap">
                            <button className="saveNnewBtn saveOverview" type="button" onClick={(e) => onContactSubmit(e)}>Save and Update <img src={arrow_forward} alt="" /></button>
                            <button className="btn-link">Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
            </form>
        </div>
    );
}

export default Overview;
