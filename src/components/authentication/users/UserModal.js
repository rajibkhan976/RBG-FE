import React, { useEffect, useState } from 'react';
import { UserServices } from "../../../services/authentication/UserServices";
import { RoleServices } from "../../../services/authentication/RoleServices";
import { OrganizationServices } from "../../../services/authentication/OrganizationServices";
import PermissionMatrix from "../../shared/PermissionMatrix";
import { history } from "../../../helpers";
import config from "../../../configuration/config";
import Loader from '../../shared/Loader';
import { ContactService } from "../../../services/contact/ContactServices";

import camera_icon from "../../../assets/images/camera_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import plus_icon from "../../../assets/images/plus_icon.svg";
import arrowDown from "../../../assets/images/arrowDown.svg";
import { GroupServices } from '../../../services/authentication/GroupServices';


const UserModal = (props) => {
    const [image, setImage] = useState(null);
    const [profilePicName, setProfilePicName] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState("");
    const [orgName, setOrgName] = useState("");
    const [orgDescription, setOrgDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        orgName: "",
        orgDescription: "",
        groupName: ""
    });
    const [roles, setRoles] = useState(null);
    const [groups, setGroups] = useState(null);
    const [roleId, setRoleId] = useState('');
    const [groupId, setGroupId] = useState('');
    const [editGroupId, setEditGroupId] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [editId, setEditId] = useState("");
    const [permissionData, setPermissionData] = useState([]);
    const [copyPermissionData, setCopyPermissionData] = useState([]);
    const [isOrgPermission, setIsOrgPermission] = useState(true);
    const [isModifiedPermission, setIsModifiedPermission] = useState(false);
    const [isEmailNotification, setIsEmailNotification] = useState(false);
    const [groupName, setGroupName] = useState('');
    // const [newGroupId, setNewGroupId] = useState('');
    const [phoneCountryCode, setPhoneCountryCode] = useState([]);
    const [basicinfoMobilePhone, setBasicinfoMobilePhone] = useState({
        countryCode: "US",
        dailCode: "+1",
        number: "1234567890"
    });

    const [resetPermissions, setResetPermissions] = useState(false);

    const fetchCountry = async () => {
        let conntryResponse = await ContactService.fetchCountry();
        setPhoneCountryCode(conntryResponse);
        console.log(conntryResponse, "country");
    };

    useEffect(() => {
        fetchCountry();
    }, []);

    const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
        return (
            <option value={el.code} data-dailcode={el.prefix} key={key} >{el.code} ({el.prefix})</option>
        )
    }
    ) : '';

    const handelBasicinfoMobilePhon = (event) => {
        const {name, value} = event.target;
        if(name == "countryCode"){
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex != undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoMobilePhone(prevState => ({...prevState, dailCode: dailCode}));
        }
        
        setBasicinfoMobilePhone(prevState => ({...prevState, [name]: value}));
    };

    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setCreateButton(null);
    };

    let editUser = props.createButton ? props.createButton : false;
    let temp = [];

    useEffect(() => {
        setImage(editUser.image ? (config.bucketUrl + editUser.image) : null);
        setEditId(editUser._id);
        setFirstName(editUser.firstName);
        setLastName(editUser.lastName);
        setPhoneNumber(editUser.phone);
        setEmail(editUser.email);
        if (editUser && editUser.role && editUser.group) {
            setRoleId(editUser.role[0]._id);
            getGroupsByRoleId(editUser.role[0]._id);
            setGroupId(editUser.group[0]._id);
            setPermissionData(editUser.group[0].permissions);
            //Keep a original copy of permissions data
            setCopyPermissionData(JSON.parse(JSON.stringify(editUser.group[0].permissions)));
        }

        console.log('editUser', editUser)
        if (editUser.isOrganizationOwner) {
            console.log("Gym owner")
            setIsOwner(true);
            setOrgName(editUser.organization.name);
            setOrgDescription(editUser.organization.description);
            setLogo(editUser.organization.logo ? (config.bucketUrl + editUser.organization.logo) : null);
            setLogoName(editUser.organization.logo);
        } else {
            setIsOwner(false);
        }

        /**
         * Reset permissions
         */
        if (!editUser) {
            console.log('Reset permissions');
            setRoleId('');
            setGroupId('');
            setPermissionData([]);
            setIsModifiedPermission(false);
        }

    }, [editUser]);

    /**
     * Upload profile picture
     * @param {*} event 
     */
    const handleImageUpload = (event) => {
        let files = event.target.files;
        if (files && files.length) {

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
                        let avatar = config.bucketUrl + result.data.originalKey;
                        setImage(avatar);
                        setProfilePicName(result.data.originalKey);
                    })
                    .catch(err => {
                        console.log('Profile pic error', err);
                    });
            };
            reader.readAsDataURL(files[0]);
        }
    }

    const handleLogoUpload = (event) => {
        let files = event.target.files;
        if (files && files.length) {

            let reader = new FileReader();
            reader.onload = r => {
                setLogo(r.target.result);
                /**
                 * Make axios call
                 */
                UserServices.fileUpload({
                    file: r.target.result,
                    name: files[0].name
                })
                    .then((result) => {
                        console.log('Profile pic: ', result);
                        let avatar = config.bucketUrl + result.data.originalKey;
                        setLogo(avatar);
                        setLogoName(result.data.originalKey);
                    })
                    .catch(err => {
                        console.log('Profile pic error', err);
                    });
            };
            reader.readAsDataURL(files[0]);
        }
    }

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
            const result = await RoleServices.fetchRoles(pageId, keyword);
            // .then((result) => {
            // console.log('Role drop-down result', result.roles);
            if (result) {
                setRoles(result.roles);
            } else {
                console.log("Role drop-down error");
            }
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
     * Handle id org owner checkbox
     * @param {*} event 
     */
    const handleIsOrgChange = (event) => {
        setIsOwner(event.target.checked)
    };

    /**
     * Handle org name change
     * @param {*} event 
     */
    const handleOrgNameChange = (event) => {
        event.preventDefault();
        setOrgName(event.target.value);
    }

    /**
     * Handle org description change
     * @param {*} event 
     */
    const handleOrgDescriptionChange = (event) => {
        event.preventDefault();
        setOrgDescription(event.target.value)
    }


    /**
     * Handle role change 
     * @param {*} event 
     */
    const handleRoleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setRoleId(event.target.value);
        getGroupsByRoleId(event.target.value);
        // Set permissions to null
        console.log('Set permission data to null')
        setResetPermissions('yes');
    }
    /**
     * Get groups by role ID
     * @param {*} event 
     */
    const getGroupsByRoleId = async (roleId) => {
        setIsLoader(true);
        try {
            const groups = await UserServices.fetchGroupsByRoleId(roleId);
            if (groups) {
                console.log('Fetched groups', groups);
                setGroups(groups);
                setIsLoader(false);
            }
        } catch (error) {
            console.error('Get groups', error);
            setIsLoader(false);
        }
    }
    /**
     * Handle group change
     * @param {*} event 
     */
    const handleGroupChange = (event) => {
        event.preventDefault();
        console.log('gc', event.target.value);
        let groupId = event.target.value;
        setGroupId(groupId);
        let selectedGroup = groups.filter(group => {
            return group._id === groupId
        });
        if (selectedGroup.length) {
            console.log('Selected group', selectedGroup);
            setPermissionData(selectedGroup[0].permissions);
            //Keep a original copy of permissions data
            setCopyPermissionData(JSON.parse(JSON.stringify(selectedGroup[0].permissions)));
        } else {
            setPermissionData([]);
        }
    }

    /**
     * Handle group name change
     * @param {*} event 
     */
    const handleGroupNameChange = (event) => {
        event.preventDefault();
        setGroupName(event.target.value);
    }

    /**
     * Get permission matrix data set
     * @param {*} dataFromChild
     */
    const getDataFn = (dataFromChild) => {
        let clonePermissions = copyPermissionData;
        console.log('Data from permission matrix', clonePermissions, dataFromChild);
        let isEqual = equals(clonePermissions, dataFromChild);
        console.log('is Equal', isEqual);
        //If pemission data not equal with original permission data
        if (!isEqual) {
            //Display group name input box
            setIsModifiedPermission(true);
            setPermissionData(dataFromChild);
        } else {
            //Hide group name input box
            setIsModifiedPermission(false);
        }
    }

    /**
     * Function to compare two arrays
     * @param {*} originalPermissions 
     * @param {*} newPermissions 
     * @returns 
     */
    const equals = (originalPermissions, newPermissions) => {
        // Check original and new permission set length
        if (originalPermissions.length !== newPermissions.length) return false;

        let status = [];
        // Check actions array for comparison
        originalPermissions.forEach((orgEl, orgKey) => {
            // console.log('org el key', orgKey, orgEl);
            newPermissions.forEach((newEl, newKey) => {
                // console.log('new el key', newKey, newEl, orgEl.entity, newEl.entity);
                //If actions length not matched - then clearly we can say pemission set updated
                if ((orgEl.entity === newEl.entity) && (orgEl.actions.length !== newEl.actions.length)) {
                    console.log('actions set not matched for ', orgEl.entity);
                    status.push(false);
                }

                //If actions length matched - then compare for the specific actions
                if ((orgEl.entity === newEl.entity) && (orgEl.actions.length === newEl.actions.length)) {
                    console.log('actions set matched for ', orgEl.entity, 'original actions', orgEl.actions, 'new actions', newEl.actions);
                    if (JSON.stringify(orgEl.actions) === JSON.stringify(newEl.actions)) {
                        console.log('matched')
                        status.push(true);
                    } else {
                        console.log('not matched');
                        status.push(false);
                    }
                }
            });
        })
        console.log('status', status, status.every(v => v === true));
        return status.every(v => v === true);
    }

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
         * Check org name field
         */
        if (isOwner && !orgName) {
            isError = true;
            formErrorsCopy.orgName = "Please fillup the name";
        }

        /**
        * Check org description field
        */
        if (isOwner && !orgDescription) {
            isError = true;
            formErrorsCopy.orgDescription = "Please fillup the description";
        }

        /**
         * Check new group name
         */
        if (isModifiedPermission && !groupName) {
            isError = true;
            formErrorsCopy.groupName = "Please fillup the group name";
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
                email: formErrors.email,
                orgName: formErrors.orgName,
                orgDescription: formErrors.orgDescription,
                groupName: formErrors.groupName
            });
            setTimeout(
                () => setFormErrors({
                    ...formErrors,
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    groupName: ""
                }),
                5000
            );
            console.log('formErrors', formErrors)
        } else {
            /**
             * Submit group create form
             * Add group name if given new permissions
             */
            setIsLoader(true);
            let newGroupId = '';
            if (isModifiedPermission) {
                //payload.groupName = groupName;
                let oprationMethod = "createGroup";
                let groupPayload = {
                    name: groupName,
                    roleId: roleId,
                    permissions: permissionData
                };
                const result = await GroupServices[oprationMethod](groupPayload)
                if (result) {
                    newGroupId = (result._id);
                    console.log('Group created successfully', result._id);
                }
            }


            /**
             * Submit organization create form 
             */
            let organizationId = null;
            if (isOwner) {
                let slug = orgName.toLowerCase().replace(' ', '-');
                let orgPayload = {
                    name: orgName,
                    slug: slug,
                    code: slug,
                    description: orgDescription,
                    logo: logoName,
                    status: "active"
                }

                try {
                    /**
                     * Lets decide the operation type
                     */
                    let operationOrgMethod = "create";
                    if (isOwner && editUser.organization) {
                        operationOrgMethod = "update";
                        orgPayload.id = editUser.organization._id;
                        orgPayload.ownerId = editId
                    }

                    await OrganizationServices[operationOrgMethod](orgPayload)
                        .then(result => {
                            console.log("Org " + operationOrgMethod, result);
                            organizationId = result._id;
                        })
                } catch (e) {
                    setProcessing(false);
                    console.log("Error in org create", e)
                    if (e.response && e.response.status == 403) {
                        setErrorMsg("You dont have permission to perform this action");
                    }
                    else if (e.response && e.response.data.message) {
                        setErrorMsg(e.response.data.message);
                    }
                    return false
                }

            }

            //Submit the form
            console.log('Submit the form if no errors');
            console.log('group id under handle submit', newGroupId, groupId);
            /**
             * Submit user create form
             */
            let payload = {
                firstName: firstName,
                lastName: lastName,
                phone: phoneNumber,
                email: email,
                groupId: newGroupId ? newGroupId : groupId,
                image: profilePicName,
                organizationId: organizationId,
                isOwner: isOwner
            };

            /**
             * Lets decide the operation type
             */
            let operationMethod = "createUser";
            if (editId) {
                operationMethod = "editUser";
                payload.id = editId;
            }


            try {
                await UserServices[operationMethod](payload)
                    .then(result => {
                        console.log("Create user result", result)
                        history.go(0);
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
            } finally {
                setIsLoader(false);
            }

        }
    };

    return (
        <>
            {props.createButton !== null && (
                <div className="sideMenuOuter createSideModal sideUser">
                    <div className="sideMenuInner">
                        {isLoader ? <Loader /> : ''}
                        <button
                            className="btn btn-closeSideMenu"
                            onClick={(e) => closeSideMenu(e)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                        <div className="sideMenuHeader">
                            <h3>User</h3>
                            <p>
                                Manage all the users' details in your organization
                            </p>
                        </div>

                        <>
                            <div className="sideMenuBody">
                                {/* <div className="errorForm">
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
                                </div> */}


                                {errorMsg &&
                                    <div className="error errorMsg">
                                        <p>{errorMsg}</p>
                                    </div>
                                }

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
                                                                    defaultValue={firstName}
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
                                                                    defaultValue={lastName}
                                                                    onChange={handleLastNameChange}
                                                                />
                                                            </div>
                                                            {formErrors.lastName ? <span className="errorMsg">{formErrors.lastName}</span> : ''}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={formErrors.phoneNumber ? "formField w-50 error" : "formField w-50"}>
                                                            <p>Phone No</p>
                                                            <div className="inFormField countryCodeField">
                                                                <div className="countryCode cmnFieldStyle">
                                                                    <div className="countryName">{basicinfoMobilePhone.countryCode}</div>
                                                                    <div className="daileCode">{basicinfoMobilePhone.dailCode}</div>
                                                                    <select className="selectCountry" name="countryCode" defaultValue={basicinfoMobilePhone.countryCode} onChange={handelBasicinfoMobilePhon}>
                                                                        {countrycodeOpt}
                                                                    </select>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    placeholder="Eg. (555) 555-1234"
                                                                    defaultValue={phoneNumber}
                                                                    onChange={handlePhoneNumberChange}
                                                                    className="cmnFieldStyle"
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
                                                                    defaultValue={email}
                                                                    onChange={handleEmailChange}
                                                                />
                                                            </div>
                                                            {formErrors.email ? <span className="errorMsg">{formErrors.email}</span> : ''}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="infoField orgSection">

                                            {!editId && isOrgPermission && (
                                                <div className="formField">
                                                    <p className="">Is it organization owner?

                                                        <div className="customCheckbox marginLeft">
                                                            <input
                                                                type="checkbox"
                                                                name="isOrg"
                                                                defaultChecked={isOwner}
                                                                onChange={handleIsOrgChange}
                                                            />
                                                            <span></span>
                                                        </div>
                                                    </p>
                                                </div>
                                            )}

                                            {isOwner && (
                                                <div className="infoInputs orgContent">
                                                    <ul>
                                                        <li>
                                                            <div className="setProfilePic">
                                                                <p className="profilePicHeading">Organization Information</p>
                                                                <div className="formField">
                                                                    <label className="inputLabel">
                                                                        <input type="file" onChange={(e) => handleLogoUpload(e)} />
                                                                        <span>
                                                                            <span className="userProfilePic">
                                                                                <img src={logo ? logo : camera_icon} ></img>
                                                                            </span>
                                                                            Organization Logo
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className={formErrors.orgName ? "formField w-50 error" : "formField w-50"}>
                                                                <p>Organization Name</p>
                                                                <div className="inFormField">
                                                                    <input
                                                                        type="text"
                                                                        name="orgName"
                                                                        placeholder="Ex. Falcon Inc."
                                                                        defaultValue={orgName}
                                                                        onChange={handleOrgNameChange}
                                                                    />
                                                                </div>
                                                                {formErrors.orgName ? <span className="errorMsg">{formErrors.orgName}</span> : ''}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={formErrors.orgDescription ? "formField w-100 error" : "formField w-100"}>
                                                                <p>Organization Description</p>
                                                                <div className="inFormField">
                                                                    <textarea
                                                                        name="orgDescription"
                                                                        placeholder="Its a great organization"
                                                                        defaultValue={orgDescription}
                                                                        onChange={handleOrgDescriptionChange}
                                                                    >
                                                                    </textarea>
                                                                </div>
                                                                {formErrors.orgDescription ? <span className="errorMsg">{formErrors.orgDescription}</span> : ''}
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
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
                                                                    }) : ''}

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
                                                                    onChange={handleGroupChange}
                                                                    value={(groupId ? groupId : '')}
                                                                >
                                                                    <option value="">Select group</option>
                                                                    {groups ? groups.map((el, key) => {
                                                                        return (
                                                                            <React.Fragment key={key + "_groups"}>
                                                                                <option value={el._id}>{el.name}</option>
                                                                            </React.Fragment>
                                                                        );
                                                                    }) : ''}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <PermissionMatrix
                                        getData={getDataFn}
                                        setPermissionData={permissionData}
                                        resetPermissions={resetPermissions}
                                    />
                                    <p className="staredInfo">
                                        * You can customize permissions for this user based on your need.
                                    </p>
                                    {isModifiedPermission && <div className="newGroupName">
                                        <div className={formErrors.groupName ? "formField w-50 error" : "formField w-50"}>
                                            <p>Create a new group with the new permissions *</p>
                                            <div className="inFormField">
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Enter a new group name"
                                                    defaultValue={groupName}
                                                    onChange={handleGroupNameChange}
                                                />
                                            </div>
                                            {formErrors.groupName ? <span className="errorMsg">{formErrors.groupName}</span> : ''}
                                        </div>
                                    </div>}
                                    {isEmailNotification && <div className="enableNotification">
                                        <label>
                                            <div className="customCheckbox">
                                                <input type="checkbox" />
                                                <span></span>
                                            </div>
                                            <span>Notify users by mail on adding them to this group </span>
                                        </label>
                                    </div>}
                                    <div className="permissionButtons">
                                        {!editId && <button className="creatUserBtn createBtn" disabled={processing}>
                                            <img className="plusIcon" src={plus_icon} alt="" />
                                            <span>Create an user</span>
                                        </button>}
                                        <button className="saveNnewBtn" disabled={processing}>
                                            <span>{editId ? "Update user" : "Save & New"}</span>
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
