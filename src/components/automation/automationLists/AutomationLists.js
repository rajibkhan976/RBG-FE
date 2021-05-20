import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardPagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";

import plus_icon from "../../../assets/images/plus_icon.svg";
import flash_red from "../../../assets/images/flash_red.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";

const AutomationLists = (props) => {
  const [dropdownPos, setDropdownPos] = useState("bottom");
  const [automationData, setAutomationData] = useState([
    {
      keyId: "auto-1",
      autoName: "Cold Out Reach Real Estate",
      status: "Draft",
      completedPeople: 150,
      totalforCompletion: 1000,
      createdBy: "Steve Martyns",
      createdOn: "5th Feb 2021",
      isEditing: false,
    },
    {
      keyId: "auto-2",
      autoName: "Cold Out Reach Health Care",
      status: "Draft",
      completedPeople: 500,
      totalforCompletion: 1000,
      createdBy: "Steve Martyns",
      createdOn: "5th Feb 2021",
      isEditing: false,
    },
    {
      keyId: "auto-3",
      autoName: "Cold Out Reach Small Businesses",
      status: "Draft",
      completedPeople: 100,
      totalforCompletion: 1000,
      createdBy: "Steve Martyns",
      createdOn: "3rd Feb 2021",
      isEditing: false,
    },
    {
      keyId: "auto-4",
      autoName: "Cold Out Reach hot leads",
      status: "Published",
      completedPeople: 600,
      totalforCompletion: 1000,
      createdBy: "Santanu Singha",
      createdOn: "2nd Feb 2021",
      isEditing: false,
    },
    {
      keyId: "auto-5",
      autoName: "SMS out reach",
      status: "Draft",
      completedPeople: 200,
      totalforCompletion: 1000,
      createdBy: "Jon Vaughn",
      createdOn: "2nd Feb 2021",
      isEditing: false,
    },
  ]);

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

    const data = automationData.filter((i) => i.keyId === e);
    console.log("E? : ", data);
    data[0].isEditing = !data[0].isEditing;
    console.log("data  :: ", data[0].isEditing);
    const newAutomationData = automationData.map((el, i) => {
      if (el.keyId === e) {
        return data[0];
      } else return el;
    });
    console.log("New AutomationData : ", newAutomationData);
    setAutomationData(newAutomationData);
  };

  const modifyStatus = (e, el) => {
    const data = automationData.filter((i) => i.keyId === e);
    data[0].status = data[0].status === "Draft" ? "Published" : "Draft";
    const newStatus = automationData.map((el, i) => {
      if (el.keyId === e) {
        return data[0];
      } else return el;
    });
    console.log("New Status : ", newStatus);
    setAutomationData(newStatus);
  };

  const checkChange = (thisId, element) => {
    console.log(thisId, element);
  }

  useEffect(() => {});

  return (
    <>
      <div className="dashInnerUI">
        <div className="userListHead">
          <div className="listInfo">
            <ul className="listPath">
              <li>Automations</li>
              <li>Listing</li>
            </ul>
            <h2 className="inDashboardHeader">List of automations <span>(5)</span></h2>
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
            {automationData.length &&
              automationData.map((elem, i) => {
                return (
                  <>
                    <div className="listRow" key={elem.keyId}>
                      <div className="listCell cellWidth_30">
                        <div className="rowImage">
                          <img src={flash_red} alt="" />
                        </div>
                        <p>
                          <NavLink
                            to="/automation-details"
                            onClick={() => passAutomationItem(elem)}
                          >
                            {elem.autoName}
                          </NavLink>
                        </p>
                      </div>
                      <div className="listCell cellWidth_10">
                        <p
                          className={elem.status === "Draft" ? "red" : "green"}
                        >
                          {elem.status}
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
                      <div className="listCell cellWidth_15">
                        <p>{elem.createdBy}</p>
                      </div>
                      <div className="listCell cellWidth_15">
                        <p>{elem.createdOn}</p>
                      </div>
                      <div className="listCell cellWidth_10">
                        <label
                          className={
                            elem.status === "Draft"
                              ? "toggleBtn"
                              : "toggleBtn active"
                          }
                        >
                          <input
                            type="checkbox"
                            onChange={(el) => modifyStatus(elem.keyId, el)}
                          />
                          <span className="toggler"></span>
                        </label>
                      </div>
                      <div className="listCell cellWidth_5">
                        <div className="info_3dot_icon">
                          <button
                            className="btn"
                            onClick={(el) => automationDropdown(elem.keyId, el)}
                          >
                            <img src={info_3dot_icon} alt="" />
                          </button>
                        </div>
                        {elem.isEditing && (
                          <TableOptionsDropdown
                            dropdownPos={dropdownPos}
                            dropdownType="automationDropdown"
                          />
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        {/* <DashboardPagination /> */}
      </div>
    </>
  );
};

export default AutomationLists;
