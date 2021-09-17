import React from "react";
import arrowRightWhite from "../../../../assets/images/arrowRightWhite.svg";
import dot3White from "../../../../assets/images/info_3dot_white.svg";

const CategoryListing = () => {
    return (
        <>
            <div className="productRightSetUpPanel">
                <h3 className="productListingHeader">Product Categories</h3>
                <div className="productSearchPanel">
                    <input type="text" />
                    <button className="btn">Add Category <img src={arrowRightWhite} alt="" /></button>
                </div>
                <ul className="ProCategoryListing">
                    <li><a href="#">Gym wear (80)</a><a href="#"><img src={dot3White} alt="" /></a></li>
                    <li><a href="#">T-shirts (18)</a><a href="#"><img src={dot3White} alt="" /></a></li>
                    <li><a href="#">Shorts (5) </a><a href="#"><img src={dot3White} alt="" /></a></li>
                    <li><a href="#">Shoe (27) </a><a href="#"><img src={dot3White} alt="" /></a></li>
                    <li><a href="#">Gym Gear (103)</a><a href="#"><img src={dot3White} alt="" /></a></li>
                    <li><a href="#">Courses (16)</a><a href="#"><img src={dot3White} alt="" /></a></li>
                </ul>
            </div>

        </>
    );
}

export default CategoryListing;