import { useLocation } from "react-router-dom";

import filter_icon from "../../../assets/images/filter_icon.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../actions/types";


const ListHead = (props) => {
  const pathURL = useLocation().pathname;
  const [time, setTime] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setTime(true);
    }, 200)
  },[]);

  const filterRoles = ()=>{
    return props.filterRoles
  }
  const creatUser = ()=>{
    dispatch({type: actionTypes.MODAL_COUNT_INCREMENT, area: 'bodyModal'});
  }
  const dispatchFun = ()=>{
    filterRoles();
    creatUser();
  }




  
  return (
      (pathURL === '/roles' ?
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Users & Controls</li>
            <li>Roles</li>
          </ul>
          <h2 className="inDashboardHeader">Roles ({props.rolesCount})</h2>
          <p className="userListAbout">Manage user roles</p>
        </div>
        <div className="listFeatures">
          <div className="searchBar">
            <form onSubmit={props.handleSearch}>
              <input
                type="search"
                name="search"
                placeholder="Search roles"
                defaultValue={props.keyword}
                onChange={props.handleKeywordChange}
                autoComplete="off"
              />
              <button className="searchIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.069"
                  height="19"
                  viewBox="0 0 19.069 19"
                  id="search-ico"
                >
                  <g transform="translate(-1.5 -1.5)">
                    <path
                      className="a"
                      d="M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z"
                    />
                    <path
                      className="a"
                      d="M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z"
                      transform="translate(-7.142 -7.143)"
                    />
                  </g>
                </svg>
              </button>
            </form>
          </div>
          <button className="btn btn-filter" onClick={dispatchFun}>
            {/* <p>Filter</p> */}
            <img className="filterIcon" src={filter_icon} alt="" />
          </button>
          <button className="creatUserBtn" onClick={props.toggleCreateHeader}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create</span>
          </button>
        </div>
      </div>: pathURL === '/groups' ?
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Users & Controls</li>
            <li>Groups</li>
          </ul>
          <h2 className="inDashboardHeader">Groups ({props.groupsCount})</h2>
          <p className="userListAbout">Manage user groups</p>
        </div>
        <div className="listFeatures">
          <div className="searchBar">
            <form onSubmit={props.handleSearch}>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search groups"
                onChange={props.handleKeywordChange}
                autoComplete="off"
                value={props.keyword}
              />
              <button className="searchIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.069"
                  height="19"
                  viewBox="0 0 19.069 19"
                  id="search-ico"
                >
                  <g transform="translate(-1.5 -1.5)">
                    <path
                      className="a"
                      d="M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z"
                    />
                    <path
                      className="a"
                      d="M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z"
                      transform="translate(-7.142 -7.143)"
                    />
                  </g>
                </svg>
              </button>
            </form>
          </div>
          <button className="btn btn-filter" onClick={props.filterGroups}>
            {/* <p>Filter</p> */}
            <img className="filterIcon" src={filter_icon} alt="" />
          </button>
          <button className="creatUserBtn" onClick={props.toggleCreateHeader}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create</span>
          </button>
        </div>
      </div>
      : pathURL === '/users' ?
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Users & Controls</li>
            <li>Users</li>
          </ul>
          <h2 className="inDashboardHeader">Users ({props.usersCount})</h2>
          <p className="userListAbout">
            Create & manage multiple sub-users with different access
          </p>
        </div>
        <div className="listFeatures">
          <div className="searchBar">
            <form onSubmit={props.handleSearch}>
              <input type="search" placeholder="Search users" onChange={props.handleKeywordChange} autoComplete="off" value={props.keyword} />
              <button className="searchIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19.069"
                  height="19"
                  viewBox="0 0 19.069 19"
                  id="search-ico"
                >
                  <g transform="translate(-1.5 -1.5)">
                    <path
                      className="a"
                      d="M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z"
                    />
                    <path
                      className="a"
                      d="M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z"
                      transform="translate(-7.142 -7.143)"
                    />
                  </g>
                </svg>
              </button>
            </form>
          </div>
          <button className="btn btn-filter" onClick={props.filterUsers}>
            {/* <p>Filter</p> */}
            <img className="filterIcon" src={filter_icon} alt="" />
          </button>
          {time ? <button className="creatUserBtn" onClick={props.toggleCreateHeader}>
            <img className="plusIcon" src={plus_icon} alt="" />
            <span>Create</span>
          </button> : ""}

        </div>
      </div>
      : pathURL === '/organizations' ?
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Users & Controls</li>
            <li>Organizations</li>
          </ul>
          <h2 className="inDashboardHeader">Organizations ({props.organizationsCount})</h2>
          <p className="userListAbout">
            Manage Organizations
          </p>
        </div>
      </div> :  pathURL === '/associations' ?
      <div className="userListHead">
        <div className="listInfo">
          <ul className="listPath">
            <li>Users & Controls</li>
            <li>Associations</li>
          </ul>
          <h2 className="inDashboardHeader">Associations ({props.associationsCount})</h2>
          <p className="userListAbout">
            Manage Associations
          </p>
        </div>
      </div> : ''
      )
  );
};

export default ListHead;
