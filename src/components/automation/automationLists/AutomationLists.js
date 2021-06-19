import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardPagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";
import plus_icon from "../../../assets/images/plus_icon.svg";
import flash_red from "../../../assets/images/flash_red.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import apis from "./automationcanvas/services";
import Loader from "../../shared/Loader";
import moment from "moment";
import {removeElements} from "react-flow-renderer";

const AutomationLists = (props) => {
  useEffect(() => {
    fetchAutomations();
  }, []);
  const [isLoader, setIsLoader] = useState(false);
  const [dropdownPos, setDropdownPos] = useState("bottom");
  let [automationData, setAutomationData] = useState([]);
  const fetchAutomations = async () => {
    let payload = {};
    setIsLoader(true);
    await apis.getAutomations(JSON.stringify(payload)).then((res) => {
      setIsLoader(false);
      if (res.data.success) {
        console.log("api success");
        setAutomationData(res.data.data)
      } else {
        console.log("api error ! " + res.data.message);
      }
    });
  };
  const passAutomationItem = (e) => {
    props.automationListObject(e);
  };

  const toggleCreateHeader = () => {
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

    const data = automationData.filter((i) => i._id === e);
    console.log("E? : ", data);
    data[0].isEditing = !data[0].isEditing;
    console.log("data  :: ", data[0].isEditing);
    const newAutomationData = automationData.map((el, i) => {
      if (el._id === e) {
        return data[0];
      } else return el;
    });
    console.log("New AutomationData : ", newAutomationData);
    setAutomationData(newAutomationData);
  };

  const modifyStatus = async (e, el, elem) => {
    console.log('statyus', elem);
    setIsLoader(true);
    const data = automationData.filter((i) => i._id === e);
    data[0].status = data[0].status ? false : true;
    if (data[0].status) {
      let payload = { element: elem.blueprint };
      await apis.getAsl(JSON.stringify(payload)).then(async (res) => {
        if (res.data.success) {
          let payload = {id: elem._id, arn: res.data.data, status: true}
          await apis.updateArn(JSON.stringify(payload)).then((res) => {
            setIsLoader(false);
            if (res.data.success) {
              console.log('respnse updated');
            } else {
              console.log("api error ! " + res.data.message);
            }
          });
        } else {
          setIsLoader(false);
          console.log("api error ! " + res.data.message);
        }
      });
    } else {
      setIsLoader(false);
    }
    const newStatus = automationData.map((el, i) => {
      if (el._id === e) {
        return data[0];
      } else return el;
    });
    console.log("New Status : ", newStatus);
    setAutomationData(newStatus);
  };

  const checkChange = (thisId, element) => {
    console.log(thisId, element);
  }
  const automationEdit = (elem) => {
    setIsLoader(true);
    localStorage.removeItem("element");
    localStorage.removeItem("nodeId");
    localStorage.removeItem("edgeId");
    localStorage.removeItem("automationName");
    localStorage.removeItem("automationId");
    setTimeout(() => {
      localStorage.setItem("element", JSON.stringify(elem.blueprint));
      localStorage.setItem("nodeId", JSON.stringify(elem.nodeId));
      localStorage.setItem("edgeId", JSON.stringify(elem.edgeId));
      localStorage.setItem("automationName", JSON.stringify(elem.name));
      localStorage.setItem("automationId", JSON.stringify(elem._id));
      props.toggleCreate("automation");
      window.location.reload(false);
    }, 500);

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
            <h2 className="inDashboardHeader">List of automations <span>({automationData.length})</span></h2>
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
              {/*<div className="listCell cellWidth_15">
                Created by <button className="shortTable"></button>
              </div>*/}
              <div className="listCell cellWidth_15">
                Created on <button className="shortTable"></button>
              </div>
              <div className="listCell cellWidth_10">
                
              </div>
              <div className="listCell cellWidth_5">
                
              </div>
            </div>
            {automationData.length ?
              automationData.map((elem, i) => {
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
                          {elem.status ? "Published" : "Draft" }
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
                                  100+'%',
                              }}
                            ></div>
                          </div>
                          <div className="barValInfo">
                            <span>{elem.completedPeople}</span> out of{" "}
                            <span>{elem.totalforCompletion}</span>
                          </div>
                        </div>
                      </div>
                      {/*<div className="listCell cellWidth_15">
                        <p>{elem.created_by}</p>
                      </div>*/}
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
        {/* <DashboardPagination /> */}
      </div>
    </>
  );
};

export default AutomationLists;
