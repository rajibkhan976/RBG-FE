import React, {useState} from "react";

import { Steps, Step } from "react-step-builder";
import arrowDown from "../../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";



function ImportFilter(props) {
    const closeModal = () => {
        props.hideModal();
    }
    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="sideMenuInner importModalContainer">
                    <div className="sideMenuHeader">
                        <h3>Apply Filter</h3>
                        
                        <button className="btn btn-closeSideMenu" onClick={() => closeModal()}><span></span><span></span></button>
                    </div>


                    <div className="importModalBody">

                        <div id="step_1" className="">
                            <div className="infoInputs appModal">
                            <p className="dateRange">Date Range</p>
                                <ul>
                                    <li>
                                        <div className="formField w-50 appflex">
                                            <label>From</label>
                                            <div className="inFormField">
                                                <input type="date" placeholder="dd/mm/yyyy" name="" />
                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex">
                                            <label>To</label>
                                            <div className="inFormField">
                                                <input type="date" placeholder="dd/mm/yyyy" name="" />
                                            </div>
                                        </div>

                                        </li>
                                        <li className="blockLi">

                                        <div className="formField w-100 appModals formControl">
                                            <label>Choose Filter Option</label>
                                            <select
                                                style={{
                                                    backgroundImage: "url(" + arrowDown + ")",
                                                }}>
                                                <option value="">Status</option>                       
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl">
                                            <label>Contains</label>
                                            <select
                                                style={{
                                                    backgroundImage: "url(" + arrowDown + ")",
                                                }}>
                                                <option value="">Equal to</option>                        
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl">
                                            <label>Search</label>
                                            <input type="text" placeholder="Scheduled" name="" />
                                           
                                        </div>

                                    </li>

                                    <li className="lastLiApp">
                                        <div className="formField formControl w-50 appflex">                                           
                                            <button type="submit" className="saveNnewBtn"><span>Apply Filter</span><img src={arrowRightWhite} alt="" /></button>
                                        </div>
                                        <div className="formField w-50 appflex">
                                            <span className="clearFilter">Clear</span>
                                        </div>

                                        </li>
                                    
                                </ul>
                                
                            </div>
                                
                            </div>

</div>

                    
                </div>
            </div>
        </>

    );
}

export default ImportFilter;