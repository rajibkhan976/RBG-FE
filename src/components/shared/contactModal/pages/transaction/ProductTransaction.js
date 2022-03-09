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
  const [newColor, setNewColor] = useState("#fff");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductList, setShowProductList] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [cartState, setCartState] = useState([]);
  const priceInput = useRef(null);
  const newPriceInput = useRef(null);
  const quantityInput = useRef(null);
  const productTransaction = useRef(null);
  const increaseQuantityBtn = useRef(null);
  const decreaseQuantityBtn = useRef(null);
  const productQuantity = useRef(null);
  const cartProductQuantity = useRef(null);
  const categoryNewProduct = useRef(null);
  const nameNewProduct = useRef(null);
  const descriptionNewProduct = useRef(null);
  const imageNewProduct = useRef(null);
  const productImageFileName = useRef(null);
  const colorNewProductObj = useRef(null);
  const taxAddRef = useRef(null);
  const newProductCreateForm = useRef(null);
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
  const [colorPickerState, setColorPickerState] = useState(false);

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

  useEffect(()=>{

  },[productItemsList])

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
    try {
        console.log(e);
      setShowLoader(true);
      setSelectedProduct({
        ...selectedProduct,
        selectedColor: e,
      });
      setHasError(true);
      setErrorState({
        ...hasError,
        color: "",
      });
    } catch (err) {
      setErrorMsg(err);
    } finally {
      setShowLoader(false);
    }
  };

  const selectedSize = (e) => {
    try {
      setShowLoader(true);
      setSelectedProduct({
        ...selectedProduct,
        selectedSize: e,
      });
      setHasError(true);
      setErrorState({
        ...hasError,
        sizes: "",
      });
    } catch (err) {
      setErrorMsg(err);
    } finally {
      setShowLoader(false);
    }
  };

  const selectProductToAdd = (item, index) => {
    const productPlaceholder = item;
          productPlaceholder.selectedColor = null;
          productPlaceholder.selectedSize = null;
    console.log(productPlaceholder);
    setSelectedProduct(productPlaceholder);
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

  const priceChangeProduct = () => {
    let priceChange = parseFloat(priceInput.current.value).toFixed(2);
    // let resultSplit = priceChange.split(".")
    
    setSelectedProduct({
      ...selectedProduct,
      price: priceChange,
    });
  };

  const setQuantity = (e) => {
    e.preventDefault();
    let quantityInput = parseInt(productQuantity.current.value);

    setSelectedProduct({
      ...selectedProduct,
      qnty:
        e.target === decreaseQuantityBtn.current
          ? quantityInput > 0
            ? (quantityInput -= 1)
            : 0
          : (quantityInput += 1),
    });
  };

  const decreaseQuantity = (e, cartItem, i) => {
    e.preventDefault();
    try {
      let cartStatePlaceholder = [...cartState];
      let cartItemPlaceholder = cartItem;

      cartItemPlaceholder.qnty =
        cartItemPlaceholder.qnty > 0 ? cartItemPlaceholder.qnty - 1 : 0;

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

  useEffect(() => {
      // console.log("CART ITEMS NOW:::", cartState);
  }, [cartState]);

  const handleAddProductSubmit = () => {
    console.log("hi");
  };

  useEffect(() => {
    // console.log("selectedProduct", selectedProduct);
  }, [selectedProduct, hasError]);

  const addThisProduct = (e) => {
    e.preventDefault();

    try {
      if (selectedProduct.qnty === undefined) {
        console.log("selectedProduct.quantity");
        setHasError(true);
        setErrorState({
          ...hasError,
          quantity: "Please set some quantity!",
        });
      }
      if (priceInput.current.value.trim().length === 0) {
        console.log("selectedProduct.price");
        setHasError(true);
        setErrorState({
          ...hasError,
          price: "Please set proper price!",
        });
      }
      if (selectedProduct.selectedColor === undefined) {
        console.log("selectedProduct.color");
        setHasError(true);
        setErrorState({
          ...hasError,
          color: "Please select a color!",
        });
      }
      if (selectedProduct.selectedSize === undefined) {
        console.log("selectedProduct.size");
        setHasError(true);
        setErrorState({
          ...hasError,
          sizes: "Please select a size!",
        });
      } else if (
        selectedProduct.qnty &&
        selectedProduct.price &&
        selectedProduct.selectedColor &&
        selectedProduct.selectedSize
      ) {
          console.log(selectedProduct.tax);
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
          console.log("HERE cartItemToAdd:::", e, cartItemToAdd);
        setCartState([...cartState, cartItemToAdd]);
        setHasError(false);
        setErrorState({
          color: "",
          sizes: "",
          price: "",
          quantity: "",
        });
        resetAddProduct();
      }
    } catch (error) {
      setErrorMsg(error);
    } finally {
      setErrorMsg("");
    }
  };

  const resetAddProduct = () => {
    productTransaction.current.reset();
    setSelectedProduct(null);
  };

  useEffect(() => {
    // console.log("totalAmt changed:::", totalAmt);
  }, [totalAmt]);

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
        console.log("sumAmt", sumAmt);
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
    // console.log("cartState:::", cartState);
    props.productPayment(true);
  };

  useEffect(() => {
    // console.log("newProductObj", newProductObj);
  }, [newProductObj]);

//   const createProduct = () => {
//     const productItemsListDummy = [...productItemsList];

//     try {
//       if (newProductObj !== null) {
//         setShowLoader(true);
//         if (
//           newProductObj !== null &&
//           newProductObj.colors.length > 0 &&
//           newProductObj.description.trim() !== "" &&
//           newProductObj.name.trim() !== "" &&
//           newProductObj.image &&
//           newProductObj.price.trim() !== "" &&
//           newProductObj.sizes.length > 0
//         ) {
//           productItemsListDummy.push(newProductObj);
//           setProductItemsList(productItemsListDummy);
//         }
//       } else {
//         setHasError(true);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setShowLoader(false);
//       setNewProductObj(null);
//       setShowProductList(false);
//     }
//   };

//   const saveNewProduct = () => {
//     createProduct();
//     closeModal();
//   };

//   const saveAndNewProduct = () => {
//     const newProductForm = newProductCreateForm.current;

//     createProduct();
//     newProductForm.reset();
//     productImageFileName.current.textContent = "Program picture";
//   };

//   const closeModal = () => {
//     setAddProductModal(false);
//   };

  useEffect(() => {
    // console.log("hasError UPDATED:::", hasError);
  }, [hasError]);

  useEffect(() => {
    // console.log("Loaded");
    fetchCategories();
    fetchProducts();
    fetchColorSizes();
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
                      <span class="tooltiptextInfo">
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
                            {(!productItemsList || productItemsList.length === 0 || productItemsList === undefined) ? <Loader /> : productItemsList.map((productItem, i) => (
                              <li
                                key={i}
                                onClick={() =>
                                  selectProductToAdd(productItem, i)
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
                  className={hasError.color ? "cmnFormRow error" : "cmnFormRow"}
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
                              {console.log(selectedProduct.selectedColor)}
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
                </div>
                <div
                  className={hasError.sizes ? "cmnFormRow error" : "cmnFormRow"}
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
                              {console.log(selectedProduct.selectedSize)}
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
                      hasError.price ? "cmnFormCol error" : "cmnFormCol"
                    }
                  >
                    <label className="labelWithInfo">
                      <span>Price</span>
                      <span className="infoSpan">
                        <img src={info_icon} alt="" />
                        <span class="tooltiptextInfo">
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
                        defaultValue={
                          selectedProduct &&
                          parseFloat(selectedProduct.price).toFixed(2)
                        }
                        onChange={priceChangeProduct}
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div
                    className={
                      hasError.quantity ? "cmnFormCol error" : "cmnFormCol"
                    }
                  >
                    <label className="labelWithInfo">
                      <span>Quantity</span>
                      <span className="infoSpan">
                        <img src={info_icon} alt="" />
                        <span class="tooltiptextInfo">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry.
                        </span>
                      </span>
                    </label>

                    <div className="cmnFormField">
                      {/* <select 
                                    className='selectBox' 
                                    disabled={!selectedProduct || selectedProduct === undefined || selectedProduct === null} 
                                    ref={quantityInput}
                                    onChange={setQuantity}
                                >
                                    <option value="null">Quantity</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select> */}
                      <div className="counterItem cmnFieldStyle d-flex">
                        <button
                          className="btn"
                          disabled={
                            !selectedProduct ||
                            selectedProduct === undefined ||
                            selectedProduct === null
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
                  </div>
                  {selectedProduct && selectedProduct.tax === 1 && <sub className="footnoteInfo">
                    * 10% Tax will be applicable
                  </sub>}
                </div>
                <div className="cmnFormRow">
                  <button
                    className="addToCart orangeBtn"
                    disabled={
                      !selectedProduct ||
                      selectedProduct === undefined ||
                      selectedProduct === null
                    }
                    onClick={addThisProduct}
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
                            style={{
                              backgroundImage: cartItem.image ? "url(" + cartItem.image + ")" : "url("+placeholder_product_image+")",
                            }}
                          >
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
                                {console.log("cartItem", cartItem)}
                                <figure
                                  className="colorFig"
                                  style={{
                                    backgroundColor: cartItem.color,
                                  }}
                                ></figure>
                              </div>
                              <div className="customizedItemSize">
                                <label>Size</label>
                                {console.log("cartItem", cartItem)}
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
                            $ {cartItem.price}x{cartItem.qnty}
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
        />
      )}

      {props.productTransactionPayment === true && (
        <ProductPayment
          productItemsList={productItemsList}
          cartState={cartState}
          setCartState={setCartState}
          setSuccessProductPaymentFn={props.setSuccessProductPaymentFn}
          successProductPayment={props.successProductPayment}
          setProductTransactionPayment={props.setProductTransactionPayment}
          chooseTransctionTypePOS={props.chooseTransctionTypePOS}
          backToTransList={props.backToTransList}
          contactId={props.contactId}
        />
      )}
    </>
  );
};

export default ProductTransaction;
