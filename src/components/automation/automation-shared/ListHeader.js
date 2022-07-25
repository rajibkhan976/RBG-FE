import { useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import plus_icon from "../../../assets/images/plus_icon.svg";
import { utils } from "../../../helpers";

const ListHeader = (props) => {
  const automationDetails = useRouteMatch('/automation-details/:automationId');
  const pathURL = useLocation().pathname;
  const timezone = useSelector((state) => (state.user?.data?.organizationTimezone) ? state.user.data.organizationTimezone : "UTC");
  return (
    <>
      {pathURL === "/automation-list" && (
        <div className="userListHead">
          <div className="listInfo">
            <ul className="listPath">
              <li>Automation</li>
              <li>Listing</li>
            </ul>
            <h2 className="inDashboardHeader">
              List of automations <span>({props.automationData.count})</span>
            </h2>
            <p className="userListAbout">
              Create & manage your multiple automations to automate your task
            </p>
          </div>
          <div className="listFeatures">
            <button className="creatUserBtn" onClick={props.toggleCreateHeader}>
              <img className="plusIcon" src={plus_icon} alt="" />
              <span>Create</span>
            </button>
          </div>
        </div>
      )}
      {automationDetails !== null && automationDetails?.isExact ? (
        <div className="userListHead">
          <div className="listInfo">
            <ul className="listPath">
              <li>Automation</li>
            </ul>
            <h2 className="inDashboardHeader">{props.autoName}</h2>
            <div className="automationShortInfo">
              <ul>
                <li>
                  <span>Created By</span>
                  <h4>{props.createdBy}</h4>
                </li>
                <li>
                  <span>Created On</span>
                  <h4>{utils.convertUTCToTimezone(props.createdOn, timezone, "LLL")}</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ):''}
    </>
  );
};

export default ListHeader;
