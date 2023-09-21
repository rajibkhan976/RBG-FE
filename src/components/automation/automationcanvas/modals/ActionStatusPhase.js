import closewhite24dp from "../../../../assets/images/close_white_24dp.svg";
import chevron_right_white_24dp from "../../../../assets/images/chevron_right_white_24dp.svg";
import React, {useEffect, useState} from "react";
import Loader from "../../../shared/Loader";
import { useSelector } from "react-redux";

const ActionStatusPhaseModal = (props) => {
    const [statusList, setStatusList] = useState([]);
    const [phaseList, setPhaseList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [status, setStatus] = useState(props.status);
    const [phase, setPhase] = useState(props.phase);
    const [statusError, setStatusError] = useState("");
    const [phaseError, setPhaseError] = useState("");

    const phaseData = useSelector((state)=> state.filter?.data);
    useEffect(()=>{
        if(phaseData){
            console.log(phaseData?.phase);
            setPhaseList(phaseData.phase);
        }
    },[phaseData]);

    const handlePhaseChange = (event) => {
        setPhase(event.target.value);
        setPhaseError("");
        if (event.target.value) {
            let searchResultPhases = phaseList.find(ele => ele._id == event.target.value);
            if (searchResultPhases !== undefined) {
                setStatusList(searchResultPhases.statuses)
            }
        } else {
            setStatusList([]);
        }
    }
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setStatusError("");
    }
    const saveAction = () => {
      if (status === "" || phase === "") {
          if (status === "") {
              setStatusError("bounce");
          }
          if (phase === "") {
              setPhaseError("bounce");
          }
      } else {
          props.saveStatusPhase(props.nodeId, status, phase);
      }
      removeClass();
    }

    useEffect(() => {
        if (props.phase && phaseList.length > 0) {
            let searchResultPhases = phaseList.find(ele => ele._id === props.phase);
            if (searchResultPhases !== undefined) {
                setStatusList(searchResultPhases.statuses);
            }
        }
    }, [phaseList]);
    const removeClass = () => {
        setTimeout(() => {
            setStatusError("");
            setPhaseError("");
        }, 1500);
    };
    return (
        <div className="automationModal filterModal">
            {isLoader ? <Loader /> : ""}
            <div className='automationModalBg' onClick={props.closeFilterModal}></div>
            <div className="nodeSettingModal statusPhaseSettingModal">
                <div className="formHead">
                    <div className="heading">
                        <p>Status & Phase Settings</p>
                    </div>
                    <div className="closeButton">
                        <button onClick={props.closeFilterModal}>
                            <img src={closewhite24dp} alt="Close Filter Modal" />
                        </button>
                    </div>
                </div>
                <div className="formBody">
                    <div className="formBodyContainer">
                        <div className="emailDetails">
                            <div className="inputField">
                                <label htmlFor="phase">Phase</label>
                                <div className="inFormField d-flex">
                                    <select className={`formField ${phaseError}`} value={phase} onChange={handlePhaseChange}>
                                        <option value="">Select Phase</option>
                                        {
                                            phaseList.map(ele => {
                                                if (ele.statuses.length && ele.statuses[0]._id !== undefined) {
                                                    return (<option value={ele._id}>{ele.name}</option>)
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="inputField">
                                <label htmlFor="status">Status</label>
                                <div className="inFormField d-flex">
                                    <select className={`formField ${statusError}`}  value={status} onChange={handleStatusChange}>
                                        <option value="">Select Status</option>
                                        {
                                            statusList.map(ele => {
                                                return (<option value={ele._id}>{ele.name}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="saveButton">
                            <button onClick={saveAction}>Save <img src={chevron_right_white_24dp} alt="" /></button> {/*onClick={saveDelay}*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
export default ActionStatusPhaseModal;