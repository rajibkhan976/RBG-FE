import React, { useState, lazy, useEffect, useLayoutEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
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
import CustomizationRouter from "./setup/customization/customizationsRoute";

import StatusPhasesRouter from "./setup/status_phase/status_phasesRoute";
import GymDetailsRouter from "./setup/gymDetail/gymDetailsRoute";

import PersonalDetailsRouter from "./setup/personalDetails/personalDetailsRoute";

import AppointmentRouter from "./report/AppointmentRoutes";

import HeaderDashboard from "./shared/HeaderDashboard";
import { UserServices } from "../services/authentication/UserServices";
import config from "../configuration/config";
import UpdateNotification from "./shared/updateNotifications/UpdateNotification";
import { io } from "socket.io-client";
import * as actionTypes from "../actions/types";
import GetPositionMiddleware from "../actions/GetPosition.middleware";


const MainComponent = () => {
  const pathURL = useLocation().pathname;
  const [showInnerleftMenu, setshowInnerleftMenu] = useState(true);
  const [createButton, setCreateButton] = useState(null);
  const [setupMenuState, setSetupMenuState] = useState(false);
  const dispatch = useDispatch();


  const toggleLeftSubMenu = (status) => {
    setshowInnerleftMenu(status);
  };
  const [showLeftSubMenu, setShowLeftSubMenu] = useState(true);
  const [isShowContact, setIsShowContact] = useState(false);
  const [isNewFeaturesAvailable, setIsNewFeaturesAvailable] = useState(false);

  // For socket io connection
  const socketUrl = (process.env.NODE_ENV === 'production') ? config.socketUrlProd : config.socketUrlLocal;

  const closeNotification = () => {
    setIsNewFeaturesAvailable(false);
  }

  useEffect(() => {
    if (false) {
      const socket = io(socketUrl, {
        transports: ["websocket"],
        origins: "*"
      });
      // client-side
      socket.on("connect", () => {
        console.log("socket id", socket.id); // x8WIv7-mJelg7on_ALbx
      });

      //Listen to feature update
      socket.on("setFeatureUpdateNotification", (data) => {
        console.log('Display feature update notification');
        setIsNewFeaturesAvailable(true);
      });

      // socket.emit("getFeatureUpdateNotification");

      //Listen to payment notifications
      socket.on("setNotification", (data) => {
        console.log('Display new payment update notification', data);
      });
    }
  }, [socketUrl]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // await detectTimezone(position.coords.latitude, position.coords.longitude);
      dispatch(GetPositionMiddleware.getPosition(position.coords.latitude, position.coords.longitude));
    });
  }, [])

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

  const clickedSetupStatus = (e) => {
    e.target && setSetupMenuState(true)
  };

  useEffect(() => {
    setSetupMenuState(false)
  });
  const [loggedInUser, setLoggedInUser] = useState({
    name: null,
    email: null,
    prefix: null,
    phone: null,
    image: null,
    group: null,
    isEdit: false,
    fullName: null,
    association: null,
    organization: null,
    isShowPlan: false,
    isOrganizationOwner: false,
    isAssociationOwner: false,
  });

  /*
   * Fetch logged in user details
   */
  useLayoutEffect(() => {
    dispatch({
      type: actionTypes.USER_DATA,
      data: null
    });
    fetchLoggedUserDetails();
  }, []);
  //Fetch user details
  const fetchLoggedUserDetails = async () => {
    try {
      let userDetails = await UserServices.fetchUserDetails();
      if (userDetails) {
        let data = {
          name: userDetails.firstName + ' ' + (userDetails.lastName ? userDetails.lastName.substr(0, 1) + '.' : ''),
          fullName: userDetails.firstName + ' ' + userDetails.lastName,
          email: userDetails.email,
          phone: userDetails.phone ? (userDetails.prefix + '-' + userDetails.phone) : null,
          image: userDetails.image ? (config.bucketUrl + userDetails.image) : null,
          isOrganizationOwner: userDetails.isOrganizationOwner,
          isAssociationOwner: userDetails.isAssociationOwner,
          organization: userDetails.organization ? userDetails.organization.name : '',
          organizationCode: userDetails.organization ? userDetails.organization.code : '',
          group: userDetails.group ? userDetails.group.name : '',
          isShowPlan: userDetails.organization ? userDetails.organization.parentId !== 0 ? true : false : false
        };
        dispatch({
          type: actionTypes.USER_DATA,
          data: data
        });
        // setLoggedInUser(data);
      }
    } catch (e) {
      console.log('Error in fetch current user', e);
    }
  };
  return (
    <>
      <div className="mainComponent">
        <div
          className={
            "dashboardBody d-flex " +
            (pathURL === '/automation-list' || pathURL === '/automation-builder' ? ' automationBuilderBody ' : '') +
            (showInnerleftMenu ? (pathURL !== '/dashboard' ? "openSubmenu" : "") : "")
          }
        >
          <LeftMenu toggleLeftSubMenu={toggleLeftSubMenu} clickedSetupStatus={(e) => clickedSetupStatus(e)} />
          <div className="dashMain">
            <HeaderDashboard toggleCreate={(e) => toggleCreate(e)} setupMenuState={setupMenuState} />
            <Switch>
              <Route exact path="/dashboard">
                <DashboardRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)} />
              </Route>
              <Route exact path={["/roles", "/groups", "/users", '/organizations', '/associations']}>
                <AuthRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)} />
              </Route>
              <Route exact path={["/automation-list", "/automation-builder"]}>
                <AutomationRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)} />
              </Route>
              <Route exact path="/contacts">
                <ContactRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)} />
              </Route>
              <Route exact path={["/call-setup", "/sms-setup", "/email-setup"]}>
                <CommunicationRoutes toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></CommunicationRoutes>
              </Route>
              <Route exact path={["/email-template", "/sms-template", "/audio-template"]}>
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
              <Route exact path="/customizations">
                <CustomizationRouter toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></CustomizationRouter>
              </Route>
              <Route exact path="/phases-status">
                <StatusPhasesRouter toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></StatusPhasesRouter>
              </Route>
              <Route exact path="/gym-details">
                <GymDetailsRouter toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></GymDetailsRouter>
              </Route>
              <Route exact path="/personal-details">
                <PersonalDetailsRouter toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></PersonalDetailsRouter>
              </Route>
              <Route exact path="/appointment">
                <AppointmentRouter toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)}></AppointmentRouter>
              </Route>
              <Route exact path="/" component={() => <Redirect to="/dashboard" />} />
              <Route exact path="*">
                <NotFound toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      {isShowContact && <ContactModal contactId={modalId} />}

      {isNewFeaturesAvailable && <UpdateNotification version="2.10.1" closeNotification={closeNotification} />}

    </>
  );
};

export default MainComponent;
