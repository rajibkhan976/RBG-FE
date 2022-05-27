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
import PaymentRouting from "./setup/paymentRouting/paymentRouting"
import StatusPhasesRouter from "./setup/status_phase/status_phasesRoute";
import GymDetailsRouter from "./setup/gymDetail/gymDetailsRoute";
import PersonalDetailsRouter from "./setup/personalDetails/personalDetailsRoute";
import ZapierRouter from "./setup/zapier/zapierRoute";
import AppointmentRouter from "./report/Appointment/AppointmentRoutes";
import AttendenceRouter from "./report/Attendence/AttendenceRoutes";
import RevenueRouter from "./report/Revenue/RevenueRoutes";
import HeaderDashboard from "./shared/HeaderDashboard";
import AttendanceGlobalRouting from "./attendance/AttendanceGlobalRouter";
//import TabLogin from "./tabLogin/TabLogin";


import { UserServices } from "../services/authentication/UserServices";
import config from "../configuration/config";
import UpdateNotification from "./shared/updateNotifications/UpdateNotification";
import { io } from "socket.io-client";
import * as actionTypes from "../actions/types";
import GetPositionMiddleware from "../actions/GetPosition.middleware";
import { NotificationServices } from "../services/notification/NotificationServices";
import moment from "moment-timezone";
import AlertMessage from "./shared/messages/alertMessage";
import { toastr } from 'react-redux-toastr'
import success_alert from "../../src/assets/images/success_alert.svg";
import info_alert from "../../src/assets/images/info_alert.svg";
import warning_alert from "../../src/assets/images/warning_alert.svg";
import error_alert from "../../src/assets/images/error_alert.svg";
import CreditRoutes from "./setup/credit/CreditRoutes";
import RestrictionPackageModal from "./setup/credit/package/RestrictionPackageModal";
import AppointmentGlobal from "./appointment/AppointmentGlobalRouter";




// For socket io connection
//const socketUrl = (process.env.NODE_ENV === 'production') ? config.socketUrlProd : config.socketUrlProd;
const socketUrl = process.env.REACT_APP_SOCKET_URL;
const socket = io(socketUrl, {
    transports: ["websocket"],
    origins: "*"
});

