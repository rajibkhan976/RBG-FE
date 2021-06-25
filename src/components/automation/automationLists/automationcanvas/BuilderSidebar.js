import React from "react";
import white_arrow_right from "../../../../assets/images/white_arrow_right.svg";

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
          className="dndnode"
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
            className="dndnode"
            onDragStart={(event) => onDragStart(event, "actionMessage")}
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
            SMS
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
