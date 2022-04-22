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

    const [displayState, setDisplayState] = useState("day");
   


    useEffect(() => {
        if (modalId === "") {
            fetchContact();
        }
    }, [modalId]);
    useEffect(() => {
        if (!props.modalStatus) {
            fetchContact();
        }
    }, [props.modalStatus]);
    const handelSize = () => {
        setTableWidth(window.innerWidth - 504);
    }

    useEffect(() => {
        handelSize();
    }, []);


    useEffect(() => {
        (async () => {
            const localSavedCol = localStorage.getItem("storedSavedColList", []);
            const storedSavedColList = (localSavedCol === null) ? [] : JSON.parse(localSavedCol);
            if (!storedSavedColList.length) {
                await fetchColumns();
                await fetchContact();
            } else {
                setListCol(storedSavedColList);
                setSavedColList(storedSavedColList);
                await fetchContact();
                // fetchContact();
            }
            handleCheckedColListHead();
            console.log("Stored Saved Column", storedSavedColList);
        })();
    }, []);



    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay);
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay);
    }, [successMsg, errorMsg])

    const fetchContact = async () => {
        setIsLoader(true);
        const pageId = utils.getQueryVariable('page');
        const queryParams = await getQueryParams();
        try {
            const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
            console.clear();
            console.log(readPermission);
            if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
                throw new Error(responses.permissions.automation.read);
            }
            const result = await ContactService.fetchUsers(pageId, queryParams);
            if (result) {
                console.log("Fetch Contact", result);
                setContactList(result.contacts);
                setAppointmentCount(result.pagination.count);
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
                dispatch({
                    type: actionTypes.CONTACTS_COUNT,
                    count: result.pagination.count,
                });
            }
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

    const fetchColumns = async () => {
        setIsLoader(true);
        try {
            const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
            if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
                throw new Error("");
            }
            const result = await ContactService.fetchColumns();
            if (result) {
                setListCol(result.columns);
                setSavedColList(result.columns);
                localStorage.setItem("storedSavedColList", JSON.stringify(result.columns));
            }
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

    const getQueryParams = async () => {
        const search = utils.getQueryVariable('search');
        const group = utils.getQueryVariable('group');
        const fromDate = utils.getQueryVariable('fromDate');
        const toDate = utils.getQueryVariable('toDate');
        const status = utils.getQueryVariable('status');
        const srtBy = utils.getQueryVariable('sortBy');
        const srtType = utils.getQueryVariable('sortType');

        const queryParams = new URLSearchParams();

        console.log('search', search)
        if (search) {
            queryParams.append("search", search);
        }
        if (group) {
            queryParams.append("group", group);
        }
        if (fromDate && toDate) {
            queryParams.append('fromDate', fromDate);
            queryParams.append('toDate', toDate);
        }
        if (status) {
            queryParams.append("status", status);
        }
        if (srtBy) {
            queryParams.append("sortBy", srtBy);
        }
        if (srtType) {
            queryParams.append("sortType", srtType);
        }
        return queryParams;
    }

    const handleCheckedColListHead = () => {
        let dataList = [];
        let listColData = listCol.filter(el => el.status == true);
        for (let i = 0; i < listColData.length; i++) {
            dataList = dataList.concat(listColData[i].id)
        }
        setCheckedColListHead(dataList);
        console.log(dataList);
    }

    // a little function to help us with reordering the result
    const reorder = (startIndex, endIndex) => {
        // const result = Array.from(list);
        let preSavedCol = listCol;
        const result = preSavedCol;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const item = reorder(
            result.source.index,
            result.destination.index
        );

        // unsavedColList = item;
        // console.log("unsavedColList", unsavedColList);
    }

    const handleCheckCol = (e, id) => {
        console.log(e, id);
        let data = JSON.parse(JSON.stringify(listCol));
        let index = data.findIndex(element => element.id == id);
        console.log(id, index);

        if (index >= 0) {
            data[index].status = e;
            setListCol([]);
            setTimeout(() => setListCol(data), 1);
            console.log(data);
        }
    }

    const handleSave = async () => {
        setIsLoader(true);
        try {
            const res = await ContactService.saveColumns(JSON.stringify({ columns: listCol }));
            if (res.status) {
                setSuccessMsg(res.message);
                localStorage.setItem("storedSavedColList", JSON.stringify(listCol));
                setSavedColList(listCol);
                setColModalStatus(false);
                handleCheckedColListHead();
                setSearchModalVal("");
            } else {
                setErrorMsg("Error in saving the columns. Please try again.");
            }
        } catch (e) {
            setErrorMsg("Error in saving the columns. Please try again.");
        } finally {
            setIsLoader(false);
        }
    }

    const handleClear = () => {
        const localSavedCol = localStorage.getItem("storedSavedColList", []);
        const storedSavedColList = (localSavedCol === null) ? [] : JSON.parse(localSavedCol);
        setListCol(storedSavedColList);
        setSavedColList(storedSavedColList);
        // setColModalStatus(false);
        setSearchModalVal("");

        // for (let k = 0; k < preSavedCol.length; k++) {
        //     if (preSavedCol[k].status) {
        //         listCol[k].status = true;
        //     } else {
        //         listCol[k].status = false;
        //     }
        // }
    }

    const handleSortBy = (field) => {
        // Set sort type
        let type = "asc"
        if (field == sortBy) {
            if (sortType == "asc") {
                type = "dsc";
            }
        }
        // Set state and Update query param
        setSortBy(field);
        setSortType(type);
        utils.addQueryParameter('sortBy', field);
        utils.addQueryParameter('sortType', type);
        // Fetch data
        // fetchUsers()
        fetchContact();
    }

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value ? event.target.value : '');
    }

    const handleSearch = (event) => {
        const readPermission = (Object.keys(permissions).length) ? permissions.actions.includes("read") : false;
        if (readPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
            event.preventDefault();
            utils.addQueryParameter('page', 1);
            if (keyword) {
                utils.addQueryParameter('search', keyword);
            } else {
                utils.removeQueryParameter('search');
            }
            fetchContact();
        } else {
            setErrorMsg(responses.permissions.contact.read);
        }
    }

    const GenerateColumns = () => {
        return (
            <li className="listHeading">
                {savedColList.map((item, index) => {
                    return (
                        <>
                            {item.status ? <div className="dataTableCell"
                                onClick={() => handleSortBy(item.id)}>{item.name}</div> : ""}
                        </>
                    )
                })}
            </li>
        )
    }

    const GenerateContacts = () => {
        return contactList.map((ele, i) => {
            let j = 0;
            return (
                <li key={'contact_'+i}>
                    {savedColList.map((item) => {
                        if (item.status) {
                            j++;
                            return (
                                <div className={item.id === "name" ? "dataTableCell user" : "dataTableCell"}>
                                    {(j === 1) ? <button className="extraDottedBtn" type="button"></button> : ""}
                                    <button className="btn" onClick={() => openContactModal(ele._id)}>
                                        {(item.id === "name") ? <span className="tableCellUserImg">
                                            <img src={owner_img_1} alt="" />
                                        </span> : ""}
                                        {(item.id === 'mobile' || item.id === 'phone' || item.id === 'dadPhone' || item.id === 'momPhone') ?
                                            ((ele[item.id] && ele[item.id].dailCode &&  ele[item.id].number !== "") ?
                                                <span className={ele[item.id].is_valid ?
                                                    "number valid" : "number invalid"}>{ele[item.id].dailCode + "-" + ele[item.id].number}</span> :
                                                "")  :
                                            ele[item.id]}
                                    </button>
                                </div>
                            )

                        }

                    })}
                </li>
            )
        })
    }

    const GenerateColumnDraggableModal = (prop) => {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dropPlate">
                    {(provided) => {
                        return (
                            <ul ref={provided.innerRef}>
                                {listCol.filter(el => el.name.toLowerCase().includes(prop.searchData.toLowerCase())).map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (

                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <label>
                                                    <div className="customCheckbox">
                                                        <input type="checkbox" onChange={(e) => handleCheckCol(e.target.checked, item.id)} checked={item.status} />
                                                        <span></span>
                                                    </div>
                                                    <span>{item?.name}</span>
                                                </label>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )
                    }}
                </Droppable>
            </DragDropContext>
        );
    }

    const openContactModal = (id) => {
        dispatch({
            type: actionTypes.CONTACTS_MODAL_ID,
            contact_modal_id: id,
        });
    }

    const handleImportModal = () => {
        const readPermission = (Object.keys(permissions).length) ? permissions.actions.includes("import") : false;
        if (readPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
            props.openModal()
        } else {
            setErrorMsg(responses.permissions.contact.import);
        }
    }

    
    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <AttendenceHead
                totalCount={appointmentCount}
                handleSearch={handleSearch}
                handleKeywordChange={handleKeywordChange}
                keyword={keyword}
                openImportAppointment={handleImportModal}
                displayState={displayState}
                setDisplayState={setDisplayState}></AttendenceHead>
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
                                  <li className="holidays">9</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
                                  <li className="holidays">HL</li>
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
            {(appointmentCount > paginationData.limit) ? <Pagination
                type="contact"
                paginationData={paginationData}
                dataCount={appointmentCount}
                callback={fetchContact} /> : ''}

        </div>
    );



}

export default AttendenceListing;