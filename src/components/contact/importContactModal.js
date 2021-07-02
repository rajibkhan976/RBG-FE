import React from 'react';

import arrowDown from "../../assets/images/arrowDown.svg";
import download_cloud_icon from "../../assets/images/download_cloud_icon.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import user_done_icon from "../../assets/images/user_done_icon.svg";
import fileDoneIcon from "../../assets/images/fileDoneIcon.svg";

const ImportContactModal = () => {

    let stepCount = 1;
    const nextStep = () => {
        for(let i=1; i <= 5; i++){
            document.getElementById("stpe_" + i).classList.add("hide");
        }

        if(stepCount < 5) {
            stepCount++;
        } else {
            stepCount = 1;
        }
        document.getElementById("currentStep").innerHTML = stepCount;
        document.getElementById("stpe_" + stepCount).classList.remove("hide");
    };

    return (
        <div className="sideMenuOuter">
            <div className="sideMenuInner importModalContainer">
                <div className="sideMenuHeader">
                    <h3>Import Data</h3>
                    <p>Lorem ipsum dolor sit amet</p>
                    <button className="btn btn-closeSideMenu"><span></span><span></span></button>
                </div>
                <div className="importModalBody">
                    <div className="importStapeList">
                        <ul>
                            <li className="active">Upload File<span>&gt;</span></li>
                            <li>Mapping Details<span>&gt;</span></li>
                            <li>Confirm Mapping<span>&gt;</span></li>
                            <li>Handle Duplicates<span>&gt;</span></li>
                            <li>Import Summary</li>
                        </ul>
                    </div>
                    <div id="stpe_1" className="">
                        <div className="infoInputs">
                            <ul>
                                <li>
                                    <div className="formField w-50">
                                        <label>Import data for</label>
                                        <div className="inFormField">
                                            <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                <option value="">Contacts</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="formField w-50">
                                        <label>Import based on</label>
                                        <div className="inFormField">
                                            <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                <option value="">Email Id</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="formField spclField">
                                        <p className="spclLabel">In case of duplicates</p>
                                        <div className="radioGroup">
                                            <label>
                                                <div className="circleRadio">
                                                    <input type="radio" name="duplicates" />
                                                    <span></span>
                                                </div>
                                                Skip
                                            </label>
                                            <label>
                                                <div className="circleRadio">
                                                    <input type="radio" name="duplicates" />
                                                    <span></span>
                                                </div>
                                                Overwrite
                                            </label>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="fileImportBox">
                                <figure className="statusIcon">
                                    <img src={download_cloud_icon} alt="" />
                                </figure>
                                <h3>Choose the file to be imported</h3>
                                <p className="inportInfo">
                                    [Only xls, xlsx and csv formats are supported]<br />Maximum upload size is 5 MB
                                </p>
                                <div className="uploadFileBtn fileInput">
                                    Upload File
                                    <input type="file" />
                                </div>
                                <a href="" className="downloadSample">Download sample template for Import</a>
                            </div>
                        </div>
                        <div className="importNote">
                            <h4>*NOTE:</h4>
                            <p>
                                Import sheet, if duplicate record is found based on <span>“Email Id”</span> the last duplicate row will be taken as valid record.
                            </p>
                        </div>
                    </div>

                    <div id="stpe_2" className="hide">
                        <div className="infoInputs">
                            <ul>
                                <li>
                                    <div className="formField w-50">
                                        <label>Import data for</label>
                                        <div className="inFormField">
                                            <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                <option value="">Contacts</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="formField w-50">
                                        <label>Import based on</label>
                                        <div className="inFormField">
                                            <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                <option value="">Email Id</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="formField spclField">
                                        <p className="spclLabel">In case of duplicates</p>
                                        <div className="radioGroup">
                                            <label>
                                                <div className="circleRadio">
                                                    <input type="radio" name="duplicates" />
                                                    <span></span>
                                                </div>
                                                Skip
                                            </label>
                                            <label>
                                                <div className="circleRadio">
                                                    <input type="radio" name="duplicates" />
                                                    <span></span>
                                                </div>
                                                Overwrite
                                            </label>
                                        </div>
                                    </div>
                                </li>
                                <div className="executeWorkflow">
                                    <div className="customCheckbox">
                                        <input type="checkbox" name="duplicates" />
                                        <span></span>
                                    </div>
                                    <p className="spclLabel">Execute Workflow</p>
                                </div>
                            </ul>
                            <div className="fileImportBox">
                                <figure className="statusIcon">
                                    <img src={fileDoneIcon} alt="" />
                                </figure>
                                <h3>file_name.csv</h3>
                                <div className="uploadFileBtn">
                                    Remove & New
                                    <input type="file" />
                                </div>
                            </div>
                        </div>
                        <div className="importNote">
                            <h4>*NOTE:</h4>
                            <p>
                                Import sheet, if duplicate record is found based on <span>“Email Id”</span> the last duplicate row will be taken as valid record.
                            </p>
                        </div>
                    </div>

                    <div id="stpe_3" className="hide">
                        <div className="totalReconds">
                            <img src={user_done_icon} alt="" />
                            <p><span>1, 86 ,564</span> Records found</p>
                        </div>
                        <div className="formAccordion">
                            <div className="accoRow">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Basic Info</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>* Employee Id</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">employeeid*(c:0)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>* First Name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">first name*(c:1)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>* Email Id</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">email id*(c:3)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>* Last name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">last name*(c:2)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Nick Name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">nick name(c:4)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accoRow collapse">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Work</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Department</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Location</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Title</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Company Name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>* Is this person in common list</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Work Phone</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accoRow collapse">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Personal</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Mobile Phone</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Address</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Other Email</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Tag</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Birth Date</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accoRow collapse">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Summary</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Job Description</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Gender</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="importNote">
                            <h4>*NOTE:</h4>
                            <p>
                                Import sheet, if duplicate record is found based on <span>“Email Id”</span> the last duplicate row will be taken as valid record.
                            </p>
                        </div>
                    </div>

                    <div id="stpe_4" className="hide">
                        <div className="formMsg error">Following fields are not mapped.</div>
                        <div className="formAccordion">
                            <div className="accoRow">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Basic Info</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50 error">
                                                    <label>* Employee Id</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50 error">
                                                    <label>* First Name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>* Email Id</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">email id*(c:3)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>* Last name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">last name*(c:2)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Nick Name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">nick name(c:4)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accoRow">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Work</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Department</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Location</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Title</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Company Name</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>* Is this person in common list</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Work Phone</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accoRow">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Personal</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Mobile Phone</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Address</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Other Email</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Tag</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Birth Date</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="accoRow">
                                <div className="accoRowHead">
                                    <span className="accoHeadName">Summary</span>
                                    <button className="accoToggler"></button>
                                </div>
                                <div className="accoRowBody">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className="formField w-50">
                                                    <label>Job Description</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="formField w-50">
                                                    <label>Gender</label>
                                                    <div className="inFormField">
                                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                                            <option value="">Select</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="stpe_5" className="hide">
                        <div className="fileImportBox green">
                            <figure className="statusIcon">
                                <img src={fileDoneIcon} alt="" />
                            </figure>
                            <h3>The selected file has been uploaded successfully.</h3>
                            <div className="uploadFileBtn">
                                View Records
                                <input type="button" />
                            </div>
                        </div>
                        <div className="uploadedDataSummary">
                            <h3>Summary</h3>
                            <ul>
                                <li>
                                    <div className="summryCell">
                                        <p>Total records added</p>
                                        <span>124563215</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="summryCell">
                                        <p>Total records updated</p>
                                        <span>83</span> 
                                    </div>
                                </li>
                                <li>
                                    <div className="summryCell">
                                        <p>Total records skipped</p>
                                        <span>12</span>  
                                    </div>
                                </li>
                                <li>
                                    <div className="summryCell">
                                        <p>Number of errors</p>
                                        <span>6</span>  
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="errorList">
                            <h3>Error Details</h3>
                            <ul>
                                <li>
                                    <div className="errorRowNo">Row 2:</div>
                                    <p>
                                        Enter a valid email address for Email ID Select a value for Blood Group Select a value for “Is this person in common list”
                                    </p>
                                </li>
                                <li>
                                    <div className="errorRowNo">Row 12:</div>
                                    <p>
                                        Enter a valid email address for Email ID Select a value for Blood Group Select a value for “Is this person in common list”
                                    </p>
                                </li>
                                <li>
                                    <div className="errorRowNo">Row 15:</div>
                                    <p>
                                        Enter a valid email address for Email ID Select a value for Blood Group Select a value for “Is this person in common list”
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="importModalFooter">
                    <button className="nextButton" onClick={nextStep}>Next <img src={arrow_forward} alt="" /></button>
                    <p className="stapeIndicator">Step: <span id="currentStep">1</span> of 5</p>
                </div>
            </div>
        </div>
    );

}

export default ImportContactModal;