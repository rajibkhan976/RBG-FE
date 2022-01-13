import React, { useState } from 'react';

import arrowDown from "../../assets/images/arrowDown.svg";
import download_cloud_icon from "../../assets/images/download_cloud_icon.svg";
import arrow_forward from "../../assets/images/arrow_forward.svg";
import user_done_icon from "../../assets/images/user_done_icon.svg";
import fileDoneIcon from "../../assets/images/fileDoneIcon.svg";
import fileFail_icon from "../../assets/images/fileFail_icon.svg";
import done_white_icon from "../../assets/images/done_white.svg";

const ImportContactModal = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState("Please import file");
    const [fileImportStatus, setFileImportStatus] = useState(false);
    const [nextStep, setNextStep] = useState(false);
    const [currentStep, setCurrentStep]= useState(1);

    const closeModal = () => {
        document.getElementById("import_Modal").classList.add("hideSlide");
    }

    

   

    
    

    return (
        <>
            {showModal ?
                <div className="sideMenuOuter" id="import_Modal">
                    <div className="sideMenuInner importModalContainer">
                        <div className="sideMenuHeader">
                            <h3>Apply Filter</h3>
                            </div>
                        <div className="importModalBody">
                            
                            <div id="step_1" className="">
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
                                        
                                    </ul>
                                    
                                </div>
                                
                            </div>

                            
                           

                          

                        </div>
                        
                    </div>
                </div>
                : ""}
        </>
    );

}

export default ImportContactModal;