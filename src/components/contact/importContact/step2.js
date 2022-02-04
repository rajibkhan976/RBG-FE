import React, {useEffect, useState} from "react";
import user_done_icon from "../../../assets/images/user_done_icon.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import {ImportContactServices} from "../../../services/contact/importContact";
import Loader from "../../shared/Loader";

function Step2(props) {
    const [totalRecord, setTotalRecord] = useState(0);
    const [excelHeaders, setExcelHeaders] = useState([]);
    const [openBasicInfo, setOpenBasicInfo] = useState(true);
    const [openWorkInfo, setOpenWorkInfo] = useState(false);
    const [openPersonalInfo, setOpenPersonalInfo] = useState(false);
    const [openOtherInfo, setOpenOtherInfo] = useState(false);
    const [openCustomFields, setOpenCustomFields] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openCourse, setOpenCourse] = useState(false);
    const [openAddressInfo, setOpenAddressInfo] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false);
    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [jobRoleError, setJobRoleError] = useState(false);
    const [contactType, setContactType] = useState('');
    const [contactTypeError, setContactTypeError] = useState(false);
    const [ageGroup, setAgeGroup] = useState('');
    const [ageGroupError, setAgeGroupError] = useState(false);
    const [source, setSource] = useState('');
    const [sourceError, setSourceError] = useState(false);
    const [sourceDetails, setSourceDetails] = useState('');
    const [sourceDetailsError, setSourceDetailsError] = useState(false);
    const [onTrial, setOnTrial] = useState('');
    const [onTrialError, setOnTrialError] = useState(false);
    const [address1, setAddress1] = useState('');
    const [address1Error, setAddress1Error] = useState(false);
    const [address2, setAddress2] = useState('');
    const [address2Error, setAddress2Error] = useState(false);
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);
    const [state, setState] = useState('');
    const [stateError, setStateError] = useState(false);
    const [zip, setZip] = useState('');
    const [zipError, setZipError] = useState(false);
    const [country, setCountry] = useState('');
    const [countryError, setCountryError] = useState(false);
    const [mothersName, setMothersName] = useState('');
    const [mothersNameError, setMothersNameError] = useState(false);
    const [momCellPhone, setMomCellPhone] = useState('');
    const [momCellPhoneError, setMomCellPhoneError] = useState(false);
    const [fathersName, setFathersName] = useState('');
    const [fathersNameError, setFathersNameError] = useState(false);
    const [dadCellPhone, setDadCellPhone] = useState('');
    const [dadCellPhoneError, setDadCellPhoneError] = useState(false);
    const [gender, setGender] = useState('');
    const [genderError, setGenderError] = useState(false);
    const [error, setError] = useState(0);
    const [primaryError, setPrimaryError] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [uploadedKey, setUploadedKey] = useState({});
    const [isLoader, setIsLoader] = useState(false);
    const [importType, setImportType] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberError, setCardNumberError] = useState(false);
    const [cardExpire, setCardExpire] = useState('');
    const [cardExpireError, setCardExpireError] = useState(false);
    const [cardName, setCardName] = useState('');
    const [cardNameError, setCardNameError] = useState(false);
    const [bankName, setBankName] = useState('');
    const [bankNameError, setBankNameError] = useState(false);
    const [bankRouting, setBankRouting] = useState('');
    const [bankRoutingError, setBankRoutingError] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberError, setAccountNumberError] = useState(false);
    const [accountType, setAccountType] = useState('');
    const [accountTypeError, setAccountTypeError] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentMethodError, setPaymentMethodError] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [courseNameError, setCourseNameError] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [startDateError, setStartDateError] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [endDateError, setEndDateError] = useState(false);
    const [contractAmount, setContractAmount] = useState('');
    const [contractAmountError, setContractAmountError] = useState(false);
    const [downPayment, setDownPayment] = useState('');
    const [downPaymentError, setDownPaymentError] = useState(false);
    const [firstPaymentDue, setFirstPaymentDue] = useState('');
    const [firstPaymentDueError, setFirstPaymentDueError] = useState(false);
    const [lastPaymentDate, setLastPaymentDate] = useState('');
    const [lastPaymentDateError, setLastPaymentDateError] = useState(false);
    const [nextPaymentDue, setNextPaymentDue] = useState('');
    const [nextPaymentDueError, setNextPaymentDueError] = useState(false);
    const [paymentFrequency, setPaymentFrequency] = useState('');
    const [paymentFrequencyError, setPaymentFrequencyError] = useState(false);
    const [tuitionAmount, setTuitionAmount] = useState('');
    const [tuitionAmountError, setTuitionAmountError] = useState(false);
    const [customFields, setCustomFields] = useState([]);
    const fetchCustomFields = async () => {
        //Custom
    }

    const handleSetp2Submit = async () => {
        const custom = props.getState('custom');
        setPrimaryError(false);
        if (custom.primaryField === 'email') {
            if (email === "" || firstName === "" || lastName === "") {
                setPrimaryError(true);
                if (email === "") {
                    setEmailError(true);
                }
                if (firstName === "") {
                    setFirstNameError(true);
                }
                if (lastName === "") {
                    setLastNameError(true)
                }
                return false;
            }
        } else {
            if (phone === '' || firstName === "" || lastName === "") {
                setPrimaryError(true);
                if (phone === "") {
                    setPhoneError(true);
                }
                if (firstName === "") {
                    setFirstNameError(true);
                }
                if (lastName === "") {
                    setLastNameError(true)
                }
                return false;
            }
        }
        if (clickCount === 0) {
            let key = {};
            let errorHere = 0;
            if (firstName === "") {
                setFirstNameError(true);
                errorHere++;
            } else {
                key['firstName'] = firstName;
            }
            if (lastName === "") {
                setLastNameError(true);
                errorHere++;
            } else {
                key['lastName'] = lastName;
            }
            if (dob === "") {
                setDobError(true);
                errorHere++;
            } else {
                key['dob'] = dob;
            }
            if (email === "") {
                setEmailError(true);
                errorHere++;
            } else {
                key['email'] = email;
            }
            if (mobile === "") {
                setMobileError(true);
                errorHere++;
            } else {
                key['mobile'] = mobile;
            }
            if (phone === "") {
                setPhoneError(true);
                errorHere++;
            } else {
                key['phone'] = phone;
            }
            if (company === "") {
                setCompanyError(true);
                errorHere++;
            } else {
                key['company'] = company;
            }
            if (jobRole === "") {
                setJobRoleError(true);
                errorHere++;
            } else {
                key['jobRole'] = jobRole;
            }
            if (contactType === "") {
                setContactTypeError(true);
                errorHere++;
            } else {
                key['contactType'] = contactType;
            }
            if (ageGroup === "") {
                setAgeGroupError(true);
                errorHere++;
            } else {
                key['ageGroup'] = ageGroup;
            }
            if (source === "") {
                setSourceError(true);
                errorHere++;
            } else {
                key['source'] = source;
            }
            if (sourceDetails === "") {
                setSourceDetailsError(true);
                errorHere++;
            } else {
                key['sourceDetails'] = sourceDetails;
            }
            if (onTrial === "") {
                setOnTrialError(true);
                errorHere++;
            } else {
                key['onTrial'] = onTrial;
            }
            if (address1 === "") {
                setAddress1Error(true);
                errorHere++;
            } else {
                key['address1'] = address1;
            }
            if (address2 === "") {
                setAddress2Error(true);
                errorHere++;
            } else {
                key['address2'] = address2;
            }
            if (city === "") {
                setCityError(true);
                errorHere++;
            } else {
                key['city'] = city;
            }
            if (state === "") {
                setStateError(true);
                errorHere++;
            } else {
                key['state'] = state;
            }
            if (zip === "") {
                setZipError(true);
                errorHere++;
            } else {
                key['zip'] = zip;
            }
            if (country === "") {
                setCountryError(true);
                errorHere++;
            } else {
                key['country'] = country;
            }
            if (mothersName === "") {
                setMothersNameError(true);
                errorHere++;
            } else {
                key['mothersName'] = mothersName;
            }
            if (fathersName === "") {
                setFathersNameError(true);
                errorHere++;
            } else {
                key['fathersName'] = fathersName;
            }
            if (momCellPhone === "") {
                setMomCellPhoneError(true);
                errorHere++;
            } else {
                key['momCellPhone'] = momCellPhone;
            }
            if (dadCellPhone === "") {
                setDadCellPhoneError(true);
                errorHere++;
            } else {
                key['dadCellPhone'] = dadCellPhone;
            }
            if (gender === "") {
                setGenderError(true);
                errorHere++;
            } else {
                key['gender'] = gender;
            }
            if (cardNumber === "") {
                setCardNumberError(true);
                errorHere++;
            } else {
                key['cardNumber'] = cardNumber;
            }
            if (cardExpire === "") {
                setCardExpireError(true);
                errorHere++;
            } else {
                key['cardExpire'] = cardExpire;
            }
            if (cardName === "") {
                setCardNameError(true);
                errorHere++;
            } else {
                key['cardName'] = cardName;
            }
            if (bankName === "") {
                setBankNameError(true);
                errorHere++;
            } else {
                key['bankName'] = bankName;
            }
            if (bankRouting === "") {
                setBankRoutingError(true);
                errorHere++;
            } else {
                key['bankRouting'] = bankRouting;
            }
            if (accountNumber === "") {
                setAccountNumberError(true);
                errorHere++;
            } else {
                key['accountNumber'] = accountNumber;
            }
            if (accountType === "") {
                setAccountTypeError(true);
                errorHere++;
            } else {
                key['accountType'] = accountType;
            }
            if (paymentMethod === "") {
                setPaymentMethodError(true);
                errorHere++;
            } else {
                key['paymentMethod'] = paymentMethod;
            }
            if (courseName === "") {
                setCourseNameError(true);
                errorHere++;
            } else {
                key['courseName'] = courseName;
            }
            if (startDate === "") {
                setStartDateError(true);
                errorHere++;
            } else {
                key['startDate'] = startDate;
            }
            if (endDate === "") {
                setEndDateError(true);
                errorHere++;
            } else {
                key['endDate'] = endDate;
            }
            if (contractAmount === "") {
                setContractAmountError(true);
                errorHere++;
            } else {
                key['contractAmount'] = contractAmount;
            }
            if (downPayment === "") {
                setDownPaymentError(true);
                errorHere++;
            } else {
                key['downPayment'] = downPayment;
            }
            if (firstPaymentDue === "") {
                setFirstPaymentDueError(true);
                errorHere++;
            } else {
                key['firstPaymentDue'] = firstPaymentDue;
            }
            if (lastPaymentDate === "") {
                setLastPaymentDateError(true);
                errorHere++;
            } else {
                key['lastPaymentDate'] = lastPaymentDate;
            }
            if (nextPaymentDue === "") {
                setNextPaymentDueError(true);
                errorHere++;
            } else {
                key['nextPaymentDue'] = nextPaymentDue;
            }
            if (paymentFrequency === "") {
                setPaymentFrequencyError(true);
                errorHere++;
            } else {
                key['paymentFrequency'] = paymentFrequency;
            }
            if (tuitionAmount === "") {
                setTuitionAmountError(true);
                errorHere++;
            } else {
                key['tuitionAmount'] = tuitionAmount;
            }
            setUploadedKey(key);
            setError(errorHere);
            if (errorHere === 0) {
                let payload = {
                    file: custom.file,
                    duplicate: custom.duplicate,
                    primaryField: custom.primaryField,
                    key: uploadedKey
                }
                setIsLoader(true);
                let importResponse = await ImportContactServices.importContact(JSON.stringify(payload));
                setIsLoader(false);
                if (importResponse.data.success) {
                    let errors = importResponse.data.errorCount;
                    let newData = importResponse.data.newDataLength;
                    let duplicateCount = importResponse.data.duplicateCount;
                    let object = {
                        duplicateCount: duplicateCount,
                        newData: newData,
                        totalRecords: totalRecord,
                        errors: errors
                    }
                    props.setState('custom', object);
                    props.next();
                } else {
                    console.log("api error ! " + importResponse.data.message);
                }
            } else {
                setOpenBasicInfo(true);
                setOpenWorkInfo(true);
                setOpenPersonalInfo(true);
                setOpenAddressInfo(true);
                setOpenOtherInfo(true);
                setOpenCustomFields(true);
                setOpenCourse(true);
                setOpenPayment(true);
            }
        } else {
            if (!primaryError) {
                let payload = {
                    file: custom.file,
                    duplicate: custom.duplicate,
                    primaryField: custom.primaryField,
                    key: uploadedKey
                }
                setIsLoader(true);
                let importResponse = await ImportContactServices.importContact(JSON.stringify(payload));
                setIsLoader(false);
                if (importResponse.data.success) {
                    let errors = importResponse.data.errorCount;
                    let newData = importResponse.data.newDataLength;
                    let duplicateCount = importResponse.data.duplicateCount;
                    let object = {
                        duplicateCount: duplicateCount,
                        newData: newData,
                        totalRecords: totalRecord,
                        errors: errors,
                        duplicate: custom.duplicate
                    }
                    props.setState('custom', object);
                    props.next();
                } else {
                    console.log("api error ! " + importResponse.data.message);
                }
            }
        }
        setClickCount(clickCount + 1);
    }
    const toggleBasicInfo = () => {
        setOpenBasicInfo(!openBasicInfo);
    }
    const toggleWorkInfo = () => {
        setOpenWorkInfo(!openWorkInfo);
    }
    const togglePersonalInfo = () => {
        setOpenPersonalInfo(!openPersonalInfo);
    }
    const toggleAddressInfo = () => {
        setOpenAddressInfo(!openAddressInfo);
    }
    const toggleOtherInfo = () => {
        setOpenOtherInfo(!openOtherInfo);
    }
    const toggleCustomField = () => {
        setOpenCustomFields(!openCustomFields);
    }
    const togglePayment = () => {
        setOpenPayment(!openPayment);
    }
    const toggleCourse = () => {
        setOpenCourse(!openCourse);
    }
    const handlerFirstNameChange = (event) => {
        setFirstName(event.target.value);
        setFirstNameError(false);
    }
    const handlerLastNameChange = (event) => {
        setLastName(event.target.value);
        setLastNameError(false);
    }
    const handlerDOBChange = (event) => {
        setDob(event.target.value);
        setDobError(false);
    }
    const handlerEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailError(false);
    }
    const handlerPhoneChange = (event) => {
        setPhone(event.target.value);
        setPhoneError(false);
    }
    const handlerMobileChange = (event) => {
        setMobile(event.target.value);
        setMobileError(false);
    }
    const handlerCompanyChange = (event) => {
        setCompany(event.target.value);
        setCompanyError(false);
    }
    const handlerJobRoleChange = (event) => {
        setJobRole(event.target.value);
        setJobRoleError(false);
    }
    const handlerContactTypeChange = (event) => {
        setContactType(event.target.value);
        setContactTypeError(false);
    }
    const handlerAgeGroupChange = (event) => {
        setAgeGroup(event.target.value);
        setAgeGroupError(false);
    }
    const handlerSourceChange = (event) => {
        setSource(event.target.value);
        setSourceError(false);
    }
    const handlerSourceDetailsChange = (event) => {
        setSourceDetails(event.target.value);
        setSourceDetailsError(false);
    }
    const handlerOnTrialChange = (event) => {
        setOnTrial(event.target.value);
        setOnTrialError(false);
    }
    const handlerAddressOneChange = (event) => {
        setAddress1(event.target.value);
        setAddress1Error(false);
    }
    const handlerAddressTwoChange = (event) => {
        setAddress2(event.target.value);
        setAddress2Error(false);
    }
    const handlerCityChange = (event) => {
        setCity(event.target.value);
        setCityError(false);
    }
    const handlerStateChange = (event) => {
        setState(event.target.value);
        setStateError(false);
    }
    const handlerZipChange = (event) => {
        setZip(event.target.value);
        setZipError(false);
    }
    const handlerCountryChange = (event) => {
        setCountry(event.target.value);
        setCountryError(false);
    }
    const handlerMothersNameChange = (event) => {
        setMothersName(event.target.value);
        setMothersNameError(false);
    }
    const handlerMomCellChange = (event) => {
        setMomCellPhone(event.target.value);
        setMomCellPhoneError(false);
    }
    const handlerFathersNameChange = (event) => {
        setFathersName(event.target.value);
        setFathersNameError(false);
    }
    const handlerDadCellChange = (event) => {
        setDadCellPhone(event.target.value);
        setDadCellPhoneError(false);
    }
    const handlerGenderChange = (event) => {
        setGender(event.target.value);
        setGenderError(false);
    }
    const handlerCardNumberChange = (event) => {
        setCardNumber(event.target.value);
        setCardNumberError(false);
    }
    const handlerCardExpireChange = (event) => {
        setCardExpire(event.target.value);
        setCardExpireError(false);
    }
    const handlerCardNameChange = (event) => {
        setCardName(event.target.value);
        setCardNameError(false);
    }
    const handlerBankNameChange = (event) => {
        setBankName(event.target.value);
        setBankNameError(false);
    }
    const handlerBankRoutingChange = (event) => {
        setBankRouting(event.target.value);
        setBankRoutingError(false);
    }
    const handlerAccountNumberChange = (event) => {
        setAccountNumber(event.target.value);
        setAccountNumberError(false);
    }
    const handlerAccountTypeChange = (event) => {
        setAccountType(event.target.value);
        setAccountTypeError(false);
    }
    const handlerPaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
        setPaymentMethodError(false);
    }
    const handlerCourseNameChange = (event) => {
        setCourseName(event.target.value);
        setCourseNameError(false);
    }
    const handlerStartDateChange = (event) => {
        setStartDate(event.target.value);
        setStartDateError(false);
    }
    const handlerEndDateChange = (event) => {
        setEndDate(event.target.value);
        setEndDateError(false);
    }
    const handlerContractAmountChange = (event) => {
        setContractAmount(event.target.value);
        setContractAmountError(false);
    }
    const handlerDownPaymentChange = (event) => {
        setDownPayment(event.target.value);
        setDownPaymentError(false);
    }
    const handlerFirstPaymentDueChange = (event) => {
        setFirstPaymentDue(event.target.value);
        setFirstPaymentDueError(false);
    }
    const handlerNextPaymentDueChange = (event) => {
        setNextPaymentDue(event.target.value);
        setNextPaymentDueError(false);
    }
    const handlerLastPaymentDateChange = (event) => {
        setLastPaymentDate(event.target.value);
        setLastPaymentDateError(false);
    }
    const handlerPaymentFrequencyChange = (event) => {
        setPaymentFrequency(event.target.value);
        setPaymentFrequencyError(false);
    }
    const handlerTuitionAmountChange = (event) => {
        setTuitionAmount(event.target.value);
        setTuitionAmountError(false);
    }
    useEffect(() => {
        const custom = props.getState('custom');
        setExcelHeaders(custom.headers);
        setTotalRecord(custom.totalRecords);
        setImportType(custom.importType);
    }, []);
    return (
        <>
            {isLoader ? <Loader /> : ""}
            <div className="importModalBody">
                <div className="importStapeList">
                    <ul>
                        <li className="importStape active" data-step="1">Upload File<span>&gt;</span></li>
                        <li className="importStape active" data-step="2">Mapping Details<span>&gt;</span></li>
                        <li className={"importStape " + (!primaryError && clickCount > 0 ? 'active' : '')} data-step="2">Confirm Mapping<span>&gt;</span></li>
                        <li className="importStape" data-step="3">Import Summary</li>
                    </ul>
                </div>
                <div id="step_2">
                    {(!primaryError && clickCount > 0) ? "" :
                        <div className="totalReconds">
                            <img src={user_done_icon} alt="" />
                            <p><span>{ totalRecord }</span> Records found</p>
                        </div>
                    }
                    { error > 0 && <div className="formMsg error">Following fields are not mapped.</div>}
                    { primaryError && <div className="formMsg error">Primary Field is not Selected.</div>}
                    <div className="formAccordion">
                        <div className={"accoRow " + (!openBasicInfo ? 'collapse' : '')}>
                            <div className="accoRowHead">
                                <span className="accoHeadName">Basic Info</span>
                                <button className="accoToggler" onClick={toggleBasicInfo}></button>
                            </div>
                            { openBasicInfo &&
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className={"formField w-50 " + (firstNameError ? 'error' : '') }>
                                                    <label>First name</label>
                                                    <div className="inFormField">
                                                        <select name="firstName" value={firstName} onChange={handlerFirstNameChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (lastNameError ? 'error' : '') }>
                                                    <label>Last Name</label>
                                                    <div className="inFormField">
                                                        <select name="lastName" value={lastName} onChange={handlerLastNameChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (dobError ? 'error' : '') }>
                                                    <label>Date of Birth</label>
                                                    <div className="inFormField">
                                                        <select name="dob" value={dob} onChange={handlerDOBChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (emailError ? 'error' : '') }>
                                                    <label>Email</label>
                                                    <div className="inFormField">
                                                        <select name="email" value={email} onChange={handlerEmailChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (phoneError ? 'error' : '') }>
                                                    <label>Phone</label>
                                                    <div className="inFormField">
                                                        <select name="phone" value={phone} onChange={handlerPhoneChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (mobileError ? 'error' : '') }>
                                                    <label>Mobile</label>
                                                    <div className="inFormField">
                                                        <select name="mobile" value={mobile} onChange={handlerMobileChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={"accoRow " + (!openWorkInfo ? 'collapse' : '')}>
                            <div className="accoRowHead">
                                <span className="accoHeadName">Work</span>
                                <button className="accoToggler" onClick={toggleWorkInfo}></button>
                            </div>
                            {openWorkInfo &&
                                <div className="accoRowBody">
                                <div className="infoInputs">
                                    <ul>
                                        <li>
                                            <div className={"formField w-50 " + (companyError ? 'error' : '') }>
                                                <label>Company</label>
                                                <div className="inFormField">
                                                    <select name="company" value={company} onChange={handlerCompanyChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                        <option value="">Select a header</option>
                                                        {excelHeaders.map(header =>
                                                            <option value={header}>{header}</option>
                                                        )};
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={"formField w-50 " + (jobRoleError ? 'error' : '') }>
                                                <label>Job Role</label>
                                                <div className="inFormField">
                                                    <select name="jobRole" value={jobRole} onChange={handlerJobRoleChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                        <option value="">Select a header</option>
                                                        {excelHeaders.map(header =>
                                                            <option value={header}>{header}</option>
                                                        )};
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            }
                        </div>
                        <div className={"accoRow " + (!openPersonalInfo ? 'collapse' : '')}>
                            <div className="accoRowHead">
                                <span className="accoHeadName">Personal</span>
                                <button className="accoToggler" onClick={togglePersonalInfo}></button>
                            </div>
                            {openPersonalInfo &&
                                <div className="accoRowBody">
                                <div className="infoInputs">
                                    <ul>
                                        <li>
                                            <div className={"formField w-50 " + (mothersNameError ? 'error' : '') }>
                                                <label>Mother's Name</label>
                                                <div className="inFormField">
                                                    <select name="mothersName" value={mothersName} onChange={handlerMothersNameChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                        <option value="">Select a header</option>
                                                        {excelHeaders.map(header =>
                                                            <option value={header}>{header}</option>
                                                        )};
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={"formField w-50 " + (momCellPhoneError ? 'error' : '') }>
                                                <label>Mother's Phone Number</label>
                                                <div className="inFormField">
                                                    <select name="momCellPhone" value={momCellPhone} onChange={handlerMomCellChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                        <option value="">Select a header</option>
                                                        {excelHeaders.map(header =>
                                                            <option value={header}>{header}</option>
                                                        )};
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={"formField w-50 " + (fathersNameError ? 'error' : '') }>
                                                <label>Father's Name</label>
                                                <div className="inFormField">
                                                    <select name="fathersName" value={fathersName} onChange={handlerFathersNameChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                        <option value="">Select a header</option>
                                                        {excelHeaders.map(header =>
                                                            <option value={header}>{header}</option>
                                                        )};
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={"formField w-50 " + (dadCellPhoneError ? 'error' : '') }>
                                                <label>Father's Phone Number</label>
                                                <div className="inFormField">
                                                    <select name="dadCellPhone" value={dadCellPhone} onChange={handlerDadCellChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                        <option value="">Select a header</option>
                                                        {excelHeaders.map(header =>
                                                            <option value={header}>{header}</option>
                                                        )};
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className={"formField w-50 " + (genderError ? 'error' : '') }>
                                                <label>Gender</label>
                                                <div className="inFormField">
                                                    <select name="gender" value={gender} onChange={handlerGenderChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                        <option value="">Select a header</option>
                                                        {excelHeaders.map(header =>
                                                            <option value={header}>{header}</option>
                                                        )};
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            }
                        </div>
                        <div className={"accoRow " + (!openAddressInfo ? 'collapse' : '')}>
                            <div className="accoRowHead">
                                <span className="accoHeadName">Address</span>
                                <button className="accoToggler" onClick={toggleAddressInfo}></button>
                            </div>
                            {
                                openAddressInfo &&
                                    <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className={"formField w-50 " + (address1Error ? 'error' : '') }>
                                                    <label>Address 1</label>
                                                    <div className="inFormField">
                                                        <select name="address1" value={address1} onChange={handlerAddressOneChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (address2Error ? 'error' : '') }>
                                                    <label>Address 2</label>
                                                    <div className="inFormField">
                                                        <select name="address2" value={address2} onChange={handlerAddressTwoChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (cityError ? 'error' : '') }>
                                                    <label>City</label>
                                                    <div className="inFormField">
                                                        <select name="city" value={city} onChange={handlerCityChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (stateError ? 'error' : '') }>
                                                    <label>State</label>
                                                    <div className="inFormField">
                                                        <select name="state" value={state} onChange={handlerStateChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (zipError ? 'error' : '') }>
                                                    <label>Zip</label>
                                                    <div className="inFormField">
                                                        <select name="zip" value={zip} onChange={handlerZipChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (countryError ? 'error' : '') }>
                                                    <label>Country</label>
                                                    <div className="inFormField">
                                                        <select name="country" value={country} onChange={handlerCountryChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={"accoRow " + (!openOtherInfo ? 'collapse' : '')}>
                            <div className="accoRowHead">
                                <span className="accoHeadName">Other</span>
                                <button className="accoToggler" onClick={toggleOtherInfo}></button>
                            </div>
                            {
                                openOtherInfo &&
                                    <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className={"formField w-50 " + (contactTypeError ? 'error' : '') }>
                                                    <label>Contact Type</label>
                                                    <div className="inFormField">
                                                        <select name="contactType" value={contactType} onChange={handlerContactTypeChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (ageGroupError ? 'error' : '') }>
                                                    <label>Age Group</label>
                                                    <div className="inFormField">
                                                        <select name="ageGroup" value={ageGroup} onChange={handlerAgeGroupChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (sourceError ? 'error' : '') }>
                                                    <label>Source</label>
                                                    <div className="inFormField">
                                                        <select name="source" value={source} onChange={handlerSourceChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (sourceDetailsError ? 'error' : '') }>
                                                    <label>Source Details</label>
                                                    <div className="inFormField">
                                                        <select name="sourceDetails" value={sourceDetails} onChange={handlerSourceDetailsChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (onTrialError ? 'error' : '') }>
                                                    <label>On Trial</label>
                                                    <div className="inFormField">
                                                        <select name="onTrial" value={onTrial} onChange={handlerOnTrialChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={"accoRow " + (!openCustomFields ? 'collapse' : '')}>
                            <div className="accoRowHead">
                                <span className="accoHeadName">Custom Fields</span>
                                <button className="accoToggler" onClick={toggleCustomField}></button>
                            </div>
                            {
                                openCustomFields &&
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className={"formField w-50 " + (contactTypeError ? 'error' : '') }>
                                                    <label>Contact Type</label>
                                                    <div className="inFormField">
                                                        <select name="contactType" value={contactType} onChange={handlerContactTypeChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (ageGroupError ? 'error' : '') }>
                                                    <label>Age Group</label>
                                                    <div className="inFormField">
                                                        <select name="ageGroup" value={ageGroup} onChange={handlerAgeGroupChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select a header</option>
                                                            {excelHeaders.map(header =>
                                                                <option value={header}>{header}</option>
                                                            )};
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                        {
                            importType === 'contacts' &&
                                <>
                                    <div className={"accoRow " + (!openPayment ? 'collapse' : '')}>
                                        <div className="accoRowHead">
                                            <span className="accoHeadName">Payment</span>
                                            <button className="accoToggler" onClick={togglePayment}></button>
                                        </div>
                                        {
                                            openPayment &&
                                            <div className="accoRowBody">
                                                <div className="infoInputs">
                                                    <ul>
                                                        <li>
                                                            <div className={"formField w-50 " + (cardNumberError ? 'error' : '') }>
                                                                <label>Credit card number</label>
                                                                <div className="inFormField">
                                                                    <select name="cardNumber" value={cardNumber} onChange={handlerCardNumberChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (cardExpireError ? 'error' : '') }>
                                                                <label>Card Expire Date</label>
                                                                <div className="inFormField">
                                                                    <select name="cardExpire" value={cardExpire} onChange={handlerCardExpireChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (cardNameError ? 'error' : '') }>
                                                                <label>Name on Card</label>
                                                                <div className="inFormField">
                                                                    <select name="cardName" value={cardName} onChange={handlerCardNameChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (bankNameError ? 'error' : '') }>
                                                                <label>Bank name</label>
                                                                <div className="inFormField">
                                                                    <select name="bankName" value={bankName} onChange={handlerBankNameChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (bankRoutingError ? 'error' : '') }>
                                                                <label>Bank Routing</label>
                                                                <div className="inFormField">
                                                                    <select name="bankRouting" value={bankRouting} onChange={handlerBankRoutingChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (accountNumberError ? 'error' : '') }>
                                                                <label>Account Number</label>
                                                                <div className="inFormField">
                                                                    <select name="accountNumber" value={accountNumber} onChange={handlerAccountNumberChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (accountTypeError ? 'error' : '') }>
                                                                <label>Account Type</label>
                                                                <div className="inFormField">
                                                                    <select name="accountType" value={accountType} onChange={handlerAccountTypeChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (paymentMethodError ? 'error' : '') }>
                                                                <label>Payment Method</label>
                                                                <div className="inFormField">
                                                                    <select name="paymentMethod" value={paymentMethod} onChange={handlerPaymentMethodChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className={"accoRow " + (!openCourse ? 'collapse' : '')}>
                                        <div className="accoRowHead">
                                            <span className="accoHeadName">Course</span>
                                            <button className="accoToggler" onClick={toggleCourse}></button>
                                        </div>
                                        {
                                            openCourse &&
                                            <div className="accoRowBody">
                                                <div className="infoInputs">
                                                    <ul>
                                                        <li>
                                                            <div className={"formField w-50 " + (courseNameError ? 'error' : '') }>
                                                                <label>Course Name</label>
                                                                <div className="inFormField">
                                                                    <select name="courseName" value={courseName} onChange={handlerCourseNameChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (startDateError ? 'error' : '') }>
                                                                <label>Course Start Date</label>
                                                                <div className="inFormField">
                                                                    <select name="startDate" value={startDate} onChange={handlerStartDateChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (endDateError ? 'error' : '') }>
                                                                <label>Course End Date</label>
                                                                <div className="inFormField">
                                                                    <select name="endDate" value={endDate} onChange={handlerEndDateChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (contractAmountError ? 'error' : '') }>
                                                                <label>Total Contract Amount</label>
                                                                <div className="inFormField">
                                                                    <select name="contractAmount" value={contractAmount} onChange={handlerContractAmountChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (downPaymentError ? 'error' : '') }>
                                                                <label>Down Payment</label>
                                                                <div className="inFormField">
                                                                    <select name="downPayment" value={downPayment} onChange={handlerDownPaymentChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (firstPaymentDueError ? 'error' : '') }>
                                                                <label>First Payment Due Date</label>
                                                                <div className="inFormField">
                                                                    <select name="firstPaymentDue" value={firstPaymentDue} onChange={handlerFirstPaymentDueChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (nextPaymentDueError ? 'error' : '') }>
                                                                <label>Next Payment Due</label>
                                                                <div className="inFormField">
                                                                    <select name="nextPaymentDue" value={nextPaymentDue} onChange={handlerNextPaymentDueChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (lastPaymentDateError ? 'error' : '') }>
                                                                <label>Last Payment Date</label>
                                                                <div className="inFormField">
                                                                    <select name="lastPaymentDate" value={lastPaymentDate} onChange={handlerLastPaymentDateChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (paymentFrequencyError ? 'error' : '') }>
                                                                <label>Payment Frequency</label>
                                                                <div className="inFormField">
                                                                    <select name="paymentFrequency" value={paymentFrequency} onChange={handlerPaymentFrequencyChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (tuitionAmountError ? 'error' : '') }>
                                                                <label>Tuition Amount</label>
                                                                <div className="inFormField">
                                                                    <select name="tuitionAmount" value={tuitionAmount} onChange={handlerTuitionAmountChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                                        <option value="">Select a header</option>
                                                                        {excelHeaders.map(header =>
                                                                            <option value={header}>{header}</option>
                                                                        )};
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </>
                        }

                    </div>
                </div>
            </div>
            <div className="importModalFooter">
                <button className={"nextButton"} onClick={handleSetp2Submit}>
                    <span>Next <img src={arrow_forward} alt="" /></span>
                </button>
                <p className="stapeIndicator">Step: {props.current} of 3</p>
            </div>
        </>
    );
}

export default Step2;