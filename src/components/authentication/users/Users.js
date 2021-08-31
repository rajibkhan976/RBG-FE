import React, { useState } from "react";
import UsersListing from "./UsersListing";

import UserModal from "./UserModal";
import UserFilter from "./UserFilter";
// import ConfirmBox from "../../shared/confirmBox";

const Users = (props) => {
  document.title = "Users";
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);

  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  const toggleFilter = (e) => {
    setStateFilter(e);
  };

  // key={Math.random().toString()}
  return (
    <>
      {/* <ConfirmBox/> */}
      <UsersListing toggleFilter={toggleFilter} toggleCreate={toggleCreate}/>
      <UserFilter stateFilter={stateFilter} setStateFilter={setStateFilter} />
      <UserModal
        createButton={createButton}
        setCreateButton={setCreateButton}
      />
    </>
  );
};

export default Users;
