import React, { useEffect, useState } from 'react';
import { UserServices } from "../../../services/authentication/UserServices";
import { RoleServices } from "../../../services/authentication/RoleServices";
import PermissionMatrix from "../../shared/PermissionMatrix";

import camera_icon from "../../../assets/images/camera_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";


const UserModal = (props) => {
    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: ""
    });
    const [roles, setRoles] = useState(null);
    const [groups, setGroups] = useState(null);
    const [groupId, setGroupId] = useState('603e42865e257524e35660c9');

    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setCreateButton(null);
    };

    const handleImageUpload = (event) => {
        let files = event.target.files;

        let reader = new FileReader();
        reader.onload = r => {
            setImage(r.target.result);
            /**
             * Make axios call
             */
            UserServices.fileUpload({
                file: r.target.result,
                name: files[0].name
            })
                .then((result) => {
                    console.log('Profile pic: ', result);
                })
                .catch(err => {
                    console.log('Profile pic error', err);
                });
        };
        reader.readAsDataURL(files[0]);

    }
    useEffect(() => {
        let pageId = 1;
        let keyword = null;

        fetchRoles(pageId, keyword);
    }, []);

    /**
     * Fetch roles
     * @param {*} event 
     */
    const fetchRoles = async (pageId, keyword) => {
        try {
            await RoleServices.fetchRoles(pageId, keyword)
                .then((result) => {
                    console.log('Role drop-down result', result.roles);
                    if (result) {
                        setRoles(result.roles);
                    }
                })
                .catch((error) => {
                    console.log("Role drop-down error", error);
                });
        } catch (e) {
            console.log("Error in Role drop-down", JSON.stringify(e));
        }
    }

    /**
     * Handle first name change
     * @param {*} event 
     */
    const handleFirstNameChange = (event) => {
        event.preventDefault();
        setFirstName(event.target.value);
    };
    /**
     * Handle last name change
     * @param {*} event 
     */
    const handleLastNameChange = (event) => {
        event.preventDefault();
        setLastName(event.target.value);
    };
    /**
     * Handle phone number change
     * @param {*} event 
     */
    const handlePhoneNumberChange = (event) => {
        event.preventDefault();
        setPhoneNumber(event.target.value);
    };
    /**
     * Handle phone number change
     * @param {*} event 
     */
    const handleEmailChange = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    };
    /**
     * Handle submit
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        let formErrorsCopy = formErrors;
        let isError = false;

        /**
         * Check firstName field
         */
        if (!firstName) {
            isError = true;
            formErrorsCopy.firstName = "Please fillup the first name";
        }
        /**
         * Check lastName field
         */
        if (!lastName) {
            isError = true;
            formErrorsCopy.lastName = "Please fillup the last name";
        }
        /**
         * Check phone number field
         */
        if (!phoneNumber) {
            isError = true;
            formErrorsCopy.phoneNumber = "Please fillup the phone number";
        }
        /**
         * Check email field
         */
        if (!email) {
            isError = true;
            formErrorsCopy.email = "Please fillup the email";
        }

        /**
         * Check the erros flag
         */
        if (isError) {
            /**
             * Set form errors
             */
            setProcessing(false);
            setFormErrors({
                firstName: formErrors.firstName,
                lastName: formErrors.lastName,
                phoneNumber: formErrors.phoneNumber,
                email: formErrors.email
            });
            setTimeout(
                () => setFormErrors({
                    ...formErrors,
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: ""
                }),
                3000
            );
            console.log('formErrors', formErrors)
        } else {
            //Submit the form
            console.log('Submit the form if no errors');
            /**
             * Submit user create form
             */
            let payload = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                groupId: groupId 
            };

            /**
             * Lets decide the operation type
             */
            let operationMethod = "createUser";

            try {
                await UserServices[operationMethod](payload)
                    .then(result => {
                        console.log("Create user result", result)
                    })
            } catch (e) {
                /**
                 * Segregate error by http status
                 */
                setProcessing(false);
                console.log("Error in user create", e)
                if (e.response && e.response.status == 403) {
                    setErrorMsg("You dont have permission to perform this action");
                }
                else if (e.response && e.response.data.message) {
                    setErrorMsg(e.response.data.message);
                }
            }

        }
    };
    return (
        <>
            {props.createButton !== null && (
                <div className="sideMenuOuter createSideModal sideUser">
                    <div className="sideMenuInner">
                        <button
                            className="btn btn-closeSideMenu"
                            onClick={(e) => closeSideMenu(e)}
                        >
                            <span></span>
                            <span></span>
                        </button>

                        <>
                            <div className="sideMenuBody">
                                <div className="errorForm">
                                    <ul>
                                        <li>
                                            Lorem ipsum dolor emit
                                        </li>
                                        <li>
                                            Lorem ipsum dolor emit Lorem ipsum dolor emit Lorem ipsum dolor emit
                                        </li>
                                        <li>
                                            Lorem ipsum dolor emit Lorem ipsum dolor emit
                                        </li>
                                        <li>
                                            Lorem ipsum dolor emit Lorem ipsum dolor emit Lorem ipsum dolor emit Lorem ipsum dolor emit Lorem ipsum dolor emit
                                        </li>
                                    </ul>
                                </div>

                                <form className="formBody" onSubmit={handleSubmit}>
                                    <div className="setProfilePic">
                                        <p className="profilePicHeading">Set profile picture</p>
                                        <div className="formField">
                                            <label className="inputLabel">
                                                <input type="file" onChange={(e) => handleImageUpload(e)} />
                                                <span>
                                                    <span className="userProfilePic">
                                                        <img src={image ? image : camera_icon} ></img>
                                                    </span>
                            Profile picture
                          </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="formInputs">
                                        <div className="infoField">
                                            <p className="infoFieldHead">Personal Information</p>
                                            <div className="infoInputs">
                                                <ul>
                                                    <li>
                                                        <div className={formErrors.firstName ? "formField w-50 error" : "formField w-50"}>
                                                            <p>First Name</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="firstName"
                                                                    placeholder="Ex. Adam"
                                                                    onChange={handleFirstNameChange}
                                                                />
                                                            </div>
                                                            {formErrors.firstName ? <span className="errorMsg">{formErrors.firstName}</span> : ''}
                                                        </div>
                                                        <div className={formErrors.lastName ? "formField w-50 error" : "formField w-50"}>
                                                            <p>Last Name</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="lastName"
                                                                    placeholder="Ex. Smith"
                                                                    onChange={handleLastNameChange}
                                                                />
                                                            </div>
                                                            {formErrors.lastName ? <span className="errorMsg">{formErrors.lastName}</span> : ''}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={formErrors.phoneNumber ? "formField w-50 error" : "formField w-50"}>
                                                            <p>Phone No</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    placeholder="Eg. (555) 555-1234"
                                                                    onChange={handlePhoneNumberChange}
                                                                />
                                                            </div>
                                                            {formErrors.phoneNumber ? <span className="errorMsg">{formErrors.phoneNumber}</span> : ''}
                                                        </div>
                                                        <div className={formErrors.email ? "formField w-50 error" : "formField w-50"}>
                                                            <p>Email</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="email"
                                                                    placeholder="Adam.smith@domain.com"
                                                                    onChange={handleEmailChange}
                                                                />
                                                            </div>
                                                            {formErrors.email ? <span className="errorMsg">{formErrors.email}</span> : ''}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="infoField assignRoleGroup">
                                            <p className="infoFieldHead">Assign Role & Group</p>
                                            <div className="infoInputs">
                                                <ul>
                                                    <li>
                                                        <div className="formField w-50">
                                                            <p>Default user role</p>
                                                            <div className="inFormField">
                                                                <select
                                                                    style={{
                                                                        backgroundImage: "url(" + arrowDown + ")",
                                                                    }}
                                                                >
                                                                    {roles ? roles.map((el, key) => {
                                                                        return (
                                                                            <React.Fragment key={key + "_role"}>
                                                                                <option value={el._id}>{el.name}</option>
                                                                            </React.Fragment>
                                                                        );
                                                                    }) : 'No data found'}

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="formField w-50">
                                                            <p>Select a group</p>
                                                            <div className="inFormField">
                                                                <select
                                                                    style={{
                                                                        backgroundImage: "url(" + arrowDown + ")",
                                                                    }}
                                                                >
                                                                    <option value="603e42865e257524e35660c9">Top Manager</option>
                                                                    <option value="603e72955e257524e35660d5">Manager-test</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <PermissionMatrix />

                                    <div className="permissionButtons">
                                        <button className="creatUserBtn createBtn">
                                            <img className="plusIcon" src={plus_icon} alt="" />
                                            <span>Create an user</span>
                                        </button>
                                        <button className="saveNnewBtn">
                                            <span>Save & New</span>
                                            <img className="" src={arrow_forward} alt="" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserModal
