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
    return (
    <>
      <ContactListing openModal={() => {openModal()}} key={Math.random().toString()}/>
        { isModal &&
            <ImportContact hideModal={() => {hideModal()}} />
        }
    </>
    );
};

export default Contact;
