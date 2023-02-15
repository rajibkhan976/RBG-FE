import React, { useEffect, useState, useRef } from "react";
import NotificationGroupList from "./notificationGroupList";
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
    const dropDownRef = useRef(null);
    const dispatch = useDispatch();
    const [isConfirmed, setConfirmed] = useState({
        show: false,
        id: null,
    });
    const [bulkUserDeleteConfirmed, setBulkUserDeleteConfirmed] = useState({
        show: false,
    });

    const [openUserModal, setOpenUserModal] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [checkboxes, setCheckboxes] = useState([]);
    const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
    const [selectSingle, setSelectSingle] = useState(false);
    const [notificationGroupList, setNotificationGroupList] = useState([]);
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
    const [bulkUserEditStatus, setBulkUserEditStatus] = useState(false);
    const [saveAsNewStatus, setSaveAsNewStatus] = useState(false);
    const [saveAsNewGrouPId, setSaveAsNewGrouId] = useState("");
    const [allCheck, setAllCheck] = useState(false);
    // const [returnLoaded, setReturnLoaded] = useState(false);

    // open modal
    const openAddStatusFieldHandler = (e) => {
        setOpenUserModal(true);
        SetEditUserData('');
    }
    // close modal
    const closeUserModal = (e) => {
        // console.log(e);
        if (e === true) {
            setOpenUserModal(false);
        } else {
            setOpenUserModal(true);
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
    // const getQueryParams = async () => {
    //     const search = utils.getQueryVariable('search');
    //     const group = utils.getQueryVariable('group');
    //     const status = utils.getQueryVariable('status');
    //     const srtBy = utils.getQueryVariable('sortBy');
    //     const srtType = utils.getQueryVariable('sortType');
    //     const cache = utils.getQueryVariable('cache');
    //     const importId = utils.getQueryVariable('import');
    //     const phase = utils.getQueryVariable('phase');
    //     const source = utils.getQueryVariable('source');
    //     const by = utils.getQueryVariable('createdBy');
    //     const fromDate = utils.getQueryVariable('fromDate');
    //     const toDate = utils.getQueryVariable('toDate');

    //     const queryParams = new URLSearchParams();
    //     if (cache) {
    //         queryParams.append("cache", cache);
    //     }
    //     if (search) {
    //         let searchDecoded = decodeURIComponent(search).replace(/\+/g, " ");
    //         queryParams.append("search", searchDecoded);
    //     }
    //     if (group) {
    //         queryParams.append("group", group);
    //     }
    //     if (fromDate) {
    //         queryParams.append('fromDate', fromDate);
    //     }
    //     if (toDate) {
    //         queryParams.append('toDate', toDate);
    //     }
    //     if (status) {
    //         queryParams.append("status", status);
    //     }
    //     if (srtBy) {
    //         queryParams.append("sortBy", srtBy);
    //     }
    //     if (srtType) {
    //         queryParams.append("sortType", srtType);
    //     }
    //     if (importId) {
    //         queryParams.append("import", importId);
    //     }
    //     if (phase) {
    //         queryParams.append("phase", phase);
    //     }
    //     if (source) {
    //         queryParams.append("source", decodeURIComponent(source).replaceAll("+", " "));
    //     }
    //     if (by) {
    //         queryParams.append("createdBy", by);
    //     }
    //     return queryParams;
    // }

    // pagination end

    // API call in notification list


    const fetchNotificationList = async () => {
        setIsLoader(true);
        setSelectSingle(false);
        setSelectAllCheckbox(false);
        // const pageId = utils.getQueryVariable('page');
        // const queryParams = await getQueryParams();
        try {

            // if (result) {
            //     console.log(result);
            //     setNotificationGroupList(result.data);



            //     if (result?.data[0].users && result?.data[0].users.length && !saveAsNewStatus) {
            //         setUserList(result.data[0].users);
            //         console.log(userList.length);

            //     }

            //     // setPaginationData({
            //     //     ...paginationData,
            //     //     currentPage: result.paginationData.currentPage,
            //     //     totalPages: result.paginationData.totalPages
            //     // });
            // }

        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
        let result = await NotificationGroupServices.fetchNotificationGroupList();
        console.log(result.data);
        setNotificationGroupList(result.data);
        if (result.data[0] !== undefined) {
            setUserList(result.data[0].users);
        }
        setIsLoader(false);
    }
    // APi call end
    // change notification grop tab

    const changeGroup = async (groupId) => {
        setChangeGroupType(true);
        setSelectAllCheckbox(false);
        setSelectSingle(false);
        setOption(false);
        setHeaderOption(false);
        setUserList([]);
        setIsLoader(true);

        // console.log(filterData[0].users);
        setGroupId(groupId);
        console.log(groupId);
        if (groupId !== '') {
            let selectedNotificationFilter = notificationGroupList.filter(elem => {
                console.log(elem);
                return elem._id === groupId
            });
            let searchNotificationGroup = notificationGroupList.filter((item) => {
                setIsLoader(false);
                return item._id == groupId;
            });
            console.log(searchNotificationGroup);
            searchNotificationGroup[0].users.filter((item) => {
                console.log(item);
                if (item._id !== undefined) {
                    setUserList(selectedNotificationFilter[0].users);
                }
                else {
                    selectedNotificationFilter[0].users = [];
                    console.log(selectedNotificationFilter);
                    // setIsLoader(false);
                }
            })
            // setNotificationGroupList(selectedNotificationFilter[0]);

        }
    }


    // check in notification
    const handleCheckBoxClick = (id) => {
        console.log(id);
        // setUserList(notificationGroupList[0].users);
        setSelectAllCheckbox(false);
        let cb = checkboxes.map(ele => {
            console.log(ele, id)
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
        setBulkUsers(cbChecked);
        if(cbChecked.length === 0){
            setAllCheck(true);
        }else{
            setAllCheck(false);
        }
        // checkboxes.find((ele) => {
        //     if(ele.checked === false){
        //         // alert("all false");
        //         setAllCheck(true);
        //         // setSelectSingle(false);
        //         // setSelectAllCheckbox(false);
        //     }else{
        //         setAllCheck(false);
        //     }
        // })
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
        setBulkUserEditStatus(false);
        if (!changeGroupType) {
            setGroupId(notificationGroupList[0]?._id);
        }
        if (item._id) {
            setOpenUserModal(true);
            SetEditUserData(item, groupId);
            console.log(item, groupId);
        } else {
            setOpenUserModal(false);
        }
    }

    useEffect(() => {
        if (notificationGroupList.length) {
            setGroupId(notificationGroupList[0]?._id);
        }
    }, [notificationGroupList])

    // add user under this group
    const openAddUserHandler = () => {
        // setSelectAllCheckbox(false);
        SetEditUserData("");
        setBulkUserEditStatus("");
        setOpenUserModal(true);
        if (!changeGroupType) {
            setGroupId(notificationGroupList[0]?._id);
            // setBulkUsers("");
        }
    }
    // user list is deleted
    const deleteUser = async (item, isConfirmed = null) => {
        setNotificationId(item._id);
        if (!changeGroupType) {
            setGroupId(notificationGroupList[0]?._id);
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
                setIsLoader(true);
                setOption(true);
                let payload = { userId: item }
                console.log(payload, item);
                const result = await NotificationGroupServices.deleteUser(groupId, payload);
                setIsLoader(false);
                if (result) {
                    console.log(result);
                    console.log("notification list", notificationGroupList);
                    let localNotificationList = notificationGroupList
                    let searchResultNotification = notificationGroupList.find(ele => ele._id === groupId);
                    let indexGroup = notificationGroupList.indexOf(searchResultNotification);
                    let searchNotificationUsers = searchResultNotification.users.find((ele) => {
                        return ele._id == item
                    });
                    // console.log(searchNotificationUsers);
                    let indexUser = searchResultNotification.users.indexOf(searchNotificationUsers);
                    // console.log(indexUser);
                    searchResultNotification.users.splice(indexUser, 1);
                    let updateNotificationList = localNotificationList[indexGroup] = searchResultNotification;
                    setNotificationGroupList(notificationGroupList);
                    console.log("after delete notificationlist", updateNotificationList, "user delete", searchResultNotification);
                    setUserList(updateNotificationList.users);
                    setIsLoader(false);
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
                setIsLoader(false);
                // fetchNotificationList();
            }
        }
    }
    useEffect(() => {
        let checkBoxes = [];
        console.log(userList);
        if (userList?.length) {

            userList.map((item) => {
                checkBoxes.push({
                    'id': item._id,
                    'checked': false
                })
            })
            setCheckboxes(checkBoxes);
        }
    }, [userList]);

    const [firstAddGroup, setFirstAddGroup] = useState(false);
    const addGroupHandler = () => {
        setFirstAddGroup(true);
    }


    // add and update group
    const updateGroup = (createGroup, id, name) => {
        console.log("Create group", createGroup, id, name);
        if (id) {
            // alert("group edit");
            let element = notificationGroupList.map((ele) => {
                if (ele._id === id) {
                    ele.name = name;
                    return { ...ele };
                } else {
                    return { ...ele };
                }
            })
            console.log(element);
            setNotificationGroupList(element);
            // setUserList(element[0].users);
        } else {
            // alert("group add");
            setNotificationGroupList([{ _id: createGroup.data, name: name }, ...notificationGroupList]);
            console.log(notificationGroupList);
            setUserList(notificationGroupList.users); // i will check in leter in this code
        }
    }
    // delete group
    const deleteGroup = (deleteElement) => {
        console.log(deleteElement);
        if (deleteElement) {
            let element = notificationGroupList.filter((ele) => ele._id !== deleteElement);
            console.log(element);
            setNotificationGroupList(element);
            if (element[0] !== undefined) {
                setUserList(element[0].users);
            }
        }
    }

    // add user status
    const addUserStatus = (userList, payload) => {
        console.log("user list", userList, "<br>", "Payload", "<br>",  payload, "All list", notificationGroupList);
        let localNotificationList = notificationGroupList;
        let findNotificationGroup = notificationGroupList.find(ele => ele._id === groupId);
        let indexGroup = notificationGroupList.indexOf(findNotificationGroup);
        console.log("find Group", findNotificationGroup, "group index", indexGroup);
        if (findNotificationGroup.users === undefined) {
            // alert("addrrrrrrrrrrrrrr");
            userList.email = payload.email;
            userList.sms = payload.sms;
            findNotificationGroup.users = [];
            findNotificationGroup.users[0] = userList;
        }
        else {
            // alert("addeeddddddddd");
            checkboxes.push({
                'id': userList._id,
                'checked': false
            })
            setCheckboxes(checkboxes);
            // not needed this line of code
            let searchResultUsers = findNotificationGroup.users.find((ele) => {
                return ele._id === userList._id
            });
            let indexUser = findNotificationGroup.users.indexOf(searchResultUsers);
            console.log("Find User", searchResultUsers, "Index user", indexUser);
            // not needed this line of code

            findNotificationGroup.users.filter(value => Object.keys(value).length !== 0);
            console.log(findNotificationGroup.users);
            console.log("New element:::::::::::::::::::::: ", userList);
            userList.email = payload.email;
            userList.sms = payload.sms;
            console.log("user list", userList);
            findNotificationGroup.users.push(userList);
            // not needed this line of code
            findNotificationGroup.users[indexUser] = searchResultUsers;
            // not needed this line of code
            console.log("serach notification list", findNotificationGroup.users);
        }
        let updateNotification = localNotificationList[indexGroup] = findNotificationGroup;
        // findNotificationGroup.users.filter((value) => {
        //     if (Object.keys(value).length === 0) {
        setNotificationGroupList(notificationGroupList);
        //     }
        // })
        // if(Object.keys(findNotificationGroup.users[0]).length !== 0){

        setUserList(updateNotification.users);
        // }
        if (userList) {
            console.log(userList);
            let selectedNotificationFilter = localNotificationList.filter(elem => elem._id === groupId);
            setUserList(selectedNotificationFilter[0].users);
        }
        console.log(notificationGroupList);
    }
    // update user status
    const editUserStatus = (payload) => {
        console.log(payload);
        let localNotificationList = notificationGroupList;
        let searchNotificationGroup = notificationGroupList.find((ele) => ele._id === groupId);
        let indexGroup = notificationGroupList.indexOf(searchNotificationGroup);
        let searchNotificationUserList = searchNotificationGroup.users.find((ele) => ele._id === payload.userId);
        let indexUser = searchNotificationGroup.users.indexOf(searchNotificationUserList);
        searchNotificationUserList.email = payload.email;
        searchNotificationUserList.sms = payload.sms;
        console.log("indexUser: ", indexUser);
        searchNotificationGroup.users[indexUser] = searchNotificationUserList;
        let updateNotification = localNotificationList[indexGroup] = searchNotificationGroup;
        setUserList(updateNotification.users);
    }



    // send data in bulk user in edit section
    const editBulkUser = async () => {
        setHeaderOption(false);
        console.log(bulkUsers);
        if (bulkUsers.length) {
            setOpenUserModal(true);
            setBulkUserEditStatus(true);
            // SetEditUserData("");
        }

    }
    // get data in edit bulk user 
    const bulkUserEdit = (groupId, payload) => {
        console.log(payload.email, payload.sms);
        let splitId = payload.userIds.split(',');
        console.log(splitId);
        let searchNotificationGroup = notificationGroupList.find((ele) => ele._id === groupId);
        let searchUserData = searchNotificationGroup.users.forEach((item) => {

            return splitId.some((ele) => {
                if (item._id === ele && (item.email || item.sms)) {
                    item.email = payload.email;
                    item.sms = payload.sms;
                }
            })
        });
        setSelectAllCheckbox(false);
        setSelectSingle(false);
        setCheckboxes([]);
        console.log(searchUserData);
    }

    // delete by bulk user
    const deleteBulkUser = async (isConfirmed = null) => {
        setHeaderOption(false);
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
            setBulkUserDeleteConfirmed({
                show: false,
            });
        } else {
            setBulkUserDeleteConfirmed({
                show: false,
            });
            if (allUserId.length && groupId) {
                try {
                    setIsLoader(true);
                    const result = await NotificationGroupServices.bulkUserDelete(groupId, payload);
                    if (result) {
                        console.log(result);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: 'Notification Group updated successfully.',
                            typeMessage: 'success'
                        });
                        // fetchNotificationList();
                        console.log(bulkUsers);
                        console.log(notificationGroupList);
                        let localNotificationList = notificationGroupList;
                        let searchResultNotification = notificationGroupList.find(ele => ele._id === groupId);
                        console.log(searchResultNotification);
                        let groupIndex = notificationGroupList.indexOf(searchResultNotification);
                        console.log(groupIndex);
                        let filterData = searchResultNotification.users.filter((userItem) => {
                            return !bulkUsers.some((item) => {
                                return userItem._id == item.id;
                            })
                        });
                        console.log(filterData);
                        notificationGroupList[groupIndex].users = filterData;
                        setUserList(filterData);
                        setSelectAllCheckbox(false);
                        setSelectSingle(false);
                        setIsLoader(false);
                    }
                } catch (e) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: e.message,
                        typeMessage: 'error'
                    })
                    setIsLoader(false);
                } finally {
                    setIsLoader(false);
                }
            }
        }
    }


    useEffect(() => {
        console.log("notification list call");
        fetchNotificationList();
    }, []);
    // drop down close when even tou will clicking the outside
    const escFunction = (event) => {
        if (event.key === "Escape" || event.keyCode === 27) {
            // console.log(event);
            setOption(false);
            setHeaderOption(false);
        }
    }
    const dropdownOutsideClick = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            // console.log(event);
            setOption(false);
            setHeaderOption(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("keydown", escFunction, false);
       document.addEventListener("mousedown", dropdownOutsideClick);
       return () => {
       document.removeEventListener("keydown", escFunction, false);
         document.removeEventListener("mousedown", dropdownOutsideClick);
       };
     }, [])

    return (
        <>
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
                        deleteBulkUser(confirmedMsg)
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

                    {notificationGroupList.length === 0 ?
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
                    notificationGroupList && notificationGroupList.length && userList && userList.filter(ele => ele._id !== undefined).length > 0 ?
                        (
                            <>
                                <div className="userListBody">

                                    <ul className="customtableListing notificationGroupList" >
                                        <li className="listHeading">
                                            <div className="statusNameField">
                                                <div className={allCheck ? "headerCheckBox allCheckess": "headerCheckBox"}>
                                                {/* <div className={allCheck ? "headerCheckBox allCheckess": ""}> */}
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
                                                        <div className="dropdownOptions status" ref={dropDownRef}>
                                                            <button className="btn btnEdit" onClick={() => editBulkUser()}>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                                </span>
                                                                Edit
                                                            </button>
                                                            <button className="btn btnDelete" onClick={() => deleteBulkUser()}>
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
                                                                <div className="dropdownOptions status" ref={dropDownRef}>
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
                                        notificationGroupList.length === 0 ?
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




                {paginationData.totalPages > 0 ?
                    <Pagination
                        type="contact"
                        paginationData={paginationData}
                        dataCount={pageCount}
                        callback={fetchNotificationList} /> : ""
                }
            </div>
            <div className="phasesRightSetUpPanel">
                <NotificationGroupList 
                    notificationGroupList={notificationGroupList} 
                    changeGroup={changeGroup} 
                    updateGroup={updateGroup} 
                    deleteGroup={deleteGroup} 
                    firstAddGroup={firstAddGroup} 
                />
            </div>
            {openUserModal && 
            <UserAddField 
                closeAddUserModal={(param) => closeUserModal(param)} 
                groupId={groupId} 
                editUserData={editUserData} 
                editUserStatus={editUserStatus} 
                addUserStatus={(elem, payload) => addUserStatus (elem, payload)} 
                filterUserData={userList} 
                bulkUserEditStatus={bulkUserEditStatus} 
                bulkUsers={bulkUsers} 
                bulkUserEdit={bulkUserEdit} 
            />}
        </>
    )
}

export default NotificationUserList;