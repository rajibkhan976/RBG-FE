import React, { useState, useEffect } from "react";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import { utils } from "../../../../helpers";
// import moment from "moment";
import Pagination from "../../../shared/Pagination";
import Loader from "../../../shared/Loader";
// import list_board_icon from "../../../../assets/images/list_board_icon.svg";
// import { bucketUrl } from "../../../../configuration/config";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
// import ConfirmBox from "../../../shared/confirmBox";

const SmsTemplate = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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
      selected: false,
    },
    {
      title: "Onboarding Message",
      message:
        "Hello [fname] [lname], Welcome onboard. We hope you will get an amazing experience and fine…",
      selected: false,
    },
    {
      title: "Prospect Offer",
      message:
        "Hello, [fname] [lname] Don’t miss out the additional 15% discount on Admission this week.",
      selected: false,
    },
    {
      title: "Hot Leads 50% Offer",
      message:
        "Hello, [fname] [lname] Here we would like to offer you 50% discount since you have requested to…",
      selected: false,
    },
    {
      title: "Auto Unsubscribe",
      message:
        "Hello, [fname] [lname] If you do not wish to get any SMS from us in future please click here [link] to…",
      selected: false,
    },
    {
      title: "General Support Message",
      message:
        "Hello, [fname] [lname] Got a question? Don’t worry we are right here to help you out. Call us at…",
      selected: false,
    },
    {
      title: "Support Message for Premium Members",
      message:
        "Hello, [fname] [lname] Thanks for being a valuable member of FitBit. We have appointed [d_supp…",
      selected: false,
    },
    {
      title: "Non-paying members message",
      message:
        "Hello, [fname] [lname] We have noticed that you have failed to make your monthly Gym FEE on…",
      selected: false,
    },
    {
      title: "Dependent Message",
      message: "Hello, [fname] [lname] Message body",
      selected: false,
    },
    {
      title: "New Product Launch Message",
      message: "Hello, [fname] [lname] another message body",
      selected: false,
    },
    {
      title: "Intro Message - General",
      message: "Hello, [fname] [lname] another new Message body",
      selected: false,
    },
  ]);

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

  const getThisMessage = (msg, i) => {
    let selectedMessage = {
      title: msg.title,
      message: msg.message,
      selected: msg.selected,
    };
    let notSelectedMessage = smsTemplates.map((message, i) => {
      let placeholderOther = message.title !== selectedMessage.title && message;

      // placeholderOther.selected = false;
      console.log("placeholderOther:::", placeholderOther, placeholderOther.selected);
    });


    selectedMessage.selected = true;

    setSMSTemplates([...smsTemplates, selectedMessage]);
  };

  useEffect(() => {}, [smsTemplates]);

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
                  onClick={(e) => getThisMessage(sms, i)}
                >
                  <div className="messageTitle">{sms.title}</div>
                  <div className="messageDeet">{sms.message}</div>
                </li>
              ))}
          </ul>
        </div>

        <div className="previewSpaceTemplate">
          <header className="d-flex">
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.5779 12C13.2347 12 14.5779 10.6569 14.5779 9C14.5779 7.34315 13.2347 6 11.5779 6C9.92103 6 8.57788 7.34315 8.57788 9C8.57788 10.6569 9.92103 12 11.5779 12Z"
                  stroke="#305671"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </figure>
            <span>SMS Preview</span>
          </header>
          <div className="templateOuter d-flex">
            <div
              className={
                !smsTemplates || smsTemplates.length < 1
                  ? "templateBody d-flex"
                  : "templateBody"
              }
              style={{
                flexDirection:
                  (!smsTemplates || smsTemplates.length < 1) && "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!smsTemplates ||
                (smsTemplates.length < 1 && (
                  <p
                    style={{
                      width:
                        (!smsTemplates || smsTemplates.length < 1) && "191px",
                      fontSize:
                        (!smsTemplates || smsTemplates.length < 1) && "13px",
                      lineHeight:
                        (!smsTemplates || smsTemplates.length < 1) && "19px",
                      textAlign:
                        (!smsTemplates || smsTemplates.length < 1) && "center",
                      color:
                        (!smsTemplates || smsTemplates.length < 1) && "#9BAEBC",
                    }}
                  >
                    Please select an SMS Template to view the preview
                  </p>
                ))}

              {smsTemplates.map(
                (message, i) => message.selected && message.message
              )}
            </div>
            <div className="templateFooter"></div>
          </div>
        </div>
      </div>

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
