import React from 'react';
import { useEffect, useState } from "react";
import DashboardPagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";

const GroupListing = (props) => {
    const [dropdownPos, setDropdownPos] = useState('bottom');
    const [groupsData, setGroupsData] = useState([
        {
            keyId: "grp-1",
            groupName: "Gym Manager",
            numberOfAssigned: 2,
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
        {
            keyId: "grp-2",
            groupName: "Gym Staff",
            numberOfAssigned: 23,
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
        {
            keyId: "grp-3",
            groupName: "Senior Gym Staff",
            numberOfAssigned: 2,
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
        {
            keyId: "grp-4",
            groupName: "Marketing Head",
            numberOfAssigned: 2,
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
        {
            keyId: "grp-5",
            groupName: "Sales Staff - in bound",
            numberOfAssigned: 2,
            createdOn: "2nd Feb 2021",
            isEditing: false,
        },
    ]);

    const toggleCreateHeader = () => {
        props.toggleCreate("groups");
    };

    const filterGroups = () => {
        props.toggleFilter("groups");
    };

    const editThisGroup = (e, el) => {
        let yPosition = el.clientY;
        let avHeight = window.innerHeight - (70 + 70 + 54 + 57)
        if ((yPosition + 70) > avHeight) {
            setDropdownPos("top")
        }
        else {
            setDropdownPos("bottom")
        }

        const data = groupsData.filter((i) => i.keyId === e);
        console.log("E? : ", data);
        data[0].isEditing = !data[0].isEditing;
        console.log("data  :: ", data[0].isEditing);
        const newData = groupsData.map((el, i) => {
            if (el.keyId === e) {
                return data[0];
            } else return el;
        });
        console.log("newData : ", newData);
        setGroupsData(newData);
    };

    useEffect(() => {
        console.log("groupsData after setGroupsData :", groupsData);
    }, [groupsData]);
    return (
        <div className="dashInnerUI">
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Users & Controls</li>
                        <li>Groups</li>
                    </ul>
                    <h2 className="inDashboardHeader">User Groups (0)</h2>
                    <p className="userListAbout">
                        Create & manage groups for your business
          </p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar">
                        <input type="search" name="" id="" placeholder="Search users" />
                        <button className="searchIcon">
                            <img src={search_icon} alt="" />
                        </button>
                    </div>
                    <button className="btn btn-filter" onClick={filterGroups}>
                        <p>Filter</p>
                        <img className="filterIcon" src={filter_icon} alt="" />
                    </button>
                    <button className="creatUserBtn" onClick={toggleCreateHeader}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create a new group</span>
                    </button>
                </div>
            </div>
            <div className="userListBody">
                <div className="listBody">
                    <ul className="tableListing">
                        <li className="listHeading userRole">
                            <div className="userName">Group Name</div>
                            <div className="phoneNum assignedPeople">
                                No. of people assigned
              </div>
                            <div className="createDate">Created on</div>
                        </li>
                        {groupsData.length &&
                            groupsData.map((elem, i) => {
                                return (
                                    <>
                                        <li className="owerInfo userRole" key={elem.keyId}>
                                            <div className="userName">
                                                <button className="btn">
                                                    <p>{elem.groupName}</p>
                                                </button>
                                            </div>
                                            <div className="phoneNum">
                                                <button className="btn">
                                                    {elem.numberOfAssigned}
                                                </button>
                                            </div>
                                            <div className="createDate">
                                                <button className="btn">{elem.createdOn}</button>
                                                <div className="info_3dot_icon">
                                                    <button
                                                        className="btn"
                                                        onClick={(el) => editThisGroup(elem.keyId, el)}
                                                    // onClick={(e) => editThisGroup(e, i)}
                                                    >
                                                        <img src={info_3dot_icon} alt="" />
                                                    </button>
                                                </div>
                                                {elem.isEditing && <TableOptionsDropdown dropdownPos={dropdownPos} />}
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

export default GroupListing
