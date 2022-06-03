import React, {useEffect, useState} from "react";
import arrowDown from "../../../assets/images/arrowDown.svg";
import fileDoneIcon from "../../../assets/images/fileDoneIcon.svg";
import fileFail_icon from "../../../assets/images/fileFail_icon.svg";
import download_cloud_icon from "../../../assets/images/download_cloud_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import { uploadFile } from 'react-s3';
import env from "../../../configuration/env"
import {ImportContactServices} from "../../../services/contact/importContact";
import Loader from "../../shared/Loader";
import {PhasesServices} from "../../../services/contact/phasesServices";
import info_icon from "../../../assets/images/infos.svg";
import {useDispatch} from "react-redux";
import * as actionTypes from "../../../actions/types";

function Step1(props) {
    const [fileName, setFileName] = useState("Please import file");
    const [fileUploadError, setFileUploadError] = useState(false);
    const [fileImportStatus, setFileImportStatus] = useState(false);
    const [duplicate, setDuplicate] = useState('');
    const [primaryField, setPrimaryField] = useState('');
    const [importType, setImportType] = useState('data');
    const [uploadedFile, setUploadedFile] = useState('');
    const [importName, setImportName] = useState('');
    const [importNameError, setImportNameError] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [phases, setPhases] = useState([]);
    const [status, setStatus] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPhase, setSelectedPhase] = useState("");
    const [statusError, setStatusError] = useState("");
    const dispatch = useDispatch();
    const getRandomFileName = () => {
        let timestamp = new Date().toISOString().replace(/[-:.]/g,"");
        let random = ("" + Math.random()).substring(2, 8);
        return timestamp + random;
    }
    const uploadFileFn = (event) => {
        let file = event.target.files[0];
        if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel' ||
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') && file.size < 5000000) {
            let extension = file.name.split('.').pop();
            let newFileName = getRandomFileName() + '.' + extension;
            const config = {
                bucketName: env.REACT_APP_BUCKET_NAME,
                region: env.REACT_APP_REGION,
                accessKeyId: env.REACT_APP_ACCESS_ID,
                secretAccessKey: env.REACT_APP_ACCESS_KEY
            };
            setIsLoader(true);
            let oldFileName = file.name;
            Object.defineProperty(file, 'name', {
                writable: true,
                value: newFileName
            });
            uploadFile(file, config)
                .then(data => {
                    setIsLoader(false);
                    setUploadedFile(data.location)
                    setFileName(oldFileName);
                    setFileImportStatus(true);
                    setFileUploadError(false);
                })
                .catch(err => {
                    setIsLoader(false);
                    setFileUploadError(true);
                    setFileName('');
                    setFileImportStatus(false);
                })
        } else {
            setFileUploadError(true);
            setFileName('');
            setFileImportStatus(false);
        }
    }
    const handleDuplicate = (event) => {
        setDuplicate(event.target.value);
    }
    const handlePrimaryField = (event) => {
        setPrimaryField(event.target.value);
    }
    const handleImportType = (event) => {
        setImportType(event.target.value);
    }
    const handleImportName = (event) => {
        if (event.target.value.length > 20) {
            setImportNameError('Please provide name with 20 characters only.');
            setTimeout(() => {
                setImportNameError('');
            }, 5000);
        } else {
            setImportName(event.target.value);
        }
    }
    const handlePhaseChange = (event) => {
        setSelectedPhase(event.target.value);
        if (event.target.value) {
            let searchResultPhases = phases.find(ele => ele._id === event.target.value);
            setStatus(searchResultPhases.statuses)
        } else {
            setStatus([]);
        }
    }
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setStatusError("");
    }
    const downLoadSample = (e) => {
      e.preventDefault();
    }
    const submitFirstStep = async () => {
        if (uploadedFile === '' || importName === '' || (selectedPhase !== "" && (selectedStatus === "" || selectedStatus === undefined))) {
            if (importName === '') {
                setImportNameError('Please provide name for this import.')
            }
            if (uploadedFile === '') {
                setFileUploadError(true);
            }
            if (selectedPhase !== "" && (selectedStatus === "" || selectedStatus === undefined)) {
                setStatusError("Please select a status.")
            }
            setTimeout(() => {
                setImportNameError("");
                setStatusError("");
                setFileUploadError(false)
            }, 5000)
        } else {
            let payload = {
                'file': uploadedFile,
                'duplicate': duplicate,
                'primaryField': primaryField,
                'name': importName,
                'defaultPhase': selectedPhase,
                'defaultStatus': selectedStatus
            }
            try {
                setIsLoader(true);
                let uploadedFileResponse = await ImportContactServices.uploadFile(JSON.stringify(payload));
                if (uploadedFileResponse.data.success) {
                    let headers = uploadedFileResponse.data.headers;
                    let totalRecord = uploadedFileResponse.data.totalRecords;
                    let object = {
                        file: uploadedFile,
                        headers: headers,
                        totalRecords: totalRecord,
                        duplicate: duplicate,
                        primaryField: primaryField,
                        importType: importType,
                        importName: importName,
                        defaultPhase: selectedPhase,
                        defaultStatus: selectedStatus
                    }
                    props.setState('custom', object);
                    props.next();
                } else {
                    console.log('uploadedFileResponse',uploadedFileResponse.data.error);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: "api error ! " + uploadedFileResponse.data.message + ". Please check and save your file properly first.",
                        typeMessage: 'error'
                    });
                }
            } catch (e) {
                if(e.response && e.response.data && e.response.data.message) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: e.response.data.message,
                        typeMessage: 'error'
                    });
                } else if(e.response && e.response.data && typeof e.response.data == "string") {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: e.response.data,
                        typeMessage: 'error'
                    });
                } else {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: e.message + ". Please contact support.",
                        typeMessage: 'error'
                    });
                }
            } finally {
                setIsLoader(false);
            }
        }
    }
    const fetchPhases = async () => {
        setIsLoader(true);
        let phases = await PhasesServices.fetchPhases();
        setIsLoader(false);
        setPhases(phases.phases);
    }
    useEffect(() => {
        setDuplicate('skip');
        setPrimaryField('email');
        fetchPhases();
    }, []);
    return (
        <>
            {isLoader ? <Loader /> : ""}
            <div className="importModalBody">
                <div className="importStapeList">
                    <ul>
                        <li className="importStape active" data-step="1">Upload File<span>&gt;</span></li>
                        <li className="importStape" data-step="2">Mapping Details<span>&gt;</span></li>
                        <li className="importStape" data-step="2">Confirm Mapping<span>&gt;</span></li>
                        <li className="importStape" data-step="3">Summary</li>
                    </ul>
                </div>
                <div id="step_1" className="">
                    <div className="infoInputs">
                        <ul>
                            <li>
                                <div className={"formField w-50 " + (importNameError ? 'error' : '')}>
                                    <label>Save this import as <span className="mandatory">*</span></label>
                                    <div className="inFormField">
                                        <input type="text" name="importDataName" className="importName" value={importName} onChange={handleImportName}/>
                                        {importNameError ? <span className="errorMsg">{importNameError}</span> : ''}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="formField w-50">
                                    <label>Import data for</label>
                                    <div className="inFormField">
                                        <select name="" id=""  value={importType} onChange={handleImportType} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                            <option value="leads">Leads</option>
                                            <option value="contacts">Contacts</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="formField w-50">
                                    <label>Import based on</label>
                                    <div className="inFormField">
                                        <select name="primaryField" value={primaryField} onChange={handlePrimaryField} id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                            <option value="email">Email Id</option>
                                            <option value="phone">Phone</option>
                                            <option value="both">Both</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="formField w-50">
                                    <label>
                                        Phase &nbsp;
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo amount">Select a phase for all the contacts which will be imported into the system.</span>
                                        </span>
                                    </label>
                                    <div className="inFormField">
                                        <select name="" id=""  value={selectedPhase} onChange={handlePhaseChange} style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                            <option value="">Select a Phase</option>
                                            {
                                                phases.map(ele => {
                                                    if (ele.statuses.length && ele.statuses[0]._id !== undefined) {
                                                        return (<option value={ele._id}>{ele.name}</option>)
                                                    }
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className={"formField w-50 " + (statusError ? 'error' : '')}>
                                    <label>
                                        Status  &nbsp;
                                        <span className="infoSpan">
                                            <img src={info_icon} alt="" />
                                            <span className="tooltiptextInfo amount">Select a status for all the contacts which will be imported into the system.</span>
                                        </span>
                                    </label>
                                    <div className="inFormField">
                                        <select name="primaryField" value={selectedStatus} onChange={handleStatusChange} id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                            <option value="">Select a Status</option>
                                            {
                                                status.map(ele => {
                                                    return (<option value={ele._id}>{ele.name}</option>)
                                                })
                                            }
                                        </select>
                                        {statusError ? <span className="errorMsg">{statusError}</span> : ''}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="formField spclField">
                                    <p className="spclLabel">In case of duplicates</p>
                                    <div className="radioGroup">
                                        <label>
                                            <div className="circleRadio">
                                                <input type="radio" name="duplicates" value="skip" checked={duplicate === 'skip'} onChange={handleDuplicate}/>
                                                <span></span>
                                            </div>
                                            Skip
                                        </label>
                                        <label>
                                            <div className="circleRadio">
                                                <input type="radio" name="duplicates" value="overwrite" checked={duplicate === 'overwrite'} onChange={handleDuplicate}/>
                                                <span></span>
                                            </div>
                                            Overwrite
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className={"fileImportBox " + (fileUploadError ? 'error' : '')}>
                            <figure className="statusIcon">
                                { fileUploadError ?
                                    <img src={fileFail_icon} alt="" />
                                    : <img src={fileImportStatus ? fileDoneIcon : download_cloud_icon} alt="" />
                                }
                            </figure>
                            <h3>{fileImportStatus ? fileName : "Choose the file to be imported"}</h3>
                            <p className={fileImportStatus ? "inportInfo hide" : "inportInfo"}>
                                [Only csv/xlsx/xls file format is supported]<br />Maximum upload size should be 5 MB
                            </p>
                            <div className={fileImportStatus ? "uploadFileBtn" : "uploadFileBtn fileInput"}>
                                {fileImportStatus ? "Remove & New" : "Upload File"}
                                <input type="file" id="uploadContactFile" onChange={uploadFileFn} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                            </div>
                            <a href="https://rbg-file-upload.s3.amazonaws.com/testCsv.csv" target="_blank" className={fileImportStatus ? "hide" : "downloadSample"}>Download sample template for Import</a>
                        </div>
                    </div>
                    <div className="importNote">
                        <h4>*NOTE:</h4>
                        <p>
                            Import sheet, if duplicate record is found based on <span>“{primaryField}”</span> the last duplicate row will be taken as valid record.
                        </p>
                    </div>
                </div>
            </div>
            <div className="importModalFooter">
                <button className={"nextButton"} onClick={submitFirstStep}>
                    <span>Next <img src={arrow_forward} alt="" /></span>
                </button>
                <p className="stapeIndicator">Step: {props.current} of 3</p>
            </div>
        </>
    );
}

export default Step1;