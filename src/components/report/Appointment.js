import React, {useState} from "react";
import AppointmenttListing from "./AppointmenttListing";

import ImportFilter from "./importFilter";

const Appointment = () => {
  document.title = "Red Belt Gym - Appointments";
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
      <AppointmenttListing openModal={() => {openModal()}} modalStatus={isModal}/>
        { isModal &&
            <ImportFilter hideModal={() => {hideModal()}} />
        }
    </>
    );
};

export default Appointment;
