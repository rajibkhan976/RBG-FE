import React, { useEffect, useState } from "react";

import filter from "../../assets/images/filter.svg";
import { utils } from '../../helpers';

const TransactionHead = (props) => {
  const [searcField, setSearcField] = useState("");
  const sarchHandler = (e) =>{
    setSearcField(e.target.value);
  }
  const searchClick = () => {
      if (searcField) {
          utils.addQueryParameter('search', searcField);
      } else {
          utils.removeQueryParameter('search');
      }
      props.search();
  }
  useEffect(() => {
    let keyword = utils.getQueryVariable('search');
    
    setSearcField(keyword ? decodeURIComponent(keyword.replaceAll("+", " ")) : "");
  }, []);



  return (
    <div className="userListHead">
      <div className="listInfo">
        <ul className="listPath">
          <li>Dashboard</li>
          <li>Global Transaction</li>
        </ul>
        <h2 className="inDashboardHeader">Transaction List (<span>{props.transactionCount}</span>)</h2>
        <p className="userListAbout">
           See all your transaction history
        </p>
        
      </div>
      <div className="listFeatures">
          <div className="searchBar">
            <form>
              <input type="search" name="search" placeholder="Search Contacts" autoComplete="off" value={searcField} onChange={sarchHandler}/>
              <button className="searchIcon" type="button"  onClick={searchClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19.069" height="19" viewBox="0 0 19.069 19" id="search-ico"><g transform="translate(-1.5 -1.5)">
                    <path className="a" d="M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z"></path><path className="a" d="M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z" transform="translate(-7.142 -7.143)"></path></g></svg>
              </button>
            </form>
          </div>
          <button className="saveNnewBtn appFilter expContactBtn transGlobFilterBtn" onClick={props.openFilter}>Filter <img src={filter} alt=""/></button>
      </div>
    </div>
  );
};

export default TransactionHead;
