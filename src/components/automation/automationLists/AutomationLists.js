import React from 'react';

import plus_icon from "../../../assets/images/plus_icon.svg";
import flash_red from "../../../assets/images/flash_red.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";


const barWidth = {
  width: "20%",
};

const AutomationLists = () => {
  return (
    <>
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Automations</li>
            <li>Listing</li>
          </ul>
          <h2 className="inDashboardHeader">List of automations(5)</h2>
          <p className="userListAbout">Create & manage your multiple automations to automate your task</p>
        </div>
        <div className="listFeatures">


          <button className="creatUserBtn">
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create New Automation</span>
          </button>
        </div>
      </div>


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
        </div>
        <div className="listRow">
          <div className="listCell cellWidth_30">
            <div className="rowImage">
              <img src={flash_red} alt="" />
            </div>
            <p>Cold Out Reach Small Businesses</p>
          </div>
          <div className="listCell cellWidth_10">
            <p className="green">Published</p>
          </div>
          <div className="listCell cellWidth_15">
            <div className="progressBar">
              <div className="bar">
                <div className="fill" style={barWidth}></div>
              </div>
              <div className="barValInfo">
                <span>200</span> out of <span>1000</span>
              </div>
            </div>
          </div>
          <div className="listCell cellWidth_15">
            <p>Steve Martyns</p>
          </div>
          <div className="listCell cellWidth_15">
            <p>5th Feb 2021</p>
          </div>
          <div className="listCell cellWidth_10">
            <div className="toggleBtn active">
              <input type="checkbox" />
              <span className="toggler"></span>
            </div>
          </div>
          <div className="listCell cellWidth_5">
            <div className="moreButton">
              <button>
                <img src={info_3dot_icon} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="listRow">
          <div className="listCell cellWidth_30">
            <div className="rowImage">
              <img src={flash_red} alt="" />
            </div>
            <p>Cold Out Reach Small Businesses</p>
          </div>
          <div className="listCell cellWidth_10">
            <p className="">Draft</p>
          </div>
          <div className="listCell cellWidth_15">
            <div className="progressBar">
              <div className="bar">
                <div className="fill" style={barWidth}></div>
              </div>
              <div className="barValInfo">
                <span>200</span> out of <span>1000</span>
              </div>
            </div>
          </div>
          <div className="listCell cellWidth_15">
            <p>Steve Martyns</p>
          </div>
          <div className="listCell cellWidth_15">
            <p>5th Feb 2021</p>
          </div>
          <div className="listCell cellWidth_10">
            <div className="toggleBtn active">
              <input type="checkbox" />
              <span className="toggler"></span>
            </div>
          </div>
          <div className="listCell cellWidth_5">
            <div className="moreButton">
              <button>
                <img src={info_3dot_icon} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="listRow">
          <div className="listCell cellWidth_30">
            <div className="rowImage">
              <img src={flash_red} alt="" />
            </div>
            <p>Cold Out Reach Small Businesses</p>
          </div>
          <div className="listCell cellWidth_10">
            <p className="">Draft</p>
          </div>
          <div className="listCell cellWidth_15">
            <div className="progressBar">
              <div className="bar">
                <div className="fill" style={barWidth}></div>
              </div>
              <div className="barValInfo">
                <span>200</span> out of <span>1000</span>
              </div>
            </div>
          </div>
          <div className="listCell cellWidth_15">
            <p>Steve Martyns</p>
          </div>
          <div className="listCell cellWidth_15">
            <p>5th Feb 2021</p>
          </div>
          <div className="listCell cellWidth_10">
            <div className="toggleBtn ">
              <input type="checkbox" />
              <span className="toggler"></span>
            </div>
          </div>
          <div className="listCell cellWidth_5">
            <div className="moreButton">
              <button>
                <img src={info_3dot_icon} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="listRow">
          <div className="listCell cellWidth_30">
            <div className="rowImage">
              <img src={flash_red} alt="" />
            </div>
            <p>Cold Out Reach Small Businesses</p>
          </div>
          <div className="listCell cellWidth_10">
            <p className="green">Published</p>
          </div>
          <div className="listCell cellWidth_15">
            <div className="progressBar">
              <div className="bar">
                <div className="fill" style={barWidth}></div>
              </div>
              <div className="barValInfo">
                <span>200</span> out of <span>1000</span>
              </div>
            </div>
          </div>
          <div className="listCell cellWidth_15">
            <p>Steve Martyns</p>
          </div>
          <div className="listCell cellWidth_15">
            <p>5th Feb 2021</p>
          </div>
          <div className="listCell cellWidth_10">
            <div className="toggleBtn active">
              <input type="checkbox" />
              <span className="toggler"></span>
            </div>
          </div>
          <div className="listCell cellWidth_5">
            <div className="moreButton">
              <button>
                <img src={info_3dot_icon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AutomationLists;
