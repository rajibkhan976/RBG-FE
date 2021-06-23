import React, { useState, lazy, Suspense } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import AutomationBuilder from "./automationcanvas/AutomationBuilder";
import AutomationDetails from './automationDetails/AutomationDetails';

import LeftMenu from "../../shared/LeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import Loader from "../../shared/Loader";
const AutomationLists = lazy(() => import('./AutomationLists'));
const AutomationBuilder = lazy(() => import('./automationcanvas/AutomationBuilder'));

const Automation = (props) => {
  let history = useHistory();
  const pathURL = useLocation().pathname;
  const [createButton, setCreateButton] = useState(null);
  const [stateFilter, setStateFilter] = useState(null);
  const [automationListItem, setAutomationListItem] = useState({});
  const [automationElement, setAutomationElement] = useState({});

  const toggleCreate = (e) => {
    history.push("/automation-builder");
  };
  const toggleCreateAutomation = (e) => {
    history.push("/automation-list");
  };
  const toggleFilter = (e) => {
    setStateFilter(e);
  };

  const automationListObject = (e) => {
    setAutomationListItem(e)
  }

  const automationElementSet = (e) => {
    setAutomationElement(e)
  }

  return (
    <div className="mainComponent">
      <div
        className={
          pathURL === "/automation-builder"
            ? "dashboardBody automationBuilderBody d-flex f-align-center"
            : pathURL === "/automation-list"
              ? "dashboardBody d-flex f-align-center"
              : "dashboardBody d-flex f-align-center"
        }
      >
        <LeftMenu />
        <div className="dashMain">
          {pathURL === "/automation-list" ? (
            <>
              <InnerLeftMenu />
              <div className="dashboardElComponent">
                <HeaderDashboard
                  toggleCreate={toggleCreate}
                  stateFilter={stateFilter}
                />
                <div className="dashInnerStructure">
                  <Suspense fallback={<Loader />}>
                    <AutomationLists
                      toggleFilter={toggleFilter}
                      toggleCreate={toggleCreate}
                      automationListObject={automationListObject}
                      automationElementSet={automationElementSet}
                    />
                  </Suspense>
                  <DashboardFooter />
                </div>
              </div>
            </>
          ) : pathURL === "/automation-builder" ? (
            <>
              <InnerLeftMenu createButton={createButton} />
              <div className="dashboardElComponent">
                <HeaderDashboard
                  toggleCreate={toggleCreate}
                  stateFilter={stateFilter}
                />
                <div className="dashInnerStructure">
                  <Suspense fallback={<Loader />}>
                    <AutomationBuilder
                      automationElement={automationElement}
                      toggleCreateAutomation={toggleCreateAutomation}
                    />
                  </Suspense>
                  <DashboardFooter />
                </div>
              </div>
            </>
          ) : pathURL === "/automation-details" ? (
            <>
              <InnerLeftMenu createButton={createButton} automationListItem={automationListItem} />
              <div className="dashboardElComponent">
                <HeaderDashboard
                  toggleCreate={toggleCreate}
                  stateFilter={stateFilter}
                />
                <div className="dashInnerStructure">
                  <AutomationDetails
                    automationListItem={automationListItem}
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
