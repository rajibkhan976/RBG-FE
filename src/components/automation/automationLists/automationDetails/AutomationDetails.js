import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import DashboardPagination from "../../../shared/Pagination";
import TableOptionsDropdown from "../../../shared/TableOptionsDropdown";

import arrowDown from "../../../../assets/images/arrowDown.svg";
import DefaultUserImage from "../../../../assets/images/user.png";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";

function AutomationDetails(props) {
  const [dropdownPos, setDropdownPos] = useState("bottom");
  const [automationObject, setAutomationObject] = useState({});
  const [stateTabDetails, setStateTabDetails] = useState("overview");
  const [automationHistory, setAutomationHistory] = useState([
    {
      keyId: "overAuto-1",
      contactName: "Abhisek Bose",
      createdOn: "21st Feb 5:00 AM",
      totalStages: 4,
      completedStages: 3,
      status: "broken",
      contactDisplay: DefaultUserImage,
      isEditing: false,
    },
    {
      keyId: "overAuto-2",
      contactName: "Santanu Singha",
      createdOn: "21st Feb 5:00 AM",
      totalStages: 4,
      completedStages: 4,
      status: "in-progress",
      contactDisplay: DefaultUserImage,
      isEditing: false,
    },
    {
      keyId: "overAuto-3",
      contactName: "Jit Talukdar",
      createdOn: "21st Feb 5:00 AM",
      totalStages: 4,
      completedStages: 4,
      status: "completed",
      contactDisplay: DefaultUserImage,
      isEditing: false,
    },
  ]);

  const changeTabAutomation = (e) => {
    setStateTabDetails(e);
  };

  const automationHistoryDropdown = (e, el) => {
    let yPosition = el.clientY;
    let avHeight = window.innerHeight - (70 + 70 + 54 + 57);
    if (yPosition + 70 > avHeight) {
      setDropdownPos("top");
    } else {
      setDropdownPos("bottom");
    }

    const data = automationHistory.filter((i) => i.keyId === e);
    console.log("E? : ", data);
    data[0].isEditing = !data[0].isEditing;
    console.log("data  :: ", data[0].isEditing);
    const newAutomationData = automationHistory.map((el, i) => {
      if (el.keyId === e) {
        return data[0];
      } else return el;
    });
    console.log("New Automation History : ", newAutomationData);
    setAutomationHistory(newAutomationData);
  };

  useEffect(() => {
    setAutomationObject(props.automationListItem); //props.automationListItem.autoName
  }, [props.automationListItem]);
  return (
    <>
      {props.automationListItem.autoName !== undefined &&
      props.automationListItem.autoName !== null &&
      props.automationListItem.autoName !== "" ? (
        <div className="dashInnerUI dashboardInnerDetails">
          <div className="userListHead">
            <div className="listInfo">
              <ul className="listPath">
                <li>Automations</li>
              </ul>
              <h2 className="inDashboardHeader">{automationObject.autoName}</h2>
              <div className="automationShortInfo">
                <ul>
                  <li>
                    <span>Created By</span>
                    <h4>{automationObject.createdBy}</h4>
                  </li>
                  <li>
                    <span>Created On</span>
                    <h4>{automationObject.createdOn}</h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tabDetailsList">
            <ul>
              <li>
                <button
                  className={
                    stateTabDetails === "overview"
                      ? "btn btnTab active"
                      : "btn btnTab"
                  }
                  onClick={() => changeTabAutomation("overview")}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  className={
                    stateTabDetails === "history"
                      ? "btn btnTab active"
                      : "btn btnTab"
                  }
                  onClick={() => changeTabAutomation("history")}
                >
                  History
                </button>
              </li>
            </ul>

            <div className="statsDetails">
              <div className="progressBar">
                <div className="bar">
                  {console.log('XXXX', automationObject)}
                  <div
                    className="fill"
                    style={{
                      width:
                        (automationObject.completedPeople / automationObject.totalforCompletion) * 100+"%"
                    }}
                  ></div>
                </div>
                <div className="barValInfo">
                  <span>{automationObject.completedPeople}</span> out of{" "}
                  <span>{automationObject.totalforCompletion}</span>
                </div>
              </div>
              <label
                className={
                  automationObject.status === "Draft" ? "toggleBtn" : "toggleBtn active"
                }
              >
                <input
                  type="checkbox"
                />
                <span className="toggler"></span>
              </label>
            </div>
          </div>
          <div className="userListBody autoDetailsTab">
            {console.log(stateTabDetails)}
            <div className="tabBody tabBodyDetails">
              {stateTabDetails === "overview" ? (
                <div className="tabBodyInner">Overview</div>
              ) : (
                <div className="tabBodyInner">
                  <div className="overviewFilter">
                    <div className="formBody">
                      <div className="formField">
                        <p>From</p>
                        <div className="inFormField">
                          <input
                            type="date"
                            name=""
                            id=""
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                      </div>
                      <div className="formField">
                        <p>To</p>
                        <div className="inFormField">
                          <input type="date" name="" id="" />
                        </div>
                      </div>
                      <div className="formField selectStatusOverview">
                        <div className="inFormField">
                          <select
                            style={{
                              backgroundImage: "url(" + arrowDown + ")",
                            }}
                          >
                            <option value="null">Select status</option>
                          </select>
                        </div>
                      </div>

                      <button className="btn btn-dBlue btn-Overviewfilter">
                        Apply Filter
                        <img className="" src={arrow_forward} alt="" />
                      </button>
                    </div>
                  </div>

                  <div className="overviewTable">
                    <div className="listHead">
                      <div className="listCell cellWidth_20">
                        Contact Details
                      </div>
                      <div className="listCell cellWidth_45">
                        Stages Completed
                      </div>
                      <div className="listCell cellWidth_20">Status</div>
                      <div className="listCell cellWidth_15 text-right">
                        Action
                      </div>
                    </div>

                    {automationHistory.length &&
                      automationHistory.map((elem, i) => {
                        return (
                          <>
                            {console.log(elem)}
                            <div className="listRow" key={elem.keyId}>
                              <div className="listCell cellWidth_20">
                                <figure
                                  className="contactImage"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      (elem.contactDisplay
                                        ? elem.contactDisplay
                                        : DefaultUserImage) +
                                      ")",
                                  }}
                                ></figure>
                                <p>{elem.contactName}</p>
                              </div>
                              <div className="listCell cellWidth_45">
                                <span>
                                  {elem.completedStages} of {elem.totalStages}
                                </span>
                                <div className="progressBar">
                                  <div className="bar">
                                    <div
                                      className="fill"
                                      style={{
                                        width:
                                          (elem.completedStages /
                                            elem.totalStages) *
                                            100 +
                                          "%",
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="listCell cellWidth_20">
                                <span
                                  style={{
                                    color:
                                      elem.status === "broken"
                                        ? "#ED707A"
                                        : elem.status === "in-progress"
                                        ? "#FF9D00"
                                        : "#46D35C",
                                  }}
                                >
                                  {elem.status}
                                </span>
                              </div>
                              <div className="listCell cellWidth_15">
                                <div className="info_3dot_icon">
                                  <button
                                    className="btn"
                                    onClick={(el) =>
                                      automationHistoryDropdown(elem.keyId, el)
                                    }
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
              )}
            </div>
          </div>
          <DashboardPagination />
        </div>
      ) : (
        <Redirect to="/automation-list" />
      )}
    </>
  );
}

export default AutomationDetails;
