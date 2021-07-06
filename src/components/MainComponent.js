import React, { useState, Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeftMenu from "./shared/LeftMenu";
import HeaderDashboard from "./shared/HeaderDashboard";
import DashboardFooter from "./shared/FooterDashboard";
import InnerLeftMenu from "./shared/InnerLeftMenu";
import AuthActions from "../actions/AuthActions";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const AuthRoutes = lazy(() => import("./authentication/AuthRoutes"));
const AutomationRoutes = lazy(() => import("./automation/AutomationRoutes"));
const ContactRoutes = lazy(() => import("./contact/ContactRoutes"));
const NotFound = lazy(() => import("./shared/NotFound"));

const MainComponent = () => {
  const pathURL = useLocation().pathname;
  document.title = "Dashboard";
  const [createButton, setCreateButton] = useState(null);
  const [showLeftSubMenu, setShowLeftSubMenu] = useState(true);

  const toggleCreate = (e) => {
    console.log("DASHBOARD STRUCTURE:::", createButton);
    setCreateButton(e);
  };

  const toggleLeftSubMenu = (status = false) => {
    setShowLeftSubMenu(status);
  };

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <div className="mainComponent">
      <div
        className={
          "dashboardBody d-flex f-align-center " +
          (pathURL === '/automation-list' || pathURL === '/automation-builder' ? ' automationBuilderBody ' : '') +
          (showLeftSubMenu ? "openSubmenu" : "")
        }
      >
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu toggleLeftSubMenu={toggleLeftSubMenu} />
          <div className="dashboardElComponent">
            <HeaderDashboard toggleCreate={(e) => toggleCreate(e)} />
            <div className="dashInnerStructure">
              <Switch>
                <Route path={["/dashboard", "/dashboard"]} component={Dashboard} />
                <Route
                  path={["/roles", "/groups", "/users"]}
                  component={AuthRoutes}
                />
                <Route
                  path={["/automation-list", "/automation-builder"]}
                  component={AutomationRoutes}
                />
                <Route path="/contacts" component={ContactRoutes} />
                <Route path={["*", "/404"]} component={NotFound} />
              </Switch>
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
