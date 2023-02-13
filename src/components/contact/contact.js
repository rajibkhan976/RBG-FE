import React, {useState, forwardRef, useRef, useImperativeHandle, useEffect} from "react";
import ContactListing from "./ContactListing";

import ImportContact from "./importContact";
import Update from "./update";
import Filter from "./filter";

import BulkSms from "./action/bulkSms";
import BulkEmail from "./action/bulkEmail";
import BulkAutomation from "./action/bulkAutomation";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../actions/types";
import { EmailServices } from "../../services/setup/EmailServices";

const Contact = (props) => {
    const dispatch = useDispatch();
    document.title = "Red Belt Gym - Contacts";
    const [isModal, setIsModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [filterApply, setFilterApply] = useState(false);
    const [allSelect, setAllSelect] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState(false);
    const [fetchContact, setFetchContact] = useState(false);
    const [bulkSmsOpenModal, setBulkSmsOpenModal] = useState(false);
    const [bulkEmailOpenModal, setBulkEmailOpenModal] = useState(false);
    const [bulkAutomationOpenModal, setBulkAutomationOpenModal] = useState(false);
    const [unCheckAllBoxs, setUnCheckAllBoxs] = useState(false);
    const childCompRef = useRef();
    // const [singleEmailContact, setSingleEmailContact] = useState(false);
    // const [singlePhoneContact, setSinglePhoneContact] = useState(false);
    const [numberOfContact, setNumberOfContact] = useState(false);
    const [emailSetupData, setEmailSetupData] = useState({
        "host": "",
        "port": "",
        "user": "",
        "pass": "",
    });
    const openModal = () => {
        setIsModal(true);
    }
    const hideModal = () => {
        setIsModal(false);
        setBulkSmsOpenModal(false);
        setBulkEmailOpenModal(false);
        setBulkAutomationOpenModal(false);
    }
    
    const openUpdate = () => {
        setIsUpdate(true);
    }
    const hideUpdate = () => {
        setIsUpdate(false);
        setFetchContact(true);
    }
    const openFilter = () => {
        setIsFilter(true);
    }
    const hideFilter = () => {
        setIsFilter(false);
    }
    const applyFilter = () => {
        setFilterApply(true);
        hideFilter();
    }
    const removeFilter = () => {
        setFilterApply(false);
    }
    const selectAllCheckbox = (flag) => {
        setAllSelect(flag);
    }
    const selectedContactsFn = (contacts) => {
        if (Array.isArray(contacts)) {
            let sc = contacts.filter(el => el.checked).map(el => {
                return el.id
            });
            setSelectedContacts(sc)
        }
    }
    useEffect(() => {
        if (filterApply) {
            setTimeout(() => {
                setFilterApply(false);
            }, 200);
        }
    }, [filterApply]);
    useEffect(() => {
        if (fetchContact) {
            setTimeout(() => {
                setFetchContact(false);
            }, 200)
        }
    }, [fetchContact])




    const setSmsOpenModalFunc = () =>{
        setBulkSmsOpenModal(true);
    }
    const setEmailOpenModalFunc = () =>{
        setBulkEmailOpenModal(true);
    }
    const setAutomationOpenModalFunc = () =>{
        setBulkAutomationOpenModal(true);
    }
    const fetchEmail = async () => {
        try {
            await EmailServices.fetchSetupEmail();
            setEmailSetupData(true);
        } catch (e) {
            setEmailSetupData(false);
            dispatch({
                type: actionTypes.SHOW_MESSAGE,
                message: e.message,
                typeMessage: 'error'
            });
        } 
    };
    useEffect(()=>{
        fetchEmail();
        // fetchEmailStatus();
        // console.log("device in contact", props.device);
    },[])
    const searchContactList = (data)=>{
        // console.log("contact js search contact list", data);
    }
    
    const unCheckAll = ()=>{
        setUnCheckAllBoxs(true);
        // console.log("un check all boxes", unCheckAllBoxs);
    }
    useEffect(() => {
        if (unCheckAllBoxs) {
            setTimeout(() => {
                // console.log("set time out call");
                setUnCheckAllBoxs(false);
            }, 200)
        }
    }, [unCheckAllBoxs])
    const singleContactStatusFunc = (data)=>{
        console.log("contact js data", data);
        if(data.length === 1){
           setNumberOfContact(true)
        }else if(data.length === 0){
            setNumberOfContact(false);
        }
    }
    // const setSingleContact = (data)=>{
    //     console.log("contact js single contact data", data);
    //     data?.filter(ele =>{
    //         console.log(ele.emailId !== "" , ele.phoneNo !== "");
    //         if(ele.emailId !== ""){
    //             // setSingleEmailContact(true);
    //             // setBulkEmailOpenModal (true);
    //         }
    //         else{
    //             // setSingleEmailContact(false);
    //             // dispatch({
    //             //     type: actionTypes.SHOW_MESSAGE,
    //             //     message: "no email id is there",
    //             //     typeMessage: 'error'
    //             // });
    //         }
    //         if(ele.phoneNo !== ""){
    //             // setSinglePhoneContact(true);
    //             // setBulkSmsOpenModal(true);
    //         }
    //         else{
    //             // setSinglePhoneContact(false);
    //             // dispatch({
    //             //     type: actionTypes.SHOW_MESSAGE,
    //             //     message: "no phone number is there",
    //             //     typeMessage: 'error'
    //             // });
    //         }
    //         // setSingleEmailContact(false);
    //         // setSinglePhoneContact(false);
    //     })
    // }

    return (
        <>
            <ContactListing openModal={() => {openModal()}} modalStatus={isModal} ref={childCompRef}
                            openUpdate={() => {openUpdate()}} modalStatus={isUpdate}
                            openFilter={() => {openFilter()}} modalStatus={isFilter} filterApply={filterApply}
                            removeFilter={removeFilter} selectAllCheckboxValue={selectAllCheckbox} selectedContacts={selectedContactsFn} fetchContact={fetchContact}
                            setBulkSmsOpenModal={()=>{setSmsOpenModalFunc()}}
                            setBulkEmailOpenModal={()=>{setEmailOpenModalFunc()}}
                            setBulkAutomationOpenModal={()=>{setAutomationOpenModalFunc()}}
                            searchContactList={searchContactList}
                            unCheckCloseFun={unCheckAllBoxs}
                            setSingleContactStatus={singleContactStatusFunc}
                            // setSingleContact={setSingleContact}
                            />
            { isModal &&
                <ImportContact hideModal={() => {hideModal()}} />
            }
            { isUpdate &&
                <Update hideUpdate={() => {hideUpdate()}}  selectAllCheckbox={allSelect} selectedContacts={selectedContacts}/>
            }
            { isFilter &&
                <Filter hideFilter={() => {hideFilter()}} applyFilter={applyFilter}/>
            }
            {bulkSmsOpenModal && "status" in props.device && props.device?.status() == 'ready' ?
                <BulkSms hideModal={() => {hideModal()}} selectedContacts={selectedContacts} selectAllCheckbox={allSelect} unCheckAll={()=>{unCheckAll()}} numberOfContact={numberOfContact} />:""
            }
            {bulkEmailOpenModal && emailSetupData ?
                <BulkEmail hideModal={() => {hideModal()}} selectedContacts={selectedContacts} selectAllCheckbox={allSelect} unCheckAll={()=>{unCheckAll()}} numberOfContact={numberOfContact} /> : ""
            }
            {bulkAutomationOpenModal &&
                <BulkAutomation hideModal={() => {hideModal()}} />
            }
        </>
    );
};

export default Contact;
