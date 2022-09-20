import React, { useEffect, useRef, useState } from "react";

import Loader from "../../Loader";
import thunder from "../../../../assets/images/thunder.svg";
import dot3gray from "../../../../assets/images/dot3gray.svg";
import {ContactService} from "../../../../services/contact/ContactServices";
import {AutomationServices} from "../../../../services/automation/AutomationServices";
import * as actionTypes from "../../../../actions/types";
import {useDispatch} from "react-redux";




const Automation = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState(null);
  console.log(props.contactId);
  const [list, setList] = useState([]);
  
  const getList = async () => {
    try {
      setIsLoading(true);
      let contact = await AutomationServices.fetchContactAutomations(props.contactId);
      setList(contact.data);
    } catch (e) {
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        message: e.message,
        typeMessage: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getList();
  }, [])
  const toggleOptions = (index) =>{
    setOption(index !== option ? index : null)
  }
  return (
    <div className="contactTabsInner appointmentPage attendencePage">
      <div className="modalcont_header">
        <div className="names">
          <h3 className="headingTabInner">Assigned Automations</h3>
          {/* <p className="subheadingTabInner"> &nbsp;</p> */}
        </div>     
      </div>
      <div className="contactModalAutomationTable">
        { isLoading ? <Loader /> : ""}
        {
          list.length ?
              <>
                <div className="automationHeaderContactModal">
                  <div className="cell">Name</div>
                  <div className="cell">Status</div>
                  {/* <div className="cell">Stages Completed</div>
                <div className="cell">&nbsp;</div>*/}
                </div>
                {list.map((elem, key)=>{
                return(
                <div key={key} className={(elem.automationStatus == "Completed") ? "automationListingContactModal complete" : "automationListingContactModal"}>
                <div className="cell"><img src={thunder} alt=""/> <span className="nameTxt">{elem?.automationDetails?.name}</span></div>
                <div className="cell"><span className={(elem.automationStatus == "Completed")? "completeTxt":"progressTxt"}>{elem.automationStatus}</span></div>
              {/*<div className="cell">
                  <span>{elem.stage/0.25} of 4</span>
                  <div className="smallProgressor">
                    <span className="bar" style={{width: 100*elem.stage+"%"}}></span>
                  </div>
                </div>
                <div className="cell">
                  <div className="sideEditOption">
                    <button onClick={() => { toggleOptions(key)}}>
                      <img src={dot3gray} alt="" />
                    </button>
                    <div className={
                            option === key
                              ? "dropdownOptions big listOpen"
                              : "listHide"
                          }>
                            <button className="btn btnEdit">
                              <span>
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10.056 2.05483V0.743831C10.0554 0.616202 10.0224 0.490807 9.96015 0.379395C9.89789 0.267983 9.80836 0.1742 9.69996 0.106831C9.58415 0.0381393 9.4523 0.00114437 9.31766 -0.00043547C9.18302 -0.00201531 9.05034 0.0318758 8.93296 0.0978311L6.44296 2.08683C6.31943 2.1497 6.21562 2.2454 6.14293 2.36343C6.07025 2.48145 6.0315 2.61722 6.03096 2.75583C6.02839 2.88763 6.0621 3.0176 6.12841 3.13153C6.19473 3.24546 6.29109 3.33897 6.40696 3.40183L8.96996 5.43883C9.07432 5.49086 9.18935 5.5179 9.30596 5.51783C9.44495 5.51867 9.58129 5.47982 9.69896 5.40583C9.80828 5.33914 9.89857 5.24539 9.9611 5.13363C10.0236 5.02188 10.0563 4.89589 10.056 4.76783V3.63683C11.0412 4.01105 11.9053 4.64756 12.5549 5.47749C13.2044 6.30742 13.6146 7.29918 13.7412 8.34545C13.8677 9.39172 13.7057 10.4527 13.2727 11.4135C12.8397 12.3744 12.1522 13.1985 11.2846 13.7968C10.417 14.3951 9.40228 14.7447 8.35028 14.8079C7.29827 14.871 6.24903 14.6453 5.31607 14.1551C4.3831 13.6649 3.60194 12.929 3.05711 12.0268C2.51228 11.1247 2.22452 10.0907 2.22496 9.03683C2.22424 7.56275 2.78987 6.14472 3.80496 5.07583C3.86237 5.01545 3.90674 4.94388 3.9353 4.8656C3.96386 4.78733 3.976 4.704 3.97096 4.62083C3.96605 4.54126 3.94457 4.4636 3.90789 4.39282C3.87121 4.32204 3.82014 4.25971 3.75796 4.20983L3.50796 4.00983C3.39328 3.91529 3.2471 3.86759 3.09873 3.87631C2.95036 3.88502 2.81077 3.94951 2.70796 4.05683C1.6225 5.21225 0.943994 6.69049 0.775573 8.26683C0.607151 9.84317 0.95803 11.4314 1.77487 12.7901C2.59171 14.1487 3.82983 15.2035 5.30103 15.7941C6.77222 16.3847 8.39602 16.4788 9.92557 16.0621C11.4551 15.6453 12.8068 14.7406 13.7751 13.4853C14.7434 12.2301 15.2753 10.693 15.2901 9.10778C15.3048 7.52254 14.8016 5.97583 13.8568 4.70278C12.9121 3.42973 11.5775 2.49997 10.056 2.05483Z" className="a"/>
                                </svg>
                              </span>
                              Restart this Automation
                            </button>
                            <button className="btn btnDelete" >
                              <span>
                                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M10.5 6C9.98878 6.00093 9.48149 6.0892 9 6.261V5H5V6H3V4H4V0H0V4H2V12H5V14H7.674C8.23401 14.4526 8.89444 14.7641 9.59982 14.9085C10.3052 15.053 11.0349 15.026 11.7278 14.83C12.4206 14.6339 13.0562 14.2745 13.5813 13.7818C14.1064 13.2892 14.5056 12.6778 14.7455 11.9989C14.9853 11.32 15.0587 10.5934 14.9595 9.88026C14.8604 9.16711 14.5915 8.48816 14.1756 7.90044C13.7597 7.31272 13.2088 6.83338 12.5692 6.50269C11.9296 6.172 11.22 5.99961 10.5 6ZM5 11H3V7H5V9H6.261C6.14549 9.32331 6.06765 9.65886 6.029 10H5V11ZM10.5 13.941C9.81915 13.9412 9.15354 13.7395 8.58735 13.3613C8.02116 12.9832 7.57984 12.4456 7.3192 11.8167C7.05856 11.1877 6.99031 10.4955 7.12309 9.82774C7.25587 9.15997 7.58371 8.54657 8.06514 8.06514C8.54657 7.58371 9.15997 7.25587 9.82774 7.12309C10.4955 6.99031 11.1877 7.05856 11.8167 7.3192C12.4456 7.57984 12.9832 8.02116 13.3613 8.58735C13.7395 9.15354 13.9412 9.81915 13.941 10.5C13.9389 11.412 13.5757 12.286 12.9308 12.9308C12.286 13.5757 11.412 13.9389 10.5 13.941Z" className="a"/>
                                </svg>
                              </span>
                              Remove from this Automation
                            </button>
                    </div>
                  </div>

                </div>*/}
                </div>
                )
              })}
              </>
               :
              <div className="noDataFound appointmentTab">
                <span><span>This contact does not assigned to any automation yet.</span></span>
              </div>
        }
    </div>
    
  </div>


);
};

export default Automation;

 
