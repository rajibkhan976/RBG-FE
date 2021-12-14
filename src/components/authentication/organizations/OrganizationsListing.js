import React, { useState, useEffect } from 'react';
import ConfirmBox from '../../shared/confirmBox';
import Loader from '../../shared/Loader';
import { ErrorAlert, SuccessAlert } from '../../shared/messages';
import ListHead from '../auth-shared/ListHead';
import list_board_icon from "../../../assets/images/list_board_icon.svg";


const OrganizationListing = () => {
    const [organizationsData, setOrganizationsData] = useState(null);
    const [organizationsCount, setOrganizationsCount] = useState(0);
    const [paginationData, setPaginationData] = useState(
        {
            count: null,
            totalPages: null,
            currentPage: 1,
            limit: 10
        }
    );
    const [isLoader, setIsLoader] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const messageDelay = 5000; // ms
    const [permissions, setPermissions] = useState(Object.assign({}, ...JSON.parse(localStorage.getItem("permissions")).filter(el => el.entity === "user")));


    return (
        <div className="dashInnerUI">
            {isLoader ? <Loader /> : ''}
            <ListHead />
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            {
                organizationsCount ?
                    <>
                        Organizations listing.

                    </> : 
                    <div className="createNew">
                    <span>
                        <img src={list_board_icon} alt="" />
                        <p>No Organizations found!</p>
                    </span>
                </div>
            }

        </div>
    )
}

export default OrganizationListing
