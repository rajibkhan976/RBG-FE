import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../actions/types";
import { SMSServices } from "../../../services/template/SMSServices";
import browse_keywords from "../../../assets/images/icon_browse_keywords.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import Loader from "../../shared/Loader";
import { utils } from "../../../helpers";
import { ContactService } from "../../../services/contact/ContactServices";
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
      {isLoader ? <Loader /> : ""}
      <div className="sideMenuOuter" id="import_Modal">
        <div className="dialogBg" onClick={() => closeModal()}></div>
        <div className="sideMenuInner bulkSmsModel">
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
                    <option value="null" className="options">Choose an SMS template</option>
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
                        className="btn browseKeywords"
                        onClick={(e) => {
                          e.preventDefault();
                          setKeywordSuggesion(true);
                        }}
                      >
                        <img src={browse_keywords} alt="keywords" />
                      </button>
                      <button
                        className="inlinle-btn btnMaximize"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setMax(!max);
                        }}
                      >
                        {max ? (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3047 11.949L3.35469 1.99902H6.80469V0.499023H0.804688V6.49902H2.30469V3.04902L12.2547 12.999H8.80469V14.499H14.8047V8.49902H13.3047V11.949Z"
                              fill="#305671"
                            />
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
                  {keywordSuggesion && (
                    <div className="keywordBox" ref={tagRef}>
                      <div className="searchKeyword">
                        <div className="searchKeyBox">
                          <input
                            type="text"
                            onChange={(e) => setSearchTagString(e.target.value)}
                          />
                        </div>
                        <div className="cancelKeySearch">
                          <button
                            onClick={() => setKeywordSuggesion(false)}
                          ></button>
                        </div>
                      </div>
                      <div className="keywordList">
                        <ul>
                          {/* {smsTags
                                .filter(
                                  (smsTag) =>
                                    smsTag.id.indexOf(searchTagString) >= 0
                                )
                                .map((tagItem, i) => (
                                  <li key={"keyField" + i}>
                                    <button
                                      onClick={(e) => addKeywordEdit(e, tagItem.id)}
                                    >
                                      {tagItem.id}
                                    </button>
                                  </li>
                                ))} */}
                          {smsTags
                            .filter(
                              (smsTag) =>
                                smsTag.id.toLowerCase().indexOf(searchTagString) >= 0
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
                                    addKeywordEdit(e, tagItem.id)
                                  }
                                >
                                  {tagItem.id}
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
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
              <div className="slice text-center">
                <button className="cmnBtn" disabled={imgLoader}>
                  Send sms <img src={arrow_forward} alt="" />
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
