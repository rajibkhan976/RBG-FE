import React, { useState, lazy, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import LeftMenu from "./shared/LeftMenu";
import DashboardRoutes from "./dashboard/DashboardRoutes"
import AuthRoutes from "./authentication/AuthRoutes";
import AutomationRoutes from "./automation/AutomationRoutes";
import ContactRoutes from "./contact/ContactRoutes";
import NotFound from "./shared/NotFound";
import ContactModal from "./shared/contactModal/Index";
import CommunicationRoutes from "./setup/communication/communicationRoute";
import TemplateRoutes from "./setup/templates/templateRoutes";
import ProductRouter from "./setup/product/productRoute";
import NumberRouting from "./numbers/NumberRoute";
import CourseRouter from "./setup/course/courseRoute";
import HeaderDashboard from "./shared/HeaderDashboard";


const MainComponent = () => {
  const pathURL = useLocation().pathname;
  const [showInnerleftMenu, setshowInnerleftMenu] = useState(true);
  const [createButton, setCreateButton] = useState(null);


  const toggleLeftSubMenu = (status) => {
    setshowInnerleftMenu(status);
  };
  const [showLeftSubMenu, setShowLeftSubMenu] = useState(true);
  const [isShowContact, setIsShowContact] = useState(false);
  const modalId = useSelector((state) => state.contact.contact_modal_id);
  useEffect(() => {
    if (modalId !== '') {
      setIsShowContact(true);
    } else {
      setIsShowContact(false);
    }
  }, [modalId]);
  const toggleCreate = (e) => {
    setCreateButton(e);
  };
  
  useEffect(() => {
    
  });
  return (
  <>
      <div className="mainComponent">
        <div
          className={
            "dashboardBody d-flex " +
            (pathURL === '/automation-list' || pathURL === '/automation-builder' ? ' automationBuilderBody ' : '') +
            (showInnerleftMenu ? "openSubmenu" : "")
          }
        >
          <LeftMenu toggleLeftSubMenu={toggleLeftSubMenu}/>
          <div className="dashMain">
          <HeaderDashboard toggleCreate={(e) =>toggleCreate(e)} />
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
              <Route exact path={["/call-setup", "/sms-setup", "/email-setup"]}>
                <CommunicationRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></CommunicationRoutes>
              </Route>
              <Route exact path={["/audio-template"]}>
                <TemplateRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></TemplateRoutes>
              </Route>
              <Route exact path="/products">
                <ProductRouter toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></ProductRouter>
              </Route>
              <Route exact path="/courses">
                <CourseRouter toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></CourseRouter>
              </Route>
              <Route exact path="/number-list">
                <NumberRouting toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></NumberRouting>
              </Route>
              <Route exact path="/" component={() => <Redirect to="/dashboard" />} />
              <Route exact path="*">
                <NotFound toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}/>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      { isShowContact && <ContactModal contactId={modalId}/>}
      
    </>
  );
};

export default MainComponent;
