import React, { useEffect, useState } from "react";
import ProductFilter from "./productFilter";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import percentTag from "../../../../assets/images/percentage_icon.png";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";
// import proImg1 from "../../../../assets/images/proImg1.png";
// import proImg2 from "../../../../assets/images/proImg2.png";
// import proImg3 from "../../../../assets/images/proImg3.png";
// import proImg4 from "../../../../assets/images/proImg4.png";
// import proImg5 from "../../../../assets/images/proImg5.png";
// import proImg6 from "../../../../assets/images/proImg6.png";
import proImg7 from "../../../../assets/images/proImg7.png";
import listView from "../../../../assets/images/listView.svg";
import CategoryListing from "./categories";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
import { utils } from "../../../../helpers";
import Loader from "../../../shared/Loader";
import env from "../../../../configuration/env";
import { ProductServices } from "../../../../services/setup/ProductServices";
import Pagination from "../../../shared/Pagination";

const ProductListing = () => {
    document.title = "Products";
    const messageDelay = 5000; // ms
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoader, setIsLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [productData, setProductData] = useState([]);
    const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);
    const [paginationData, setPaginationData] = useState({
        count: null,
        totalPages: null,
        currentPage: 1,
        limit: 10
    });

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

    useEffect(() => {
        fetchProducts();
    }, []);

    /**
     * Get all query params
     */
    const getQueryParams = async () => {
        const catID = utils.getQueryVariable('catID');
        const queryParams = new URLSearchParams();
        if (catID && catID !== "all") {
            queryParams.append("catID", catID);
        }
        return queryParams;
    }

    const fetchProducts = async () => {
        // const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
        // console.log("Permission", permissions)
        const pageId = utils.getQueryVariable('page') || 1;
        const queryParams = await getQueryParams();
        try {
            setIsLoader(true);
            // if (readPermission === false && env.ACTIVE_PERMISSION_CHECKING === 1) {
            //     throw new Error(responses.permissions.role.read);
            // }
            const result = await ProductServices.fetchProducts(pageId, queryParams);
            if (result) {
                console.log("Product List", result);
                setProductData(result.products);
                setPaginationData({
                    ...paginationData,
                    count: result.pagination.count,
                    currentPage: result.pagination.currentPage,
                    totalPages: result.pagination.totalPages
                });
            }
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setIsLoader(false);
        }
    }

    return (
        <>
            {isLoader ? <Loader /> : ''}
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
                        <h2 class="inDashboardHeader">Products ({paginationData.count})</h2>
                        <p class="userListAbout">Lorem ipsum dolor sit amet. Semi headline should be here.</p>
                    </div>
                    <div class="listFeatures">
                        <button class="creatUserBtn"><img class="plusIcon" src={plus_icon} alt="" /><span>Add a Product</span></button>
                    </div>
                </div>
                <div className="productViewType">
                    <button className="btn" onClick={() => openFilterModal()}>
                        <img src={listView} alt="filter" />
                    </button>
                </div>
                <div class="productListBody">

                    <div className="productListing">
                        {productData.length ? productData.map((elem, key) => {
                            return (
                                <React.Fragment>
                                    <div className="productList">
                                        <div className="productListLeft">
                                            <div className="proImage"><img src={"https://wrapperbucket.s3.us-east-1.amazonaws.com/"+elem.image}  alt="" /></div>
                                            <div className="proInfo">
                                                <p><a href="#">{elem.name}</a></p>
                                                <div className="d-flex">
                                                    <h3>${elem.price.toFixed(2)}</h3>
                                                    <span><img className="gap_icon" src={percentTag} alt="" /> 10% Sales Tax Applicable</span>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="productListRight">
                                            <div className="chooseSize">
                                                <p>Size</p>
                                                {elem.size.map(s => <span>{s}</span>)}
                                            </div>
                                            <div className="chooseColor">
                                                <p>Color</p>
                                                {elem.colors.map(c => <span className={c}></span>)}
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        }) :
                            <div className="createNew">
                                <span>
                                    <img src={list_board_icon} alt="" />
                                    <p>No products found!</p>
                                </span>
                            </div>
                        }
                    </div>
                </div>
                {<Pagination
                paginationData={paginationData}
                dataCount={paginationData.count}
                callback={fetchProducts} />}
            </div>
            <CategoryListing
                successMsg={(msg) => setSuccessMsg(msg)}
                errorMsg={(msg) => setErrorMsg(msg)}
            />

            {prodFilterModalStatus && <ProductFilter closeModal={closeFilterModal} />}
        </>
    );
}

export default ProductListing;