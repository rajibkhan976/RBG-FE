import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import ZapierSetup from "./src/zapierSetup";


const Zapier = () => {
    document.title = "Red Belt Gym - Zapier";

    return (
        <>
            <ZapierSetup/>
        </>
    );
};

export default Zapier;