const MainComponent = () => {
    const pathURL = useLocation().pathname;
    const [showInnerleftMenu, setshowInnerleftMenu] = useState(true);
    const [createButton, setCreateButton] = useState(null);
    const [setupMenuState, setSetupMenuState] = useState(false);
    const [isLoadingNotification, setIsLoadingNotification] = useState(false);
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user.data);
    const isCreditRestriction = useSelector((state) => state.credit.isRestrictionModal);
    const [notificationPage, setNotificationPage] = useState(1);
    const [isPageIsLoading, setIsPageIsLoading] = useState(false);
    const toggleLeftSubMenu = (status) => {
        setshowInnerleftMenu(status);
    };
    const [showLeftSubMenu, setShowLeftSubMenu] = useState(true);
    const [isShowContact, setIsShowContact] = useState(false);
    const [isNewFeaturesAvailable, setIsNewFeaturesAvailable] = useState(false);
    const [isNewNotification, setIsNewNotification] = useState(false);
    const [contactId, setContactId] = useState("");
    const [page, setPage] = useState("");
    const [messages, setMessages] = useState([]);
    const [notificationStructure, setNotificationStructure] = useState({
        payment: {
            totalUnread: 0,
            totalRead: 0
        },
        general: {
            totalUnread: 0,
            totalRead: 0
        },
        totalNotification: 0
    });
    const [notification, setNotification] = useState({
        general: {
            data: [],
            page: 1,
            totalPage: 1
        },
        payment: {
            data: [],
            page: 1,
            totalPage: 1
        },
        isLoading: false,
        fullLoading: false
    });
    const [notificationUnread, setNotificationUnread] = useState(0);
    const messageDelay = 5000; // ms
    const message = useSelector((state) => state.message);

    const closeNotification = () => {
        setIsNewFeaturesAvailable(false);
    }
    useEffect(() => {

        // Socket connect
        socket.on("connect", () => {
            console.log("socket id", socket.id); // x8WIv7-mJelg7on_ALbx
            if (loggedInUser) {
                console.log('emit connected');
                socket.emit("connected", loggedInUser.organizationCode);
            }
        });

        //Listen to feature update
        socket.on("setFeatureUpdateNotification", (data) => {
            console.log('Display feature update notification');
            setIsNewFeaturesAvailable(true);
        });

        // socket.emit("getFeatureUpdateNotification");

    }, []);



    useEffect(() => {
        //Listen to payment notifications
        socket.off("setNotification").on("setNotification", updateSocketDataForNotification);

        //Listen to credit update
        socket.on("setCredit", updateCreditDetails);        

    }, [loggedInUser]);

    useEffect(() => {
        return () => {
            socket.off('setNotification', updateSocketDataForNotification);
            socket.off('setFeatureUpdateNotification');
            socket.off('connect');
            socket.disconnect();
        }
    }, [])

    const updateCreditDetails = async (data) => {
        
        let parseData = JSON.parse(data);
        console.log('Update credit balance', parseData)
        if (loggedInUser && (parseData.organizationCode === loggedInUser.organizationCode) && parseData.type === 'credit') {
            dispatch({
                type: actionTypes.USER_DATA,
                data: {...loggedInUser, credit: parseData.notification.finalCredit}
            });
        }
    }

    const updateSocketDataForNotification = async (data) => {
        let parseData = JSON.parse(data);
        setIsNewNotification(true);
        parseData['isRead'] = false;
        parseData['createdAt'] = moment.tz("Europe/London").format('YYYY-MM-DD HH:mm:ss');
        if (loggedInUser && (parseData.organizationCode === loggedInUser.organizationCode)) {
            if (parseData.type === 'payment') {
                setNotificationStructure(prevState => {
                    return {
                        ...prevState,
                        totalNotification: prevState.totalNotification + 1,
                        payment: {
                            totalUnread: prevState.payment.totalUnread + 1
                        }
                    }
                });
                setNotification(prevState => {
                    return {
                        ...prevState,
                        payment: {
                            data: [parseData, ...prevState.payment.data],
                            page: prevState.payment.page,
                            totalPage: prevState.payment.totalPage
                        }
                    }
                });
            } else {
                setNotificationStructure(prevState => {
                    return {
                        ...prevState,
                        totalNotification: prevState.totalNotification + 1,
                        general: {
                            totalUnread: prevState.general.totalUnread + 1
                        }
                    }
                });
                setNotification(prevState => {
                    return {
                        ...prevState,
                        general: {
                            data: [parseData, ...prevState.general.data],
                            page: prevState.general.page,
                            totalPage: prevState.general.totalPage
                        }
                    }
                });
            }
        }
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            // await detectTimezone(position.coords.latitude, position.coords.longitude);
            dispatch(GetPositionMiddleware.getPosition(position.coords.latitude, position.coords.longitude));
        });
    }, [])
    useEffect(() => {
        if (isNewNotification) {
            setTimeout(() => {
                setIsNewNotification(false);
            }, 100)
        }
    }, [isNewNotification])
    const modalId = useSelector((state) => state.contact.contact_modal_id);
    useEffect(async () => {
        let page = 1;
        if (typeof modalId === 'object') {
            setContactId(modalId.id);
            setPage(modalId.page);
            if (modalId.id !== '') {
                setIsShowContact(true);
            } else {
                setIsShowContact(false);
            }
        } else {
            setContactId(modalId);
            if (modalId !== '') {
                setIsShowContact(true);
            } else {
                setIsShowContact(false);
            }
        }
    }, [modalId]);
    const toggleCreate = (e) => {
        setCreateButton(e);
    };

    const clickedSetupStatus = (e) => {
        e.target && setSetupMenuState(true)
    };

    useEffect(() => {
        setSetupMenuState(false);
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
                    isShowPlan: userDetails.organization ? userDetails.organization.parentId !== 0 ? true : false : false,
                    credit: userDetails.organization ? userDetails.organization.credit ? userDetails.organization.credit : 0 : 0,
                    currentPlan: userDetails.organization ? userDetails.organization.package ? userDetails.organization.package.name : '' : '',
                    isPackage: userDetails.organization ? userDetails.organization.package ? true : false : false,
                    packageId: userDetails.organization ? userDetails.organization.package ? userDetails.organization.package._id : '' : '',
                    autoRenewLimit: userDetails.creditUsage ? userDetails.creditUsage.autoRenewLimit ? userDetails.creditUsage.autoRenewLimit : 0 : 0
                };
                dispatch({
                    type: actionTypes.USER_DATA,
                    data: data
                });
            }
        } catch (e) {
            console.log('Error in fetch current user', e);
        }
    };

    useEffect(async () => {
        /**
         * Fetch notifications
         */
        await fetchNotifications();
        await fetchPaymentNotification(1);
        await fetchGeneralNotification(1);
    }, []);
    const scrollNotification = (type) => {
        if (type === 'general') {
            if (notification.general.page < notification.general.totalPage && !notification.isLoading) {
                fetchGeneralNotification(notification.general.page + 1);
            }
        } else {
            if (notification.payment.page < notification.payment.totalPage && !notification.isLoading) {
                fetchPaymentNotification(notification.payment.page + 1);
            }
        }
    }
    const fetchPaymentNotification = async (page) => {
        if (page === 1) {
            setNotification(prevState => {
                return {
                    ...prevState,
                    payment: {
                        data: [],
                        page: 1,
                        totalPage: 1
                    }
                }
            });
        }
        setNotification(prevState => {
            return {
                ...prevState,
                isLoading: true
            }
        });
        const result = await NotificationServices.fetchNotifications(page, 'payment');
        if (result.notifications.length) {
            setNotification(prevState => {
                return {
                    ...prevState,
                    payment: {
                        data: [...prevState.payment.data, ...result.notifications],
                        page: page,
                        totalPage: result.pagination.totalPages
                    },
                    isLoading: false
                }
            });
        } else {
            setNotification(prevState => {
                return {
                    ...prevState,
                    isLoading: false
                }
            });
        }
    }

    const fetchGeneralNotification = async (page) => {
        if (page === 1) {
            setNotification(prevState => {
                return {
                    ...prevState,
                    general: {
                        data: [],
                        page: 1,
                        totalPage: 1
                    }
                }
            });
        }
        setNotification(prevState => {
            return {
                ...prevState,
                isLoading: true
            }
        });
        const result = await NotificationServices.fetchNotifications(page, 'general');
        if (result.notifications.length) {
            setNotification(prevState => {
                return {
                    ...prevState,
                    general: {
                        data: [...prevState.general.data, ...result.notifications],
                        page: page,
                        totalPage: result.pagination.totalPages
                    },
                    isLoading: false
                }
            });
        } else {
            setNotification(prevState => {
                return {
                    ...prevState,
                    isLoading: false
                }
            });
        }
    }
    /**
     * Function to fetch notifications
     * @returns
     */
    const fetchNotifications = async () => {
        try {
            setNotificationStructure(prevState => {
                return {
                    ...prevState,
                    payment: {
                        totalUnread: 0
                    },
                    general: {
                        totalUnread: 0
                    },
                    totalNotification: 0
                }
            });
            const result = await NotificationServices.fetchListOfNotification();
            if (result) {
                let notifications = result.notifications;
                await notifications.forEach(element => {
                    if (element._id === 'payment') {
                        setNotificationStructure(prevState => {
                            return {
                                ...prevState,
                                totalNotification: prevState.totalNotification + element.unread,
                                payment: {
                                    totalUnread: prevState.payment.totalUnread + element.unread
                                }
                            }
                        });
                    } else {
                        setNotificationStructure(prevState => {
                            return {
                                ...prevState,
                                totalNotification: prevState.totalNotification + element.unread,
                                general: {
                                    totalUnread: prevState.general.totalUnread + element.unread
                                }
                            }
                        });
                    }
                });
            }
        } catch (e) {
            console.log('Error while fetching notifications', e);
        }
    };
    const markAllAsRead = async () => {
        try {
            setNotification(prevState => {
                return {
                    ...prevState,
                    fullLoading: true
                }
            });
            await NotificationServices.markAllAsRead();
            setNotification(prevState => {
                return {
                    ...prevState,
                    fullLoading: false
                }
            });
            setNotification(prevState => {
                return {
                    ...prevState,
                    general: {
                        data: prevState.general.data.map((el) => {
                            el.isRead = true;
                            return { ...el };
                        }),
                        page: prevState.general.page,
                        totalPage: prevState.general.totalPage
                    },
                    payment: {
                        data: prevState.payment.data.map((el) => {
                            el.isRead = true;
                            return { ...el };
                        }),
                        page: prevState.payment.page,
                        totalPage: prevState.payment.totalPage
                    }
                }
            });
            setNotificationStructure(prevState => {
                return {
                    ...prevState,
                    payment: {
                        totalUnread: 0
                    },
                    general: {
                        totalUnread: 0
                    },
                    totalNotification: 0
                }
            });
        } catch (e) {
            console.log('Error in mark all as read', e);
        }
    }
    const markSingleAsRead = async (ele) => {
        if (!ele.isRead) {
            let payload = {
                id: ele.uniqueId
            };
            await NotificationServices.markSingleAsRead(JSON.stringify(payload));
            if (ele.type === 'payment') {
                setNotificationStructure(prevState => {
                    return {
                        ...prevState,
                        payment: {
                            totalUnread: prevState.payment.totalUnread - 1
                        },
                        totalNotification: prevState.totalNotification - 1
                    }
                });
                setNotification(prevState => {
                    return {
                        ...prevState,
                        payment: {
                            data: prevState.payment.data.map((el) => {
                                if (el.uniqueId === ele.uniqueId) {
                                    el.isRead = true;
                                    return { ...el };
                                } else {
                                    return { ...el };
                                }
                            }),
                            page: prevState.payment.page,
                            totalPage: prevState.payment.totalPage
                        }
                    }
                });
            } else {
                setNotificationStructure(prevState => {
                    return {
                        ...prevState,
                        general: {
                            totalUnread: prevState.general.totalUnread - 1
                        },
                        totalNotification: prevState.totalNotification - 1
                    }
                });
                setNotification(prevState => {
                    return {
                        ...prevState,
                        general: {
                            data: prevState.general.data.map((el) => {
                                if (el.uniqueId === ele.uniqueId) {
                                    el.isRead = true;
                                    return { ...el };
                                } else {
                                    return { ...el };
                                }
                            }),
                            page: prevState.general.page,
                            totalPage: prevState.general.totalPage
                        }
                    }
                });
            }
        }
    }
    const closeMessage = (sls) => {
        const newMessages = messages.filter(mes => (mes.message !== sls.message && mes.typeMessage !== sls.typeMessage));
        setMessages(newMessages);
    }
    useEffect(() => {
        if (message.message) {
            if (message.typeMessage === 'success') {
                const toastrOptions = {
                    className: 'tosterCSS successCss',
                    timeOut: 5000, // by setting to 0 it will prevent the auto close
                    showCloseButton: true, // false by default
                    closeOnToastrClick: true, // false by default, this will close the toastr when user clicks on it
                    icon: <img src={success_alert} />,
                    status: 'success'
                }
                toastr.light('Success', message.message, toastrOptions)
            } else if (message.typeMessage === 'error') {
                const toastrOptions = {
                    className: 'tosterCSS errorCss',
                    timeOut: 5000, // by setting to 0 it will prevent the auto close
                    showCloseButton: true, // false by default
                    closeOnToastrClick: true, // false by default, this will close the toastr when user clicks on it
                    icon: <img src={error_alert} />,
                    status: 'error'
                }
                toastr.light('Error !', message.message, toastrOptions)
            } else if (message.typeMessage === 'warning') {
                const toastrOptions = {
                    className: 'tosterCSS warningCss',
                    timeOut: 5000, // by setting to 0 it will prevent the auto close
                    showCloseButton: true, // false by default
                    closeOnToastrClick: true, // false by default, this will close the toastr when user clicks on it
                    icon: <img src={warning_alert} />,
                    status: 'warning'
                }
                toastr.light('Warning', message.message, toastrOptions)
            } else {
                const toastrOptions = {
                    className: 'tosterCSS infoCss',
                    timeOut: 5000, // by setting to 0 it will prevent the auto close
                    showCloseButton: true, // false by default
                    closeOnToastrClick: true, // false by default, this will close the toastr when user clicks on it
                    icon: <img src={info_alert} />,
                    status: 'info'
                }
                toastr.light('Info', message.message, toastrOptions)
            }
        }
    }, [message.message])
    return (
        <>
            <div className="mainComponent">
                <div
                    className={
                        "dashboardBody d-flex " +
                        (pathURL === '/automation-list' || pathURL === '/automation-builder' ? ' automationBuilderBody ' : '') +
                        (showInnerleftMenu ? ((pathURL !== '/dashboard' && pathURL !== '/appointment-global') ? "openSubmenu" : "") : "")
                    }
                >
                    <LeftMenu toggleLeftSubMenu={toggleLeftSubMenu} clickedSetupStatus={(e) => clickedSetupStatus(e)} />
                    <div className="dashMain">
                        <HeaderDashboard toggleCreate={(e) => toggleCreate(e)} setupMenuState={setupMenuState}
                            fetchNotifications={fetchNotifications}
                            notificationStructure={notificationStructure}
                            notificationUnread={notificationUnread}
                            notificationTrigger={isNewNotification}
                            notification={notification}
                            scrollNotification={(type) => scrollNotification(type)}
                            markSingleAsRead={(ele) => markSingleAsRead(ele)}
                            markAllAsRead={markAllAsRead}
                        />
                        <Switch>
                            <Route exact path="/dashboard">
                                <DashboardRoutes toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)} />
                            </Route>

                            <Route exact path={["/roles", "/groups", "/users", '/organizations', '/associations']}>
                                <AuthRoutes toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)} />
                            </Route>
                            <Route exact path={["/automation-list", "/automation-builder"]}>
                                <AutomationRoutes toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)} />
                            </Route>
                            <Route exact path="/contacts">
                                <ContactRoutes toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)} />
                            </Route>
                            <Route exact path={["/call-setup", "/sms-setup", "/email-setup"]}>
                                <CommunicationRoutes toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></CommunicationRoutes>
                            </Route>
                            <Route exact path={["/email-template", "/sms-template", "/audio-template"]}>
                                <TemplateRoutes toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></TemplateRoutes>
                            </Route>

                            <Route exact path="/products">
                                <ProductRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></ProductRouter>
                            </Route>
                            <Route exact path="/courses">
                                <CourseRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></CourseRouter>
                            </Route>
                            <Route exact path="/number-list">
                                <NumberRouting toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></NumberRouting>
                            </Route>
                            <Route exact path="/payment-setup">
                                <PaymentRouting toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></PaymentRouting>
                            </Route>

                            <Route exact path={["/customizations","/customizations/custom-fields", "/customizations/appointment-tags", "/customizations/program-age-groups", , "/customizations/product-sizes", "/customizations/product-color"]}>
                                <CustomizationRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></CustomizationRouter>
                            </Route>
                            <Route exact path="/phases-status">
                                <StatusPhasesRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></StatusPhasesRouter>
                            </Route>
                            <Route exact path={["/package-setup", "/usage-setup", "/credit-details"]}>
                                <CreditRoutes toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></CreditRoutes>
                            </Route>
                            <Route exact path="/gym-details">
                                <GymDetailsRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></GymDetailsRouter>
                            </Route>
                            <Route exact path="/personal-details">
                                <PersonalDetailsRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></PersonalDetailsRouter>
                            </Route>
                            <Route exact path="/appointment">
                                <AppointmentRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></AppointmentRouter>
                            </Route>
                            <Route exact path="/zapier">
                                <ZapierRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></ZapierRouter>
                            </Route>
                            <Route exact path="/attendence">
                                <AttendenceRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></AttendenceRouter>
                            </Route>
                            <Route exact path="/revenue">
                                <RevenueRouter toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></RevenueRouter>
                            </Route>
