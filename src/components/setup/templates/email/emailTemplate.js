import React, { useState, useEffect } from "react";


import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import { utils } from "../../../../helpers";
import Pagination from "../../../shared/Pagination";
import Loader from "../../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";

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
        <button className="creatUserBtn" onClick={openModal}>
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
                  "messageTitle " + (sortBy == "title" ? "sort " + sortType : "")
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
            <li>
              <div className="messageTitle">
                  Welcome Message
              </div>
              <div className="messageDeet">
                  <p>Hello, [fname] [lname] This is a welcome message from Red Belt Gym.</p>
              </div>
            </li>
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
            <div className="templateBody">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;
