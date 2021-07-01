import React, { useState } from 'react';
import RolesListing from "./RolesListing";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import Filter from '../../shared/FilterAuth.js'
import RoleCreateModal from '../../shared/RoleModal'
import RoleFilter from './RoleFilter';

const Roles = () => {
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [showLeftSubMenu, setShowLeftSubMenu] = useState(true);

  const toggleLeftSubMenu = (status = false) => {
    setShowLeftSubMenu(status)
  };

  const toggleCreate = (e) => {                                                                       
    setCreateButton(e);
  };
  const toggleFilter = (e) => {
    setStateFilter(e)
  }
  /**
   * Get user from pagination component
   * @param {*} dataFromChild 
   */
  const getDataFn = (dataFromChild) => {
    console.log('Filtered Data from child', dataFromChild);
    if (dataFromChild) {
      setFilteredData(dataFromChild);
    }
  }
  
  return (
    <div className="mainComponent">
      <div className={"dashboardBody d-flex f-align-center "  + (showLeftSubMenu ? "openSubmenu" : "")}>
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu toggleLeftSubMenu={toggleLeftSubMenu}  />
          <div className="dashboardElComponent">
            <HeaderDashboard 
              toggleCreate={toggleCreate} 
              stateFilter={stateFilter}
            />
            <div className="dashInnerStructure">
              <RolesListing
                toggleFilter={toggleFilter}
                toggleCreate={toggleCreate}
                getFilteredData={filteredData}
              />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
      <RoleFilter
        stateFilter={stateFilter}
        setStateFilter={setStateFilter}
        getData={getDataFn}
      />
      <RoleCreateModal
        createButton={createButton}
        setCreateButton={setCreateButton}
      />
    </div>
  );
};

export default Roles;
