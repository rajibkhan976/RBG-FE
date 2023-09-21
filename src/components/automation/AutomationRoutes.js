import React, { useEffect, useState } from "react";
import Automation from "./automationLists/Automation";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import { Route, Switch, useLocation } from "react-router-dom";
import DashboardFooter from "../shared/FooterDashboard";
import NotFound from "../shared/NotFound";
import SidebarLogo from "../../assets/images/logo_128_28.svg";
import { FilterAction } from "../../actions/FilterAction";
import { EmailSubjectAction } from "../../actions/EmailSubjectAction";
import { getTagListData } from "../../actions/TagActions";
import { useDispatch } from "react-redux";

const AutomationRoutes = (props) => {
  document.title = "Red Belt Gym - Automations";
  const location = useLocation();
  const [roleMenu, setRoleMenu] = useState("automationList");
  const dispatch = useDispatch();
  
  useEffect(() => {
    switch (location.pathname) {
      case "/automation-list":
        setRoleMenu("automationList");
        break;
      case "/automation-builder":
        setRoleMenu("automationBuilder");
        break;
      case "/automation-details":
        setRoleMenu("automationDetails");
        break;
    }
  }, [location.pathname]);
  useEffect(()=>{
    dispatch(FilterAction());
    dispatch(EmailSubjectAction());
    dispatch(getTagListData());
},[dispatch]);
  return (
    <React.Fragment>
      <div className="menuDetails lessLeftMenu">
        <figure className="logoSidebar">
          <img src={SidebarLogo} alt="" />
        </figure>
      </div>
      <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu={roleMenu} />
      <div className={location.pathname === "/automation-list" ? "dashboardElComponent fullWithContainer" : "dashboardElComponent"}>
        {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
        <div className="dashInnerStructure">
          <Switch>
            <Route exact path={["/automation-list", "/automation-builder", "/automation-details/:automationId"]} component={Automation} />
            {/* <Route path={["*"]} component={NotFound} /> */}
          </Switch>
          <DashboardFooter />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AutomationRoutes;
