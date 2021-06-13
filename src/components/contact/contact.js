import React from 'react';

import LeftMenu from "../shared/LeftMenu";
import HeaderDashboard from "../shared/HeaderDashboard";
import DashboardFooter from "../shared/FooterDashboard";
import InnerLeftMenu from "../shared/InnerLeftMenu";
import ImportContactModal from './importContactModal';

const contact = () => {

    

    return (
        <div className="mainComponent">
      <div className="dashboardBody d-flex f-align-center">
        <LeftMenu />
        <div className="dashMain">
          <InnerLeftMenu />
          <div className="dashboardElComponent">
            <HeaderDashboard  />
            <div className="dashInnerStructure">
              <h1></h1>
                <ImportContactModal />
              <DashboardFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default contact
