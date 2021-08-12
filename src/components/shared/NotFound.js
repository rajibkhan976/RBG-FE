import React from 'react';
import DashboardFooter from './FooterDashboard';
import HeaderDashboard from './HeaderDashboard';
import InnerLeftMenu from './InnerLeftMenu';

const NotFound = () => {
    return (
        <React.Fragment>
            <InnerLeftMenu />
            <div className="dashboardElComponent">
                <HeaderDashboard/>
                <div className="dashInnerStructure">
                    <div>
                        <h2>Not Found!</h2>
                    </div>
                    <DashboardFooter />
                </div>
            </div>
        </React.Fragment>

    )
}

export default NotFound;
