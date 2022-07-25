import { lazy, Suspense, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import DashboardPagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";
import ListHeader from "../automation-shared/ListHeader";

import arrowDown from "../../../assets/images/arrowDown.svg";
import DefaultUserImage from "../../../assets/images/user.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import Loader from "../../shared/Loader";
import noRecords from '../../../assets/images/noRecords.svg';
const AutomationHistory = lazy(() => import("./AutomationHistory"))

function AutomationDetails(props) {
  const [automationObject, setAutomationObject] = useState({});
  const [stateTabDetails, setStateTabDetails] = useState("history");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory()
  const changeTabAutomation = (e) => {
    setStateTabDetails(e);
  };

  useEffect(() => {
    if(!Object.keys(props?.automationElement).length) {
      // console.log("Hello world")
      // history.push('/automation-list');
    }
  }, [props]);
  
  return (
    <>
      <div className="dashInnerUI dashboardInnerDetails">
        {isLoading ? <Loader /> : ''}
        <ListHeader
          autoName={props?.automationElement?.name}
          createdBy={props?.automationElement?.created_by_user?.firstName + ' ' + props?.automationElement?.created_by_user?.lastName}
          createdOn={props?.automationElement?.createdAt}
        />
        <div className="tabDetailsList">
          <ul>
            {/* <li>
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
            </li> */}
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

          {/* <div className="statsDetails">
            <div className="progressBar">
              <div className="bar">
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
          </div> */}
        </div>
        
        <div className="userListBody autoDetailsTab">
          <div className="tabBody tabBodyDetails">
            {stateTabDetails === "overview" ? (
              <div className="createNew noInfos">
              <div className="noRecordsImgWraper">
                <img src={noRecords} className="noRecords" alt="" />
                <h4>No Automation Overview Found</h4>
                <p>Automation overview not yet implemented</p>
              </div>                
            </div>
            ) : (
              <Suspense fallback={<Loader/>}>
                <AutomationHistory key="automationhistories" isLoading={(bool) => setIsLoading(bool)}/>
              </Suspense>
            )}
          </div>
        </div>
        {/* <DashboardPagination /> */}
      </div>
    </>
  );
}

export default AutomationDetails;
