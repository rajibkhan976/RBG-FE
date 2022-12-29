import React, { useEffect, useState } from "react";
import NotificationGroupList from "./notification_group_list";
import plus_icon from "../../../../src/assets/images/plus_icon.svg";
import noRecords from "../../../assets/images/noRecords.svg";
import userImage from "../../../assets/images/userImage.png";
import info_3dot_icon from "../../../../src/assets/images/info_3dot_icon.svg";
import arrowUp from "../../../assets/images/arrow-in-upside.svg";

import Pagination from "../../shared/Pagination";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";

// popup modal
import UserAddField from "./userAddField"
import { NotificationGroupServices } from "../../../services/notification/NotificationGroupServices";
import ConfirmBox from "../../shared/confirmBox/index";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../../actions/types";
import defaultImage from "../../../../src/assets/images/owner_img_1.png";

const NotificationUserList = () => {
    const dispatch = useDispatch();
    const [isConfirmed, setConfirmed] = useState({
        show: false,
        id: null,
    });
    const [bulkUserDeleteConfirmed, setBulkUserDeleteConfirmed] = useState({
        show: false,
    });

    const [openModal, setOpenModal] = useState(false);
    const [isLoader, setLoader] = useState(false);
    const [checkboxes, setCheckboxes] = useState([]);
    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
    const [selectSingle, setSelectSingle] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [groupId, setGroupId] = useState(null);
    const [changeGroupType, setChangeGroupType] = useState(false);
    const [option, setOption] = useState(false);
    const [headerOption, setHeaderOption] = useState(false);
    const [editUserData, SetEditUserData] = useState('');
    const [notificationId, setNotificationId] = useState('');
    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 5
    });
    const [pageCount, setPageCount] = useState('');
    const [bulkUsers, setBulkUsers] = useState([]);
    const [bulkUserEdit, setBulkUserEdit] = useState(false);
    const [saveAsNewStatus, setSaveAsNewStatus] = useState(false);
    const [saveAsNewGrouPId, setSaveAsNewGrouId] = useState("");
    const [returnLoaded, setReturnLoaded] = useState(false);


    // open modal
    const openAddStatusFieldHandler = (e) => {
        setOpenModal(true);
        SetEditUserData('');
    }
    // close modal
    const closeCustomModal = (e) => {
        // console.log(e);
        if (e === true) {
            setOpenModal(false);
        } else {
            setOpenModal(true);
        }
    }

    const toggleOption = (id) => {
        setHeaderOption(false);
        // console.log(id, " ", option);
        setOption(id !== option ? id : null);
    }
    // header checkbox toggle

    const toggleOptionHeader = () => {
        setOption(false);
        if (headerOption === false) {
            setHeaderOption(true);
        }
        else {
            setHeaderOption(false);
        }
    }

    // list
    // pagination
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

    // pagination end

    // API call in notification list


    const fetchNotificationList = async () => {
        //
        setLoader(true);
        setSelectSingle(false);
        setSelectAllCheckbox(false);
        const pageId = utils.getQueryVariable('page');
        const queryParams = await getQueryParams();
        try {
            let result = await NotificationGroupServices.fetchNotificationGroupList();
            if (result) {
                console.log(result);
                setNotificationList(result.data);
                
                // alert("second", saveAsNewStatus);
                if (result?.data[0].users && result?.data[0].users.length && !saveAsNewStatus) {
                    setUserList(result.data[0].users);
                    console.log(userList.length);
                    
                }
                
                // setPaginationData({
                //     ...paginationData,
                //     currentPage: result.paginationData.currentPage,
                //     totalPages: result.paginationData.totalPages
                // });
            }

        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
        finally {
            setLoader(false);
        }
    }
    // APi call end
    // change notification grop tab

    const selectGroup = async (groupId) => {
        setChangeGroupType(true);
        setGroupId(groupId);
        console.log(groupId);
        setSelectAllCheckbox(false);
        setSelectSingle(false);
        setOption(false);
        setHeaderOption(false);
        let filterData = notificationList.filter((item) => {
            if (item._id === groupId) {
                return item;
            }
        });
        if (filterData[0]?.users.length) {
            let fiterUserData = filterData[0].users.filter((item) => {
                if (item._id) {
                    return item;
                }
            });
            console.log(fiterUserData);
            setUserList(fiterUserData);
        }
        console.log(filterData[0].users);
        // const userData = filterUserData[0].users
        // setUserList(userData)
    }


    // check in notification
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
        console.log(cbChecked);
        setBulkUsers(cbChecked)
        if (cb.length == cbChecked.length) {
            setSelectAllCheckbox(true);
            setSelectSingle(false);
        } else if (cb.length) {
            setSelectSingle(true);
        }

        setCheckboxes(cb);
    }

    const handleCheckAll = () => {
        let checkForSelected = checkboxes.filter(ele => ele.checked === true);
        let cb = [];
        if (checkForSelected.length > 0) {
            // alert("if");
            cb = checkboxes.map(ele => {
                ele.checked = false;
                return ele;
            });
            setSelectAllCheckbox(false);
            setSelectSingle(false);

        } else {
            // alert("else");
            cb = checkboxes.map(ele => {
                ele.checked = true;
                return ele;
            });
            setSelectAllCheckbox(true);
            setSelectSingle(false);
        }
        setCheckboxes(cb);

        cb.map((item) => {
            if (item.checked === true) {
                setBulkUsers(cb);
            } else {
                setBulkUsers([]);
            }
        })
        console.log(checkboxes);
    }

    // user list is edit


    const editUser = (item) => {
        setOption(false);
        
        if (!changeGroupType) {
            setGroupId(notificationList[0]?._id);
        }
        if (item._id) {
            setOpenModal(true);
            SetEditUserData(item, groupId);
            console.log(item, groupId);
        } else {
            setOpenModal(false);
        }
    }

    useEffect(() => {
        if (notificationList.length) {
            setGroupId(notificationList[0]?._id);
        }
    }, [notificationList])

    // add user under this group
    const openAddUserHandler = () => {
        // alert("user add");
        // setSelectAllCheckbox(false);
        SetEditUserData("");
        setBulkUserEdit("");
        // setSelectAllCheckbox(false); // it is not working i will check letter
        setOpenModal(true);
        if (!changeGroupType) {
            setGroupId(notificationList[0]?._id);
            // setBulkUsers("");
        }
    }
    // user list is deleted

    const deleteUser = async (item, isConfirmed = null) => {
        setNotificationId(item._id);
        if (!changeGroupType) {
            setGroupId(notificationList[0]?._id);
        }
        console.log(item, groupId);
        if (isConfirmed == null && item._id) {
            setConfirmed({
                show: true,
                id: item._id,
            });
        }
        else if (isConfirmed === "cancel") {
            setConfirmed({
                show: false,
                id: null,
            });
        }
        else {
            setConfirmed({
                show: false,
                id: null,
            });
            try {
                setOption(true);
                let payload = { userId: item }
                console.log(payload);
                const result = await NotificationGroupServices.deleteUser(groupId, payload);
                if (result) {
                    console.log(result);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'User Delete successfully.',
                        typeMessage: 'success'
                    });
                }
            } catch (e) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });

            } finally {
                setLoader(false);
                fetchNotificationList();
            }
        }
    }

    const editTotalUser = async () => {
        // setLoader(true);
        setHeaderOption(false);
        console.log(bulkUsers);
        if (bulkUsers.length) {
            setOpenModal(true);
            setBulkUserEdit(true);
            // SetEditUserData("");
        }

    }
    const deleteTotalUser = async (isConfirmed = null) => {
        setHeaderOption(false);
        // alert("delete");
        console.log(bulkUsers);
        const allUserId = [];
        bulkUsers.forEach((item) => {
            console.log(item.id);
            allUserId.push(item.id);
        });
        const payload = { userIds: allUserId.toString() }
        console.log(groupId, payload);

        if (isConfirmed == null && allUserId.length) {
            setBulkUserDeleteConfirmed({
                show: true,
            });
        }
        else if (isConfirmed === "cancel") {
            // alert("close modal");
            setBulkUserDeleteConfirmed({
                show: false,
            });
        } else {
            setBulkUserDeleteConfirmed({
                show: false,
            });
            // alert("api call");
            if (allUserId.length && groupId) {
                // alert("please select any user");
                try {
                    setLoader(true);
                    const result = await NotificationGroupServices.bulkUserDelete(groupId, payload);
                    if (result) {
                        console.log(result);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: 'Notification Group updated successfully.',
                            typeMessage: 'success'
                        });
                        fetchNotificationList();
                    }
                    setLoader(false);
                } catch (e) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: e.message,
                        typeMessage: 'error'
                    })
                } finally {
                    setLoader(false);
                }
            }
        }
    }


    useEffect(() => {
        let checkBoxes = [];
        // console.log(notificationList);
        if (userList.length) {
            userList.map((item) => {
                checkBoxes.push({
                    'id': item._id,
                    'checked': false
                })
            })
            setCheckboxes(checkBoxes);
        }
    }, [userList]);


    useEffect(() => {
        // if(notificationList.length !== 0){
        fetchNotificationList();
        // }
        // if(saveAsNewStatus){
            fetchNotificationList();
        // }
    }, []);


    const [firstAddGroup, setFirstAddGroup] = useState(false);
    const addGroupHandler = () => {
        setFirstAddGroup(true);
    }



    const updateGroup = (result) => {
        console.log(result);
        if (result.message) {
            fetchNotificationList();
        }
    }
    const addGroup = (result) => {
        console.log(result);
        if (result.data) {
            fetchNotificationList();
        }
    }
    const deleteGroup = (result) => {
        console.log(result);
        if (result.message) {
            fetchNotificationList();
        }
    }
    const successData = (result) => {
        console.log(result);
        if (result.message) {
            fetchNotificationList();
        }
    }
    const reloaded = (status)=>{
        if(status){
            fetchNotificationList();
        }
    }
    
    return (
        <>
            {/* bckzxcnkvnkxn */}
            {isLoader ? <Loader /> : ""}
            {isConfirmed.show ? (
                <ConfirmBox
                    callback={(confirmedMsg) =>
                        deleteUser(isConfirmed.id, confirmedMsg)
                    }
                />
            ) : ("")}
            {bulkUserDeleteConfirmed.show ? (
                <ConfirmBox
                    callback={(confirmedMsg) =>
                        deleteTotalUser(confirmedMsg)
                    }
                />
            ) : ("")}


            <div className="dashInnerUI notification">
                <div className="userListHead">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Red Belt Gym</li>
                            <li>Settings </li>
                            <li>Notification group</li>
                        </ul>
                        <h2 className="inDashboardHeader">
                            Notification Group
                        </h2>
                        <p className="userListAbout">Create your notification group</p>
                    </div>

                    {notificationList.length === 0 ?
                        <button className="creatUserBtn"
                            onClick={() => addGroupHandler(true)}>
                            <img className="plusIcon" src={plus_icon} alt="" />
                            <span>Add Group</span>
                        </button> : <button className="creatUserBtn"
                            onClick={openAddUserHandler}>
                            <img className="plusIcon" src={plus_icon} alt="" />
                            <span>Add Users</span>
                        </button>
                    }
                </div>
                {/* when no option is there */}
                {/* <div className=""> */}
                    {
                        notificationList && notificationList.length && userList && userList.filter(ele => ele._id !== undefined).length > 0 ?
                            (
                                <>
                                    <div className="userListBody">

                                    <ul className="customtableListing notificationGroupList" >
                                        <li className="listHeading">
                                            <div className="statusNameField">
                                                <div className="headerCheckBox">
                                                    {/* <div className={selectSingle ? "selectAllWraper contactPageSelector singleSelect" : "selectAllWraper contactPageSelector withoutEditOption" && selectAllCheckbox ? "selectAllWraper contactPageSelector allSelect" : "selectAllWraper contactPageSelector withoutEditOption"}> */}

                                                    {/* <label className="cusCheckBox"> */}
                                                    <label className={selectSingle ? "cusCheckBox singleSelect" : "cusCheckBox withoutEditOption" && selectAllCheckbox ? "cusCheckBox allSelect" : "cusCheckBox withoutEditOption"}>
                                                        {/* <span className={selectSingle ? "checkCutsomInputs minusSelectBox" : "customCheckbox allContacts headerselect"}> */}
                                                        <input type="checkbox"
                                                            name="tags"
                                                            value="addTags"
                                                            onChange={handleCheckAll}
                                                            checked={selectAllCheckbox}
                                                        />
                                                        {/* </span> */}
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    {/* </div> */}
                                                    <botton className="btn" onClick={toggleOptionHeader}><img src={arrowUp} /></botton>
                                                    {headerOption &&
                                                        <div className="dropdownOptions status">
                                                            <button className="btn btnEdit" onClick={() => editTotalUser()}>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                                </span>
                                                                Edit
                                                            </button>
                                                            <button className="btn btnDelete" onClick={() => deleteTotalUser()}>
                                                                <span>
                                                                    <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                                </span>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                                Name
                                            </div>
                                            <div className="bigspace">Phone No</div>
                                            <div className="createdField">Email Id</div>
                                            <div className="opted">Opted for</div>
                                            <div className="vacent"></div>
                                        </li>
                                        {
                                            userList.filter((item) => item._id !== undefined).map((item, i) => {
                                                return (

                                                    <li key={i}>
                                                        <div className="statusNameWraper">
                                                            <label className="cusCheckBox">
                                                                <input type="checkbox"
                                                                    name={"notificationId" + item._id}
                                                                    value="addTags"
                                                                    checked={checkboxes && checkboxes[i] ? checkboxes[i].checked : false}
                                                                    onChange={() => handleCheckBoxClick(item._id)}
                                                                />
                                                                <span className="checkmark"></span>
                                                            </label>
                                                            {/* <label className="indselects"><span className="customCheckbox allContacts">
                                            <input type="checkbox"
                                                checked={checkboxes && checkboxes[i] ? checkboxes[i].checked : false}
                                                name={"contactId" + item._id} onChange={() => handleCheckBoxClick(item._id)} />
                                            <span></span></span></label> */}
                                                            <div className="thumbImage"><img src={item?.image ? "https://wrapperbucket.s3.amazonaws.com/" + item.image : defaultImage} /></div>
                                                            {item?.firstName} {item?.lastName}
                                                        </div>
                                                        <div className="statusPhone">
                                                            <a href="tel:(555) 555-1234">{item?.prefix} - {item?.phone}</a>
                                                        </div>
                                                        <div className="statusEmail">
                                                            <a href="mailto:richard.nile99@gmail.com">{item?.email}</a>
                                                        </div>
                                                        <div className="statusOpted">
                                                            {/* SMS &amp; Email */}
                                                            {item?.sms && "SMS"} {item?.email && item?.sms && '&'} {item?.email && "Email"}
                                                        </div>
                                                        <div className="action">
                                                            <div className="info_3dot_icon">
                                                                <button className="btn" onClick={(e) => toggleOption(item._id)}>
                                                                    <img src={info_3dot_icon} />
                                                                </button>
                                                            </div>
                                                            {option == item._id &&
                                                                <div className="dropdownOptions status">
                                                                    <button className="btn btnEdit" onClick={() => editUser(item)}>
                                                                        <span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                                        </span>
                                                                        Edit
                                                                    </button>
                                                                    <button className="btn btnDelete" onClick={() => deleteUser(item)}>
                                                                        <span>
                                                                            <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                                        </span>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </li>

                                                )
                                            })

                                        }

                                    </ul>
                                    </div>
                                </>
                            ) : (
                                <div className="userListBody notificationBody">
                                    <div className="createNew noInfos">
                                        <div className="noRecordsImgWraper">
                                            <img src={noRecords} className="noRecords" alt="" />
                                            <h4>No Status Found</h4>
                                            <p>No statuses have been listed here yet</p>
                                        </div>
                                        {
                                            notificationList.length === 0 ?
                                                <button className="creatUserBtn buttonForNoRecord"
                                                    onClick={addGroupHandler}>
                                                    <img className="plusIcon" src={plus_icon} alt="" />
                                                    <span>Add Group</span>
                                                </button> :
                                                <button className="creatUserBtn buttonForNoRecord"
                                                    onClick={openAddStatusFieldHandler}>
                                                    <img className="plusIcon" src={plus_icon} alt="" />
                                                    <span>Add Users</span>
                                                </button>
                                        }
                                    </div>
                                </div>
                            )
                    }









                    {/* {
                        notificationList.filter((ele) => ele.users.filter((item) => item._id !== undefined)) ? (
                            <ul className="customtableListing notificationGroupList" >
                                {
                                    ((notificationList[0]?.users[0]._id === undefined && notificationList.length !== 0) || (userList.length !== 0)) ?
                                        <li className="listHeading">
                                            <div className="statusNameField">
                                                <div className="headerCheckBox">
                                                    <label className={selectSingle ? "cusCheckBox singleSelect" : "cusCheckBox withoutEditOption" && selectAllCheckbox ? "cusCheckBox allSelect" : "cusCheckBox withoutEditOption"}>
                                                        <input type="checkbox"
                                                            name="tags"
                                                            value="addTags"
                                                            onChange={handleCheckAll}
                                                            checked={selectAllCheckbox}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <botton className="btn" onClick={toggleOptionHeader}><img src={arrowUp} /></botton>
                                                    {headerOption &&
                                                        <div className="dropdownOptions status">
                                                            <button className="btn btnEdit" onClick={() => editTotalUser()}>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                                </span>
                                                                Edit
                                                            </button>
                                                            <button className="btn btnDelete" onClick={() => deleteTotalUser()}>
                                                                <span>
                                                                    <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                                </span>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                                Name
                                            </div>
                                            <div className="bigspace">Phone No</div>
                                            <div className="createdField">Email Id</div>
                                            <div className="opted">Opted for</div>
                                            <div className="vacent"></div>
                                        </li>
                                        : ""
                                }
                                {
                                    userList.filter((item) => item._id !== undefined).map((item, i) => {
                                        return (

                                            <li key={i}>
                                                <div className="statusNameWraper">
                                                    <label className="cusCheckBox">
                                                        <input type="checkbox"
                                                            name={"notificationId" + item._id}
                                                            value="addTags"
                                                            checked={checkboxes && checkboxes[i] ? checkboxes[i].checked : false}
                                                            onChange={() => handleCheckBoxClick(item._id)}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <div className="thumbImage"><img src={item?.image ? "https://wrapperbucket.s3.amazonaws.com/" + item.image : defaultImage} /></div>
                                                    {item?.firstName} {item?.lastName}
                                                </div>
                                                <div className="statusPhone">
                                                    <a href="tel:(555) 555-1234">{item?.prefix} - {item?.phone}</a>
                                                </div>
                                                <div className="statusEmail">
                                                    <a href="mailto:richard.nile99@gmail.com">{item?.email}</a>
                                                </div>
                                                <div className="statusOpted">
                                                    {item?.sms && "SMS"} {item?.email && '&'}  {item?.email && "Email"}
                                                </div>
                                                <div className="action">
                                                    <div className="info_3dot_icon">
                                                        <button className="btn" onClick={(e) => toggleOption(item._id)}>
                                                            <img src={info_3dot_icon} />
                                                        </button>
                                                    </div>
                                                    {option == item._id &&
                                                        <div className="dropdownOptions status">
                                                            <button className="btn btnEdit" onClick={() => editUser(item)}>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                                </span>
                                                                Edit
                                                            </button>
                                                            <button className="btn btnDelete" onClick={() => deleteUser(item)}>
                                                                <span>
                                                                    <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                                </span>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            </li>

                                        )
                                    })

                                }


                            </ul>
                        ) : ""
                    } */}
                {/* </div> */}

                {/* */}
                {/* {isLoader ? <Loader /> : ''} */}

                {paginationData.totalPages > 0 ?
                    <Pagination
                        type="contact"
                        paginationData={paginationData}
                        dataCount={pageCount}
                        callback={fetchNotificationList} /> : ""
                }
            </div>
            <div className="phasesRightSetUpPanel">
                <NotificationGroupList notificationList={notificationList} addGroup={addGroup} selectGroup={selectGroup} updateGroup={updateGroup} deleteGroup={deleteGroup} firstAddGroup={firstAddGroup} />
            </div>
            {openModal && <UserAddField closeAddCustomModal={(param) => closeCustomModal(param)} groupId={groupId} editUserData={editUserData} successData={successData} filterUserData={userList} bulkUserEdit={bulkUserEdit} bulkUsers={bulkUsers} reloaded={reloaded}             
            returnLoaded={returnLoaded}/>}
        </>
    )
}

export default NotificationUserList;