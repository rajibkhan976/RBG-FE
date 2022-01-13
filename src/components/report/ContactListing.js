import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../actions/types";
import ContactHead from './ContactHead';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ErrorAlert, SuccessAlert } from '../shared/messages';
import owner_img_1 from '../../../src/assets/images/owner_img_1.png';
import arrow_forward from '../../../src/assets/images/arrow_forward.svg';
// import user_icons from '../../../src/assets/images/list_img2.svg';
import { ContactService } from "../../services/contact/ContactServices";
import { utils } from "../../helpers";
import Loader from "../shared/Loader";
import Pagination from '../shared/Pagination';
import responses from '../../configuration/responses';
import env from '../../configuration/env';


const ContactListing = (props) => {
    const [tableWidth, setTableWidth] = useState(500);
    const messageDelay = 5000; // ms
    const [contactList, setContactList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [listCol, setListCol] = useState([]);
    const [savedColList, setSavedColList] = useState(listCol);
    const [keyword, setKeyword] = useState('');
    const [checkedColListHead, setCheckedColListHead] = useState([]);
    const [colModalStatus, setColModalStatus] = useState(false);
    const [contactCount, setContactCount] = useState(0);
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
                setContactCount(result.pagination.count);
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
            <ContactHead
                totalCount={contactCount}
                handleSearch={handleSearch}
                handleKeywordChange={handleKeywordChange}
                keyword={keyword}
                openImportContact={handleImportModal}></ContactHead>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            <div className="userListBody">
                <div className="listBody contactListingTable" style={{ 'width': '100%' }}>
                    
                    <ul className="tableListing appointment">
                    	   <li className="listHeading">
      <div className="dataTableCell">Contacts</div>
      <div className="dataTableCell">Email</div>
      <div className="dataTableCell">Counts</div>
      <div className="dataTableCell">Latest Date</div>
      <div className="dataTableCell">Status</div>
      
   </li>


   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>



<li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>

   <li>
      <div className="dataTableCell user"><button className="btn"><span className="tableCellUserImg"><img src={owner_img_1} alt="" /></span> Jonathan Doe</button></div>
      <div className="dataTableCell email"><button className="btn">jonathan.doe.tier5@gmail.co.in</button></div>
      <div className="dataTableCell count"><button className="btn">09</button></div>
      <div className="dataTableCell date"><button className="btn">Dec 12, 2021</button></div>
      <div className="dataTableCell status"><button className="btn">Pending</button></div>
      
   </li>



                    </ul>
                </div>
            </div>
            {(contactCount > paginationData.limit) ? <Pagination
                type="contact"
                paginationData={paginationData}
                dataCount={contactCount}
                callback={fetchContact} /> : ''}

        </div>
    );



}

export default ContactListing;