import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as actionTypes from "../../actions/types";
import ContactHead from './ContactHead';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ErrorAlert, SuccessAlert } from '../shared/messages';
import owner_img_1 from '../../../src/assets/images/owner_img_1.png';
import arrow_forward from '../../../src/assets/images/arrow_forward.svg';
import warning_bell from "../../../src/assets/images/bell.svg"
import { ContactService } from "../../services/contact/ContactServices";
import { utils } from "../../helpers";
import Loader from "../shared/Loader";
import Pagination from '../shared/Pagination';
import responses from '../../configuration/responses';
import env from '../../configuration/env';
import Moment from 'moment';
import config from "../../configuration/config";


const ContactListing = forwardRef((props, ref) => {
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
    const isClicked = useSelector((state) => state.notification.importId);
    useEffect(() => {
        if (isClicked) {
            fetchContact();
        }
    }, [isClicked]);
    useEffect(() => {
        if (modalId === '') {
            fetchContact();
        }
    }, [modalId]);

    const handelSize = () => {
        setTableWidth(window.innerWidth - 504);
    }

    useEffect(() => {
        handelSize();
        const search = utils.getQueryVariable('search');
        if (search) {
          setKeyword(decodeURIComponent(search));
        }
        const sortByNew = utils.getQueryVariable('sortBy');
        if (sortByNew) {
            setSortBy(sortByNew);
        }
        const sortTypeNew = utils.getQueryVariable('sortType');
        if (sortTypeNew) {
            setSortType(sortTypeNew);
        }
    }, []);
    useImperativeHandle(ref, () => ({
        fetchContactForImportContactModalClose() {
            fetchContact();
        },
    }))
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
            }
            handleCheckedColListHead();
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
            if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
                throw new Error(responses.permissions.automation.read);
            }
            const result = await ContactService.fetchUsers(pageId, queryParams);
            if (result) {
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
        const cache = utils.getQueryVariable('cache');

        const queryParams = new URLSearchParams();
        if (cache) {
            queryParams.append("cache", cache);
        }
        if (search) {
            let searchDecoded = decodeURIComponent(search).replace(/\+/g, " ");
            queryParams.append("search", searchDecoded);
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
        if (!result.destination) {
            return;
        }

        const item = reorder(
            result.source.index,
            result.destination.index
        );
    }

    const handleCheckCol = (e, id) => {
        let data = JSON.parse(JSON.stringify(listCol));
        let index = data.findIndex(element => element.id == id);

        if (index >= 0) {
            data[index].status = e;
            setListCol([]);
            setTimeout(() => setListCol(data), 1);
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
        let i = 0;
        return (
            <li className="listHeading">
                {savedColList.map((item, index) => {
                    i++;
                    return (
                        <div className="GenerateColumnsCell" key={i}>
                            {item.status ? <div key={i + index} className={"dataTableCell " +(item.id === sortBy ? (sortType === 'asc' ? 'asc' : "dsc") : "")}
                                onClick={() => handleSortBy(item.id)}>{item.name}</div> : ""}
                        </div>
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
                    {savedColList.map((item, pp) => {
                        if (item.status) {
                            j++;
                            return (
                                <div className={item.id === "name" ? "dataTableCell user" : "dataTableCell"} key={'dataTableCell_'+i+pp}>
                                    {(j === 1) ? <button className="extraDottedBtn" type="button"></button> : ""}
                                    {(j === 1) ? ((ele.payment_error != undefined || ele.course_error != undefined) ? <span className="infoWarning warningSpace"
                                        data-title={(ele.payment_error != undefined ? ele.payment_error : "" ) + ' ' + (ele.course_error != undefined ? ele.course_error : "")}>
                                        <img src={warning_bell} alt="warning" />
                        </span> : <span className="warningSpace"></span>) : ""}
                                    <button className="btn" onClick={() => openContactModal(ele._id)}>
                                        {(item.id === "name") ? <span className="tableCellUserImg">
                                            <LazyLoadImage
                                                className="thumbImg"
                                                src={ele.profilePic !== undefined ? ele.profilePic : owner_img_1}
                                                alt="avatar"
                                                effect="blur"
                                                placeholderSrc={owner_img_1}
                                            />
                                        </span> : ""}
                                        {(item.id === 'mobile' || item.id === 'phone' || item.id === 'dadPhone' || item.id === 'momPhone') ?
                                            ((ele[item.id] && ele[item.id].dailCode &&  ele[item.id].number !== "") ?
                                                <span className={ele[item.id].is_valid ?
                                                    "number valid" : "number invalid"}>{ele[item.id].dailCode + "-" + ele[item.id].number}</span> :
                                                "")  : (item.id === 'dob' && Moment(ele[item.id]).isValid() ? Moment(ele[item.id]).format('LL') :
                                                (item.id === 'createdAt' && Moment(ele[item.id]).isValid() ? Moment(ele[item.id]).format('LLL') : ele[item.id] ))
                                             }
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
                <div className="listBody contactListingTable" style={{ 'width': tableWidth }}>
                    <div className="tableDataConfigArea">
                        <div className="configColArea">
                            <button className="configColBtn" onClick={() => setColModalStatus(!colModalStatus)}></button>
                            {colModalStatus ?
                                <div className="configColModal contactPage">
                                    <div className="configColModalHead">
                                        <input type="search" placeholder="Search"
                                            onChange={(event) => setSearchModalVal(event.target.value)}
                                            value={searchModalVal} />
                                    </div>
                                    <div className="configColModalBody">
                                        <GenerateColumnDraggableModal searchData={searchModalVal} />
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



})

export default ContactListing;
