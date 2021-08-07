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

function Step1(props) {
    const [fileName, setFileName] = useState("Please import file");
    const [fileUploadError, setFileUploadError] = useState(false);
    const [fileImportStatus, setFileImportStatus] = useState(false);
    const [duplicate, setDuplicate] = useState('');
    const [primaryField, setPrimaryField] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const getRandomFileName = () => {
        let timestamp = new Date().toISOString().replace(/[-:.]/g,"");
        let random = ("" + Math.random()).substring(2, 8);
        return timestamp + random;
    }
    const uploadFileFn = (event) => {
        let file = event.target.files[0];
        if (file && file.type === 'text/csv' && file.size < 5000000) {
            const config = {
                bucketName: env.REACT_APP_BUCKET_NAME,
                region: env.REACT_APP_REGION,
                accessKeyId: env.REACT_APP_ACCESS_ID,
                secretAccessKey: env.REACT_APP_ACCESS_KEY,
            };
            let newFileName = getRandomFileName + '.csv';
            setIsLoader(true);
            uploadFile(file, config)
                .then(data => {
                    setIsLoader(false);
                    setUploadedFile(data.location)
                    setFileName(file.name);
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
    const submitFirstStep = async () => {
        if (uploadedFile === '') {
            setFileUploadError(true);
        } else {
            let payload = {
                'file': uploadedFile,
                'duplicate': duplicate,
                'primaryField': primaryField
            }
            setIsLoader(true);
            let uploadedFileResponse = await ImportContactServices.uploadFile(JSON.stringify(payload));
            setIsLoader(false);
            if (uploadedFileResponse.data.success) {
                let headers = uploadedFileResponse.data.headers;
                let totalRecord = uploadedFileResponse.data.totalRecords;
                let object = {
                    file: uploadedFile,
                    headers: headers,
                    totalRecords: totalRecord,
                    duplicate: duplicate,
                    primaryField: primaryField
                }
                props.setState('custom', object);
                props.next();
            } else {
                console.log("api error ! " + uploadedFileResponse.data.message);
            }
        }
    }
    useEffect(() => {
        setDuplicate('skip');
        setPrimaryField('email');
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
                        <li className="importStape" data-step="3">Import Summary</li>
                    </ul>
                </div>
                <div id="step_1" className="">
                    <div className="infoInputs">
                        <ul>
                            <li>
                                <div className="formField w-50">
                                    <label>Import data for</label>
                                    <div className="inFormField">
                                        <select name="" id="" style={{backgroundImage: "url(" + arrowDown + ")",}} disabled={true}>
                                            <option value="">Contacts</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="formField w-50">
                                    <label>Import based on</label>
                                    <div className="inFormField">
                                        <select name="primaryField" value={primaryField} onChange={handlePrimaryField} id="" style={{backgroundImage: "url(" + arrowDown + ")",}}>
                                            <option value="email">Email Id</option>
                                            <option value="phone">Phone</option>
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
                                [Only csv format file is supported]<br />Maximum upload size is 5 MB
                            </p>
                            <div className={fileImportStatus ? "uploadFileBtn" : "uploadFileBtn fileInput"}>
                                {fileImportStatus ? "Remove & New" : "Upload File"}
                                <input type="file" id="uploadContactFile" onChange={uploadFileFn} accept=".csv"/>
                            </div>
                            <a href="" className={fileImportStatus ? "hide" : "downloadSample"}>Download sample template for Import</a>
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