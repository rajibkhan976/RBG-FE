import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../actions/types";
import { SMSServices } from "../../../services/template/SMSServices";
import browse_keywords from "../../../assets/images/icon_browse_keywords.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import Loader from "../../shared/Loader";
import { utils } from "../../../helpers";
import { ContactService } from "../../../services/contact/ContactServices";
import MergeTag from "../../shared/MergeTag";

import { CallSetupService } from "../../../services/setup/callSetupServices";
const { Device } = require('twilio-client');



const BulkSms = (props) => {
  // const [device, setDevice] = useState(new Device());
  const dispatch = useDispatch();
  const messageTextbox = useRef(null);
  const tagRef = useRef(null);
  const inputFile = useRef(null);
  const [smsTemplates, setSMSTemplates] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [searchTagString, setSearchTagString] = useState("");
  const [smsTags, setSmsTags] = useState([]);
  const [imgLoader, setImgLoader] = useState(false);
  const [max, setMax] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [device, setDevice] = useState(props?.device);
  const [validationError, setValidationError] = useState({
    // to: "",
    body: "",
    mediaUrl: "",
  });
  const [smsFormData, setSmsformData] = useState({
    // to: "",
    body: "",
    mediaUrl: "",
  });

  const closeModal = () => {
    props.hideModal();
  };

  // const fetchCapabilityToken = async () => {
  //   try {
  //     const result = await CallSetupService.getCapabilityToken();
  //     let conf = {};
  //     if (result.ringtone !== "") {
  //       conf = {
  //         sounds: {
  //           incoming: result.ringtone,
  //         },
  //       };
  //     } else {
  //       // console.log("Ringtone is blank", result)
  //     }
  //     setDevice(device.setup(result.token, conf));

  //     // console.log("devicee", device)
  //   } catch (e) {
  //     // console.log("error", e);
  //   }
  // };


  useEffect(() => {
    // fetchCapabilityToken();
    // setDevice(device.setup(result.token, conf));

    // device.on("ready", (device) => {
    //   props.setDevice(device)
    // });
  }, []);
  // useEffect(() => {
  //   // console.log("props", props)
  //   setDevice(props?.device);
  // }, [props?.device]);

  // select template
  const getQueryParams = async () => {
    const keyword = utils.getQueryVariable("search");
    const srtBy = utils.getQueryVariable("sortBy");
    const srtType = utils.getQueryVariable("sortType");

    const queryParams = new URLSearchParams();

    // // console.log("search", keyword);
    if (keyword) {
      queryParams.append("search", keyword);
    }
    if (srtBy) {
      queryParams.append("sortBy", srtBy);
    }
    if (srtType) {
      queryParams.append("sortType", srtType);
    }
    return queryParams;
  };

  const selectTemplate = (e) => {
    if (e.target.value != "null") {
      setSelectedTemplate(
        smsTemplates.filter((tmp) => tmp._id == e.target.value)[0]
      );
      setSmsformData({
        ...smsFormData,
        body: smsTemplates
          .filter((tmp) => tmp._id == e.target.value)[0]
          .message.trimStart()
          .trimEnd(),
      });

      setValidationError({
        ...validationError,
        body: "",
      });
    } else {
      setSelectedTemplate(null);
      setSmsformData({
        // to: "",
        body: "",
      });
    }
  };

  const fetchSMS = async () => {
    let pageId = utils.getQueryVariable("page") || 1;
    let queryParams = await getQueryParams();
    try {
      setIsLoader(true);
      const result = await SMSServices.fetchSms(pageId, queryParams);
      if (result) {
        // console.log(result);
        setSMSTemplates(result.templates);
      }
    } catch (e) {
      setIsLoader(false);
      // console.log("Error in SMS template listing", e);
      // setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
  };

  // text area onchange
  const setMessageObj = (e) => {
    if (e.target.value.trim() != "") {
      setValidationError({
        ...validationError,
        body: "",
      });
    } else {
      setValidationError({
        ...validationError,
        body: "Please type a message",
      });
    }
    let editText = e.target.value;
    setSmsformData({
      ...smsFormData,
      body: editText,
    });
  };
  const fetchSMSTags = async () => {
    try {
      const result = await SMSServices.fetchSMSTags();
      if (result) {
        // // console.log("result", result);
        setSmsTags(result);
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: error.message,
        typeMessage: "error",
      });
    }
  };
  // ADD Keyword to Edit SMS template
  const addKeywordEdit = (e) => {
    e.preventDefault();
    let textBox = messageTextbox.current;
    let cursorStart = textBox.selectionStart;
    let cursorEnd = textBox.selectionEnd;
    let textValue = textBox.value;

    // // console.log();

    try {
      setValidationError({
        ...validationError,
        body: "",
      });
      if (cursorStart || cursorStart == "0") {
        // // console.log("VIA CURSOR");
        var startToText = "";
        // // console.log(textBox.selectionStart);
        textBox.value =
          textBox.value.substring(0, cursorStart) +
          "[" +
          e.target.textContent +
          "]" +
          textBox.value.substring(cursorEnd, textValue.length);

        setSmsformData({
          ...smsFormData,
          body: textBox.value,
        });

        // // console.log("smsFormData", smsFormData, textBox.value);

        startToText =
          textBox.value.substring(0, cursorStart) +
          "[" +
          e.target.textContent +
          "]";
        textBox.focus();
        textBox.setSelectionRange(
          startToText.length + 1,
          startToText.length + 1
        );
        // // console.log(startToText.length);
      } else {
        // // console.log("VIA END POINT");

        textBox.value = textBox.value + "[" + e.target.textContent + "]";
        setSmsformData({
          ...smsFormData,
          body: textBox.value,
        });
        textBox.focus();
      }
    } catch (err) {
      // // console.log(err);
    }
  };
  // upload image
  const getRandomFileName = () => {
    let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    let random = ("" + Math.random()).substring(2, 8);
    return timestamp + random;
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const uploadImage = (event) => {
    setImgLoader(true);
    let file = event.target.files[0];
    let allowedExtension = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    let extension = file.name.substring(file.name.lastIndexOf(".") + 1);

    if (
      file && allowedExtension.indexOf(file.type) > -1 && file.size < 5000000
    ) {
      let newFileName = getRandomFileName() + "." + extension;
      Object.defineProperty(file, "name", {
        writable: true,
        value: newFileName,
      });
      getBase64(file)
        .then(async (result) => {
          if (result) {
            const res = await SMSServices.uploadImage({
              file: result,
            });

            if (res) {
              setSmsformData({
                ...smsFormData,
                mediaUrl: res.originalUrl,
              });
              validationError.mediaUrl = "";
              setImgLoader(false);
            }
          }
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: err,
            typeMessage: "error",
          });
        });
    }
    if (file.size > 5000000) {
      inputFile.current.value = "";
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: "File size should be less than 5mb",
        typeMessage: "error",
      });
      setImgLoader(false);
    }
    if (allowedExtension.indexOf(file.type) == -1) {
      inputFile.current.value = "";
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: "Only image formats (jpeg, jpg, png, gif) allowed.",
        typeMessage: "error",
      });
      setImgLoader(false);
    }
  };
  const sendBulkSmsHandler = async (e) => {

    e.preventDefault();
    // console.log(" edit object" + smsFormData, "contactList", props.selectedContacts, "all checkbox", props.selectAllCheckbox);
    let errorObjPlaceholder = { ...validationError }
    if (smsFormData.body.trim() == "") {
      errorObjPlaceholder.body = "Please type a message"
      // // console.log(errorObjPlaceholder);
    }
    // if(smsFormData.mediaUrl.trim() == ""){
    //   errorObjPlaceholder.mediaUrl = "Please select file before sending."
    // }
    if (smsFormData.body.trim() !== "") {
      setIsLoader(true);
      let payload = {
        type: "sms",
        selected: props.selectedContacts,
        all: props.selectAllCheckbox.toString(),
        body: smsFormData.body.trimStart().trimEnd(),
        mediaUrl: smsFormData.mediaUrl,

      }
      // console.log(payload);
      try {
        let result = await ContactService.fetchBulkSms(payload);
        if (result) {
          // console.log("Result", result);
          setIsLoader(false);
          if(!props.numberOfContact){
            dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: "Bulk SMS send successfully",
              typeMessage: 'success'
            });
            payload = {
              all : false,
            }
            console.log("After payload:", payload);
          }
          else if(props.numberOfContact){
            dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: "SMS send successfully",
              typeMessage: 'success'
            });
          }
          smsFormData.body = "";
          smsFormData.mediaUrl = "";
          setSelectedTemplate(null);
          props.hideModal();
          props.unCheckAll();
        }
      } catch (error) {
        // console.log(error);
        props.unCheckAll();
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error.message,
          typeMessage: 'error'
        });
        setIsLoader(false);
        smsFormData.body = "";
        smsFormData.mediaUrl = "";
        props.hideModal();
      } finally {
        setIsLoader(false);
        smsFormData.body = "";
        smsFormData.mediaUrl = "";
      }
    }
    setValidationError(errorObjPlaceholder);
    // console.log(smsFormData);
  };


  useEffect(() => {
    // // console.log(props.selectedContacts, props.selectAllCheckbox);
    fetchSMS();
    fetchSMSTags();
  }, []);
  const handleClickOutside = (event) => {
    if (tagRef.current && !tagRef.current.contains(event.target)) {
      // // console.log(event);
      setKeywordSuggesion(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tagRef]);
  // console.log("props in bulk sms", props);
  useEffect(() => {
    console.log("props in bulk sms", props.numberOfContact);
  }, [props.numberOfContact])


  return (
    <>
      
      <div className="sideMenuOuter" id="import_Modal">
        <div className="dialogBg" onClick={() => closeModal()}></div>
        <div className="sideMenuInner bulkSmsModel">
          {isLoader ? <Loader /> : ""}
          <div className="sideMenuHeader">
            {props.numberOfContact && <h3>Send SMS</h3>}
            {!props.numberOfContact && <h3>Send Bulk SMS</h3>}
            {/* <p>Select an SMS template to send SMS.</p> */}
            <button
              className="btn btn-closeSideMenu"
              onClick={() => closeModal()}
            >
              <span></span>
              <span></span>
            </button>
          </div>

          {/* <p>{device?.status === 'ready' ? "device is ready" : "device is not ready"}</p> */}


          <div className="bulkModalBody">
            {/* <div className="makeSmsForm"> */}
            <div className="slice">
              <label>Create a Message</label>
              <p>
                {smsFormData?.body?.length > 0 ? smsFormData?.body?.length : 0}/160 SMS - One message contains 160 characters max (SMS count can be changed if you are using keyword variable e.g. [fname])
              </p>
            </div>
            <form onSubmit={sendBulkSmsHandler}>
              <div className="slice">
                <label>
                  SMS Templates <span>(Optional)</span>
                </label>
                {/* set template */}
                <div className="cmnFormField">
                  <select
                    type="text"
                    className="cmnFieldStyle btnSelect"
                    value={selectedTemplate ? selectedTemplate._id : "null"}
                    onChange={(e) => selectTemplate(e)}
                  >
                    <option value="null" className="options">Choose a SMS template</option>
                    {smsTemplates &&
                      smsTemplates.map((template, i) => (
                        <option className="options" value={template._id} key={"option-" + i}>
                          {template.title}
                        </option>
                      ))}
                  </select>
                </div>
                {/* <div className="cmnFormField error"> */}
                <div className={validationError?.body.trim() !== "" ? "cmnFormField error" : "cmnFormField"}>
                  <div
                    className={
                      max
                        ? "editorEmailShell h-100 maximize"
                        : "editorEmailShell h-100"
                    }
                  >
                    {max && <h6>SMS Body</h6>}

                    <textarea
                      className="cmnFieldStyle"
                      value={smsFormData?.body}
                      onChange={(e) => setMessageObj(e)}
                      ref={messageTextbox}
                      placeholder="Send message"
                    // maxLength={160}
                    />

                    <div className="actions">
         
                      <button
                        className="inlinle-btn btnMaximize"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setMax(!max);
                        }}
                      >
                        {max ? (
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
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 15.45L2.55 1.5H6V0H0V6H1.5V2.55L15.45 16.5H12V18H18V12H16.5V15.45ZM12 0V1.5H15.525L10.8 6.225L11.85 7.275L16.5 2.625V6H18V0H12ZM6.225 10.725L1.5 15.45V12H0V18H6V16.5H2.625L7.35 11.775L6.225 10.725Z"
                              fill="#305671"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                 

                <MergeTag addfeild={(e,field)=> addKeywordEdit(e,field)}/>
                {max ? <button className="cmnBtn" 
                                                     type="button"
                                                     onClick={(e) => {
                                                         e.preventDefault()
                                                         setMax(false)}}
                                                     >
                                                        Done</button> : "" }
                  </div>
                </div>
                {validationError?.body.trim() != "" ? (
                  <p className="errorMsg">{validationError.body}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="slice">
                <label>Upload file to send this message as MMS</label>
                <div
                  className={`cmnFormField upload cmnFieldStyle ${imgLoader ? "loading" : ""
                    }`}
                >
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    onChange={uploadImage}
                  />
                  <span>Choose File</span>
                </div>
                {/* {validationError?.mediaUrl?.trim() != "" ? (
                <p className="errorMsg">{validationError.mediaUrl}</p>
              ) : (
                ""
              )} */}
              </div>
              <div className="slice call_modal_footer">
              <button type="button" class="cancel"
                        onClick={() => closeModal()}
                      >
                        Cancel 
                      </button>
                <button className="cmnBtn" disabled={imgLoader}>
                  Send SMS <img src={arrow_forward} alt="" />
                </button>
              </div>

            </form>
            {/* </div> */}
          </div>

        </div>
      </div>
    </>
  );
};
export default BulkSms;