<<<<<<< HEAD
                            <Route exact path="/appointment-global">
                                <AppointmentGlobal toggleLeftSubMenu={toggleLeftSubMenu}
                                                   toggleCreate={(e) => toggleCreate(e)}></AppointmentGlobal>
                            </Route>
                            <Route exact path="/" component={() => <Redirect to="/dashboard"/>}/>
=======
                            <Route exact path="/attendance-global">
                                <AttendanceGlobalRouting toggleLeftSubMenu={toggleLeftSubMenu}
                                    toggleCreate={(e) => toggleCreate(e)}></AttendanceGlobalRouting>
                            </Route>
                            <Route exact path="/" component={() => <Redirect to="/dashboard" />} />                               
>>>>>>> a61b296b... Attendance V1.0
                            <Route exact path="*">
                                <NotFound toggleLeftSubMenu={toggleLeftSubMenu} toggleCreate={(e) => toggleCreate(e)} />
                            </Route>
                            {/* <Route exact path="/tabLogin">
                                <TabLogin></TabLogin>
                            </Route>     */}
                            
                        </Switch>
                    </div>
                </div>
            </div>
            {isShowContact && <ContactModal contactId={contactId} page={page} />}

            {isNewFeaturesAvailable && <UpdateNotification version="2.10.1" closeNotification={closeNotification} />}

            {isCreditRestriction && <RestrictionPackageModal />}

        </>
    );
};

export default MainComponent;
