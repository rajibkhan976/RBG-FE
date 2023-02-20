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
    const editKeywordEmail = (e) => {
        e.preventDefault()
        // console.log(e.target);
        let subjectEditInput = editHeaderRef.current;
        let cursorStart = subjectEditInput.selectionStart;
        let cursorEnd = subjectEditInput.selectionEnd;
        let textValue = subjectEditInput.value;

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
    const editKeywordTextEmail = (e) => {
        e.preventDefault();
        let iframeEdit = editorRef.current;
        let cursorStart = iframeEdit.selectionStart;
        let cursorEnd = iframeEdit.selectionEnd;
        let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

        let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel, range;

        if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt( e.target.textContent);
                range.insertNode(document.createTextNode(" [" + e.target.textContent + "] "));

                sel.collapseToEnd();
                setValue(editorRef.current.getContent())
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = " [" + e.target.textContent + "] ";
            setValue(editorRef.current.getContent())
        }
    }
    // add keywords to edit email template

    // add keywords to create email template
    const createKeywordTextEmail = (e) => {
        e.preventDefault();
        let iframeEdit = editorCreateRef.current.iframeElement;
        let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

        let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel, range;

        if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.insertNode(document.createTextNode(" [" + e.target.textContent + "] "));
                sel.collapseToEnd();
                setCreatedValue(editorCreateRef.current.getContent())
                props.createdEmailTemplate(editorCreateRef.current.getContent())
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = " [" + e.target.textContent + "] ";
            setCreatedValue(editorCreateRef.current.getContent())
            props.createdEmailTemplate(editorCreateRef.current.getContent())
        }
    }

    // add keywords to send email template
    const editKeywordSendEmail = (e) => {
        e.preventDefault();
        let iframeEdit = editorRef.current;
        let cursorStart = iframeEdit.selectionStart;
        let cursorEnd = iframeEdit.selectionEnd;
        let iframeEditBody = (iframeEdit.contentDocument || iframeEdit.contentWindow.document).body;

        let doc = iframeEditBody.ownerDocument || iframeEditBody.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel, range;

        if (win.getSelection) {
            sel = win.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt( e.target.textContent);
                range.insertNode(document.createTextNode(" [" + e.target.textContent + "] "));

                sel.collapseToEnd();
                setValue(editorRef.current.getContent())
                props.globalTemplateValue(editorRef.current.getContent())
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = " [" + e.target.textContent + "] ";
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
                                <button
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
                                </button>

                                {keywordTextSuggesion && <div className="keywordBox keywordsCreateText">
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
                                </div>}
                                <button
                                    className="inlinle-btn btnMaximize"
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setMax(!max)
                                    }}
                                >
                                    {max ?
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M13.3047 11.949L3.35469 1.99902H6.80469V0.499023H0.804688V6.49902H2.30469V3.04902L12.2547 12.999H8.80469V14.499H14.8047V8.49902H13.3047V11.949Z"
                                                fill="#305671" />
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

                                        <button
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
                                        </div>}
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
                                    </button>

                                    {keywordTextSuggesion && <div className="keywordBox keywordsEditText">
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
                                    </div>}


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
                                                <button
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
                                                </button>

                                                {keywordTextSuggesion && <div className="keywordBox keywordsCreateText">
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
                                                </div>}
                                                <button
                                                    className="inlinle-btn btnMaximize"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setMax(!max)
                                                    }}
                                                >
                                                    {max ?
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M13.3047 11.949L3.35469 1.99902H6.80469V0.499023H0.804688V6.49902H2.30469V3.04902L12.2547 12.999H8.80469V14.499H14.8047V8.49902H13.3047V11.949Z"
                                                                fill="#305671" />
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
                                        </div>


                                    </div>

                                </> : "")
                    )
            }
        </>
    );
};

export default EditorComponent;