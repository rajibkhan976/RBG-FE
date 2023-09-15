import React, {forwardRef, useEffect, useImperativeHandle, useState, useRef, useSearchParams} from 'react';
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
import ShowContactTagModal from "../shared/showContactTagModal";
import TagList from "../appointment/TagList";
import cross_w from '../../../src/assets/images/cross_w.svg';
import useDebounce from "../../helpers/useDebounce";

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
    const isNumberAssigned = useSelector((state) => state.organization.data);
    const loggedInUser = useSelector((state) => state.user.data);
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
    const timezone = useSelector((state) => (state.user?.data?.organizationTimezone) ? state.user.data.organizationTimezone : null);
    const [checkboxes, setCheckboxes] = useState([]);
    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
    const [selectSingle, setSelectSingle] = useState(false);
    // const [unselectSingle, setUnselectSingle] = useState(false);
    const [deleteSelectedModal, setDeleteSelectedModal] = useState(false);
    const [addSelectAll, setAddSelectAll] = useState({
        status: false,
    });
    const [tagList, setTagList] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [tagListToggle, setTagListToggle] = useState(false);
    let arrangeColRef = useRef();
    const [showAction, setShowAction] = useState(false);
    // const [actionStatus, setActionStatus] = useState(false);
    const [searchContactList, setSearchContactList] = useState([]);
    const [singleContact, setSingleContact] = useState();
    // const [oneContactObj, setOneContacrObj] = useState([]);
    const [allContactCheck, setAllContactCheck] = useState(false);
    const timezoneOffset = useSelector((state)=> (state?.user?.data?.organizationTimezoneInfo?.utc_offset)? state?.user?.data.organizationTimezoneInfo.utc_offset:null);
                        //    useSelector((state)=> (state?.user?.data?.organizationTimezoneInfo?.utc_offset)? state.user.data.organizationTimezoneInfo.utc_offset:"UTC-06")
    const [filterProgram, setFilterProgram] = useState();
    const [filterTags, setFilterTags] = useState();
    const contactSearched = useDebounce(keyword, 1000);

    useEffect(()=>{
        console.log("contact listiing timezone", timezoneOffset);
    });
    useEffect(()=>{
        // {console.log("contact search result", contactSearched)}
        if(contactSearched){
            handleSearch(contactSearched);
        }else{
            // console.clear();
            // console.log("no search item is there");
            utils.removeQueryParameter('search');
            handleClear();
            fetchContact();
        }
    },[contactSearched]);
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
        console.log("contact api call================");
        setIsLoader(true);
        setSelectSingle(false);
        setSelectAllCheckbox(false);
        const pageId = utils.getQueryVariable('page');
        console.log("Page id", pageId);
        const queryParams = await getQueryParams();
        console.log("Query params", queryParams);
        const program = utils.getQueryVariable('program');
        const tags = utils.getQueryVariable('tags');
        // console.log(program, tags);
        try {
            const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
            // if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
            //     throw new Error(responses.permissions.automation.read);
            // }
            let result;
            if(props.filterApply){
                result = await ContactService.fetchUsers(1, queryParams)
            }
            else{
                result = await ContactService.fetchUsers(pageId, queryParams)
            }
            if (result) {
                console.log("contact list", result);
                setContactList(result.contacts);
                setContactCount(result.pagination.count);
                setFilters(result.filterApplied);
                // setFilterProgram(result.program);
                // setFilterTags(result.tags);
                // after api call line remove
                setPaginationData({
                    ...paginationData,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
                // console.log(result.pagination.count)
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
    const selectTag = async (tag, mode) => {
        try {
            setIsLoader(true);
            let payload = {
                tag: tag
            }
            let contact = await ContactService.applyRemoveTag(selectedContactId, payload, 'apply');
            setIsLoader(false);
            setTagListToggle(false);
            fetchContact();
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
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
        const program = utils.getQueryVariable('program');
        const tags = utils.getQueryVariable('tags');

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
            queryParams.append('fromDate', decodeURIComponent(fromDate).replaceAll("+", " "));
        }
        if (toDate) {
            queryParams.append('toDate', decodeURIComponent(toDate).replaceAll("+", " "));
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
        if(program){
            queryParams.append("program", program);
        }
        if(tags){
            queryParams.append("tags", decodeURIComponent(tags).replaceAll("+", " "));
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
        // console.log(e);
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
        // console.log("Search Value", event.target.value);
        setKeyword(event.target.value ? event.target.value : '');
    }

    const handleSearch = (event) => {
        console.clear();
        // console.log("Search Event", event);
        const readPermission = (Object.keys(permissions).length) ? permissions.actions.includes("read") : false;
        // event.preventDefault();
        utils.addQueryParameter('page', 1);
        if (event) {
            // utils.addQueryParameter('search', keyword.trim());
            utils.addQueryParameter('search', event.trim());
        } else {            
            utils.removeQueryParameter('search');
        }
        fetchContact();
    }


    const handleCheckBoxClick = (id, event, item) => {
        setSelectAllCheckbox(false);
        // console.log("one contact item", item);
        // console.log("mobile number", item.mobile?.number, "father number", item.dadPhone?.number, "phone number", item.mobile?.number, "mother number", item.momPhone?.number);
        let cb = checkboxes.map(ele => {
            if (ele.id === id) {
                ele.checked = !ele.checked;
            }
            return ele;
        });
       //console.log("total array", cb);
        let cbChecked = checkboxes.filter(ele => {
            
            if (ele.checked) {
                setShowAction(true);
                return ele;
            }       
        });
        // console.log("which one you are selected", cbChecked);
        let singleContactSelect = cbChecked.filter((ele, index)=>{
            if(cbChecked.length === 1){
                // console.log("Index", index);
                return ele;
            }else{
                return false
            }
            
        })
        
        // console.log("contact listing only one contact", singleContactSelect);

        if(cbChecked.length === 0){
            setShowAction(false);
            // setUnselectSingle(false);
        }
        
        if (cb.length == cbChecked.length) {
            setSelectAllCheckbox(true);
            setSelectSingle(false);
        } else if (cb.length){
            setSelectSingle(true);
        }
        setCheckboxes(cb);
        setSingleContact(singleContactSelect);


        // console.log(event.target.checked);

        // const filterContactData = checkboxes.find((item)=>item.checked === true);
        // // console.log(filterContactData);
        // setSearchContactList([...searchContactList, filterContactData]);
        // // console.log(searchContactList);


        if(cbChecked.length !== 0 && !event.target.checked){
            cbChecked.filter((ele, i)=>{
                if(ele.id === id){
                    // console.log(i);
                    return cbChecked.splice(i, 1);
                }
            });
        }

        // props.searchContactList(cbChecked);
        // let allData = [];
        // allData.push(JSON.stringify(cbChecked));
        // window.localStorage.setItem("searchContactList", allData.push(JSON.stringify(cbChecked)))
    }
    // useEffect(() => {
    //     props.setSingleContact(singleContact);
    // }, [checkboxes]);

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
        cb.every((item)=>{
            if(item.checked === true){
                setShowAction(true);
            }else{
                setShowAction(false);
            }
        })
        // console.log(cb);    
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
        // console.log(selectAllCheckbox, allContactCheck);
        // return false;
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
                    'all': allContactCheck,
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
            // after api call remove code
        // if(type === "program"){
        //     console.log("type", type);
        //     setFilterProgram({})
        // }
        // if(type === "tags"){
        //     setFilterTags({})
        // }
        // else{
            fetchContact();
        // }
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
        utils.removeQueryParameter('program');
        utils.removeQueryParameter('tags');
        setHideFilter(true);
        fetchContact();
    }
    const openBulkSmsHandler = ()=>{
        // console.log("SMS check phone number", singleContact, singleContact.length);
        // console.log(singleContact);
        if (!isNumberAssigned) {
            if (!loggedInUser.isOrganizationOwner) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: "No number is assigned, please contact to gym owner.",
                    typeMessage: 'error'
                });
            } else {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: "No number is assigned, please contact to super admin.",
                    typeMessage: 'error'
                });
            }
        } else if (loggedInUser.isOrganizationOwner && !loggedInUser.isPackage) {
            dispatch({
              type: actionTypes.SHOW_CREDIT_RESTRICTION,
            });
            dispatch({
              type: actionTypes.MODAL_COUNT_INCREMENT,
              area: 'firstEmail'
            });
          } else if (!loggedInUser.isOrganizationOwner && !loggedInUser.isPackage) {
            dispatch({
              type: actionTypes.SHOW_MESSAGE,
              message: "There is no active package found. Please contact your gym owner",
              typeMessage: 'error'
            });
          } else {
            if(singleContact !== undefined && singleContact[0]?.phoneNo !== "" && singleContact[0]?.phoneNo !== undefined) {
                props.setBulkSmsOpenModal();
                props.setSingleContactStatus(singleContact);
            }

            else if(singleContact == undefined || singleContact.length === 0){
                props.setBulkSmsOpenModal();
                props.setSingleContactStatus(singleContact);
            }
            else{
                setSingleContact();
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: "No phone number is there",
                    typeMessage: 'error'
                });
            }
        }
        
    }
    
    const openBulkEmailHandler=()=>{
        // console.log("Email check phone number", singleContact);
        if(singleContact !== undefined && singleContact[0]?.emailId !== "" && singleContact[0]?.emailId !== undefined){
            props.setBulkEmailOpenModal();
            props.setSingleContactStatus(singleContact);
        }
        else if(singleContact == undefined || singleContact.length === 0){
            props.setBulkEmailOpenModal();
            props.setSingleContactStatus(singleContact);
        }
        else{
            setSingleContact();
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: "No email id is there",
                typeMessage: 'error'
            });
        }
        
    }
    const openBulkAutomationHandler=()=>{
        props.setBulkAutomationOpenModal();
    }
    const selectAllValueAction = (flag) => {
        // console.log("flag========", flag);
        props.selectAllCheckboxValue(flag);
        if(flag){
            setAllContactCheck(true);
        }else{
            setAllContactCheck(false);
        }
        
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
        console.log("Filter is happing or not", props.filterApply);
        if (props.filterApply) {
            fetchContact();
        }
    }, [props.filterApply]);

    useEffect(() => {
        if (contactList.length) {
            let checkboxes = [];
            contactList.map(ele => {
                // console.log("all mobile number", ele.phone.number);
                // setOneContacrObj(ele);
                checkboxes.push({
                    'id': ele._id,
                    'checked': false,
                    'emailId': ele.email,
                    'phoneNo': ele.phone?.number
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
    useEffect(()=>{
        // console.log("props in contact listing", props.unCheckCloseFun);
        if(props.unCheckCloseFun){
            setSelectAllCheckbox(false);
            setSelectSingle(false);
            setShowAction(false);
            // setActionStatus(true);
            let checkForSelected = checkboxes.filter(ele => ele.checked === true);
            // console.log(checkForSelected);
            let cb = [];
            if (checkForSelected.length > 0) {
                cb = checkboxes.map(ele => {
                    ele.checked = false;
                    return ele;
                });
                setSelectAllCheckbox(false);
                setSelectSingle(false);
            }
            // cb.every((item)=>{
            //     if(item.checked === false){
            //         // console.log(cb);
                    
            //     }
            // })
            setCheckboxes(cb);
        }
    }, [props.unCheckCloseFun]);

    // useEffect(() => {
    //     if (actionStatus) {
    //         setTimeout(() => {
    //             setActionStatus(false)
    //         }, 200)
    //     }
    // }, [actionStatus])
    const removeTag = async (tagId, contactId = null) => {
        try {
            setIsLoader(true);
            let payload = {
                tag: {
                    _id: tagId
                }
            }
            let contact = await ContactService.applyRemoveTag(contactId ? contactId : selectedContactId, payload, 'remove');
            setIsLoader(false);
            let filteredTags = tagList.filter(el => el._id !== tagId);
            setTagList(filteredTags);
            fetchContact();
        } catch (e) {
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    }
    const GenerateContacts = () => {
        return contactList.map((ele, i) => {
            let j = 0;
            return (
                <li key={'contact_' + i}>
                    {savedColList.filter(filterCondition => filterCondition.status).map((item, pp) => {
                        j++;
                        return (
                            <div className={item.id === "name" ? "dataTableCell user userPlusSelect contactSelects" :
                                (item.id === "tags" ? "dataTableCell contactSelects tags" : "dataTableCell contactSelects") }
                                 key={'dataTableCell_' + i + pp}>
                                {(j === 1) ? <label className="indselects"><span className="customCheckbox allContacts">
                                    <input type="checkbox"
                                           checked={checkboxes && checkboxes[i] ? checkboxes[i].checked : false}
                                           name={"contactId" + ele._id} onChange={(event) => handleCheckBoxClick(ele._id, event, ele)}/>
                                    <span></span></span></label> : ""}
                                {(j === 1) && (!ele.isDependent || ele.isDependent === undefined) ? ((ele.payment_error != undefined || ele.course_error != undefined) ?
                                    <span className="infoWarning warningSpace"
                                          data-title={(ele.payment_error != undefined ? ele.payment_error : "") + ' ' + (ele.course_error != undefined ? ele.course_error : "")}>
                                        <img src={warning_bell} alt="warning"/></span> :
                                    <span className="warningSpace"></span>) : ""}
                                {((j === 1) && (ele && ele.isDependent && ele.guardianId) ?
                                    <span className="infoDependent" title="Dependent"><img src={dependent_white}
                                                                                           alt="dependent_white"/></span> : "")}
                                {
                                    (item.id === 'tags' ?
                                        (ele[item.id] !== undefined ? (ele[item.id].length < 3 ?
                                            <>
                                                {
                                                    ele[item.id].slice(0,2).map(el => {
                                                        return (
                                                            <span className="contactPageTags">
                                                                <span className="labelSelected">{el.name}</span>
                                                        <span className="closeTag" onClick={() => removeTag(el._id, ele._id)}><img
                                                            src={cross_w}
                                                            alt=""/></span>
                                                            </span>
                                                        )
                                                    } )
                                                }
                                                <button className='contactMoreTag' onClick={() => openContactTagList(ele)}>
                                                    +
                                                </button>
                                            </>
                                             : <>
                                                {
                                                    ele[item.id].slice(0,2).map(el => {
                                                        return (
                                                            <span className="contactPageTags">
                                                                <span className="labelSelected">{el.name}</span>
                                                                <span className="closeTag" onClick={() => removeTag(el._id, ele._id)}><img
                                                                    src={cross_w}
                                                                    alt=""/></span>
                                                            </span>
                                                        )
                                                    })
                                                }
                                                <button className='contactMoreTag' onClick={() => openContactTagModal(ele)}>
                                                    {ele[item.id].length - 2}+
                                                </button>
                                                <button className='contactMoreTag' onClick={() => openContactTagList(ele)}>
                                                    +
                                                </button>
                                            </> )  : <button className='contactMoreTag' onClick={() => openContactTagList(ele)}>
                                                        +
                                                    </button>)   : <button className="btn" onClick={() => openContactModal(ele._id)}>
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
                                            {/* {item.id === 'dob' && ele.dob} */}
                                            <span className="userNames mobile new">
                                                {((item.id === 'mobile' || item.id === 'phone' || item.id === 'dadPhone' || item.id === 'momPhone') ?
                                                    ((ele[item.id] && ele[item.id].dailCode && ele[item.id].number !== "") ? <span className={ele[item.id].is_valid ? "number valid" : "number invalid"}>
                                                        {ele[item.id].dailCode + "-" + ele[item.id].number}</span> : "") :
                                                    (item.id === 'dob' && ele[item.id] !== undefined && Moment(ele[item.id]).isValid() ? Moment(ele[item.id]).format('LL') : (item.id === 'createdAt' && Moment(ele[item.id]).isValid() ? utils.convertUTCToTimezone(ele[item.id], timezoneOffset) : ele[item.id])))
                                                } &nbsp;
                                             </span>
                                        </button>)
                                }
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
    const openContactTagModal = (contact) => {
        setOpenModal(true);
        setTagList(contact.tags);
        setSelectedContactId(contact._id);
    }
    const openContactTagList = (contact) => {
        setTagListToggle(!tagListToggle);
        setSelectedContactId(contact._id);
    }
    const closeModalHandler = () =>{
        setOpenModal(false);
    }
    const sendActionData = (data) => {
        // // console.log(data);
        // setActionStatus(data);
        if(data && addSelectAll.status){
            setAddSelectAll({
                ...addSelectAll,
                status: !addSelectAll.status,
            });
        }
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
                openBulkSmsHandler={openBulkSmsHandler}
                openBulkEmailHandler={openBulkEmailHandler}
                openBulkAutomationHandler={openBulkAutomationHandler}
                showAction={showAction}
                addSelectAll={addSelectAll}
                sendActionData={sendActionData}
                program={filterProgram}
                filterTags={filterTags}             
                // actionStatusFun={actionStatus}
                // singleContact={singleContact}
            ></ContactHead>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {deleteSelectedModal && (
                <div className="modalDependent modalBackdrop">
                    <div className="modalBackdropBg" onClick={() => closeDeleteModal(false)}></div>
                    <div className="slickModalBody setAppointment deleteSelectedModals">
                        <div className="modalForm appointmentForm setappointment successApp deleteModals">
                                <button className=" setApp" onClick={() => closeDeleteModal(false)}>
                                    <img src={cross} alt=""/>
                                </button>
                            <div className="innerModalHeader">
                                <h3 className="deleteHeading">Are you sure, you want to delete?</h3>
                            </div>
                            <div className="modalActionWraper">
                                <div className="formField">
                                    <span className="clearFilter"
                                        onClick={() => closeDeleteModal(false)}>Cancel
                                    </span>
                                </div>
                                <div className="formField">
                                    <button type="submit" className="saveNnewBtn deletebtns" onClick={deleteContacts}>
                                        <span>Yes</span>
                                    </button>
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
                                        <div className={selectSingle && showAction ? "selectAllWraper contactPageSelector singleSelect" : "selectAllWraper contactPageSelector withoutEditOption" && selectAllCheckbox ? "selectAllWraper contactPageSelector allSelect" : "selectAllWraper contactPageSelector withoutEditOption"}>
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
             {openModal &&
                 <ShowContactTagModal closeModal={closeModalHandler} removeTag={removeTag} tagList={tagList}/>
             }
            <TagList tagListToggle={tagListToggle} selectTag={selectTag}/>
        </div>
    );

   
})

export default ContactListing;
