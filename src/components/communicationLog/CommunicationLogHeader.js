import React, {useState, useEffect, useRef } from 'react';


import filter from "../../assets/images/filter.svg";
import {utils} from "../../helpers";

const CommunicationLogHeader = (props) => {
  const [keyword, setKeyword] = useState(null);
  const [clickOnSearch, setClickOnSearch] = useState(false);


  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setClickOnSearch(false);
  }; 
  const handleSearch = (event) => {
    event.preventDefault();
    utils.addQueryParameter("page", 1);
    if (keyword) {
        utils.addQueryParameter("search", keyword);
    } else {
        utils.removeQueryParameter("search");
    }
   // setUpdatelistOnList(true)
   setClickOnSearch(true)
};


setTimeout(() => {
  props.clickOnSearch(clickOnSearch)         
}, 500);




  return (
    
    <div className="userListHead lessGap">
      <div className="listInfo">
        <ul className="listPath">
          <li>Communication Log </li>  
          <li>All</li>
        </ul>
        <h2 className="inDashboardHeader">Communication Log 
        {/* <span>({props.countCommLog})</span> */}
        </h2>
        <p className="userListAbout">
           Listing of Communication Log for your Organization 
        </p>
      </div> 

         <div class="listFeatures rightSpace">
            <div class="searchBar  searchbar2">
                <form onSubmit={handleSearch}>
                            <input
                                type="search"
                                name="search"
                                placeholder="Search"
                                autoComplete="off"
                                onChange={handleKeywordChange}
                                value={keyword}
                            />
                            <button className="searchIcon"></button>
                        </form>
            </div>
            <button class="saveNnewBtn appFilter expContactBtn communicationBtnfilter" onClick={props.showFilter}>Filter <img src={filter} alt=""/></button>
        </div>
    </div>
  );
};

export default CommunicationLogHeader;
