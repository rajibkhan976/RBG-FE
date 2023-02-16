import React from "react";
import { Route } from "react-router-dom"


import InnerLeftMenu from "../../shared/InnerLeftMenu";
import DashboardFooter from "../../shared/FooterDashboard";
import NotificationUserList from "./notificationUserList";

const NotificationGroupRouter = (props) => {
    const renderID = (randomID) => {
        console.log("Random ID", randomID);
    }
    return (
        <>
            <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="setup" reRender={(id) => renderID(id)} />
            <div className="dashboardElComponent">
                <div className="dashInnerStructure">
                    <Route path="/notification-group" component={NotificationUserList} />
                    <DashboardFooter />
                </div>
            </div>
        </>
    )
}
export default NotificationGroupRouter;