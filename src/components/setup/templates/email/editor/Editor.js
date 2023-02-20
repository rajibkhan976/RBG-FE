import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ErrorAlert, SuccessAlert, WarningAlert } from "../../../../shared/messages";
import browse_keywords from "../../../../../assets/images/icon_browse_keywords.svg";
import { utils } from "../../../../../helpers";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";


import { SMSServices } from "../../../../../services/template/SMSServices";

import {EmailServices} from "../../../../../services/setup/EmailServices";
import * as actionTypes from "../../../../../actions/types";
import {useDispatch} from "react-redux";
import { preventDefault } from "@fullcalendar/react";
import { forwardRef } from "react";
import MergeTag from "../../../../shared/MergeTag";


const EditorComponent = (props) => {
    const dispatch = useDispatch();

    const [dirty, setDirty] = useState(false)
    const [emailTemplate, setEmailTemplate] = useState({})
    const [max, setMax] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");
    const [keywordSuggesion, setKeywordSuggesion] = useState(false);
    const [keywordTextSuggesion, setKeywordTextSuggesion] = useState(false);
    const [editMail, setEditMail] = useState({
        title: "",
        header: "",
        message: ""
    })
    let initialValue = (props.initialData ? props.initialData.template : "Type here...");
    const [value, setValue] = useState("");
    const [createdValue, setCreatedValue] = useState("");
    const editHeaderRef = useRef(null)
    const editorRef = useRef(null);
    const editorCreateRef = useRef(null);
    const createTextArea = useRef(null)
    const [editHasError, setEditHasError] = useState(false);
    const [editErrorState, setEditErrorState] = useState({
        header: "",
        message: ""
    })
    const [isLoader, setIsLoader] = useState(false);
    const [emailTags, setEmailTags] = useState([]);
    const [searchTagString, setSearchTagString] = useState("");
    const [searchTagStringEditSub, setSearchTagStringEditSub] = useState("");
    const [searchTagStringEditTemp, setSearchTagStringEditTemp] = useState("");
    const [searchTagStringSend, setSearchTagStringSend] = useState("");


    const fetchEmailTags = async () => {
        try {
            const result = await SMSServices.fetchSMSTags()
            if(result) {
                // console.log("result", result);
                setEmailTags(result)
            }
        } catch (error) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: error.message,
                typeMessage: 'error'
            });
        }
    }



    // save edited data as email content
    const editedEmail = (mailValue) => {
        if (mailValue.length === 0 || mailValue.trim() === "") {
            setEditHasError(true)
            setEditErrorState({
                ...editErrorState,
                message: "Please provide a proper Email Content!"
            })
        } else {
            setEditErrorState({
                ...editErrorState,
                message: ""
            })
        }
        setValue(mailValue)
        editorRef.current.setDirty(false);
        setDirty(false)
    }
    // save edited data as email content

    // save new data as email content
    const createEmail = (createValue) => {
        console.log("createValue in function", createValue);
        setCreatedValue(createValue)
        props.createdEmailTemplate(createValue)
        editorCreateRef.current.setDirty(false);
        setDirty(false)
    }

    const editorHandler = (editorVal) => {
        console.clear();
        props.globalTemplateValue(editorVal);
    }
    // save new data as email content



    let subject = editHeaderRef.current?.value;
    let template = utils.encodeHTML(value);
    let payloadEditedData = {
        title: emailTemplate.title,
        subject: subject,
        template: utils.encodeHTML(value) ? template : emailTemplate.template,
    };

    //console.log("payload",payloadEditedData);

    emailTemplate && emailTemplate._id && props.editorToPreview(payloadEditedData);

    // add keywords to edit email header
    const editKeywordEmail = (e, field) => {
        e.preventDefault()
        // console.log(e.target);
        let subjectEditInput = editHeaderRef.current;
        let cursorStart = subjectEditInput.selectionStart;
        let cursorEnd = subjectEditInput.selectionEnd;
        let textValue = subjectEditInput.value;
        let vall = field
        try {
            if (cursorStart || cursorStart == "0"
            ) {
                var startToText = "";
                subjectEditInput.value =
                    subjectEditInput.value.substring(0, cursorStart) +
                    " [" +
                    e.target.textContent +
                    "] " +
                    subjectEditInput.value.substring(cursorEnd, textValue.length);

                setEditMail({
                    ...editMail,
                    header: subjectEditInput.value
                })

                startToText =
                    subjectEditInput.value.substring(0, cursorStart) +
                    "[" +
                    e.target.textContent +
                    "]";

                subjectEditInput.focus();
                subjectEditInput.setSelectionRange(
                    startToText.length + 1,
                    startToText.length + 1
                );

                // console.log(subjectEditInput, cursorStart, cursorEnd, textValue);
            } else {
                subjectEditInput.value = subjectEditInput.value + " [" + e.target.textContent + "] ";

                setEditMail({
                    ...editMail,
                    header: subjectEditInput.value
                })
                subjectEditInput.focus();
            }
        } catch (err) {
            setErrorMsg(err)
            setTimeout(() => {
                setErrorMsg("")
            }, 5000);
        }
    }
    // add keywords to edit email header


    // add keywords to edit email template
    const editKeywordTextEmail = (e,field) => {
        e.preventDefault();
        let iframeEdit = editorRef.current;
        let cursorStart = iframeEdit.selectionStart;
        let cursorEnd = iframeEdit.selectionEnd;
        let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

        let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel, range;
        let vall = field ;

        if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt( e.target.textContent);
                range.insertNode(document.createTextNode(vall));

                sel.collapseToEnd();
                setValue(editorRef.current.getContent())
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = vall;
            setValue(editorRef.current.getContent())
        }
    }
    // add keywords to edit email template

    // add keywords to create email template
    const createKeywordTextEmail = (e,field) => {
        e.preventDefault();
        let iframeEdit = editorCreateRef.current.iframeElement;
        let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

        let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel, range;
        let vall = field ;

        if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.insertNode(document.createTextNode(vall));
                sel.collapseToEnd();
                setCreatedValue(editorCreateRef.current.getContent())
                props.createdEmailTemplate(editorCreateRef.current.getContent())
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = vall;
            setCreatedValue(editorCreateRef.current.getContent())
            props.createdEmailTemplate(editorCreateRef.current.getContent())
        }
    }

    // add keywords to send email template
    const editKeywordSendEmail = (e,field) => {
        e.preventDefault();
        let iframeEdit = editorRef.current;
        let cursorStart = iframeEdit.selectionStart;
        let cursorEnd = iframeEdit.selectionEnd;
        let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

        let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel, range;
        let vall = field ;

        if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt( e.target.textContent);
                range.insertNode(document.createTextNode(vall));

                sel.collapseToEnd();
                setValue(editorRef.current.getContent())
                props.globalTemplateValue(editorRef.current.getContent())
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = vall;
            setValue(editorRef.current.getContent())
            props.globalTemplateValue(editorRef.current.getContent())
        }
    }

    // add error message on edit email header
    const checkEditTitle = (e) => {
        if (e.target.value.trim() === "" || e.target.value.length === 0) {
            setEditHasError(true)

            setEditErrorState({
                ...editErrorState,
                header: "Please give some Title.",
            })
        } else {
            setEditErrorState({
                ...editErrorState,
                header: "",
            })
        }
    }
    // add error message on edit email header

    useEffect(() => {
        if(props.initialData) {
            setEmailTemplate(props.initialData);
        }
    }, [props.initialData]);
    useEffect(() => {
        fetchEmailTags()
    }, []);
    const base_url = window.location.origin;

    const example_image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', base_url);

        xhr.upload.onprogress = (e) => {
            progress(e.loaded / e.total * 100);
        };

        xhr.onload = () => {
            if (xhr.status === 403) {
                reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
                return;
            }

            if (xhr.status < 200 || xhr.status >= 300) {
                reject('HTTP Error: ' + xhr.status);
                return;
            }

            const json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
                reject('Invalid JSON: ' + xhr.responseText);
                return;
            }

            resolve(json.location);
        };

        xhr.onerror = () => {
            reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };

        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
    });





    return (
        <>
            {
                props.createNew ?
                    <>
                        <div className={max ? "editorEmailShell h-100 maximize" : "editorEmailShell h-100"} id="createTextArea"
                             ref={createTextArea}>
                            {max && <h6>Email Body</h6>}
                            <Editor
                                apiKey="u8o9qjaz9gdqhefua3zs1lyixgg709tgzlqredwdnd0452z0"
                                statusBar={true}
                                onInit={(evt, editor) => (editorCreateRef.current = editor)}
                                onDirty={() => setDirty(true)}
                                theme="advanced"
                                onEditorChange={(newText) => createEmail(newText)}
                                init={{
                                    height: "100%",
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image charmap print preview anchor",
                                        "searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table paste code help wordcount save autosave",
                                    ],
                                    file_picker_types: "file image media",
                                    automatic_uploads: true,
                                    relative_urls: false,
                                    remove_script_host : false,
                                    document_base_url: base_url,

                                    toolbar: [
                                        "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
                                        "undo redo | help",
                                    ],
                                    autosave_interval: "10s",
                                    save_enablewhendirty: true,

                                }}
                            />

                            <div className="createEmailButtons">
                                {/* <button
                                    className="inlinle-btn browseKeywords createBrowseKeywords"
                                    type="button"
                                    style={{
                                        marginRight: "0",
                                        padding: "0",
                                    }}
                                    onClick={(e) => {
                                        setKeywordSuggesion(false)
                                        setKeywordTextSuggesion(true)
                                        e.preventDefault()
                                    }
                                    }
                                >
                                    <img src={browse_keywords} alt="keywords" />
                                </button> */}

                                {/* {keywordTextSuggesion && <div className="keywordBox keywordsCreateText">
                                    <div className="searchKeyword">
                                        <div className="searchKeyBox">
                                            <input type="text"
                                                   onChange={(e) => setSearchTagString(e.target.value)}
                                                   onKeyPress={e => {
                                                       if (e.key === 'Enter') e.preventDefault();
                                                   }}
                                            />
                                        </div>
                                        <div className="cancelKeySearch">
                                            <button
                                                onClick={() => {setKeywordTextSuggesion(false)
                                                    setSearchTagString("")}}
                                            ></button>
                                        </div>
                                    </div>
                                    <div className="keywordList">
                                        <ul>
                                            {emailTags
                                                .filter((smsTag) => smsTag.id.indexOf(searchTagString) >= 0
                                                    && smsTag.id !== "tags"
                                                    && smsTag.id !== "phone"
                                                    && smsTag.id !== "mobile"
                                                    && smsTag.id !== "momCellPhone"
                                                    && smsTag.id !== "dadCellPhone"
                                                    && smsTag.id !== "createdBy"
                                                    && smsTag.id !== "createdAt"
                                                    && smsTag.id !== "statusName"
                                                    && smsTag.id !== "phaseName"
                                                    && smsTag.id !== "contactType"
                                                )
                                                .map((tagItem, i) => (
                                                    <li key={"keyField" + i}>
                                                        <button
                                                            onClick={(e) =>
                                                                createKeywordTextEmail(e, tagItem.id)
                                                            }
                                                        >
                                                            {tagItem.id}
                                                        </button>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>} */}
                                <button
                                    className="inlinle-btn btnMaximize"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setMax(!max)
                                    }}
                                >
                                    {max ?
                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.40014 6.99964H1V3.40014C1 2.76358 1.25287 2.1531 1.70299 1.70299C2.1531 1.25287 2.76358 1 3.40014 1H6.99964V3.40014H3.40014V6.99964Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M24.9999 6.99964H22.5997V3.40014H19.0002V1H22.5997C23.2363 1 23.8468 1.25287 24.2969 1.70299C24.747 2.1531 24.9999 2.76358 24.9999 3.40014V6.99964Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M6.99964 25H3.40014C2.76358 25 2.1531 24.7471 1.70299 24.297C1.25287 23.8469 1 23.2364 1 22.5998V19.0003H3.40014V22.5998H6.99964V25Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M22.5997 25H19.0002V22.5998H22.5997V19.0003H24.9999V22.5998C24.9999 23.2364 24.747 23.8469 24.2969 24.297C23.8468 24.7471 23.2363 25 22.5997 25Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M16.3799 10.8206C16.1414 10.8225 15.9077 10.7531 15.7088 10.6215C15.5099 10.4898 15.3547 10.3018 15.2632 10.0815C15.1717 9.86124 15.1479 9.61866 15.1949 9.3848C15.242 9.15094 15.3577 8.93642 15.5273 8.76866L18.1477 6.14826C18.2597 6.03629 18.3926 5.94747 18.5389 5.88688C18.6852 5.82628 18.842 5.79509 19.0003 5.79509C19.1587 5.79509 19.3155 5.82628 19.4618 5.88688C19.608 5.94747 19.741 6.03629 19.8529 6.14826C19.9649 6.26023 20.0537 6.39315 20.1143 6.53945C20.1749 6.68574 20.2061 6.84254 20.2061 7.00088C20.2061 7.15923 20.1749 7.31603 20.1143 7.46232C20.0537 7.60862 19.9649 7.74154 19.8529 7.85351L17.2311 10.4725C17.1191 10.5837 16.9863 10.6717 16.8402 10.7314C16.6941 10.7911 16.5377 10.8215 16.3799 10.8206Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M18.782 10.889H15.1086V7.21562" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.1783 17.0123C15.1765 16.7738 15.2458 16.5401 15.3775 16.3412C15.5091 16.1423 15.6971 15.9871 15.9174 15.8956C16.1377 15.804 16.3803 15.7803 16.6141 15.8273C16.848 15.8744 17.0625 15.9901 17.2303 16.1597L19.8507 18.7801C19.9627 18.892 20.0515 19.025 20.1121 19.1713C20.1727 19.3176 20.2039 19.4743 20.2039 19.6327C20.2039 19.791 20.1727 19.9478 20.1121 20.0941C20.0515 20.2404 19.9627 20.3734 19.8507 20.4853C19.7387 20.5973 19.6058 20.6861 19.4595 20.7467C19.3132 20.8073 19.1564 20.8385 18.9981 20.8385C18.8397 20.8385 18.6829 20.8073 18.5366 20.7467C18.3903 20.6861 18.2574 20.5973 18.1454 20.4853L15.5265 17.8635C15.4153 17.7515 15.3273 17.6187 15.2675 17.4726C15.2078 17.3265 15.1775 17.1701 15.1783 17.0123Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M15.1093 19.4154V15.742H18.7827" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8.98557 15.8101C9.22411 15.8083 9.45777 15.8776 9.65669 16.0093C9.85561 16.1409 10.0108 16.3289 10.1023 16.5492C10.1938 16.7695 10.2176 17.0121 10.1705 17.2459C10.1235 17.4798 10.0078 17.6943 9.8382 17.8621L7.21779 20.4825C7.10582 20.5944 6.9729 20.6833 6.8266 20.7439C6.68031 20.8045 6.52351 20.8356 6.36517 20.8356C6.20682 20.8356 6.05002 20.8045 5.90373 20.7439C5.75743 20.6833 5.62451 20.5944 5.51254 20.4825C5.40057 20.3705 5.31175 20.2376 5.25116 20.0913C5.19056 19.945 5.15937 19.7882 5.15937 19.6299C5.15937 19.4715 5.19056 19.3147 5.25116 19.1684C5.31175 19.0221 5.40057 18.8892 5.51254 18.7772L8.13436 16.1582C8.24636 16.0471 8.37921 15.9591 8.52527 15.8993C8.67134 15.8396 8.82776 15.8093 8.98557 15.8101Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M6.58344 15.742H10.2568V19.4154" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.1891 9.61893C10.191 9.85747 10.1216 10.0911 9.98994 10.2901C9.85828 10.489 9.6703 10.6441 9.45001 10.7356C9.22973 10.8272 8.98715 10.8509 8.75329 10.8039C8.51943 10.7569 8.30491 10.6411 8.13715 10.4716L5.51674 7.85116C5.40477 7.73919 5.31596 7.60626 5.25536 7.45996C5.19476 7.31367 5.16357 7.15688 5.16357 6.99853C5.16357 6.84018 5.19476 6.68338 5.25536 6.53709C5.31596 6.3908 5.40477 6.25787 5.51674 6.1459C5.62871 6.03393 5.76164 5.94512 5.90793 5.88452C6.05423 5.82392 6.21102 5.79273 6.36937 5.79273C6.52772 5.79273 6.68451 5.82392 6.83081 5.88452C6.9771 5.94512 7.11003 6.03393 7.222 6.1459L9.84098 8.76773C9.95216 8.87973 10.0401 9.01257 10.0999 9.15863C10.1596 9.3047 10.19 9.46112 10.1891 9.61893Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                        <path d="M10.2584 7.21581V10.8892H6.58496" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg> :
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.5 15.45L2.55 1.5H6V0H0V6H1.5V2.55L15.45 16.5H12V18H18V12H16.5V15.45ZM12 0V1.5H15.525L10.8 6.225L11.85 7.275L16.5 2.625V6H18V0H12ZM6.225 10.725L1.5 15.45V12H0V18H6V16.5H2.625L7.35 11.775L6.225 10.725Z"
                                                fill="#305671" />
                                        </svg>
                                    }
                                </button>
                            </div>
                            <MergeTag addfeild={(e,field)=> createKeywordTextEmail(e,field)}/>    
                            {max ? <button className="cmnBtn" 
                                                     type="button"
                                                     onClick={(e) => {
                                                         e.preventDefault()
                                                         setMax(false)}}
                                                     >
                                                        Done</button> : "" }
                        </div>
                    </> :
                    ((emailTemplate && emailTemplate._id) ?
                        <>
                            <form
                                style={{
                                    position: "relative",
                                }}
                                className="h-100"
                                method="post"
                                id="formEditor"
                            >
                                <div className="cmnFormRow">
                                    <div className={editHasError && editErrorState.header ? "cmnFormField error" : "cmnFormField"}>
                                        <input
                                            className="headerEmail  btnPadding cmnFieldStyle"
                                            defaultValue={emailTemplate.subject}
                                            key={"subject_"+emailTemplate.subject}
                                            id="editTemplateHeader"
                                            ref={editHeaderRef}
                                            onInput={(e) => checkEditTitle(e)}
                                        />
                                        <MergeTag addfeild={(e,field)=> editKeywordEmail(e,field)}/>    


                                        {/* <button
                                            className="btn browseKeywords"
                                            type="button"
                                            style={{
                                                marginRight: "0",
                                                padding: "0",
                                            }}
                                            onClick={(e) => {
                                                setKeywordSuggesion(true)
                                                setKeywordTextSuggesion(false)
                                                e.preventDefault()
                                            }
                                            }
                                        >
                                            <img src={browse_keywords} alt="keywords" />
                                        </button>
                                        {keywordSuggesion && <div className="keywordBox">
                                            <div className="searchKeyword">
                                                <div className="searchKeyBox">
                                                    <input type="text"
                                                           onChange={(e) => setSearchTagStringEditSub(e.target.value)}
                                                           onKeyPress={e => {
                                                               if (e.key === 'Enter') e.preventDefault();
                                                           }}
                                                    />
                                                </div>
                                                <div className="cancelKeySearch">
                                                    <button
                                                        onClick={() => {setKeywordSuggesion(false)
                                                            setSearchTagStringEditSub("")}}
                                                    ></button>
                                                </div>
                                            </div>
                                            <div className="keywordList">
                                                <ul>

                                                    {emailTags
                                                        .filter(
                                                            (smsTag) =>
                                                                smsTag.id.indexOf(searchTagStringEditSub) >= 0
                                                                && smsTag.id !== "tags"
                                                                && smsTag.id !== "phone"
                                                                && smsTag.id !== "mobile"
                                                                && smsTag.id !== "momCellPhone"
                                                                && smsTag.id !== "dadCellPhone"
                                                                && smsTag.id !== "createdBy"
                                                                && smsTag.id !== "createdAt"
                                                                && smsTag.id !== "statusName"
                                                                && smsTag.id !== "phaseName"
                                                                && smsTag.id !== "contactType"
                                                        )
                                                        .map((tagItem, i) => (
                                                            <li key={"keyField" + i}>
                                                                <button
                                                                    onClick={(e) =>
                                                                        editKeywordEmail(e, tagItem.id)
                                                                    }
                                                                >
                                                                    {tagItem.id}
                                                                </button>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        </div>} */}
                                        {editHasError && editErrorState.header &&
                                            <span className="errorMsg">{editErrorState.header}</span>}
                                    </div>
                                </div>
                                <div className={editHasError && editErrorState.message ? "cmnFormRow f-1 error" : "cmnFormRow f-1"}
                                     id="editTextArea">
                                    <Editor
                                        apiKey="u8o9qjaz9gdqhefua3zs1lyixgg709tgzlqredwdnd0452z0"
                                        statusBar={true}
                                        onInit={(evt, editor) => (editorRef.current = editor)}
                                        onDirty={() => setDirty(true)}
                                        theme="advanced"
                                        initialValue={utils.decodeHTML(emailTemplate.template)}
                                        onEditorChange={(newText) => editedEmail(newText)}
                                        init={{
                                            height: "100%",
                                            menubar: false,
                                            plugins: [
                                                "advlist autolink lists link image charmap print preview anchor",
                                                "searchreplace visualblocks code fullscreen",
                                                "insertdatetime media table paste code help wordcount save autosave ",
                                            ],
                                            toolbar: [
                                                "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
                                                "undo redo | help",
                                            ],
                                            autosave_interval: "10s",
                                            save_enablewhendirty: true,
                                            relative_urls: false,
                                            remove_script_host : false,
                                            document_base_url: base_url,

                                            images_file_types: 'jpg,svg,webp,png,jpeg',
                                            file_picker_types: 'image',
                                            automatic_uploads: true,
                                            image_title: true,
                                            //  image_advtab: true,
                                            file_picker_callback: function (cb, value, meta) {
                                                var input = document.createElement('input');
                                                input.setAttribute('type', 'file');
                                                input.setAttribute('accept', 'image/*');

                                                /*
                                                  Note: In modern browsers input[type="file"] is functional without
                                                  even adding it to the DOM, but that might not be the case in some older
                                                  or quirky browsers like IE, so you might want to add it to the DOM
                                                  just in case, and visually hide it. And do not forget do remove it
                                                  once you do not need it anymore.
                                                */

                                                input.onchange = function () {
                                                    var file = this.files[0];

                                                    var reader = new FileReader();
                                                    reader.onload = function (tinymce) {
                                                        /*
                                                          Note: Now we need to register the blob in TinyMCEs image blob
                                                          registry. In the next release this part hopefully won't be
                                                          necessary, as we are looking to handle it internally.
                                                        */
                                                        var id = 'blobid' + (new Date()).getTime();
                                                        //var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                                        //crossOriginIsolated.log("Editor", tinymce)
                                                        var blobCache =  Editor.activeEditor.blobCache;
                                                        var base64 = reader.result.split(',')[1];
                                                        console.log("base64base64base64base64", blobCache,base64);
                                                        var blobInfo = blobCache.create(id, file, base64);
                                                        blobCache.add(blobInfo);

                                                        /* call the callback and populate the Title field with the file name */
                                                        cb(blobInfo.blobUri(), { title: file.name });
                                                    };
                                                    reader.readAsDataURL(file);
                                                };

                                                input.click();
                                            },
                                            images_upload_handler: example_image_upload_handler,
                                        }}
                                    />

{/* 
                                    <button
                                        className="inlinle-btn browseKeywords editBrowseKeywords"
                                        type="button"
                                        style={{
                                            marginRight: "0",
                                            padding: "0",
                                        }}
                                        onClick={(e) => {
                                            setKeywordSuggesion(false)
                                            setKeywordTextSuggesion(true)
                                            e.preventDefault()
                                        }
                                        }
                                    >
                                        <img src={browse_keywords} alt="keywords" />
                                    </button> */}

                                    {/* {keywordTextSuggesion && <div className="keywordBox keywordsEditText">
                                        <div className="searchKeyword">
                                            <div className="searchKeyBox">
                                                <input type="text"
                                                       onChange={(e) => setSearchTagStringEditTemp(e.target.value)}
                                                       onKeyPress={e => {
                                                           if (e.key === 'Enter') e.preventDefault();
                                                       }}/>
                                            </div>
                                            <div className="cancelKeySearch">
                                                <button
                                                    onClick={() => {setKeywordTextSuggesion(false)
                                                        setSearchTagStringEditTemp("")}}
                                                ></button>
                                            </div>
                                        </div>
                                        <div className="keywordList">
                                            <ul>
                                                {emailTags
                                                    .filter(
                                                        (smsTag) =>
                                                            smsTag.id.indexOf(searchTagStringEditTemp) >= 0
                                                            && smsTag.id !== "tags"
                                                            && smsTag.id !== "phone"
                                                            && smsTag.id !== "mobile"
                                                            && smsTag.id !== "momCellPhone"
                                                            && smsTag.id !== "dadCellPhone"
                                                            && smsTag.id !== "createdBy"
                                                            && smsTag.id !== "createdAt"
                                                            && smsTag.id !== "statusName"
                                                            && smsTag.id !== "phaseName"
                                                            && smsTag.id !== "contactType"
                                                    ).map((tagItem, i) => (
                                                        <li key={"keyField" + i}>
                                                            <button
                                                                onClick={(e) =>
                                                                    editKeywordTextEmail(e, tagItem.id)
                                                                }
                                                            >
                                                                {tagItem.id}
                                                            </button>
                                                        </li>
                                                    ))}

                                            </ul>
                                        </div>
                                    </div>} */}
                                    <MergeTag addfeild={(e,field)=> editKeywordTextEmail(e,field)}/>    


                                    {editHasError && editErrorState.message &&
                                        <span className="errorMsg">Please give some Email content.</span>}

                                </div>
                            </form>
                        </> :
                        ((emailTemplate !== undefined && emailTemplate._id !== undefined) ?
                                <>
                                    <div className={editHasError && editErrorState.message ? "cmnFormRow f-1 error" : "cmnFormRow f-1"}>
                                        <div
                                            className={max ? "editorEmailShell h-100 maximize" : "editorEmailShell h-100"}
                                            id="createTextArea"
                                            ref={createTextArea}>
                                            {max && <h6>Email Body</h6>}
                                            <Editor
                                                apiKey="u8o9qjaz9gdqhefua3zs1lyixgg709tgzlqredwdnd0452z0"
                                                statusBar={true}
                                                onInit={(evt, editor) => (editorRef.current = editor)}
                                                onDirty={() => setDirty(true)}
                                                theme="advanced"
                                                onEditorChange={ (newText) => props.globalTemplateValue(newText)}
                                                initialValue={props.setTempSelected && utils.decodeHTML(emailTemplate.template)}
                                                init={{
                                                    height: "100%",
                                                    menubar: false,
                                                    plugins: [
                                                        "advlist autolink lists link image charmap print preview anchor",
                                                        "searchreplace visualblocks code fullscreen",
                                                        "insertdatetime media table paste code help wordcount save autosave",
                                                    ],
                                                    relative_urls: false,
                                                    toolbar: [
                                                        "fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
                                                        "undo redo | help",
                                                    ],

                                                    autosave_interval: "10s",
                                                    save_enablewhendirty: true,
                                                    remove_script_host : false,
                                                    document_base_url: base_url,
                                                }}
                                            />
                                            <div className="createEmailButtons">
                                                {/* <button
                                                    type='button'
                                                    className="inlinle-btn browseKeywords createBrowseKeywords"
                                                    style={{
                                                        marginRight: "0",
                                                        padding: "0",
                                                    }}
                                                    onClick={(e) => {
                                                        setKeywordSuggesion(false)
                                                        setKeywordTextSuggesion(true)
                                                        e.preventDefault()
                                                    }
                                                    }
                                                >
                                                    <img src={browse_keywords} alt="keywords" />
                                                </button> */}

                                                {/* {keywordTextSuggesion && <div className="keywordBox keywordsCreateText">
                                                    <div className="searchKeyword">
                                                        <div className="searchKeyBox">
                                                            <input type="text"
                                                                   onChange={(e) => setSearchTagStringSend(e.target.value)}
                                                                   onKeyPress={e => {
                                                                       if (e.key === 'Enter') e.preventDefault();
                                                                   }}
                                                            />
                                                        </div>
                                                        <div className="cancelKeySearch">
                                                            <button
                                                                onClick={() => {setKeywordTextSuggesion(false)
                                                                    setSearchTagStringSend("")}}
                                                            ></button>
                                                        </div>
                                                    </div>
                                                    <div className="keywordList">
                                                        <ul>
                                                            {emailTags
                                                                .filter(
                                                                    (smsTag) =>
                                                                        smsTag.id.indexOf(searchTagStringSend) >= 0
                                                                        && smsTag.id !== "tags"
                                                                        && smsTag.id !== "phone"
                                                                        && smsTag.id !== "mobile"
                                                                        && smsTag.id !== "momCellPhone"
                                                                        && smsTag.id !== "dadCellPhone"
                                                                        && smsTag.id !== "createdBy"
                                                                        && smsTag.id !== "createdAt"
                                                                        && smsTag.id !== "statusName"
                                                                        && smsTag.id !== "phaseName"
                                                                        && smsTag.id !== "contactType"
                                                                        && smsTag.id !== "ageGroup"
                                                                        && smsTag.id !== "sourceDetail"
                                                                        && smsTag.id !== "onTrial"
                                                                )
                                                                .map((tagItem, i) => (
                                                                    <li key={"keyField" + i}>
                                                                        <button
                                                                            onClick={(e) =>
                                                                                editKeywordSendEmail(e, tagItem.id)
                                                                            }
                                                                        >
                                                                            {tagItem.id}
                                                                        </button>
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>} */}
                                                <button
                                                    className="inlinle-btn btnMaximize"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setMax(!max)
                                                    }}
                                                >
                                                    {max ?
                                                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.40014 6.99964H1V3.40014C1 2.76358 1.25287 2.1531 1.70299 1.70299C2.1531 1.25287 2.76358 1 3.40014 1H6.99964V3.40014H3.40014V6.99964Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M24.9999 6.99964H22.5997V3.40014H19.0002V1H22.5997C23.2363 1 23.8468 1.25287 24.2969 1.70299C24.747 2.1531 24.9999 2.76358 24.9999 3.40014V6.99964Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M6.99964 25H3.40014C2.76358 25 2.1531 24.7471 1.70299 24.297C1.25287 23.8469 1 23.2364 1 22.5998V19.0003H3.40014V22.5998H6.99964V25Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M22.5997 25H19.0002V22.5998H22.5997V19.0003H24.9999V22.5998C24.9999 23.2364 24.747 23.8469 24.2969 24.297C23.8468 24.7471 23.2363 25 22.5997 25Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M16.3799 10.8206C16.1414 10.8225 15.9077 10.7531 15.7088 10.6215C15.5099 10.4898 15.3547 10.3018 15.2632 10.0815C15.1717 9.86124 15.1479 9.61866 15.1949 9.3848C15.242 9.15094 15.3577 8.93642 15.5273 8.76866L18.1477 6.14826C18.2597 6.03629 18.3926 5.94747 18.5389 5.88688C18.6852 5.82628 18.842 5.79509 19.0003 5.79509C19.1587 5.79509 19.3155 5.82628 19.4618 5.88688C19.608 5.94747 19.741 6.03629 19.8529 6.14826C19.9649 6.26023 20.0537 6.39315 20.1143 6.53945C20.1749 6.68574 20.2061 6.84254 20.2061 7.00088C20.2061 7.15923 20.1749 7.31603 20.1143 7.46232C20.0537 7.60862 19.9649 7.74154 19.8529 7.85351L17.2311 10.4725C17.1191 10.5837 16.9863 10.6717 16.8402 10.7314C16.6941 10.7911 16.5377 10.8215 16.3799 10.8206Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M18.782 10.889H15.1086V7.21562" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M15.1783 17.0123C15.1765 16.7738 15.2458 16.5401 15.3775 16.3412C15.5091 16.1423 15.6971 15.9871 15.9174 15.8956C16.1377 15.804 16.3803 15.7803 16.6141 15.8273C16.848 15.8744 17.0625 15.9901 17.2303 16.1597L19.8507 18.7801C19.9627 18.892 20.0515 19.025 20.1121 19.1713C20.1727 19.3176 20.2039 19.4743 20.2039 19.6327C20.2039 19.791 20.1727 19.9478 20.1121 20.0941C20.0515 20.2404 19.9627 20.3734 19.8507 20.4853C19.7387 20.5973 19.6058 20.6861 19.4595 20.7467C19.3132 20.8073 19.1564 20.8385 18.9981 20.8385C18.8397 20.8385 18.6829 20.8073 18.5366 20.7467C18.3903 20.6861 18.2574 20.5973 18.1454 20.4853L15.5265 17.8635C15.4153 17.7515 15.3273 17.6187 15.2675 17.4726C15.2078 17.3265 15.1775 17.1701 15.1783 17.0123Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M15.1093 19.4154V15.742H18.7827" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M8.98557 15.8101C9.22411 15.8083 9.45777 15.8776 9.65669 16.0093C9.85561 16.1409 10.0108 16.3289 10.1023 16.5492C10.1938 16.7695 10.2176 17.0121 10.1705 17.2459C10.1235 17.4798 10.0078 17.6943 9.8382 17.8621L7.21779 20.4825C7.10582 20.5944 6.9729 20.6833 6.8266 20.7439C6.68031 20.8045 6.52351 20.8356 6.36517 20.8356C6.20682 20.8356 6.05002 20.8045 5.90373 20.7439C5.75743 20.6833 5.62451 20.5944 5.51254 20.4825C5.40057 20.3705 5.31175 20.2376 5.25116 20.0913C5.19056 19.945 5.15937 19.7882 5.15937 19.6299C5.15937 19.4715 5.19056 19.3147 5.25116 19.1684C5.31175 19.0221 5.40057 18.8892 5.51254 18.7772L8.13436 16.1582C8.24636 16.0471 8.37921 15.9591 8.52527 15.8993C8.67134 15.8396 8.82776 15.8093 8.98557 15.8101Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M6.58344 15.742H10.2568V19.4154" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M10.1891 9.61893C10.191 9.85747 10.1216 10.0911 9.98994 10.2901C9.85828 10.489 9.6703 10.6441 9.45001 10.7356C9.22973 10.8272 8.98715 10.8509 8.75329 10.8039C8.51943 10.7569 8.30491 10.6411 8.13715 10.4716L5.51674 7.85116C5.40477 7.73919 5.31596 7.60626 5.25536 7.45996C5.19476 7.31367 5.16357 7.15688 5.16357 6.99853C5.16357 6.84018 5.19476 6.68338 5.25536 6.53709C5.31596 6.3908 5.40477 6.25787 5.51674 6.1459C5.62871 6.03393 5.76164 5.94512 5.90793 5.88452C6.05423 5.82392 6.21102 5.79273 6.36937 5.79273C6.52772 5.79273 6.68451 5.82392 6.83081 5.88452C6.9771 5.94512 7.11003 6.03393 7.222 6.1459L9.84098 8.76773C9.95216 8.87973 10.0401 9.01257 10.0999 9.15863C10.1596 9.3047 10.19 9.46112 10.1891 9.61893Z" fill="#305671" stroke="#F6F8FA" stroke-width="0.3"/>
                                                        <path d="M10.2584 7.21581V10.8892H6.58496" stroke="#305671" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg> :
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M16.5 15.45L2.55 1.5H6V0H0V6H1.5V2.55L15.45 16.5H12V18H18V12H16.5V15.45ZM12 0V1.5H15.525L10.8 6.225L11.85 7.275L16.5 2.625V6H18V0H12ZM6.225 10.725L1.5 15.45V12H0V18H6V16.5H2.625L7.35 11.775L6.225 10.725Z"
                                                                fill="#305671" />
                                                        </svg>
                                                    }
                                                </button>

                                            </div>
                                            {editHasError && editErrorState.message &&
                                                <span className="errorMsg">Please give some Email content.</span>}

                                              <MergeTag addfeild={(e,field)=> editKeywordSendEmail(e,field)}/>    

                                              {max ? <button className="cmnBtn" 
                                                     type="button"
                                                     onClick={(e) => {
                                                         e.preventDefault()
                                                         setMax(false)}}
                                                     >
                                                        Done</button> : "" }
                                        </div>


                                    </div>

                                </> : "")
                    )
            }
        </>
    );
};

export default EditorComponent;