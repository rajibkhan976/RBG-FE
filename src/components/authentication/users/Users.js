import React, { useState } from "react";
import UsersListing from "./UsersListing";

import UserModal from "./UserModal";
import UserFilter from "./UserFilter";
// import ConfirmBox from "../../shared/confirmBox";

const Users = (props) => {
  document.title = "Red Belt Gym - Users";
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

  // key={Math.random().toString()}
  return (
    <>
      {/* <ConfirmBox/> */}
      <UsersListing toggleFilter={toggleFilter} toggleCreate={toggleCreate} getFilteredData={filteredData}/>
      <UserFilter stateFilter={stateFilter} setStateFilter={setStateFilter} />
      <UserModal
        createButton={createButton}
        setCreateButton={setCreateButton}
        getData={getDataFn}
      />
    </>
  );
};

export default Users;
