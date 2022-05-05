import React, {forwardRef, useEffect, useImperativeHandle, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import * as actionTypes from "../../actions/types";
import ContactHead from './ContactHead';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {ErrorAlert, SuccessAlert} from '../shared/messages';
import owner_img_1 from '../../../src/assets/images/owner_img_1.png';
import arrow_forward from '../../../src/assets/images/arrow_forward.svg';
import warning_bell from "../../../src/assets/images/bell.svg"
import {ContactService} from "../../services/contact/ContactServices";
import noRecords from '../../../src/assets/images/noRecords.svg';
import plus_icon from '../../../src/assets/images/plus_icon.svg';
import arrow from '../../../src/assets/images/arrow1.svg';
import cross from "../../../src/assets/images/cross.svg";
import {utils} from "../../helpers";
import Loader from "../shared/Loader";
import Pagination from '../shared/Pagination';
import Moment from 'moment';
import dependent_white from "../../assets/images/dependent.svg";


const ContactListing = forwardRef((props, ref) => {
    const [tableWidth, setTableWidth] = useState(500);
    const messageDelay = 5000; // ms
    const [contactList, setContactList] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [listCol, setListCol] = useState([]);
    const [savedColList, setSavedColList] = useState(listCol);
    const [keyword, setKeyword] = useState('');
    const [colModalStatus, setColModalStatus] = useState(false);
    const [contactCount, setContactCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("asc");
    const [hideFilter, setHideFilter] = useState(false);
    const [filters, setFilters] = useState([]);
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
    const isFirstTime = useSelector((state) => state.contact.isFirstTime);
    const isClicked = useSelector((state) => state.notification.importId);
    const [checkboxes, setCheckboxes] = useState([]);
    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
    const [selectSingle, setSelectSingle] = useState(false);
    const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
    const [addSelectAll, setAddSelectAll] = useState({
        status: false,
    });
    let arrangeColRef = useRef();

    const openFilter = () => {
        props.openFilter();
    }

    const addSelectAllFn = () => {
        setAddSelectAll({
            ...addSelectAll,
            status: !addSelectAll.status,
        });
    };

    const closeDeleteModal = () => {
        setDeleteSelectedModal(false);
    }

    const checkOutsideClick = (e) => {
        if (arrangeColRef.current.contains(e.target)) {
            return false;
        } else {
            setColModalStatus(false);
            handleClear();
        }
    };

    const toggleColModal = () => {
        if (colModalStatus) {
            setColModalStatus(false);
            handleClear();
        } else {
            setColModalStatus(true);
        }
    }

    const createIndivitualContact = () => {
        dispatch({
            type: actionTypes.CONTACTS_MODAL_ID,
            contact_modal_id: 0,
        });
    }

    const handelSize = () => {
        setTableWidth(window.innerWidth - 504);
    }

    const fetchContact = async () => {
        setIsLoader(true);
        setSelectSingle(false);
        setSelectAllCheckbox(false);
        const pageId = utils.getQueryVariable('page');
        const queryParams = await getQueryParams();
        try {
            const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
            // if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
            //     throw new Error(responses.permissions.automation.read);
            // }
            const result = await ContactService.fetchUsers(pageId, queryParams);
            if (result) {
                setContactList(result.contacts);
                setContactCount(result.pagination.count);
                setFilters(result.filterApplied);
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
            // if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
            //     throw new Error("");
            // }
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
        const status = utils.getQueryVariable('status');
        const srtBy = utils.getQueryVariable('sortBy');
        const srtType = utils.getQueryVariable('sortType');
        const cache = utils.getQueryVariable('cache');
        const importId = utils.getQueryVariable('import');
        const phase = utils.getQueryVariable('phase');
        const source = utils.getQueryVariable('source');
        const by = utils.getQueryVariable('createdBy');
        const fromDate = utils.getQueryVariable('fromDate');
        const toDate = utils.getQueryVariable('toDate');

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
        if (fromDate) {
            queryParams.append('fromDate', fromDate);
        }
        if (toDate) {
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
        if (importId) {
            queryParams.append("import", importId);
        }
        if (phase) {
            queryParams.append("phase", phase);
        }
        if (source) {
            queryParams.append("source", decodeURIComponent(source).replaceAll("+", " "));
        }
        if (by) {
            queryParams.append("createdBy", by);
        }
        return queryParams;
    }

    const handleCheckedColListHead = () => {
        let dataList = [];
        let listColData = listCol.filter(el => el.status == true);
        for (let i = 0; i < listColData.length; i++) {
            dataList = dataList.concat(listColData[i].id)
        }
    }

    // a little function to help us with reordering the result
    const reorder = (startIndex, endIndex) => {
        // const result = Array.from(list);
        const result = listCol;
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
        console.log(e);
        let selected = listCol.filter(el => el.status).length;
        if (selected === 1 && !e) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'You can not uncheck all the fields.',
                typeMessage: 'error'
            });
        } else {
            setListCol((elms) =>
                elms.map((el) => {
                    if (el.id === id) {
                        el.status = e;
                    }
                    return {...el};
                })
            );
        }
    }


    const handleSave = async () => {
        setIsLoader(true);
        try {
            const res = await ContactService.saveColumns(JSON.stringify({columns: listCol}));
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
        event.preventDefault();
        utils.addQueryParameter('page', 1);
        if (keyword) {
            utils.addQueryParameter('search', keyword.trim());
        } else {
            utils.removeQueryParameter('search');
        }
        fetchContact();
    }


    const handleCheckBoxClick = (id) => {
        setSelectAllCheckbox(false);

        let cb = checkboxes.map(ele => {
            if (ele.id === id) {
                ele.checked = !ele.checked;
            }
            return ele;
        });
       
        let cbChecked = checkboxes.filter(ele => {
            if (ele.checked) {
                return ele;
            }            
        });
        
        if (cb.length == cbChecked.length) {
            setSelectAllCheckbox(true);
            setSelectSingle(false);
        } else if (cb.length){
            setSelectSingle(true);
        }
        console.log('cb', cb, cbChecked, checkboxes)
        setCheckboxes(cb);        
    }
    const handleCheckAll = () => {
        let checkForSelected = checkboxes.filter(ele => ele.checked === true);
        let cb = [];
        if (checkForSelected.length > 0) {
            cb = checkboxes.map(ele => {
                ele.checked = false;
                return ele;
            });
            setSelectAllCheckbox(false);
            setSelectSingle(false);
        } else {
            cb = checkboxes.map(ele => {
                ele.checked = true;
                return ele;
            });
            setSelectAllCheckbox(true);
            setSelectSingle(false);
        }
        setCheckboxes(cb);
    }


    const openContactModal = (id) => {
        dispatch({
            type: actionTypes.CONTACTS_MODAL_ID,
            contact_modal_id: id,
        });
    }


    const openUpdateFn = () => {
        if (selectAllCheckbox || selectSingle) {
            props.openUpdate();
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please select at least one contact first.',
                typeMessage: 'error'
            });
        }
        setAddSelectAll({
            ...addSelectAll,
            status: false,
        });
    }
    const deleteSelectedModalFn = () => {
        if (selectAllCheckbox || selectSingle) {
            setDeleteSelectedModal(true);
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please select at least one contact first.',
                typeMessage: 'error'
            });
        }
        setAddSelectAll({
            ...addSelectAll,
            status: false,
        });
    };
    const deleteContacts = async () => {
        if (selectAllCheckbox || selectSingle) {
            const pageId = utils.getQueryVariable('page');
            const queryParams = await getQueryParams();
            try {
                let sc = [];
                if (Array.isArray(checkboxes)) {
                    sc = checkboxes.filter(el => el.checked).map(el => {
                        return el.id
                    });
                }
                let payload = {
                    'all': selectAllCheckbox,
                    'selected': sc,
                };
                setIsLoader(true);
                await ContactService.deleteSelectedContact(payload, pageId, queryParams);
                setIsLoader(false);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: 'Contacts Deleted Successfully',
                    typeMessage: 'success'
                });
                setDeleteSelectedModal(false);
                fetchContact();
            } catch (e) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            }
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: 'Please select at least one contact first.',
                typeMessage: 'error'
            });
        }
    }
    const removeFilter = (type) => {
        if (type === 'all') {
            clearFilter();
        } else {
            utils.removeQueryParameter(type);
            utils.removeQueryParameter('page');
            fetchContact();
        }
    }
    const handleImportModal = () => {
        const readPermission = (Object.keys(permissions).length) ? permissions.actions.includes("import") : false;

        props.openModal();
        // if (readPermission && env.ACTIVE_PERMISSION_CHECKING === 1) {
        //     props.openModal()
        // } else {
        //     setErrorMsg(responses.permissions.contact.import);
        // }
    }
    const clearFilter = () => {
        utils.removeQueryParameter('import');
        utils.removeQueryParameter('page');
        utils.removeQueryParameter('status');
        utils.removeQueryParameter('phase');
        utils.removeQueryParameter('source');
        utils.removeQueryParameter('createdBy');
        utils.removeQueryParameter('fromDate');
        utils.removeQueryParameter('toDate');
        setHideFilter(true);
        fetchContact();
    }
    const selectAllValueAction = (flag) => {
        props.selectAllCheckboxValue(flag);
    }
    useEffect(() => {
        if (isClicked) {
            setHideFilter(false);
            fetchContact();
        }
    }, [isClicked]);

    useEffect(() => {
        if (modalId === '' && !isFirstTime) {
            fetchContact();
        }
    }, [modalId]);

    useEffect(() => {
        if (props.filterApply) {
            fetchContact();
        }
    }, [props.filterApply]);

    useEffect(() => {
        if (contactList.length) {
            let checkboxes = [];
            contactList.map(ele => {
                checkboxes.push({
                    'id': ele._id,
                    'checked': false
                })
            });
            setCheckboxes(checkboxes);
        }
    }, [contactList]);

    useEffect(() => {
        setSavedColList(listCol)
    }, [listCol]);

    useEffect(() => {
        if (successMsg) setTimeout(() => {
            setSuccessMsg("")
        }, messageDelay);
        if (errorMsg) setTimeout(() => {
            setErrorMsg("")
        }, messageDelay);
    }, [successMsg, errorMsg]);

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
        props.selectedContacts(checkboxes);
    }, [checkboxes]);

    useEffect(() => {
        if (props.fetchContact) {
            fetchContact();
        }
    }, [props.fetchContact]);

    // useEffect(() => {
    //     document.addEventListener("click", checkOutsideClick);
    //     return () => {
    //         document.removeEventListener("click", checkOutsideClick);
    //     }
    // }, []);

    /*useEffect(() => {
        return () => {
            dispatch({
                type: actionTypes.CONTACTS_MODAL_RESET
            });
        }
    })*/

    const GenerateContacts = () => {
        return contactList.map((ele, i) => {
            let j = 0;
            return (
                <li key={'contact_' + i}>
                    {savedColList.filter(filterCondition => filterCondition.status).map((item, pp) => {
                        j++;
                        return (
                            <div className={item.id === "name" ? "dataTableCell user userPlusSelect contactSelects" : "dataTableCell contactSelects"}
                                 key={'dataTableCell_' + i + pp}>
                                {(j === 1) ? <label className="indselects"><span className="customCheckbox allContacts">
                                    <input type="checkbox"
                                           checked={checkboxes && checkboxes[i] ? checkboxes[i].checked : false}
                                           name={"contactId" + ele._id} onChange={() => handleCheckBoxClick(ele._id)}/>
                                    <span></span></span></label> : ""}
                                {(j === 1) && (!ele.isDependent || ele.isDependent === undefined) ? ((ele.payment_error != undefined || ele.course_error != undefined) ?
                                    <span className="infoWarning warningSpace"
                                          data-title={(ele.payment_error != undefined ? ele.payment_error : "") + ' ' + (ele.course_error != undefined ? ele.course_error : "")}>
                                        <img src={warning_bell} alt="warning"/></span> :
                                    <span className="warningSpace"></span>) : ""}
                                {((j === 1) && (ele && ele.isDependent && ele.guardianId) ?
                                    <span className="infoDependent" title="Dependent"><img src={dependent_white}
                                                                                           alt="dependent_white"/></span> : "")}
                                <button className="btn" onClick={() => openContactModal(ele._id)}>
                                    {(item.id === "name") ? <span className="tableCellUserImg">
                                            <LazyLoadImage
                                                className="thumbImg"
                                                src={ele.profilePic !== undefined ? ele.profilePic : owner_img_1}
                                                alt="avatar"
                                                effect="blur"
                                                placeholderSrc={owner_img_1}
                                                visibleByDefault={true}
                                            />
                                        </span> : ""}
                                    <span className="userNames">
                                        {(item.id === 'mobile' || item.id === 'phone' || item.id === 'dadPhone' || item.id === 'momPhone') ?
                                            ((ele[item.id] && ele[item.id].dailCode && ele[item.id].number !== "") ?
                                                <span className={ele[item.id].is_valid ?
                                                    "number valid" : "number invalid"}>{ele[item.id].dailCode + "-" + ele[item.id].number}</span> :
                                                "") : (item.id === 'dob' && Moment(ele[item.id]).isValid() ? Moment(ele[item.id]).format('LL') :
                                                (item.id === 'createdAt' && Moment(ele[item.id]).isValid() ? Moment(ele[item.id]).format('LLL') : ele[item.id]))
                                        }
                                             </span>
                                </button>
                            </div>
                        )
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
                                                        <input type="checkbox"
                                                               onChange={(e) => handleCheckCol(e.target.checked, item.id)}
                                                               checked={item.status}/>
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

    const GenerateColumns = () => {
        return (
            <li className="listHeadingContacts">
                {savedColList.filter(filterCondition => filterCondition.status).map((item, index) => {
                    return (
                        <div className="GenerateColumnsCell" key={index}>
                            <div
                                className={"dataTableCell " + (item.id === sortBy ? (sortType === 'asc' ? 'asc' : "dsc") : "")}
                                onClick={() => handleSortBy(item.id)}>{item.name}</div>
                        </div>
                    )
                })}
            </li>
        )
    }

    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader/> : ''}
            <ContactHead
                totalCount={contactCount}
                handleSearch={handleSearch}
                handleKeywordChange={handleKeywordChange}
                keyword={keyword}
                openImportContact={handleImportModal}
                isClicked={isClicked}
                hideFilter={hideFilter}
                clearFilter={clearFilter}
                openFilter={openFilter}
                selectAllCheckbox={selectAllCheckbox}
                selectSingle={selectSingle}
                contactListPageCount={checkboxes.length}
                filters={filters}
                removeFilter={removeFilter}
                selectAll={selectAllValueAction}
            ></ContactHead>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {deleteSelectedModal && (
                <div className="modalDependent modalBackdrop">
                    <div className="slickModalBody setAppointment deleteSelectedModals">
                        <div className="modalForm appointmentForm setappointment successApp deleteModals">
                            <div className="slickModalHeader appointmentModalHeads">
                                <button className="topCross setApp" onClick={() => closeDeleteModal(false)}>
                                    <img src={cross} alt=""/>
                                </button>
                            </div>
                            <div className="innerModalHeader">
                                <h3 className="deleteHeading">Are you sure, you want to delete?</h3>
                            </div>
                            <div className="modalActionWraper">
                                <div className="formField formControl w-50"><span className="clearFilter"
                                                                                  onClick={() => closeDeleteModal(false)}>Cancel</span>
                                </div>
                                <div className="formField formControl w-50">
                                    <button type="submit" className="saveNnewBtn deletebtns" onClick={deleteContacts}>
                                        <span>Yes</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            { contactCount ?
                <>
                    <div className="userListBody">

                        <div className="listBody contactListingTable" style={{'width': tableWidth}}>
                            <div className="tableDataConfigArea contactPageListing">
                                <div className="configColArea selectFilters" ref={arrangeColRef}>
                                    <button className={colModalStatus ? "configColBtn close" : "configColBtn"}
                                            onClick={toggleColModal}></button>
                                    <div className="selectAllSection">
                                        <div className={selectSingle ? "selectAllWraper contactPageSelector singleSelect" : "selectAllWraper contactPageSelector withoutEditOption" && selectAllCheckbox ? "selectAllWraper contactPageSelector allSelect" : "selectAllWraper contactPageSelector withoutEditOption"}>
                                            <label><span
                                                className={selectSingle ? "checkCutsomInputs minusSelectBox" : "customCheckbox allContacts headerselect"}><input
                                                type="checkbox" name="selectAll" checked={selectAllCheckbox}
                                                onChange={handleCheckAll}/><span>
                                  </span></span></label>
                                  <span onClick={() => addSelectAllFn()} className={addSelectAll.status ? "allArrow openEdits" : "allArrow"} >
                                            <img src={arrow} alt=""/>
                                            </span>
                                        </div>
                                        {addSelectAll.status && (
                                            <div className="selectAllDropdown">
                                                <ul className="">
                                                    <li onClick={() => openUpdateFn()}>Update</li>
                                                    <li onClick={() => deleteSelectedModalFn()}>Delete</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    {colModalStatus ?
                                        <div className="configColModal contactPage">
                                            <div className="configColModalHead">
                                                <input type="search" placeholder="Search"
                                                       onChange={(event) => setSearchModalVal(event.target.value)}
                                                       value={searchModalVal}/>
                                            </div>
                                            <div className="configColModalBody">
                                                <GenerateColumnDraggableModal searchData={searchModalVal}/>
                                            </div>
                                            <div className="configColModalfooter">
                                                <button className="saveNnewBtn" onClick={() => handleSave()}>Save <img
                                                    src={arrow_forward} alt=""/></button>
                                                <button className="btn-link" onClick={() => handleClear()}>Clear
                                                </button>
                                            </div>
                                        </div>
                                        : ""}
                                </div>
                            </div>
                            <ul className="tableListing">
                                <GenerateColumns/>
                                <GenerateContacts/>
                            </ul>
                        </div>
                    </div>
                    {(contactCount > paginationData.limit) ? <Pagination
                        type="contact"
                        paginationData={paginationData}
                        dataCount={contactCount}
                        callback={fetchContact}/> : ''}

                </> :
                <div className="createNew noInfos">
                    <div className="noRecordsImgWraper">
                        <img src={noRecords} className="noRecords" alt=""/>
                        <h4>No Contacts Found</h4>
                        <p>No contacts have been listed here yet</p>
                    </div>
                    {(keyword === '' && filters.length === 0) ?
                        <button className="creatUserBtn" onClick={() => createIndivitualContact()}>
                            <img className="plusIcon" src={plus_icon} alt=""/>
                            <span>Create the First Contact</span>
                        </button>
                        : ''}
                </div>
            }
        </div>
    );


})

export default ContactListing;
