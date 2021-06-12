import React from "react";
import { ProtectedRoute } from "../../middleware/ProtectedRoute";
import contact from "./contact";


const ContactRoutes = (props) => {
  return (
    <React.Fragment>
      <ProtectedRoute exact path="/contacts" component={contact} />
    </React.Fragment>
  );
}

export default ContactRoutes;
