import React, { useState } from "react";


const UpdateNotification = (props) => {

    const [hidePopup, setHidePopup] = useState(false);

    
    const closePopup = () => {
        // setHidePopup(true);
        props.closeNotification();
    }

    const upgrade = () => {
        window.location.reload();
    }

    return (
        <div className={hidePopup ? "updateNotiAlert hide" : "updateNotiAlert"}>
            <div className="circleArrow">
            </div>
            <div className="notiAlertBody">
                <h2>V {props.version} is available</h2>
                <p>New surprises are waiting for you.</p>
            </div>
            <button type="button" className="updateAcceptBtn" onClick={upgrade}>Upgrade</button>
            <button type="button" className="closeUpdateNoti" onClick={closePopup}></button>
        </div>
    );
    
};



export default UpdateNotification;
