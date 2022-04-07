import React, {useEffect, useState} from "react";
import { ZapierServices } from "../../../../services/authentication/ZapierServices";
import Loader from "../../../shared/Loader";
import AlertMessage from "../../../shared/messages/alertMessage";

const ZapierSetup = (props) => {
    const [zapierKey, setZapierKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copyToClipMsg, setCopyToClipMsg] = useState({
        message: "",
        type: ""
    });
    const closeCopyToClipAlert = () => {
        setCopyToClipMsg({...copyToClipMsg, message: "", type: ""});
    };
    const fetchZapierKey = async () => {
        setIsLoading(true);
        let zapierResp = await ZapierServices.fetchKey();
        setIsLoading(false);
        setZapierKey(zapierResp.key);
    }
    const copyToClipboard = (id) => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            setCopyToClipMsg({ ...copyToClipMsg, message: "Copied to clipboard", type: "success"});
            return navigator.clipboard.writeText(id);
        }
    };
    useEffect(() => {
        fetchZapierKey();
    }, []);
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
                    { isLoading ? <Loader/> : ""}
                    <h3>Zapier invitation link</h3>
                    <p className="pid">{ process.env.REACT_APP_ZAPIER }
                        <button type="button" className="copyTo" onClick={() => copyToClipboard(process.env.REACT_APP_ZAPIER)}/></p>

                    <h3>API token</h3>
                    <p className="pid">{ zapierKey } <button type="button" className="copyTo" onClick={() => copyToClipboard(zapierKey)}/></p>
                </div>
            </div>
            { copyToClipMsg.message ?
                <AlertMessage message={copyToClipMsg.message} type={copyToClipMsg.type} time={2000} close={closeCopyToClipAlert} />
                : ""}
        </>
    );
};

export default ZapierSetup;
