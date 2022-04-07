import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../../actions/types";
import AttendenceHead from './AttendenceHead';
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


const AttendenceListing = (props) => {
    const [tableWidth, setTableWidth] = useState(500);
    const messageDelay = 5000; // ms
    const [contactList, setContactList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [listCol, setListCol] = useState([]);
    const [savedColList, setSavedColList] = useState(listCol);
    const [keyword, setKeyword] = useState('');
    const [checkedColListHead, setCheckedColListHead] = useState([]);
    const [colModalStatus, setColModalStatus] = useState(false);
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
    const [searchModalVal, setSearchModalVal] = useState("");
    const [permissions, setPermissions] = useState(Object.assign({}, ...JSON.parse(localStorage.getItem("permissions")).filter(el => el.entity === "contact")));
    const dispatch = useDispatch();
    const modalId = useSelector((state) => state.contact.contact_modal_id);
   





    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <AttendenceHead></AttendenceHead>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }


        {/* {displayState === "day" ? <p>hi Day is selected</p> : ''}
        {displayState === "week" ? <p>hi week is selected</p> : ''}
        {displayState === "month" ? <p>hi month is selected</p> : ''}
        {displayState === "year" ? <p>hi year is selected</p> : ''} */}

            {/* Weekly View Display */}
            {displayState === "week" ?
            <div className="userListBody weekly">
                <div className="listBody contactListingTable" style={{ 'width': '100%' }}>
                    
                    <ul className="tableListing appointment attendenceListing">
                    	   <li className="listHeading attendenceHeaderWraper">
                          <div className="dataTableCell attendencemember headers">Gym Members</div>
                          <div className="dataTableCell attendenceRecordsHeader">
                            <div className="attendenceDetailsWraper">
                              <div className="attendenceFirstRow">
                                <div className="prevBtn">
                                  <button><img src={previous} alt="" />Previous Week</button>
                                </div>
                                <div className="midSection">
                                <p>Attendance Week :</p>
                                  <select className="attendenceSelect"
                                      style={{
                                          backgroundImage: "url(" + attendenceFilter + ")",
                                      }}>
                                      <option value="">Week 1, Nov 2021</option>
                                      <option value="">Week 2, Nov 2021</option>
                                      <option value="">Week 3, Nov 2021</option>
                                      <option value="">Week 4, Nov 2021</option>

                                      
                                  </select>
                                </div>
                                <div className="nextBtn">
                                <button>Next Week<img src={next} alt="" /></button>
                                </div>
                              </div>
                              <div className="attendenceSecondRow">
                                <ul className="attendenceHeaderTable">
                                  <li>Mon</li>
                                  <li>Tue</li>
                                  <li>Wed</li>
                                  <li>Thu</li>
                                  <li>Fri</li>
                                  <li>Sat</li>
                                  <li>Sun</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="dataTableCell totalDayCount">Total Days</div>                        
                        </li>


                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Jonathan Doe</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>-</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                       
                        <div className="dataTableCell totalDays"><button className="btn">6</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Richard Nile</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">7</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Milne Poshtula</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>-</li>
                                  <li>10:00</li>
                                  <li>-</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">5</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Adam Smith</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>-</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">6</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Claudia Bolton</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>-</li>
                                  <li>-</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>-</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">4</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Paul Harrish</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">7</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Mathew Warner</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">7</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Ben Carrey</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>-</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">6</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Alex Stokes</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">7</button></div>                        
                      </li>

                    </ul>
                </div>
            </div>

            : ''}

            {/* Weekly View Display */}
                          

            {/* Daily View Display */}
            {displayState === "day" ?
            <div className="userListBody daily">
                <div className="listBody contactListingTable" style={{ 'width': '100%' }}>
                    
                    <ul className="tableListing appointment attendenceListing">
                    	   <li className="listHeading attendenceHeaderWraper">
                          <div className="dataTableCell attendencemember headers">Gym Members</div>
                          <div className="dataTableCell attendenceRecordsHeader">
                            <div className="attendenceDetailsWraper">
                              <div className="attendenceFirstRow">
                                <div className="prevBtn">
                                  <button><img src={previous} alt="" />Previous Day</button>
                                </div>
                                <div className="midSection">
                                <p>Attendance Day :</p>
                                  <select className="attendenceSelect"
                                      style={{
                                          backgroundImage: "url(" + attendenceFilter + ")",
                                      }}>
                                      <option value=""> 22nd Nov 2021</option>
                                      <option value=""> 23nd Nov 2021</option>
                                      <option value=""> 24nd Nov 2021</option>
                                      <option value=""> 25nd Nov 2021</option>

                                      
                                  </select>
                                </div>
                                <div className="nextBtn">
                                <button>Next Day<img src={next} alt="" /></button>
                                </div>
                              </div>
                              <div className="attendenceSecondRow">
                                <ul className="attendenceHeaderTable">
                                  <li>Mon</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="dataTableCell totalDayCount"></div>
                        
                        </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Jonathan Doe</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                       
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Richard Nile</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Milne Poshtula</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>-</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Adam Smith</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Claudia Bolton</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>-</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Paul Harrish</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Mathew Warner</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Ben Carrey</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>  
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Alex Stokes</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"></div>                        
                      </li>
                      
                    </ul>
                </div>
            </div>
            
            : ''}
            {/* Daily View Display */}


            {/* Monthly View Display */}

            {displayState === "month" ?
              
            <div className="userListBody monthly">
            {/* {displayState} */}
                <div className="listBody contactListingTable" style={{ 'width': '100%' }}>
                    
                    <ul className="tableListing appointment attendenceListing">
                    	   <li className="listHeading attendenceHeaderWraper">
                          <div className="dataTableCell attendencemember headers">Gym Members</div>
                          <div className="dataTableCell attendenceRecordsHeader">
                            <div className="attendenceDetailsWraper">
                              <div className="attendenceFirstRow">
                                <div className="prevBtn">
                                  <button><img src={previous} alt="" />Previous Month</button>
                                </div>
                                <div className="midSection">
                                <p>Attendance Month :</p>
                                  <select className="attendenceSelect"
                                      style={{
                                          backgroundImage: "url(" + attendenceFilter + ")",
                                      }}>
                                      <option value=""> Sep 2021</option>
                                      <option value=""> Oct 2021</option>
                                      <option value=""> Nov 2021</option>
                                      <option value=""> Dec 2021</option>                                      
                                  </select>
                                </div>
                                <div className="nextBtn">
                                <button>Next Month<img src={next} alt="" /></button>
                                </div>
                              </div>
                              <div className="attendenceSecondRow">
                                <ul className="attendenceHeaderTable">
                                  <li>1</li>
                                  <li>2</li>
                                  <li>3</li>
                                  <li>4</li>
                                  <li>5</li>
                                  <li>6</li>
                                  <li>7</li>
                                  <li>8</li>
                                  <li className="holiday">9</li>
                                  <li>10</li>
                                  <li>11</li>
                                  <li>12</li>
                                  <li>13</li>
                                  <li>14</li>
                                  <li>15</li>
                                  <li>16</li>
                                  <li>17</li>
                                  <li>18</li>
                                  <li>19</li>
                                  <li>20</li>
                                  <li>21</li>
                                  <li>22</li>
                                  <li>23</li>
                                  <li>24</li>
                                  <li>25</li>
                                  <li>26</li>
                                  <li>27</li>
                                  <li>28</li>
                                  <li>29</li>
                                  <li>30</li>
                                  <li>31</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="dataTableCell totalDayCount">Total Days</div>                        
                        </li>


                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Jonathan DoeJonathan DoeJonathan Doe</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                       
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Richard Nile</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                          <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">227</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Milne Poshtula</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                          <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">225</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Adam Smith</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                          <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">256</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Claudia Bolton</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                          <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">255</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Paul Harrish</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                              <ul className="attendenceHeaderTable">
                              <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Mathew Warner</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                              <ul className="attendenceHeaderTable">
                              <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Ben Carrey</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                          <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Alex Stokes</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                          <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li className="holiday">HL</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10:00</li>
                                  <li>10.00</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">255</button></div>                        
                      </li>

                    </ul>
                </div>
            </div>              

            :''}            
{/* Monthly View Display */}

            {/* Yearly View Display */}
            {displayState === "year" ?
            <div className="userListBody yearly">
                <div className="listBody contactListingTable" style={{ 'width': '100%' }}>
                    
                    <ul className="tableListing appointment attendenceListing">
                    	   <li className="listHeading attendenceHeaderWraper">
                          <div className="dataTableCell attendencemember headers">Gym Members</div>
                          <div className="dataTableCell attendenceRecordsHeader">
                            <div className="attendenceDetailsWraper">
                              <div className="attendenceFirstRow">
                                <div className="prevBtn">
                                  <button><img src={previous} alt="" />Previous Year</button>
                                </div>
                                <div className="midSection">
                                <p>Attendance Week :</p>
                                  <select className="attendenceSelect"
                                      style={{
                                          backgroundImage: "url(" + attendenceFilter + ")",
                                      }}>
                                      <option value=""> 2021</option>
                                      <option value="">2019</option>
                                      <option value=""> 2020</option>
                                      <option value="">2022</option>                                      
                                  </select>
                                </div>
                                <div className="nextBtn">
                                <button>Next Year<img src={next} alt="" /></button>
                                </div>
                              </div>
                              <div className="attendenceSecondRow">
                                <ul className="attendenceHeaderTable">
                                  <li>Jan</li>
                                  <li>Feb</li>
                                  <li>Mar</li>
                                  <li>Apr</li>
                                  <li>May</li>
                                  <li>Jun</li>
                                  <li>Jul</li>
                                  <li>Aug</li>
                                  <li>Sep</li>
                                  <li>Oct</li>
                                  <li>Nov</li>
                                  <li>Dec</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="dataTableCell totalDayCount">Total Days</div>                        
                        </li>


                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Jonathan Doe</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                            <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                       
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Richard Nile</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">227</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Milne Poshtula</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">225</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Adam Smith</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">256</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Claudia Bolton</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">255</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Paul Harrish</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Mathew Warner</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Ben Carrey</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">288</button></div>
                        
                      </li>

                      <li>
                        <div className="dataTableCell attendencemember user"><button className="btn"> Alex Stokes</button></div>
                        <div className="dataTableCell attendenceRecords">
                          <div className="attendenceRecordWraper">
                          <ul className="attendenceHeaderTable">
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                  <li>24</li>
                                </ul>
                          </div>
                        </div>
                        <div className="dataTableCell totalDays"><button className="btn">255</button></div>                        
                      </li>

                    </ul>
                </div>
            </div>                        
            :''}
            {/* Yearly View Display */}
            <div class="paginationOuter">
                <ul>
                  <li>
                    <button class="btn paginationBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492">
                        <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12    C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084    c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864    l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" fill="#305671"></path>
                      </svg>
                    </button>
                  </li>
                  <li id="1">
                    <button class="btn paginationBtn" value="1">1</button>
                  </li>
                  <li id="2"><button class="btn paginationBtn" value="2">2</button></li>
                  <li id="3">
                      <button class="btn paginationBtn" value="3">3</button>
                  </li>
                  <li id="4">
                    <button class="btn paginationBtn active" value="4">4</button>
                  </li>
                  <li id="5">
                    <button class="btn paginationBtn" value="5">5</button>
                    </li>
                   
                    <li>
                      <button class="btn paginationBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
                          <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" fill="#305671"></path>
            v           </svg>
                      </button></li></ul>
                  </div>

        </div>
    );



}

export default AttendenceListing;