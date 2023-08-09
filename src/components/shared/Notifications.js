import React, {useEffect, useState, useReducer} from "react";
import {useDispatch, useSelector} from 'react-redux';
import * as actionTypes from "../../actions/types";
import BackArrow from "../../assets/images/back-arrow.png";
import {utils} from "../../helpers";
import {NotificationServices} from "../../services/notification/NotificationServices";
import Loader from "./Loader";
import moment from "moment";
import Status from "../contact/importContact/status";
import smallLoaderImg from "../../assets/images/loader.gif";
import modalReducer from "../../reducers/modalReducer";

const Notifications = (props) => {
    let [detailNotification, setDetailNotification] = useState(null);
    const [isBigLoader, setIsBigLoader] = useState(false);
    const [showImportContactStory, setShowImportContactStory] = useState(false);
    const [importId, setImportId] = useState("");
    const [notificationsListing, setNotificationListing] = useState([]);
    const [notificationsType, setNotificationType] = useState(null);
    const dispatch = useDispatch();
    const initialState = useSelector((state) => state.modal);
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

    const zindexState = useSelector((state)=>state);
    const timezoneOffset = useSelector((state)=> (state?.user?.data.organizationTimezoneInfo?.utc_offset)? state.user.data.organizationTimezoneInfo.utc_offset:null);

    const goBackToNotificationListing = () => {
        setDetailNotification(null);
        setNotificationType(null);
    };
    const handlerScrollNotification = (element) => {
        if ((element.target.scrollHeight - element.target.scrollTop === element.target.clientHeight)) {
            props.scrollNotification(notificationsType);
        }
        /*if ((element.target.scrollHeight - element.target.scrollTop === element.target.clientHeight) && !isScrollLoading && !notificationsLastPage) {
            fetchNotifications()
        }*/
    }
    const showNOtifDetails = (type) => {
        setNotificationType(type);
        setDetailNotification(type);
    };
    const onClickNotification = (e) => {
        props.markSingleAsRead(e);
        if (e.type === 'import-contact') {
            setShowImportContactStory(true);
            setImportId(e.contactId);
        } else if (e.type === 'payment') {
            dispatch({
                type: actionTypes.CONTACTS_MODAL_ID,
                contact_modal_id: {
                    "id": e.contactId,
                    "page": 4
                },
            });
            setTimeout(() => {
                dispatch({
                    type: actionTypes.CONTACTS_MODAL_ID,
                    contact_modal_id: {
                        "id": e.contactId
                    },
                }, 100);
            })
        }
    }
    const closeImportStatusModal = () => {
        setShowImportContactStory(false);
        setImportId("");
    }
    const showNotification = (e) => {
        return <p onClick={() => onClickNotification(e)}
                  dangerouslySetInnerHTML={{
                      __html: e.notification
                  }}/>
    }
    //Mark all notifications as read
    const markAllAsRead = async () => {
        props.markAllAsRead();
    }
    const showTimeDiff = (e) => {
        const formattedDate = moment.utc(e?.createdAt);
        const timezoneDate = moment.utc(formattedDate, null).utcOffset(moment().utcOffset());
        return moment(timezoneDate.format()).fromNow()
    }
    // const modalsStoreCount = useSelector((state) => state.modal.count);
    // console.log(modalsStoreCount);
    useEffect(() => {
        setNotification(props.notification)
    }, [props.notification])
    return (
        <div className="sideMenuOuter notificationsMenu"  style={{zIndex: initialState.zIndexNotification}}>
            <div className="dialogBg" onClick={props.closeModalNotification}></div>
            <div className="sideMenuInner">
                <div className="sideMenuHeader">
                    <h3>
                        Notifications
                        <button className="inlinle-btn btn-link" onClick={markAllAsRead}>
                            Mark all as read
                        </button>
                    </h3>
                    <p>Check all the notifications</p>
                    <button
                        className="btn btn-closeSideMenu"
                        onClick={props.closeModalNotification}>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <div className="sideMenuBody" onScroll={(e) => handlerScrollNotification(e)}>
                    { notification.fullLoading ? <Loader/> : ""}
                    <div className="notificationsListing">
                        {detailNotification === null && (
                            <>
                                <div className="notifIco text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 127.533 82.289"
                                        id="notif-ico"
                                    >
                                        <g transform="translate(-1521.951 -185.053)">
                                            <g transform="translate(1536.941 194.316)">
                                                <path
                                                    className="a"
                                                    d="M40.557,11.071a47.34,47.34,0,0,1,0,66.942L43.6,81.055a51.641,51.641,0,0,0,0-73.026Z"
                                                    transform="translate(44.55 -8.029)"
                                                />
                                                <path
                                                    className="a"
                                                    d="M37.941,62.367a34.417,34.417,0,0,0,0-48.68L34.9,16.729a30.116,30.116,0,0,1,0,42.6Z"
                                                    transform="translate(38.035 -1.514)"
                                                />
                                                <path
                                                    className="a"
                                                    d="M19.084,13.687a34.417,34.417,0,0,0,0,48.68l3.042-3.042a30.116,30.116,0,0,1,0-42.6Z"
                                                    transform="translate(8.212 -1.514)"
                                                />
                                                <path
                                                    className="a"
                                                    d="M19.165,78.013a47.34,47.34,0,0,1,0-66.942L16.123,8.029a51.641,51.641,0,0,0,0,73.026Z"
                                                    transform="translate(-1 -8.029)"
                                                />
                                                <path
                                                    className="b"
                                                    d="M21.823,14.326l-.423-.341a.973.973,0,0,1-.365-.759V9.294A7.3,7.3,0,0,0,15.15,2.135a1.46,1.46,0,0,0-2.828,0A7.3,7.3,0,0,0,6.434,9.294v3.933a.973.973,0,0,1-.365.759l-.423.341A4.38,4.38,0,0,0,4,17.733v.808a1.947,1.947,0,0,0,1.947,1.947h4.02a3.894,3.894,0,0,0,7.529,0h4.025a1.947,1.947,0,0,0,1.947-1.947v-.8a4.38,4.38,0,0,0-1.645-3.417Zm-8.089,7.135a1.947,1.947,0,0,1-1.674-.973h3.353A1.947,1.947,0,0,1,13.734,21.461Zm7.787-2.92H5.947v-.8a2.434,2.434,0,0,1,.915-1.9l.423-.341a2.92,2.92,0,0,0,1.1-2.278V9.294a5.354,5.354,0,0,1,10.707,0v3.933a2.92,2.92,0,0,0,1.1,2.283l.423.341a2.433,2.433,0,0,1,.915,1.893Z"
                                                    transform="translate(37.946 24.3)"
                                                />
                                            </g>
                                            <g transform="translate(1626.291 218.455)">
                                                <path
                                                    className="c"
                                                    d="M7.014,2.27,8.078,4.581a.489.489,0,0,0,.324.277l2.4.37a.419.419,0,0,1,.277.74l-1.756,1.8a.645.645,0,0,0-.139.416l.416,2.5a.464.464,0,0,1-.647.508L6.783,9.99a.347.347,0,0,0-.416,0l-2.172,1.2a.446.446,0,0,1-.647-.508l.416-2.5a.466.466,0,0,0-.139-.416l-1.756-1.8a.48.48,0,0,1,.277-.786l2.4-.37a.4.4,0,0,0,.324-.277L6.136,2.224A.5.5,0,0,1,7.014,2.27Z"
                                                    transform="translate(-1.956 -1.987)"
                                                />
                                            </g>
                                            <g transform="translate(1640.213 185.053)">
                                                <path
                                                    className="d"
                                                    d="M7.014,2.27,8.078,4.581a.489.489,0,0,0,.324.277l2.4.37a.419.419,0,0,1,.277.74l-1.756,1.8a.645.645,0,0,0-.139.416l.416,2.5a.464.464,0,0,1-.647.508L6.783,9.99a.347.347,0,0,0-.416,0l-2.172,1.2a.446.446,0,0,1-.647-.508l.416-2.5a.466.466,0,0,0-.139-.416l-1.756-1.8a.48.48,0,0,1,.277-.786l2.4-.37a.4.4,0,0,0,.324-.277L6.136,2.224A.5.5,0,0,1,7.014,2.27Z"
                                                    transform="translate(-1.956 -1.987)"
                                                />
                                            </g>
                                            <g transform="translate(1640.213 265.136)">
                                                <path
                                                    className="e"
                                                    d="M3.16,2.054l.253.55a.116.116,0,0,0,.077.066l.572.088a.1.1,0,0,1,.066.176l-.418.429a.154.154,0,0,0-.033.1l.1.594a.11.11,0,0,1-.154.121l-.517-.286a.083.083,0,0,0-.1,0l-.517.286a.106.106,0,0,1-.154-.121l.1-.594a.111.111,0,0,0-.033-.1l-.418-.429a.114.114,0,0,1,.066-.187l.572-.088A.094.094,0,0,0,2.7,2.594l.253-.55A.119.119,0,0,1,3.16,2.054Z"
                                                    transform="translate(-1.956 -1.987)"
                                                />
                                            </g>
                                            <g transform="translate(1521.951 239.062)">
                                                <path
                                                    className="c"
                                                    d="M7.014,2.27,8.078,4.581a.489.489,0,0,0,.324.277l2.4.37a.419.419,0,0,1,.277.74l-1.756,1.8a.645.645,0,0,0-.139.416l.416,2.5a.464.464,0,0,1-.647.508L6.783,9.99a.347.347,0,0,0-.416,0l-2.172,1.2a.446.446,0,0,1-.647-.508l.416-2.5a.466.466,0,0,0-.139-.416l-1.756-1.8a.48.48,0,0,1,.277-.786l2.4-.37a.4.4,0,0,0,.324-.277L6.136,2.224A.5.5,0,0,1,7.014,2.27Z"
                                                    transform="translate(-1.956 -1.987)"
                                                />
                                            </g>
                                            <g transform="translate(1539.798 202.806)">
                                                <path
                                                    className="d"
                                                    d="M5.455,2.183l.735,1.6a.338.338,0,0,0,.224.192l1.663.256a.29.29,0,0,1,.192.512L7.054,5.988a.446.446,0,0,0-.1.288L7.246,8a.321.321,0,0,1-.448.352L5.3,7.523a.24.24,0,0,0-.288,0l-1.5.831A.309.309,0,0,1,3.057,8l.288-1.727a.322.322,0,0,0-.1-.288L2.034,4.741A.332.332,0,0,1,2.226,4.2l1.663-.256a.274.274,0,0,0,.224-.192l.735-1.6A.347.347,0,0,1,5.455,2.183Z"
                                                    transform="translate(-1.956 -1.987)"
                                                />
                                            </g>
                                            <g transform="translate(1583.942 189.684)">
                                                <path
                                                    className="c"
                                                    d="M4.485,2.129l.532,1.156a.244.244,0,0,0,.162.139l1.2.185a.209.209,0,0,1,.139.37l-.878.9a.323.323,0,0,0-.069.208l.208,1.248a.232.232,0,0,1-.324.254l-1.086-.6a.173.173,0,0,0-.208,0l-1.086.6a.223.223,0,0,1-.324-.254L2.96,5.087a.233.233,0,0,0-.069-.208l-.878-.9a.24.24,0,0,1,.139-.393l1.2-.185a.2.2,0,0,0,.162-.139l.532-1.156A.251.251,0,0,1,4.485,2.129Z"
                                                    transform="translate(-1.956 -1.987)"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <p className="notificationHeadingPara">Catch all the notifications easily from a single
                                    place</p>
                                <ul className="notifLabels">
                                    {
                                        props.notificationStructure.hasOwnProperty('general') ?
                                            <li onClick={() => showNOtifDetails('general')}>
                                                <p>General</p>
                                                <span>{props.notificationStructure.general.totalUnread}</span>
                                                <button
                                                    className="inlinle-btn btn-link">
                                                    View All
                                                </button>
                                            </li> : ""
                                    }
                                    {
                                        props.notificationStructure.hasOwnProperty('payment') ?
                                            <li onClick={() => showNOtifDetails('payment')}>
                                                <p >Payments</p>
                                                <span>{props.notificationStructure.payment.totalUnread}</span>
                                                <button
                                                    className="inlinle-btn btn-link">
                                                    View All
                                                </button>
                                            </li> : ""
                                    }
                                </ul>
                            </>
                        )}
                        {detailNotification !== null ? (
                            <>
                                <h4 className="inlineHeader">
                                    {detailNotification}
                                    <button
                                        className="btn btn-back btn-dBlue"
                                        onClick={goBackToNotificationListing}
                                    >
                                        <img src={BackArrow} alt="Go back to listing"/>
                                        Back
                                    </button>
                                </h4>
                                <ul className="detailNotifList notificationList">
                                    {
                                        notification[notificationsType].data.length ? notification[notificationsType].data.map((e, i) => {
                                            return (
                                                <li key={i} className={"detailNotif " + (!e.isRead ? "unreadNotifications" : "")}>
                                                   {
                                                        e?.status === "success" && !e?.notification.toString().toLowerCase()?.includes("failed") ? (
                                                            <div className="success">
                                                                <div className="notiTime_n_Icon">
                                                                <span className="timeStamp">{ showTimeDiff(e).replace("minutes", "mins") }</span>
                                                                <figure>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 12.536 10.029"
                                                                        id="payment-ico"
                                                                    >
                                                                        <g transform="translate(-1355.732 -269.986)">
                                                                            <path
                                                                                className="a"
                                                                                d="M12.655,4H3.88A1.88,1.88,0,0,0,2,5.88v6.268a1.88,1.88,0,0,0,1.88,1.88h8.775a1.88,1.88,0,0,0,1.88-1.88V5.88A1.88,1.88,0,0,0,12.655,4Zm.627,6.456H11.4a1.442,1.442,0,0,1,0-2.883h1.88Zm0-3.949H11.4a2.507,2.507,0,0,0,0,5.014h1.88v.627a.627.627,0,0,1-.627.627H3.88a.627.627,0,0,1-.627-.627V5.88a.627.627,0,0,1,.627-.627h8.775a.627.627,0,0,1,.627.627ZM10.775,9.014a.627.627,0,1,0,.627-.627A.627.627,0,0,0,10.775,9.014Z"
                                                                                transform="translate(1353.732 265.986)"
                                                                            />
                                                                            <path
                                                                                className="b"
                                                                                d="M20,19.4l1.049,1.049L23.5,18"
                                                                                transform="translate(1338.274 255.777)"
                                                                            />
                                                                        </g>
                                                                    </svg>
                                                                </figure>
                                                                </div>
                                                            {showNotification(e)}
                                                            </div>
                                                        ) : ""
                                                    }
                                                    {
                                                        e?.status === "failed" || e?.notification?.toString().toLowerCase()?.includes("failed") ? (
                                                            <div className="failed">
                                                                <div className="notiTime_n_Icon">
                                                                    <span className="timeStamp">{ showTimeDiff(e).replace("minutes", "mins") }</span>
                                                                    <figure>
                                                                        <svg viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M11.3874 0.984375H2.61242C2.11381 0.984375 1.63563 1.18245 1.28306 1.53501C0.930493 1.88758 0.732422 2.36577 0.732422 2.86438V9.13237C0.732422 9.63098 0.930493 10.1092 1.28306 10.4617C1.63563 10.8143 2.11381 11.0124 2.61242 11.0124H11.3874C11.886 11.0124 12.3642 10.8143 12.7168 10.4617C13.0694 10.1092 13.2674 9.63098 13.2674 9.13237V2.86438C13.2674 2.61749 13.2188 2.37302 13.1243 2.14493C13.0298 1.91684 12.8914 1.70959 12.7168 1.53501C12.5422 1.36044 12.335 1.22196 12.1069 1.12748C11.8788 1.033 11.6343 0.984375 11.3874 0.984375V0.984375ZM12.0144 7.44038H10.1324C9.75668 7.43048 9.39966 7.27426 9.13741 7.00501C8.87515 6.73575 8.72839 6.37474 8.72839 5.99887C8.72839 5.62301 8.87515 5.262 9.13741 4.99274C9.39966 4.72349 9.75668 4.56727 10.1324 4.55737H12.0124L12.0144 7.44038ZM12.0144 3.49137H10.1324C9.46752 3.49137 8.82986 3.7555 8.3597 4.22566C7.88955 4.69581 7.62542 5.33348 7.62542 5.99837C7.62542 6.66327 7.88955 7.30094 8.3597 7.77109C8.82986 8.24125 9.46752 8.50537 10.1324 8.50537H12.0124V9.13237C12.0124 9.29867 11.9464 9.45815 11.8288 9.57573C11.7112 9.69332 11.5517 9.75937 11.3854 9.75937H2.61242C2.44613 9.75937 2.28665 9.69332 2.16907 9.57573C2.05148 9.45815 1.98542 9.29867 1.98542 9.13237V2.86438C1.98542 2.69808 2.05148 2.5386 2.16907 2.42102C2.28665 2.30343 2.44613 2.23737 2.61242 2.23737H11.3874C11.5537 2.23737 11.7132 2.30343 11.8308 2.42102C11.9484 2.5386 12.0144 2.69808 12.0144 2.86438V3.49137ZM9.50742 5.99837C9.50742 6.12238 9.54419 6.24361 9.61309 6.34672C9.68199 6.44983 9.77991 6.53019 9.89448 6.57765C10.009 6.6251 10.1351 6.63752 10.2567 6.61333C10.3784 6.58913 10.4901 6.52942 10.5778 6.44173C10.6655 6.35404 10.7252 6.24232 10.7494 6.1207C10.7736 5.99907 10.7612 5.873 10.7137 5.75843C10.6662 5.64386 10.5859 5.54594 10.4828 5.47704C10.3797 5.40815 10.2584 5.37138 10.1344 5.37138C9.96813 5.37138 9.80865 5.43743 9.69107 5.55502C9.57348 5.6726 9.50742 5.83208 9.50742 5.99837Z" fill="white"/>
                                                                            <path d="M4 7.34L6.34 5" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
                                                                            <path d="M6.34 7.34L4 5" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
                                                                        </svg>
                                                                    </figure>
                                                                </div>
                                                            {showNotification(e)}
                                                            </div>
                                                        ) : ""
                                                    }
                                                    
                                                </li>
                                            );
                                        }) : <li key="notFound">
                                            <p>No notification found.</p>
                                        </li>
                                    }
                                    { notification.isLoading ?
                                        <li className="loaderLi">
                                            <img src={smallLoaderImg} alt="loading" className="smallLoader" />
                                        </li> : ""
                                    }

                                </ul>
                            </>
                        ) : (
                            ""
                        )}
                        {
                            showImportContactStory ?
                                <Status importId={importId} closeModal={closeImportStatusModal}/> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
