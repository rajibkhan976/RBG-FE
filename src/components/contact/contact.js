import React, {useState} from "react";
import ContactListing from "./ContactListing";

import ImportContact from "./importContact";

const Contact = () => {
  document.title = "Contacts";
    const [isModal, setIsModal] = useState(false);
    const openModal = () => {
      setIsModal(true);
    }
    const hideModal = () => {
        setIsModal(false);
    }
    // key={Math.random().toString()}
    return (
    <>
      <ContactListing openModal={() => {openModal()}} modalStatus={isModal}/>
        { isModal &&
            <ImportContact hideModal={() => {hideModal()}} />
        }
    </>
    );
};

export default Contact;
