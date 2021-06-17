import React from 'react';

import arrow_forward from "../../../assets/images/arrow_forward.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import PermissionMatrix from '../../shared/PermissionMatrix';

const GroupModal = (props) => {
    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setCreateButton(null);
    };

    return (
        <>
            {props.createButton !== null && (
                <div className="sideMenuOuter createSideModal sideGroups">
                    <div className="sideMenuInner">
                        <button
                            className="btn btn-closeSideMenu"
                            onClick={(e) => closeSideMenu(e)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                        <div className="sideMenuHeader">
                            <h3>Create a Group</h3>
                            <p>
                                Enter group name
                            </p>
                        </div>

                        <div className="sideMenuBody">
                            <form className="formBody">
                                <div className="newGroupName">
                                    <div className="formField w-50">
                                        <p>Enter group name</p>
                                        <div className="inFormField">
                                            <input
                                                type="text"
                                                name=""
                                                id=""
                                                placeholder="Ex. Gym Staffs"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <PermissionMatrix />

                                <div className="permissionButtons">
                                    <button className="creatUserBtn createBtn">
                                        <span>Save</span>
                                        <img className="" src={arrow_forward} alt="" />
                                    </button>
                                    <button className="saveNnewBtn">
                                        <span>Save & New</span>
                                        <img className="" src={arrow_forward} alt="" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GroupModal
