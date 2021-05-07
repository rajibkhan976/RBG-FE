import { useEffect } from "react";

const Notifications = () => {
  let dummyListing = [
    {
      Type: "Payment",
      Client: "Client One",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: false,
    },
    {
      Type: "Payment",
      Client: "Steve Martyns",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: false,
    },
    {
      Type: "Payment",
      Client: "Steve Rogers",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: false,
    },
    {
      Type: "Payment",
      Client: "Clark Kent",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: true,
    },
    {
      Type: "Payment",
      Client: "Client One",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: false,
    },
    {
      Type: "Payment",
      Client: "Steve Martyns",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: false,
    },
    {
      Type: "Payment",
      Client: "Steve Rogers",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: false,
    },
    {
      Type: "Payment",
      Client: "Clark Kent",
      Amount: "$97",
      Status: "Success",
      Product: "Generate Money Online course",
      Read: true,
    },
  ];

  const showNOtifDetails = (e) => {
    console.log(e.target.parentNode);
  };

  useEffect(() => {});

  return (
    <div className="notificationsListing">
      <ul>
        <li>
          Rank Qualification
          <button
            className="inlinle-btn btn-link"
            onClick={(e) => showNOtifDetails(e)}
          >
            View All
          </button>
        </li>
        <li>
          SMS
          <button
            className="inlinle-btn btn-link"
            onClick={(e) => showNOtifDetails(e)}
          >
            View All
          </button>
        </li>
        <li>
          Email
          <button
            className="inlinle-btn btn-link"
            onClick={(e) => showNOtifDetails(e)}
          >
            View All
          </button>
        </li>
        <li>
          Lead
          <button
            className="inlinle-btn btn-link"
            onClick={(e) => showNOtifDetails(e)}
          >
            View All
          </button>
        </li>
        <li>
          Payment
          <button
            className="inlinle-btn btn-link"
            onClick={(e) => showNOtifDetails(e)}
          >
            View All
          </button>
        </li>
        <li>
          Deliquent Membership
          <button
            className="inlinle-btn btn-link"
            onClick={(e) => showNOtifDetails(e)}
          >
            View All
          </button>
        </li>
        <li>
          MIA
          <button
            className="inlinle-btn btn-link"
            onClick={(e) => showNOtifDetails(e)}
          >
            View All
          </button>
        </li>
      </ul>
      {/* <ul>
        {dummyListing.map((data, index) => {
          return (
            <li
              className={
                data.Read === true
                  ? "notif"
                  : data.Read === false
                  ? "notif unreadNotification"
                  : "notif"
              }
              key={index}
            >
              {data.Client} {data.type === "Payment" && "paid"} {data.Amount}{" "}
              {data.Status === "Success" && "successfully"} for the product “
              {data.Product}”
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default Notifications;
