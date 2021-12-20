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
import { UserServices } from "../services/authentication/UserServices";
import config from "../configuration/config";
import UpdateNotification from "./shared/updateNotifications/UpdateNotification";
import { io } from "socket.io-client";


const MainComponent = () => {
  const pathURL = useLocation().pathname;
  const [showInnerleftMenu, setshowInnerleftMenu] = useState(true);
  const [createButton, setCreateButton] = useState(null);
  const [setupMenuState, setSetupMenuState] = useState(false)


  const toggleLeftSubMenu = (status) => {
    setshowInnerleftMenu(status);
  };
  const [showLeftSubMenu, setShowLeftSubMenu] = useState(true);
  const [isShowContact, setIsShowContact] = useState(false);
  const [isNewFeaturesAvailable, setIsNewFeaturesAvailable] = useState(false);

  // For socket io connection
  const socketUrl = (process.env.NODE_ENV === 'production') ? config.socketUrlProd : config.socketUrlLocal;
  // const socket = io(socketUrl, {
  //   transports: ["websocket"],
  //   origins: "*"
  // });

  const closeNotification = () => {
    setIsNewFeaturesAvailable(false);
  }

  useEffect(() => {
    const socket = io(socketUrl, {
      transports: ["websocket"],
      origins: "*"
    });
    // client-side
    socket.on("connect", () => {  
      console.log("socket id", socket.id); // x8WIv7-mJelg7on_ALbx

    });
    console.log("isNewFeaturesAvailable before", isNewFeaturesAvailable);
    // listing to an emit event setFeatureUpdateNotification
    socket.on("setFeatureUpdateNotification", (data) => {
      console.log("Receiving relese updates", data);
      
      setIsNewFeaturesAvailable(true);
      // setIsNewFeaturesAvailable((prevState) => {
      //   return true;
      // })
      console.log("isNewFeaturesAvailable after", isNewFeaturesAvailable);
    });

    
    

    socket.emit("getFeatureUpdateNotification");
  }, [socketUrl]);




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
  useEffect(() => {
    fetchLoggedUserDetails();
  }, []);
  //Fetch user details
  const fetchLoggedUserDetails = async () => {
    try {
      let userDetails = await UserServices.fetchUserDetails();
      if (userDetails) {
        console.log('success user details', userDetails);
        setLoggedInUser({
          name: userDetails.firstName + ' ' + (userDetails.lastName ? userDetails.lastName.substr(0, 1) + '.' : ''),
          fullName: userDetails.firstName + ' ' + userDetails.lastName,
          email: userDetails.email,
          phone: userDetails.phone ? (userDetails.prefix + '-' + userDetails.phone) : null,
          image: userDetails.image ? (config.bucketUrl + userDetails.image) : null,
          isOrganizationOwner: userDetails.isOrganizationOwner,
          isAssociationOwner: userDetails.isAssociationOwner,
          organization: userDetails.organization ? userDetails.organization.name : '',
          group: userDetails.group ? userDetails.group.name : '',
          isShowPlan: userDetails.organization ? userDetails.organization.parentId !== 0 ? true : false : false
        })
      }
    } catch (e) {
      console.log('Error in fetch current user', e);
    }
  };
  return (
    <>
      <div className="mainComponent">
      {isNewFeaturesAvailable + " just above update notication component"}
        <div
          className={
            "dashboardBody d-flex " +
            (pathURL === '/automation-list' || pathURL === '/automation-builder' ? ' automationBuilderBody ' : '') +
            (showInnerleftMenu ? (pathURL !== '/dashboard' ? "openSubmenu" : "") : "")
          }
        >
          <LeftMenu toggleLeftSubMenu={toggleLeftSubMenu} clickedSetupStatus={(e) => clickedSetupStatus(e)} loggedInUser={loggedInUser} />
          <div className="dashMain">
            <HeaderDashboard toggleCreate={(e) => toggleCreate(e)} setupMenuState={setupMenuState} loggedInUser={loggedInUser}/>
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
                <NotFound toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      {isShowContact && <ContactModal contactId={modalId} />}
          
      {isNewFeaturesAvailable && <UpdateNotification version="2.10.1" closeNotification={closeNotification} /> }     
      
    </>
  );
};

export default MainComponent;
