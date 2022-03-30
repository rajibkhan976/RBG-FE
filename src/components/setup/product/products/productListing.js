import React, { useEffect, useState } from "react";
import plus_icon from "../../../../assets/images/plus_icon.svg";
import percentTag from "../../../../assets/images/percentage_icon.png";
import list_board_icon from "../../../../assets/images/list_board_icon.svg";
import listView from "../../../../assets/images/listView.svg";
import dot3White from "../../../../assets/images/dot3gray.svg";
import proImg1 from "../../../../assets/images/proImg1.png";
import noRecords from '../../../../assets/images/noRecords.svg';
import Pagination from "../../../shared/Pagination";
import ConfirmBox from "../../../shared/confirmBox";
import Loader from "../../../shared/Loader";
import { ProductServices } from "../../../../services/setup/ProductServices"

const ProductListing = (props) => {
  document.title = "Red Belt Gym - Products";
  const [isLoader, setIsLoader] = useState(false);
  const [isConfirmed, setConfirmed] = useState({
    show: false,
    id: null,
  });
  const [option, setOption] = useState(null);
  const [colorDropdown, setColorDropdown] = useState(null);
  // const [categoryData, setCategoryData] = useState(null)
  // const [filteredData, setFilteredData] = useState(null)

  /****************************** FUNCTIONS START **********************************/
  const handleEdit = (product) => {
    setOption(null);
    props.openProductModal(true, product);
  };

  const deleteProduct = async (productID, isConfirmed = null) => {
    setOption(null);
    if (isConfirmed == null && productID) {
      console.log("Product ID", productID);
      setConfirmed({
        show: true,
        id: productID,
      });
    } else if (isConfirmed === "cancel") {
      setConfirmed({
        show: false,
        id: null,
      });
    } else {
      setConfirmed({
        show: false,
        id: null,
      });
      props.deleteProduct(productID);
    }
  };

  const toogleActionList = (index) => {
    setOption(index !== option ? index : null);
  };

  const toogleColorList = (index) => {
    setColorDropdown(index !== colorDropdown ? index : null);
  };

  const ShowColors = (prop) => {
    // let html = "<p>Color</p>";
    let html = "";
    prop.colors.map((color, index) => {
      if (index + 1 < 3) {
        html += `<span style="background-color: ${color.colorcode}"></span>`;
      } else {
        if (index + 1 === 4) {
          html += `<div class="colorpaletContainer">
                    <button class="dropIt">+${prop.colors.length - 3}</button>
                    <div class="colorPalet">`;
        }
        html += `<span style="background-color: ${color.colorcode}"></span>`;
        if (index + 1 === prop.colors.length) {
          html += `</div></div>`;
        }
      }
    });
    return (
      <div className="chooseColor" dangerouslySetInnerHTML={{ __html: html }} />
    );
  };

  // const fetchCategories = async () => {
  //   try {
  //     const result = await ProductServices.fetchCategory();
  //     if (result.length) {
  //       setCategoryData(result);
  //       console.log("CategoryData", categoryData);
  //     } else {
  //       // setErrorMsg("No categories found");
  //       // props.successMsg("No categories found");
  //     }
  //   } catch (e) {
  //     // props.errorMsg(e.message);
  //   } finally {
  //     setIsLoader(false);
  //   }
  // };

//   const parseURLParams = (url) => {
//     var queryStart = url.indexOf("?") + 1,
//         queryEnd   = url.indexOf("#") + 1 || url.length + 1,
//         query = url.slice(queryStart, queryEnd - 1),
//         pairs = query.replace(/\+/g, " ").split("&"),
//         parms = {}, i, n, v, nv;

//     if (query === url || query === "") return;

//     for (i = 0; i < pairs.length; i++) {
//         nv = pairs[i].split("=", 2);
//         n = decodeURIComponent(nv[0]);
//         v = decodeURIComponent(nv[1]);

//         if (!parms.hasOwnProperty(n)) parms[n] = [];
//         parms[n].push(nv.length === 2 ? v : null);
//     }
//     parms.page && delete parms.page
//     console.log(">>>>>>>>>>>>>>>>>", parms); 
//     return parms;
// }

// useEffect(()=>{
//   let urlString = window.location.href

//   console.log("parseURLParams(urlString)", parseURLParams(urlString), Object.keys(parseURLParams(urlString)).length !== 0);
  
//   if(parseURLParams(urlString) && props.filteredData === null && Object.keys(parseURLParams(urlString)).length !== 0) {
//     setFilteredData(parseURLParams(urlString))
//   }
//   console.log("hi");
// },[props.filteredData])

//   useEffect(()=>{
//     fetchCategories()
//   }, [])

  /****************************** FUNCTIONS START **********************************/
  return (
    <>
      {isLoader ? <Loader /> : ''}
      {isConfirmed.show ? (
        <ConfirmBox
          callback={(confirmedMsg) =>
            deleteProduct(isConfirmed.id, confirmedMsg)
          }
        />
      ) : (
        ""
      )}
      <div className="dashInnerUI productSteUp">
        <div className="userListHead product">
          <div className="listInfo">
            <ul className="listPath">
              <li>Settings </li>
              <li>Products</li>
            </ul>
            <h2 className="inDashboardHeader">
              Products (
              {props.paginationData.count ? props.paginationData.count : 0})
            </h2>
            <p className="userListAbout">Manage your POS products</p>
          </div>
          <div className="listFeatures">
            <button className="creatUserBtn" onClick={props.openProductModal}>
              <img className="plusIcon" src={plus_icon} alt="" />
              <span>Add a Product</span>
            </button>
          </div>
        </div>
        <div className="productViewType d-flex">
          {/* {props.filteredData !== null && <>
            <span className="filteredShow">Filtered by:</span>
            <ul className="filteredData">
              {
                props.filteredData.categories && props.filteredData.categories.length > 0 ? props.filteredData.categories.map((filteredCat, i) =>
                  (<li>{categoryData && categoryData.filter((filterCategory) => filterCategory._id === filteredCat)[0].name} </li>)
                ) : ""
              }
              {
                props.filteredData.colors && props.filteredData.colors.length > 0 ? props.filteredData.colors.map((filteredCol, i) =>
                  (<li><figure style={{backgroundColor: filteredCol}}></figure> {filteredCol} </li>)
                ) : ""
              }
              {
                props.filteredData.sizes && props.filteredData.sizes.length > 0 ? props.filteredData.sizes.map((filteredSize, i) =>
                  (<li>Size:  {filteredSize} </li>)
                  
                ) : ""
              }
              {props.filteredData.fromPriceProduct.trim() !== "" && parseInt(props.filteredData.fromPriceProduct) > 0 && props.filteredData.toPriceProduct.trim() !== "" ?
                <>
                  <li>&#36;{props.filteredData.fromPriceProduct} - &#36;{props.filteredData.toPriceProduct}</li>
                </> : props.filteredData.fromPriceProduct.trim() !== "" && parseInt(props.filteredData.fromPriceProduct) > 0 ?
                <li>Lowest Price: &#36;{props.filteredData.fromPriceProduct}</li> : props.filteredData.toPriceProduct.trim() !== ""  && parseInt(props.filteredData.toPriceProduct) > 0 ?
                <li>Highest Price: &#36;{props.filteredData.toPriceProduct} </li> : ""
              }
            </ul>
          </>}

          {props.filteredData === null && filteredData !== null && filteredData !== undefined && <>
            <span className="filteredShow">Filtered by:</span>
            {console.log("filteredData", filteredData)}
            <ul className="filteredData">
              {
                filteredData.catID ? filteredData.catID[0].split(",").map((filteredCat, i) =>
                  (<li>{categoryData && categoryData.filter((filterCategory) => filterCategory._id === filteredCat)[0].name} </li>)
                ) : ""
              }
              {
                filteredData.colors ? filteredData.colors[0].split(",").map((filteredCol, i) =>
                  (<li><figure style={{backgroundColor: filteredCol}}></figure> {filteredCol} </li>)
                ) : ""
              }
              {
                filteredData.sizes ? filteredData.sizes[0].split(",").map((filteredSize, i) =>
                  (<li>Size:  {filteredSize} </li>)
                ) : ""
              }
              {filteredData.fromPriceProduct && filteredData.toPriceProduct && filteredData.fromPriceProduct[0].trim() !== "" && parseInt(filteredData.fromPriceProduct[0]) > 0 && filteredData.toPriceProduct[0].trim() !== "" ?
                <>
                  <li>&#36;{filteredData.fromPriceProduct[0]} - &#36;{filteredData.toPriceProduct[0]} </li>
                </> : filteredData.fromPriceProduct[0].trim() !== "" && parseInt(filteredData.fromPriceProduct[0]) > 0 ?
                <li>Lowest Price: &#36;{filteredData.fromPriceProduct[0]} </li> : filteredData.toPriceProduct[0].trim() !== ""  && parseInt(filteredData.toPriceProduct[0]) > 0 ?
                <li>Highest Price: &#36;{filteredData.toPriceProduct[0]} </li> : ""
              }
            </ul>
          </>} */}

          <button className="btn filterButton" onClick={() => props.openFilterModal()}>
            <img src={listView} alt="filter" />
          </button>
        </div>
        <div className="productListBody">
          <div className="productListing">
            {props.productData.length ? (
              props.productData.map((elem, key) => {
                return (
                  <React.Fragment key={key + "_products"}>
                    <div className="productList">
                      <div className="productListLeft">
                        <div className="proImage">
                          {elem.image ? (
                            <img
                              src={
                                "https://wrapperbucket.s3.us-east-1.amazonaws.com/" +
                                elem.image
                              }
                              alt=""
                            />
                          ) : (
                            <img src={proImg1} alt="" />
                          )}
                        </div>
                        <div className="proInfo">
                          <p>
                            <a href="javascript:void(0)">{elem.name}</a>
                          </p>
                          <div className="d-flex">
                            <h3>${elem.price.toFixed(2)}</h3>
                            {elem.tax ? (
                              <span>
                                <img
                                  className="gap_icon"
                                  src={percentTag}
                                  alt=""
                                />{" "}
                                {elem.taxPercent}% Sales Tax Applicable
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="productListRight">
                        <div className="chooseSize">
                          {/* <p>Size</p> */}
                          {elem.size.map((s) => (
                            <span>{s}</span>
                          ))}
                        </div>
                        <ShowColors colors={elem.associatedColors} />
                        <div className="sideEditOption">
                          <button
                            className="showList"
                            onClick={() => toogleActionList(key)}
                          >
                            <img src={dot3White} alt="" />
                          </button>
                          <div
                            className={
                              option === key
                                ? "dropdownOptions listOpen"
                                : "listHide"
                            }
                          >
                            {" "}
                            {/*//listHide class is to be replaced with listOpen to hide it */}
                            <button
                              className="btn btnEdit"
                              onClick={() => handleEdit(elem)}
                            >
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 13.553 13.553"
                                  className="editIcon"
                                >
                                  <g transform="translate(0.75 0.75)">
                                    <path
                                      className="a"
                                      d="M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423"
                                      transform="translate(-2 -2.795)"
                                    ></path>
                                    <path
                                      className="a"
                                      d="M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z"
                                      transform="translate(-4.384 -2)"
                                    ></path>
                                  </g>
                                </svg>
                              </span>{" "}
                              Edit
                            </button>
                            <button
                              className="btn btnDelete"
                              onClick={() => deleteProduct(elem._id)}
                            >
                              <span>
                                <svg
                                  className="deleteIcon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12.347"
                                  height="13.553"
                                  viewBox="0 0 12.347 13.553"
                                >
                                  <g transform="translate(0.75 0.75)">
                                    <path
                                      className="a"
                                      d="M3,6H13.847"
                                      transform="translate(-3 -3.589)"
                                    />
                                    <path
                                      className="a"
                                      d="M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411"
                                      transform="translate(-3.795 -2)"
                                    />
                                    <line
                                      className="a"
                                      y2="3"
                                      transform="translate(4.397 6.113)"
                                    />
                                    <line
                                      className="a"
                                      y2="3"
                                      transform="translate(6.397 6.113)"
                                    />
                                  </g>
                                </svg>
                              </span>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <div className="createNew noInfos">
                <div className="noRecordsImgWraper">
                  <img src={noRecords} className="noRecords" alt="" />
                  <h4>No Products Found</h4>
                  <p>No products have been listed here yet</p>
                </div>                
              </div>
            )}
          </div>
        </div>
        {props.paginationData.count > props.paginationData.limit ? (
          <Pagination
            paginationData={props.paginationData}
            dataCount={props.paginationData.count}
            callback={props.fetchProducts}
          />
        ) : (
          ""
        )}
      </div>

      {/* {prodFilterModalStatus && <ProductFilter closeModal={closeFilterModal} />} */}

      {/* {openModal && <AddProductModal closeAddProductModal={(param) => closeProductModal(param)}
                editProductItem={updateProduct}></AddProductModal>} */}
    </>
  );
};

export default ProductListing;
