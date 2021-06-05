import React, { useState } from 'react'

const PermissionMatrix = () => {

    const [isChecked, setIsChecked] = useState([
        {
            authentication: {
                all: false,
                read: false,
                add: false,
                update: false,
                delete: false,
                import: false,
                export: false
            }
        }
    ]);

    /**
     * Handle authentication checkbox
     */
    const handleChange = (entity, action) => {
        console.log(entity, action);
        const updatedCheckedState = isChecked.map((item, index) =>
            // index === position ? !item : item
            console.log(item, index)
        );

        //setCheckedState(updatedCheckedState);
        //setIsAuthenticationChecked(!isAuthenticationChecked);
    };

    return (
        <>
            <div className="permission">
                <p className="permissionHead">Manage permissions</p>
                <div className="InputsContainer">
                    <ul>
                        <li className="inputsContainerHead">
                            <p>
                                Entity{" "}
                                <button className="btn-link">Select All</button>
                            </p>
                            <p>Read</p>
                            <p>Add</p>
                            <p>Update</p>
                            <p>Delete</p>
                            <p>Import</p>
                            <p>Export</p>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox"
                                    // checked={isChecked.authentication.all}
                                    onChange={() => handleChange('authentication', 'all')} />
                                <p>+ Authentication</p>
                            </span>
                            <span>
                                <input type="checkbox"  />
                            </span>
                            <span>
                                <input type="checkbox"  />
                            </span>
                            <span>
                                <input type="checkbox"  />
                            </span>
                            <span>
                                <input type="checkbox"  />
                            </span>
                            <span>
                                <input type="checkbox" />
                            </span>
                            <span>
                                <input type="checkbox" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Contacts</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Automations</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Communication</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Appointments</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Products</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Waiver</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Billing</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Reports</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                        <li className="inputCheckBox">
                            <span>
                                <input type="checkbox" name="" id="" />
                                <p>+ Data Administration</p>
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                            <span>
                                <input type="checkbox" name="" id="" />
                            </span>
                        </li>
                    </ul>
                </div>
                <p className="staredInfo">
                    * You can customize permissions for this user based on
                    your need.
                      </p>
                <div className="newGroupName">
                    <div className="formField w-50">
                        <p>Create a new group with the new permissions *</p>
                        <div className="inFormField">
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Enter a new group name"
                            />
                        </div>
                    </div>
                </div>
                <div className="enableNotification">
                    <label>
                        <input type="checkbox" name="" id="" />
                        <span>
                            Notify users by mail on adding them to this group{" "}
                        </span>
                    </label>
                </div>
            </div>
        </>
    )
}

export default PermissionMatrix
