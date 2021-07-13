import React from "react";
import ContactListing from "./ContactListing";

import ImportContactModal from "./importContactModal";

const contact = () => {
  return (
    <>
      <ContactListing />
      <ImportContactModal />
    </>
  );
};

export default contact;
