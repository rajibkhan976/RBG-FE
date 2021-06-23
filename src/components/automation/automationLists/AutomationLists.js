import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import plus_icon from "../../../assets/images/plus_icon.svg";
import flash_red from "../../../assets/images/flash_red.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import apis from "./automationcanvas/services";
import Loader from "../../shared/Loader";
import moment from "moment";
import { AutomationServices } from "../../../services/automation/AutomationServices";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import { utils } from "../../../helpers";
import Pagination from "../../shared/Pagination";

const AutomationLists = (props) => {
  // USEEFFECT() Life cycle hook 
  useEffect(() => {
    let pageID = utils.getQueryVariable('page');
    fetchAutomations(pageID);
  }, []);

  const [isLoader, setIsLoader] = useState(false);
  const [dropdownPos, setDropdownPos] = useState("bottom");
  const [automationData, setAutomationData] = useState({
    data: [],
    count: 0
  });

  const [paginationData, setPaginationData] = useState({
    count: null,
    totalPages: null,
    currentPage: 1,
    limit: 10
  });

  const dispatch = useDispatch();

  const fetchAutomations = async (pageID) => {
    setIsLoader(true);
    const automationLists = await AutomationServices.getAutomations(pageID);
    setIsLoader(false);
    if (automationLists.data.success) {
      setAutomationData({
        data: automationLists.data.data,
        count: automationLists.data.pagination.count
      });
      dispatch({
        type: actionTypes.AUTOMATION_COUNT,
        count: automationLists.data.pagination.count
      });
      setPaginationData({
        ...paginationData,
        currentPage: automationLists.data.pagination.currentPage,
        totalPages: automationLists.data.pagination.totalPages
      });
    } else {
      console.log("api error ! " + automationLists.data.message);
    }
  };

  const passAutomationItem = (e) => {
    props.automationListObject(e);
  };

  const toggleCreateHeader = () => {
    props.automationElementSet({});
    props.toggleCreate("automation");
  };

  const automationDropdown = (e, el) => {
    let yPosition = el.clientY;
    let avHeight = window.innerHeight - (70 + 70 + 54 + 57);
    if (yPosition + 70 > avHeight) {
      setDropdownPos("top");
    } else {
      setDropdownPos("bottom");
    }

    const data = automationData.data.filter((i) => i._id === e);
    data[0].isEditing = !data[0].isEditing;
    const newAutomationData = automationData.data.map((el, i) => {
      if (el._id === e) {
        return data[0];
      } else return el;
    });
    setAutomationData({
      data: newAutomationData,
      count: automationData.count
    });
  };

  const modifyStatus = async (e, el, elem) => {
    setIsLoader(true);
    let autoData = automationData.data;
    const data = autoData.filter((i) => i._id === e);
    data[0].status = data[0].status ? false : true;
    if (data[0].status) {
      let payload = { element: elem.blueprint };
      let asl = await AutomationServices.getAsl(JSON.stringify(payload));
      if (asl.data.success) {
        let payloadArn = {id: elem._id, arn: asl.data.data, status: true}
        let updateArn = await AutomationServices.updateArn(JSON.stringify(payloadArn));
        setIsLoader(false);
        if (updateArn.data.success) {
          console.log('respnse updated');
        } else {
          console.log("api error ! " + updateArn.data.message);
        }
      } else {
        setIsLoader(false);
        console.log("api error ! " + asl.data.message);
      }
    } else {
      let payloadArn = {id: elem._id}
      let updateArn = await AutomationServices.deleteArn(JSON.stringify(payloadArn));
      setIsLoader(false);
      if (updateArn.data.success) {
        console.log('respnse updated');
      } else {
        console.log("api error ! " + updateArn.data.message);
      }
    }
    const newStatus = autoData.map((el, i) => {
      if (el._id === e) {
        return data[0];
      } else return el;
    });
    setAutomationData({
      data: newStatus,
      count: automationData.count
    });
  };

  const checkChange = (thisId, element) => {
    console.log(thisId, element);
  }

  const automationEdit = (elem) => {
    props.automationElementSet(elem);
    props.toggleCreate("automation");
  }

  const getDataFn = (dataFromChild) => {
    console.log('Data from child', dataFromChild);
    if (dataFromChild) {
      // setAutomationData(dataFromChild.data);
      setAutomationData({
        data: dataFromChild.data,
        count: dataFromChild.pagination.count
      });
      //Set current page
      setPaginationData({
        ...paginationData,
        currentPage: dataFromChild.pagination.currentPage,
        totalPages: dataFromChild.pagination.totalPages
      });
    }
  }

  return (
    <>
      {isLoader ? <Loader /> : ''}
      <div className="dashInnerUI">
        <div className="userListHead">
          <div className="listInfo">
            <ul className="listPath">
              <li>Automations</li>
              <li>Listing</li>
            </ul>
            <h2 className="inDashboardHeader">List of automations <span>({automationData.count})</span></h2>
            <p className="userListAbout">
              Create & manage your multiple automations to automate your task
            </p>
          </div>
          <div className="listFeatures">
            <button className="creatUserBtn" onClick={toggleCreateHeader}>
              <img className="plusIcon" src={plus_icon} alt="" />
              <span>Create New Automation</span>
            </button>
          </div>
        </div>

        <div className="userListBody">
          <div className="listArea">
            <div className="listHead">
              <div className="listCell cellWidth_30">
                Automation Name <button className="shortTable"></button>
              </div>
              <div className="listCell cellWidth_10">
                Status <button className="shortTable"></button>
              </div>
              <div className="listCell cellWidth_15">
                # of people completed <button className="shortTable"></button>
              </div>
              <div className="listCell cellWidth_15">
                Created by <button className="shortTable"></button>
              </div>
              <div className="listCell cellWidth_15">
                Created on <button className="shortTable"></button>
              </div>
              <div className="listCell cellWidth_10">

              </div>
              <div className="listCell cellWidth_5">

              </div>
            </div>
            {automationData.data.length ?
              automationData.data.map((elem, i) => {
                return (
                  <>
                    <div className="listRow" key={elem._id}>
                      <div className="listCell cellWidth_30">
                        <div className="rowImage">
                          <img src={flash_red} alt="" />
                        </div>
                        <p>
                          <NavLink
                            to="/automation-details"
                            onClick={() => passAutomationItem(elem)}
                          >
                            {elem.name}
                          </NavLink>
                        </p>
                      </div>
                      <div className="listCell cellWidth_10">
                        <p
                          className={elem.status ? "red" : "green"}
                        >
                          {elem.status ? "Published" : "Draft"}
                        </p>
                      </div>
                      <div className="listCell cellWidth_15">
                        <div className="progressBar">
                          <div className="bar">
                            <div
                              className="fill"
                              style={{
                                width:
                                  (elem.completedPeople /
                                    elem.totalforCompletion) *
                                  100 + '%',
                              }}
                            ></div>
                          </div>
                          <div className="barValInfo">
                            <span>{elem.completedPeople}</span> out of{" "}
                            <span>{elem.totalforCompletion}</span>
                          </div>
                        </div>
                      </div>
                      <div className="listCell cellWidth_15">
                        <p>{elem.created_by_user.firstName + " " + elem.created_by_user.lastName}</p>
                      </div>
                      <div className="listCell cellWidth_15">
                        <p>{moment(elem.createdAt).format("Do MMM YYYY")}</p>
                      </div>
                      <div className="listCell cellWidth_10">
                        <label
                          className={
                            elem.status
                              ? "toggleBtn active"
                              : "toggleBtn"
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
                            <button className="btn btnClone">
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
                            </button>
                            <button className="btn btnEdit" onClick={(el) => automationEdit(elem)}>
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
                            <button className="btn btnDelete">
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
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                );
              }) :
              <div className="listCell">
                No automation found
              </div>
            }
          </div>
        </div>
        {automationData.count ? <Pagination
          type="automation"
          paginationData={paginationData}
          dataCount={automationData.count}
          getData={getDataFn} /> : ''}
        {/* <DashboardPagination /> */}
      </div>
    </>
  );
};

export default AutomationLists;
