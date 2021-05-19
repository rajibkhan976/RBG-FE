import React from 'react';
import {useState} from 'react';

import DashboardPagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import owner_img_1 from "../../../assets/images/owner_img_1.png";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";

const UsersListing = (props) => {
    const [dropdownPos, setDropdownPos] = useState('bottom');
    const [usersData, setUsersData] = useState([
        {
            keyId: "user-1",
            userName: "Richard Nile",
            phoneNumber: "(555) 555-1234",
            emailId: "richard.nile99@gmail.com",
            role: "Gym Owner",
            assignedGroup: "Gym Staff",
            activeStatus: "Active",
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
        {
            keyId: "user-2",
            userName: "John Nile",
            phoneNumber: "(555) 555-1234",
            emailId: "nile.nile99@gmail.com",
            role: "Gym Owner",
            assignedGroup: "Gym Staff",
            activeStatus: "Active",
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
        {
            keyId: "user-3",
            userName: "Susc Nile",
            phoneNumber: "(555) 555-1234",
            emailId: "sucs.nile99@gmail.com",
            role: "Gym Owner",
            assignedGroup: "Gym Staff",
            activeStatus: "Active",
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
    ]);
    const toggleCreateHeader = () => {
        props.toggleCreate("user");
    };

    const filterUsers = () => {
        props.toggleFilter("user");
    };

    const editThisUser = (e, el) => {
        let yPosition = el.clientY;
        let avHeight = window.innerHeight - (70 + 70 + 54 + 57)
        if ((yPosition + 70) > avHeight) {
            setDropdownPos("top")
        }
        else {
            setDropdownPos("bottom")
        }

        const data = usersData.filter((i) => i.keyId === e);
        console.log("E? : ", data, "EL:::");
        data[0].isEditing = !data[0].isEditing;
        console.log("data  :: ", data[0].isEditing);
        const newData = usersData.map((el, i) => {
            if (el.keyId === e) {
                return data[0];
            } else return el;
        });
        console.log("newData : ", newData);
        setUsersData(newData);
    };
    return (
        <div className="dashInnerUI">
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Users & Controls</li>
                        <li>Users</li>
                    </ul>
                    <h2 className="inDashboardHeader">User List (48)</h2>
                    <p className="userListAbout">
                        Create & manage multiple sub-users with different access
          </p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar">
                        <input type="search" name="" id="" placeholder="Search users" />
                        <button className="searchIcon">
                            <img src={search_icon} alt="" />
                        </button>
                    </div>
                    <button className="btn btn-filter" onClick={filterUsers}>
                        <p>Filter</p>
                        <img className="filterIcon" src={filter_icon} alt="" />
                    </button>
                    <button className="creatUserBtn" onClick={toggleCreateHeader}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create an user</span>
                    </button>
                </div>
            </div>
            <div className="userListBody">
                <div className="listBody">
                    <ul className="tableListing">
                        <li className="listHeading">
                            <div className="userName">User Name</div>
                            <div className="phoneNum">Phone No</div>
                            <div className="emailID">Email Id</div>
                            <div className="role">Role</div>
                            <div className="assignedGroup">Assigned Group</div>
                            <div className="status">Status</div>
                            <div className="createDate">Created on</div>
                        </li>
                        {usersData.length &&
                            usersData.map((elem, i) => {
                                return (
                                    <>
                                        <li className="owerInfo">
                                            <div className="userName">
                                                <button className="btn">
                                                    <img src={owner_img_1} alt="" />
                                                    <p>{elem.userName}</p>
                                                </button>
                                            </div>
                                            <div className="phoneNum">
                                                <button className="btn">{elem.phoneNumber}</button>
                                            </div>
                                            <div className="emailID">
                                                <button className="btn">{elem.emailId}</button>
                                            </div>
                                            <div className="role">
                                                <button className="btn">{elem.role}</button>
                                            </div>
                                            <div className="assignedGroup">
                                                <button className="btn">{elem.assignedGroup}</button>
                                            </div>
                                            <div className="status">
                                                <button className="btn">{elem.activeStatus}</button>
                                            </div>
                                            <div className="createDate">
                                                <button className="btn">{elem.createdOn}</button>
                                                <div className="info_3dot_icon">
                                                    <button
                                                        className="btn"
                                                        onClick={(el) => editThisUser(elem.keyId, el)}
                                                    >
                                                        <img src={info_3dot_icon} alt="" />
                                                    </button>
                                                </div>
                                                {elem.isEditing && <TableOptionsDropdown dropdownPos={dropdownPos} dropdownType="usersDropdown" />}
                                            </div>
                                        </li>
                                    </>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <DashboardPagination />
        </div>
    )
}

export default UsersListing;
