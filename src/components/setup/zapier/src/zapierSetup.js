import React, {useEffect, useState} from "react";
import { ZapierServices } from "../../../../services/authentication/ZapierServices";



const ZapierSetup = (props) => {
    const [zapierKey, setZapierKey] = useState("");
    const fetchZapierKey = async () => {
        let zapierResp = await ZapierServices.fetchKey();
        setZapierKey(zapierResp.key);
    }
    useEffect(() => {
        fetchZapierKey();
    }, [])
    /****************************** FUNCTIONS START **********************************/
    return (
        <>
            <div className="dashInnerUI productSteUp">
                <div className="userListHead product">
                    <div className="listInfo">
                        <ul className="listPath">
                            <li>Settings </li>
                            <li>zapier</li>
                        </ul>
                        <h2 className="inDashboardHeader">
                            Zapier
                        </h2>
                        <p className="userListAbout">Setup your zapier app.</p>
                    </div>
                </div>
                <div className="apiDisplay">
                    <h3>Zapier Config</h3>
                    <p>https://zapier.com/developer/invite/107874/70e3046f7faaabf0c5a337ecfeec34ca/</p>

                    <h3>API Tokens</h3>
                    <p>{ zapierKey }</p>
                </div>
            </div>
        </>
    );
};

export default ZapierSetup;
