import React, { useState } from "react";
import RolesListing from "./RolesListing";

import RoleCreateModal from "../../shared/RoleModal";
import RoleFilter from "./RoleFilter";
// import SuccessAlert from "../../shared/messages/success";

const Roles = () => {
  document.title = "Roles";
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  
  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  const toggleFilter = (e) => {
    setStateFilter(e);
  };
  /**
   * Get user from pagination component
   * @param {*} dataFromChild
   */
  const getDataFn = (dataFromChild) => {
    console.log("Filtered Data from child", dataFromChild);
    if (dataFromChild) {
      setFilteredData(dataFromChild);
    }
  };

  return (
    <>
    {/* <SuccessAlert/> */}
      <RolesListing
        toggleFilter={toggleFilter}
        toggleCreate={toggleCreate}
        getFilteredData={filteredData}
      />
      <RoleFilter
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        getData={getDataFn}
      />
      <RoleCreateModal
        createButton={createButton}
        setCreateButton={setCreateButton}
      />
    </>
  );
};

export default Roles;
