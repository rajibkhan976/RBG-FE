import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../assets/images/info_3dot_icon.svg";
import noRecords from '../../../../assets/images/noRecords.svg';

import SmsConfiguration from "./smsConfiguration";
import {SmsSetupService} from "../../../../services/setup/SmsConfigServices";
import * as actionTypes from "../../../../actions/types";
import { utils } from "../../../../helpers";
import Loader from "../../../shared/Loader";
import Pagination from "../../../shared/Pagination";
import ConfirmBox from "../../../shared/confirmBox";



const SmsSetup = () => {
    const dispatch = useDispatch();
    const [option, setOption] = useState(null);
    const [configModalShow, setConfigModalShow] = useState(false);
    const [editConfig, setEditConfig] = useState({});
    const [isLoader, setIsLoader] = useState(false)
    const [tableList, setTableList ]= useState([]);
    const [smsConfigActive, setSmsConfigActive] = useState({})
    const [keyword, setKeyword] = useState('');
    const [filters, setFilters] = useState([]);
    const [smsConfigCount, setSmsConfigCount] = useState(0);
    const [savedConfigNew, setSavedConfigNew] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [sortBy, setSortBy] = useState("")
    const [sortType, setSortType] = useState("asc");
    const [paginationData, setPaginationData] = useState({
      count: null,
      totalPages: null,
      currentPage: 1,
      limit: 10,
    });
    const getQueryParams = async () => {
      const keyword = utils.getQueryVariable("search");
      const srtBy = utils.getQueryVariable("sortBy");
      const srtType = utils.getQueryVariable("sortType");
  
      const queryParams = new URLSearchParams();
  
      // console.log("search", keyword);
      if (keyword) {
        queryParams.append("search", keyword);
      }
      if (srtBy) {
        queryParams.append("sortBy", srtBy);
      }
      if (srtType) {
        queryParams.append("sortType", srtType);
      }
      return queryParams;
    };
    const fetchSMSConfig = async () => {
      let pageId = utils.getQueryVariable("page") || 1;
      let queryParams = await getQueryParams();

      try {
        setIsLoader(true);
        let result = await SmsSetupService.fetchSmsList(pageId, queryParams);
        if(result){
          setTableList(result.smsConfigs)
          setSmsConfigActive(result.activeNumber)
          setSmsConfigCount(result.pagination.count);
          setPaginationData({
            ...paginationData,
            currentPage: result.pagination.currentPage,
            totalPages: result.pagination.totalPages,
          });
          setIsLoader(false); 
        }
      } catch (error) {
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error,
          typeMessage: 'error'
        });
        // console.log("error", error);
      }
    }

    const toggleOptions = (index) => {
      setOption(index !== option ? index : null);
    };
    const openConfigModal = () => {
      setConfigModalShow(true);
    }
    const closeConfigModal = () => {
        setEditConfig({})
        setConfigModalShow(false);  
        fetchSMSConfig()
    }
    const editConfigHandle = (itemConfig) => {
      setConfigModalShow(true);
      setEditConfig(itemConfig)
      setOption(null);
    }
    const toggleStatusConfig = async (e, smsToggle) => {
      setIsLoader(true)
      try {
        const result = await SmsSetupService.smsConfigToggleStatus(smsToggle._id)
        if(result) {
          setIsLoader(false)  
          dispatch({
            type: actionTypes.SHOW_MESSAGE,
            message: "Config status changed successfully.",
            typeMessage: 'success'
          });
        }
      } catch (error) {
        setIsLoader(false)
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error,
          typeMessage: 'error'
        });
      } finally {
        fetchSMSConfig()
      }
    }

    const deleteSmsConfig = async (smsId) => {
      setIsLoader(true)
      let copyConf = [...tableList];
  
      try {
        setOption(null)
        const result = await SmsSetupService.deleteSmsConfig(smsId)

        if(result) {
          copyConf = copyConf.filter(msg => msg._id !== smsId);

          setTableList(copyConf)
          dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: 'SMS Config deleted successfully!',
              typeMessage: 'success'
          });
          fetchSMSConfig()
        }
      } catch (error) {
        // console.log(error);
        setIsLoader(false)
        dispatch({
          type: actionTypes.SHOW_MESSAGE,
          message: error,
          typeMessage: 'error'
        });
      } finally {
        setIsLoader(false)
      }
    }
    const confirmMessageDelete = (messageConfirmation) => {
      if(messageConfirmation == "yes") {
        try{
          deleteSmsConfig(deleteId)
          setOption(null)
          setDeleteConfirm(false)
        } catch (error) {
          dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: error.message,
              typeMessage: 'error'
          });
        }
      }
      if(messageConfirmation == "cancel") {
        setDeleteId(null)
        setDeleteConfirm(false)
        setOption(null)
      }
    }

    const handleSortBy = (field) => {
      // Set sort type
      let type = "asc";
      if (field == sortBy) {
        if (sortType == "asc") {
          type = "dsc";
        }
      }
  
      // Set state and Update query param
      setSortBy(field);
      setSortType(type);
      utils.addQueryParameter("sortBy", field);
      utils.addQueryParameter("sortType", type);
  
      // Fetch data
      fetchSMSConfig();
    };
    
    useEffect(()=>{
      setSortBy(utils.getQueryVariable("sortBy"));
      setSortType(utils.getQueryVariable("sortType"));
      fetchSMSConfig()
    },[])

    return(
        <>
            <div className="dashInnerUI">
            {isLoader ? <Loader /> : ""}
                <div className="userListHead">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Setup</li>
                            <li>Communication Setup</li>
                            <li>SMS</li>
                        </ul>
                        <h2 className="inDashboardHeader">SMS Setup</h2> {/*lighter*/}
                        <p className="userListAbout">Manage SMS configuration</p>
                    </div> 
                    <div className="listFeatures">
                        <button className="creatUserBtn" onClick={openConfigModal}>
                            <img className="plusIcon" src={plus_icon} alt=""/>
                            <span>Add a configuration</span>
                        </button>
                    </div> 
                </div>
                <div className="userListBody smsConfigListingTable">
                    <div className="assignedNumberArea">
                      {/* {console.log("active", smsConfigActive)} */}
                        <h3>Assigned Phone Number</h3>
                        {smsConfigActive && <p>{smsConfigActive.number} [ {smsConfigActive.numberAlias} ] </p>}
                    </div>
                    {tableList?.length > 0 ? <h3 className="callListTabHeading">Configurations</h3> : ""}
                    <div className="listBody">
                        {tableList?.length > 0 ? <ul className="tableListing">
                            <li className="listHeading">
                                <div className="userName " onClick={() => handleSortBy("name")}>Name</div>
                                <div className="statusToggleCell">Status</div>
                                <div className="createDate " style={{pointerEvents: 'none'}}></div>
                            </li>
                            {
                            tableList.map((list, key) => {
                                    return (
                                      <li key={"smsConfig-"+key}>
                                        <div className="userName">
                                            <button className="btn"><p>{list.name}</p></button>
                                        </div>
                                    
                                        <div className="statusToggleCell">
                                            <label className={list.status ? "toggleBtn active" : "toggleBtn inactive"}>
                                                <input 
                                                  type="checkbox" 
                                                  onChange={(e)=>toggleStatusConfig(e, list)}
                                                  checked={list.status}
                                                /><span className="toggler"></span>
                                            </label>
                                        </div>
                                                
                                        <div className="createDate">
                                            <button className="btn"><p>{list.created}</p></button>
                                            <div className="info_3dot_icon">
                                                <button className="btn" onClick={() => {
                                                  toggleOptions(key);
                                                }}><img src={info_3dot_icon} alt=""/></button>
                                            </div>
                                            <div className={
                                                option === key
                                                  ? "dropdownOptions listOpen"
                                                  : "listHide"
                                              }>
                                                <button className="btn btnEdit" onClick={()=>editConfigHandle(list)}>
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
                                                  </span> Edit</button>
                                                <button 
                                                  className="btn btnDelete"
                                                  onClick={()=> {
                                                    setDeleteId(list._id)
                                                    setDeleteConfirm(true)
                                                  }}
                                                ><span>
                                                <svg
                                                className="deleteIcon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12.347"
                                                height="13.553"
                                                viewBox="0 0 12.347 13.553"
                                              >
                                                <g transform="translate(0.75 0.75)">
                                                  <path
                                                    className="a"
                                                    d="M3,6H13.847"
                                                    transform="translate(-3 -3.589)"
                                                    style={{
                                                      stroke: "#9baebc",
                                                    }}
                                                  />
                                                  <path
                                                    className="a"
                                                    d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                                    transform="translate(-3.795 -2)"
                                                    style={{
                                                      stroke: "#9baebc",
                                                    }}
                                                  />
                                                  <line
                                                    className="a"
                                                    y2="3"
                                                    transform="translate(4.397 6.113)"
                                                    style={{
                                                      stroke: "#9baebc",
                                                    }}
                                                  />
                                                  <line
                                                    className="a"
                                                    y2="3"
                                                    transform="translate(6.397 6.113)"
                                                    style={{
                                                      stroke: "#9baebc",
                                                    }}
                                                  />
                                                </g>
                                              </svg>
                                                  </span> Delete</button>
                                            </div>
                                        </div>
                                      </li>
                                    )
                               })
                            }
                            
                        </ul> : <div className="createNew noInfos">
                              <div className="noRecordsImgWraper">
                                  <img src={noRecords} className="noRecords" alt=""/>
                                  <h4>No SMS Configurations Found</h4>
                                  <p>No SMS config have been listed here yet</p>
                              </div>
                              {(keyword === '' && filters.length === 0) ?
                                <button className="creatUserBtn" onClick={openConfigModal}>
                                    <img className="plusIcon" src={plus_icon} alt=""/>
                                    <span>Create SMS configuration</span>
                                </button>
                                : ''}
                          </div>}
                    </div>
                </div>

                {/* PAGINATION UI FOR SHOW */}     
                {smsConfigCount > paginationData.limit ? 
                  <Pagination
                      type="sms-template"
                      paginationData={paginationData}
                      dataCount={smsConfigCount}
                      callback={fetchSMSConfig}
                  /> : 
                  ''
                }
                {/* PAGINATION UI FOR SHOW */}
                { configModalShow && 
                  <SmsConfiguration  
                    closeModal={closeConfigModal}
                    isEditing={editConfig ? editConfig : null}
                  /> 
                }

                {deleteConfirm && 
                  <ConfirmBox 
                    callback={confirmMessageDelete} 
                  />
                }
            </div>
        </>
    );
}

export default SmsSetup;