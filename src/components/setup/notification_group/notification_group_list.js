import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { PhasesServices } from "../../../services/contact/phasesServices";
import * as actionTypes from "../../../actions/types";
import cross from "../../../assets/images/cross.svg";
import arrowRightWhite from "../../../../src/assets/images/arrowRightWhite.svg";
import info_3dot_white from "../../../../src/assets/images/info_3dot_white.svg";
// import { NotificationServices } from "../../../services/notification/NotificationServices";
import { NotificationGroupServices } from '../../../services/notification/NotificationGroupServices';
import Loader from "../../shared/Loader";
import ConfirmBox from "../../shared/confirmBox/index";


const NotificationGroupList = (props) => {
    const ref = useRef(null);
    const [isConfirmed, setConfirmed] = useState({
        show: false,
        id: null,
    });
    const dispatch = useDispatch();
    const [validator, setValidator] = useState({
        groupName: ''
    });
    const [notificationGroupId, setNotificationGroupId] = useState(0);
    const [isLoader, setIsLoader] = useState(false);
    const [editPhasesError, setEditPhasesError] = useState(false)
    const [notificationGroup, setNotificationGroup] = useState("");
    const [selectGroup, setSelectGroup] = useState();
    const [option, setOption] = useState(false);
    const [editGroupId, setEditGroupId] = useState(0);
    const [groupList, setGroupList] = useState(props.notificationList ? props.notificationList : []);
    const [errorShow, setErrowShow] = useState(false);


    const handelNotificationGroupCreate = (event) => {
        // props.firstAddGroup = false;
        console.log(event);
        setErrowShow(false);
        if(event.target.value.length > 20){
            setValidator({
                groupName: "Group name Maximum 20 letter"
            })
            
        }else{
            setNotificationGroup(event.target.value);
            setValidator("");
            
        }
        // props.firstAddGroup = false;
    }
    // api call for notification group
    const addNotificationGroup = async (event) => {
        event.preventDefault();
        setOption(false);
        if (notificationGroup == "") {
            setIsLoader(false);
            setValidator({
                groupName: "Group name should not be empty"
            })

        } else {
            try {
                setIsLoader(true);
                setErrowShow(false);
                if (notificationGroup.trim() !== "") {
                    let payload = {
                        name: notificationGroup.trim(),
                    }
                    let result = await NotificationGroupServices.addNotificationGroup(payload);
                    if (result) {
                        setIsLoader(false);
                        console.log(result);
                        props.addGroup(result);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: 'Notification group add successfully.',
                            typeMessage: 'success'
                        });
                    }
                } else {
                    setEditPhasesError(true)
                }
                setNotificationGroup("");
                setNotificationGroupId(0);
            } catch (e) {
                setIsLoader(false);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            } finally {
                setIsLoader(false);
            }
        }
    }

    const removeEdit = () => {
        setNotificationGroupId(0);
        setNotificationGroup("");
    }


    const groupSelectHandeler = (groupId) => {
        // console.log(groupId);
        setSelectGroup(groupId);
        // setSelectedPhaseId(elem._id);
        if (groupId) {
            props.selectGroup(groupId);
        }
    }
    // show option edit and delete

    const toggleOptions = (index) => {
        setOption(index !== option ? index : null);
    };

    // edit notification group

    const editGroup = (item) => {
        setOption(false);
        setNotificationGroup("");
        if (item.name) {
            setNotificationGroup(item.name);
        }
        setEditGroupId(item._id);
    }
    const editGroupHandeler = async () => {
        try {
            if (notificationGroup.trim() !== "") {
                setIsLoader(true);
                let payload = {
                    name: notificationGroup.trim()
                }
                let result = await NotificationGroupServices.editGroup(editGroupId, payload);
                if (result) {
                    props.updateGroup(result);
                    setEditGroupId(false);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Notification Group updated successfully.',
                        typeMessage: 'success'
                    });
                    setIsLoader(false);
                    setNotificationGroup("");
                }
            }
        } catch (e) {
            setIsLoader(false);
            console.log(e);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } finally {
            setIsLoader(false);
        }
    }
    // delete notification
    const deleteGroup = async (item, isConfirmed = null) => {
        console.log(item);
        setOption(false);
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
        } else {
            setConfirmed({
                show: false,
                id: null,
            });
            try {
                setIsLoader(true);
                if (item) {
                    const result = await NotificationGroupServices.deleteGroup(item);
                    if (result) {
                        setIsLoader(false);
                        // console.log(result);
                        props.deleteGroup(result);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: 'Notification group delete successfully.',
                            typeMessage: 'success'
                        });
                    }
                }

            } catch (e) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                });
            } finally {
                setIsLoader(false);
            }
        }
    }

    // group list api call
  
    useEffect(() => {
        console.log(props.notificationList);
        setGroupList(props.notificationList);
        if(props.notificationList.length){
            setSelectGroup(props.notificationList[0]._id);
        }
    }, [props.notificationList]);


    // outside click every modal is closed
    useEffect(() => {
        function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // console.log(ref.current.contains(event.target));
                // setOption(true);
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);


    useEffect(()=>{
        if(props.firstAddGroup && !notificationGroup){
            // console.log("true");
            setErrowShow(true)
        }
        // else if(notificationGroup){
        //     console.log("false");
        // }
    })

    return (
        <>
            {isLoader ? <Loader /> : ''}
            {isConfirmed.show ? (
                <ConfirmBox
                    callback={(confirmedMsg) =>
                        deleteGroup(isConfirmed.id, confirmedMsg)
                    }
                />
            ) : (
                ""
            )}
            <div className="innerScroll">
                <h3 className="productListingHeader">Notification Group</h3>
                <div className={groupList.length === 0 && errorShow ? "productSearchPanel error": "productSearchPanel"} >
                    {/* <form> */}
                    {notificationGroupId ? <button className="deleteIt" onClick={removeEdit}><img src={cross} alt="" /></button> : ''}
                    <input type="text" name="name" placeholder="Create Group" value={notificationGroup}
                        onChange={handelNotificationGroupCreate} className={editPhasesError ? "errorInput addPhases" : "addPhases"} />
                    {
                        !editGroupId ? <button className="btn" type="submit" onClick={addNotificationGroup}>
                            {/* {notificationGroupId ? 'Update' : 'Add'}  */}
                            Add Group
                            <img src={arrowRightWhite} alt="" />
                        </button> : <button className="btn" type="submit" onClick={editGroupHandeler}>Update Group <img src={arrowRightWhite} alt="" /></button>
                    }
                    {
                        validator && <p className="error">{validator.groupName}</p>
                    }
                    {/* </form> */}
                </div>

                <ul className="ProCategoryListing">
                    {
                        groupList && groupList.map((item, index) => {
                            return (
                                <li key={item._id} className={selectGroup === 0 ? (index === 0 ? "'active" : "showNo") : (selectGroup === item._id ? "active" : "") }>
                                    <button className="bigListName" onClick={() => groupSelectHandeler(item._id)}>
                                        {item?.name} {item.users && item.users.filter(ele => ele._id !== undefined).length ? "(" + item.users.length + ")" : "(0)"}
                                    </button>
                                    <button className="showList" onClick={() => toggleOptions(index)}>
                                        <img src={info_3dot_white} alt="" />
                                    </button>
                                    <div className="dropdownOptions listOpen" ref={ref}>
                                        {option === index && (
                                            <>
                                                <button className="btn btnEdit" onClick={() => editGroup(item)}>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                                    </span>
                                                    Edit
                                                </button>
                                                <button className="btn btnDelete" onClick={() => deleteGroup(item)}>
                                                    <span>
                                                        <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                                    </span>
                                                    Delete
                                                </button>

                                            </>
                                        )
                                        }
                                    </div>
                                </li>
                            )

                        })

                    }
                    {/* {phases.map((elem, key) => {
                            return (
                                <li key={elem._id} className={selectedPhaseId === 0 ? (key === 0 ? 'active' : '') :
                                    (selectedPhaseId === elem._id ? 'active' : '')}><button className="bigListName" onClick={() => showNo(elem)}> {elem.name} {elem.statuses && elem.statuses.filter(ele => ele._id !== undefined).length ? "(" +elem.statuses.length+")" : "(0)" } </button>
                                    <button className="showList" onClick={() => toggleOptions(key)}>
                                        <img src={info_3dot_white} alt="" />
                                    </button>
                                    <div className={
                                        option === key
                                            ? "dropdownOptions listOpen"
                                            : "listHide"
                                    }>
                                        <button className="btn btnEdit" onClick={() => editPhase(elem)}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" className="editIcon"><g transform="translate(0.75 0.75)"><path className="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path className="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                    </span>
                                            Edit
                                        </button>
                                        <button className="btn btnDelete" onClick={() => deletePhase(elem)}>
                                    <span>
                                        <svg className="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path className="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path className="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line className="a" y2="3" transform="translate(4.397 6.113)"></line><line className="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                    </span>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            )}
                        )} */}

                </ul>
            </div>
        </>
    )
}
export default NotificationGroupList;