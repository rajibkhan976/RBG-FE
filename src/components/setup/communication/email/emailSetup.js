import React, { useEffect, useState } from "react";

import arrow_forward from "../../../../assets/images/arrow_forward.svg"
const EmailSetup = () => {
  

    const types = ['SMTP Configuration', 'Postmark Setup'];
    const [active, setActive] = useState(types[0]);
    const [radioCheck , setRadioCheck] = useState(false);

    const toggleRadioChange = (event) =>{
        const value = event.target.value;
        setRadioCheck(value);
    }

    return(
        <>

            <div class="dashInnerUI customization">
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
                            <label class={radioCheck === "SMTP Configuration" ? "toggleBtn active" : "toggleBtn"}>
                                <input type="radio" 
                                name="selectType" 
                                value="SMTP Configuration"
                                defaultChecked={radioCheck === "SMTP Configuration"}
                                onChange={event => toggleRadioChange(event)}/>
                                <span class="toggler"></span>
                            </label>
                        </li>
                         <li>
                            <span>Postmark Setup</span> 
                            <label class={radioCheck === "Postmark Setup" ? "toggleBtn active" : "toggleBtn"}>
                            <input type="radio" 
                                name="selectType" 
                                value="Postmark Setup"
                                defaultChecked={radioCheck === "Postmark Setup"}
                                onChange={event => toggleRadioChange(event)}/>
                                <span class="toggler"></span>
                            </label>
                        </li>
                        <li>
                            <span>Amazon Simple Email Service</span> 
                            <label class={radioCheck === "Amazon Simple Email Service" ? "toggleBtn active" : "toggleBtn"}>
                            <input type="radio" 
                                name="selectType" 
                                value="Amazon Simple Email Service"
                                defaultChecked={radioCheck === "Amazon Simple Email Service"}
                                onChange={event => toggleRadioChange(event)}/>
                                <span class="toggler"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="setupRightPart">
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
                                <div class="cmnFormRow">
                                    
                                    <div class="cmnFieldName1">SMTP Type</div>
                                    <div class="cmnFormField">
                                        <input type="text" class="cmnFieldStyle" value="Google"/>
                                    </div>
                                    
                                </div>
                                <div class="cmnFormRow">
                                    <div class="cmnFormCol">
                                        <div class="cmnFieldName1">Mail Driver</div>
                                        <div class="cmnFormField">
                                            <input type="text" class="cmnFieldStyle" value="SMTP"/>
                                        </div>
                                    </div>
                                    <div class="cmnFormCol">
                                        <div class="cmnFieldName1">Mail Host</div>
                                        <div class="cmnFormField">
                                            <input type="text" class="cmnFieldStyle" value=" smtp.gmail.com "/>
                                        </div>
                                    </div>
                                </div>
                                <div class="cmnFormRow">
                                    <div class="cmnFormCol">
                                        <div class="cmnFieldName1">Mail Port</div>
                                        <div class="cmnFormField">
                                            <input type="text" class="cmnFieldStyle" value="587"/>
                                        </div>
                                    </div>
                                    <div class="cmnFormCol">
                                        <div class="cmnFieldName1">Mail Username</div>
                                        <div class="cmnFormField">
                                            <input type="text" class="cmnFieldStyle" value="work@redbeltgym.com"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="cmnFormRow">
                                    <div class="cmnFormCol">
                                        <div class="cmnFieldName1">Mail Password</div>
                                        <div class="cmnFormField">
                                            <input type="text" class="cmnFieldStyle" value="*******"/>
                                        </div>
                                    </div>
                                    <div class="cmnFormCol">
                                        <div class="cmnFieldName1">Mail Encryption</div>
                                        <div class="cmnFormField">
                                            <input type="text" class="cmnFieldStyle" value="TLS"/>
                                        </div>
                                    </div>
                                </div>
                                <button class="cmnBtn"><span>Save</span><img src={arrow_forward} alt=""/></button>
                                <div class="cmnFormRow mt-2"> 
                                    <div class="cmnFieldName1">Test Configuration</div>
                                    <div class="cmnFormField">
                                        <input type="text" class="cmnFieldStyle" value="Enter your email address"/>
                                    </div>  
                                </div>
                                <button class="cmnBtn"><span>Test SMTP Email Configuration</span><img src={arrow_forward} alt=""/></button>
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