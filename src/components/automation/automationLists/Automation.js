import React, { useState, lazy, Suspense } from "react";
import { useHistory, useLocation } from "react-router-dom";
// import AutomationBuilder from "./automationcanvas/AutomationBuilder";
import AutomationDetails from "../automationDetails/AutomationDetails";

import Loader from "../../shared/Loader";
const AutomationLists = lazy(() => import("./AutomationLists"));
const AutomationBuilder = lazy(() =>
  import("../automationcanvas/AutomationBuilder")
);

const Automation = (props) => {
  let history = useHistory();
  const pathURL = useLocation().pathname;
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
    setAutomationListItem(e);
  };

  const automationElementSet = (e) => {
    setAutomationElement(e);
  };

  return (
    <>
          {pathURL === "/automation-list" ? (
            <>
              <Suspense fallback={<Loader />}>
                <AutomationLists
                  toggleFilter={toggleFilter}
                  toggleCreate={toggleCreate}
                  automationListObject={automationListObject}
                  automationElementSet={automationElementSet}
                  key={Math.random().toString()}
                />
              </Suspense>
            </>
          ) : pathURL === "/automation-builder" ? (
            <>
              <Suspense fallback={<Loader />}>
                <AutomationBuilder
                  automationElement={automationElement}
                  toggleCreateAutomation={toggleCreateAutomation}
                />
              </Suspense>
            </>
          ) : pathURL === "/automation-details" ? (
            <>
              <AutomationDetails automationListItem={automationListItem} />
            </>
          ) : (
            ""
          )}
    </>
  );
};

export default Automation;
