import React, { useEffect, useState }from "react";
import ProductFilter from "./productFilter";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import percentTag from "../../../../assets/images/percentage_icon.png"
import proImg1 from "../../../../assets/images/proImg1.png";
import proImg2 from "../../../../assets/images/proImg2.png";
import proImg3 from "../../../../assets/images/proImg3.png";
import proImg4 from "../../../../assets/images/proImg4.png";
import proImg5 from "../../../../assets/images/proImg5.png";
import proImg6 from "../../../../assets/images/proImg6.png";
import proImg7 from "../../../../assets/images/proImg7.png";
import listView from "../../../../assets/images/listView.svg";
import CategoryListing from "./categories";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";

const ProductListing = () => {
    document.title = "Products";
    const messageDelay = 5000; // ms
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);

    const openFilterModal = () => {
        setProdFilterModalStatus(true);
    }

    const closeFilterModal = () => {
        setProdFilterModalStatus(false);
    }

    useEffect(() => {
        if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
        if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
    }, [successMsg, errorMsg]);

    return (
        <>
            {successMsg &&
                <SuccessAlert message={successMsg}></SuccessAlert>
            }
            {errorMsg &&
                <ErrorAlert message={errorMsg}></ErrorAlert>
            }
            <div className="dashInnerUI productSteUp">
                <div class="userListHead product">
                    <div class="listInfo">
                        <ul class="listPath"><li>Settings  </li><li>Products</li></ul>
                        <h2 class="inDashboardHeader">Products (126)</h2>
                        <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                    </div>
                    <div class="listFeatures">
                        <button class="creatUserBtn"><img class="plusIcon" src={plus_icon} alt="" /><span>Add a Product</span></button>
                    </div>
                </div>
                <div className="productViewType">
                    <button className="btn" onClick={() => openFilterModal ()}>
                        <img src={listView} alt="filter" />
                    </button>
                </div>
                <div class="productListBody">

                    <div className="productListing">
                        <div className="productList">
                            <div className="productListLeft">
                                <div className="proImage"><img src={proImg1} alt="" /></div>
                                <div className="proInfo">
                                    <p><a href="#">women gym sets 2 piece long sleeve fitness suit sportswear</a></p>
                                    <div className="d-flex">
                                        <h3>$100</h3>
                                        <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                    </div>

                                </div>
                            </div>
                            <div className="productListRight">
                                <div className="chooseSize">
                                    <p>Size</p>
                                    <span className="active">S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <span className="gray"></span>
                                    <span className="red"></span>
                                    <span className="blue active"></span>
                                </div>
                            </div>
                        </div> {/*//end list */}

                        <div className="productList">
                            <div className="productListLeft">
                                <div className="proImage"><img src={proImg2} alt="" /></div>
                                <div className="proInfo">
                                    <p><a href="#">women gym sets 2 piece long sleeve fitness suit sportswear</a></p>
                                    <div className="d-flex">
                                        <h3>$100</h3>
                                        <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                    </div>

                                </div>
                            </div>
                            <div className="productListRight">
                                <div className="chooseSize">
                                    <p>Size</p>
                                    <span className="active">S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <span className="gray"></span>
                                    <span className="red"></span>
                                    <span className="blue active"></span>
                                </div>
                            </div>
                        </div> {/*//end list */}

                        <div className="productList">
                            <div className="productListLeft">
                                <div className="proImage"><img src={proImg3} alt="" /></div>
                                <div className="proInfo">
                                    <p><a href="#">women gym sets 2 piece long sleeve fitness suit sportswear</a></p>
                                    <div className="d-flex">
                                        <h3>$100</h3>
                                        <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                    </div>

                                </div>
                            </div>
                            <div className="productListRight">
                                <div className="chooseSize">
                                    <p>Size</p>
                                    <span className="active">S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <span className="gray"></span>
                                    <span className="red"></span>
                                    <span className="blue active"></span>
                                </div>
                            </div>
                        </div> {/*//end list */}

                        <div className="productList">
                            <div className="productListLeft">
                                <div className="proImage"><img src={proImg4} alt="" /></div>
                                <div className="proInfo">
                                    <p><a href="#">women gym sets 2 piece long sleeve fitness suit sportswear</a></p>
                                    <div className="d-flex">
                                        <h3>$100</h3>
                                        <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                    </div>

                                </div>
                            </div>
                            <div className="productListRight">
                                <div className="chooseSize">
                                    <p>Size</p>
                                    <span className="active">S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <span className="gray"></span>
                                    <span className="red"></span>
                                    <span className="blue active"></span>
                                </div>
                            </div>
                        </div> {/*//end list */}

                        <div className="productList">
                            <div className="productListLeft">
                                <div className="proImage"><img src={proImg5} alt="" /></div>
                                <div className="proInfo">
                                    <p><a href="#">women gym sets 2 piece long sleeve fitness suit sportswear</a></p>
                                    <div className="d-flex">
                                        <h3>$100</h3>
                                        <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                    </div>

                                </div>
                            </div>
                            <div className="productListRight">
                                <div className="chooseSize">
                                    <p>Size</p>
                                    <span className="active">S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <span className="gray"></span>
                                    <span className="red"></span>
                                    <span className="blue active"></span>
                                </div>
                            </div>
                        </div> {/*//end list */}

                        <div className="productList">
                            <div className="productListLeft">
                                <div className="proImage"><img src={proImg6} alt="" /></div>
                                <div className="proInfo">
                                    <p><a href="#">women gym sets 2 piece long sleeve fitness suit sportswear</a></p>
                                    <div className="d-flex">
                                        <h3>$100</h3>
                                        <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                    </div>

                                </div>
                            </div>
                            <div className="productListRight">
                                <div className="chooseSize">
                                    <p>Size</p>
                                    <span className="active">S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <span className="gray"></span>
                                    <span className="red"></span>
                                    <span className="blue active"></span>
                                </div>
                            </div>
                        </div> {/*//end list */}

                        <div className="productList">
                            <div className="productListLeft">
                                <div className="proImage"><img src={proImg7} alt="" /></div>
                                <div className="proInfo">
                                    <p><a href="#">women gym sets 2 piece long sleeve fitness suit sportswear</a></p>
                                    <div className="d-flex">
                                        <h3>$100</h3>
                                        <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                    </div>

                                </div>
                            </div>
                            <div className="productListRight">
                                <div className="chooseSize">
                                    <p>Size</p>
                                    <span className="active">S</span>
                                    <span>M</span>
                                    <span>L</span>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <span className="gray"></span>
                                    <span className="red"></span>
                                    <span className="blue active"></span>
                                </div>
                            </div>
                        </div> {/*//end list */}

                    </div>
                </div>
            </div>
            <CategoryListing
            successMsg = {(msg) => setSuccessMsg(msg)}
            errorMsg = {(msg) => setErrorMsg(msg)}
            />

            { prodFilterModalStatus && <ProductFilter closeModal={closeFilterModal}/> }
        </>
    );
}

export default ProductListing;