import React, { useState } from "react";
import GroupsListing from "./GroupsListing";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import Filter from '../../shared/FilterAuth.js'
import SideModal from '../../shared/SideModal'
import GroupModal from "./GroupModal";
import GroupFilter from "./GroupFilter";

const Groups = (props) => {
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
    setStateFilter(e);
  };

  /**
   * Get user from pagination component
   * @param {*} dataFromChild 
   */
   const getDataFn = (dataFromChild) => {
    //console.log('Filtered Data from child', dataFromChild);
    if(dataFromChild) {
      setFilteredData(dataFromChild);
    }
  }

  return (
    <div className="mainComponent">
      <div className={"dashboardBody d-flex f-align-center "  + (showLeftSubMenu ? "openSubmenu" : "")} >
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu toggleLeftSubMenu={toggleLeftSubMenu} />
          <div className="dashboardElComponent">
            <HeaderDashboard
              toggleCreate={toggleCreate}
              stateFilter={stateFilter}
            />
            <div className="dashInnerStructure">
              <GroupsListing
                toggleFilter={toggleFilter}
                toggleCreate={toggleCreate}
                getFilteredData={filteredData}
              />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Groups;
