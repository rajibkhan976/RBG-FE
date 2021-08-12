import React, { useState, lazy } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
import LeftMenu from "./shared/LeftMenu";
import DashboardRoutes from "./dashboard/DashboardRoutes"
import AuthRoutes from "./authentication/AuthRoutes";
import AutomationRoutes from "./automation/AutomationRoutes";
import ContactRoutes from "./contact/ContactRoutes";
import NotFound from "./shared/NotFound";

const MainComponent = () => {
  const pathURL = useLocation().pathname;
  const [showInnerleftMenu, setshowInnerleftMenu] = useState(true);
  const [createButton, setCreateButton] = useState(null);

  const toggleLeftSubMenu = (status = false) => {
    setshowInnerleftMenu(status);
  };
  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  return (
    <div className="mainComponent">
      <div
        className={
          "dashboardBody d-flex f-align-center " +
          (pathURL === '/automation-list' || pathURL === '/automation-builder' ? ' automationBuilderBody ' : '') +
          (showInnerleftMenu ? "openSubmenu" : "")
        }
      >
        <LeftMenu />
        <div className="dashMain">
          <Switch>
            <Route exact path="/dashboard">
              <DashboardRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}/>
            </Route>
            <Route exact path={["/roles", "/groups", "/users"]}>
              <AuthRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}/>
            </Route>
            <Route exact path={["/automation-list", "/automation-builder"]}>
              <AutomationRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}/>
            </Route>
            <Route exact path="/contacts">
              <ContactRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}/>
            </Route>
            <Route path="*">
              <NotFound toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}/>
            </Route>
            <Route exact path="/" component={() => <Redirect to="/dashboard" />} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
