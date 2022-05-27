import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../assets/css/credit.css";
import CreatePackageModal from "./CreatePackageModal";
import plusIcon from "../../../../assets/images/plus_icon.svg";
import noReconrsImg from "../../../../assets/images/noRecords.svg";
import { CreditManagementServices } from "../../../../services/setup/CreditManagementServices";
import Loader from "../../../shared/Loader";
import PackagePurchase from "./PackagePurchase";
import RestrictionPackageModal from "./RestrictionPackageModal";
import { utils } from "../../../../helpers";
import * as actionTypes from "../../../../actions/types";
import ConfirmBox from "../../../shared/confirmBox";

const PackageSetup = () => {
    document.title = "Red Belt Gym - Credit Management";

    const [creditPackages, setCreditPackages] = useState([]);
    const [currentCreditPackageId, setcurrentCreditPackageId] = useState(null);
    const [createPackageModal, setCreatePackageModal] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [editPackageItem, setEditPackageItem] = useState('');
    const [isOrganization, setIsOrganization] = useState(false);

    const loggedInUser = useSelector((state) => state.user.data);
    

    const [isAlert, setIsAlert] = useState({
        show: false,
        id: null,
    });
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        if (isDeleted) {
            console.log("delete state changed", isDeleted);
            fetchPackages();
        }
    }, [isDeleted]);


    const dispatch = useDispatch();

    const openCreatePackageModal = () => {
        setCreatePackageModal(true);
        setEditPackageItem('');
    };
    const closeModal = () => {
        setCreatePackageModal(false);
    };

    const fetchPackages = async () => {
        try {
            setIsLoader(true);
            const response = await CreditManagementServices.fetchPackages();
            console.log('packages ', response);
            setCreditPackages(response.packages);
            setIsOrganization(response.isOrganizationOwner === 'true');
            setcurrentCreditPackageId(response.currentPackageId)
        } catch (e) {
            console.log('Error in fetch credit packages', e);
        } finally {
            setIsLoader(false);
        }
    }

    useEffect(() => {
        fetchPackages();
    }, []);

    //Edit package
    const editPackage = (item) => {
        if(!item.organizationCount) {
            setCreatePackageModal(true);
            setEditPackageItem(item);
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: `You can't edit the package, as the package purchased by ${(item.organizationCount)} organization(s).`,
                typeMessage: 'warning'
            });
        }
    };

    //Delete package restriction
    const deletePackageRestriction = (item) => {
        if(!item.organizationCount) {
            deletePackage(item._id);
        } else {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: `You can't delete the package, as the package purchased by ${(item.organizationCount)} organization(s).`,
                typeMessage: 'warning'
            });
        }

    }

    //Delete package
    const deletePackage = async (itemId, isConfirmed = null, ) => {
        console.log('Delete package', itemId);
        if (!isConfirmed && itemId) {
            setIsAlert({
                show: true,
                id: itemId,
            });
        } else if (isConfirmed == "yes" && itemId) {
            setIsLoader(true);
            await CreditManagementServices.deletePackage(itemId)
                .then((result) => {
                    if (result) {
                        console.log("Package delete result", result);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: `Package deleted successfully.`,
                            typeMessage: 'success'
                        });
                        setIsDeleted(true);
                    }
                })
                .catch((e) => {
                    dispatch({
                        type: actionTypes.SHOW_MESSAGE,
                        message: e.message,
                        typeMessage: 'error'
                    });
                })
                .finally(() => {
                    setIsAlert({
                        show: false,
                        id: null,
                    });
                    setIsLoader(false);
                    setIsDeleted(false);
                });
        } else {
            setIsAlert({
                show: false,
                id: null,
            });
        }
    };

    //Toggle status
    const togglePackageStatus = async (id, key) => {
        console.log('Toggle package status', id);
        try {
            creditPackages[key].status = !creditPackages[key].status;
            setCreditPackages([...creditPackages]);
            setIsLoader(true);
            await CreditManagementServices.toggleStatus(id);
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: `Package status ${(creditPackages[key].status) ? 'activated' : 'deactivated'} successfully.`,
                typeMessage: 'success'
            });
        } catch (e) {
            creditPackages[key].status = !creditPackages[key].status;
            setCreditPackages([...creditPackages]);
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    }


    //Toggle favourite
    const toggleFavouritePackage = async (id, key) => {
        console.log('Toggle favourite package', id, creditPackages[key].isFavourite);
        try {
            creditPackages[key].isFavourite = !creditPackages[key].isFavourite;
            setCreditPackages([...creditPackages]);
            setIsLoader(true);
            await CreditManagementServices.toggleFavourite(id);
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: `Package ${(creditPackages[key].isFavourite) ? 'added as' : 'removed from'} favourite successfully.`,
                typeMessage: 'success'
            });
        } catch (e) {
            creditPackages[key].isFavourite = !creditPackages[key].isFavourite;
            setCreditPackages([...creditPackages]);
            setIsLoader(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        }
    }

    return (
        <React.Fragment>
            {isLoader ? <Loader /> : ""}
            {isAlert.show ? (
                <ConfirmBox
                    callback={(isConfirmed) => deletePackage(isAlert.id, isConfirmed)}
                />
            ) : (
                ""
            )}
            {isOrganization ?
                <PackagePurchase packages={creditPackages} currentCreditPackageId={currentCreditPackageId} fetchPackages={fetchPackages} />
                :
                <div className="cr_body">
                    <div className="userListHead">
                        <div className="listInfo">
                            <ul className="listPath">
                                <li key="setup">Setup</li>
                                <li key="credit">Credit</li>
                                <li key="package">Package</li>
                            </ul>
                            <h2 className="inDashboardHeader">Package ({creditPackages.length})</h2>
                            <p className="userListAbout">Create &amp; Manage new packages for Organizations</p>
                        </div>
                        <div className="listFeatures">
                        {loggedInUser && loggedInUser.organizationCode === 'rbg' ? <button className="creatUserBtn" onClick={openCreatePackageModal}>
                                <img className="plusIcon" src={plusIcon} alt="" /><span>Create a new package</span>
                            </button> : ''}
                        </div>
                    </div>
                    <div className="cr_packageBody">
                        {creditPackages.length ?
                            <div className="cr_packageList">
                                {creditPackages.length ? creditPackages.map((item, index) => {
                                    return (
                                        <div className={item.isFavourite ? "cr_package fev" : "cr_package"} key={index + "_packages"}>
                                            <div className="cr_packageHead">
                                                <div className="cr_packageHeadLeft">
                                                    <h2>{utils.generateExcerpt(item.name)}</h2>
                                                    <button type="button" className={item.isFavourite ? "cr_heartBtn active" : "cr_heartBtn"} onClick={() => {
                                                        toggleFavouritePackage(item._id, index);
                                                    }}></button>
                                                </div>
                                                <div className="cr_packageHeadRight">
                                                    <button type="button" className="cr_editPackageBtn" onClick={() => {
                                                        editPackage(item);
                                                    }}></button>
                                                    <button type="button" className="cr_deletePackageBtn" onClick={() => {
                                                        deletePackageRestriction(item);
                                                    }}></button>
                                                    <div className={item.status ? "cr_toggleBtn toggleBtn active" : "cr_toggleBtn toggleBtn"} onClick={() => {
                                                        togglePackageStatus(item._id, index);
                                                    }}>
                                                        <input type="checkbox" />
                                                        <span className="toggler"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cr_packageBody">
                                                <div className="cr_creditBalance">
                                                    <h3>Credit Balance</h3>
                                                    <p>{Number(item.credit).toLocaleString()}</p>
                                                </div>
                                                <div className="cr_price">
                                                    <h3>Package Price</h3>
                                                    <p>$ {Number(item.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : ""}
                            </div>
                            :
                            <div className="noDataSec">
                                <img src={noReconrsImg} className="noRecords" alt="" />
                                <h2>No Package Found</h2>
                                <p>No package have been listed here yet</p>
                                { isOrganization ? <button className="creatUserBtn" onClick={openCreatePackageModal}>
                                    <img className="plusIcon" src={plusIcon} alt="" /><span>Create the first package</span>
                                </button> : ''}
                            </div>
                        }
                    </div>
                </div>
            }
            {createPackageModal &&
                <CreatePackageModal
                    closeModal={closeModal}
                    fetchPackages={fetchPackages}
                    editPackageItem={editPackageItem} />}

            {false && <RestrictionPackageModal/>}

        </React.Fragment>
    )
}

export default PackageSetup;