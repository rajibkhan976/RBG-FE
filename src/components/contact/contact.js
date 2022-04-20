import React, {useState, forwardRef, useRef, useImperativeHandle, useEffect} from "react";
import ContactListing from "./ContactListing";

import ImportContact from "./importContact";
import Update from "./update";
import Filter from "./filter";

const Contact = () => {
    document.title = "Red Belt Gym - Contacts";
    const [isModal, setIsModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [filterApply, setFilterApply] = useState(false);
    const [allSelect, setAllSelect] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState(false);
    const [fetchContact, setFetchContact] = useState(false);
    const childCompRef = useRef()
    const openModal = () => {
        setIsModal(true);
    }
    const hideModal = () => {
        setIsModal(false);
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
    return (
        <>
            <ContactListing openModal={() => {openModal()}} modalStatus={isModal} ref={childCompRef}
                            openUpdate={() => {openUpdate()}} modalStatus={isUpdate}
                            openFilter={() => {openFilter()}} modalStatus={isFilter} filterApply={filterApply}
                            removeFilter={removeFilter} selectAllCheckboxValue={selectAllCheckbox} selectedContacts={selectedContactsFn} fetchContact={fetchContact}/>
            { isModal &&
                <ImportContact hideModal={() => {hideModal()}} />
            }
            { isUpdate &&
                <Update hideUpdate={() => {hideUpdate()}}  selectAllCheckbox={allSelect} selectedContacts={selectedContacts}/>
            }
            { isFilter &&
                <Filter hideFilter={() => {hideFilter()}} applyFilter={applyFilter}/>
            }
        </>
    );
};

export default Contact;
