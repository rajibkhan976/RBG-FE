import React, { useState } from "react";
import AutomationLists from "./AutomationLists";
import AutomationBuilder from "./automationcanvas/AutomationBuilder";

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";

const Automation = (props) => {
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);

  const toggleCreate = (e) => {
    console.log("AUTOMATION DASHBOARD:::", e);
    setCreateButton(e);
  };
  const toggleFilter = (e) => {
    setStateFilter(e);
  };

  return (
    <div className="mainComponent">
      <div className={createButton === "automation" ? "dashboardBody automationBuilderBody d-flex f-align-center" : "dashboardBody d-flex f-align-center"}>
        <LeftMenu />
        <div className="dashMain">
          {createButton === null ? (
            <>
              <InnerLeftMenu />
              <div className="dashboardElComponent">
                <HeaderDashboard
                  toggleCreate={toggleCreate}
                  stateFilter={stateFilter}
                />
                <div className="dashInnerStructure">
                  <AutomationLists
                    toggleFilter={toggleFilter}
                    toggleCreate={toggleCreate}
                  />
                  <DashboardFooter />
                </div>
              </div>
            </>
          ) : createButton === "automation" ? (
            <>
              <InnerLeftMenu
                createButton={createButton}
              />
              <div className="dashboardElComponent">
                <HeaderDashboard
                  toggleCreate={toggleCreate}
                  stateFilter={stateFilter}
                />
                <div className="dashInnerStructure">
                  <AutomationBuilder
                    toggleFilter={toggleFilter}
                    toggleCreate={toggleCreate}
                  />
                  <DashboardFooter />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Automation;
