import React, { useEffect, useState } from "react";

import arrow_forward from "../../../../assets/images/arrow_forward.svg"
const EmailSetup = () => {
  

    const types = ['SMTP Configuration', 'Postmark Setup'];
    const [active, setActive] = useState(types[0]);
    const [radioCheck , setRadioCheck] = useState(false);

    // const [formFields, setFormFields] = useState([
    //     {
    //         "smtpType" : "",
    //         "mailDriver" : "",
    //         "mailHost"  : "",
    //         "mailPort" : "",
    //         "username"  : "",
    //         "password" : "",
    //         "mailEncryption" : "",
    //         "configuration" : ""
    //     }
    // ])
    const [smtpType, setSmtpType] = useState("Google");
    const [mailDriver, setMailDriver] = useState("SMTP");
    const [mailHost, setMailHost] = useState(" smtp.gmail.com ");
    const [mailPort, setMailPort] = useState("587");
    const [username, setUsername] = useState("work@redbeltgym.com");
    const [password, setPassword] = useState("123456");
    const [mailEncryption, setMailEncryption] = useState("TLS");
    const [configuration, setConfiguration] = useState("Enter your email address");
    


    const toggleRadioChange = (event) =>{
        const value = event.target.value;
        setRadioCheck(value);
    }
    const smtpTypeHandler = (e) =>{
        setSmtpType(e.target.value);
    }
    const mailDriverHandler = (e) =>{
        setMailDriver(e.target.value);
    }
    const mailHostHandler = (e) =>{
        setMailHost(e.target.value);
    }
    const mailPortHandler = (e) =>{
        setMailPort(e.target.value);
    }
    const usernameHandler = (e) =>{
        setUsername(e.target.value);
    }
    const passwordHandler = (e) =>{
        setPassword(e.target.value);
    }
    const mailEncryptionHandler = (e) =>{
        setMailEncryption(e.target.value);
    }
    const configurationHandler = (e) =>{
        setConfiguration(e.target.value);
    }

    
    return(
        <>

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
                        <li>
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
                        </li>
                    </ul>
                </div>
            </div>
            <div className="setupRightPart email">
                <section className="tabsection">
                    <ul className="tabBtnGroup">
                        {types.map(type => (
                        <li
                            key={type}
                            active={active === type}
                            onClick={() => setActive(type)}
                        >
                           <button className={(active === type) && "active"}>{type}</button> 
                        </li>
                        ))}
                    </ul>
                
                    {(active === 'SMTP Configuration') && 
                        <div className="tabContent">
                            <h3>SMTP Set up</h3>
                            <form>
                                <div className="cmnFormRow">
                                    
                                    <div className="cmnFieldName1">SMTP Type</div>
                                    <div className="cmnFormField">
                                        <input type="text" className="cmnFieldStyle" value={smtpType} onChange={smtpTypeHandler}/>
                                    </div>
                                    
                                </div>
                                <div className="cmnFormRow">
                                    <div className="cmnFormCol">
                                        <div className="cmnFieldName1">Mail Driver</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle" value={mailDriver} onChange={mailDriverHandler}/>
                                        </div>
                                    </div>
                                    <div className="cmnFormCol">
                                        <div className="cmnFieldName1">Mail Host</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle" value={mailHost} onChange={mailHostHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="cmnFormRow">
                                    <div className="cmnFormCol">
                                        <div className="cmnFieldName1">Mail Port</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle" value={mailPort} onChange={mailPortHandler}/>
                                        </div>
                                    </div>
                                    <div className="cmnFormCol">
                                        <div className="cmnFieldName1">Mail Username</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle" value={username} onChange={usernameHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="cmnFormRow">
                                    <div className="cmnFormCol">
                                        <div className="cmnFieldName1">Mail Password</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle" value={password} onChange={passwordHandler}/>
                                        </div>
                                    </div>
                                    <div className="cmnFormCol">
                                        <div className="cmnFieldName1">Mail Encryption</div>
                                        <div className="cmnFormField">
                                            <input type="text" className="cmnFieldStyle" value={mailEncryption} onChange={mailEncryptionHandler}/>
                                        </div>
                                    </div>
                                </div>
                                <button className="cmnBtn"><span>Save</span><img src={arrow_forward} alt=""/></button>
                                <div className="cmnFormRow mt-2"> 
                                    <div className="cmnFieldName1">Test Configuration</div>
                                    <div className="cmnFormField">
                                        <input type="text" className="cmnFieldStyle" value={configuration} onChange={configurationHandler}/>
                                    </div>  
                                </div>
                                <button className="cmnBtn"><span>Test SMTP Email Configuration</span><img src={arrow_forward} alt=""/></button>
                            </form>
                        </div>
                    }
                    {(active === 'Postmark Setup') && <div className="tabContent"> dd</div>}
                  
                </section>
            </div>
                        
        </>
    );
}

export default EmailSetup;