import React, { useEffect, useState }from "react";
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
                    <button className="btn">
                        <img src={listView} alt="" />
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
                                    <button className="btn">S</button>
                                    <button className="btn">M</button>
                                    <button className="btn">L</button>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <button className="btn gray"></button>
                                    <button className="btn red"></button>
                                    <button className="btn blue"></button>
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
                                    <button className="btn">S</button>
                                    <button className="btn">M</button>
                                    <button className="btn">L</button>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <button className="btn gray"></button>
                                    <button className="btn red"></button>
                                    <button className="btn blue"></button>
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
                                    <button className="btn">S</button>
                                    <button className="btn">M</button>
                                    <button className="btn">L</button>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <button className="btn gray"></button>
                                    <button className="btn red"></button>
                                    <button className="btn blue"></button>
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
                                    <button className="btn">S</button>
                                    <button className="btn">M</button>
                                    <button className="btn">L</button>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <button className="btn gray"></button>
                                    <button className="btn red"></button>
                                    <button className="btn blue"></button>
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
                                    <button className="btn">S</button>
                                    <button className="btn">M</button>
                                    <button className="btn">L</button>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <button className="btn gray"></button>
                                    <button className="btn red"></button>
                                    <button className="btn blue"></button>
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
                                    <button className="btn">S</button>
                                    <button className="btn">M</button>
                                    <button className="btn">L</button>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <button className="btn gray"></button>
                                    <button className="btn red"></button>
                                    <button className="btn blue"></button>
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
                                    <button className="btn">S</button>
                                    <button className="btn">M</button>
                                    <button className="btn">L</button>
                                </div>
                                <div className="chooseColor">
                                    <p>Color</p>
                                    <button className="btn gray"></button>
                                    <button className="btn red"></button>
                                    <button className="btn blue"></button>
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

        </>
    );
}

export default ProductListing;