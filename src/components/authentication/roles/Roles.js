import React, { useState } from 'react';
import RolesListing from "./RolesListing";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import Filter from '../../shared/FilterAuth.js'
import SideModal from '../../shared/SideModal'

const Roles = () => {
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);

  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  const toggleFilter = (e) => {
    setStateFilter(e)
  }
  
  return (
    <div className="mainComponent">
      <div className="dashboardBody d-flex f-align-center">
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu />
          <div className="dashboardElComponent">
            <HeaderDashboard 
              toggleCreate={toggleCreate} 
              stateFilter={stateFilter}
            />
            <div className="dashInnerStructure">
              <RolesListing
                toggleFilter={toggleFilter}
                toggleCreate={toggleCreate}
              />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
      <Filter
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
      />
      <SideModal
        createButton={createButton}
        setCreateButton={setCreateButton}
      />
    </div>
  );
};

export default Roles;
