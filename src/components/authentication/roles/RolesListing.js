import React, { useEffect, useState, useRef, createRef } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import * as actionTypes from "../../../actions/types";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import Pagination from "../../shared/Pagination";
import ListHead from "../auth-shared/ListHead";
import noRecords from '../../../assets/images/noRecords.svg';
import plus_icon from '../../../assets/images/plus_icon.svg';
import Loader from "../../shared/Loader";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import { RoleServices } from "../../../services/authentication/RoleServices";
import { utils } from "../../../helpers";
import ConfirmBox from "../../shared/confirmBox";
import responses from "../../../configuration/responses";
import env from "../../../configuration/env";
import list_board_icon from "../../../assets/images/list_board_icon.svg";


const RolesListing = (props) => {
  const messageDelay = 5000; // ms
  const [dropdownPos, setDropdownPos] = useState("bottom");
  const [rolesData, setRolesData] = useState(null);
  const [rolesCount, setRolesCount] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("asc");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [paginationData, setPaginationData] = useState({
    count: null,
    totalPages: null,
    currentPage: 1,
    limit: 10,
  });
  const [keyword, setKeyword] = useState(null);
  const [option, setOption] = useState(null);
  const optionsToggleRefs = useRef([]);
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAlert, setIsAlert] = useState({
    show: false,
    id: null,
  });
  // Permission Set
  const [permissions, setPermissions] = useState(
    Object.assign(
      {},
      ...JSON.parse(localStorage.getItem("permissions")).filter(
        (el) => el.entity === "role"
      )
    )
  );

  const toggleCreateHeader = (e) => {
    // const createPermission = (!env.ACTIVE_PERMISSION_CHECKING)?true:permissions.actions.includes("create");
    // const createPermission = (Object.keys(permissions).length) ? permissions.actions.includes("create") : false;
    // if (createPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
    //     props.toggleCreate(e);
    // } else {
    //     setErrorMsg(responses.permissions.role.create);
    // }

    if (typeof e._id === "undefined") {
      const createPermission = Object.keys(permissions).length
        ? permissions.actions.includes("create")
        : false;
      if (createPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
        props.toggleCreate(e);
      } else {
        setErrorMsg(responses.permissions.group.create);
      }
    } else {
      const updatePermission = Object.keys(permissions).length
        ? permissions.actions.includes("update")
        : false;
      if (updatePermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
        props.toggleCreate(e);
      } else {
        setErrorMsg(responses.permissions.role.edit);
      }
    }
  };

  const filterRoles = () => {
    const readPermission = Object.keys(permissions).length
      ? permissions.actions.includes("create")
      : false;
    if (readPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
      props.toggleFilter("roles");
    } else {
      setErrorMsg(responses.permissions.role.read);
    }
  };

  useEffect(() => {
    setSortBy(utils.getQueryVariable("sortBy"));
    setSortType(utils.getQueryVariable("sortType"));
    fetchRoles();
  }, []);

  /**
   * Auto hide success or error message
   */
  useEffect(() => {
    if (successMsg)
      setTimeout(() => {
        setSuccessMsg("");
      }, messageDelay);
    if (errorMsg)
      setTimeout(() => {
        setErrorMsg("");
      }, messageDelay);
  }, [successMsg, errorMsg]);

  /**
   * If delete state is true
   * fetch roles again
   */
  useEffect(() => {
    if (isDeleted) {
      console.log("delete state changed", isDeleted);
      fetchRoles();
    }
  }, [isDeleted]);

  /**
   * Get all query params
   */
  const getQueryParams = async () => {
    const keyword = utils.getQueryVariable("search");
    const fromDt = utils.getQueryVariable("fromDate");
    const toDt = utils.getQueryVariable("toDate");
    const srtBy = utils.getQueryVariable("sortBy");
    const srtType = utils.getQueryVariable("sortType");
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
  };

  /**
   * Function to fetch roles
   * @returns
   */
  const fetchRoles = async () => {
    const readPermission = Object.keys(permissions).length
      ? await permissions.actions.includes("read")
      : false;
    console.log("Permission", permissions);
    let pageId = utils.getQueryVariable("page") || 1;
    let queryParams = await getQueryParams();
    try {
      setIsLoader(true);
      if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
        throw new Error(responses.permissions.role.read);
      }
      const result = await RoleServices.fetchRoles(pageId, queryParams);
      console.log("Data", result.roles);
      if (result) {
        optionsToggleRefs.current = (result.roles.map(() => createRef()));
        setRolesData(result.roles);
        setRolesCount(result.pagination.count);
        // UPDATE STORE
        dispatch({
          type: actionTypes.ROLE_COUNT,
          count: result.pagination.count,
        });
        setPaginationData({
          ...paginationData,
          currentPage: result.pagination.currentPage,
          totalPages: result.pagination.totalPages,
        });
        setIsLoader(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
  };

  /**
   * Set filtered data
   */
  useEffect(() => {
    if (props.getFilteredData) {
      console.log("Reached detination", props.getFilteredData);
      setRolesData(props.getFilteredData.roles);
      setRolesCount(
        props.getFilteredData.pagination.count
          ? props.getFilteredData.pagination.count
          : 0
      );
      //Set current page
      setPaginationData({
        ...paginationData,
        currentPage: props.getFilteredData.pagination.currentPage,
        totalPages: props.getFilteredData.pagination.totalPages,
      });
    }
  }, [props.getFilteredData]);

  /**
   * Handle pagination click
   */
  const paginationCallbackHandle = () => {
    fetchRoles();
  };

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
      handleSearch({ preventDefault: () => { } });
    }
  }, [keyword]);

  /**
   * Handle search functionality
   */
  const handleSearch = (event) => {
    const searchPermission = Object.keys(permissions).length
      ? permissions.actions.includes("create")
      : false;
    if (searchPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
      event.preventDefault();

      utils.addQueryParameter("page", 1);
      if (keyword) {
        utils.addQueryParameter("search", keyword);
      } else {
        utils.removeQueryParameter("search");
      }
      fetchRoles();
    } else {
      setErrorMsg(responses.permissions.role.read);
    }
  };

  /**
   * Handle options toggle
   */
  const toggleOptions = (index) => {
    console.log("Index", index);
    setOption(index !== option ? index : null);
  };

  useEffect(() => {
    /**
     * Handle outside click
     */
    let handleClickOutside = (event) => {
      let count = 0;
      Array.isArray(optionsToggleRefs.current) &&
        optionsToggleRefs.current.map((el, key) => {
          // console.log('handle Outside click', key, el.current.contains(event.target));
          if (el.current && !el.current.contains(event.target)) {
            count++;
          }
        });
      if (rolesData && (count === rolesData.length)) {
        // console.log('set to null');
        setOption(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [option]);


  /**
   * Function to edit role
   */
  const editRole = (role) => {
    console.log("Edit role id", role);
    toggleCreateHeader(role);
    setOption(null);
  };

  /**
   * Function to delete role
   */
  const deleteRole = async (roleId, isConfirmed = null) => {
    // Permission Checking
    const deletePermission = !env.ACTIVE_PERMISSION_CHECKING
      ? true
      : permissions.actions.includes("delete");
    if (deletePermission == false) {
      setErrorMsg(responses.permissions.role.delete);
      return;
    }
    if (!isConfirmed && roleId) {
      setIsAlert({
        show: true,
        id: roleId,
      });
    } else if (isConfirmed == "yes" && roleId) {
      setOption(null);
      setIsLoader(true);
      await RoleServices.deleteRole(roleId)
        .then((result) => {
          if (result) {
            console.log("Role delete result", result);
            setIsDeleted(true);
            setSuccessMsg("Role deleted successfully");
          }
        })
        .catch((e) => {
          setErrorMsg(e.message);
        })
        .finally(() => {
          setIsAlert({
            show: false,
            id: null,
          });
          setIsLoader(false);
        });
    } else {
      setIsAlert({
        show: false,
        id: null,
      });
    }
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

    // Fetch data
    fetchRoles();
  };

  return (
    <div className="dashInnerUI">
      {isLoader ? <Loader /> : ""}
      {isAlert.show ? (
        <ConfirmBox
          callback={(isConfirmed) => deleteRole(isAlert.id, isConfirmed)}
        />
      ) : (
        ""
      )}
      <ListHead
        rolesCount={rolesCount}
        handleSearch={handleSearch}
        filterRoles={filterRoles}
        toggleCreateHeader={toggleCreateHeader}
        keyword={keyword}
        handleKeywordChange={handleKeywordChange}
      />
      {successMsg && <SuccessAlert message={successMsg}></SuccessAlert>}
      {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}
      {rolesCount ?
        <>
          <div className="userListBody">
            <div className="listBody">
              <ul className="tableListing">
                <li className="listHeading userRole">
                  <div
                    className={
                      "userName " + (sortBy == "name" ? "sort " + sortType : "")
                    }
                    onClick={() => handleSortBy("name")}
                  >
                    Role Name
                  </div>
                  <div
                    className={
                      "phoneNum assignedPeople " +
                      (sortBy == "people" ? "sort " + sortType : "")
                    }
                    onClick={() => handleSortBy("people")}
                  >
                    No. of people assigned
                  </div>
                  <div
                    className={
                      "createDate " +
                      (sortBy == "createdAt" ? "sort " + sortType : "")
                    }
                    onClick={() => handleSortBy("createdAt")}
                  >
                    Created on
                  </div>
                </li>
                {rolesData
                  ? rolesData.map((elem, key) => {
                    return (
                      <React.Fragment key={key + "_role"}>
                        <li className="owerInfo userRole" key={elem._id}>
                          <div className="userName">
                            <button className="btn">
                              <p>{elem.name}</p>
                            </button>
                          </div>
                          <div className="phoneNum">
                            <button className="btn">{elem.userCount}</button>
                          </div>
                          <div className="createDate" ref={optionsToggleRefs.current[key]}>
                            <button className="btn">
                              {moment(elem.createdAt).format("Do MMM YYYY")}
                            </button>

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
                            <React.Fragment key={key + "_fragment"}>
                              {/* {console.log('Here', option, key)} */}
                              <div
                                className={
                                  option === key
                                    ? "dropdownOptions listOpen"
                                    : "listHide"
                                }
                              >
                                <button
                                  className="btn btnEdit"
                                  onClick={() => {
                                    editRole(elem);
                                  }}
                                >
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 13.553 13.553"
                                      className="editIcon"
                                    >
                                      <g transform="translate(0.75 0.75)">
                                        <path
                                          className="a"
                                          d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                                          transform="translate(-2 -2.795)"
                                        />
                                        <path
                                          className="a"
                                          d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                                          transform="translate(-4.384 -2)"
                                        />
                                      </g>
                                    </svg>
                                  </span>
                                  Edit
                                </button>
                                <button
                                  className="btn btnDelete"
                                  onClick={() => {
                                    deleteRole(elem._id);
                                  }}
                                >
                                  <span>
                                    <svg
                                      className="deleteIcon"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12.347"
                                      height="13.553"
                                      viewBox="0 0 12.347 13.553"
                                    >
                                      <g transform="translate(0.75 0.75)">
                                        <path
                                          className="a"
                                          d="M3,6H13.847"
                                          transform="translate(-3 -3.589)"
                                        />
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
                                  Delete
                                </button>
                              </div>
                            </React.Fragment>
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  })
                  : ""}
              </ul>
            </div>
          </div>
          {rolesCount > paginationData.limit ? (
            <Pagination
              type="role"
              paginationData={paginationData}
              dataCount={rolesCount}
              callback={paginationCallbackHandle}
            />) : ''}
        </> :
        // <div className="createNew">
        //   <span>
        //     <img src={list_board_icon} alt="" />
        //     <p>No roles found!</p>
        //   </span>
        // </div>
        <div className="createNew noInfos authentications">
          <div className="noRecordsImgWraper">
            <img src={noRecords} className="noRecords" alt="" />
            <h4>No Roles Found</h4>
            <p>No roles have been listed here yet</p>
            <button className="creatUserBtn"><img className="plusIcon" src={plus_icon} alt="" /><span>Create the First Role</span></button>
          </div>
        </div>
      }
    </div>
  );
};

export default RolesListing;
