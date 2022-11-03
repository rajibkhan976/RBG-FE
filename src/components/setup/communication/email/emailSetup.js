import React, {useEffect, useState} from "react";
import Loader from "../../../shared/Loader";
import {ErrorAlert, SuccessAlert} from "../../../shared/messages";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../../actions/types";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import {EmailServices} from "../../../../services/setup/EmailServices";

const EmailSetup = () => {
    const dispatch = useDispatch();
    const types = ['SMTP Configuration'];
    const [active, setActive] = useState(types[0]);
    const [radioCheck, setRadioCheck] = useState(false);
    const [isLoader, setIsLoader] = useState(false);

    const [smtpType, setSmtpType] = useState("google");
    const [configuration, setConfiguration] = useState("");
    const [configError, setConfigError] = useState(false);

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [emailData, setEmailData] = useState({
        "host": "",
        "port": "",
        "user": "",
        "pass": "",
    });
    const [validateMsg, setValidateMsg] = useState({
        "host": "",
        "port": "",
        "user": "",
        "pass": "",
    });
    const [showConfidBtn, setShowConfidBtn] = useState(false);

    const fetchEmail = async () => {
        try {
            setIsLoader(true);
            const result = await EmailServices.fetchSetupEmail();
            if (result) {
                if (result.host === 'smtp.gmail.com') {
                    setSmtpType('google');
                } else if (result.host === 'smtp.sendgrid.net') {
                    setSmtpType('sendgrid');
                } else {
                    setSmtpType('others');
                }
                setEmailData(result);
            }
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setIsLoader(false);
        }
    };
    const updateEmail = async (payload) => {
        try {
            setIsLoader(true);
            const result = await EmailServices.setupEmailUpdate(payload);
            if (result) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: result.message,
                    typeMessage: 'success'
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setIsLoader(false);
        }
    };
    const smtpTypeHandler = (e) => {
        setSmtpType(e.target.value);
        if (e.target.value === 'google') {
            setEmailData({
                ...emailData,
                host: 'smtp.gmail.com',

            });
        } else if (e.target.value === 'sendgrid') {
            setEmailData({
                ...emailData,
                host: 'smtp.sendgrid.net',
            });
        } else {
            setEmailData({
                ...emailData,
                host: '',

            });
        }

    }
    const emailConfig = async (payload) => {
        try {
            setIsLoader(true);
            let result = await EmailServices.setupEmailConfig(payload);

            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: result.message,
                typeMessage: 'success'
            });
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message + ". Please check your email configuration.",
                typeMessage: 'error'
            });
        } finally {
            setIsLoader(false);
        }
    };

    useEffect(async () => {
        await fetchEmail();
    }, []);
    const validateField = (e) => {
        let emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const portType = /^[0-9]{3}$/;
        const name = e.target.name;
        const value = e.target.value;
        setValidateMsg(prevState => ({
            ...prevState,
            [name]: "",
        }));
        setEmailData({
            ...emailData,
            [name]: value,
        }); 
        // setEmailData(prevState => ({
        //     ...prevState,
        //     [name]: value,
        // }));

        if (name === "host" && value.length === 0) {
            setValidateMsg({...validateMsg, host: "Please enter a valid host"});
        }
        if (name === "port" && !portType.test(value)) {
            setValidateMsg({...validateMsg, port: "Please enter a valid port of 3 digit"});
        }
        if (name === "user" && !value.match(emailRegex)) {
            setValidateMsg({...validateMsg, user: "Please enter a valid user name"});
        }
        if (name === "pass" && value.length === 0) {
            setValidateMsg({...validateMsg, pass: "Please enter a valid password"});
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoader(true);
            let validationError = false;
            if (!emailData.host) {
                setValidateMsg(previousState => ({
                    ...previousState,
                    host: "Please enter a mail host",
                }));
                validationError = true;
            }
            if (!emailData.port) {
                setValidateMsg(previousState => ({
                    ...previousState,
                    port: "Please enter a valid port of 3 digit",
                }));
                validationError = true;
            }
            if (!emailData.user) {
                setValidateMsg(previousState => ({
                    ...previousState,
                    user: "Please enter a user name",
                }));
                validationError = true;
            }
            if (!emailData.pass) {
                setValidateMsg(previousState => ({
                    ...previousState,
                    pass: "Please enter a password"
                }));
                validationError = true;
            }
            if (!validationError) {
                let payload = {
                    "host": emailData?.host,
                    "port": parseInt(emailData?.port),
                    "user": emailData?.user,
                    "pass": emailData?.pass,
                };
                await updateEmail(payload);
            }
        } catch (e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setIsLoader(false);
        }
    }

    const configurationHandler = (e) => {
        let configTarget = e.target.value;
        setConfiguration(configTarget);
        let emailPrototype = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        if (!configTarget.match(emailPrototype)) {
            setConfigError(true);
        } else {
            setConfigError(false);
        }
    }
    const handleConfigEmail = async () => {
        const payload = {
            "emailID": configuration,
        };
        if (configuration === "" || configuration === undefined) {
            setConfigError(true);
        } else {
            await emailConfig(payload);
        }

    }
    return (
        <>
            {(isLoader) ? <Loader/> : ''}


            <div className="dashInnerUI customization">
                <div className="userListHead">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Setup</li>
                            <li>Communication Setup</li>
                            <li>Email</li>
                        </ul>
                        <h2 className="inDashboardHeader lighter">Email Setup</h2>
                        <p className="userListAbout">Manage Email configuration</p>
                    </div>
                </div>
                <div className="configSideList">
                    <h3>Configurations</h3>
                    <ul>
                        <li className="versionOne">
                            <span>SMTP Configuration</span>
                        </li>
                        {/* <li className="versionOne">
                            <span>SMTP Configuration</span> 
                             <label className={radioCheck === "SMTP Configuration" ? "toggleBtn active" : "toggleBtn"}>
                                <input type="radio" 
                                name="selectType" 
                                value="SMTP Configuration"
                                defaultChecked={radioCheck === "SMTP Configuration"}
                                onChange={event => toggleRadioChange(event)}/>
                                <span className="toggler"></span>
                              </label> 
                            </li>
                            <li>
                                <span>Postmark Setup</span> 
                                <label className={radioCheck === "Postmark Setup" ? "toggleBtn active" : "toggleBtn"}>
                                <input type="radio" 
                                    name="selectType" 
                                    value="Postmark Setup"
                                    defaultChecked={radioCheck === "Postmark Setup"}
                                    onChange={event => toggleRadioChange(event)}/>
                                    <span className="toggler"></span>
                                </label>
                            </li>
                            <li>
                                <span>Amazon Simple Email Service</span> 
                                <label className={radioCheck === "Amazon Simple Email Service" ? "toggleBtn active" : "toggleBtn"}>
                                <input type="radio" 
                                    name="selectType" 
                                    value="Amazon Simple Email Service"
                                    defaultChecked={radioCheck === "Amazon Simple Email Service"}
                                    onChange={event => toggleRadioChange(event)}/>
                                    <span className="toggler"></span>
                                </label>
                            </li>  */}
                    </ul>
                </div>
            </div>
            <div className="setupRightPart email">
                <section className="tabsection">
                    <ul className="tabBtnGroup">
                        {types.map(type => (
                            <li
                                key={type}
                                onClick={() => setActive(type)}
                            >
                                <button className={(active === type) && "active"}>{type}</button>
                            </li>
                        ))}
                    </ul>

                    {(active === 'SMTP Configuration') &&
                        <div className="tabContent">
                            <h3>SMTP Set up</h3>
                            <form method="post"
                                //onSubmit={handleSubmit}
                                  autoComplete="off"
                            >
                                <div className="cmnFormRow">

                                    <div className="cmnFieldName1">SMTP Type</div>
                                    <div className="cmnFormField">
                                        <select className="cmnFieldStyle btnSelect" value={smtpType}
                                                onChange={smtpTypeHandler}>
                                            <option value="google">Google</option>
                                            <option value="sendgrid">Send Grid</option>
                                            <option value="others">Other</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="cmnFormRow">
                                    <div className={validateMsg?.host ? "cmnFormCol error" : "cmnFormCol"}>
                                        <div className="cmnFieldName1">Mail Host</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle"
                                                   name="host"
                                                   value={emailData?.host === undefined ? "" : emailData?.host}
                                                   onChange={validateField}/>
                                        </div>
                                        <div className="errorMsg">{validateMsg?.host}</div>
                                    </div>
                                    <div className={validateMsg?.port ? "cmnFormCol error" : "cmnFormCol"}>
                                        <div className="cmnFieldName1">Mail Port</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle"
                                                   value={emailData.port ? emailData.port : ""}
                                                   onChange={validateField}
                                                   name="port"
                                            />
                                        </div>
                                        <div className="errorMsg">{validateMsg?.port}</div>
                                    </div>
                                </div>

                                <div className="cmnFormRow">
                                    <div className={validateMsg?.user ? "cmnFormCol error" : "cmnFormCol"}>
                                        <div className="cmnFieldName1">Mail Username</div>
                                        <div className="cmnFormField">

                                            <input type="text" className="cmnFieldStyle"
                                                   value={emailData?.user}
                                                   onChange={validateField}
                                                   name="user"
                                                  // autoComplete="off"
                                                  // secureTextEntry={true}
                                                  //  textContentType="oneTimeCode"
                                            />
                                        </div>
                                        <div className="errorMsg">{validateMsg?.user}</div>
                                    </div>
                                    <div className={validateMsg?.pass ? "cmnFormCol error" : "cmnFormCol"}>
                                        <div className="cmnFieldName1">Mail Password</div>
                                        <div className="cmnFormField">
                                            <input type="password" className="cmnFieldStyle"
                                                   value={emailData?.pass}
                                                   onChange={validateField}
                                                   name="pass"
                                                  // autoComplete="off"
                                                 //  secureTextEntry={true}
                                                   // textContentType="oneTimeCode"
                                            />
                                        </div>
                                        <div className="errorMsg">{validateMsg?.pass}</div>
                                    </div>
                                </div>
                                <button className="cmnBtn"
                                        type="button"
                                        onClick={handleSubmit}
                                >
                                    <span>Save</span><img src={arrow_forward} alt=""/>
                                </button>
                            </form>
                            <div className="cmnFormRow mt-2">
                                <div className="cmnFieldName1">Test Configuration</div>
                                <div className={configError ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle"
                                           placeholder="Please enter a valid email address"
                                           value={configuration}
                                           name="emailID"
                                           onChange={configurationHandler}/>
                                </div>
                                {configError ?
                                    <div className="errorMsg"> Please enter a Email address for testing</div> : " "}
                            </div>
                            {/* {emailData?.host !== "" && emailData?.port !== ""  && emailData?.user !== ""  && emailData?.pass !== "" &&
                                emailData?.host !== undefined && emailData?.port !== undefined  && emailData?.user !== undefined  && emailData?.pass !== undefined 
                                && showConfidBtn &&
                                <button className="cmnBtn"
                                 onClick={handleConfigEmail}
                                >

                                    <span>Test SMTP Email Configuration</span><img src={arrow_forward} alt=""/>
                                </button>
                            } */}
                            {((emailData?.host === "" && emailData?.port === "" && emailData?.user === "" && emailData?.pass === "") ||
                                (emailData?.host === undefined || emailData?.port === undefined || emailData?.user === undefined || emailData?.pass === undefined)) ?
                                "" :
                                <button className="cmnBtn"
                                        onClick={handleConfigEmail}
                                >

                                    <span>Test SMTP Email Configuration</span><img src={arrow_forward} alt=""/>
                                </button>

                            }
                        </div>
                    }
                    {/* {(active === 'Postmark Setup') && <div className="tabContent"> dd</div>} */}

                </section>
            </div>

        </>
    );
}

export default EmailSetup;