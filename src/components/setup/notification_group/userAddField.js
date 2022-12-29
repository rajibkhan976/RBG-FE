import React, { useEffect, useState } from "react";
import custom_icon from "../../../../src/assets/images/teamIcon.svg";
import crossTop from "../../../../src/assets/images/cross.svg";
import arrow_forward from "../../../../src/assets/images/arrow_forward.svg";
import Select, { components } from "react-select";
// import SelectSearch from "react-select-search";
import { useRef } from "react";
import { UserServices } from "../../../services/authentication/UserServices";
import Loader from "../../shared/Loader";
import * as actionTypes from "../../../actions/types";
import { useDispatch } from "react-redux";
import defaultImage from "../../../../src/assets/images/owner_img_1.png";
import { NotificationGroupServices } from "../../../services/notification/NotificationGroupServices";
const UserAddField = (props) => {
    const dispatch = useDispatch();
    const [isLoader, setIsLoader] = useState(false);
    props.closeAddCustomModal(false);
    const [groupId, setGroupId] = useState(null);
    const [userList, setUserList] = useState([]);
    const [addSelectedTag, setAddSelectedTag] = useState([]);
    const [userId, setUserId] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editGroupId, setEditGroupId] = useState(0);
    const [sms, setSms] = useState(false);
    const [email, setEmail] = useState(false);
    const [list, setList] = useState([]);
    const [filterUserData, setFilterUserData] = useState([]);
    // const [dataIsThere, setDataIsThere] = useState();
    const [saveAsStatus, setSaveAsStatus] = useState(false);
    const [saveAsOptionFilterData, setSaveAsOptionFilterData] = useState([]);

    // props.reloaded(false);
    // user list api

    const userListFetch = async () => {
        try {
            setIsLoader(true);
            const result = await UserServices.fetchUsers("all", null);
            if (result) {
                console.log('User listing result', result.users);
                console.log("filter User List", props.filterUserData);
                setFilterUserData(props.filterUserData)
                setList(result.users);
                // if (props.filterUserData) {
                //     console.log("group Id", props.groupId);
                //     const filterOption = result.users.filter(function (objOne) {
                //         return !props.filterUserData.some(function (objTwo) {
                //             return objOne._id == objTwo._id;
                //         });
                //     });
                //     // console.log(filterOption);
                //     setUserList(filterOption);
                // } else {
                //     setUserList(result.users);
                // }
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
    useEffect(() => {
        if (!props.editUserData) {
            userListFetch();
        }
    }, []);

    const formatOptionLabel = ({ firstName, lastName, email, image }) => (
        <div className="selectOption" style={{ display: "flex" }}>
            <div className="thumb">
                {/* <p></p> */}
                <img src={image ? "https://wrapperbucket.s3.amazonaws.com/" + image : defaultImage} />
            </div>
            <div>
                <p className="name">{firstName} {lastName}</p>
                <p className="email">{email}</p>
            </div>
        </div>
    );


    useEffect(() => {
        console.log("group Id", props.groupId);
        console.log("Total props", props);
        // setReaload(true);
        // selectFetchData();
        setGroupId(props.groupId);
        // if(!reaload){
        //     alert("if");
        //     setStoreUserData(props);
        //     console.log("storeUserData", storeUserData);
        // }else{
        //     setGroupId(props.groupId);
        // }
        if (props.editUserData) {
            // alert("only edit call");
            setEditGroupId(props.groupId);
        }
    }, null);

    const addHandleChangeFields = (e) => {
        setUserId(e._id);
        if (e._id) {
            setValidator({
                ...validator,
                users: ""
            });
            setAddSelectedTag([{ _id: e._id, firstName: e.firstName, lastName: e.lastName, email: "", image: "" }]);
            console.log("user select data:", addSelectedTag);
        }
        // setObj(obj01);
    }
    const selectFetchData = () => {
        console.log("filter data", filterUserData, "List", list);
        if (saveAsStatus) {
            setUserList(saveAsOptionFilterData);
        } else {
            if (filterUserData) {
                // console.log("group Id", props.groupId);
                console.log("Filter user data", filterUserData);
                const filterOption = list.filter(function (objOne) {
                    return !filterUserData.some(function (objTwo) {
                        return objOne._id == objTwo._id;
                    });
                });
                setUserList(filterOption);
            }
        }
    }

    const NoOptionsMessage = props => {
        return (
            <div>
                <components.NoOptionsMessage {...props}>
                    <div className="noData">
                        <p>Sorry! no user are there in this list</p>
                    </div>
                </components.NoOptionsMessage>
            </div>

        );
    };

    const smsHandeler = (e) => {
        // console.log(e.target.value);
        setSms(e.target.checked);
        if (e.target.checked) {
            setValidator({
                ...validator,
                options: ""
            });
        }
    }
    const emailHandeler = (e) => {
        setEmail(e.target.checked);
        if (e.target.checked) {
            setValidator({
                ...validator,
                options: ""
            });
        }
    }
    const [validator, setValidator] = useState({
        users: '',
        options: '',
        // email: ''
    });

    // submit user
    const handelarUserSubmit = async (e) => {
        e.preventDefault();
        console.log('group id', groupId);
        if (addSelectedTag.length === 0) {
            setValidator({
                ...validator,
                users: "select user name"
            })
        }
        else if (!sms && !email) {
            setValidator({
                ...validator,
                options: "please select one option"
            })
        }
        else {
            if (addSelectedTag.length) {
                let userCreate = {
                    "groupId": groupId,
                    "userId": userId,
                    "sms": sms,
                    "email": email
                }
                console.log('create user data', userCreate);
                try {
                    setIsLoader(true);
                    const result = await NotificationGroupServices.addUserToAGroup(userCreate);
                    if (result) {
                        console.log("add user successfully", result);
                        props.closeAddCustomModal(true);
                        props.successData(result);
                        setSms(false);
                        setEmail(false);
                        setAddSelectedTag([]);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: 'User updated successfully',
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
                    props.closeAddCustomModal(true);
                    setSms(false);
                    setEmail(false);
                    setAddSelectedTag([]);
                }
            }
        }
    }

    // save and new
    const handleUserSubmitNew = async (e) => {
        e.preventDefault();
        console.log("group id: ", groupId);
        if (addSelectedTag.length === 0) {
            setValidator({
                ...validator,
                users: "select user name"
            })
        }
        else if (!sms && !email) {
            setValidator({
                ...validator,
                options: "please select one option"
            })
        }
        else {
            try {
                setIsLoader(true);
                if (addSelectedTag.length) {
                    // let userCreate={}
                    // if(!newGroupId){
                    //     userCreate = {
                    //         "groupId": groupId,
                    //         "userId": userId,
                    //         "sms": sms,
                    //         "email": email
                    //     }
                    // }else{
                    //     userCreate = {
                    //         "groupId": newGroupId,
                    //         "userId": userId,
                    //         "sms": sms,
                    //         "email": email
                    //     }
                    // }
                    let userCreate = {
                        "groupId": groupId,
                        "userId": userId,
                        "sms": sms,
                        "email": email
                    }
                    const result = await NotificationGroupServices.addUserToAGroup(userCreate);
                    if (result) {
                        console.log("save and new user successfully add", result);
                        console.log("recent select data", addSelectedTag[0]);
                        // props.successData(result);
                        // setDataIsThere(addSelectedTag[0]);
                        setSms(false);
                        setEmail(false);
                        setAddSelectedTag([]);
                        // props.saveAsNewSuccessData({status: true, groupId: groupId});
                        setSaveAsStatus(true);


                        console.log(addSelectedTag[0]);
                        console.log(filterUserData);
                        console.log(list);
                        console.log(userList);
                        const indexOfObject = userList.findIndex(object => {
                            return object._id === addSelectedTag[0]._id;
                        });

                        console.log(indexOfObject);
                        userList.splice(indexOfObject, 1);
                        console.log(userList);
                        setSaveAsOptionFilterData(userList);



                        // setNewGroupId(userCreate.groupId);
                        // props.reloaded(true);
                        // console.log(dataIsThere);
                        // setFilterUserData([...filterUserData, dataIsThere]);
                        // console.log(filterUserData);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: 'User updated successfully',
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
                setSms(false);
                setEmail(false);
                setAddSelectedTag([]);
            }

        }
    }
    const closeModal = () => {
        props.closeAddCustomModal(true);
        props.reloaded(true);
    }


    // user edit data
    useEffect(() => {
        console.log("total props data", props);
        if (props.editUserData.hasOwnProperty('firstName')) {
            // alert("group id");
            console.log("email", props.editUserData.email, "sms", props.editUserData.sms, "id", props.editUserData._id, "Group Id", props.groupId);
            setEditUserId(props.editUserData._id);
            setSms(props.editUserData.sms);
            setEmail(props.editUserData.email);
            setEditGroupId(props.groupId);
        }
        console.log("group id", groupId, "User Id", setUserId);
    }, [])

    // edit data submit
    const handleUserEdit = async (e) => {
        e.preventDefault();
        // setaddSelectedTag([]);
        let payload = {
            "userId": editUserId,
            "sms": sms,
            "email": email
        }
        console.log("Edit group id", editGroupId, "user edit data", payload);
        try {
            setIsLoader(true);
            const result = await NotificationGroupServices.editUser(editGroupId, payload);
            if (result) {
                setIsLoader(false);
                props.successData(result);
                props.closeAddCustomModal(true);
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: 'User updated successfully',
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
            props.closeAddCustomModal(true);
        }
    }

    useEffect(() => {
        // console.log(props.bulkUserEdit);
        // console.log(props.bulkUsers);
    }, []);
    const allEditUserHandler = async () => {
        // console.log(props.bulkUsers);
        const allUserId = [];
        props.bulkUsers.forEach((item) => {
            console.log(item.id);
            allUserId.push(item.id);
        });

        if (props.bulkUsers.length) {
            const payload = {
                "userIds": allUserId.toString(),
                "sms": sms,
                "email": email
            }
            console.log("Group id", "Payload", groupId, payload);
            try {
                setIsLoader(true);
                const result = NotificationGroupServices.bulkUserEdit(groupId, payload);
                if (result) {
                    setIsLoader(false);
                    props.closeAddCustomModal(true);
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: 'Notification Group updated successfully.',
                        typeMessage: 'success'
                    });
                }
            }
            catch (e) {
                dispatch({
                    type: actionTypes.SHOW_MESSAGE,
                    message: e.message,
                    typeMessage: 'error'
                })
            } finally {
                setIsLoader(false);
                props.closeAddCustomModal(true);
            }
        }
    }

    return (
        <>
            <div className="userPageLoader">
                {isLoader ? <Loader /> : ''}
            </div>
            <div className={props.editUserData ? "modalBackdrop userAddModal editUserModel" : "modalBackdrop userAddModal"}>
                <div className={props.bulkUserEdit ? "slickModalBody editSlick" : "slickModalBody"} >
                    <div className="slickModalHeader">
                        <button className="topCross" onClick={closeModal}><img src={crossTop} alt="" />
                        </button>
                        <div className="circleForIcon"><img src={custom_icon} alt="" /></div>
                        <h3>{!editUserId && !props.bulkUserEdit ? "Add a Users" : "Edit users"}</h3>
                        <p>{!editUserId && !props.bulkUserEdit ? "Please select an user to add in the group." : "Please edit the option to send notification."}</p>
                    </div>
                    <div className="modalForm userAddModalForm">

                        <form>
                            {!editUserId && !props.bulkUserEdit && (
                                <div className="formControl">
                                    <label>Select a User</label>
                                    <Select
                                        // value={addSelectedTag.map((e)=>{
                                        //     console.log(e.name);
                                        //     return e
                                        // })}
                                        value={addSelectedTag}
                                        // menuIsOpen={true}
                                        // defaultValue={options[0]}
                                        onChange={(e) => addHandleChangeFields(e)}
                                        className="customSelect"
                                        formatOptionLabel={formatOptionLabel}
                                        options={userList}
                                        placeholder="Eg. Name"
                                        isSearchable={true}
                                        isClearable={true}
                                        onFocus={selectFetchData}
                                        components={{ NoOptionsMessage }}
                                        search
                                    />
                                    {validator.users ? <div className="error">{validator.users}</div> : ""}
                                </div>
                            )

                            }
                            <div className="formControl">
                                <label>Notification Opted for</label>
                                <div className="notiOption">
                                    <ul className="d-flex">
                                        <li><label className="cusCheckBox">
                                            <input type="checkbox" value={sms} checked={sms ? sms : false} onChange={smsHandeler} /><span className="checkmark"></span> SMS </label></li>
                                        <li><label className="cusCheckBox"><input type="checkbox" value={email} checked={email ? email : false} onChange={emailHandeler} /><span className="checkmark"></span> Email </label></li>
                                    </ul>
                                    {validator.options ? <div className="error">{validator.options}</div> : ""}
                                </div>
                            </div>
                            <div className="modalbtnHolder">
                                {!editUserId && !props.bulkUserEdit && <>
                                    <button type="submit" onClick={handelarUserSubmit}
                                        className="saveNnewBtn">
                                        <span>Save</span><img src={arrow_forward} alt="" /></button>
                                    <button type="reset" onClick={handleUserSubmitNew}
                                        className="saveNnewBtn">
                                        <span>Save &amp; New</span><img src={arrow_forward} alt="" /></button></>
                                }

                                {
                                    props.bulkUserEdit && !editUserId &&
                                    <button type="reset" onClick={allEditUserHandler}
                                        className="saveNnewBtn">
                                        <span>Save</span><img src={arrow_forward} alt="" /></button>
                                }
                                {editUserId && !props.bulkUserEdit && <button type="reset" onClick={handleUserEdit}
                                    className="saveNnewBtn"><span>Save </span><img src={arrow_forward} alt="" /></button>}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserAddField