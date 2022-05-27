import React, { useState, lazy, useEffect, useLayoutEffect } from "react";
import { useSelector } from 'react-redux';
import { toastr } from 'react-redux-toastr'
import success_alert from "../../src/assets/images/success_alert.svg";
import info_alert from "../../src/assets/images/info_alert.svg";
import warning_alert from "../../src/assets/images/warning_alert.svg";
import error_alert from "../../src/assets/images/error_alert.svg";
import MemberCheckInPortal from "./memberPortal/MemberCheckInPortal";


const MemberComponent = () => {
    
    const [messages, setMessages] = useState([]);    
    const message = useSelector((state) => state.message);

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
             <MemberCheckInPortal />
        </>
    );
};

export default MemberComponent;
