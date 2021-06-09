import { useState } from "react";
import CrossImage from "../../assets/images/cross_icon.svg";

const NotificationPopup = () => {
  const [notificationPopup, setNotificationPopup] = useState(null);

  const closePopup = () => {
    setNotificationPopup(null);
  };

  return (
    <>
      {notificationPopup !== null && notificationPopup === "error" ? (
        <div className="popupOuter errorPopup">
          <div className="popupInner">
            <div className="popupHeader">
              <h2>Error</h2>
              <button className="btn" onClick={closePopup}>
                <img src={CrossImage} alt="Close Modal" />
              </button>
            </div>
            <div className="popupBody">
              <p>
                Lorem Ipsum dolor emit Lorem Ipsum dolor emit Lorem Ipsum dolor
                emit Lorem Ipsum dolor emit Lorem Ipsum dolor emit Lorem Ipsum
                dolor emit
              </p>
            </div>
          </div>
        </div>
      ) : notificationPopup === "warning" ? (
        <div className="popupOuter warningPopup">
          <div className="popupInner">
            <div className="popupHeader">
              <h2>Warning</h2>
              <button className="btn" onClick={closePopup}>
                <img src={CrossImage} alt="Close Modal" />
              </button>
            </div>
            <div className="popupBody">
              <p>
                Lorem Ipsum dolor emit Lorem Ipsum dolor emit Lorem Ipsum dolor
                emit Lorem Ipsum dolor emit Lorem Ipsum dolor emit Lorem Ipsum
                dolor emit
              </p>
            </div>
          </div>
        </div>
      ) : notificationPopup === "success" ? (
        <div className="popupOuter successPopup">
          <div className="popupInner">
            <div className="popupHeader">
              <h2>Success</h2>
              <button className="btn" onClick={closePopup}>
                <img src={CrossImage} alt="Close Modal" />
              </button>
            </div>
            <div className="popupBody">
              <p>
                Lorem Ipsum dolor emit Lorem Ipsum dolor emit Lorem Ipsum dolor
                emit Lorem Ipsum dolor emit Lorem Ipsum dolor emit Lorem Ipsum
                dolor emit
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default NotificationPopup;
