import React from "react";
import fileDoneIcon from "../../../assets/images/fileDoneIcon.svg";
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
                        <li className="importStape active" data-step="3">Import Summary</li>
                    </ul>
                </div>
                <div id="step_5">
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
                                    <span>{custom.totalRecords}</span>
                                </div>
                            </li>
                            <li>
                                <div className="summryCell">
                                    <p>Total records updated</p>
                                    <span>{custom.duplicateCount}</span>
                                </div>
                            </li>
                            <li>
                                <div className="summryCell">
                                    <p>Total records skipped</p>
                                    <span>{custom.newData}</span>
                                </div>
                            </li>
                            <li>
                                <div className="summryCell error">
                                    <p>Number of errors</p>
                                    <span>{custom.errors.length}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="errorList">
                        <h3>Error Details</h3>
                        <ul>
                            { custom.errors.map((error) =>
                                <li>
                                    <div className="errorRowNo">Row 2:</div>
                                    <p>
                                        {error}
                                    </p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="importModalFooter">
                <button className={"nextButton lastStepBtn"} onClick={() => props.handleParentFun()}>
                    <span className="doneStepBtn"><img src={done_white_icon} alt="" /> Finish</span>
                </button>
                <p className="stapeIndicator">Step: {props.current} of 3</p>
            </div>
        </>

    );
}

export default FinalStep;
