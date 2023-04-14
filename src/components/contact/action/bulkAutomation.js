import React, { useState } from "react";
import Loader from "../../shared/Loader";
import arrow_forward from "../../../assets/images/arrow_forward.svg";

const BulkAutomation = (props)=>{
    const [isloader, setIsLoader] = useState(false);
    const closeModal = ()=>{
        props.hideModal();
    }
    const automationList =[
        {value: 'webhook', viewValue: 'Web hook'},
        {value: 'contact', viewValue: 'Contact'},
        {value: 'appointment', viewValue: 'Appointment'},
        {value: 'attendance', viewValue: 'Attendance'},
        {value: 'transaction', viewValue: 'Transaction'},
        {value: 'tag', viewValue: 'Tag'}
    ]
    return(
        <>
            {isloader && <Loader />}
            <div className="sideMenuOuter" id="import_Modal">
                <div className="dialogBg" onClick={() => closeModal()}></div>
                <div className="sideMenuInner bulkSmsModel">
                    <div className="sideMenuHeader">
                        <h3>Actions</h3>
                        <p>Select an Automation from the list..</p>
                        <button className="btn btn-closeSideMenu" onClick={() => closeModal()}><span></span><span></span></button>
                    </div>
                    <div className="bulkModalBody">
                        <form>
                            <div className="slice">
                                <label>Automation List</label>
                                <div className="cmnFormField">
                                    <select
                                        type="text"
                                        className="cmnFieldStyle btnSelect"
                                    >   
                                        { automationList && automationList.map((item, index)=>{
                                            return(
                                                <option key={index} value={item.value} >{item.viewValue}</option>
                                            )
                                        })
                                        }
                                        <option value={null}>Select</option>
                                    </select>
                                </div>
                            </div>
                            <div className="slice text-center">
                                <button className="cmnBtn">
                                Add to Automation <img src={arrow_forward} alt="" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BulkAutomation;