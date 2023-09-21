import React, {useState, useEffect, useRef} from "react";

import plus_icon from "../../../../assets/images/plus_icon.svg";
import {utils} from "../../../../helpers";
import List from "./list";
import Preview from "./preview";
import CreateTemplate from "./create";
import {SMSServices} from "../../../../services/template/SMSServices";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";
import Loader from "../../../shared/Loader";

const EmailTemplate = () => {
    const [keyword, setKeyword] = useState(null);
    const [emailModal, setEmailModal] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [mergeFields, setMergeFields] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const dispatch = useDispatch();
    const [clickOnSearch, setClickOnSearch] = useState(false);

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
        setClickOnSearch(false);
    };

    
    const handleSearch = (event) => {
        event.preventDefault();
        utils.addQueryParameter("page", 1);
        if (keyword) {
            utils.addQueryParameter("search", keyword);
        } else {
            utils.removeQueryParameter("search");
        }
       // setUpdatelistOnList(true)
       setClickOnSearch(true)
    };

    const openModal = () => {
        setEmailModal(true);
    };


    const closeModal = () => {
        setEmailModal(false);
    };

    const fetchSMSTags = async () => {
        try {
            const result = await SMSServices.fetchSMSTags()
            if (result) {
                setMergeFields(result)
            }
        } catch (error) {
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: error.message,
                typeMessage: 'error'
            });
        }
    }
    const loaderSet = (value) => {
        // console.log("Loader value", value);
        setIsLoader(value);
    }

    const handleSelectedEmail = (emailObj) => {
        setSelectedEmail(emailObj)
    }
    useEffect(() => {
        fetchSMSTags();
    }, []);

    
    const [updatelistOnList, setUpdatelistOnList] = useState(false);

    const updateList = (data) =>{
        setUpdatelistOnList(data) ;
    }
    const changeUpdatelistOnList = (data) =>{
        setUpdatelistOnList(data) ;
    }
    

    return (
        <div className="dashInnerUI emailListingPage">
            <div className="userListHead">
                <div className="listInfo">
                    <ul className="listPath">
                        <li>Setting</li>
                        <li>Templates</li>
                        <li>Email Template</li>
                    </ul>
                    <h2 className="inDashboardHeader">Email Template</h2>
                    <p className="userListAbout">Set Email communication templates</p>
                </div>
                <div className="listFeatures">
                    <div className="searchBar searchbar2">
                        <form onSubmit={handleSearch}>
                            <input
                                type="search"
                                name="search"
                                placeholder="Search Email templates"
                                autoComplete="off"
                                onChange={handleKeywordChange}
                                value={keyword}
                            />
                            <button className="searchIcon"></button>
                        </form>
                    </div>
                    <button
                        className="creatUserBtn"
                        onClick={openModal}
                    > 
                        <img className="plusIcon" src={plus_icon} alt=""/>
                        <span>Create an Email Template</span>
                    </button>
                </div>
            </div>
            <div className={"userListBody emailListing d-flex " + (!selectedEmail ? "fullScreen" : "partial") }>
                { isLoader && <Loader/>}
                <List selectedEmail={handleSelectedEmail} keyword={keyword} setIsLoader={loaderSet} 
                  updatelistOnList={updatelistOnList}
                  changeUpdatelistOnList = {(data)=>changeUpdatelistOnList(data)}
                 clickOnSearch={clickOnSearch}
                  />
                <Preview selectedEmail={selectedEmail} mergeFields={mergeFields}  updateList={(newData)=>updateList(newData)}/>

            </div>
            {emailModal ?
                <CreateTemplate closeModal={closeModal} openModal={openModal} 
                setIsLoader={loaderSet} updateList={(newData)=>updateList(newData)} mergeFields={mergeFields}/> : ""}
        </div>
    );
};

export default EmailTemplate;
