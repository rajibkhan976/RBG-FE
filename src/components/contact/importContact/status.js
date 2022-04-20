import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import fileDoneIcon from "../../../assets/images/fileDoneIcon.svg";
import fileFail_icon from "../../../assets/images/fileFail_icon.svg";
import done_white_icon from "../../../assets/images/done_white.svg";
import {ContactService} from "../../../services/contact/ContactServices";
import Loader from "../../shared/Loader";
import * as actionTypes from "../../../actions/types";
import {useDispatch} from "react-redux";

function Status(props) {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [updatedRecord, setUpdatedRecord] = useState(0);
    const [addedRecord, setAddedRecord] = useState(0);
    const [duplicateType, setDuplicateType] = useState("skip");
    const [isLoader, setIsLoader] = useState(false);
    const [importError, setImportError] = useState("");
    const [importName, setImportName] = useState("");
    const dispatch = useDispatch();
    const fetchDetails = async () => {
        setIsLoader(true);
        let importId = props.importId;
        let status = await ContactService.showStatusOfImport({
            importId: importId
        });
        setTotalRecord(status.totalRecords);
        setUpdatedRecord(status.duplicateCount);
        setImportName(status.importName);
        setAddedRecord(status.newRecordCount);
        setErrors(status.erros);
        setDuplicateType(status.duplicateType);
        setImportError(status.importError);
        setIsLoader(false);
    }
    useEffect(() => {
        fetchDetails()
    }, [])
    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="sideMenuInner importModalContainer">
                    {isLoader ? <Loader /> : ""}
                    <div className="sideMenuHeader">
                        <h3>Import Contacts Status</h3>
                        <p>Upload contacts in your organization</p>
                        <button className="btn btn-closeSideMenu" onClick={props.closeModal}><span></span><span></span></button>
                    </div>
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
                            {
                                importError === "" ?
                                    <div className="fileImportBox green">
                                        <figure className="statusIcon">
                                            <img src={fileDoneIcon} alt="" />
                                        </figure>
                                        <h3>The selected file has been uploaded successfully.</h3>
                                        {addedRecord ?
                                        <Link to={"/contacts?page=1&source=imported+via+" + importName}
                                              onClick={() => setTimeout(() => {window.location.reload()},100)}><div className="uploadFileBtn">
                                            View Records
                                        </div></Link> : ""}
                                    </div>
                                    :
                                    <div className="fileImportBox error">
                                        <figure className="statusIcon">
                                            <img src={fileFail_icon} alt="" />
                                        </figure>
                                        <h3>{ importError }</h3>
                                    </div>
                            }

                            <div className="uploadedDataSummary">
                                <h3>Summary</h3>
                                <ul>
                                    <li>
                                        <div className="summryCell">
                                            <p>Total records</p>
                                            <span>{ totalRecord }</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="summryCell">
                                            <p>Added records</p>
                                            <span>{ addedRecord }</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="summryCell">
                                            <p> { duplicateType === 'skip' ? "Skipped" : "Updated" } records</p>
                                            <span>{ updatedRecord }</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="summryCell error">
                                            <p>Number of errors</p>
                                            <span>{ errors.length }</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="errorList">
                                <h3>Error Details</h3>
                                <ul>
                                    { errors.map((error, index) => (
                                        <li key={index}>
                                            <div className="errorRowNo">{ error.index }:</div>
                                            <p>
                                                { error.message }
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="importModalFooter">
                        <button className={"nextButton lastStepBtn"} onClick={props.closeModal}>
                            <span className="doneStepBtn"><img src={done_white_icon} alt="" /> Close</span>
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Status;
