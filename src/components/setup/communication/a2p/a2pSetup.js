import React from "react";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../assets/images/infos.svg";
import plue_icon_white_thik from "../../../../assets/images/plue_icon_white_thik.svg";


const A2PSetup = () => {
    return (
        <>
            <div className="dashInnerUI customization">
                <div className="userListHead">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Setup</li>
                            <li>Communication Setup</li>
                            <li>A2P 10DLC</li>
                        </ul>
                        <h2 className="inDashboardHeader lighter">Twilio A2P Setup</h2>
                        <p className="userListAbout">Manage A2P configuration</p>
                    </div>
                </div>
                <div className="configSideList">
                    <ul>
                        <li className="versionOne">
                            <span>Business Profile</span>
                            <label className={"" === "SMTP Configuration" ? "toggleBtn active" : "toggleBtn"}>
                                <input type="radio"
                                       name="selectType"
                                       value="SMTP Configuration"
                                       defaultChecked={"" === "SMTP Configuration"}
                                       onChange={""}/>
                                <span className="toggler"></span>
                            </label>
                        </li>
                        <li className="versionOne">
                            <span>Authorized Representative</span>
                            <label className={"" === "SMTP Configuration" ? "toggleBtn active" : "toggleBtn"}>
                                <input type="radio"
                                       name="selectType"
                                       value="SMTP Configuration"
                                       defaultChecked={"" === "SMTP Configuration"}
                                       onChange={""}/>
                                <span className="toggler"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="setupRightPart email">
                <section className="tabsection">
                    <div className="tabContent hide">
                        <h3>Business Profile Set up</h3>
                        <form method="post" autoComplete="off">
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Legal Business Name &nbsp;
                                    <span className="infoSpan">
                                        <img src={info_icon} alt=""/>
                                        <span className="tooltiptextInfo">Enter your exact legal business name, as registered with your EIN. E.g. Twilio Inc. rather than Twilio</span>
                                    </span>
                                    <span className="mandatory">*</span>
                                </div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Business Identity <span className="mandatory">*</span>
                                </div>
                                <div className="cmnFormField radioGroup">
                                    <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                            <input type="radio" name="identity" value="direct_customer"/>
                                            <span></span>
                                        </div>
                                        Direct Customer
                                    </label>
                                    <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                            <input type="radio" name="identity" value="isv_reseller_or_partner"/>
                                            <span></span>
                                        </div>
                                        ISV, Reseller, or Partner
                                    </label>
                                    <label className="cmnFormRadioLable">
                                        <div className="circleRadio">
                                            <input type="radio" name="identity" value="unknown"/>
                                            <span></span>
                                        </div>
                                        I don't know
                                    </label>
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Business Type <span className="mandatory">*</span></div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <select className="cmnFieldStyle btnSelect">
                                        <option value="">--- Select Business Type ---</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Corporation">Corporation</option>
                                        <option value="Co-operative">Co-operative</option>
                                        <option value="Limited Liability Corporation">Limited Liability Corporation
                                        </option>
                                        <option value="Non-profit Corporation">Non-profit Corporation</option>
                                    </select>
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Business Regions Of Operation <span
                                    className="mandatory">*</span></div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField radioGroup"}>
                                    <ul className="">
                                        <li className="">
                                            <input type="checkbox" value="AFRICA"/>
                                            <span>AFRICA</span>
                                        </li>
                                        <li className="">
                                            <input type="checkbox" value="ASIA"/>
                                            <span>ASIA</span>
                                        </li>
                                        <li className="">
                                            <input type="checkbox" value="EUROPE"/>
                                            <span>EUROPE</span>
                                        </li>
                                        <li className="">
                                            <input type="checkbox" value="LATIN_AMERICA"/>
                                            <span>LATIN AMERICA</span>
                                        </li>
                                        <li className="">
                                            <input type="checkbox" value="USA_AND_CANADA"/>
                                            <span>USA AND CANADA</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Business Registration Identifier <span
                                    className="mandatory">*</span></div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <select name="business_registration_identifier" className="cmnFieldStyle btnSelect"
                                            placeholder="Select a Business Registration Type">
                                        <option value="">--- Select Business Registration ID Type ---</option>
                                        <option value="EIN">USA: Employer Identification Number (EIN)</option>
                                        <option value="CCN">Canada: Canadian Corporation Number (CCN)</option>
                                        <option value="CN">Great Britain: Company Number</option>
                                        <option value="ACN">Australia: Company Number from ASIC (ACN)</option>
                                        <option value="CIN">India: Corporate Identity Number</option>
                                        <option value="VAT">VAT Number</option>
                                        <option value="RN">Israel: Registration Number</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">
                                    Business Registration Number &nbsp;
                                    <span className="infoSpan">
                                        <img src={info_icon} alt=""/>
                                        <span className="tooltiptextInfo">Enter your EIN / Tax ID as it appears in your EIN listing</span>
                                    </span>
                                    <span className="mandatory">*</span>
                                </div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="business_registration_number"
                                           value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Business Industry <span className="mandatory">*</span>
                                </div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <select name="business_industry" className="cmnFieldStyle btnSelect"
                                            placeholder="Select an industry">
                                        <option value="">--- Select Business Industry ---</option>
                                        <option value="AUTOMOTIVE">Automotive</option>
                                        <option value="AGRICULTURE">Agriculture</option>
                                        <option value="BANKING">Banking</option>
                                        <option value="CONSTRUCTION">Construction</option>
                                        <option value="CONSUMER">Consumer</option>
                                        <option value="EDUCATION">Education</option>
                                        <option value="ENGINEERING">Engineering</option>
                                        <option value="ENERGY">Energy</option>
                                        <option value="OIL_AND_GAS">Oil &amp; Gas</option>
                                        <option value="FAST_MOVING_CONSUMER_GOODS">Fast moving consumer goods</option>
                                        <option value="FINANCIAL">Financial</option>
                                        <option value="FINTECH">Fintech</option>
                                        <option value="FOOD_AND_BEVERAGE">Food &amp; Beverage</option>
                                        <option value="GOVERNMENT">Government</option>
                                        <option value="HEALTHCARE">Healthcare</option>
                                        <option value="HOSPITALITY">Hospitality</option>
                                        <option value="INSURANCE">Insurance</option>
                                        <option value="LEGAL">Legal</option>
                                        <option value="MANUFACTURING">Manufacturing</option>
                                        <option value="MEDIA">Media</option>
                                        <option value="ONLINE">Online</option>
                                        <option value="PROFESSIONAL_SERVICES">Professional Services</option>
                                        <option value="RAW_MATERIALS">Raw materials</option>
                                        <option value="REAL_ESTATE">Real Estate</option>
                                        <option value="RELIGION">Religion</option>
                                        <option value="RETAIL">Retail</option>
                                        <option value="JEWELRY">Jewelry</option>
                                        <option value="TECHNOLOGY">Technology</option>
                                        <option value="TELECOMMUNICATIONS">Telecommunication</option>
                                        <option value="TRANSPORTATION">Transportation</option>
                                        <option value="TRAVEL">Travel</option>
                                        <option value="ELECTRONICS">Electronics</option>
                                        <option value="NOT_FOR_PROFIT">Not for profit</option>
                                    </select>
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Website Url <span className="mandatory">*</span></div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Social Media Profile Urls</div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <button className="cmnBtn" type="button">
                                    <span>Save</span><img src={arrow_forward} alt=""/>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="tabContent">
                        <h3>Authorized Representative</h3>
                        <form method="post" autoComplete="off">
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Business Title
                                    <span className="mandatory">*</span>
                                </div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Job Position <span className="mandatory">*</span></div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <select className="cmnFieldStyle btnSelect">
                                        <option value="Director">Director</option>
                                        <option value="GM" >GM</option>
                                        <option value="VP" >VP</option>
                                        <option value="CEO">CEO</option>
                                        <option value="CFO">CFO</option>
                                        <option value="General Counsel">General Counsel</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">First Name
                                    <span className="mandatory">*</span>
                                </div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">Last Name
                                    <span className="mandatory">*</span>
                                </div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">phone_number <span className="mandatory">*</span></div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <div className="cmnFieldName1">email</div>
                                <div className={"" ? "cmnFormField error" : "cmnFormField"}>
                                    <input type="text" className="cmnFieldStyle" name="from" value={""}
                                           onChange={""}
                                    />
                                </div>
                                <div className="errorMsg">{}</div>
                            </div>
                            <div className="cmnFormRow">
                                <button className="cmnBtn" type="button">
                                    <span>Save</span><img src={arrow_forward} alt=""/>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

        </>
    );
}

export default A2PSetup;