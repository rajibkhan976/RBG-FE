import React, { useEffect, useState } from "react";
import RolesListing from "./RolesListing";

import RoleCreateModal from "../../shared/RoleModal";
import RoleFilter from "./RoleFilter";
// import SuccessAlert from "../../shared/messages/success";

const Roles = () => {
  document.title = "Red Belt Gym - Roles";
  console.log("Render Roles")
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
        // key={Math.random().toString()}
      />
      <RoleFilter
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        getData={getDataFn}
      />
      <RoleCreateModal
        createButton={createButton}
        setCreateButton={setCreateButton}
        getData={getDataFn}
      />
    </>
  );
};

export default Roles;
