import React, { useEffect, useRef, useState } from "react";
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import plus_icon from "../../../../../assets/images/plus_icon.svg";
import Loader from "../../../Loader";
import cart_icon from "../../../../../assets/images/cart.svg";
import delete_icon from "../../../../../assets/images/delete_icon_grey.svg";
import placeholder_product_image from "../../../../../assets/images/placeholder_product_image.png"
import { ErrorAlert } from "../../../messages";
import ProductPayment from "./ProductPayment";
import AddProductModal from "../../../../setup/product/products/addProductModal";
import { utils } from "../../../../../helpers";
import { ProductServices } from "../../../../../services/setup/ProductServices";
import config from "../../../../../configuration/config";

const ProductTransaction = (props) => {
  const productRef = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [productItemsList, setProductItemsList] = useState([]);
  const [newProductObj, setNewProductObj] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductList, setShowProductList] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [cartState, setCartState] = useState([]);
  const priceInput = useRef(null);
  const productTransaction = useRef(null);
  const increaseQuantityBtn = useRef(null);
  const decreaseQuantityBtn = useRef(null);
  const productQuantity = useRef(null);
  const cartProductQuantity = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [productData, setProductData] = useState([]);
  const [updateProduct, setUpdateProduct] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [colorSize, setColorSize] = useState({
    colors: [],
    sizes: [],
  });

  const [errorState, setErrorState] = useState({
    color: "",
    sizes: "",
    price: "",
    quantity: "",
  });
  const [totalAmt, setTotalAmt] = useState(0);

  const getQueryParams = async () => {
    const catID = utils.getQueryVariable("catID");
    const colors = utils.getQueryVariable("colors");
    const sizes = utils.getQueryVariable("sizes");
    const fromPrice = utils.getQueryVariable("fromPriceProduct");
    const toPrice = utils.getQueryVariable("toPriceProduct");
    const queryParams = new URLSearchParams();
    if (catID && catID !== "all" && catID !== "false") {
      queryParams.append("catID", catID);
    }
    if (colors) {
      queryParams.append("colors", colors);
    }
    if (sizes) {
      queryParams.append("sizes", sizes);
    }
    if (fromPrice) {
      queryParams.append("fromPrice", fromPrice);
    }
    if (toPrice) {
      queryParams.append("toPrice", toPrice);
    }
    return queryParams;
  };

  const fetchProducts = async (showLoader = true) => {
    const pageId = utils.getQueryVariable("page") || 1;
    const queryParams = await getQueryParams();
    try {
      if (showLoader) setShowLoader(true);
      const result = await ProductServices.fetchProducts(pageId, queryParams);
      if (result) {
        // console.log(
        //   "result:::::::::::::::::::::::::::::::::::::::",
        //   result.products
        // );
        setProductData(result.products);
        setProductItemsList(result.products);
      }
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setShowLoader(false);
    }
  };

  const fetchColorSizes = async () => {
    try {
      if (!showLoader) setShowLoader(true);
      const result = await ProductServices.fetchColorSizes();
      setColorSize({
        colors: result.colors,
        sizes: result.sizes,
      });
      // console.log("Color Size", colorSize);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setShowLoader(false);
    }
  };

  const fetchCategories = async () => {
    try {
      if (!showLoader) setShowLoader(true);
      const result = await ProductServices.fetchCategory();
      if (result.length) {
        setCategoryData(result);
        // console.log("CategoryData", categoryData);
      } else {
        // setErrorMsg("No categories found");
        // props.successMsg("No categories found");
      }
    } catch (e) {
      // props.errorMsg(e.message);
    } finally {
      setShowLoader(false);
    }
  };

  const selectedColor = (e) => {
    let errorStatPl = {...errorState}

    try {
        // console.log(e);
      setShowLoader(true);
      setSelectedProduct({
        ...selectedProduct,
        selectedColor: e,
      });
      errorStatPl.color = ""
      setErrorState(errorStatPl);
    } catch (err) {
      setErrorMsg(err);
    } finally {
      setShowLoader(false);
    }
  };

  const selectedSize = (e) => {
    let errorStatPl = {...errorState}

    try {
      setShowLoader(true);
      setSelectedProduct({
        ...selectedProduct,
        selectedSize: e,
      });
      errorStatPl.sizes = ""
      setErrorState(errorStatPl);
    } catch (err) {
      setErrorMsg(err);
    } finally {
      setShowLoader(false);
    }
  };

  const selectProductToAdd = (item) => {
    const productPlaceholder = item;
          productPlaceholder.selectedColor = null;
          productPlaceholder.selectedSize = null;
          productPlaceholder.qnty = 1;
          
    setSelectedProduct(productPlaceholder);
    console.log("selected product to add :::", productPlaceholder);
    setShowProductList(false);
  };

  const addProduct = (e) => {
    e.preventDefault();
    setShowProductList(!showProductList);
    fetchProducts()
  };

  const getCartItems = () => {
    return cartState && cartState.length;
  };

  const priceChangeProduct = (e) => {
    let addProductErrors = errorState

    if(e.target.value.trim() !== "" && parseFloat(e.target.value) > 0 && e.target.value.length !== 0) {
      setSelectedProduct({
        ...selectedProduct,
        price: e.target.value,
      });
      setHasError(false);

      addProductErrors.price = ""
      setErrorState(addProductErrors)
    }
    else {
      setHasError(true);

      setSelectedProduct({
        ...selectedProduct,
        price: e.target.value,
      });

      addProductErrors.price = "Please set proper price!"
      setErrorState(addProductErrors)
      // console.log("addProductErrors", addProductErrors);
    }
  };

  const setQuantity = (e) => {
    e.preventDefault();
    let quantityInput = parseInt(productQuantity.current.value);
    let errorStatPl = {...errorState}

    setSelectedProduct({
      ...selectedProduct,
      qnty:
        e.target === decreaseQuantityBtn.current
          ? quantityInput > 0
            ? (quantityInput -= 1)
            : 0
          : (quantityInput += 1),
    });

    if(quantityInput === 0) {
      errorStatPl.quantity = "Quantity cannot be 0!"
      setErrorState(errorStatPl)
    } else {
      errorStatPl.quantity = ""
      setErrorState(errorStatPl)
    }
  };

  const decreaseQuantity = (e, cartItem, i) => {
    e.preventDefault();
    try {
      let cartStatePlaceholder = [...cartState];
      let cartItemPlaceholder = cartItem;

      cartItemPlaceholder.qnty =
        cartItemPlaceholder.qnty > 1 ? cartItemPlaceholder.qnty - 1 : 1;

      setCartState(cartStatePlaceholder);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (e, cartItem, i) => {
    e.preventDefault();

    try {
      let cartStatePlaceholder = [...cartState];
      let cartItemPlaceholder = cartItem;

      cartItemPlaceholder.qnty += 1;

      setCartState(cartStatePlaceholder);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    console.log("cartState ::: ", cartState);
  },[cartState  ])

  const addThisProduct = (e) => {
    e.preventDefault();
    
    let localError = false;
    let errorStatePlaceholder = {...errorState};

    try {
      if (selectedProduct.qnty === undefined) {
        setHasError(true);
        localError = true

        errorStatePlaceholder.quantity = "Please set some quantity!"
        setErrorState(errorStatePlaceholder)
      }
      if (selectedProduct.price === null || selectedProduct.price === "" || parseFloat(selectedProduct.price) <= 0) {
        setHasError(true);
        localError = true

        errorStatePlaceholder.price = "Please set proper price!"
        setErrorState(errorStatePlaceholder)
      }
      if (selectedProduct.selectedColor === undefined || selectedProduct.selectedColor === null) {
        setHasError(true);
        localError = true

        errorStatePlaceholder.color = "Please select a color!"
        setErrorState(errorStatePlaceholder)
      }
      if (selectedProduct.selectedSize === undefined || selectedProduct.selectedSize === null) {
        setHasError(true);
        localError = true

        errorStatePlaceholder.sizes = "Please select a size!"
        setErrorState(errorStatePlaceholder)
      }
      
      if (!localError) {
        let cartItemToAdd = {
            product: selectedProduct.name,
            color: selectedProduct.selectedColor,
            size: selectedProduct.selectedSize,
            price: selectedProduct.price,
            qnty: selectedProduct.qnty,
            image: config.bucketUrl+selectedProduct.image,
            name: selectedProduct.name,
            tax: selectedProduct.tax === 1 ? true : false
        }
        setCartState([...cartState, cartItemToAdd]);
        setErrorState({
          color: "",
          sizes: "",
          price: "",
          quantity: "",
        })
        setErrorState(errorStatePlaceholder)
        resetAddProduct();
      }
    } catch (error) {
      setErrorMsg(error);
    } finally {
      setHasError(false);
      setErrorMsg("");
    }
  };

  const resetAddProduct = () => {
    productTransaction.current.reset();
    setSelectedProduct(null);
  };

  useEffect(() => {
    const getTotalCart = () => {
      if (cartState.length > 0) {
        const totalPlaceholder = 0;

        const sumAmt = cartState.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.price * currentValue.qnty,
          totalPlaceholder
        );
        setTotalAmt(parseFloat(sumAmt).toFixed(2));
        // console.log("sumAmt", sumAmt);
      } else {
        // console.log("Sum now", totalAmt);
        setTotalAmt(0.00);
      }
    };
    getTotalCart();
  }, [cartState, totalAmt]);

  const deleteCartItem = (e, cartItem, i) => {
    e.preventDefault();

    try {
      setShowLoader(true);
      setCartState(cartState.filter((item, index) => index !== i));
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoader(false);
    }
  };

  const showAddProduct = (e) => {
    e.preventDefault();
    console.log("cartState in show add prod :::", cartState);
    props.productPayment(true);
  };

  const getAddedProduct = (e) => {
    // console.log("NEWLY ADDED", e);
    selectProductToAdd(e)
  }

  useEffect(() => {
    // console.log("Loaded");
    fetchCategories();
    fetchProducts();
    fetchColorSizes();
    // console.log("CART STATE:::", cartState.length > 0, cartState);
    // console.log("props.productTransactionPayment", props.productTransactionPayment);
  }, []);

  return (
    <>
      {props.productTransactionPayment === false && (
        <form className="productTransaction" ref={productTransaction}>
          {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}

          <div className="transaction_form">
            <header className="informHeader">
              <h5>Select Product</h5>
            </header>
            <div className="bodytransactionForm">
              <div className="bodytransaction">
                <div className="cmnFormRow">
                  <label className="labelWithInfo">
                    <span>Select Product</span>
                    <span className="infoSpan">
                      <img src={info_icon} alt="" />
                      <span className="tooltiptextInfo">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </span>
                  </label>
                  <div className="cmnFormField">
                    <div className="cmnFormSelect addProductFormField">
                      <button
                        className="btn btnSelect cmnFieldStyle"
                        onClick={(e) => addProduct(e)}
                      >
                        <span>
                          {!selectedProduct ||
                          selectedProduct === undefined ||
                          selectedProduct === null
                            ? "Select"
                            : selectedProduct.name}
                        </span>
                      </button>
                      {showProductList && (
                        <div className="cmnFormSelectBody">
                          <button
                            className="btn addManuallyBtn"
                            onClick={(e) => {
                              e.preventDefault();
                              setAddProductModal(true);
                              setShowProductList(false)
                            }}
                          >
                            + Add New Product
                          </button>

                          <ul>
                            {showLoader && <Loader />}
                            {productItemsList.map((productItem, i) => (
                              <li
                                key={i}
                                onClick={() =>
                                  selectProductToAdd(productItem)
                                }
                              >
                                <figure>
                                    <img src={productItem && productItem.image ? config.bucketUrl+productItem.image : placeholder_product_image} alt={productItem.name} />
                                </figure>
                                <div className="productItemShorts">
                                  <span>{productItem.name}</span>
                                  <strong>$ {productItem.price}</strong>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={errorState.color ? "cmnFormRow error" : "cmnFormRow"}
                >
                  <label>Color</label>
                  <div className="cmnFormField">
                    <div className="colorChoiceProduct">
                      {!selectedProduct ||
                      selectedProduct === undefined ||
                      selectedProduct === null ? (
                        <>
                          <label className="colorChoiceItem">
                            <input
                              type="radio"
                              name="select-product-color"
                              disabled
                            />
                            <span></span>
                          </label>
                          <label className="colorChoiceItem">
                            <input
                              type="radio"
                              name="select-product-color"
                              disabled
                            />
                            <span></span>
                          </label>
                          <label className="colorChoiceItem">
                            <input
                              type="radio"
                              name="select-product-color"
                              disabled
                            />
                            <span></span>
                          </label>
                          <label className="colorChoiceItem">
                            <input
                              type="radio"
                              name="select-product-color"
                              disabled
                            />
                            <span></span>
                          </label>
                        </>
                      ) : (
                        <>
                          {selectedProduct.colors.map((color, i) => (
                            <label
                              className="colorChoiceItem"
                              key={"colorProduct" + i}
                            >
                              <input
                                type="radio"
                                name="select-product-color"
                                onChange={() => selectedColor(color)}
                                checked={selectedProduct && selectedProduct.selectedColor !== null && selectedProduct.selectedColor === color}
                              />
                              {/* {console.log(selectedProduct.selectedColor)} */}
                              <span
                                style={{
                                  backgroundColor: color,
                                }}
                              ></span>
                            </label>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  {errorState.color && <p className="errorMsg">{errorState.color}</p>}
                </div>
                <div
                  className={errorState.sizes ? "cmnFormRow error" : "cmnFormRow"}
                >
                  <label>Available Sizes</label>
                  <div className="cmnFormField">
                    <div className="sizeChoiceProduct">
                      {!selectedProduct ||
                      selectedProduct === undefined ||
                      selectedProduct === null ? (
                        <>
                          <label className="sizeChoiceItem">
                            <input
                              type="radio"
                              name="select-product-size"
                              disabled
                            />
                            <span></span>
                          </label>
                          <label className="sizeChoiceItem">
                            <input
                              type="radio"
                              name="select-product-size"
                              disabled
                            />
                            <span></span>
                          </label>
                          <label className="sizeChoiceItem">
                            <input
                              type="radio"
                              name="select-product-size"
                              disabled
                            />
                            <span></span>
                          </label>
                        </>
                      ) : (
                        <>
                          {
                          selectedProduct.size.map((size, i) => (
                            <label
                              className="sizeChoiceItem"
                              key={"colorProduct" + i}
                            >
                              <input
                                type="radio"
                                name="select-product-size"
                                onChange={() => selectedSize(size)}
                                checked={selectedProduct && selectedProduct.selectedSize !== null && selectedProduct.selectedSize === size}
                              />
                              {/* {console.log(selectedProduct.selectedSize)} */}
                              <span>{size}</span>
                            </label>
                          ))
                          }
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="cmnFormRow">
                  <div
                    className={
                      errorState.price ? "cmnFormCol error" : "cmnFormCol"
                    }
                  >
                    <label className="labelWithInfo">
                      <span>Price</span>
                      <span className="infoSpan">
                        <img src={info_icon} alt="" />
                        <span className="tooltiptextInfo">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </span>
                      </span>
                    </label>
                    <div className="cmnFormField preField">
                      <div className="unitAmount">$</div>
                      <input
                        type="number"
                        className="cmnFieldStyle"
                        placeholder="0"
                        disabled={
                          !selectedProduct ||
                          selectedProduct === undefined ||
                          selectedProduct === null
                        }
                        ref={priceInput}
                        // defaultValue={
                        //   selectedProduct &&
                        //   parseFloat(selectedProduct.price).toFixed(2)
                        // }
                        onChange={(e)=>priceChangeProduct(e)}
                        value={selectedProduct ? selectedProduct.price : ""}
                        step="0.01"
                      />
                    </div>
                  {errorState.price && <p className="errorMsg">{errorState.price}</p>}
                  </div>
                  <div
                    className={
                      errorState.quantity ? "cmnFormCol error" : "cmnFormCol"
                    }
                  >
                    <label className="labelWithInfo">
                      <span>Quantity</span>
                      <span className="infoSpan">
                        <img src={info_icon} alt="" />
                        <span className="tooltiptextInfo">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </span>
                      </span>
                    </label>

                    <div className="cmnFormField">
                      <div className="counterItem cmnFieldStyle d-flex">
                        <button
                          className="btn"
                          disabled={
                            !selectedProduct ||
                            selectedProduct === undefined ||
                            selectedProduct === null || selectedProduct.qnty === 1
                          }
                          ref={decreaseQuantityBtn}
                          onClick={(e) => setQuantity(e)}
                        >
                          <svg
                            width="12"
                            height="2"
                            viewBox="0 0 12 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.25 1.75H0.75V0.25H11.25V1.75Z"
                              fill="#9BAEBC"
                            />
                          </svg>
                        </button>
                        <input
                          type="number"
                          disabled={
                            !selectedProduct ||
                            selectedProduct === undefined ||
                            selectedProduct === null
                          }
                          ref={productQuantity}
                          value={
                            !selectedProduct ||
                            selectedProduct === undefined ||
                            selectedProduct.qnty === undefined
                              ? 0
                              : selectedProduct.qnty
                          }
                        />
                        <button
                          className="btn"
                          disabled={
                            !selectedProduct ||
                            selectedProduct === undefined ||
                            selectedProduct === null
                          }
                          ref={increaseQuantityBtn}
                          onClick={(e) => setQuantity(e)}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.25 6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75V5.25H11.25V6.75Z"
                              fill="#9BAEBC"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  {errorState.quantity && <p className="errorMsg">{errorState.quantity}</p>}
                  </div>
                  {selectedProduct && selectedProduct.tax === 1 && <sub className="footnoteInfo">
                    * 10% Tax will be applicable
                  </sub>}
                </div>
                <div className="cmnFormRow">
                  <button
                    className="addToCart orangeBtn"
                    disabled={
                      selectedProduct === undefined ||
                      selectedProduct === null
                    }
                    onClick={(e)=>addThisProduct(e)}
                    style={{
                      filter: `grayscale(${selectedProduct ? 0 : 1}`
                    }}
                  >
                    <img src={plus_icon} alt="Add Product" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="cartProduct">
            <div className="cartProductInner">
              <header className="informHeader">
                <h5>
                  Cart <span className="cartCount">{getCartItems()}</span>
                </h5>
              </header>
              <div
                className={
                  cartState && cartState.length < 1
                    ? "bodytransactionForm d-flex f-column f-align-center f-justify-center text-center"
                    : "bodytransactionForm d-flex f-column"
                }
              >
                <div className="bodytransaction">
                  {cartState && cartState.length > 0 ? (
                    cartState.map((cartItem, i) => (
                      <div className="cartItem" key={i}>
                        <div className="upperCart d-flex">
                          <figure
                            className="productImg"
                            // style={{
                            //   backgroundImage: cartItem.image ? "url(" + cartItem.image + ")" : "url("+placeholder_product_image+")",
                            // }}
                          >
                            {/* {console.log("TESTING CART:::>>>", cartItem, cartItem.image)} */}
                            <img src={cartItem && cartItem.image} alt={cartItem.name} />
                          </figure>
                          <div className="choiceOpt f-1">
                            <header className="d-flex f-justify-between">
                              <h6>{cartItem.name}</h6>
                              <button
                                className="btn"
                                onClick={(e) => deleteCartItem(e, cartItem, i)}
                              >
                                <img src={delete_icon} alt="Delete Item" />
                              </button>
                            </header>
                            <div className="customizedItemDeet">
                              <div className="colorItem">
                                <label>Color</label>
                                {/* {console.log("cartItem", cartItem)} */}
                                <figure
                                  className="colorFig"
                                  style={{
                                    backgroundColor: cartItem.color,
                                  }}
                                ></figure>
                              </div>
                              <div className="customizedItemSize">
                                <label>Size</label>
                                {/* {console.log("cartItem", cartItem)} */}
                                <figure className="sizeItem">
                                  {cartItem.size}
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                        <footer className="d-flex f-justify-between f-align-center">
                          <div className="counterItem">
                            <button
                              className="btn"
                              onClick={(e) => decreaseQuantity(e, cartItem, i)}
                            >
                              <svg
                                width="12"
                                height="2"
                                viewBox="0 0 12 2"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.25 1.75H0.75V0.25H11.25V1.75Z"
                                  fill="#9BAEBC"
                                />
                              </svg>
                            </button>
                            <span ref={cartProductQuantity}>
                              {cartItem?.qnty}
                            </span>
                            <button
                              className="btn"
                              onClick={(e) => increaseQuantity(e, cartItem, i)}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.25 6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75V5.25H11.25V6.75Z"
                                  fill="#9BAEBC"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="countPrice">
                            $ {cartItem.price} x {cartItem.qnty}
                          </div>
                          <div className="cartAmount">
                            {"$ " + parseFloat(cartItem.price * cartItem.qnty).toFixed(2)}
                            
                            {cartItem.tax && (
                              <div className="cartTax">+ 10% Tax</div>
                            )}
                          </div>
                        </footer>
                      </div>
                    ))
                  ) : (
                    <>
                      <figure className="noProduct">
                        <img src={cart_icon} alt="No product added" />
                        <figcaption>havn’t add any Product</figcaption>
                      </figure>
                    </>
                  )}
                </div>
              </div>
            </div>
            <footer className="cartTotal">
              <label>Total item Price</label>
              <div className="cartPrice">
                <h4>$ {totalAmt}</h4>
              </div>
            </footer>
          </div>

          <div className="createNew">
            <button
              className="saveNnewBtn"
              onClick={(e) => showAddProduct(e)}
              disabled={!cartState || cartState.length < 1}
            >
              <span>Continue to Buy</span>
              <img className="" src={arrow_forward} alt="" />
            </button>
          </div>
        </form>
      )}
      {addProductModal && (
        <AddProductModal
          closeAddProductModal={(param) => setAddProductModal(false)}
          editProductItem={updateProduct}
          retriveProducts={(showLoader) => fetchProducts(showLoader)}
          retrieveCategories={fetchCategories}
          categories={categoryData}
          getcolorSize={colorSize}
          productTransaction={true}
          getAddedProduct={getAddedProduct}
        />
      )}

      {props.productTransactionPayment === true && (
        <>
        {/* {console.log(":::cartState:::", cartState, ":::productItemsList:::", productItemsList)} */}
        <ProductPayment
          // productItemsList={productItemsList}
          cartState={cartState}
          setCartState={setCartState}
          setSuccessProductPaymentFn={props.setSuccessProductPaymentFn}
          successProductPayment={props.successProductPayment}
          setProductTransactionPayment={props.setProductTransactionPayment}
          chooseTransctionTypePOS={props.chooseTransctionTypePOS}
          backToTransList={props.backToTransList}
          contactId={props.contactId}
        />
        </>
      )}
    </>
  );
};

export default ProductTransaction;
