import React, { useState } from 'react';
import { UserServices } from "../../../services/authentication/UserServices";
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
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
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
                                                        <div className="formField w-50 error">
                                                            <p>First Name</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="firstName"
                                                                    placeholder="Ex. Adam"
                                                                    onChange={handleFirstNameChange}
                                                                />
                                                            </div>
                                                            <span className="errorMsg">This is not right</span>
                                                        </div>
                                                        <div className="formField w-50">
                                                            <p>Last Name</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="lastName"
                                                                    placeholder="Ex. Smith"
                                                                    onChange={handleLastNameChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="formField w-50">
                                                            <p>Phone No</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    placeholder="Eg. (555) 555-1234"
                                                                    onChange={handlePhoneNumberChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="formField w-50">
                                                            <p>Email</p>
                                                            <div className="inFormField">
                                                                <input
                                                                    type="text"
                                                                    name="email"
                                                                    placeholder="Adam.smith@domain.com"
                                                                    onChange={handleEmailChange}
                                                                />
                                                            </div>
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
                                                                    <option value="null">Gym Staff</option>
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
                                                                    <option value="null">
                                                                        Adam.smith@domain.com
                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <PermissionMatrix/>

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
