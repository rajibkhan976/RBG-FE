import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
//import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import arrowRightWhite from "../../../../src/assets/images/arrowRightWhite.svg";
import plus_icon from "../../../../src/assets/images/plus_icon.svg";
import info_3dot_icon from "../../../../src/assets/images/info_3dot_icon.svg";
import info_3dot_white from "../../../../src/assets/images/info_3dot_white.svg";

import StatusAddField from "./statusAddField"

const CategoryPhases = (props) => {
  document.title = "Red Belt Gym - Status and Phases";
  const [isLoader, setIsLoader] = useState(false);
  const [option, setOption] = useState(null);

  
  const [phasesCategoryData, setPhasesCategoryData] = useState([
    {
        category_Name: "All",
        phases_count: "15"
    },
    {
        category_Name: "Prospect",
        phases_count: "25"
    },
    {
        category_Name: "Lead",
        phases_count: "50"
    },
    {
        category_Name: "Gym Member",
        phases_count: "15"
    },
]);

const toggleOptions = (index) => {
    setOption(index !== option ? index : null);
  };
 
  return (
        <>
        <div className="phasesRightSetUpPanel">
        <div class="innerScroll">
             <h3 class="productListingHeader">Product Categories</h3>
            <div class="productSearchPanel">
            <form method="post">
                <input type="text" name="catname" placeholder="Ex. Phase 1" value=""/>
                <button class="btn" type="submit">Add Phases
                <img src={arrowRightWhite} alt=""/>
                </button>
            </form>
            </div>  
            
            <ul class="ProCategoryListing">
                {phasesCategoryData.map((elem, key) => {
                    return (
                        <li ><button class="bigListName"> {elem.category_Name} {elem.phases_count ? "(" +elem.phases_count+")" : "" } </button>
                              <button className="showList" onClick={() => toggleOptions(key)}>
                                                    <img src={info_3dot_white} alt="" />
                                                </button>
                             <div className={
                                  option === key
                                    ? "dropdownOptions listOpen"
                                    : "listHide"
                                }> 
                                <button class="btn btnEdit"> 
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.553 13.553" class="editIcon"><g transform="translate(0.75 0.75)"><path class="a" d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423" transform="translate(-2 -2.795)"></path><path class="a" d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z" transform="translate(-4.384 -2)"></path></g></svg>
                                </span> 
                                Edit
                                </button>
                                <button class="btn btnDelete">
                                <span>
                                    <svg class="deleteIcon" xmlns="http://www.w3.org/2000/svg" width="12.347" height="13.553" viewBox="0 0 12.347 13.553"><g transform="translate(0.75 0.75)"><path class="a" d="M3,6H13.847" transform="translate(-3 -3.589)"></path><path class="a" d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411" transform="translate(-3.795 -2)"></path><line class="a" y2="3" transform="translate(4.397 6.113)"></line><line class="a" y2="3" transform="translate(6.397 6.113)"></line></g></svg>
                                </span>
                                Delete
                                </button>
                            </div>
                        </li>
                    )}
                )}
            
            </ul>
            </div>
        </div>
        
       
        </>  
    )
};

export default CategoryPhases;
