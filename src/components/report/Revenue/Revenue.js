import React, {useState} from "react";
import RevenueListing from "./RevenueListing";

import ImportFilter from "./importFilter";

const Revenue = () => {
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
      <RevenueListing openModal={() => {openModal()}} modalStatus={isModal}/>
        { isModal &&
            <ImportFilter hideModal={() => {hideModal()}} />
        }
    </>
    );
};

export default Revenue;
