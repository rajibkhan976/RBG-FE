import React, {useState} from "react";
import AttendenceListing from "./AttendenceListing";

import ImportFilter from "./importFilter";

const Attendence = () => {
  document.title = "Red Belt Gym - Attendence";
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
      <AttendenceListing openModal={() => {openModal()}} modalStatus={isModal}/>
        { isModal &&
            <ImportFilter hideModal={() => {hideModal()}} />
        }
    </>
    );
};

export default Attendence;
