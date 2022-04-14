import { useEffect, useState } from "react";
import successIcon from "../../../assets/images/success_alert_icon.svg";
import errorIcon from "../../../assets/images/error_alert_icon.svg";
import worningIcon from "../../../assets/images/worning_alert_icon.svg";
import infoIcon from "../../../assets/images/info_alert_icon.svg";

const AlertMessage = (props) => {

    const [showingTime, setShowingTime] = useState(props.time ? props.time : 5000);
    const [message, setMessage] = useState(props.message ? props.message : "");
    const [alertType, setAlertType] = useState(props.type ? props.type : "info");
    const [alertHeading, setAlertHeading] = useState(props.type ? props.type : "info");
    const [alertIcon, setAlertIcon] = useState("");
    const [timerLength, setTimerLength] = useState(0);
    const [alertCount, setAlertCount] = useState(props.index);
   // const [showAlert, setShowAlert] = useState(false);
    const myStyle = { "bottom": alertCount === 0  ? "20px" : (alertCount * 115) + "px"} ;

    useEffect(() => {
        if(props.type === "success") {
            setAlertIcon(successIcon);
        } else if (props.type === "error") {
            setAlertIcon(errorIcon);
        } else if (props.type === "warning") {
            setAlertIcon(worningIcon);
        } else {
            setAlertIcon(infoIcon);
        }
        closeAlert();
    }, []);
    useEffect(() => {
        console.log(props)
    }, [props]);
    const closeAlert = () => {
        let time = showingTime;
        let timerFn = setInterval(() => {
            setTimerLength((time * 100) / showingTime);
            if (time <= 0) {
                clearInterval(timerFn);
                setTimeout(() => {
                    props.close(props);
                }, 500);
            }
            time = time - 10;
        }, 10);
    };
    return (
        <>
            
            <div className={"alertMessage " + alertType + (timerLength <= 0 ? " hideAlert " : "")} style={myStyle}>
                <div className="alertMsgWrap">
                    <button type="button" className="closeAlert" onClick={() => props.close()} ></button>
                    <div className="alertBody">
                        <div className="alertBodyLeft">
                            <img src={alertIcon} alt="" />
                        </div>
                        <div className="alertBodyRight">
                            <h2>{alertHeading}</h2>
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
                <div className="alertTimer" style={{"width": timerLength + "%"}}></div>
            </div>
            
        </>
    )
};

export default AlertMessage;