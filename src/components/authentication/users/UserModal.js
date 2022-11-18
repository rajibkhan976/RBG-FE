import React, { useEffect, useState, useRef } from 'react';
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
import AudioHelper from 'twilio-client/es5/twilio/audiohelper';
import {useDispatch , useSelector} from "react-redux";
import * as actionTypes from "../../../actions/types";

const UserModal = (props) => {
    const [image, setImage] = useState(null);
    const [profilePicName, setProfilePicName] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [isAssociateOwner, setIsAssociateOwner] = useState(false);
    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState("");
    const [orgName, setOrgName] = useState("");
    const [orgEmail, setOrgEmail] = useState("");
    const [orgDescription, setOrgDescription] = useState("");
    const [associationName, setAssociationName] = useState("");
    const [associationEmail, setAssociationEmail] = useState("");
    const [associationDescription, setAssociationDescription] = useState("");
    const [isFranchise, setIsFranchise] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        roleId: "",
        groupId: "",
        orgName: "",
        orgEmail: "",
        orgDescription: "",
        groupName: "",
        associationName: "",
        associationEmail: "",
        associationDescription: "",
        permission: ""
    });
    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);
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
    const dispatch = useDispatch();
    const messageDelay = 5000; // ms
    const [associationList, setAssociationList] = useState([]);
    const [associationId, setAssociationId] = useState('');
    const [saveAndNew, setSaveAndNew] = useState(false);
    const permissionMatrixRef = useRef();
    let editUser = props.createButton ? props.createButton : false;
    const fetchCountry = async () => {
        let conntryResponse = await ContactService.fetchCountry();
        setPhoneCountryCode(conntryResponse);
        console.log("country");
    };
    let zIndexBody = useSelector((state) => state.modal.zIndexBody);

    /**
     * Auto hide success or error message
     */
    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg]);

    /*
     * Fetch associaton list data
     */
    const fetchAssociations = async () => {
        try {
            let associations = await UserServices.fetchAssociations();
            if (associations) {
                setAssociationList(associations);
            }
            console.log('associations', associations);
        } catch (e) {
            console.log('Error in fetch associations', e);
        }
    };

    useEffect(() => {
        fetchCountry();
        fetchAssociations();
        fetchLoggedUserDetails();
    }, []);

    useEffect(() => {
        if (roles.length && props.createButton && props.createButton._id === undefined) {
            let defaultedRole = roles.filter(el => el.slug === 'default-role');
            console.log('defaultedRole', defaultedRole)
            if (defaultedRole.length) {
                setRoleId(defaultedRole[0]._id);
                getGroupsByRoleId(defaultedRole[0]._id);
            }
        }
    }, [roles, props.createButton]);

    useEffect(() => {
        console.log(groups.length && props.createButton && props.createButton._id === undefined)
        if (groups.length && !editUser) {
            let defaultedGroup = groups.filter(el => el.slug === 'default-group');
            console.log('defaultedGroup', defaultedGroup)
            if (defaultedGroup.length) {
                setGroupId(defaultedGroup[0]._id);
                setPermissionData(defaultedGroup[0].permissions);
                //Keep a original copy of permissions data
                setCopyPermissionData(JSON.parse(JSON.stringify(defaultedGroup[0].permissions)));
            }
        }
    }, [groups, props.createButton]);

    /**
     * LoggedIn user details
     */
    const [loggedInUser, setLoggedInUser] = useState({
        isOrganizationAssociationOwner: false,
    })
    const fetchLoggedUserDetails = async () => {
        try {
            let userDetails = await UserServices.fetchUserDetails();
            if (userDetails) {
                console.log('logged in user details', userDetails.isOrganizationOwner, userDetails.isAssociationOwner);
                setLoggedInUser({
                    isOrganizationAssociationOwner: (!userDetails.isOrganizationOwner && !userDetails.isAssociationOwner)
                })
            }
        } catch (e) {
            console.log('Error in fetch current user', e);
        }
    };

    const countrycodeOpt = phoneCountryCode ? phoneCountryCode.map((el, key) => {
        return (
            <option value={el.code} data-dailcode={el.prefix} key={key} >{el.code} ({el.prefix})</option>
        )
    }
    ) : '';

    const handelBasicinfoMobilePhon = (event) => {
        const { name, value } = event.target;
        if (name == "countryCode") {
            const daileCodeindex = event.target[event.target.selectedIndex];
            let dailCode = daileCodeindex != undefined ? daileCodeindex.getAttribute("data-dailcode") : "+1";
            setBasicinfoMobilePhone(prevState => ({ ...prevState, dailCode: dailCode }));
        }
        setBasicinfoMobilePhone(prevState => ({ ...prevState, [name]: value }));
    };
    // const bodyModal = useSelector((state) => state.modal.bodyModal);
    const closeSideMenu = (e) => {
        e.preventDefault();
        props.setCreateButton(null);

        // if(bodyModal) {
        //     dispatch({
        //       type: actionTypes.CLOSE_BODY_MODAL
        //     })
        //   } else {
        //     dispatch({
        //       type: actionTypes.OPEN_BODY_MODAL
        //     })
        //   }
    };


    let temp = [];

    useEffect(async () => {
        setImage(editUser.image ? (config.bucketUrl + editUser.image) : null);
        setEditId(editUser._id);
        setFirstName(editUser.firstName);
        setLastName(editUser.lastName);
        if (editUser.prefix) {
            console.log('phone country code', phoneCountryCode);
            let countyCode = phoneCountryCode && phoneCountryCode.filter(el => {
                return el.prefix === editUser.prefix
            });
            let editCountryCode = countyCode[0].code ? (editUser.prefix === '+1' ? "US" : countyCode[0].code) : 'US';
            setBasicinfoMobilePhone(prevState => ({
                ...prevState,
                dailCode: editUser.prefix,
                countryCode: editCountryCode
            }));
        }
        setPhoneNumber(editUser.phone);
        setEmail(editUser.email);
        if (editUser && editUser.role && editUser.group) {
            setRoleId(editUser.role[0]._id);
            getGroupsByRoleId(editUser.role[0]._id, true);
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
            setOrgEmail(editUser.organization.email);
            setOrgDescription(editUser.organization.description);
            setLogo(editUser.organization.logo ? (config.bucketUrl + editUser.organization.logo) : null);
            setLogoName(editUser.organization.logo);
            setAssociationId(editUser.organization.associationId);
        } else {
            setIsOwner(false);
        }

        //association edit details
        if (editUser.isAssociationOwner) {
            console.log("association owner")
            setIsAssociateOwner(true);
            setAssociationId(editUser.association._id);
            setAssociationName(editUser.association.name);
            setAssociationEmail(editUser.association.email);
            setAssociationDescription(editUser.association.description);
            setIsFranchise(editUser.association.isFranchise);
        } else {
            setIsAssociateOwner(false);
        }

        /**
         * Reset permissions
         */
        console.log(editUser)
        if (!editUser) {
            console.log('Reset permissions', basicinfoMobilePhone);
            setRoleId('');
            setGroupId('');
            setPermissionData([]);
            setIsModifiedPermission(false);
            setBasicinfoMobilePhone({
                countryCode: "US",
                dailCode: "+1",
                number: "1234567890"
            });
            //Reset org data
            setOrgName("");
            setOrgEmail("");
            setOrgDescription("");
            setLogo("");
            setLogoName("");
            setAssociationId("");
            //Reset association data
            setAssociationId("");
            setAssociationName("");
            setAssociationEmail("");
            setAssociationDescription("");
            if (roles.length && props.createButton && props.createButton._id === undefined) {
                let defaultedRole = roles.filter(el => el.slug === 'default-role');
                if (defaultedRole.length) {
                    setRoleId(defaultedRole[0]._id);
                    await getGroupsByRoleId(defaultedRole[0]._id);
                }
            }
            if (groups.length && props.createButton && props.createButton._id === undefined) {
                let defaultedGroup = groups.filter(el => el.slug === 'default-group');
                if (defaultedGroup.length) {
                    setGroupId(defaultedGroup[0]._id);
                    setPermissionData(defaultedGroup[0].permissions);
                    //Keep a original copy of permissions data
                    setCopyPermissionData(JSON.parse(JSON.stringify(defaultedGroup[0].permissions)));
                }
            }
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
            console.log('role fertched', result);
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
     * Send the data to group listing component
     * @param {*} data
     */
    const broadcastToParent = (data) => {
        props.getData(data);
    };

    /**
     * Function to fetch users
     * @returns 
     */
    const fetchUsers = async (pageId, queryParams = null) => {
        try {
            setIsLoader(true);
            const result = await UserServices.fetchUsers(pageId, queryParams);
            console.log('User listing result', result.users);
            if (result) {
                broadcastToParent(result);
            }
        } catch (e) {
            console.log("Error in user listing", e);
        } finally {
            setIsLoader(false);
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
        let pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(event.target.value)) {
            setPhoneNumber("");
        } else {
            setPhoneNumber(event.target.value);
        }
    };
    /**
     * Handle email address change
     * @param {*} event 
     */
    const handleEmailChange = (event) => {
        event.preventDefault();
        let emailAddress = event.target.value;
        let emailValid = emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailAddress.length < 3) return;
        if (emailValid) {
            setProcessing(false);
            setFormErrors({
                ...formErrors,
                email: ""
            });
        } else {
            setProcessing(true);
            setFormErrors({
                ...formErrors,
                email: "Invalid email address"
            });
        }
        setEmail(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        console.log('event user type', event.target.value);
        let userType = event.target.value;
        if (userType === 'organization') {
            setIsAssociateOwner(false);
            setIsOwner(true);
        } else {
            setIsOwner(false);
            setIsAssociateOwner(true);
        }
    }

    /**
     * Handle franchise type change
     * @param {*} event 
     */
    const handleFranchiseTypeChange = (event) => {
        console.log('event franchise type', event.target.value);
        let franchiseType = event.target.value;
        if (franchiseType === 'franchise') {
            setIsFranchise(true)
        } else {
            setIsFranchise(false);
        }
    }


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
     * Handle org name change
     * @param {*} event 
     */
    const handleOrgEmailChange = (event) => {
        event.preventDefault();
        setOrgEmail(event.target.value);
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
     * Handle associate name change
     * @param {*} event 
     */
    const handleAssociateNameChange = (event) => {
        event.preventDefault();
        setAssociationName(event.target.value);
    }

    /**
     * Handle associate email change
     * @param {*} event 
     */
    const handleAssociateEmailChange = (event) => {
        event.preventDefault();
        setAssociationEmail(event.target.value);
    }

    /**
     * Handle associate description change
     * @param {*} event 
     */
    const handleAssociateDescriptionChange = (event) => {
        event.preventDefault();
        setAssociationDescription(event.target.value)
    }

    /**
     * Handle role change 
     * @param {*} event 
     */
    const handleAssociatonChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setAssociationId(event.target.value);
        console.log('Set association id');
    }

    /**
     * Handle role change 
     * @param {*} event 
     */
    const handleRoleChange = (event) => {
        event.preventDefault();
        setRoleId(event.target.value);
        console.log(event.target.value)
        getGroupsByRoleId(event.target.value);
        // Set permissions to null
        console.log('Set permission data to null')
        permissionMatrixRef.current.resetPermissionsFn();
    }
    /**
     * Get groups by role ID
     * @param {*} event 
     */
    const getGroupsByRoleId = async (roleId, isEdit = false) => {
        setIsLoader(true);
        try {
            if (roleId) {
                const groups = await UserServices.fetchGroupsByRoleId(roleId);
                if (groups) {
                    console.log('Fetched groups', groups);
                    if (!isEdit) {
                        setGroupId('');
                    }
                    setGroups(groups);
                    if (props.createButton && props.createButton._id === undefined) {
                        let defaultedGroup = groups.filter(el => el.slug === 'default-group');
                        if (defaultedGroup.length) {
                            setGroupId(defaultedGroup[0]._id);
                            setPermissionData(defaultedGroup[0].permissions);
                            //Keep a original copy of permissions data
                            setCopyPermissionData(JSON.parse(JSON.stringify(defaultedGroup[0].permissions)));
                        }
                    }
                }
            } else {
                setGroups([]);
            }
        } catch (error) {
            console.error('Get groups', error);
        } finally {
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
        //Don't compare if clonePermissions is empty
        if (clonePermissions.length) {
            let isEqual = equals(clonePermissions, dataFromChild);
            console.log('is Equal', isEqual);
            //If pemission data not equal with original permission data
            if (!isEqual) {
                //Display group name input box
                setIsModifiedPermission(true);
                setPermissionData(dataFromChild);
                setGroupName('default-edited-group-'+(Math.random().toString(36)+'00000000000000000').slice(2, 7));
            } else {
                //Hide group name input box
                setIsModifiedPermission(false);
            }
        } else {
            setPermissionData([]);
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
         * Check valid email or not
         */
        if (email) {
            let isEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if (!isEmail) {
                isError = true;
                formErrorsCopy.email = "Invalid email address";
            }
        }

        /**
         * Check role field
         */
        if (!roleId) {
            isError = true;
            formErrorsCopy.roleId = "Please choose a role";
        }
        /**
         * Check group field
         */
        if (!groupId) {
            isError = true;
            formErrorsCopy.groupId = "Please choose a group";
        }
        /**
         * Check org name field
         */
        if (isOwner && !orgName) {
            isError = true;
            formErrorsCopy.orgName = "Please fillup the name";
        }
        /**
         * Check org email field
         */
        if (isOwner && !orgEmail) {
            isError = true;
            formErrorsCopy.orgEmail = "Please fillup the email";
        }

        if (orgEmail) {
            let isEmail = orgEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if (!isEmail) {
                isError = true;
                formErrorsCopy.orgEmail = "Invalid email address";
            }
        }

        /**
        * Check org description field
        */
        /* if (isOwner && !orgDescription) {
             isError = true;
             formErrorsCopy.orgDescription = "Please fillup the description";
         }*/
        /**
         * Check association name
         */
        if (isAssociateOwner && !associationName) {
            isError = true;
            formErrorsCopy.associationName = "Please fillup the name";

        }

        /**
         * Check association name
         */
        if (isAssociateOwner && !associationEmail) {
            isError = true;
            formErrorsCopy.associationEmail = "Please fillup the email";

        }

        /**
         * Check association description
         */
        if (isAssociateOwner && !associationDescription) {
            isError = true;
            formErrorsCopy.associationDescription = "Please fillup the description";

        }

        /**
         * Check new group name
         */
        if (isModifiedPermission && !groupName) {
            isError = true;
            formErrorsCopy.groupName = "Please fillup the group name";
        }
        if (permissionData.length === 0) {
            isError = true;
            formErrorsCopy.permission = "Please provide at least one permission.";
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
                roleId: formErrors.roleId,
                groupId: formErrors.groupId,
                orgName: formErrors.orgName,
                orgEmail: formErrors.orgEmail,
                orgDescription: formErrors.orgDescription,
                groupName: formErrors.groupName,
                associationName: formErrors.associationName,
                associationEmail: formErrors.associationEmail,
                associationDescription: formErrors.associationDescription,
                permission: formErrors.permission
            });
            document.getElementsByClassName('sideMenuBody')[0].scroll({
                top: 0,
                behavior: 'smooth',
            });
            setTimeout(
                () => setFormErrors({
                    ...formErrors,
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    roleId: "",
                    groupId: "",
                    groupName: "",
                    orgName: "",
                    orgEmail: "",
                    orgDescription: "",
                    associationName: "",
                    associationEmail: "",
                    associationDescription: "",
                    permission: ""
                }), 5000);
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
            let assoId = null;
            let orgPayload = null;
            if (isOwner) {
                let organizationName = orgName.trim();
                let slug = organizationName.replace(/\s+/g, '-').toLowerCase();
                orgPayload = {
                    name: orgName,
                    email: orgEmail,
                    slug: slug,
                    code: slug,
                    description: orgDescription,
                    associationId: associationId,
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
                            assoId = result.associationId;
                        })
                } catch (e) {
                    setProcessing(false);
                    setIsLoader(false);
                    if(e.response && e.response.data && e.response.data.message) {
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: e.response.data.message,
                            typeMessage: 'error'
                        });
                    } else if(e.response && e.response.data && typeof e.response.data == "string") {
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: e.response.data,
                            typeMessage: 'error'
                        });
                    } else {
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: e.message + ". Please contact support.",
                            typeMessage: 'error'
                        });
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
                prefix: basicinfoMobilePhone.dailCode,
                countryCode: basicinfoMobilePhone.countryCode,
                phone: phoneNumber,
                email: email,
                groupId: newGroupId ? newGroupId : groupId,
                image: profilePicName,
                organizationId: organizationId,
                isOwner: isOwner,
                isAssociateOwner: isAssociateOwner,
                associationId: assoId,
                association: {
                    name: associationName,
                    slug: associationName.toLowerCase().replace(' ', '-'),
                    email: associationEmail,
                    description: associationDescription,
                    isFranchise: isFranchise
                }
            };

            /**
             * Lets decide the operation type
             */
            let operationMethod = "createUser";
            if (editId) {
                operationMethod = "editUser";
                payload.id = editId;
            }
            //Attach association ID
            if (editId && associationId) {
                payload.association.id = associationId;
            }


            try {
                await UserServices[operationMethod](payload)
                    .then(result => {
                        console.log("Create user result", result)
                        let msg = 'User created successfully';
                        if (payload.id) {
                            msg = 'User updated successfully';
                        }
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: msg,
                            typeMessage: 'success'
                        });
                        if (saveAndNew) {
                            console.log('save and new')
                            setSaveAndNew(false);
                            // resetUserForm();
                            //Open group create modal
                            //setTimeout(() => {
                                props.setCreateButton(null);
                                props.setCreateButton('users');
                            //}, messageDelay);
                        } else {
                            console.log('else save and new');
                            //setTimeout(() => {
                                props.setCreateButton(null);
                            //}, messageDelay);
                        }
                        // Fetch users
                        fetchUsers(1);
                        //If creating association account
                        if (isAssociateOwner) {
                            fetchAssociations();
                        }
                        //if creating organization account
                        if (isOwner) {
                            console.log('updating org account with owner id');
                            orgPayload.id = organizationId;
                            orgPayload.ownerId = result._id;
                            OrganizationServices['update'](orgPayload)
                                .then(result => {
                                    console.log(" upOrg " + result);
                                })
                                .catch(error => {
                                    console.log(" upOrg " + error);
                                })
                        }
                    })
            } catch (e) {
                /**
                 * Segregate error by http status
                 */
                setProcessing(false);
                console.log("In user create", e);
                if (e.response && e.response.status == 403) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: "You dont have permission to perform this action.",
                        typeMessage: 'error'
                    });
                } else if (e.message) {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: e.message,
                        typeMessage: 'error'
                    });
                }
            } finally {
                setIsLoader(false);
                setProcessing(false);
            }

        }
    };

    const handleSaveAndNew = () => {
        setSaveAndNew(true);
    }

    return (
        <>
            {props.createButton !== null && (
                <div className="sideMenuOuter createSideModal sideUser" style={{zIndex: zIndexBody}}>
                    <div className="dialogBg" onClick={(e) => closeSideMenu(e)}></div>
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
                                Manage all the users details in your organization
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

                                {successMsg &&
                                    <div className="popupMessage success innerDrawerMessage">
                                        <p>{successMsg}</p>
                                    </div>
                                }
                                {errorMsg &&
                                    <div className="popupMessage error innerDrawerMessage">
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
                                                            <p>First Name <span className="mandatory">*</span></p>
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
                                                            <p>Last Name <span className="mandatory">*</span></p>
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
                                                            <p>Phone No <span className="mandatory">*</span></p>
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
                                                                    value={phoneNumber}
                                                                    onChange={handlePhoneNumberChange}
                                                                    className="cmnFieldStyle"
                                                                />
                                                            </div>
                                                            {formErrors.phoneNumber ? <span className="errorMsg">{formErrors.phoneNumber}</span> : ''}
                                                        </div>
                                                        <div className={formErrors.email ? "formField w-50 error" : "formField w-50"}>
                                                            <p>Email <span className="mandatory">*</span></p>
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
                                            {loggedInUser.isOrganizationAssociationOwner && !editId && isOrgPermission && (

                                                <div className="cmnFormRow">
                                                    <div className="cmnFieldName">Select Type</div>
                                                    <div className="cmnFormField radioGroup userTypeSelect" onChange={handleUserTypeChange}>
                                                        <label className="cmnFormRadioLable">
                                                            <div className="circleRadio">
                                                                <input type="radio" value="organization" name="userType" />
                                                                <span></span>
                                                            </div>
                                                            Organization
                                                        </label>
                                                        {false && <label className="cmnFormRadioLable">
                                                            <div className="circleRadio">
                                                                <input type="radio" value="association" name="userType" />
                                                                <span></span>
                                                            </div>
                                                            Association
                                                        </label> }
                                                    </div>

                                                    {/* <p className="">Is it organization owner?
                                                        <div className="customCheckbox marginLeft">
                                                            <input
                                                                type="checkbox"
                                                                name="isOrg"
                                                                defaultChecked={isOwner}
                                                                onChange={handleIsOrgChange}
                                                            />
                                                            <span></span>
                                                        </div>
                                                    </p> */}
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

                                                        </li>
                                                        <li>
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
                                                            <div className={formErrors.orgEmail ? "formField w-50 error" : "formField w-50"}>
                                                                <p>Organization Email</p>
                                                                <div className="inFormField">
                                                                    <input
                                                                        type="text"
                                                                        name="orgEmail"
                                                                        placeholder="Ex. Email"
                                                                        defaultValue={orgEmail}
                                                                        onChange={handleOrgEmailChange}
                                                                    />
                                                                </div>
                                                                {formErrors.orgEmail ? <span className="errorMsg">{formErrors.orgEmail}</span> : ''}
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
                                                        <li>
                                                            <div className="formField w-100">
                                                                <p>Associations</p>
                                                                <div className="inFormField">
                                                                    <select style={{
                                                                        backgroundImage: "url(" + arrowDown + ")",
                                                                    }}
                                                                        onChange={handleAssociatonChange}
                                                                        value={associationId ? associationId : ''}
                                                                    >
                                                                        <option value="">Select an association</option>
                                                                        {associationList ? associationList.map((el, key) => {
                                                                            return (
                                                                                <React.Fragment key={key + "_association"}>
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
                                            )}
                                            {isAssociateOwner && (
                                                <div className="infoInputs orgContent">
                                                    <ul>
                                                        <li>
                                                            <div className="cmnFormRow">
                                                                <p className="profilePicHeading">Association Information</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={formErrors.associationName ? "formField w-50 error" : "formField w-50"}>
                                                                <p>Association Name</p>
                                                                <div className="inFormField">
                                                                    <input
                                                                        type="text"
                                                                        name="associationName"
                                                                        placeholder="Ex. Falcon Inc."
                                                                        defaultValue={associationName}
                                                                        onChange={handleAssociateNameChange}
                                                                    />
                                                                </div>
                                                                {formErrors.associationName ? <span className="errorMsg">{formErrors.associationName}</span> : ''}
                                                            </div>
                                                            <div className={formErrors.associationEmail ? "formField w-50 error" : "formField w-50"}>
                                                                <p>Association Email</p>
                                                                <div className="inFormField">
                                                                    <input
                                                                        type="text"
                                                                        name="orgName"
                                                                        placeholder="Ex. Email"
                                                                        defaultValue={associationEmail}
                                                                        onChange={handleAssociateEmailChange}
                                                                    />
                                                                </div>
                                                                {formErrors.associationEmail ? <span className="errorMsg">{formErrors.associationEmail}</span> : ''}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={formErrors.associationDescription ? "formField w-100 error" : "formField w-100"}>
                                                                <p>Associate Description</p>
                                                                <div className="inFormField">
                                                                    <textarea
                                                                        name="associationDescription"
                                                                        placeholder="Its a great associate"
                                                                        defaultValue={associationDescription}
                                                                        onChange={handleAssociateDescriptionChange}
                                                                    >
                                                                    </textarea>
                                                                </div>
                                                                {formErrors.associationDescription ? <span className="errorMsg">{formErrors.associationDescription}</span> : ''}
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="cmnFieldName">Association Type</div>
                                                            <div className="cmnFormField radioGroup" onChange={handleFranchiseTypeChange}>
                                                                <label className="cmnFormRadioLable">
                                                                    <div className="circleRadio">
                                                                        <input type="radio" value="franchise" name="franchiseType" defaultChecked={isFranchise} />
                                                                        <span></span>
                                                                    </div>
                                                                    Franchise
                                                                </label>
                                                                <label className="cmnFormRadioLable">
                                                                    <div className="circleRadio">
                                                                        <input type="radio" value="non-franchise" name="franchiseType" defaultChecked={!isFranchise} />
                                                                        <span></span>
                                                                    </div>
                                                                    Non Franchise
                                                                </label>
                                                            </div>
                                                        </li>
                                                        {/* <li>
                                                            <div className="formField w-100">
                                                                <p>Organizations - Multiple</p>
                                                                <div className="inFormField">
                                                                    <select style={{
                                                                        backgroundImage: "url(" + arrowDown + ")",
                                                                    }}>
                                                                        <option>Gym1</option>
                                                                        <option>Gym2</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        {/*<div className="infoField assignRoleGroup">
                                            <p className="infoFieldHead">Assign Role & Group</p>
                                            <div className="infoInputs">
                                                <ul>
                                                    <li>
                                                        <div className={formErrors.roleId ? "formField w-50 error" : "formField w-50"}>
                                                            <p>Default user role <span className="mandatory">*</span></p>
                                                            <div className="inFormField">
                                                                <select
                                                                    style={{
                                                                        backgroundImage: "url(" + arrowDown + ")",
                                                                    }}
                                                                    onChange={handleRoleChange}
                                                                    value={roleId}
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
                                                        <div className={formErrors.groupId ? "formField w-50 error" : "formField w-50"}>
                                                            <p>Select a group <span className="mandatory">*</span></p>
                                                            <div className="inFormField">
                                                                <select
                                                                    style={{
                                                                        backgroundImage: "url(" + arrowDown + ")",
                                                                    }}
                                                                    onChange={handleGroupChange}
                                                                    value={groupId}
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
                                        </div>*/}
                                    </div>
                                    <div className={formErrors.permission ? "inFormField permissionMatrix error" : "inFormField permissionMatrix"}>
                                        <PermissionMatrix
                                            getData={getDataFn}
                                            ref={permissionMatrixRef}
                                            originalPermission={permissionData}
                                        />
                                    </div>
                                    {formErrors.permission ? <span className="errorMsg">{formErrors.permission}</span> : ''}
                                    <p className="staredInfo">
                                        * You can customize permissions for this user based on your need.
                                    </p>
                                    {/*{isModifiedPermission && <div className="newGroupName">
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
                                    </div>}*/}
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
                                        <button className="creatUserBtn createBtn" disabled={processing}>
                                            <img className="plusIcon" src={plus_icon} alt="" />
                                            <span>{editId ? "Update user" : "Create a user"}</span>
                                        </button>
                                        {!editId && <button className="saveNnewBtn" disabled={processing} onClick={handleSaveAndNew}>
                                            <span>Save & New</span>
                                            <img className="" src={arrow_forward} alt="" />
                                        </button>}
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
