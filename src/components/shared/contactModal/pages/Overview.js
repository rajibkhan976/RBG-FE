import React, { useState, useEffect } from "react";
import { ContactService } from "../../../../services/contact/ContactServices";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";

const Overview = (props) => {
    
    const [formScrollStatus, setFormScrollStatus] = useState(false);
    const [basicinfoEmail, setBasicinfoEmail] = useState('');
    const [phoneCountryCode, setPhoneCountryCode] = useState([]);
    const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: "1234567890"
    });

    const fetchCountry = async () => {
        let conntryResponse = await ContactService.fetchCountry();
        setPhoneCountryCode(conntryResponse);
        console.log(conntryResponse, "country");
    };

    useEffect(() => {
        fetchCountry();
    }, []);

    const handelBasicinfoEmail = (event) => {
        setBasicinfoEmail(event.target.value);
        
        console.log(basicinfoEmail);
        console.log(basicinfoMobilePhone);
    };

    const handelBasicinfoMobilePhon = (event) => {
        const {name, value} = event.target;
        if(name == "countryCode"){
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex != undefined ? daileCodeindex.getAttribute("data-dailCode") : "+1";
            setBasicinfoMobilePhone(prevState => ({...prevState, dailCode: dailCode}));
        }
        
        setBasicinfoMobilePhone(prevState => ({...prevState, [name]: value}));
    };

    const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
        return(
            <option value={el.code} data-dailCode={el.prefix} >{el.code} ({el.prefix})</option>
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


    return(
        <div className={formScrollStatus ? "contactModalTab expanded" : "contactModalTab"} onScroll={formScroll}>
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
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             Last Name
                            </div>
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Date of Birth
                            </div>
                            <div className="cmnFormField">
                                <input type="date" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Email
                            </div>
                            <div className="cmnFormField">
                                <input type="email" className="cmnFieldStyle" placeholder="Eg. Jon.doe@domain.com" value={basicinfoEmail} onChange={handelBasicinfoEmail}/>
                            </div>
                        </div>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Phone
                            </div>
                            <div className="cmnFormField countryCodeField">
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" value={basicinfoMobilePhone.number} onChange={handelBasicinfoMobilePhon} />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Mobile
                            </div>
                            <div className="cmnFormField countryCodeField">
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" value={basicinfoMobilePhone.number} onChange={handelBasicinfoMobilePhon} />
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
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             Job Role
                            </div>
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
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
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Mother's Phone Number
                            </div>
                            <div className="cmnFormField countryCodeField">
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" />
                            </div>
                        </div>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Father's Name
                            </div>
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Father's Phone Number
                            </div>
                            <div className="cmnFormField countryCodeField">
                                <div className="countryCode cmnFieldStyle">
                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                        {countrycodeOpt}
                                    </select>
                                </div>
                                <input type="phone" className="cmnFieldStyle" name="number" placeholder="Eg. (555) 555-1234" />
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
                            <div className="cmnFormField">
                                <textarea className="cmnFieldStyle" placeholder="Eg. The Park Appt, Suit 204, 1/2A Street Name,TX"></textarea>
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                            Address 2
                            </div>
                            <div className="cmnFormField">
                                <textarea className="cmnFieldStyle" placeholder="Eg. The Park Appt, Suit 204, 1/2A Street Name,TX"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                City
                            </div>
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             State
                            </div>
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="cmnFormRow">
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                                Zip
                            </div>
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                        <div className="cmnFormCol">
                            <div className="cmnFieldName">
                             Country
                            </div>
                            <div className="cmnFormField">
                                <input type="text" className="cmnFieldStyle" placeholder="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overviewForm cmnForm">
                    <div className="cmnFormHead">
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
                    </div>
                    <div className="cmnFormRow">
                        <div className="formActBtnWrap">
                            <button className="saveNnewBtn saveOverview">Save and Update <img src={arrow_forward} alt="" /></button>
                            <button className="btn-link">Cancel</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;