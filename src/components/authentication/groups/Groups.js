import React, { useState } from "react";
import GroupsListing from "./GroupsListing";

import GroupModal from "./GroupModal";
import GroupFilter from "./GroupFilter";

const Groups = (props) => {
  document.title = "Groups";
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
    //console.log('Filtered Data from child', dataFromChild);
    if (dataFromChild) {
      setFilteredData(dataFromChild);
    }
  };

  return (
    <>
      {/* <SuccessAlert/> */}
      <GroupsListing
        toggleFilter={toggleFilter}
        toggleCreate={toggleCreate}
        getFilteredData={filteredData}
        key={Math.random().toString()}
      />
      <GroupFilter
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        getData={getDataFn}
      />
      <GroupModal
        createButton={createButton}
        setCreateButton={setCreateButton}
        getData={getDataFn}
      />
    </>
  );
};

export default Groups;
