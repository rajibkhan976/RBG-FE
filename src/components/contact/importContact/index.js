import React, {useState} from "react";

import { Steps, Step } from "react-step-builder";
import Step1 from "./step1";
import Step2 from "./step2";
import FinalStep from "./step3";

function ImportContact(props) {
    const closeModal = () => {
        props.hideModal();
    }
    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="sideMenuInner importModalContainer">
                    <div className="sideMenuHeader">
                        <h3>Import Contacts</h3>
                        <p>Upload contacts in your organization</p>
                        <button className="btn btn-closeSideMenu" onClick={() => closeModal()}><span></span><span></span></button>
                    </div>
                    <Steps>
                        <Step component={Step1} />
                        <Step component={Step2} />
                        <Step component={FinalStep} handleParentFun={()=>{closeModal();}}/>
                    </Steps>
                </div>
            </div>
        </>

    );
}

export default ImportContact;