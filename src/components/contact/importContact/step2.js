import React, {useEffect, useState} from "react";
import user_done_icon from "../../../assets/images/user_done_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import {ImportContactServices} from "../../../services/contact/importContact";
import Loader from "../../shared/Loader";
import plus_icon from "../../../assets/images/plus_icon.svg";
import CustomizationsAddField from "../../setup/customization/customizationsAddField";
import {ErrorAlert, SuccessAlert} from "../../shared/messages";
import Select from 'react-select'

function Step2(props) {
    const [totalRecord, setTotalRecord] = useState(0);
    const [openBasicInfo, setOpenBasicInfo] = useState(true);
    const [customFieldOpenModal, setCustomFieldOpenModal] = useState(false);
    const [openWorkInfo, setOpenWorkInfo] = useState(false);
    const [openPersonalInfo, setOpenPersonalInfo] = useState(false);
    const [openOtherInfo, setOpenOtherInfo] = useState(false);
    const [openCustomFields, setOpenCustomFields] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openCourse, setOpenCourse] = useState(false);
    const [openAddressInfo, setOpenAddressInfo] = useState(false);
    const [error, setError] = useState(0);
    const [primaryError, setPrimaryError] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [uploadedKey, setUploadedKey] = useState({});
    const [isLoader, setIsLoader] = useState(false);
    const [importType, setImportType] = useState(false);
    const [customFields, setCustomFields] = useState([]);
    const [editedEle, setEditedEle] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [customFieldsList, setCustomFieldsList] = useState({});
    const [customFieldsError, setCustomFieldsError] = useState({});
    const [options, setOptions] = useState([])
    const messageDelay = 5000;
    const [map, setMap] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phone: "",
        mobile: "",
        company: "",
        jobRole: "",
        contactType: "",
        ageGroup: "",
        source: "",
        sourceDetails: "",
        onTrial: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        mothersName: "",
        momCellPhone: "",
        fathersName: "",
        dadCellPhone: "",
        gender: "",
        cardNumber: "",
        cardExpire: "",
        cardName: "",
        bankName: "",
        bankRouting: "",
        accountNumber: "",
        accountType: "",
        paymentMethod: "",
        courseName: "",
        startDate: "",
        endDate: "",
        contractAmount: "",
        downPayment: "",
        firstPaymentDue: "",
        lastPaymentDate: "",
        nextPaymentDue: "",
        paymentFrequency: "",
        paymentRemaining: "",
        tuitionAmount: "",
    });
    const [mapError, setMapError] = useState({
        firstName: false,
        lastName: false,
        dob: false,
        email: false,
        phone: false,
        mobile: false,
        company: false,
        jobRole: false,
        contactType: false,
        ageGroup: false,
        source: false,
        sourceDetails: false,
        onTrial: false,
        address1: false,
        address2: false,
        city: false,
        state: false,
        zip: false,
        country: false,
        mothersName: false,
        momCellPhone: false,
        fathersName: false,
        dadCellPhone: false,
        gender: false,
        cardNumber: false,
        cardExpire: false,
        cardName: false,
        bankName: false,
        bankRouting: false,
        accountNumber: false,
        accountType: false,
        paymentMethod: false,
        courseName: false,
        startDate: false,
        endDate: false,
        contractAmount: false,
        downPayment: false,
        firstPaymentDue: false,
        lastPaymentDate: false,
        nextPaymentDue: false,
        paymentFrequency: false,
        paymentRemaining: false,
        tuitionAmount: false,
    })

    const handleChangeFields = (selectedOption, field) => {
        if (map[field]) {
            map[field]['isDisabled'] = true;
            let index = options.findIndex(el => el.value === map[field].value);
            if (index > -1) {
                options[index]['isDisabled'] = false;
                setOptions(options)
            }
        }
        if (selectedOption && selectedOption.value) {
            let index = options.findIndex(el => el.value === selectedOption.value);
            options[index]['isDisabled'] = true;
            setOptions(options);
            setMap(prevState => ({...prevState, [field]: selectedOption}));
        } else {
            setMap(prevState => ({...prevState, [field]: ""}));
        }
        setMapError(prevState => ({...prevState, [field]: false}));
    }

    const handlerCustomFieldChange = (selectedOption, field) => {
        if (customFieldsList[field]) {
            customFieldsList[field]['isDisabled'] = true;
            let index = options.findIndex(el => el.value === customFieldsList[field].value);
            if (index > -1) {
                options[index]['isDisabled'] = false;
                setOptions(options)
            }
        }
        if (selectedOption && selectedOption.value) {
            let index = options.findIndex(el => el.value === selectedOption.value);
            options[index]['isDisabled'] = true;
            setOptions(options);
            setCustomFieldsList(prevState => ({...prevState, [field]: selectedOption}));
        } else {
            setCustomFieldsList(prevState => ({...prevState, [field]: ""}));
        }
        setCustomFieldsError(prevState => ({...prevState, [field]: false}));
    }

    const fetchCustomFields = async () => {
        let cFileds = await ImportContactServices.fetchCustomFields();
        if (cFileds.customFields.length > 0) {
            let customObjects = {};
            let customErrorObjects = {};
            cFileds.customFields.map((custom) => {
                customObjects[custom.alias] = "";
                customErrorObjects[custom.alias] = false;
            })
            setCustomFieldsList(customObjects);
            setCustomFieldsError(customErrorObjects);
            setClickCount(0)
            const rows = cFileds.customFields.reduce(function (rows, key, index) {
                return (index % 2 == 0 ? rows.push([key])
                    : rows[rows.length-1].push(key)) && rows;
            }, []);
            setCustomFields(rows);
        } else {
            setCustomFields([]);
        }
    }
    const handleSetp2Submit = () => {
        const custom = props.getState('custom');
        setPrimaryError(false);
        if (custom.primaryField === 'email') {
            if (map.email === "" || map.firstName === "" || map.lastName === "") {
                setPrimaryError(true);
                if (map.email === "") {
                    setMapError(prevState => ({...prevState, email: true}));
                }
                if (map.firstName === "") {
                    setMapError(prevState => ({...prevState, firstName: true}));
                }
                if (map.lastName === "") {
                    setMapError(prevState => ({...prevState, lastName: true}));
                }
                return false;
            }
        } else if (custom.primaryField === 'phone') {
            if (map.phone === '' || map.firstName === "" || map.lastName === "") {
                setPrimaryError(true);
                if (map.phone === "") {
                    setMapError(prevState => ({...prevState, phone: true}));
                }
                if (map.firstName === "") {
                    setMapError(prevState => ({...prevState, firstName: true}));
                }
                if (map.lastName === "") {
                    setMapError(prevState => ({...prevState, lastName: true}));
                }
                return false;
            }
        } else {
            if (map.email === "" || map.phone === '' || map.firstName === "" || map.lastName === "") {
                setPrimaryError(true);
                if (map.email === "") {
                    setMapError(prevState => ({...prevState, email: true}));
                }
                if (map.phone === "") {
                    setMapError(prevState => ({...prevState, phone: true}));
                }
                if (map.firstName === "") {
                    setMapError(prevState => ({...prevState, firstName: true}));
                }
                if (map.lastName === "") {
                    setMapError(prevState => ({...prevState, lastName: true}));
                }
                return false;
            }
        }
        if (clickCount === 0) {
            let key = {};
            let errorHere = 0;
            Object.keys(map).forEach(value => {
                if (map[value] === "") {
                    setMapError(prevState => ({...prevState, [value]: true}));
                    errorHere++;
                } else {
                    key[value] = map[value].value;
                }

            });
            Object.keys(customFieldsList).map((value) => {
                if (customFieldsList[value] === "") {
                    setCustomFieldsError(prevState => ({...prevState, [value]: true}));
                    errorHere++;
                } else {
                    key[value] = customFieldsList[value].value;
                }
            });
            setUploadedKey(key);
            setError(errorHere);
            if (errorHere === 0) {
                let payload = {
                    file: custom.file,
                    duplicate: custom.duplicate,
                    primaryField: custom.primaryField,
                    key: uploadedKey,
                    importType: importType
                }
                callImportContactApi(payload);
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
                    key: uploadedKey,
                    importType: importType
                }
                callImportContactApi(payload);
            }
        }
        setClickCount(clickCount + 1);
    }
    const callImportContactApi = async (payload) => {
        let object = {
            status: false,
            message: "Something went wrong. Please try again after some time."
        }
        try {
            setIsLoader(true);
            let importResponse = await ImportContactServices.importContact(JSON.stringify(payload));
            if (importResponse.data.success) {
                object = {
                    status: true,
                    message: "File importing is in progress. We will be notifying you once import is getting completed. You can close this window."
                }
            } else {
                object = {
                    status: false,
                    message: importResponse.data.message
                }
            }
        } catch (e) {
            object = {
                status: false,
                message: e.message
            }
        } finally {
            setIsLoader(false);
            props.setState('custom', object);
            props.next();
        }

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
    const createCustomFields = () => {
        setCustomFieldOpenModal(true);
    }
    const closeCustomModal = (param) => {
        setCustomFieldOpenModal(false);
        if(param) {
            fetchCustomFields();
        }
    }
    const createSuccess = (msg) => {
        setSuccessMsg(msg);
    }

    const createError= (msg) => {
        setErrorMsg(msg);
    }
    useEffect(async () => {
        const custom = props.getState('custom');
        let headers = custom.headers;
        let options = [];
        await headers.forEach((value) => {
            options.push({
                value: value,
                label: value
            })
        });
        setOptions(options);
        setTotalRecord(custom.totalRecords);
        setImportType(custom.importType);
        fetchCustomFields();
    }, []);
    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg]);
    return (
        <>
            {isLoader ? <Loader /> : ""}
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            <div className="importModalBody">
                <div className="importStapeList">
                    <ul>
                        <li className="importStape active" data-step="1">Upload File<span>&gt;</span></li>
                        <li className="importStape active" data-step="2">Mapping Details<span>&gt;</span></li>
                        <li className={"importStape " + (!primaryError && clickCount > 0 ? 'active' : '')} data-step="2">Confirm Mapping<span>&gt;</span></li>
                        <li className="importStape" data-step="3">Summary</li>
                    </ul>
                </div>
                <div id="step_2">
                    {(!primaryError && clickCount > 0) ? "" :
                        <div className="totalReconds">
                            <img src={user_done_icon} alt="" />
                            <p><span>{ totalRecord }</span> Records found</p>
                        </div>
                    }
                    { error > 0 &&
                        <div className="formMsg error warning">Following fields are not mapped but still you can process.
                        </div>}
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
                                                <div className={"formField w-50 " + (mapError.firstName ? (primaryError ? 'error' : 'error warning') : '') }>
                                                    <label>First name</label>
                                                    <div className="inFormField">
                                                        <Select name="firstName" value={map.firstName} onChange={(e) =>handleChangeFields(e, 'firstName')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (mapError.lastName ? (primaryError ? 'error' : 'error warning') : '') }>
                                                    <label>Last Name</label>
                                                    <div className="inFormField">
                                                        <Select name="lastName" value={map.lastName} onChange={(e) =>handleChangeFields(e, 'lastName')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (mapError.dob ? 'error warning' : '') }>
                                                    <label>Date of Birth</label>
                                                    <div className="inFormField">
                                                        <Select name="dob" value={map.dob} onChange={(e) =>handleChangeFields(e, 'dob')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (mapError.email ? (primaryError ? 'error' : 'error warning') : '') }>
                                                    <label>Email</label>
                                                    <div className="inFormField">
                                                        <Select name="email" value={map.email} onChange={(e) =>handleChangeFields(e, 'email')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (mapError.phone ? (primaryError ? 'error' : 'error warning') : '') }>
                                                    <label>Phone</label>
                                                    <div className="inFormField">
                                                        <Select name="phone" value={map.phone} onChange={(e) =>handleChangeFields(e, 'phone')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (mapError.mobile ? 'error warning' : '') }>
                                                    <label>Mobile</label>
                                                    <div className="inFormField">
                                                        <Select name="mobile" value={map.mobile} onChange={(e) =>handleChangeFields(e, 'mobile')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
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
                                            <div className={"formField w-50 " + (mapError.company ? 'error warning' : '') }>
                                                <label>Company</label>
                                                <div className="inFormField">
                                                    <Select name="company" value={map.company} onChange={(e) =>handleChangeFields(e, 'company')}
                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                </div>
                                            </div>
                                            <div className={"formField w-50 " + (mapError.jobRole ? 'error warning' : '') }>
                                                <label>Job Role</label>
                                                <div className="inFormField">
                                                    <Select name="jobRole" value={map.jobRole} onChange={(e) =>handleChangeFields(e, 'jobRole')}
                                                            options={options}  isClearable={true} placeholder="Select a header"/>
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
                                                <div className={"formField w-50 " + (mapError.mothersName ? 'error warning' : '') }>
                                                    <label>Mother's Name</label>
                                                    <div className="inFormField">
                                                        <Select name="mothersName" value={map.mothersName} onChange={(e) =>handleChangeFields(e, 'mothersName')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (mapError.momCellPhone ? 'error warning' : '') }>
                                                    <label>Mother's Phone Number</label>
                                                    <div className="inFormField">
                                                        <Select name="momCellPhone" value={map.momCellPhone} onChange={(e) =>handleChangeFields(e, 'momCellPhone')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (mapError.fathersName ? 'error warning' : '') }>
                                                    <label>Father's Name</label>
                                                    <div className="inFormField">
                                                        <Select name="fathersName" value={map.fathersName} onChange={(e) =>handleChangeFields(e, 'fathersName')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                                <div className={"formField w-50 " + (mapError.dadCellPhone ? 'error warning' : '') }>
                                                    <label>Father's Phone Number</label>
                                                    <div className="inFormField">
                                                        <Select name="dadCellPhone" value={map.dadCellPhone} onChange={(e) =>handleChangeFields(e, 'dadCellPhone')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={"formField w-50 " + (mapError.gender ? 'error warning' : '') }>
                                                    <label>Gender</label>
                                                    <div className="inFormField">
                                                        <Select name="gender" value={map.gender} onChange={(e) =>handleChangeFields(e, 'gender')}
                                                                options={options}  isClearable={true} placeholder="Select a header"/>
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
                                                    <div className={"formField w-50 " + (mapError.address1 ? 'error warning' : '') }>
                                                        <label>Address 1</label>
                                                        <div className="inFormField">
                                                            <Select name="address1" value={map.address1} onChange={(e) =>handleChangeFields(e, 'address1')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                    <div className={"formField w-50 " + (mapError.address2 ? 'error warning' : '') }>
                                                        <label>Address 2</label>
                                                        <div className="inFormField">
                                                            <Select name="address2" value={map.address2} onChange={(e) =>handleChangeFields(e, 'address2')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={"formField w-50 " + (mapError.city ? 'error warning' : '') }>
                                                        <label>City</label>
                                                        <div className="inFormField">
                                                            <Select name="city" value={map.city} onChange={(e) =>handleChangeFields(e, 'city')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                    <div className={"formField w-50 " + (mapError.state ? 'error warning' : '') }>
                                                        <label>State</label>
                                                        <div className="inFormField">
                                                            <Select name="state" value={map.state} onChange={(e) =>handleChangeFields(e, 'state')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={"formField w-50 " + (mapError.zip ? 'error warning' : '') }>
                                                        <label>Zip</label>
                                                        <div className="inFormField">
                                                            <Select name="zip" value={map.zip} onChange={(e) =>handleChangeFields(e, 'zip')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                    <div className={"formField w-50 " + (mapError.country ? 'error warning' : '') }>
                                                        <label>Country</label>
                                                        <div className="inFormField">
                                                            <Select name="country" value={map.country} onChange={(e) =>handleChangeFields(e, 'country')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
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
                                                    <div className={"formField w-50 " + (mapError.contactType ? 'error warning' : '') }>
                                                        <label>Contact Type</label>
                                                        <div className="inFormField">
                                                            <Select name="contactType" value={map.contactType} onChange={(e) =>handleChangeFields(e, 'contactType')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                    <div className={"formField w-50 " + (mapError.ageGroup ? 'error warning' : '') }>
                                                        <label>Age Group</label>
                                                        <div className="inFormField">
                                                            <Select name="ageGroup" value={map.ageGroup} onChange={(e) =>handleChangeFields(e, 'ageGroup')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={"formField w-50 " + (mapError.source ? 'error warning' : '') }>
                                                        <label>Source</label>
                                                        <div className="inFormField">
                                                            <Select name="source" value={map.source} onChange={(e) =>handleChangeFields(e, 'source')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                    <div className={"formField w-50 " + (mapError.sourceDetails ? 'error warning' : '') }>
                                                        <label>Source Details</label>
                                                        <div className="inFormField">
                                                            <Select name="sourceDetails" value={map.sourceDetails} onChange={(e) =>handleChangeFields(e, 'sourceDetails')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={"formField w-50 " + (mapError.onTrial ? 'error warning' : '') }>
                                                        <label>On Trial</label>
                                                        <div className="inFormField">
                                                            <Select name="onTrial" value={map.onTrial} onChange={(e) =>handleChangeFields(e, 'onTrial')}
                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
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
                                                            <div className={"formField w-50 " + (mapError.cardNumber ? 'error warning' : '') }>
                                                                <label>Credit card number</label>
                                                                <div className="inFormField">
                                                                    <Select name="cardNumber" value={map.cardNumber} onChange={(e) =>handleChangeFields(e, 'cardNumber')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.cardExpire ? 'error warning' : '') }>
                                                                <label>Card Expire Date</label>
                                                                <div className="inFormField">
                                                                    <Select name="cardExpire" value={map.cardExpire} onChange={(e) =>handleChangeFields(e, 'cardExpire')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.cardName ? 'error warning' : '') }>
                                                                <label>Name on Card</label>
                                                                <div className="inFormField">
                                                                    <Select name="cardName" value={map.cardName} onChange={(e) =>handleChangeFields(e, 'cardName')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.bankName ? 'error warning' : '') }>
                                                                <label>Bank name</label>
                                                                <div className="inFormField">
                                                                    <Select name="bankName" value={map.bankName} onChange={(e) =>handleChangeFields(e, 'bankName')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.bankRouting ? 'error warning' : '') }>
                                                                <label>Bank Routing</label>
                                                                <div className="inFormField">
                                                                    <Select name="bankRouting" value={map.bankRouting} onChange={(e) =>handleChangeFields(e, 'bankRouting')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.accountNumber ? 'error warning' : '') }>
                                                                <label>Bank Account Number</label>
                                                                <div className="inFormField">
                                                                    <Select name="accountNumber" value={map.accountNumber} onChange={(e) =>handleChangeFields(e, 'accountNumber')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.accountType ? 'error warning' : '') }>
                                                                <label>Bank Account Type</label>
                                                                <div className="inFormField">
                                                                    <Select name="accountType" value={map.accountType} onChange={(e) =>handleChangeFields(e, 'accountType')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
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
                                            <span className="accoHeadName">Program</span>
                                            <button className="accoToggler" onClick={toggleCourse}></button>
                                        </div>
                                        {
                                            openCourse &&
                                            <div className="accoRowBody">
                                                <div className="infoInputs">
                                                    <ul>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.courseName ? 'error warning' : '') }>
                                                                <label>Program Name</label>
                                                                <div className="inFormField">
                                                                    <Select name="courseName" value={map.courseName} onChange={(e) =>handleChangeFields(e, 'courseName')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.startDate ? 'error warning' : '') }>
                                                                <label>Program Start Date</label>
                                                                <div className="inFormField">
                                                                    <Select name="startDate" value={map.startDate} onChange={(e) =>handleChangeFields(e, 'startDate')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.endDate ? 'error warning' : '') }>
                                                                <label>Program End Date</label>
                                                                <div className="inFormField">
                                                                    <Select name="endDate" value={map.endDate} onChange={(e) =>handleChangeFields(e, 'endDate')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.contractAmount ? 'error warning' : '') }>
                                                                <label>Total Contract Amount</label>
                                                                <div className="inFormField">
                                                                    <Select name="contractAmount" value={map.contractAmount} onChange={(e) =>handleChangeFields(e, 'contractAmount')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.downPayment ? 'error warning' : '') }>
                                                                <label>Down Payment</label>
                                                                <div className="inFormField">
                                                                    <Select name="downPayment" value={map.downPayment} onChange={(e) =>handleChangeFields(e, 'downPayment')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.firstPaymentDue ? 'error warning' : '') }>
                                                                <label>First Payment Due Date</label>
                                                                <div className="inFormField">
                                                                    <Select name="firstPaymentDue" value={map.firstPaymentDue} onChange={(e) =>handleChangeFields(e, 'firstPaymentDue')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.nextPaymentDue ? 'error warning' : '') }>
                                                                <label>Next Payment Due</label>
                                                                <div className="inFormField">
                                                                    <Select name="nextPaymentDue" value={map.nextPaymentDue} onChange={(e) =>handleChangeFields(e, 'nextPaymentDue')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.lastPaymentDate ? 'error warning' : '') }>
                                                                <label>Last Payment Date</label>
                                                                <div className="inFormField">
                                                                    <Select name="lastPaymentDate" value={map.lastPaymentDate} onChange={(e) =>handleChangeFields(e, 'lastPaymentDate')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.paymentFrequency ? 'error warning' : '') }>
                                                                <label>Payment Frequency</label>
                                                                <div className="inFormField">
                                                                    <Select name="paymentFrequency" value={map.paymentFrequency} onChange={(e) =>handleChangeFields(e, 'paymentFrequency')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.tuitionAmount ? 'error warning' : '') }>
                                                                <label>Tuition Amount</label>
                                                                <div className="inFormField">
                                                                    <Select name="tuitionAmount" value={map.tuitionAmount} onChange={(e) =>handleChangeFields(e, 'tuitionAmount')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={"formField w-50 " + (mapError.paymentRemaining ? 'error warning' : '') }>
                                                                <label>Payments Remaining</label>
                                                                <div className="inFormField">
                                                                    <Select name="paymentRemaining" value={map.paymentRemaining} onChange={(e) =>handleChangeFields(e, 'paymentRemaining')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
                                                                </div>
                                                            </div>
                                                            <div className={"formField w-50 " + (mapError.paymentMethod ? 'error warning' : '') }>
                                                                <label>Payment Method</label>
                                                                <div className="inFormField">
                                                                    <Select name="paymentMethod" value={map.paymentMethod} onChange={(e) =>handleChangeFields(e, 'paymentMethod')}
                                                                            options={options}  isClearable={true} placeholder="Select a header"/>
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
                        <div className={"accoRow " + (!openCustomFields ? 'collapse' : '')}>
                            <div className="accoRowHead customFieldDetails">
                                <span className="accoHeadName">Custom Fields</span>
                                {openCustomFields &&
                                    <>
                                        <button className="creatUserBtn" onClick={createCustomFields}>
                                            <img className="plusIcon" src={plus_icon} alt=""/>
                                            <span>Create Custom Field</span>
                                        </button>
                                    </>
                                }
                                <button className={openCustomFields ? "accoToggler openCustomFields": "accoToggler closedCustomFields"} onClick={toggleCustomField}></button>
                            </div>
                            {
                                openCustomFields ?
                                    (customFields.length ? <>
                                        <div className="accoRowBody">
                                            <div className="infoInputs">
                                                <ul>
                                                    {
                                                        customFields.map(row => (
                                                            <li>
                                                                { row.map(col => (
                                                                    <div className={"formField w-50 " + (customFieldsError[col.alias] ? 'error warning' : '')}>
                                                                        <label>{col.fieldName}</label>
                                                                        <div className="inFormField">
                                                                            <Select name={col.alias} value={customFieldsList[col.alias]} onChange={(e) =>handlerCustomFieldChange(e, col.alias)}
                                                                                    options={options}  isClearable={true} placeholder="Select a header"/>
                                                                        </div>
                                                                    </div>
                                                                )) }
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </> : <>
                                        <div className="accoRowBody">
                                            <div className="infoInputs">

                                            </div>
                                        </div>
                                    </>) : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="importModalFooter">
                <button className={"nextButton"} onClick={handleSetp2Submit}>
                    <span>Next <img src={arrow_forward} alt="" /></span>
                </button>
                <p className="stapeIndicator">Step: {props.current} of 3</p>
            </div>
            {customFieldOpenModal &&
                <CustomizationsAddField
                    closeAddCustomModal={(param) => closeCustomModal(param)}
                    ele={editedEle}
                    editStatus={false}
                    savedNew={() => fetchCustomFields ()}
                    successMessage={(msg) => createSuccess (msg)}
                    errorMessage={(msg) => createError (msg)}
                />
            }
        </>
    );
}

export default Step2;