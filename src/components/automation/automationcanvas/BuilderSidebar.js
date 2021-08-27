import React from "react";
import white_arrow_right from "../../../assets/images/white_arrow_right.svg";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      <div className="sidebarHeader">
        <h4>
          Triggers
          <img className="arrowIcon" src={white_arrow_right} alt="" />
        </h4>
      </div>
      {/* <div className="description">
        You can drag these nodes to the pane on the right.
      </div> */}
      <div className="dndNodes triggerNodes">
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "trigger")}
          draggable
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22.8 22.99"
            className="triggerTask"
          >
            <g transform="translate(-62.56 -60.946)">
              <path
                className="a"
                d="M85.36,80.563V67.895a3.538,3.538,0,0,0-3.675-3.373H80.678v-.2A3.537,3.537,0,0,0,77,60.946H66.235a3.538,3.538,0,0,0-3.675,3.373V76.988a3.538,3.538,0,0,0,3.675,3.373h1.007v.2a3.538,3.538,0,0,0,3.675,3.373H81.685A3.537,3.537,0,0,0,85.36,80.563Zm-5.033,2.269h-9.41a2.377,2.377,0,0,1-2.473-2.269V67.895a2.377,2.377,0,0,1,2.473-2.269H81.685a2.377,2.377,0,0,1,2.473,2.269V80.563a2.377,2.377,0,0,1-2.473,2.269H80.327Z"
                transform="translate(0)"
              />
              <path
                className="a"
                d="M189.759,199.661h9.567a.478.478,0,0,0,0-.957h-9.567a.478.478,0,1,0,0,.957Z"
                transform="translate(-119.253 -129.64)"
              />
              <path
                className="a"
                d="M223.046,254.319a.479.479,0,0,0,.479.478h8.965a.479.479,0,1,0,0-.957h-8.965A.479.479,0,0,0,223.046,254.319Z"
                transform="translate(-151.028 -181.526)"
              />
              <path
                className="a"
                d="M198.64,309.464a.478.478,0,0,0-.478-.478h-8.4a.479.479,0,0,0,0,.957h8.4A.479.479,0,0,0,198.64,309.464Z"
                transform="translate(-119.253 -233.422)"
              />
              <path
                className="a"
                d="M250.4,364.612a.479.479,0,0,0-.479-.478h-7.874a.478.478,0,1,0,0,.956h7.874A.479.479,0,0,0,250.4,364.612Z"
                transform="translate(-168.463 -285.32)"
              />
            </g>
          </svg>
          <div className="nodeNameTooltip">
            Webhook
          </div>
        </div>
      </div>
      <div className="sidebarHeader">
        <h4>
          Filter
          <img className="arrowIcon" src={white_arrow_right} alt="" />
        </h4>
      </div>
      <div className="dndNodes filterNodes">
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "filter")}
          draggable
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26.144 22.317"
            className="filterBuilder"
          >
            <path
              className="a"
              d="M3.228,7.558,12.462,18.3v8.516l5.677-3.785V18.3L27.374,7.558A.945.945,0,0,0,26.643,6H3.959A.945.945,0,0,0,3.228,7.558Z"
              transform="translate(-2.229 -5.25)"
            />
          </svg>
          <div className="nodeNameTooltip">
            Filter
          </div>
        </div>
      </div>
      <div className="sidebarHeader">
        <h4>
          Action
          <img className="arrowIcon" src={white_arrow_right} alt="" />
        </h4>
      </div>
      <div className="dndNodes actionNodes">
        <div
          className="dndnode emailNode"
          onDragStart={(event) => onDragStart(event, "actionEmail")}
          draggable
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24.663 18.539"
            className="triggerAction"
          >
            <g transform="translate(-0.15 -4.15)">
              <path className="a" d="M11.716,21.839H1V5H23.963v7.654" />
              <path className="a" d="M1,5l11.481,8.42L23.963,5" />
              <path
                className="a"
                d="M25,18l3.062,3.062L25,24.123"
                transform="translate(-5.63 -3.049)"
              />
              <line className="a" x1="7" transform="translate(15 18)" />
            </g>
          </svg>
          <div className="nodeNameTooltip">
            Email
          </div>
        </div>
        <div
            className="dndnode smsNode"
            onDragStart={(event) => onDragStart(event, "actionMessage")}
            draggable
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="27.5" height="24.5" viewBox="0 0 27.5 24.5" className="smsNode"><g transform="translate(-2.25 -5.25)"><line class="a" x2="7" transform="translate(18 22)"/><circle class="a" cx="7" cy="7" r="7" transform="translate(15 15)"/><path class="a" d="M21.9,25,25,22l-3.1-3"/><path class="a" d="M24,15.7V6H3V27H3a30.86,30.86,0,0,1,12-6"/><line class="b" x2="6" transform="translate(9 12)"/><line class="b" x2="3" transform="translate(9 16)"/></g></svg>
          <div className="nodeNameTooltip">
            SMS
          </div>
        </div>
        <div
          className="dndnode delayNode"
          onDragStart={(event) => onDragStart(event, "actionDelay")}
          draggable
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.679 26.985" class="triggerDelay"><path class="a" d="M18.587,13.181a10.2,10.2,0,0,0,5-8.886,1.132,1.132,0,0,0,1.087-1.123V2.632A1.132,1.132,0,0,0,23.547,1.5H6.632A1.132,1.132,0,0,0,5.5,2.632v.539A1.123,1.123,0,0,0,6.55,4.286a10.158,10.158,0,0,0,5.1,8.941,1.68,1.68,0,0,1,.858,1.516v.174a1.653,1.653,0,0,1-.913,1.452,10.119,10.119,0,0,0-5.032,8.85,1.123,1.123,0,0,0-1.059,1.1v.539a1.132,1.132,0,0,0,1.132,1.132H23.547a1.132,1.132,0,0,0,1.132-1.132v-.539a1.132,1.132,0,0,0-1.087-1.123,10.137,10.137,0,0,0-5-8.822,1.653,1.653,0,0,1-.913-1.443v-.3A1.653,1.653,0,0,1,18.587,13.181ZM6.413,3.171V2.632a.219.219,0,0,1,.219-.219H23.547a.219.219,0,0,1,.219.219v.539a.219.219,0,0,1-.219.219H6.632a.219.219,0,0,1-.219-.219ZM23.766,26.314v.539a.219.219,0,0,1-.219.219H6.632a.219.219,0,0,1-.219-.219v-.539a.219.219,0,0,1,.219-.219H23.547a.219.219,0,0,1,.219.219Zm-5.6-9.133a9.215,9.215,0,0,1,4.566,8.01H7.454a9.206,9.206,0,0,1,4.566-8.019,2.566,2.566,0,0,0,1.416-2.256v-.174a2.566,2.566,0,0,0-1.361-2.311,9.242,9.242,0,0,1-4.566-8.11H22.688A9.288,9.288,0,0,1,18.122,12.4a2.566,2.566,0,0,0-1.4,2.247v.283a2.566,2.566,0,0,0,1.443,2.247Z" transform="translate(-5.25 -1.25)"/></svg>
          <div className="nodeNameTooltip">
            Delay
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
