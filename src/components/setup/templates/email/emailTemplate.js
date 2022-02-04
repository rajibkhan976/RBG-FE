import React, { useState, useEffect } from "react";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import cross from "../../../../assets/images/cross.svg";
import email_template from "../../../../assets/images/email_template.svg"
import browse_keywords from "../../../../assets/images/icon_browse_keywords.svg";
import { utils } from "../../../../helpers";
import Pagination from "../../../shared/Pagination";
import Loader from "../../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
import EditorComponent from "./editor/Editor";
import Scrollbars from "react-custom-scrollbars-2";

const EmailTemplate = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [keyword, setKeyword] = useState(null);
  const [option, setOption] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [sortType, setSortType] = useState("asc");
  const [emailModal, setEmailModal] = useState(false);
  const [activeEmail, setActiveEmail] = useState(null);
  const [keywordSuggesion, setKeywordSuggesion] = useState(false);
  const [initialData, setInitialData] = useState([
    {
      title: "Product Teaser",
      header: "Making online payment is not hard anymore. Find how!",
      message: `<p>Hey,</p>
          <p>Greetings from Team RBG.</p>
          <p>We present our quick and easy way to pay all your bills digitally to ensure avoiding physical contacts during this Covid-19 spread up.</p>
          <p><img src="data:image/png;base64,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" alt="Image" width="203" height="209" /></p>
          <p>Thanks,</p>
          <p>Brian</p>
          <p><span style="color: #55bbc9;"><a style="color: #55bbc9; text-decoration: underline;" title="You wont believe this" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener">Click</a></span><span style="color: #55bbc9;"><a style="color: #55bbc9; text-decoration: underline;" title="You wont believe this" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener"> </a><a style="color: #55bbc9; text-decoration: underline;" title="You wont believe this" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener">here</a></span> to unsubscribe from campaign</p>`,
    },
    {
      title: "Rocketman",
      header: "This is mission control",
      message: `<h1>This is Rocketman!</h1>
                <p><span style="color: #e03e2d;"><strong><span style="font-family: impact, sans-serif;">...an you're it!</span></strong></span></p>`
    }
  ]);

  const [editEmailObj, setEditEmailObj] = useState({
    title: "",
    header: "",
    message: ""
  })

  const [newMail, setNewMail] = useState({
    title: "",
    header: "",
    message: ""
  })

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
    setEmailModal(true);
    setActiveEmail(null)

    setKeyword(null)
    setKeywordSuggesion(false)
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

  const stringToHTML = (str) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    var dataHTML = "";

    for(var i = 0; i < doc.body.childNodes.length; i++){
      dataHTML += doc.body.childNodes[i].textContent
    }
    return (dataHTML.length < 100 ? dataHTML : dataHTML.substring(0, 100)+"...");
  };

  const getThisEmail = (email, i) => {
    setActiveEmail(
      activeEmail === null ? i : activeEmail === i ? null : i
    );
    setEditEmailObj({
      title: initialData[i].title,
      header: initialData[i].header,
      message: initialData[i].message
    })
    setKeyword(null)
    setKeywordSuggesion(false)
    console.log(email);
  }

  useEffect(()=>{},[editEmailObj])

  const editedEmailTemplate = (email, headerMessage) => {
    console.log('UPDATED EMAIL', email);
    let copyEmailTemplates = initialData;
    let currentTemplate = initialData[activeEmail];

    currentTemplate = {
      title: currentTemplate.title,
      header: headerMessage,
      message: email
    }

    copyEmailTemplates[activeEmail] = currentTemplate;

    console.log("copyEmailTemplates", copyEmailTemplates);

    setInitialData(copyEmailTemplates)
  }

  const createdEmailTemplate = (email) => {
    console.log("Created Mail:::", email);
  }

  useEffect(()=>{},[initialData])

  const addKeywordEmail = (e) => {
    e.preventDefault()
    let subjectInput = document.getElementById("newEmailTemplateSubject");
    let cursorStart = subjectInput.selectionStart;
    let cursorEnd = subjectInput.selectionEnd;
    let textValue = subjectInput.value;

    try {
        if (cursorStart || cursorStart == "0"
        ) {
            var startToText = "";
            subjectInput.value =
            subjectInput.value.substring(0, cursorStart) +
            " [" +
            e.target.textContent +
            "] " +
            subjectInput.value.substring(cursorEnd, textValue.length);

            setNewMail({
              ...newMail,
              header: subjectInput.value
            })

            startToText =
            subjectInput.value.substring(0, cursorStart) +
              "[" +
              e.target.textContent +
              "]";

            subjectInput.focus();
            subjectInput.setSelectionRange(
              startToText.length + 1,
              startToText.length + 1
            );

            console.log(subjectInput, cursorStart, cursorEnd, textValue);
        }
        else {
          subjectInput.value = subjectInput.value + " [" + e.target.textContent + "] ";

          setNewMail({
            ...newMail,
            header: subjectInput.value
          })
          subjectInput.focus();
        }
    } catch(err) {
      setErrorMsg(err)
      setTimeout(() => {
        setErrorMsg("")
      }, 5000);
    }
  }

  const saveEmailTemplate = (e) => {
    e.preventDefault()
    setEmailModal(false);
  }

  const saveAndNewEmailTemplate = (e) => {
    e.preventDefault();
    try {
      e.target.closest("form").reset();
    } catch (err) {
      console.log(err);
    }
  }

  const closeModal = () => {
    setEmailModal(false);
  };

  return (
    <div className="dashInnerUI emailListingPage">
      {isLoader ? <Loader /> : ""}

      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Setting</li>
            <li>Templates</li>
            <li>Email Template</li>
          </ul>
          <h2 className="inDashboardHeader">Email Template</h2>
          <p className="userListAbout">Set Email communication templates</p>
        </div>
        <div className="listFeatures">
          <div className="searchBar searchbar2">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                name="search"
                placeholder="Search Email templates"
                autoComplete="off"
                onChange={handleKeywordChange}
              />
              <button className="searchIcon"></button>
            </form>
          </div>
          <button 
            className="creatUserBtn" 
            onClick={openModal}
          >
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create a Email Template</span>
          </button>
        </div>
      </div>

      {successMsg && <SuccessAlert message={successMsg}></SuccessAlert>}
      {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}

      <div className="userListBody emailListing d-flex">
        <div className="listBody">
          <ul className="tableListing">
            <li className="listHeading userRole">
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
                Subject
              </div>
            </li>
            {initialData &&
              initialData.length > 0 &&
              initialData.map((emailData, i) => (
                <li 
                  key={i}
                  onClick={(e)=>getThisEmail(emailData, i)}
                  className={activeEmail === i && "active"}
                >
                  <div className="messageTitle">{emailData.title}</div>
                  <div className="messageDeet">
                    <p className="messageHeader">
                      {emailData.header}
                    </p>
                    <div className="dataMessageEmail" dangerouslySetInnerHTML={{__html: stringToHTML(emailData.message)}} />
                  </div>
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
            <span>Email Preview</span>
          </div>
          <div className="templateOuter d-flex">
            <div 
              className="templateBody"
              style={{
                display: activeEmail === null && "flex",
                alignItems: activeEmail === null && "center",
                justifyContent: activeEmail === null && "center"
              }}
            >
              {activeEmail === null ? 
                <p
                  style={{
                    width: "211px",
                    fontSize: "13px",
                    lineHeight: "19px",
                    textAlign: "center",
                    color: "rgb(155, 174, 188)"
                  }}
                >Please select an Email Template to view the preview</p>:
                <>
                  <EditorComponent
                    createNew={false}
                    initialData={initialData[activeEmail]}
                    editedEmailTemplate={editedEmailTemplate}
                    setActiveEmail={setActiveEmail}
                  />
                </>
              }
            </div>
          </div>
        </div>
      {emailModal &&  (
        <div className="modalAddEmail modalBackdrop">
          {isLoader ? <Loader /> : ""}
          <div className="slickModalBody">
            <div className="slickModalHeader">
              <button className="topCross" onClick={() => closeModal(false)}>
                <img src={cross} alt="" />
              </button>
              <div className="circleForIcon">
                <img src={email_template} alt="" />
              </div>
              <h3>Add an Email Template</h3>
              <p>Fill out below details to create a new Email Template</p>
            </div>
            <div className="modalForm">
              <Scrollbars
                renderThumbVertical={(props) => (
                  <div className="thumb-vertical" />
                )}
              >
                <form method="post">
                  <div className="cmnFormRow">
                    <label className="cmnFieldName d-flex f-justify-between">
                      Title
                    </label>
                    <div className="cmnFormField">
                      <input
                        className="cmnFieldStyle"
                        placeholder="Title..."
                        id="newEmailTemplateTitle"
                        
                      />
                    </div>
                    {/* <span className="errorMsg">Please provide name.</span> */}
                  </div>
                  <div className="cmnFormRow">
                    <label className="cmnFieldName d-flex f-justify-between">
                      Subject
                    </label>
                    <div className="cmnFormField">
                      <input
                        className="cmnFieldStyle btnPadding"
                        placeholder="Title..."
                        id="newEmailTemplateSubject"
                        
                      />
                      <button
                        className="btn browseKeywords"
                        style={{
                          marginRight: "0",
                          padding: "0",
                        }}
                        onClick={(e) => 
                          {setKeywordSuggesion(true)
                          e.preventDefault()}
                        }
                      >
                        <img src={browse_keywords} alt="keywords" />
                      </button>
                      {keywordSuggesion &&  <div className="keywordBox">
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
                              <button onClick={(e) => addKeywordEmail(e)}>
                                First Name
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEmail(e)}>
                                Last Name
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEmail(e)}>
                                Address
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEmail(e)}>
                                City
                              </button>
                            </li>
                            <li>
                              <button onClick={(e) => addKeywordEmail(e)}>
                                Country
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>}
                    </div>
                    {/* <span className="errorMsg">Please provide name.</span> */}
                  </div>
                  <div className="cmnFormRow">
                    <label className="cmnFieldName d-flex f-justify-between">
                      Subject
                    </label>
                    <div className="cmnFormField createNewEmailField">
                        <EditorComponent
                          createNew={true}
                          createdEmailTemplate={createdEmailTemplate}
                          initialData="Write here..."
                        />
                    </div>
                  </div>

                  <div className="modalbtnHolder w-100">
                    <button
                      className=" saveNnewBtn"
                      onClick={(e) => saveEmailTemplate(e)}
                    >
                      Save <img src={arrow_forward} alt="" />
                    </button>
                    <button
                      className=" saveNnewBtn"
                      onClick={(e) => saveAndNewEmailTemplate(e)}
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
      </div>
    </div>
  );
};

export default EmailTemplate;
