import React, { useState, useEffect } from 'react';

import { GroupServices } from '../../../services/authentication/GroupServices';
import { RoleServices } from "../../../services/authentication/RoleServices";
import { history } from "../../../helpers";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import PermissionMatrix from '../../shared/PermissionMatrix';
import Loader from '../../shared/Loader';


const GroupModal = (props) => {

    const [roles, setRoles] = useState(null);
    const [isLoader, setIsLoader] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [formErrors, setFormErrors] = useState({
        groupName: "",
        roleId: "",
        permission: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [permissionData, setPermissionData] = useState([]);
    const [saveAndNew, setSaveAndNew] = useState(false);
    const [editGroupId, setEditGroupId] = useState('');

    let editGroup = props.createButton ? props.createButton : false;

    /**
     * Edit group
     */
    useEffect(() => {
        setEditGroupId(editGroup._id);
        setGroupName(editGroup.name);
        setRoleId(editGroup.roleId);
        setPermissionData(editGroup.permissions);
    }, [editGroup])

    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setCreateButton(null);
    };

    useEffect(() => {
        let pageId = "all";
        let keyword = null;

        fetchRoles(pageId, keyword);
    }, []);
    /**
     * Fetch roles
     * @param {*} event 
     */
    const fetchRoles = async (pageId, keyword) => {
        try {
            setIsLoader(true);
            const result = await RoleServices.fetchRoles(pageId, keyword);
            // console.log('Roles', result);
            if (result) {
                setRoles(result.roles);
                setIsLoader(false);
            }
        } catch (e) {
            console.log("Error in Role drop-down", JSON.stringify(e));
            setIsLoader(false);
        }
    }

    /**
     * Reset group form
     * @param {*} e 
     */
    const resetGroupForm = () => {
        console.log('Reset group from');
        setGroupName('');
        setRoleId('');
        setPermissions([]);
    }

    /**
     * Handle group name change
     * @param {*} e 
     */
    const handleGroupNameChange = (e) => {
        e.preventDefault();
        setGroupName(e.target.value);

    }

    /**
     * Handle role change 
     * @param {*} event 
     */
    const handleRoleChange = (event) => {
        event.preventDefault();
        setRoleId(event.target.value);
    }

    /**
     * Get roles from pagination component
     * @param {*} dataFromChild
     */
    const getDataFn = (dataFromChild) => {
        console.log('Data from child', dataFromChild);
        if (dataFromChild) {
            setPermissions(dataFromChild);
        }
    }

    /**
     * Handle submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        let isError = false;

        /**
         * Check name field
         */
        if (!groupName) {
            isError = true;
            formErrors.groupName = "Please fillup the name";
        } else {
            formErrors.groupName = null;
        }

        /**
         * Check name field
         */
        if (!roleId) {
            isError = true;
            formErrors.roleId = "Please select a role";
        } else {
            formErrors.roleId = null;
        }

        /**
         * Check permission set
         */
        if (!permissions.length) {
            isError = true;
            formErrors.permission = "Please select permissions";
        } else {
            formErrors.permission = null;
        }

        /**
        * Check the erros flag
        */
        if (isError) {
            setFormErrors({
                groupName: formErrors.groupName,
                roleId: formErrors.roleId,
                permission: formErrors.permission
            });
            setTimeout(
                () => setFormErrors({
                    ...formErrors,
                    groupName: "",
                    roleId: "",
                    permission: ""
                }),
                5000
            );

        } else {
            /**
             * Submit role create form
             */
            let payload = {
                name: groupName,
                roleId: roleId,
                permissions: permissions
            };

            /**
             * Lets decide the operation type
             */
            let oprationMethod = "createGroup";
            if (editGroupId) {
                oprationMethod = "editGroup";
                payload.id = editGroupId;
            }

            try {
                setIsLoader(true);
                const result = await GroupServices[oprationMethod](payload)
                if (result) {
                    /**
                     * Reset modal
                     */
                    if (saveAndNew) {
                        console.log('save and new')
                        setSaveAndNew(false);
                        resetGroupForm();
                        props.setCreateButton(null);
                        props.setCreateButton('groups');
                    } else {
                        console.log('else save and new')
                        props.setCreateButton(null);
                    }
                    fetchGroups(1);
                    setProcessing(false);
                    setIsLoader(false);
                }
            } catch (e) {
                /**
                 * Segregate error by http status
                 */
                setIsLoader(false);
                setProcessing(false);
                console.log("Error in role create", e)
                if (e.response && e.response.status == 403) {
                    setErrorMsg("You dont have permission to perform this action");
                }
                else if (e.response && e.response.data.message) {
                    setErrorMsg(e.response.data.message);
                }

            }

        }
    }

    const handleSaveAndNew = () => {
        setSaveAndNew(true);
    }

    /**
     * Send the data to group listing component
     * @param {*} data
     */
    const broadcastToParent = (data) => {
        props.getData(data);
    };

    /**
     * Function to fetch users based on filter
     * @returns 
     */
    const fetchGroups = async (pageId, queryParams) => {
        try {
            setIsLoader(true);
            await GroupServices.fetchGroups(pageId, queryParams)
                .then((result) => {
                    console.log('Group listing result', result.groups);
                    if (result) {
                        broadcastToParent(result);
                        setIsLoader(false);
                    }
                })
                .catch((error) => {
                    setIsLoader(false);
                    console.log("Group listing error", error);
                });
        } catch (e) {
            setIsLoader(false);
            console.log("Error in Group listing", e);
        }
    }

    return (
        <>
            {props.createButton !== null && (
                <div className="sideMenuOuter createSideModal sideGroups">
                    {isLoader ? <Loader /> : ''}
                    <div className="sideMenuInner">
                        <button
                            className="btn btn-closeSideMenu"
                            onClick={(e) => closeSideMenu(e)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                        <div className="sideMenuHeader">

                            <h3>{editGroupId ? 'Edit ' : ''}Group</h3>

                            <p>
                            Create different groups and assign permissions to each group to access modules
                            </p>
                        </div>

                        <div className="sideMenuBody">
                            <form className="formBody" onSubmit={handleSubmit}>
                                <div className="newGroupName">
                                    <div className="infoInputs">
                                        <ul>
                                            <li>
                                                <div className={formErrors.groupName ? "formField w-50 error" : "formField w-50"}>
                                                    <p>Enter group name</p>
                                                    <div className="inFormField">
                                                        <input
                                                            type="text"
                                                            name="groupName"
                                                            onChange={handleGroupNameChange}
                                                            placeholder="Ex. Gym Staffs"
                                                            defaultValue={groupName ? groupName : ''}
                                                        />
                                                    </div>
                                                    {formErrors.groupName ? <span className="errorMsg">{formErrors.groupName}</span> : ''}
                                                </div>
                                                <div className={formErrors.roleId ? "formField w-50 error" : "formField w-50"}>
                                                    <p>Select a role</p>
                                                    <div className="inFormField">
                                                        <select
                                                            style={{
                                                                backgroundImage: "url(" + arrowDown + ")",
                                                            }}
                                                            onChange={handleRoleChange}
                                                            value={roleId ? roleId : ''}
                                                        >
                                                            <option value="">Select role</option>
                                                            {roles ? roles.map((el, key) => {
                                                                return (
                                                                    <React.Fragment key={key + "_role"}>
                                                                        <option value={el._id}>{el.name}</option>
                                                                    </React.Fragment>
                                                                );
                                                            }) : 'No data found'}
                                                        </select>
                                                    </div>
                                                    {formErrors.roleId ? <span className="errorMsg">{formErrors.roleId}</span> : ''}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <PermissionMatrix
                                    getData={getDataFn}
                                    setPermissionData={permissionData}
                                />
                                <div className="permissionButtons">
                                    <button className="creatUserBtn createBtn">
                                        <span>Save</span>
                                        <img className="" src={arrow_forward} alt="" />
                                    </button>
                                    {!editGroupId &&
                                        <button className="saveNnewBtn" onClick={handleSaveAndNew}>
                                            <span>Save & New</span>
                                            <img className="" src={arrow_forward} alt="" />
                                        </button>
                                    }

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
