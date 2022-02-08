import React, {useState, forwardRef, useRef, useImperativeHandle} from "react";
import ContactListing from "./ContactListing";

import ImportContact from "./importContact";

const Contact = () => {
    document.title = "Red Belt Gym - Contacts";
    const [isModal, setIsModal] = useState(false);
    const childCompRef = useRef()
    const openModal = () => {
      setIsModal(true);
    }
    const hideModal = () => {
      setIsModal(false);
      childCompRef.current.fetchContactForImportContactModalClose();
    }
    return (
    <>
      <ContactListing openModal={() => {openModal()}} modalStatus={isModal} ref={childCompRef}/>
        { isModal &&
            <ImportContact hideModal={() => {hideModal()}} />
        }
    </>
    );
};

export default Contact;
