import React from "react";
import fileDoneIcon from "../../../assets/images/fileDoneIcon.svg";
import fileFail_icon from "../../../assets/images/fileFail_icon.svg";
import done_white_icon from "../../../assets/images/done_white.svg";

function FinalStep(props) {
    const custom = props.getState('custom');
    return (
        <>
            <div className="importModalBody">
                <div className="importStapeList">
                    <ul>
                        <li className="importStape active" data-step="1">Upload File<span>&gt;</span></li>
                        <li className="importStape active" data-step="2">Mapping Details<span>&gt;</span></li>
                        <li className="importStape active" data-step="2">Confirm Mapping<span>&gt;</span></li>
                        <li className="importStape active" data-step="3">Summary</li>
                    </ul>
                </div>
                <div id="step_5">
                    {
                        custom.status ?
                            <div className="fileImportBox green">
                                <figure className="statusIcon">
                                    <img src={fileDoneIcon} alt="" />
                                </figure>
                                <h3>{custom.message}</h3>
                            </div>
                            :
                            <div className="fileImportBox red">
                                <figure className="statusIcon">
                                    <img src={fileFail_icon} alt="" />
                                </figure>
                                <h3>{custom.message}</h3>
                            </div>
                    }
                </div>
            </div>
            <div className="importModalFooter">
                <button className={"nextButton lastStepBtn"} onClick={() => props.handleParentFun()}>
                    <span className="doneStepBtn"><img src={done_white_icon} alt="" /> Close</span>
                </button>
                {/*<button className={"nextButton lastStepBtn"} onClick={() => props.handleParentFun()}>
                    <span className="doneStepBtn"><img src={done_white_icon} alt="" /> Import again</span>
                </button>*/}
                <p className="stapeIndicator">Step: {props.current} of 3</p>
            </div>
        </>

    );
}

export default FinalStep;
