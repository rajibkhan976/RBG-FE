import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../../actions/types";
import RevenueHead from './RevenueHead';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ErrorAlert, SuccessAlert } from '../../shared/messages';
import owner_img_1 from '../../../../src/assets/images/owner_img_1.png';
import arrow_forward from '../../../../src/assets/images/arrow_forward.svg';
import previous from '../../../../src/assets/images/previous.svg';
import next from '../../../../src/assets/images/next.svg';
// import user_icons from '../../../../src/assets/images/list_img2.svg';
import { ContactService } from "../../../services/contact/ContactServices";
import arrowDown from "../../../../src/assets/images/arrowDown.svg";
import attendenceFilter from "../../../../src/assets/images/attendenceFilter.svg";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import Pagination from '../../shared/Pagination';
import responses from '../../../configuration/responses';
import env from '../../../configuration/env';


const RevenueListing = (props) => {
    const [tableWidth, setTableWidth] = useState(500);
    const messageDelay = 5000; // ms
    const [contactList, setContactList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [listCol, setListCol] = useState([]);
    const [savedColList, setSavedColList] = useState(listCol);
    const [keyword, setKeyword] = useState('');

    const [appointmentCount, setAppointmentCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");
    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 10
    });
    
    const [revenueData, setRevenueData] = useState([
      {
        "name": "FitBit Gym",
        "count" : "100",
       // "days" : {
        //   "JAN" : "$100",
        //   "FEB" : "$100",
        //   "MAR" : "$100",
        //   "APR" : "$100",
        //   "MAY" : "$100",
        //   "JUN" : "$100",
        //   "JUL" : "$100",
        //   "AUG" : "$100",
        //   "SEP" : "$100",
        //   "OCT" : "$100",
        //   "NOV" : "$100",
        //   "DEC" : "$100",
        // },
        "days" : ["$100","$100","$100","$100","$100","$100","$100"],
        "total" : "$10000"
      },
      {
        "name": "FitBit Gym",
        "count" : "100",
        // "days" : {
        //   "JAN" : "$100",
        //   "FEB" : "$100",
        //   "MAR" : "$100",
        //   "APR" : "$100",
        //   "MAY" : "$100",
        //   "JUN" : "$100",
        //   "JUL" : "$100",
        //   "AUG" : "$100",
        //   "SEP" : "$100",
        //   "OCT" : "$100",
        //   "NOV" : "$100",
        //   "DEC" : "$100",
        // },
        "days" : ["$100","$100","$100","$100","$100","$100","$100"],
        "total" : "$10000"
      },
      {
        "name": "FitBit Gym",
        "count" : "100",
        // "days" : {
        //   "JAN" : "$100",
        //   "FEB" : "$100",
        //   "MAR" : "$100",
        //   "APR" : "$100",
        //   "MAY" : "$100",
        //   "JUN" : "$100",
        //   "JUL" : "$100",
        //   "AUG" : "$100",
        //   "SEP" : "$100",
        //   "OCT" : "$100",
        //   "NOV" : "$100",
        //   "DEC" : "$100",
        // },
        "days" : ["$100","$100","$100","$100","$100","$100","$100"],
        "total" : "$10000"
      },
      {
        "name": "FitBit Gym",
        "count" : "100",
        // "days" : {
        //   "JAN" : "$100",
        //   "FEB" : "$100",
        //   "MAR" : "$100",
        //   "APR" : "$100",
        //   "MAY" : "$100",
        //   "JUN" : "$100",
        //   "JUL" : "$100",
        //   "AUG" : "$100",
        //   "SEP" : "$100",
        //   "OCT" : "$100",
        //   "NOV" : "$100",
        //   "DEC" : "$100",
        // },
        "days" : ["$100","$100","$100","$100","$100","$100","$100"],
        "total" : "$10000"
      },
      {
        "name": "FitBit Gym",
        "count" : "100",
        // "days" : {
        //   "JAN" : "$100",
        //   "FEB" : "$100",
        //   "MAR" : "$100",
        //   "APR" : "$100",
        //   "MAY" : "$100",
        //   "JUN" : "$100",
        //   "JUL" : "$100",
        //   "AUG" : "$100",
        //   "SEP" : "$100",
        //   "OCT" : "$100",
        //   "NOV" : "$100",
        //   "DEC" : "$100",
        // },
        "days" : ["$100","$100","$100","$100","$100","$100","$100"],
        "total" : "$10000"
      },
      {
        "name": "FitBit Gym",
        "count" : "100",
        // "days" : {
        //   "JAN" : "$100",
        //   "FEB" : "$100",
        //   "MAR" : "$100",
        //   "APR" : "$100",
        //   "MAY" : "$100",
        //   "JUN" : "$100",
        //   "JUL" : "$100",
        //   "AUG" : "$100",
        //   "SEP" : "$100",
        //   "OCT" : "$100",
        //   "NOV" : "$100",
        //   "DEC" : "$100",
        // },
        "days" : ["$100","$100","$100","$100","$100","$100","$100"],
        "total" : "$10000"
      }
    ]);

    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay);
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay);
    }, [successMsg, errorMsg])

  
    const handleKeywordChange = (event) => {
        setKeyword(event.target.value ? event.target.value : '');
    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <RevenueHead>
               </RevenueHead>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }

          
        

            {/* Monthly View Display */}
              
            <div className="userListBody monthly">
                <div className="listBody contactListingTable" style={{ 'width': '100%' }}>
                    
                    <ul className="tableListing appointment attendenceListing">
                    	   <li className="listHeading attendenceHeaderWraper">
                          <div className="dataTableCell attendencemember headers">Organisation Name</div>
                          <div className="dataTableCell attendencemember headers">Member Count (S)</div>
                          <div className="dataTableCell attendenceRecordsHeader">
                            <div className="attendenceDetailsWraper">
                              <div className="attendenceFirstRow revenue">
                               
                                <div className="midSection">
                                <p>Year :</p>
                                  <select className="attendenceSelect"
                                      style={{
                                          backgroundImage: "url(" + attendenceFilter + ")",
                                      }}>
                                      <option value="">2021</option>
                                      <option value="">2020</option>
                                      <option value="">2019</option>
                                      <option value="">2018</option>                                      
                                  </select>
                                </div>
                               
                              </div>
                              <div className="attendenceSecondRow">
                                <ul className="attendenceHeaderTable">
                                  <li>JAN</li>
                                  <li>FEB</li>
                                  <li>MAR</li>
                                  <li>APR</li>
                                  <li>MAY</li>
                                  <li>JUN</li>
                                  <li>JUL</li>
                                  <li>AUG</li>
                                  <li>SEP</li>
                                  <li>OCT</li>
                                  <li>NOV</li>
                                  <li>DEC</li>
                               
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="dataTableCell">Total Revenue</div>                        
                        </li>

                      {
                        revenueData.map((elem, key) => {
                          return (
                            <li key={key}> 
                            <div className="dataTableCell attendencemember user"><button className="btn"> {elem.name}</button></div>
                            <div className="dataTableCell attendencemember user"><button className="btn"> {elem.count}</button></div>
                            <div className="dataTableCell attendenceRecords">
                              <div className="attendenceRecordWraper">
                                <ul className="attendenceHeaderTable">
                                   {elem.days.map((ele, key) => {
                                      return (
                                        <li>{ele}</li>
                                      )}
                                   )
                                   }
                                </ul>
                              </div>
                            </div>
                           
                            <div className="dataTableCell totalDays"><button className="btn">{elem.total}</button></div>
                            
                          </li>
                          )
                        })
                      }
                     


                    </ul>
                </div>
            </div>              

            {/* Monthly View Display */}

            <div className="paginationOuter">
                <ul>
                  <li>
                    <button className="btn paginationBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                        <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" fill="#305671"></path>
                      </svg>
                    </button>
                  </li>
                  <li id="1">
                    <button className="btn paginationBtn" value="1">1</button>
                  </li>
                  <li id="2"><button className="btn paginationBtn" value="2">2</button></li>
                  <li id="3">
                      <button className="btn paginationBtn" value="3">3</button>
                  </li>
                  <li id="4">
                    <button className="btn paginationBtn active" value="4">4</button>
                  </li>
                  <li id="5">
                    <button className="btn paginationBtn" value="5">5</button>
                    </li>
                   
                    <li>
                      <button className="btn paginationBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
                          <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#305671"></path>
            v           </svg>
                      </button></li></ul>
                  </div>

        </div>
    );



}

export default RevenueListing;