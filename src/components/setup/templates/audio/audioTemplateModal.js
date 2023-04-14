import React, { useState, useEffect } from "react";
import Recoder from "../../../shared/Recoder";

import music_file_icon from "../../../../assets/images/music_file_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import cross from "../../../../assets/images/cross.svg";
import { AudioServices } from "../../../../services/template/AudioServices";
import { bucketUrl } from "../../../../configuration/config";
import Player from "../../../shared/Player";
import Loader from "../../../shared/Loader";

const AudioTemplateModal = (props) => {
    const [isLoader, setIsLoader] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("upload");
    const [file, setFile] = useState("");
    const [oldAudio, setOldAudio] = useState(null);
    const [saveAndNew, setSaveAndNew] = useState(false);

    const [formErrors, setFormErrors] = useState({
        title: "",
        description: "",
        file: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const messageDelay = 5000; // ms

    /**
     * Auto hide success or error message
     */
    useEffect(() => {
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [errorMsg])

    //Edit form set up
    useEffect(() => {
        console.log('Edit row', props.editData);
        if (props.isEdit && props.editData) {
            setTitle(props.editData.title);
            setDescription(props.editData.description);
            //Set audio 
            let audio = new Audio(bucketUrl + props.editData.trackName);
            setOldAudio(audio);
        }

    }, [props.isEdit, props.editData]);

    //Title
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    //Description
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    /**
     * Handle upload audio
     * @param {*} e 
     */
    const handleAudioUpload = (event) => {
        let files = event.target.files;
        if (files && files.length) {
            let reader = new FileReader();
            reader.onload = (r) => {
                console.log('Reader', r);
                setFile(r.target.result);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    /**
     * Get data set
     * @param {*} dataFromChild
     */
    const getDataFn = (dataFromChild) => {
        console.log('data from child in modal', dataFromChild);
        //Getting blob as data from recorder
        if (dataFromChild) {
            let reader = new FileReader();
            reader.onload = (r) => {
                setFile(r.target.result);
            };
            reader.readAsDataURL(dataFromChild);
        }
    }


    /**
     * Handle submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setProcessing(true);

        let isError = false;

        /**
         * Check title field
         */
        if (!title) {
            isError = true;
            formErrors.title = "Please fillup the title";
        } else {
            formErrors.title = null;
        }

        /**
         * Check description field
         */
        if (!description) {
            isError = true;
            formErrors.description = "Please fillup the description";
        } else {
            formErrors.description = null;
        }

        /**
         * Check file field
         */
        if (!file && !props.isEdit) {
            isError = true;
            formErrors.file = "Please record or upload an audio file.";
        } else {
            formErrors.file = null;
        }

        /**
        * Check the erros flag
        */
        if (isError) {
            setFormErrors({
                title: formErrors.title,
                description: formErrors.description,
                file: formErrors.file
            });
            setTimeout(
                () => setFormErrors({
                    ...formErrors,
                    title: "",
                    description: "",
                    file: ""
                }),
                5000
            );
            console.log('error before form submit', formErrors);

        } else {

            /**
             * Submit audio template create form
             */
            let payload = {
                title: title,
                description: description,
                file: file
            };
            console.log('Ultimately form submit payload', payload);

            /**
             * Lets decide the operation type
             */
            let oprationMethod = "createTemplate";
            if (props.isEdit) {
                oprationMethod = "editTemplate";
                payload.id = props.editData.active;
            }

            try {
                setIsLoader(true);
                const result = await AudioServices[oprationMethod](payload)
                if (result) {
                    setSuccessMsg(`Audio template ${props.isEdit ? 'update' : 'created'} successfully`);
                    setTimeout(() => { setSuccessMsg(""); props.closeModal(); props.fetchAudios(1); }, messageDelay);
                }
                setProcessing(false);
                setIsLoader(false);
            } catch (e) {
                /**
                 * Segregate error by http status
                 */
                setIsLoader(false);
                setProcessing(false);
                console.log("Error in audio template create", e)
                setErrorMsg(e.message)

            }
        }
    }

    /**
     * Save and new functionality
     */
    const handleSaveAndNew = () => {
        setSaveAndNew(true);
    }

    return (
        <div className="modalBackdrop">
            {isLoader ? <Loader /> : ''}
            <div className="modalBackdropBg" onClick={props.closeModal} ></div>
            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={props.closeModal} >
                        {/* <span></span><span></span>*/}
                        <img src={cross} alt="" /> 
                    </button>
                    <h3>{props.isEdit ? 'Edit' : 'Add'} an Audio Template</h3>
                        <p>Fill out below details to {props.isEdit ? 'edit' : 'create a new'}  Audio Template</p>
                </div>
                <div className="modalForm">
                 
                    {successMsg &&
                        <div className="popupMessage success innerDrawerMessage">
                            <p>{successMsg}</p>
                        </div>
                    }
                    {errorMsg &&
                        <div className="popupMessage error innerDrawerMessage">
                            <p>{errorMsg}</p>
                        </div>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="cmnFormRow">
                            <div className="cmnFieldName">Audio Title</div>
                            <div className={formErrors.title ? "cmnFormField error" : "cmnFormField"}>
                                <input
                                    type="text"
                                    className="cmnFieldStyle"
                                    onChange={handleTitleChange}
                                    defaultValue={title ? title : ''}
                                />
                                {formErrors.title ? <span className="errorMsg">{formErrors.title}</span> : ''}
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            <div className="cmnFieldName">Audio Description</div>
                            <div className={formErrors.description ? "cmnFormField error" : "cmnFormField"}>
                                <textarea className="cmnFieldStyle"
                                    defaultValue={description ? description : ''}
                                    onChange={handleDescriptionChange}
                                >
                                </textarea>
                                {formErrors.description ? <span className="errorMsg">{formErrors.description}</span> : ''}
                            </div>
                        </div>
                        {oldAudio ?
                            <div className="cmnFormRow">
                                <div className="cmnFieldName">Existing Audio</div>
                                <Player audioElement={oldAudio} preview={true} trackName={title}/>
                            </div> : ''}
                        <div className="cmnFormRow">
                            <div className="cmnFieldName">Select Type</div>
                            <div className="cmnFieldName" style={{width: "14px"}}>&nbsp;</div>
                            <div className="cmnFormField radioGroup">
                                <label className="cmnFormRadioLable">
                                    <div className="circleRadio" onClick={() => { setType('upload') }}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="upload"
                                            defaultChecked={type === "upload"}
                                        />
                                        <span></span>
                                    </div>
                                    Upload Audio
                                </label>
                                <label className="cmnFormRadioLable">
                                    <div className="circleRadio" onClick={() => { setType('record') }}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="record"
                                            defaultChecked={type === "record"}
                                        />
                                        <span></span>
                                    </div>
                                    Record Audio
                                </label>
                            </div>
                        </div>
                        <div className="cmnFormRow">
                            {
                                type === 'upload' ?
                                    <React.Fragment>
                                        <div className="cmnFieldName">Upload an Audio</div>
                                        <input type="file" onChange={(e) => handleAudioUpload(e)} />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <div className="cmnFieldName">Record an Audio</div>
                                        <Recoder getData={getDataFn} />
                                    </React.Fragment>
                            }
                            {formErrors.file ? <span className="errorMsg">{formErrors.file}</span> : ''}
                        </div>

                        <div className="cmnFormRow">
                            <div className={props.isEdit ? "formActBtnWrap small" : "formActBtnWrap numList"}>
                                <button className="saveNnewBtn numSave" disabled={processing}>
                                    Save <img src={arrow_forward} alt="" />
                                </button>
                                {!props.isEdit && <button className="saveNnewBtn numSaneNnew" disabled={processing} onClick={handleSaveAndNew}>
                                    Save & New <img src={arrow_forward} alt="" />
                                </button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default AudioTemplateModal;
