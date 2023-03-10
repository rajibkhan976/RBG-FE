import React, { useEffect,useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../actions/types";
import download_icon from "../../../src/assets/images/download_icon.svg";
import download_cloud_icon from "../../../src/assets/images/download_cloud_icon_white.svg"
import uparrow_icon_grey from "../../../src/assets/images/uparrow_icon_grey.svg";
import remove_filter from "../../../src/assets/images/remove_filter.svg"
import cross from "../../../src/assets/images/cross.svg"
import filters from "../../../src/assets/images/filter.svg";
import {utils} from "../../helpers";

import action_arrow from "../../../src/assets/images/action-arrow-icon.svg";
import action_sms from "../../../src/assets/images/action_sms_icon.svg";
import action_sms_hover from "../../../src/assets/images/action_sms_icon_hover.svg"
import action_email from "../../../src/assets/images/action_email_icon.svg";
import action_email_hover from "../../../src/assets/images/action_email_icon_hover.svg";
import action_automation from "../../../src/assets/images/action-automation-icon.svg";
import action_automation_hover from "../../../src/assets/images/action_automation_icon_hover.svg";

const ContactHead = (props) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [selectSingle, setSelectSingle] = useState(false);
  const [selectAllContacts, setSelectAllContacts] = useState(false);
  const [filtersFirst, setFiltersFirst] = useState([]);
  const [filtersSecond, setFiltersSecond] = useState([]);
  const [actionTrigger, setActionTrigger] = useState(false);
  const actionTriggerRef = useRef(null);
  const [filterClear, setFilterClear] = useState(false);
  const [actionStatus, setActionStatus] = useState(true);
  const createIndivitualContact = () => {
    dispatch({
        type: actionTypes.CONTACTS_MODAL_ID,
        contact_modal_id: 0,
    });
  }
  useEffect(() => {
    const importId = utils.getQueryVariable('import');
    if (importId) {
     setFilter(true);
    }
  }, [props.isClicked]);

  useEffect(() => {
    const importId = utils.getQueryVariable('import');
    if (importId) {
      setFilter(true);
    } else {
      setFilter(false);
    }
  }, [props.hideFilter]);

  useEffect(() => {
    setSelectAllContacts(false);
    setSelectAllCheckbox(props.selectAllCheckbox);
  }, [props.selectAllCheckbox]);

  useEffect(() => {
    setSelectSingle(props.selectSingle);
  }, [props.selectSingle]);

  const openFilterFn = () => {
    props.openFilter();
  }
  useEffect(() => {
    console.log("======", props.filters);
    if (props.filters.length > 3) {
      setFiltersFirst(props.filters.slice(0, 3));
      setFiltersSecond(props.filters.slice(3,props.filters.length));
    } else {
      setFiltersFirst(props.filters);
      setFiltersSecond([]);
    }
  }, [props.filters])
  const removeFiler = (type) => {
    
    // console.log("filter close type", type);
    props.removeFilter(type);
    // if(type === 'all'){
    //   setFilterClear(true);
    //   // console.log("filter clear", filterClear);
    // }
  }
  const timezoneOffset = useSelector((state)=>(state?.user?.data?.organizationTimezoneInfo?.utc_offset)? state.user.data.organizationTimezoneInfo.utc_offset:null)
	useEffect(()=>{
	  console.log("credit details time zone", timezoneOffset);
	}, [timezoneOffset])
  const checkAll = () => {
    props.selectAll(!selectAllContacts);
    setSelectAllContacts(!selectAllContacts);
  }
  const actionHandelar = ()=>{
    // // console.log(actionTrigger);
    if(actionTrigger === false){
      setActionTrigger(true);
      props.sendActionData(true);
    }else{
      setActionTrigger(false);
      props.sendActionData(false);
    }
  }
  const handleOutsideClick = (event)=>{
    if (actionTriggerRef.current && !actionTriggerRef.current.contains(event.target)) {
      // // console.log(event);
      setActionTrigger(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
}, [actionTriggerRef]);
// useEffect(()=>{
//   // console.log("props in contact header", props.actionStatusFun);
//   if(props.actionStatusFun){
//     setActionStatus(false);
//     // console.log("action status", actionStatus, props.showAction, props.totalCount > props.contactListPageCount, selectAllCheckbox);
//   }
// },[props.actionStatusFun]);
// useEffect(()=>{
//   // console.log(props.showAction, props.totalCount > props.contactListPageCount, selectAllCheckbox);
// })

  return (
    <div className="contactHead">
      <div className="userListHead">
        <div className="listInfo">
          {/* <ul className="listPath">
            <li>Contacts</li>
            <li>My Contacts</li>
          </ul> */}
          <h2 className="inDashboardHeader">Contacts List ({props.totalCount})</h2>
          <p className="userListAbout">Create, import &amp; manage your contacts</p>
        </div>
        <div className="listFeatures">
          <div className="searchBar">
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
          {filter ?
              <button className="btn btn-filter" onClick={props.clearFilter} title="Remove filter">
                <img
                    className="filterIcon"
                    src={remove_filter}
                    alt=""
                />
              </button> : ""}

              <button className="saveNnewBtn appFilter expContactBtn contactListingsFilterBtn" onClick={() => openFilterFn()}>
            Filter <img src={filters} alt="" /> 
          </button>

          <button className="creatUserBtn" onClick={() => createIndivitualContact()}>
            <img
              className="plusIcon"
              src="/static/media/plus_icon.200ad5cb.svg"
              alt=""
            />
            <span>Create</span>
          </button>
        </div>
      </div>
      
      <div className="head_ctrlRow contactFilters">
        <div className="head_ctrlRow_left">
          {
            props.totalCount > props.contactListPageCount && selectAllCheckbox ?
                <div className="pageSelectedInfo">
                  <p className="leftPTag">All <b>{props.contactListPageCount}</b> contact(s) on this page are selected.</p>
                  {/* {props.totalCount > props.contactListPageCount &&  */}
                    <p className="rightPTag">
                      <label>
                        <span className="customCheckbox allContacts selectNumberDisplay">
                          <input type="checkbox" checked={selectAllContacts} onChange={checkAll}/>
                          <span></span>
                        </span>Select all &nbsp; <b> { props.totalCount } </b> &nbsp; contact(s)</label></p>
                  {/* } */}
                </div> : ""
          }
          {
            filtersFirst.length ?
                <div className={selectAllCheckbox ? "pagesTags selectedAllCheckBox" : "pagesTags"}>
                  {
                    filtersFirst.map((ele, key) => {
                      return (
                        <div className="contactsTags" key={key}>
                        {/* {ele.type} */}
                        {/* {utils.convertUTCToTimezone(ele.name.split(" ").splice(3,4).join(" ").trim(), timezoneOffset)} */}
                        {/* {utils.convertUTCToTimezone(ele.name.split(" ").splice(2,4).join(" ").replace(":","").trim(), timezoneOffset)} */}
                        { ele.type === "fromDate" &&
                          <span className="pageInfo"><strong>Created From :</strong> {utils.convertUTCToTimezone(ele.name.trim().split(" ").splice(3,4).join(" "), timezoneOffset)}</span>
                        }
                        { ele.type === "toDate" &&
                          <span className="pageInfo"><strong>Created To :</strong> {utils.convertUTCToTimezone(ele.name.split(" ").splice(2,4).join(" ").replace(":","").trim(), timezoneOffset)}</span>
                        }
                        {
                          ele.type !== "fromDate" && ele.type !== "toDate" &&
                          <span className="pageInfo" dangerouslySetInnerHTML={{__html: ele.name}}></span>

                        }
                        <span className="crossTags" onClick={() => removeFiler(ele.type)}><img src={cross} alt="" /></span>
                      </div>
                      )
                    })
                  }
                  {
                    filtersSecond.length ?
                        <div className="contactsTags extraCountsWraper">
                          <span className="extraCountsNumbers">{filtersSecond.length}</span>
                          <div className="extraTagsWrapers">

                            <div className="wrapersTags">
                              {
                                filtersSecond.map((elem, key1) => {
                                  return (
                                      <div className="contactsTags" key={key1}>
                                        <span className="pageInfo" dangerouslySetInnerHTML={{__html: elem.name}}></span>
                                        <span className="crossTags" onClick={() => removeFiler(elem.type)}><img src={cross} alt="" /></span>
                                      </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                        : ""
                  }

                  <div className="contactsTags clearAlls">
                    <span className="allDel" onClick={() => removeFiler('all')}>Clear All</span>
                  </div>
                </div>
                : ""
          }

          { props.showAction || props.totalCount > props.contactListPageCount && selectAllCheckbox ?
            <div className={actionStatus ? "action" : "action none"} ref={actionTriggerRef}>
              <button onClick={actionHandelar}>Actions <img src={action_arrow} /></button>
              {actionTrigger && !props.addSelectAll.status &&
                <ul className="dropdown">
                  <li><button onClick={props.openBulkSmsHandler}><img src={action_sms} /><img className="hover" src={action_sms_hover}/>Send SMS</button></li>
                  <li><button onClick={props.openBulkEmailHandler}><img src={action_email} /><img className="hover" src={action_email_hover}/>Send Email</button></li>
                  {/* <li><button onClick={props.openBulkAutomationHandler}><img src={action_automation} /><img className="hover" src={action_automation_hover} />Add to Automation</button></li> */}
                </ul>
              }
            </div>
           : ""
          }
        </div>
        <div className="head_ctrlRow_right">
          <button
            className="saveNnewBtn impContactBtn"
            onClick={() => props.openImportContact()}>
            <img src={download_cloud_icon} alt="" /> Import Contacts
          </button>
           {/* <button className="saveNnewBtn expContactBtn">
            <img className="exportImgs" src={uparrow_icon_grey} alt="" /> Export Contacts
          </button>  */}
        </div>
      </div>
    </div>
  );
};

export default ContactHead;
