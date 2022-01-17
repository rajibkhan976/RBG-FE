import React, {useState} from "react";
import ContactListing from "./ContactListing";

import ImportFilter from "./importFilter";

const Appointment = () => {
  document.title = "Red Belt Gym - Contacts";
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
            <ImportFilter hideModal={() => {hideModal()}} />
        }
    </>
    );
};

export default Appointment;
