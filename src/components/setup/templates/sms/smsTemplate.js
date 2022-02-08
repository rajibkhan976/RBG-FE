import React, { useState, useEffect, useRef } from "react";

import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import right_icon from "../../../../assets/images/right.svg";
import browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import cross from "../../../../assets/images/cross.svg";
import sms_template from "../../../../assets/images/sms-template.svg";
import { utils } from "../../../../helpers";
// import moment from "moment";
import Pagination from "../../../shared/Pagination";
import Loader from "../../../shared/Loader";
// import list_board_icon from "../../../../assets/images/list_board_icon.svg";
// import { bucketUrl } from "../../../../configuration/config";
import { ErrorAlert, SuccessAlert, WarningAlert } from "../../../shared/messages";
// import ConfirmBox from "../../../shared/confirmBox";
import Scrollbars from "react-custom-scrollbars-2";

const SmsTemplate = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [warningMsg, setWarningMsg] = useState("");
  const [keyword, setKeyword] = useState(null);
  const [option, setOption] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [sortType, setSortType] = useState("asc");
  const [smsModal, setSMSModal] = useState(false);
  const [smsCount, setSMSCount] = useState(0);
  const [paginationData, setPaginationData] = useState({
    count: null,
    totalPages: null,
    currentPage: 1,
    limit: 10,
  });
  const [smsTemplates, setSMSTemplates] = useState([
    {
      title: "Welcome Message",
      message:
        "Hello, [fname] [lname] This is a welcome message from Red Belt Gym.",
    },
    {
      title: "Onboarding Message",
      message:
        "Hello [fname] [lname], Welcome onboard. We hope you will get an amazing experience and fine…",
    },
    {
      title: "Prospect Offer",
      message:
        "Hello, [fname] [lname] Don’t miss out the additional 15% discount on Admission this week.",
    },
    {
      title: "Hot Leads 50% Offer",
      message:
        "Hello, [fname] [lname] Here we would like to offer you 50% discount since you have requested to…",
    },
    {
      title: "Auto Unsubscribe",
      message:
        "Hello, [fname] [lname] If you do not wish to get any SMS from us in future please click here [link] to…",
    },
    {
      title: "General Support Message",
      message:
        "Hello, [fname] [lname] Got a question? Don’t worry we are right here to help you out. Call us at…",
    },
    {
      title: "Support Message for Premium Members",
      message:
        "Hello, [fname] [lname] Thanks for being a valuable member of FitBit. We have appointed [d_supp…",
    },
    {
      title: "Non-paying members message",
      message:
        "Hello, [fname] [lname] We have noticed that you have failed to make your monthly Gym FEE on…",
    },
    {
      title: "Dependent Message",
      message: "Hello, [fname] [lname] Message body",
    },
    {
      title: "New Product Launch Message",
      message: "Hello, [fname] [lname] another message body",
    },
    {
      title: "Intro Message - General",
      message: "Hello, [fname] [lname] another new Message body",
    },
  ]);

  const [activeMessage, setActiveMessage] = useState(null);
  const [editState, setEditstate] = useState(false);
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [editMsgObj, setEditMsgObj] = useState({
    title: "",
    message: "",
  });
  const [addMsgObj, setAddMsgObj] = useState({
    title: "",
    message: "",
  });
  const createTemplateTitle = useRef(null);
  const createTemplateMessage = useRef(null);
  const createTemplateForm = useRef(null)
  const messageTextbox = useRef(null)
  const templateTitle = useRef(null)

  const getQueryParams = async () => {
    const keyword = utils.getQueryVariable("search");
    const srtBy = utils.getQueryVariable("sortBy");
    const srtType = utils.getQueryVariable("sortType");

    const queryParams = new URLSearchParams();

    console.log("search", keyword);
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

  useEffect(() => {
    setSortBy(utils.getQueryVariable("sortBy"));
    setSortType(utils.getQueryVariable("sortType"));
  }, []);

  /**
   * Update keyword
   */
  const handleKeywordChange = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };

  /**
   * Trigger search when keyword is empty
   */
  useEffect(() => {
    if (keyword == "") {
      handleSearch({ preventDefault: () => {} });
    }
  }, [keyword]);

  /**
   * Handle options toggle
   */
  const toggleOptions = (index) => {
    setOption(index !== option ? index : null);
  };

  /**
   * Handle search functionality
   */
  const handleSearch = (event) => {
    event.preventDefault();

    utils.addQueryParameter("page", 1);
    if (keyword) {
      utils.addQueryParameter("search", keyword);
    } else {
      utils.removeQueryParameter("search");
    }
  };

  const openModal = () => {
    setIsEdit(false);
    setSMSModal(true);
  };

  const handleSortBy = (field) => {
    // Set sort type
    let type = "asc";
    if (field == sortBy) {
      if (sortType == "asc") {
        type = "dsc";
      }
    }

    // Set state and Update query param
    setSortBy(field);
    setSortType(type);
    utils.addQueryParameter("sortBy", field);
    utils.addQueryParameter("sortType", type);
  };

  const getThisMessage = (message, i) => {
    setActiveMessage(
      activeMessage === null ? i : activeMessage === i ? null : i
    );
    setEditMsgObj({
      title: smsTemplates[i].title,
      message: smsTemplates[i].message,
    });
    setEditstate(false);
  };

  useEffect(() => {}, [smsTemplates]);

  // ADD Keyword to Edit SMS template
  const addKeywordEdit = (e) => {
    e.preventDefault();
    let textBox = messageTextbox.current;
    let cursorStart = textBox.selectionStart;
    let cursorEnd = textBox.selectionEnd;
    let textValue = textBox.value;

    console.log();

    try {
      if (cursorStart || cursorStart == "0"
      ) {
        console.log("VIA CURSOR");
        var startToText = "";
        console.log(textBox.selectionStart);
        textBox.value =
          textBox.value.substring(0, cursorStart) +
          " [" +
          e.target.textContent +
          "] " +
          textBox.value.substring(cursorEnd, textValue.length);

        setEditMsgObj({
          ...editMsgObj,
          message: textBox.value,
        });

        console.log("editMsgObj", editMsgObj, textBox.value);

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
        console.log(startToText.length);
      } else {
        console.log("VIA END POINT");

        textBox.value = textBox.value + " [" + e.target.textContent + "] ";
        setEditMsgObj({
          ...editMsgObj,
          message: textBox.value,
        });
        textBox.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Add edit template message onchange
  const editTemplateMessage = (e) => {
    messageTextbox.current.value.trim().length !== 0 &&
      setEditMsgObj({
        ...editMsgObj,
        message: e.target.value,
      });

    console.log("editMsgObj", editMsgObj);
  };

  // Add edit template title onchange
  const editTemplateTitle = (e) => {
    templateTitle.current.value.trim().length !== 0 &&
      setEditMsgObj({
        ...editMsgObj,
        title: e.target.value,
      });
  };

  // Save edit template
  const saveEditstate = (e) => {
    e.preventDefault();
    if(templateTitle.current.value.trim().length !== 0 && messageTextbox.current.value.trim().length !== 0) {
      let copyTemplate = smsTemplates;

      copyTemplate[activeMessage] = editMsgObj;

      console.log("editMsgObj...", editMsgObj);

      setSMSTemplates(copyTemplate);

      setEditstate(false);

      setEditMsgObj({
        title: smsTemplates[activeMessage].title,
        message: smsTemplates[activeMessage].message,
      });

      setKeywordSuggesion(false);
    }
    else {
      if(templateTitle.current.value.trim().length === 0) {
        setErrorMsg("Title cannot be blank!");
        setTimeout(() => {
          setErrorMsg("")
        }, 5000);
      }
      if(messageTextbox.current.value.trim().length === 0) {
        setErrorMsg("Message cannot be blank!");
        setTimeout(() => {
          setErrorMsg("")
        }, 5000);
      }
      if(messageTextbox.current.value.trim().length === 0 && templateTitle.current.value.trim().length === 0) {
        setErrorMsg("Message and Title cannot be blank!");
        setTimeout(() => {
          setErrorMsg("")
        }, 5000);
      }
    }
  };

  const closeModal = () => {
    setSMSModal(false);
  };

  // ADD Keyword to New SMS template
  const addThisTag = (e) => {
    let addTextarea = createTemplateMessage.current;
    let cursorStart = addTextarea.selectionStart;
    let cursorEnd = addTextarea.selectionEnd;
    let textValue = addTextarea.value;

    try {
      if (cursorStart || cursorStart == "0") {
        var startToText = "";

        addTextarea.value =
          addTextarea.value.substring(0, cursorStart) +
          " [" +
          e.target.textContent +
          "] " +
          addTextarea.value.substring(cursorEnd, textValue.length);

        setAddMsgObj({
          ...addMsgObj,
          message: addTextarea.value,
        });

        startToText =
          addTextarea.value.substring(0, cursorStart) +
          "[" +
          e.target.textContent +
          "]";
        addTextarea.focus();
        addTextarea.setSelectionRange(
          startToText.length + 1,
          startToText.length + 1
        );
      } else {
        addTextarea.value =
          addTextarea.value + " [" + e.target.textContent + "] ";
        setAddMsgObj({
          ...addMsgObj,
          message: addTextarea.value,
        });
        addTextarea.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Add new template message onchange
  const addTemplateTitle = (e) => {
    createTemplateTitle.current.value.trim().length !== 0 &&
      setAddMsgObj({
        ...addMsgObj,
        title: createTemplateTitle.current.value,
      })
  };

  // Add new template title onchange
  const addTemplateMessage = (e) => {    
    createTemplateMessage.current.value.trim().length !== 0 &&
      setAddMsgObj({
        ...addMsgObj,
        message: e.target.value,
      });
  };

  // Save new template function
  const saveMessage = (e) => {
    let copyTemplate = smsTemplates;
    if(createTemplateTitle.current.value.trim().length !== 0 && createTemplateMessage.current.value.trim().length !== 0) {
      copyTemplate = [...copyTemplate, addMsgObj]

      setSMSTemplates(copyTemplate);
          
      setAddMsgObj({
        title: "",
        message: "",
      })
    } else {
      setErrorMsg("Some information missing!");
      setTimeout(() => {
        setErrorMsg("")
      }, 5000);
    }
  };

  // Save new template and close modal
  const saveandNew = (e) => {
    e.preventDefault();
    try {
      if (
        addMsgObj.title.trim().length !== 0 &&
        addMsgObj.message.trim().length !== 0
      ) {
        saveMessage(e.target);
        createTemplateForm.current.reset();
      }
    } catch (err) {
      console.log(err);
    }
        
    setAddMsgObj({
      title: "",
      message: "",
    })
  };

  // Save new template and reset form
  const saveSMSTemplate = (e) => {
    e.preventDefault();
    try {
      if (
        addMsgObj.title.trim().length !== 0 &&
        addMsgObj.message.trim().length !== 0
      ) {
        saveMessage(e.target);
        createTemplateForm.current.reset();
        setSuccessMsg("SMS template saved!")
        closeModal(false);
        setTimeout(() => {
          setSuccessMsg("")
        }, 5000);
      }
      else {
        if(addMsgObj.title.trim().length === 0) {
          setErrorMsg("Please give Message title!");
          setTimeout(() => {
            setErrorMsg("")
          }, 5000);
        }
        if(addMsgObj.message.trim().length === 0) {
          setErrorMsg("Please give Message content!");
          setTimeout(() => {
            setErrorMsg("")
          }, 5000);
        }
        if(addMsgObj.title.trim().length === 0 && addMsgObj.message.trim().length === 0) {
          setErrorMsg("Please provide some content!");
          setTimeout(() => {
            setErrorMsg("")
          }, 5000);
        }
      }
    } catch (err) {
      setErrorMsg(err);
      setTimeout(() => {
        setErrorMsg("")
      }, 5000);
    }
        
    setAddMsgObj({
      title: "",
      message: "",
    })
  };

  useEffect(() => {}, [addMsgObj]);

  const paginationCallbackHandle = () => {};

  return (
    <div className="dashInnerUI smsListingPage">
      {isLoader ? <Loader /> : ""}

      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Setting</li>
            <li>Templates</li>
            <li>SMS Template</li>
          </ul>
          <h2 className="inDashboardHeader">SMS Template</h2>
          <p className="userListAbout">Set SMS communication templates</p>
        </div>
        <div className="listFeatures">
          <div className="searchBar searchbar2">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                name="search"
                placeholder="Search SMS templates"
                autoComplete="off"
                onChange={handleKeywordChange}
              />
              <button className="searchIcon"></button>
            </form>
          </div>
          <button className="creatUserBtn" onClick={openModal}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create SMS Template</span>
          </button>
        </div>
      </div>
      {successMsg && <SuccessAlert message={successMsg}></SuccessAlert>}
      {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}
      {warningMsg && <WarningAlert message={warningMsg}></WarningAlert>}

      <div className="userListBody smsListing d-flex">
        <div className="listBody">
          <ul className="tableListing">
            <li className="listHeading">
              <div
                className={
                  "messageTitle " +
                  (sortBy == "title" ? "sort " + sortType : "")
                }
                onClick={() => handleSortBy("title")}
              >
                Title
              </div>
              <div
                className={
                  "messageDeet " +
                  (sortBy == "message" ? "sort " + sortType : "")
                }
                onClick={() => handleSortBy("message")}
              >
                Message
              </div>
            </li>
            {smsTemplates &&
              smsTemplates.map((sms, i) => (
                <li
                  key={"smsTemplate-" + i}
                  onClick={() => getThisMessage(sms, i)}
                  className={activeMessage === i ? "active" : ""}
                >
                  <div className="messageTitle">{sms.title}</div>
                  <div className="messageDeet">{sms.message}</div>
                </li>
              ))}
          </ul>
        </div>

        <div className="previewSpaceTemplate">
          <div className="headspaceTemplate d-flex">
            <figure>
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z"
                  stroke="#305671"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5779 12C13.2347 12 14.5779 10.6569 14.5779 9C14.5779 7.34315 13.2347 6 11.5779 6C9.92103 6 8.57788 7.34315 8.57788 9C8.57788 10.6569 9.92103 12 11.5779 12Z"
                  stroke="#305671"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </figure>
            <span>SMS Preview</span>
          </div>
          <div className="templateOuter d-flex">
            <div
              className={
                !smsTemplates || smsTemplates < 0
                  ? "templateBody d-flex"
                  : "templateBody"
              }
              style={{
                display: activeMessage === null && "flex",
                flexDirection: activeMessage === null && "column",
                justifyContent: activeMessage === null && "center",
                alignItems: activeMessage === null && "center",
              }}
            >
              {activeMessage === null && (
                <p
                  style={{
                    width: "191px",
                    fontSize: "13px",
                    lineHeight: "19px",
                    textAlign: "center",
                    color: "#9BAEBC",
                  }}
                >
                  Please select an SMS Template to view the preview
                </p>
              )}

              {activeMessage !== null && (
                <div className="templateInner">
                  <header className="templateHeader">
                    {!editState && smsTemplates[activeMessage].title}
                    {editState && (
                      <input
                        readOnly={editState === true ? false : true}
                        defaultValue={smsTemplates[activeMessage].title}
                        onChange={(e) => editTemplateTitle(e)}
                        id="templateTitle"
                        ref={templateTitle}
                      />
                    )}

                    {!editState && (
                      <button
                        className="btn"
                        onClick={() => setEditstate(!editState)}
                      >
                        <svg
                          width="14"
                          height="15"
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.7938 9.10271V12.3207C11.7938 12.6403 11.6668 12.9468 11.4408 13.1728C11.2149 13.3988 10.9084 13.5257 10.5888 13.5257H2.15178C1.83219 13.5257 1.52569 13.3988 1.29971 13.1728C1.07373 12.9468 0.946777 12.6403 0.946777 12.3207V3.88371C0.946777 3.56413 1.07373 3.25763 1.29971 3.03165C1.52569 2.80567 1.83219 2.67871 2.15178 2.67871H5.36978"
                            stroke="#9BAEBC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.5888 1.47363L12.9998 3.88463L6.97381 9.91063H4.56281V7.49963L10.5888 1.47363Z"
                            stroke="#9BAEBC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}

                    {editState && (
                      <button className="btn" onClick={(e) => saveEditstate(e)}>
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.5 16H1.5C1.36739 16 1.24021 15.9473 1.14645 15.8536C1.05268 15.7598 1 15.6326 1 15.5V1.50001C1 1.3674 1.05268 1.24022 1.14645 1.14645C1.24021 1.05269 1.36739 1.00001 1.5 1.00001H11.5C11.5658 0.999628 11.631 1.01224 11.692 1.03712C11.7529 1.06201 11.8083 1.09867 11.855 1.14501L14.855 4.14501C14.9013 4.19173 14.938 4.24714 14.9629 4.30806C14.9878 4.36897 15.0004 4.43421 15 4.50001V15.5C15 15.6326 14.9473 15.7598 14.8536 15.8536C14.7598 15.9473 14.6326 16 14.5 16ZM2 15H14V4.70001L11.3 2.00001H2V15Z"
                            fill="#305671"
                            stroke="#305671"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M10.1521 4.84172H4.88806C4.8219 4.84521 4.7557 4.83552 4.69331 4.81321C4.63092 4.7909 4.57359 4.75641 4.52465 4.71175C4.47571 4.66709 4.43613 4.61314 4.40822 4.55305C4.38031 4.49296 4.36462 4.42793 4.36206 4.36172V1.47972C4.36462 1.41351 4.38031 1.34847 4.40822 1.28838C4.43613 1.22829 4.47571 1.17435 4.52465 1.12969C4.57359 1.08503 4.63092 1.05054 4.69331 1.02823C4.7557 1.00591 4.8219 0.996225 4.88806 0.999719H10.1521C10.2182 0.996225 10.2844 1.00591 10.3468 1.02823C10.4092 1.05054 10.4665 1.08503 10.5155 1.12969C10.5644 1.17435 10.604 1.22829 10.6319 1.28838C10.6598 1.34847 10.6755 1.41351 10.6781 1.47972V4.36172C10.6755 4.42793 10.6598 4.49296 10.6319 4.55305C10.604 4.61314 10.5644 4.66709 10.5155 4.71175C10.4665 4.75641 10.4092 4.7909 10.3468 4.81321C10.2844 4.83552 10.2182 4.84521 10.1521 4.84172ZM5.41506 3.88172H9.62606V1.95972H5.41506V3.88172Z"
                            fill="#305671"
                            stroke="#305671"
                            strokeWidth="0.5"
                          />
                          <path
                            d="M11.6031 12.9205H4.3961C4.26415 12.9245 4.13595 12.8762 4.03947 12.7861C3.94299 12.696 3.88606 12.5714 3.8811 12.4395V7.63946C3.8858 7.50736 3.94261 7.3825 4.03912 7.29217C4.13563 7.20185 4.26398 7.15341 4.3961 7.15746H11.6041C11.7359 7.15341 11.8639 7.20157 11.9604 7.29146C12.0569 7.38136 12.1139 7.50572 12.1191 7.63746V12.4375C12.1147 12.5699 12.0578 12.6952 11.9611 12.7858C11.8643 12.8763 11.7356 12.9248 11.6031 12.9205ZM4.9111 11.9575H11.0891V8.11746H4.9111V11.9575Z"
                            fill="#305671"
                            stroke="#305671"
                            strokeWidth="0.5"
                          />
                        </svg>
                      </button>
                    )}
                  </header>
                  <div className="bodyEditTemplate">
                    {editState === false ? (
                      <div className="textView">
                        {smsTemplates[activeMessage].message}
                      </div>
                    ) : (
                      <textarea
                        readOnly={editState === true ? false : true}
                        defaultValue={smsTemplates[activeMessage].message}
                        onChange={(e) => editTemplateMessage(e)}
                        id="messageTextbox"
                        ref={messageTextbox}
                      ></textarea>
                    )}
                    {keywordSuggesion && (
                      <div className="keywordBox">
                        <div className="searchKeyword">
                          <div className="searchKeyBox">
                            <input type="text" />
                          </div>
                          <div className="cancelKeySearch">
                            <button
                              onClick={() => setKeywordSuggesion(false)}
                            ></button>
                          </div>
                        </div>
                        <div className="keywordList">
                          <ul>
                            <li>
                              <button onClick={(e) => addKeywordEdit(e)}>
                                First Name
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEdit(e)}>
                                Last Name
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEdit(e)}>
                                Address
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEdit(e)}>
                                City
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEdit(e)}>
                                Country
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <footer
                    className="editPageFooter d-flex"
                    style={{
                      backgroundColor: editState && "#fff",
                    }}
                  >
                    <button className="btn">
                      <img
                        src={right_icon}
                        alt="next"
                        style={{
                          transform: "scaleX(-1)",
                        }}
                      />
                    </button>
                    {!editState && (
                      <>
                        <span>Page 1 of 2</span>
                        <button className="btn">
                          <img src={right_icon} alt="next" />
                        </button>
                      </>
                    )}
                    {editState && (
                      <button
                        className="btn browseKeywords"
                        style={{
                          marginRight: "0",
                          padding: "0",
                        }}
                        onClick={() => setKeywordSuggesion(true)}
                      >
                        <img src={browse_keywords} alt="keywords" />
                      </button>
                    )}
                  </footer>
                </div>
              )}
            </div>
            <div className="templateFooter"></div>
          </div>
        </div>
      </div>

      {smsModal && (
        <div className="modalDependent modalBackdrop">
          {isLoader ? <Loader /> : ""}
          <div className="slickModalBody">
            <div className="slickModalHeader">
              <button className="topCross" onClick={() => closeModal(false)}>
                <img src={cross} alt="" />
              </button>
              <div className="circleForIcon">
                <img src={sms_template} alt="" />
              </div>
              <h3>Add an SMS Template</h3>
              <p>Fill out below details to create a new SMS Template</p>
            </div>
            <div className="modalForm">
              <Scrollbars
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical" />
                )}
              >
                <form method="post" ref={createTemplateForm}>
                  <div className="cmnFormRow">
                    <label className="cmnFieldName d-flex f-justify-between">
                      Enter Template Title
                    </label>
                    <div className="cmnFormField">
                      <input
                        className="cmnFieldStyle"
                        placeholder="Title..."
                        id="newTemplateTitle"
                        ref={createTemplateTitle}
                        onChange={(e) => addTemplateTitle(e)}
                      />
                    </div>
                    {/* <span className="errorMsg">Please provide name.</span> */}
                  </div>
                  <div className="cmnFormRow">
                    <label className="cmnFieldName d-flex f-justify-between">
                      Message
                    </label>
                    <div className="cmnFormField">
                      <textarea
                        className="cmnFieldStyle"
                        placeholder="Message"
                        id="newTemplateMessage"
                        ref={createTemplateMessage}
                        onChange={(e) => addTemplateMessage(e)}
                      ></textarea>
                    </div>
                    {/* <span className="errorMsg">Please provide name.</span> */}
                    <div className="smsTagsTemplate">
                      <span onClick={(e) => addThisTag(e)}>fname</span>
                      <span onClick={(e) => addThisTag(e)}>lname</span>
                      <span onClick={(e) => addThisTag(e)}>name</span>
                      <span onClick={(e) => addThisTag(e)}>company_name</span>
                      <span onClick={(e) => addThisTag(e)}>website</span>
                      <span onClick={(e) => addThisTag(e)}>phone</span>
                      <span onClick={(e) => addThisTag(e)}>facebook_link</span>
                      <span onClick={(e) => addThisTag(e)}>twitter_link</span>
                      <span onClick={(e) => addThisTag(e)}>email_id</span>
                      <span onClick={(e) => addThisTag(e)}>address</span>
                    </div>
                  </div>

                  <div className="modalbtnHolder w-100">
                    <button
                      className=" saveNnewBtn"
                      onClick={(e) => saveSMSTemplate(e)}
                    >
                      Save <img src={arrow_forward} alt="" />
                    </button>
                    <button
                      className=" saveNnewBtn"
                      onClick={(e) => saveandNew(e)}
                    >
                      Save & New <img src={arrow_forward} alt="" />
                    </button>
                  </div>
                </form>
              </Scrollbars>
            </div>
          </div>
        </div>
      )}

      {/* <Pagination
              type="sms-template"
              paginationData={paginationData}
              dataCount={smsCount}
              callback={paginationCallbackHandle}
            /> */}
    </div>
  );
};

export default SmsTemplate;
