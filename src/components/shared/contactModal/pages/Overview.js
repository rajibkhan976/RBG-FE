import React, { useState, useEffect } from "react";
import { ContactService } from "../../../../services/contact/ContactServices";
import Loader from "../../Loader";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";

const Overview = (props) => {
    const [formScrollStatus, setFormScrollStatus] = useState(false);
    const [isLoader, setIsLoader] = useState(false);

    const [basicinfoFname, setBasicinfoFname] = useState('');
    const [basicinfoLname, setBasicinfoLname] = useState('');
    const [basicinfoDob, setBasicinfoDob] = useState('');
    const [basicinfoEmail, setBasicinfoEmail] = useState('');
    const [basicinfoPhone, setBasicinfoPhone] = useState('');
    const [basicinfoMobile, setBasicinfoMobile] = useState('');
    const [basicinfoCompany, setBasicinfoCompany] = useState('');
    const [basicinfoJobRole, setBasicinfoJobRole] = useState('');
    const [basicinfoMomName, setBasicinfoMomName] = useState('');
    const [basicinfoMomPhone, setBasicinfoMomPhone] = useState('');
    const [basicinfoDadName, setBasicinfoDadName] = useState('');
    const [basicinfoDadPnone, setBasicinfoDadPhone] = useState('');
    const [basicinfoAddress1, setBasicinfoAddress1] = useState('');
    const [basicinfoAddress2, setBasicinfoAddress2] = useState('');
    const [basicinfoCity, setBasicinfoCity] = useState('');
    const [basicinfoState, setBasicinfoState] = useState('');
    const [basicinfoZip, setBasicinfoZip] = useState('');
    const [basicinfoCountry, setBasicinfoCountry] = useState('');

    const [phoneCountryCode, setPhoneCountryCode] = useState([]);
    const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: "1234567890"
    });
    const [contact, setContact] = useState('');

    const [formErrorMsg, setFormErrorMsg] = useState({
        fName: "",
        lName: "",
        dob: "",
        email: "",
        phone: "",
        mobile: "",
        company: "",
        jobRole: "",
        momName: "",
        momPhone: "",
        dadName: "",
        dadPhone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    });


    const fetchCountry = async () => {
        let conntryResponse = await ContactService.fetchCountry();
        setPhoneCountryCode(conntryResponse);
        console.log(conntryResponse, "country");
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
        if (contact.status === 200) {
            setContact(contact.data.contact);
            setBasicinfoFname(contact.data.contact.firstName);
            setBasicinfoLname(contact.data.contact.lastName);
            setBasicinfoDob(contact.data.contact.dob);
            setBasicinfoEmail(contact.data.contact.email);
            setBasicinfoPhone(contact.data.contact.phone);
            setBasicinfoMobile(contact.data.contact.mobile);
            setBasicinfoCompany(contact.data.contact.company);
            setBasicinfoJobRole(contact.data.contact.jobRole);
            setBasicinfoMomName(contact.data.contact.momName);
            setBasicinfoMomPhone(contact.data.contact.momCellPhone);
            setBasicinfoDadName(contact.data.contact.dadName);
            setBasicinfoDadPhone(contact.data.contact.dadCellPhone);
            setBasicinfoAddress1(contact.data.contact.address1);
            setBasicinfoAddress2(contact.data.contact.address2);
            setBasicinfoCity(contact.data.contact.city);
            setBasicinfoState(contact.data.contact.state);
            setBasicinfoZip(contact.data.contact.zip);
            setBasicinfoCountry(contact.data.contact.country);
            
        } else {
            console.log(contact.message);
        }
        setIsLoader(false);
        console.log(contact, "contact fetched=========");
    }

    useEffect(() => {
        getContact();
    }, []);


    const handelBasicinfoFname = (e) => {
        e.preventDefault();
        setBasicinfoFname(e.target.value);
        console.log(basicinfoFname, "#####=========");
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

    const handelBasicinfoPhone = (event) => {
        let pattern = new RegExp(/^[0-9\b]+$/);

        if (!pattern.test(event.target.value)) {
            return false;
        } else {
            setBasicinfoPhone(event.target.value);
        }
        
    };

    const handelBasicinfoMobile = (event) => {
        setBasicinfoMobile(event.target.value);
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

    const handelBasicinfoMomPhone = (event) => {
        setBasicinfoMomPhone(event.target.value);
    };

    const handelBasicinfoDadName = (event) => {
        setBasicinfoDadName(event.target.value);
    };

    const handelBasicinfoDadPhone = (event) => {
        setBasicinfoDadPhone(event.target.value);
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


    const handelBasicinfoMobilePhon = (event) => {
        const {name, value} = event.target.value;
        if(name == "countryCode"){
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex != undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoMobilePhone(prevState => ({...prevState, dailCode: dailCode}));
        }
        
        setBasicinfoMobilePhone(prevState => ({...prevState, [name]: value}));
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
            formErrorsCopy.fName = "Please fillup the first name";
        }

        if (!basicinfoLname) {
            isError = true;
            formErrorsCopy.lName = "Please fillup the last name";
        }

        if (!basicinfoDob) {
            isError = true;
            formErrorsCopy.dob = "Please fillup the date of birth";
        }
        
        if (!basicinfoEmail) {
            isError = true;
            formErrorsCopy.email = "Please fillup your email";
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(basicinfoEmail)){
                return true;
            } else {
                isError = true;
                formErrorsCopy.email = "Please enter a valid email address";
            }
        }

        if (!basicinfoPhone) {
            isError = true;
            formErrorsCopy.phone = "Please fillup your phone number";
        }

        if (!basicinfoMobile) {
            isError = true;
            formErrorsCopy.mobile = "Please fillup your mobile number";
        }

        if (!basicinfoCompany) {
            isError = true;
            formErrorsCopy.company = "Please fillup the company name";
        }

        if (!basicinfoJobRole) {
            isError = true;
            formErrorsCopy.jobRole = "Please fillup your job role";
        }

        if (!basicinfoMomName) {
            isError = true;
            formErrorsCopy.momName = "Please fillup mother's name";
        }

        if (!basicinfoMomPhone) {
            isError = true;
            formErrorsCopy.momPhone = "Please fillup mother's phone number";
        }

        if (!basicinfoDadName) {
            isError = true;
            formErrorsCopy.dadName = "Please fillup father's name";
        }

        if (!basicinfoDadPnone) {
            isError = true;
            formErrorsCopy.dadPhone = "Please fillup father's phone number";
        }

        if (!basicinfoAddress1) {
            isError = true;
            formErrorsCopy.address1 = "Please fillup the address1";
        }

        if (!basicinfoAddress2) {
            isError = true;
            formErrorsCopy.address2 = "Please fillup the address2";
        }

        if (!basicinfoCity) {
            isError = true;
            formErrorsCopy.city = "Please fillup the city";
        }

        if (!basicinfoState) {
            isError = true;
            formErrorsCopy.state = "Please fillup the state";
        }

        if (!basicinfoZip) {
            isError = true;
            formErrorsCopy.zip = "Please fillup the zip code";
        }

        if (!basicinfoCountry) {
            isError = true;
            formErrorsCopy.country = "Please fillup the country";
        }

        if (isError) {
            /**
             * Set form errors
             */
            setFormErrorMsg({
                fName: formErrorMsg.fName,
                lName: formErrorMsg.lName,
                dob: formErrorMsg.dob,
                email: formErrorMsg.email,
                phone: formErrorMsg.phone,
                mobile: formErrorMsg.mobile,
                company: formErrorMsg.company,
                jobRole: formErrorMsg.jobRole,
                momName: formErrorMsg.momName,
                momPhone: formErrorMsg.momPhone,
                dadName: formErrorMsg.dadName,
                dadPhone: formErrorMsg.dadPhone,
                address1: formErrorMsg.address1,
                address2: formErrorMsg.address2,
                city: formErrorMsg.city,
                state: formErrorMsg.state,
                zip: formErrorMsg.zip,
                country: formErrorMsg.country
            });
            console.log(formErrorMsg, "formErrorMsg*******************");
            setTimeout(
                () => setFormErrorMsg({
                    ...formErrorMsg,
                    fName: "",
                    lName: "",
                    dob: "",
                    email: "",
                    phone: "",
                    mobile: "",
                    company: "",
                    jobRole: "",
                    momName: "",
                    momPhone: "",
                    dadName: "",
                    dadPhone: "",
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: ""
                }),
                5000
            );
        }
    }


    return(
        <div className={formScrollStatus ? "contactModalTab expanded" : "contactModalTab"} onScroll={formScroll}>
            {isLoader ? <Loader /> : ''}
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
            <form onSubmit={onContactSubmit}>
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
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" value={basicinfoPhone} onChange={handelBasicinfoPhone} />
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
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" value={basicinfoMobile} onChange={handelBasicinfoMobile} />
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
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" defaultValue={basicinfoMomPhone} onChange={handelBasicinfoMomPhone} />
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
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" defaultValue={basicinfoDadPnone} onChange={handelBasicinfoDadPhone} />
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
                            <button className="saveNnewBtn saveOverview" type="submit">Save and Update <img src={arrow_forward} alt="" /></button>
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