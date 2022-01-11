import React from "react";
import download_icon from "../../../src/assets/images/download_icon.svg";
import uparrow_icon_grey from "../../../src/assets/images/uparrow_icon_grey.svg";

const ContactHead = (props) => {
  return (
    <div className="contactHead">
      <div class="userListHead">
        <div class="listInfo">
          <ul class="listPath">
            <li>Contacts</li>
            <li>My Contacts</li>
          </ul>
          <h2 class="inDashboardHeader">Contacts List ({props.totalCount})</h2>
          <p class="userListAbout">Create, import &amp; manage your contacts</p>
        </div>
        <div class="listFeatures">
          <div class="searchBar">
            <form onSubmit={props.handleSearch}>
              <input
                type="search"
                name="search"
                placeholder="Search Contacts"
                defaultValue={props.keyword}
                onChange={props.handleKeywordChange}
                autoComplete="off"
              />
              <button className="searchIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.069"
                  height="19"
                  viewBox="0 0 19.069 19"
                  id="search-ico"
                >
                  <g transform="translate(-1.5 -1.5)">
                    <path
                      className="a"
                      d="M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z"
                    />
                    <path
                      className="a"
                      d="M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z"
                      transform="translate(-7.142 -7.143)"
                    />
                  </g>
                </svg>
              </button>
            </form>
          </div>
          <button class="btn btn-filter">
            <img
              class="filterIcon"
              src="/static/media/filter_icon.dac97ac8.svg"
              alt=""
            />
          </button>
          <button class="creatUserBtn" disabled="disabled">
            <img
              class="plusIcon"
              src="/static/media/plus_icon.200ad5cb.svg"
              alt=""
            />
            <span>Create</span>
          </button>
        </div>
      </div>
      <div className="head_ctrlRow">
        {/* <div className="head_ctrlRow_left">
                    <button className="saveNnewBtn massUpdateBtn">Mass Update</button>
                </div> */}
        <div className="head_ctrlRow_right">
          <button
            className="saveNnewBtn impContactBtn"
            onClick={() => props.openImportContact()}
          >
            <img src={download_icon} alt="" /> Import Contacts
          </button>
          <button className="saveNnewBtn expContactBtn">
            <img src={uparrow_icon_grey} alt="" /> Export Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactHead;
