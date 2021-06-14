import React from 'react';

import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";

const UserFilter = (props) => {

    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setStateFilter(null);
    };

    return (
        <>
        {props.stateFilter !== null && (
            <div className="sideMenuOuter filterUserMenu">
                <div className="sideMenuInner">
                    <button
                        className="btn btn-closeSideMenu"
                        onClick={(e) => closeSideMenu(e)}
                    >
                        <span></span>
                        <span></span>
                    </button>
                    <div className="sideMenuBody">
                        <form className="formBody">
                            <div className="formField">
                                <p>Select Group</p>
                                <div className="inFormField">
                                    <select style={{ backgroundImage: "url(" + arrowDown + ")" }}>
                                        <option value="null">Gym Staff</option>
                                    </select>
                                </div>
                            </div>
                            <div className="createdDate">
                                <p>Created on</p>
                                <div className="createdDateFields">
                                    <div className="formField w-50">
                                        <p>From</p>
                                        <div className="inFormField">
                                            <input type="date" name="formDate" id="formDate" placeholder="dd/mm/yyyy" />
                                        </div>
                                    </div>
                                    <div className="formField w-50">
                                        <p>To</p>
                                        <div className="inFormField">
                                            <input type="date" name="toDate" id="toDate" placeholder="dd/mm/yyyy" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="selectStatus">
                                <div className="formField">
                                    <p>Select Status</p>
                                    <div className="inFormField">
                                        <select style={{ backgroundImage: "url(" + arrowDown + ")" }}>
                                            <option value="null">Select Status</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="applyFilterBtn">
                                <button className="saveNnewBtn">
                                    <span>Apply Filter</span>
                                    <img className="" src={arrow_forward} alt="" />
                                </button>
                                <button className="btn-link">Clear</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default UserFilter;