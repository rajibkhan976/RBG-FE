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

 
  const paginationCallbackHandle = () => {

  };

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
                Message
              </div>
            </li>
            <li>
              <div className="messageTitle">
                <button className="btn">
                Welcome Message
                </button>
              </div>
              <div className="messageDeet">
                  <button className="btn">
                  <p>Hello, [fname] [lname] This is a welcome message from Red Belt Gym.</p>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div className="previewSpaceTemplate">
          <div className="templateOuter d-flex">
                <div className="templateBody"></div>
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
