import React, { useEffect, useState } from 'react';

import DashboardPagination from "../../shared/Pagination";
import TableOptionsDropdown from "../../shared/TableOptionsDropdown";

import search_icon from "../../../assets/images/search_icon.svg";
import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import info_3dot_icon from "../../../assets/images/info_3dot_icon.svg";
import { RoleServices } from "../../../services/authentication/RoleServices";

// import owner_img_1 from "../../../assets/images/owner_img_1.png";
// import more_pages_Icon from "../../../assets/images/more_pages_Icon.svg";
// import arrow from "../../../assets/images/arrow.svg";
// import cross_icon from "../../../assets/images/cross_icon.svg";
// import camera_icon from "../../../assets/images/camera_icon.svg";
// import arrow_forward from "../../../assets/images/arrow_forward.svg";
// import list_board_icon from "../../../assets/images/list_board_icon.svg";

const RolesListing = (props) => {
    const [dropdownPos, setDropdownPos] = useState('bottom');
    const [rolesData, setRolesData] = useState(null);
    const [pagination, setPaginationData] = useState(
        {
            count: null,
            currentPage: null,
            totalPages: null,
        }
    );

    const toggleCreateHeader = () => {
        props.toggleCreate("roles");
    };

    const filterRoles = () => {
        props.toggleFilter("roles");
    };

    const editThisRole = (e, el) => {
        let yPosition = el.clientY;
        let avHeight = window.innerHeight - (70 + 70 + 54 + 57)
        if ((yPosition + 70) > avHeight) {
            setDropdownPos("top")
        }
        else {
            setDropdownPos("bottom")
        }

        const data = rolesData.filter((i) => i._id === e);
        console.log("ROLES E? : ", data);
        data[0].isEditing = !data[0].isEditing;
        console.log("ROLES data  :: ", data[0].isEditing);
        const newData = rolesData.map((el, i) => {
            if (el._id === e) {
                return data[0];
            } else return el;
        });
        console.log("ROLES newData : ", newData);
        setRolesData(newData);
    };

    useEffect(() => {
        /**
         * Call to fetch roles
         */
        fetchRoles();
    }, []);

    /**
     * Function to fetch roles
     * @returns 
     */
    const fetchRoles = async () => {
        try {
            // const getPlanDetails = await PlanServices.fetchAllPlansDetails()
            await RoleServices.fetchRoles()
                .then((roles) => {
                    console.log('Role listing result', roles);
                    if (roles) {
                        setRolesData(roles);
                    }
                })
                .catch((error) => {
                    console.log("Role listing error", error);
                });
        } catch (e) {
            console.log("Error in Role listing", e);
        }
    }

    return (
        <div className="dashInnerUI">
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Users & Controls</li>
                        <li>Roles</li>
                    </ul>
                    <h2 className="inDashboardHeader">User Roles (12)</h2>
                    <p className="userListAbout">Create & manage roles for your users</p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar">
                        <input type="search" name="" id="" placeholder="Search users" />
                        <button className="searchIcon">
                            <img src={search_icon} alt="" />
                        </button>
                    </div>
                    <button className="btn btn-filter" onClick={filterRoles}>
                        <p>Filter</p>
                        <img className="filterIcon" src={filter_icon} alt="" />
                    </button>
                    <button className="creatUserBtn" onClick={toggleCreateHeader}>
                        <img className="plusIcon" src={plus_icon} alt="" />
                        <span>Create a new role</span>
                    </button>
                </div>
            </div>
            {/* <div className="userListBody">
        <div className="listBody">
          <ul>
            <li className="listHeading userRole">
              <div className="userName">
                Role Name
                
              </div>
              <div className="phoneNum assignedPeople">
                No. of people assigned
                
              </div>
              <div className="emailID">
                Created on
                
              </div>
            </li>
          </ul>
        </div>

        <div className="createNew">
          <span>
            <img src={list_board_icon} alt="" />
            <p>You haven’t created any roles yet.</p>
          </span>
          <button className="creatUserBtn" onClick={toggleCreateHeader}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create a new role</span>
          </button>
        </div>
      </div> */}
            <div className="userListBody">
                <div className="listBody">
                    <ul className="tableListing">
                        <li className="listHeading userRole">
                            <div className="userName">Role Name</div>
                            <div className="phoneNum assignedPeople">
                                No. of people assigned
              </div>
                            <div className="createDate">Created on</div>
                        </li>
                        {rolesData && rolesData.length &&
                            rolesData.map((elem, i) => {
                                return (
                                    <>
                                        <li className="owerInfo userRole" key={i}>
                                            <div className="userName">
                                                <button className="btn">
                                                    <p>{elem.name}</p>
                                                </button>
                                            </div>
                                            <div className="phoneNum">
                                                <button className="btn">0
                                                    {/* {elem.numberOfAssigned} */}
                                                </button>
                                            </div>
                                            <div className="createDate">
                                                <button className="btn">{elem.createdAt}</button>
                                                <div className="info_3dot_icon">
                                                    <button
                                                        className="btn"
                                                        onClick={(el) => editThisRole(elem._id, el)}
                                                    >
                                                        <img src={info_3dot_icon} alt="" />
                                                    </button>
                                                </div>
                                                {elem.isEditing && <TableOptionsDropdown dropdownPos={dropdownPos} dropdownType="rolesDropdown" />}
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

export default RolesListing
