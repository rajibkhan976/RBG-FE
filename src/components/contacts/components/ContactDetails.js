import { useState } from "react";

function ContactDetails(props) {
  const [contactDetail, setContactDetail] = useState(null);

  const viewcontactDetail = (e) => {
    let valueFromContact = e.target.parentNode.getAttribute('data-contact');
    setContactDetail(valueFromContact);
    console.log(valueFromContact, contactDetail);
  };

  return (
    <>
      User Contact Details
      <li data-contact="contact-xyz">
        <button onClick={(e) => viewcontactDetail(e)}>Contact Details</button>
      </li>
      {contactDetail && (
        <div className="sideMenuOuter contactDetailsSide">
          <div className="sideMenuInner">
            <div className="sideMenuHeader">
              <h3>Contact Details</h3>
              <p>Check and track every details for the contact</p>
              <button
                className="btn btn-closeSideMenu"
                onClick={(e) => (setContactDetail(null))}
              >
                <span></span>
                <span></span>
              </button>
            </div>

            <div className="sideMenuBody"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactDetails;
