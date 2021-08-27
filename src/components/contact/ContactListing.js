import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import * as actionTypes from "../../actions/types";
import ContactHead from './ContactHead';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ErrorAlert, SuccessAlert } from '../shared/messages';
import owner_img_1 from '../../../src/assets/images/owner_img_1.png';
import arrow_forward from '../../../src/assets/images/arrow_forward.svg';
import { ContactService } from "../../services/contact/ContactServices";
import { utils } from "../../helpers";
import Loader from "../shared/Loader";
import Pagination from '../shared/Pagination';


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
    const dispatch = useDispatch();

    const handelSize = () => {
        setTableWidth(window.innerWidth - 504);
    }

    useEffect(() => {
        handelSize();
    }, []);


    useEffect(() => {
        // fetchColumns();
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
        // console.log('queryParams', queryParams.toString() )
        try {
            // setIsLoader(true);
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
            const result = await ContactService.fetchColumns();
            // console.clear();
            // console.log(result);
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

        console.log(field);
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
        console.log('Keyword', keyword);
    }

    const handleSearch = (event) => {
        event.preventDefault();

        utils.addQueryParameter('page', 1);
        if (keyword) {
            utils.addQueryParameter('search', keyword);
        } else {
            utils.removeQueryParameter('search');
        }

        fetchContact();
    }

    const GenerateColumns = () => {
        console.log(savedColList);
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
        return contactList.map(ele => {
            let j = 0;
            return (
                <li>
                    {savedColList.map((item) => {
                        if (item.status) {
                            j++;
                            return (
                                <div className={item.id === "name" ? "dataTableCell user" : "dataTableCell"}>
                                    {(j === 1) ? <button className="extraDottedBtn" onClick={() => openContactModal(ele._id)}></button> : ""}
                                    <button className="btn">
                                        {(item.id === "name") ? <span className="tableCellUserImg">
                                            <img src={owner_img_1} alt="" />
                                        </span> : ""}
                                        {ele[item.id]}
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
    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <ContactHead
                totalCount={contactCount}
                handleSearch={handleSearch}
                handleKeywordChange={handleKeywordChange}
                keyword={keyword}
                openImportContact={() => props.openModal()}></ContactHead>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            <div className="userListBody">
                <div className="listBody contactListingTable" style={{ 'width': tableWidth }}>
                    <div className="tableDataConfigArea">
                        <div className="configColArea">
                            <button className="configColBtn" onClick={() => setColModalStatus(!colModalStatus)}></button>
                            {colModalStatus ?
                                <div className="configColModal">
                                    <div className="configColModalHead">
                                        <input type="search" placeholder="Search" 
                                        onChange={(event) => setSearchModalVal(event.target.value)}
                                        value={searchModalVal}/>
                                    </div>
                                    <div className="configColModalBody">
                                        <GenerateColumnDraggableModal searchData={searchModalVal}/>
                                    </div>
                                    <div className="configColModalfooter">
                                        <button className="saveNnewBtn" onClick={() => handleSave()}>Save <img src={arrow_forward} alt="" /></button>
                                        <button className="btn-link" onClick={() => handleClear()}>Clear</button>
                                    </div>
                                </div>
                                : ""}
                        </div>
                    </div>
                    <ul className="tableListing">
                        <GenerateColumns />
                        <GenerateContacts />
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