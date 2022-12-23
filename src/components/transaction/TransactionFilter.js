import React, {useEffect, useState} from "react";

import arrowDown from "../../assets/images/arrowDown.svg";
import arrowRightWhite from "../../assets/images/arrowRightWhite.svg";
import Loader from "../shared/Loader";
import { utils } from '../../helpers';
import { TransactionHistoryServices } from "../../services/transaction/TransactionHistoryServices";

function ImportTransactionFilter(props) {
    const [isLoader, setIsLoader] = useState(false);
    
    const [selectStatus, setSelectStatus] = useState("");
    const [selectItem, setSelectItem] = useState("");
    const [selectName, setSelectName] = useState("");
    const [selectedTo, setSelectedTo] = useState("");
    const [selectedFrom, setSelectedFrom] = useState("");


    const selectStatusHandler = (e) =>{
        setSelectStatus(e.target.value)
    }
    const selectItemHandler = (e) =>{
        setSelectItem(e.target.value)
    }
    const selectNameHandler = (e) =>{
        setSelectName(e.target.value)
    }
    const selectFromHandler = (e) =>{
        setSelectedFrom(e.target.value)
    }
    const selectToHandler = (e) =>{
        setSelectedTo(e.target.value)
    }

    const applyFilter = () => {
    //    let filterString = "?contact=" + selectName + "&status=" + selectStatus + "&item=" + selectItem + "&fromDate=" + selectedFrom + "&toDate=" + selectedTo ;
        if (selectStatus) {
            utils.addQueryParameter('status', selectStatus);
        } else {
            utils.removeQueryParameter('status');
        }
        if (selectItem) {
            utils.addQueryParameter('item', selectItem);
        } else {
            utils.removeQueryParameter('item');
        }
        if (selectName) {
            utils.addQueryParameter('contact', selectName);
        } else {
            utils.removeQueryParameter('contact');
        }
        if (selectedTo) {
            utils.addQueryParameter('fromDate', selectedFrom);
        } else {
            utils.removeQueryParameter('fromDate');
        }
        if (selectedTo) {
            utils.addQueryParameter('toDate', selectedTo);
        } else {
            utils.removeQueryParameter('toDate');
        }
        
        utils.addQueryParameter("page", 1);
        

        props.getFilterStr();
    };

    useEffect(() => {
        setSelectStatus(utils?.getQueryVariable("status"));
        setSelectItem(utils?.getQueryVariable("item"));
        setSelectName(utils?.getQueryVariable("contact"));
        setSelectedTo(utils?.getQueryVariable("toDate"));
        setSelectedFrom(utils?.getQueryVariable("fromDate"));
    }, []);
        
    return (
        <>
            <div className="sideMenuOuter" id="import_Modal">
                <div className="dialogBg" onClick={props.closeFilter}></div>
                <div className="sideMenuInner importModalContainer updateContainer">
                    {isLoader ? <Loader/> : ''}
                    <div className="sideMenuHeader">
                        <h3>Apply Filter</h3>
                        {/* <button className="btn btn-closeSideMenu"></button> */}
                        <button className="btn btn-closeSideMenu" onClick={props.closeFilter}>
                            <span></span><span></span></button>
                    </div>
                    <div className="importModalBody setFilter">
                        <div className="filterOfContactListing">
                            <div className="infoInputs appModal">
                                <ul>
                                    <li className="blockLi">
                                        <div className="formField w-100 appModals formControl phasesSelection">
                                            <label>Payment status</label>
                                            <select value = {selectStatus} onChange={selectStatusHandler} style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option >Select </option>
                                                <option value="success">Success</option>
                                                <option value="failed">Failed</option>
                                                <option value="refund">Refund</option>
                                                <option value="overdue">Overdue</option>
                                              
                                            </select>
                                        </div>
                                        <div className="formField w-100 appModals formControl statusSelection">
                                            <label>Item type</label>
                                            <select value= {selectItem} onChange={selectItemHandler} style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }}>
                                                <option value="">Select</option>
                                                <option>Program</option>
                                                <option>Product</option>
                                                
                                            </select>
                                        </div>
                                        {/* <div className="formField w-100 appModals formControl">
                                            <label>Contact name</label>
                                            <select value= {selectName} onChange={selectNameHandler} style={{
                                                        backgroundImage: "url(" + arrowDown + ")",
                                                    }} placeholder="eg. John">
                                                <option value="">Select</option>
                                                {
                                                   props.contact && props.contact.map((elem, key) =>{
                                                        return(
                                                            <option key={"name_" + key} value={elem.id}>{elem.name}</option>
                                                        )
                                                    })
                                                }
                                                
                                                
                                            </select>
                                        </div> */}
                                    </li>
                                    <li className="dateRangeHeading"><p className="dateRange pTags">Date Range</p></li>
                                    <li className="halfDates noMargin">
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>From</label>
                                            <div className="inFormField duration">
                                                <input type="date" placeholder="dd/mm/yyyy" name="" value={selectedFrom} onChange={selectFromHandler} />
                                            </div>
                                        </div>
                                        <div className="formField w-50 appflex durationWraper">
                                            <label>To</label>
                                            <div className="inFormField duration">
                                                <input type="date" placeholder="dd/mm/yyyy" name="" value={selectedTo} onChange={selectToHandler} min={selectedFrom}/>
                                            </div>
                                        </div>
                                    </li>
                        
                                    <li className="gapBtnRow">
                                        <div className="formField formControl w-50 appflex">
                                            <button type="button" className="saveNnewBtn" onClick={applyFilter}><span>Apply Filter</span><img
                                                src={arrowRightWhite} alt=""/></button>
                                        </div>
                                        <div className="formField w-50 appflex clearFilterBtns">
                                            <span className="clearFilter" onClick={props.clearFilter}>Clear</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ImportTransactionFilter;