import React, { useEffect, useState, useRef } from "react";
// import { NavLink } from "react-router-dom";
import flash_red from "../../../assets/images/flash_red.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
// import apis from "../automationcanvas/services";
import Loader from "../../shared/Loader";
import moment from "moment";
import ListHeader from "../automation-shared/ListHeader";
import { AutomationServices } from "../../../services/automation/AutomationServices";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import { utils } from "../../../helpers";
import Pagination from "../../shared/Pagination";
import ConfirmBox from "../../shared/confirmBox";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import responses from "../../../configuration/responses";
import env from "../../../configuration/env";
import { useHistory } from "react-router-dom";


const AutomationLists = (props) => {
  // USEEFFECT() Life cycle hook
  useEffect(() => {
    fetchAutomations();
  }, []);

  const messageDelay = 5000; // ms
  const optionsToggleRef = useRef();
  const [isLoader, setIsLoader] = useState(false);
  const [isAlert, setIsAlert] = useState({
    show: false,
    id: null,
  });
  const [dropdownPos, setDropdownPos] = useState("bottom");
  const [automationData, setAutomationData] = useState({
    data: [],
    count: 0,
  });

  const [sort, setSort] = useState({
    sortBy: "",
    sortType: "",
  });

  const [paginationData, setPaginationData] = useState({
    count: null,
    totalPages: null,
    currentPage: 1,
    limit: 10,
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [permissions, setPermissions] = useState(Object.assign({}, ...JSON.parse(localStorage.getItem("permissions")).filter(el => el.entity === "automation")));
  /**
     * Auto hide success or error message
     */
  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg])

  const dispatch = useDispatch();
  const history = useHistory()

  const fetchAutomations = async () => {
    try {
      const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
      if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
        throw new Error(responses.permissions.automation.read);
      }
      const pageID = utils.getQueryVariable("page") || 1;
      let queryParams = null;
      if (utils.getQueryVariable("sortBy")) {
        queryParams = "?sortBy=" + utils.getQueryVariable("sortBy");
        queryParams += "&sortType=" + utils.getQueryVariable("sortType");
      }
      // console.log(queryParams);
      setIsLoader(true);
      const automationLists = await AutomationServices.getAutomations(
        pageID,
        queryParams
      );
      setAutomationData({
        data: automationLists.data.data,
        count: automationLists.data.pagination.count,
      });
      dispatch({
        type: actionTypes.AUTOMATION_COUNT,
        count: automationLists.data.pagination.count,
      });
      setPaginationData({
        ...paginationData,
        currentPage: automationLists.data.pagination.currentPage,
        totalPages: automationLists.data.pagination.totalPages,
      });
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      setIsLoader(false);
    }
  };

  const passAutomationItem = (e) => {
    props.automationListObject(e);
  };

  const automationDropdown = (e, el) => {
    // console.log("E", e);
    // console.log("EL", el);
    let yPosition = el.clientY;
    let avHeight = window.innerHeight - (70 + 70 + 54 + 57);
    if (yPosition + 70 > avHeight) {
      setDropdownPos("top");
    } else {
      setDropdownPos("bottom");
    }

    const data = automationData.data.filter((i) => i._id === e);
    const otherData = automationData.data.filter((i) => i._id !== e);

    data[0].isEditing = !data[0].isEditing;

    otherData.map((ex) => {
      ex.isEditing = false;
    });

    const newAutomationData = automationData.data.map((el, i) => {
      if (el._id === e) {
        return data[0];
      } else return el;
    });
    setAutomationData({
      data: newAutomationData,
      count: automationData.count,
    });
  };

  const modifyStatus = async (e, el, elem) => {
    setIsLoader(true);
    let autoData = automationData.data;
    const data = autoData.filter((i) => i._id === e);
    try {
      data[0].status = data[0].status ? false : true;
      if (data[0].status) {
        let payload = {
          element: elem.blueprint,
          name: elem.name,
          id: elem._id
        };
        let asl = await AutomationServices.getAsl(JSON.stringify(payload));
        console.log(asl.data.success)
        if (asl.data.success) {
          let payloadArn = { id: elem._id, arn: asl.data.data, status: true };
          let updateArn = await AutomationServices.updateArn(
            JSON.stringify(payloadArn)
          );
          fetchAutomations();
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "Automation status updated successfully",
            typeMessage: 'success'
          });
        } else {
          fetchAutomations();
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: asl.data.message,
            typeMessage: 'error'
          });
        }
      } else {
        let payloadArn = { id: elem._id };
        let updateArn = await AutomationServices.deleteArn(
          JSON.stringify(payloadArn)
        );
        fetchAutomations();
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: "Automation status updated successfully",
          typeMessage: 'success'
        });
      }
    } catch (e) {
      fetchAutomations();
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      setIsLoader(false);
    }
  };

  const automationEdit = (elem) => {
    const updatePermission = (!env.ACTIVE_PERMISSION_CHECKING)?true:permissions.actions.includes("update");
    if (updatePermission) {
      props.automationElementSet(elem);
      props.toggleCreate("automation");
    } else {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: responses.permissions.automation.edit,
        typeMessage: 'error'
      });
    }

  };

  const deleteAutomation = async (automationID, isConfirmed = null) => {
    try {
      const deletePermission = (!env.ACTIVE_PERMISSION_CHECKING)?true:permissions.actions.includes("delete");
      if (deletePermission === false) {
        throw new Error(responses.permissions.automation.delete);
      }
      const clickedforDeletion = automationData.data.filter((i) => i._id === automationID);
      clickedforDeletion[0].isEditing = false;

      const newAutomationData = automationData.data.map((el, i) => {
        if (el._id === automationID) {
          return clickedforDeletion[0];
        } else return el;
      });
      setAutomationData({
        data: newAutomationData,
        count: automationData.count,
      });
      if (!isConfirmed) {
        setIsAlert({
          show: true,
          id: automationID,
        });
      } else {
        if (isConfirmed == "yes") {
          // Enable loader
          setIsLoader(true);
          // Call delete automation service
          const res = await AutomationServices.deleteAutomation(automationID);
          if (res.status === 200) {
            dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: res.message,
              typeMessage: 'success'
            });
          } else {
            dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: res.message,
              typeMessage: 'error'
            });
          }
          // Reduce the count
          const newCount = automationData.count - 1;
          // Filter out the automation by checking with id
          const newAutomationData = automationData.data.filter(
            (el) => el._id !== automationID
          );
          // Reset the automation data with new filter and new count
          setAutomationData({
            data: newAutomationData,
            count: newCount,
          });
        }
        setIsAlert({
          show: false,
          id: null,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      // Disable the loader
      setIsLoader(false);
    }
  };

  const handleSort = (sortname) => {
    // Check if sort type is blank then toggle to asc if asc then desc if desc then blank
    let [sortingBy, sortingType] = "";
    switch (sort.sortType) {
      case "asc":
        sortingBy = sortname;
        sortingType = "desc";
        break;
      case "desc":
        sortingBy = "";
        sortingType = "";
        break;
      default:
        sortingBy = sortname;
        sortingType = "asc";
        break;
    }
    // Change the sort states
    setSort({
      sortBy: sortingBy,
      sortType: sortingType,
    });
    // Check if toggled sort is blank then remove the sort query params or add query params
    if (!sortingBy && !sortingType) {
      utils.removeQueryParameter("sortBy");
      utils.removeQueryParameter("sortType");
    } else {
      utils.addQueryParameter("sortBy", sortingBy);
      utils.addQueryParameter("sortType", sortingType);
    }
    fetchAutomations();
  };

  const toggleCreateHeader = () => {
    // const createAutomation = (Object.keys(permissions).length) ? permissions.actions.includes("create") : false;
    // if (createAutomation && env.ACTIVE_PERMISSION_CHECKING === 1) {
      props.automationElementSet({});
      props.toggleCreate("automation");
    // } else {
    //     setErrorMsg(responses.permissions.automation.create);
    // }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [automationData.data]);

  const handleClickOutside = (event) => {
    if (optionsToggleRef.current.contains(event.target)) {
      return;
    }

    if (automationData.data.length > 0) {
      const data = automationData.data;

      data.map((ex) => {
        if (ex.isEditing == true) {
          ex.isEditing = false;
          // console.log(data);
        } else {
          ex.isEditing = ex.isEditing;
          // console.log(data);
        }
      });

      setAutomationData({
        data: data,
        count: automationData.count,
      });
    }
  };

  const handleClick = (elem) => {
    props.setAutomationObj(elem);
    history.push('./automation-details/' + elem._id);
    
  }

  return (
    <>
      {isLoader ? <Loader /> : ""}
      {isAlert.show ? (
        <ConfirmBox
          callback={(isConfirmed) => deleteAutomation(isAlert.id, isConfirmed)}
        />
      ) : (
        ""
      )}

      <div className="dashInnerUI">
        <ListHeader
          toggleCreateHeader={toggleCreateHeader}
          automationData={automationData}
        />

        {successMsg &&
          <SuccessAlert message={successMsg}></SuccessAlert>
        }
        {errorMsg &&
          <ErrorAlert message={errorMsg}></ErrorAlert>
        }
        <div className="userListBody" ref={optionsToggleRef}>
          <div className="listArea">
            <div className="listHead">
              <div
                className={
                  sort?.sortBy == "name"
                    ? "listCell cellWidth_30 " + sort.sortType
                    : "listCell cellWidth_30"
                }
                onClick={() => handleSort("name")}
              >
                Automation Name <button className="shortTable"></button>
              </div>
              <div
                className={
                  sort?.sortBy == "status"
                    ? "listCell cellWidth_10 " + sort.sortType
                    : "listCell cellWidth_10"
                }
                onClick={() => handleSort("status")}
              >
                Status <button className="shortTable"></button>
              </div>
              {/* <div className="listCell cellWidth_15">
                # of people completed <button className="shortTable"></button>
              </div> */}
              <div
                className={
                  sort?.sortBy == "user"
                    ? "listCell cellWidth_15 " + sort.sortType
                    : "listCell cellWidth_15"
                }
                onClick={() => handleSort("user")}
              >
                Created by <button className="shortTable"></button>
              </div>
              <div
                className={
                  sort?.sortBy == "createdAt"
                    ? "listCell cellWidth_15 " + sort.sortType
                    : "listCell cellWidth_15"
                }
                onClick={() => handleSort("createdAt")}
              >
                Created on <button className="shortTable"></button>
              </div>
              <div className="listCell cellWidth_10">Status</div>
              <div className="listCell cellWidth_5">Actions</div>
            </div>
            {automationData.data.length ? (
              automationData.data.map((elem, i) => {
                return (
                  <>
                    <div className="listRow" key={elem._id}>
                      <div className="listCell cellWidth_30" onClick={() => handleClick(elem)}>
                        <div className="rowImage">
                          <img src={flash_red} alt="" />
                        </div>
                        <p>
                          {/* <NavLink
                            to="/automation-details"
                            onClick={() => passAutomationItem(elem)}
                          >
                            {elem.name}
                          </NavLink> */}
                          <span>
                            {elem.name}
                          </span>
                        </p>
                      </div>
                      <div className="listCell cellWidth_10">
                        <p className={elem.status ? "greenAutomation" : "redAutomation"}>
                          {elem.status ? "Published" : "Draft"}
                        </p>
                      </div>
                      {/* <div className="listCell cellWidth_15">
                        <div className="progressBar">
                          <div className="bar">
                            <div
                              className="fill"
                              style={{
                                width:
                                  (elem.completedPeople /
                                    elem.totalforCompletion) *
                                  100 +
                                  "%",
                              }}
                            ></div>
                          </div>
                          <div className="barValInfo">
                            <span>{elem.completedPeople}</span> out of{" "}
                            <span>{elem.totalforCompletion}</span>
                          </div>
                        </div>
                      </div> */}
                      <div className="listCell cellWidth_15">
                        <p>
                          {elem.created_by_user.firstName +
                            " " +
                            elem.created_by_user.lastName}
                        </p>
                      </div>
                      <div className="listCell cellWidth_15">
                        <p>{moment(elem.createdAt).format("Do MMM YYYY")}</p>
                      </div>
                      <div className="listCell cellWidth_10">
                        <label
                          className={
                            elem.status ? "toggleBtn active" : "toggleBtn"
                          }
                        >
                          <input
                            type="checkbox"
                            onChange={(el) => modifyStatus(elem._id, el, elem)}
                          />
                          <span className="toggler"></span>
                        </label>
                      </div>
                      <div className="listCell cellWidth_5">
                        <div className="info_3dot_icon">
                          <button
                            className="btn"
                            onClick={(el) => automationDropdown(elem._id, el)}
                          >
                            <img src={info_3dot_icon} alt="" />
                          </button>
                        </div>
                        {elem.isEditing && (
                          <div
                            className="dropdownOptions"
                            style={{
                              top: dropdownPos === "top" ? "auto" : "100%",
                              bottom: dropdownPos === "top" ? "100%" : "auto",
                            }}
                          >
                            {/*<button className="btn btnClone">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 13.398 13.398"
                                  className="cloneIcon"
                                >
                                  <path
                                    className="a"
                                    d="M12.441,12.2V4.067a.243.243,0,0,0-.239-.239H4.067a.243.243,0,0,0-.239.239V12.2a.243.243,0,0,0,.239.239H12.2a.243.243,0,0,0,.239-.239ZM13.4,4.067V12.2a1.2,1.2,0,0,1-1.2,1.2H4.067a1.2,1.2,0,0,1-1.2-1.2V4.067a1.2,1.2,0,0,1,1.2-1.2H12.2a1.2,1.2,0,0,1,1.2,1.2ZM10.527,1.2v1.2H9.57V1.2A.243.243,0,0,0,9.331.957H1.2A.243.243,0,0,0,.957,1.2V9.331A.243.243,0,0,0,1.2,9.57h1.2v.957H1.2a1.152,1.152,0,0,1-.845-.351A1.152,1.152,0,0,1,0,9.331V1.2A1.152,1.152,0,0,1,.351.351,1.152,1.152,0,0,1,1.2,0H9.331a1.152,1.152,0,0,1,.845.351A1.152,1.152,0,0,1,10.527,1.2Z"
                                  />
                                </svg>
                              </span>
                              Clone
                            </button>*/}
                            <button
                              className="btn btnEdit"
                              onClick={(el) => automationEdit(elem)}
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
                                deleteAutomation(elem._id);
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
                        )}
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="listCell">No automation found</div>
            )}
          </div>
        </div>
        {automationData.count > 10 ? (
          <Pagination
            type="automation"
            paginationData={paginationData}
            dataCount={automationData.count}
            callback={fetchAutomations}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AutomationLists;
