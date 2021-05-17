import { useEffect, useState } from "react";

import BackArrow from "../assets/images/back-arrow.png";

const Notifications = () => {
  let [detailNotification, setDetailNotification] = useState(null);
  let dummyListing = {
    Payment: [
      {
        Client: "Client One",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Two",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Three",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Four",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Five",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Six",
        Amount: "$97",
        Status: "Fail",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Seven",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
    ],
    Rank: [
      {
        Client: "Client Four",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Five",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Six",
        Amount: "$97",
        Status: "Fail",
        Product: "Generate Money Online course",
        Read: true,
      },
      {
        Client: "Client Seven",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
    ],
    SMS: [
      {
        Client: "Client One",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Two",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Three",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Four",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Five",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Six",
        Amount: "$97",
        Status: "Fail",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Seven",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
    ],
    Email: [
      {
        Client: "Email One",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Email Two",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Email Three",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Email Four",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Email Five",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Email Six",
        Amount: "$97",
        Status: "Fail",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Email Seven",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
    ],
    Lead: [
      {
        Client: "Client One",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Two",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Three",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Four",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Five",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Six",
        Amount: "$97",
        Status: "Fail",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Seven",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
    ],
    Membership: [
      {
        Client: "Client One",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Two",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Three",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Four",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Five",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Six",
        Amount: "$97",
        Status: "Fail",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Seven",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
    ],
    MIA: [
      {
        Client: "Client One",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Two",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Three",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Four",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Five",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Six",
        Amount: "$97",
        Status: "Fail",
        Product: "Generate Money Online course",
        Read: false,
      },
      {
        Client: "Client Seven",
        Amount: "$97",
        Status: "Success",
        Product: "Generate Money Online course",
        Read: false,
      },
    ]
  };

  const goBackToNotificationListing = () => {
    setDetailNotification(null);
  };

  const showNOtifDetails = (e) => {
    e.preventDefault();
    setDetailNotification(e.target.parentNode.getAttribute("data-listing"));
  };

  useEffect(() => {});

  return (
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
          <ul className="notifLabels">
            {Object.keys(dummyListing).map((keyname, i) => {
              let lengthData = null;
              for (const key of dummyListing[keyname].keys()) {
                if (key >= 0) {
                  lengthData = key + 1;
                  console.log(key + 1);
                } else {
                  lengthData = null;
                }
              }
              return (
                <li key={i} data-listing={keyname}>
                  {keyname}

                  <span>{lengthData}</span>
                  <button
                    className="inlinle-btn btn-link"
                    onClick={(e) => showNOtifDetails(e)}
                  >
                    View All
                  </button>
                </li>
              );
            })}
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
              <img src={BackArrow} alt="Go back to listing" />
              Back
            </button>
          </h4>
          <ul className="detailNotifList">
            {dummyListing[detailNotification].map((e, i) => {
              return (
                <li key={i} className={e.Read ? "detailNotif": "detailNotif unreadNotifications"}>
                  <span className="timeStamp">2 min ago</span>
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
                  {e.Client} {e.paid && " paid " + e.Amount + " successfully"}{" "}
                  for the product “{e.Product}”
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notifications;
