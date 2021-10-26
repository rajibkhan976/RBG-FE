import React from "react";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import icon_trans from "../../../../assets/images/icon_trans.svg";
import wwConnect from "../../../../assets/images/wwConnect.svg";
import wwConnect2 from "../../../../assets/images/wwConnect2.svg";


const Transaction = (props) => {

    
    return(
        <>
             <div className="contactTabsInner">
               <h3 className="headingTabInner">Transactions</h3> 
               <div className="transHeader">
                   <button className="saveNnewBtn" onClick={props.goToTransaction}>Make a Transaction <img src={arrow_forward} alt=""/></button>
                   <span>* Explanatory text blurb should be here.</span>
               </div>
               <div className="transactionListing">
                    <div className="row head">
                        <div className="cell">
                           Particulars
                        </div>
                        <div className="cell">
                           Amount
                        </div>
                        <div className="cell">
                           Transaction ID
                        </div>
                        <div className="cell">
                           &nbsp;
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                    <span className="ifDependent"><img src={wwConnect} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                    <a href="" className="dependent"> <span><img src={wwConnect2} alt=""/></span> Emily Martyns</a>
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row fail">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">FAILED</div> 
                                    <div><span>FAILED Membership:</span> “Month of July 2021”</div>   
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount pos">$97
                              <span>POS</span>
                           </span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                    <span className="ifDependent"><img src={wwConnect} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                    <a href="#" className="dependent"> <span><img src={wwConnect2} alt=""/></span> Emily Martyns</a>
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                    <span className="ifDependent"><img src={wwConnect} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                    <a href="#" className="dependent"> <span><img src={wwConnect2} alt=""/></span> Emily Martyns</a>
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                    <span className="ifDependent"><img src={wwConnect} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                    <a href="#" className="dependent"> <span><img src={wwConnect2} alt=""/></span> Emily Martyns</a>
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                    <span className="ifDependent"><img src={wwConnect} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                    <a href="#" className="dependent"> <span><img src={wwConnect2} alt=""/></span> Emily Martyns</a>
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
                    <div className="row success">
                        <div className="cell">
                            <div className="d-flex">
                                <div className="iconCont">
                                    <span><img src={icon_trans} alt=""/></span>
                                    <span className="ifDependent"><img src={wwConnect} alt=""/></span>
                                </div>
                                <div className="textCont">
                                    <div className="status">SUCCESS</div> 
                                    <div><span>Course:</span> “Sample course name”</div>   
                                    <a href="#" className="dependent"> <span><img src={wwConnect2} alt=""/></span> Emily Martyns</a>
                                </div> 
                            </div>               
                        </div>
                        <div className="cell">
                           <span className="amount">$97</span>
                        </div>
                        <div className="cell">
                            <span className="transID">dfg41456df1567sdtfg24g</span>
                        </div>
                        <div className="cell">
                            <span className="time">2m ago</span>
                        </div>
                    </div>
               </div>
           </div>
        </>
    );
}

export default Transaction;