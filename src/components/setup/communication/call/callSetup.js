import React, {useEffect, useState} from "react";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import CallConfiguration from "./callConfiguration";
import {ContactService} from "../../../../services/contact/ContactServices";
import {CallSetupService} from "../../../../services/setup/callSetupServices";
import Loader from "../../../shared/Loader";
import {ErrorAlert, SuccessAlert} from "../../../shared/messages";


const CallSetup = () => {
    const [configModalShow, setConfigModalShow] = useState(false);
    const [numberObj, setNumberObj] = useState({});
    const [configurationList, setConfigurationList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const openConfigModal = () => {
        setConfigModalShow(true);
    }
  
    const closeConfigModal = () => {
        setConfigModalShow(false);
    }
    const fetchNumber = async () => {
        setIsLoader(true);
        try {
            const result = await CallSetupService.fetchNumber();
            setNumberObj(result);
            setConfigurationList(result.config);
        } catch (e) {
            setErrorMsg('No number found. Please first buy a number then come again here.');
        } finally {
            setIsLoader(false);
        }
    }
    const handleCheck = (val, list) => {
        let exists = false;
        list.some((el) => {
            if (el.day.includes(val))
                exists = true;
        });
        return exists;
    }
    const getTimeSlot = (list) => {
      let start = "";
      let end = "";
        list.some((el) => {
            if (start === "") {
                start = el.startTime;
            } else {
                start = start < el.startTime ? start : el.startTime;
            }
            if (end === "") {
                end = el.endTime;
            } else {
                end = end > el.endTime ? end : el.endTime;
            }
        });
        return start + " - " + end;
    }
    useEffect(() => {
        fetchNumber();
    }, []);
    return(
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            {successMsg &&
            <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
            <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            <div class="userListHead">
                <div class="listInfo">
                    <ul class="listPath">
                        <li>Setup</li>
                        <li>Communication Setup</li>
                        <li>Call</li>
                    </ul>
                    <h2 class="inDashboardHeader">Call Setup</h2>
                    <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                </div>
                { Object.keys(numberObj).length ?
                    <div class="listFeatures">
                        <button class="creatUserBtn" onClick={openConfigModal}>
                            <img class="plusIcon" src={plus_icon} alt=""/>
                            <span>Add a configur</span>
                        </button>
                    </div> : ""
                }
            </div>
            {
                Object.keys(numberObj).length ?
                <div className="userListBody callListingTable">
                    <div className="assignedNumberArea">
                        <h3>Assigned Phone Number</h3>
                        <p>{ numberObj.prefix + "-" + numberObj.nationalNumber + " [ " + numberObj.numberAlias + " ] "}</p>
                    </div>
                    <h3 className="callListTabHeading">
                        Configurations
                    </h3>
                    <div className="listBody">
                        <ul className="tableListing">
                            <li className="listHeading">
                                <div className="userName">
                                    Name
                                </div>
                                <div>
                                    Scheduled Day (s)
                                </div>
                                <div className="scehTimeSlot">
                                    Scheduled Time Slot
                                </div>
                                <div>
                                    Status
                                </div>
                            </li>
                            {
                                configurationList.map((list) => {
                                    return (
                                        <li>
                                            <div className="userName">
                                                <button className="btn"><p>{list.name}</p></button>
                                            </div>
                                            <div>
                                                <ul className="weekDateList">
                                                    <li className={ handleCheck('sun', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>S</span>
                                                    </li>
                                                    <li className={ handleCheck('mon', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>M</span>
                                                    </li>
                                                    <li className={ handleCheck('tue', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>T</span>
                                                    </li>
                                                    <li className={ handleCheck('wed', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>W</span>
                                                    </li>
                                                    <li className={ handleCheck('thu', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>T</span>
                                                    </li>
                                                    <li className={ handleCheck('fri', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>F</span>
                                                    </li>
                                                    <li className={ handleCheck('sat', list.schedules) ? "weekDate active" : "weekDate"}>
                                                        <span>S</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="createDate">
                                                <button className="btn"><p>{ getTimeSlot(list.schedules)}</p></button>
                                            </div>
                                            <div className="createDate">
                                                <label className="toggleBtn active">
                                                    <input type="checkbox"/>
                                                    <span className="toggler"></span>
                                                </label>
                                                <div className="info_3dot_icon">
                                                    <button className="btn">
                                                        <img src={info_3dot_icon} alt=""/>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div> : ""
            }
            { configModalShow && <CallConfiguration closeModal={closeConfigModal}/> }
        </div>
    );
}

export default CallSetup;