import React, { useState, useEffect, useRef } from "react";
import userImg from "../../assets/images/user.png";
import plus_icon from "../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../assets/images/info_3dot_icon.svg";
import phone_icon_small_blue from "../../assets/images/phone_icon_small_blue.svg";
import mobile_icon_blue from "../../assets/images/mobile_icon_blue.svg";
import image_icon_blue from "../../assets/images/image_icon_blue.svg";
import BuyAndAssignNumber from "./buyNumberModal";
import { ErrorAlert, SuccessAlert } from "../shared/messages";
import Loader from "../shared/Loader";
import { NumberServices } from "../../services/number/NumberServices";
import Pagination from "../shared/Pagination";
import ConfirmBox from "../shared/confirmBox";
import { utils } from "../../helpers";

const NumberListing = () => {

  const [isLoader, setIsLoader] = useState(false);
  const [buyNumModalShow, setBuyNumModalShow] = useState(false);
  const messageDelay = 5000; // ms
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("asc");
  const [numbers, setNumbers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const optionsToggleRef = useRef();
  const [paginationData, setPaginationData] = useState(
    {
      count: null,
      totalPages: null,
      currentPage: 1,
      limit: 10
    }
  );
  const [isAlert, setIsAlert] = useState(
    {
      show: false,
      el: null,
    }
  );

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

  const buyNumber = () => {
    setBuyNumModalShow(true);
  }

  const closeBuyNumberModal = () => {
    setBuyNumModalShow(false);
  }

   /**
   * Get all query params
   */
    const getQueryParams = async () => {
      const keyword = utils.getQueryVariable('search');
      const fromDt = utils.getQueryVariable('fromDate');
      const toDt = utils.getQueryVariable('toDate');
      const srtBy = utils.getQueryVariable('sortBy');
      const srtType = utils.getQueryVariable('sortType');
      const queryParams = new URLSearchParams();
      if (keyword) {
        queryParams.append("search", keyword);
      }
      if (fromDt) {
        queryParams.append("fromDate", fromDt);
      }
      if (toDt) {
        queryParams.append("toDate", toDt);
      }
      if (srtBy) {
        queryParams.append("sortBy", srtBy);
      }
      if (srtType) {
        queryParams.append("sortType", srtType);
      }
      return queryParams;
    }

  /**
   * Fetch number list
   */
  const fetchNumberList = async () => {
    setIsLoader(true);
    let pageId = utils.getQueryVariable('page') || 1;
    let queryParams = await getQueryParams();
    
    try {
      let result = await NumberServices.list(pageId, queryParams);
      setNumbers(result.numbers);
      let superadmin = result.userType == "superadmin" ? true : false;
      setIsSuperAdmin(superadmin);
      setPaginationData({
        ...paginationData,
        count: result.pagination.count,
        currentPage: result.pagination.currentPage,
        totalPages: result.pagination.totalPages
      });
    } catch (e) {
      setErrorMsg(e.message);
    }
    setIsLoader(false); 
    
  }

  useEffect(() => {
   // fetchNumberList();
  }, []);

  const addNewNumber = (newNumber) => {
    setNumbers([newNumber, ...numbers]);
  }

  const handleSortBy = (field) => {
    // Set sort type
    let type = "asc"
    if (field == sortBy) {
        if (sortType == "asc") {
            type = "dsc";
        }
    }

    // Set state and Update query param
    setSortBy(field);
    setSortType(type);
    utils.addQueryParameter('sortBy', field);
    utils.addQueryParameter('sortType', type);

    if (field == "capacity") {
      return false;
    }

    // Fetch data
    fetchNumberList()
  }

  /**
   * Update keyword
   */
  const handleKeywordChange = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  }

  /**
   * Trigger search when keyword is empty
   */
  useEffect(() => {
    if (keyword == "") {
        handleSearch({ preventDefault: () => { } })
    }
  }, [keyword])

  /**
   * Handle search functionality
   */
  const handleSearch = (event) => {
    event.preventDefault();

    utils.addQueryParameter('page', 1);
    if (keyword) {
        utils.addQueryParameter('search', keyword);
    } else {
        utils.removeQueryParameter('search');
    }
    fetchNumberList();
  }

  /**
   * Release or delete a number
   * @param {string} index 
   */
  const deleteNumber = async (el, isConfirmed = null) => {
    
    if (!isConfirmed && el) {
      setIsAlert({
          show: true,
          el: el,
      });
    } else if (isConfirmed == "yes" && el) {
      setIsAlert({
        show: false,
        el: el,
      });
      try {
        setIsLoader(true);
        let response = await NumberServices.release(el._id); 
        setSuccessMsg(response);
        numbers.splice(numbers.indexOf(el) , 1);
        setNumbers(numbers);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoader(false);
      }

    } else {
      setIsAlert({
        show: false,
        el: null,
      });
    }
  }

  /**
   * Handle options toggle
   */
  const toggleOptions = (index) => {
    setOption(index !== option ? index : null);
  };

  /**
   * Handle outside click
   */
  const handleClickOutside = (event) => {
    if (optionsToggleRef.current.contains(event.target)) {
        return;
    }
    setOption(null);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

 

  return (
    <>      
      {isAlert.show &&
        <ConfirmBox
            callback={(isConfirmed) => deleteNumber(isAlert.el, isConfirmed)}
            message="Are you sure you want to release this number? Note: this number will be removed from the system and twilio, and you can not revert it back."
        />}

      {successMsg &&
        <SuccessAlert message={successMsg}></SuccessAlert>
      }
      {errorMsg &&
        <ErrorAlert message={errorMsg}></ErrorAlert>
      }
      {isLoader && <Loader />}
      <div className="dashInnerUI">
        <div className="userListHead">
          <div className="listInfo">
            <ul className="listPath">
              <li>Number Management</li>
              <li>Number List</li>
            </ul>
            <h2 className="inDashboardHeader">Number List { isSuperAdmin && paginationData && paginationData.count ? "(" + paginationData.count + ")" : ""}</h2>
            <p className="userListAbout">
              Lorem ipsum dolor sit amet. Semi headline should be here.
            </p>
          </div>
          {isSuperAdmin && 
            <div className="listFeatures">
              <div className="searchBar">
                <form onSubmit={handleSearch}>
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="Search groups"
                    onChange={handleKeywordChange}
                    autoComplete="off"
                    value={keyword}
                  />
                  <button className="searchIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19.069"
                      height="19"
                      viewBox="0 0 19.069 19"
                      id="search-ico"
                    >
                      <g transform="translate(-1.5 -1.5)">
                        <path
                          className="a"
                          d="M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z"
                        />
                        <path
                          className="a"
                          d="M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z"
                          transform="translate(-7.142 -7.143)"
                        />
                      </g>
                    </svg>
                  </button>
                </form>
              </div>

              <button className="creatUserBtn" onClick={buyNumber}>
                <img className="plusIcon" src={plus_icon} alt="" />
                <span>Buy & Assign Number</span>
              </button>
            </div>
          }
        </div>
        <div className="userListBody" ref={optionsToggleRef}>
          <div className="listBody">
            <ul className="tableListing">
              <li className="listHeading">
                <div 
                  className={"userName " + (sortBy == "name" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("name")}>User Name</div>
                <div 
                  className={"phoneNum " + (sortBy == "organization" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("organization")}>Organization</div>
                <div 
                  className={"cell_xs " + (sortBy == "number" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("number")}>Number</div>
                <div 
                  className={"cell_xs " + (sortBy == "country" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("country")}>Country</div>
                <div 
                  className={"cell_xs " + (sortBy == "region" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("region")}>Region</div>
                <div 
                  className={"cell_xs " + (sortBy == "postalCode" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("postalCode")}>Postal Code</div>
                <div 
                  className={"cell_xs " + (sortBy == "capacity" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("capacity")}>Capacity</div>
                <div 
                  className={"createDate " + (sortBy == "createdAt" ? "sort " + sortType : "") }
                  onClick={() => handleSortBy("createdAt")}>Created on</div>
              </li>
              {numbers && numbers.map((el, key) => {
                return (
                  <React.Fragment key={key + "_numb"}>
                    <li className="owerInfo">
                      <div className="userName">
                        <button className="btn">
                          <span
                            className="blur"
                          >
                            <img
                              className="thumbImg"
                              src={el.image ? el.image : userImg}
                              alt="avatar"
                            />
                          </span>
                          <p>{el.ownerFirstName + " " + el.ownerLastName}</p>
                        </button>
                      </div>
                      <div className="cell_xl">
                        <p>{el.organization}</p>
                      </div>
                      <div className="cell_xs">
                        <p>{el.number}</p>
                      </div>
                      <div className="cell_xs">
                        <p>{el.country}</p>
                      </div>
                      <div className="cell_xs">
                        <p>{el.region}</p>
                      </div>
                      <div className="cell_xs">
                        <p>{el.postalCode}</p>
                      </div>
                      <div className="cell_xs">
                        <div className="numberCapacity">
                          <span>
                            <img src={phone_icon_small_blue} alt="" />
                          </span>
                          <span>
                            <img src={mobile_icon_blue} alt="" />
                          </span>
                          <span>
                            <img src={image_icon_blue} alt="" />
                          </span>
                        </div>
                      </div>
                      
                      <div className="createDate">
                        <button className="btn">{el.createdAt}</button>
                        {isSuperAdmin && 
                          <div className="info_3dot_icon">
                              <button
                                  className="btn"
                                  onClick={() => {
                                      toggleOptions(key);
                                  }}
                              >
                                  <img src={info_3dot_icon} alt="" />
                              </button>
                          </div>
                        }
                        
                        <React.Fragment key={key + "_fragment"}>
                            {/* {console.log('Here', option, key)} */}
                            <div
                                className={
                                    option === key ? "dropdownOptions listOpen" : "listHide"
                                }
                            >
                                <button className="btn "
                                onClick={() => {
                                  deleteNumber(el);
                                }}>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12.347"
                                            height="13.553"
                                            viewBox="0 0 12.347 13.553"
                                            className="deleteIcon"
                                        >
                                            <g transform="translate(0.75 0.75)">
                                                <path className="a" transform="translate(-3 -3.589)" />
                                                <path
                                                    className="a"
                                                    d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                                    transform="translate(-3.795 -2)"
                                                />
                                                <line
                                                    className="a"
                                                    y2="3"
                                                    transform="translate(4.397 6.113)"
                                                />
                                                <line
                                                    className="a"
                                                    y2="3"
                                                    transform="translate(6.397 6.113)"
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                    Release
                                </button>
                            </div>
                        </React.Fragment>
                        
                      </div>
                      
                    </li>
                  </React.Fragment>
                )
              })
              }
              {/* {!numbers.length && 
                <li className="userName" >
                  <div className="cell_xl">No record found</div>
                </li>
              }  */}
            </ul>
          </div>
        </div>

        {paginationData && paginationData.totalPages > 1 && <Pagination
          type="numbers"
          paginationData={paginationData}
          dataCount={paginationData.count}
          callback={fetchNumberList} />}

        {buyNumModalShow &&
          <BuyAndAssignNumber
            closeModal={closeBuyNumberModal}
            successMsg={(msg) => setSuccessMsg(msg)}
            errorMsg={(msg) => setErrorMsg(msg)}
            prependRecord={(newRecord) => addNewNumber(newRecord)} />}

      </div>
    </>
  );
};

export default NumberListing;
