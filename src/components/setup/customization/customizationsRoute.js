import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import InnerLeftMenu from "../../shared/InnerLeftMenu";
import HeaderDashboard from "../../shared/HeaderDashboard";
import DashboardFooter from "../../shared/FooterDashboard";
import Customizations from "./customizations";
import AppointmentTags from "../AppointmentTags/AppointmentTags";
import ProgramAgeGroup from "../ProgramAgeGroup/ProgramAgeGroup";
import { Redirect, Switch } from "react-router-dom";
import ProductSizes from "../productSizes/ProductSizes";
import ProductColors from "../productColors/ProductColors";


const CustomizationRouter = (props) => {
    document.title = "Red Belt Gym - Customization";
    const [isLoader, setIsLoader] = useState(false);
    const [randomID, setRandomID] = useState(Math.random().toString());
    const renderID = (randomID) => {
        console.log("Random ID", randomID);
    }
    //const [filteredData, setFilteredData] = useState(null);
    return (
        <>
            <InnerLeftMenu toggleLeftSubMenu={props.toggleLeftSubMenu} routeMenu="setup" reRender={(id) => renderID(id)} />
            <div className="dashboardElComponent">
                {/* <HeaderDashboard toggleCreate={(e) => props.toggleCreate(e)} /> */}
                <div className="dashInnerStructure">
                    <Switch>
                        <Route path="/customizations/custom-fields" component={Customizations} />
                        <Route path="/customizations/appointment-tags" component={AppointmentTags} />
                        <Route path="/customizations/program-age-groups" component={ProgramAgeGroup} />
                        <Route path="/customizations/product-sizes" component={ProductSizes} />
                        <Route path="/customizations/product-color" component={ProductColors} />
                        <Route exact path="/customizations" component={() => <Redirect to="/customizations/custom-fields" />} />
                    </Switch>
                    <DashboardFooter />
                </div>
            </div>
        </>
    )
};

export default CustomizationRouter;
