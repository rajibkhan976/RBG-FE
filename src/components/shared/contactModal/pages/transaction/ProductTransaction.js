import React, { useEffect, useRef, useState } from 'react';
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import categoryTag from "../../../../../assets/images/categoryTag.svg";
import productImgPlaceholder from "../../../../../assets/images/proImg1.png"
import arrow_forward from "../../../../../assets/images/arrow_forward.svg";
import info_icon from "../../../../../assets/images/infos.svg";
import plus_icon from "../../../../../assets/images/plus_icon.svg"
import Loader from '../../../Loader';
import cart_icon from "../../../../../assets/images/cart.svg"
import delete_icon from "../../../../../assets/images/delete_icon_grey.svg"
import cross from "../../../../../assets/images/cross.svg";
import cross_white from "../../../../../assets/images/close_icon_white.svg"
import product_icon from "../../../../../assets/images/product_icon.svg"
import camera_icon from "../../../../../assets/images/camera.svg"
import { ErrorAlert } from '../../../messages';
import Scrollbars from "react-custom-scrollbars-2";
import { HexColorPicker } from "react-colorful";

const ProductTransaction = (props) => {
    const productRef = useRef(null);
    const [showLoader, setShowLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [productItemsList, setProductItemsList] = useState([
        {
            category: "Women's",
            name: "women gym sets 2 piece long sleeve fitness suit",
            description: "Lorem ipsum dolor emit",
            picture: "data:image/png;base64,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",
            colors: [
                "#797D62", "#834140", "#369ED5"
            ],
            sizes: [
                "S", "M", "L"
            ],
            price: 99.00,
            tax: false
        }
    ])
    const [newProductObj, setNewProductObj] = useState(null)
    const [newColor, setNewColor] = useState("#fff")
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductList, setShowProductList] = useState(false);
    const [addProductModal, setAddProductModal] = useState(false)
    const [cartState, setCartState] = useState([])
    const priceInput = useRef(null)
    const newPriceInput = useRef(null)
    const quantityInput = useRef(null)
    const productTransaction = useRef(null)
    const increaseQuantityBtn = useRef(null)
    const decreaseQuantityBtn = useRef(null)
    const productQuantity = useRef(null)
    const cartProductQuantity = useRef(null)
    const categoryNewProduct = useRef(null)
    const nameNewProduct = useRef(null)
    const descriptionNewProduct = useRef(null)
    const imageNewProduct = useRef(null)
    const productImageFileName = useRef(null)
    const colorNewProductObj = useRef(null)    
    const taxAddRef = useRef(null)
    const newProductCreateForm = useRef(null)
    const [hasError, setHasError] = useState(false)

    const [errorState, setErrorState] = useState({
        color: "",
        sizes: "",
        price: "",
        quantity: ""
    })
    const [totalAmt, setTotalAmt] = useState(0)
    const [colorPickerState, setColorPickerState] = useState(false)
    const selectedColor = (e) => {
        try {
            setShowLoader(true);
            setSelectedProduct({
                ...selectedProduct,
                selectedColor: e
            })
            setHasError(true);
            setErrorState({
                ...hasError,
                color: ""
            })
        } catch(err) {
            setErrorMsg(err);
        }
        finally{
            setShowLoader(false);
        }
    }

    const selectedSize = (e) => {
        try {
            setShowLoader(true);
            setSelectedProduct({
                ...selectedProduct,
                selectedSize: e
            })
            setHasError(true);
            setErrorState({
                ...hasError,
                sizes: ""
            })
        } catch(err) {
            setErrorMsg(err);
        }
        finally{
            setShowLoader(false);
        }
    }

    const selectProductToAdd = (item, index) => {
        setSelectedProduct(item)
        setShowProductList(false)
    }

    const addProduct = (e) => {
        e.preventDefault()
        setShowProductList(!showProductList)
    }

    const getCartItems = () => {
        return cartState && cartState.length
    }

    const priceChangeProduct = () => {
        let priceChange = priceInput.current.value;
        // let resultSplit = priceChange.split(".")
        
        setSelectedProduct({
            ...selectedProduct,
            price: priceChange
        })
    }

    const setQuantity = (e) => {
        e.preventDefault()
        let quantityInput = parseInt(productQuantity.current.value);
        
        setSelectedProduct({
            ...selectedProduct,
            quantity: (e.target === decreaseQuantityBtn.current) ? quantityInput > 0 ? quantityInput-=1 : 0 : quantityInput+=1
        })
    }

    const decreaseQuantity = (e, cartItem, i) => {
        e.preventDefault()
       try {
        let cartStatePlaceholder = [...cartState];
        let cartItemPlaceholder = cartItem;
        
        cartItemPlaceholder.quantity = (cartItemPlaceholder.quantity > 0) ? cartItemPlaceholder.quantity - 1 : 0

        setCartState(cartStatePlaceholder);
       } catch (error) {
           console.log(error);
       }
       
    }

    const increaseQuantity = (e, cartItem, i) => {
        e.preventDefault()
        
        try {
            let cartStatePlaceholder = [...cartState];
            let cartItemPlaceholder = cartItem;
            
            cartItemPlaceholder.quantity += 1

            setCartState(cartStatePlaceholder)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() =>{
        let summ = 0;
            summ = cartState.forEach(item=> item.price * item.quantity)
    },[cartState])

    const handleAddProductSubmit = () => {
        console.log("hi");
    }

    useEffect(()=>{
        console.log("selectedProduct", selectedProduct);
    },[selectedProduct, hasError])

    const addThisProduct = (e) => {
        e.preventDefault()

        try {

            if(selectedProduct.quantity === undefined) {
                console.log("selectedProduct.quantity", selectedProduct.quantity);
                setHasError(true);
                setErrorState({
                    ...hasError,
                    quantity: "Please set some quantity!"
                })
            }
            if(priceInput.current.value.trim().length === 0) {
                setHasError(true);
                setErrorState({
                    ...hasError,
                    price: "Please set proper price!"
                })
            }
            if(selectedProduct.selectedColor === undefined) {
                setHasError(true);
                setErrorState({
                    ...hasError,
                    color: "Please select a color!"
                })
            }
            if(selectedProduct.selectedSize === undefined) {
                console.log(hasError);
                setHasError(true);
                setErrorState({
                    ...hasError,
                    sizes: "Please select a size!"
                })
            }
            else if(selectedProduct.quantity && selectedProduct.price && selectedProduct.selectedColor && selectedProduct.selectedSize) {
                console.log("here")
                setCartState([
                    ...cartState,
                    selectedProduct
                ])
                setHasError(false);
                setErrorState({
                    color: "",
                    sizes: "",
                    price: "",
                    quantity: ""
                })
                resetAddProduct()
            }
        } catch (error) {
            setErrorMsg(error)
        } finally {
            setErrorMsg("")
        }
    }

    const resetAddProduct = () => {
        productTransaction.current.reset()
        setSelectedProduct(null)
    }

    useEffect(()=>{
        console.log("totalAmt changed:::", totalAmt);
    },[totalAmt])

    useEffect(()=>{
        const getTotalCart = () => {
            if(cartState.length > 0) {
                const totalPlaceholder = 0;

                const sumAmt = cartState.reduce(
                    (previousValue, currentValue) => previousValue + (currentValue.price * currentValue.quantity),
                    totalPlaceholder
                );
                setTotalAmt(sumAmt)
                console.log("sumAmt", sumAmt);
            }
            else {
                console.log("Sum now", totalAmt)
                setTotalAmt(0)
            }
        }
        getTotalCart()
    },[cartState, totalAmt])

    const deleteCartItem = (e, cartItem, i) => {
        e.preventDefault();

        try {
            setShowLoader(true)
            setCartState(cartState.filter((item, index) => index !== i))
        } catch (error) {
            console.log(error);
        } finally {
            setShowLoader(false)
        }
    }

    const showAddProduct = (e) => {
        e.preventDefault()
        props.productPayment(true)
    }

    const updateNewProductImage = () => {
        let newImageURL = imageNewProduct.current.value;
        productImageFileName.current.textContent = newImageURL.split("\\").pop();

        try {
            setShowLoader(true)
            if(imageNewProduct.current.files[0].size < 5000000){
                setNewProductObj({
                    ...newProductObj,
                    picture: newImageURL
                })
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setShowLoader(false)
        }
    }

    const getCurrentProductColor = (e) => {
        console.log(e);
        setNewColor(e)
    }

    const addNewColorToObj = (e) => {
        e.preventDefault()
        const newProductColorArray = (newProductObj && newProductObj.colors) ? [...newProductObj.colors] : [];

        try {
            newProductColorArray.push(newColor)
            
            setNewProductObj({
                ...newProductObj,
                colors: newProductColorArray
            })
        } catch (error) {
            console.log(error);
        }
        finally {
            console.log("newProductObj", newProductObj);
            console.log("Color added.");
            setColorPickerState(false)
        }
    }

    const removeThisColor = (e, index) => {
        e.preventDefault()
        const newProductColors = [...newProductObj.colors]

        console.log(index, newProductColors);

        newProductColors.splice(index, 1)

        console.log(index, newProductColors);
            
        setNewProductObj({
            ...newProductObj,
            colors: newProductColors
        })
    }

    useEffect(()=>{
        console.log(newColor);
    },[newColor])

    const priceAddProduct = (e) => {        
        setNewProductObj({
            ...newProductObj,
            price: (newPriceInput.current.value.trim() !== "" && newPriceInput.current.value > 0) ? newPriceInput.current.value : null
        })
        console.log(e);
    }

    const addTax = (e) => {
        setNewProductObj({
            ...newProductObj,
            tax: taxAddRef.current.checked
        })
        console.log(e);
    }

    const setNewCategory = (e) => {
        setNewProductObj({
            ...newProductObj,
            category: categoryNewProduct.current.value !== "Select" ? categoryNewProduct.current.value : null
        })
    }

    const addProductName = (e) => {
        setNewProductObj({
            ...newProductObj,
            name: nameNewProduct.current.value.trim() !== "" ? nameNewProduct.current.value : null
        })
    }

    const addProductDescription = (e) => {
        setNewProductObj({
            ...newProductObj,
            description: descriptionNewProduct.current.value.trim() !== "" ? descriptionNewProduct.current.value : null
        })
    }

    const modifySizeItem = (e, size) => {
        let newProdSizes = (newProductObj && newProductObj.sizes) ? [...newProductObj.sizes] : [];

        try {
            if(e.target.checked) {
                newProdSizes.push(size);
            }   
            else {
                newProdSizes = newProdSizes.filter((sizeAdded, i) => sizeAdded !== size)
            }         
        } catch (error) {
            console.log(error);
        }
        finally {
            setNewProductObj({
                ...newProductObj,
                sizes: newProdSizes
            })
        }
    }
    
    useEffect(()=>{
        console.log("newProductObj", newProductObj);
    },[newProductObj])

    const createProduct = () => {   
        const productItemsListDummy = [...productItemsList];

        try {
            if(newProductObj !== null){
                setShowLoader(true);
                if(
                    newProductObj !== null && 
                    newProductObj.colors.length > 0 && 
                    newProductObj.description.trim() !== "" && 
                    newProductObj.name.trim() !== "" && 
                    newProductObj.picture &&
                    newProductObj.price.trim() !== "" &&
                    newProductObj.sizes.length > 0
                ) {
                    productItemsListDummy.push(newProductObj);
                    setProductItemsList(productItemsListDummy)
                }
            }
            else {
                setHasError(true)
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setShowLoader(false);
            setNewProductObj(null);
            setShowProductList(false)
        }
    }

    const saveNewProduct = () => {
        createProduct()
        closeModal()
    }

    const saveAndNewProduct = () => {
        const newProductForm = newProductCreateForm.current;
        
        createProduct()
        newProductForm.reset();
    }

    const closeModal = () => {
        setAddProductModal(false);
    };

    useEffect(()=>{
        console.log("hasError UPDATED:::", hasError);
    },[hasError])

    useEffect(()=>{
        console.log("Loaded");
    },[])

    return (
        <>
        {props.productTransactionPayment === false && <form className="productTransaction" ref={productTransaction}>
            {errorMsg && <ErrorAlert message={errorMsg}></ErrorAlert>}

            {/* <div className="transaction_form">      
                <div className={props.posSelectedCat ? "formsection gap" : "formsection gap disabled"}>
                    <label>Select Product</label>
                    <select className="selectBox" onChange={props.chosePosProductHandel} ref={productRef}>
                        <option>Select Product</option>
                        {props.productList.map((item, key) => (
                            <option key={"productKey_" + key} value={key} data-tax={item.taxPercent} >{item.name}</option>
                        ))}
                    </select>
                </div>
                <div class={props.posSelectedProductIndex ? "formControl" : "formControl hide"}>
                    <label>Available Colours</label>
                    <div class="pickColor">
                        {props.colors.map((item, key) => (
                            <button type="button" className={props.colorIndex === key ? "addColor active " + item : "addColor " + item}
                                style={{ backgroundColor: item.colorcode }}
                                onClick={(event) => {
                                    props.choseColorHandel(event, key)
                                }}
                                value={item.label}
                                key={key} >

                            </button>
                        ))}
                    </div>
                </div>
                <div class={props.posSelectedProductIndex ? "formControl" : "formControl hide"}>
                    <label>Available Sizes</label>
                    <div class="pickSize">
                        {props.size.map((item, key) => (
                            <button type="button" className={props.sizeIndex === key ? "size active" : "size"} onClick={(e) => props.choseSizeHandel(e, key)} value={item} >{item}</button>
                        ))}
                    </div>
                </div>
                <div className="formsection">
                    <label>Price</label>
                    <input type="text" placeholder="Ex: 99" className="editableInput"
                        value={props.productPrice}
                        onChange={props.productPriceHandel} />
                    {(props.tax !== 0) ? <span className="tax"> X {props.tax}% tax will be applicable</span> : ''}
                    <p>* default currency is <strong>USD</strong></p>
                </div>
            </div>
            <div className="productAvailable">
                <h3 className="commonHeadding">Preview Windows</h3>
                <div className="previewBox">
                    <div className="previewImgBox">
                        <span className={props.chosedColor ? "sizeTag " + props.chosedColor : "sizeTag"}>{props.chosedSize}</span>
                        <img src={props.productImg} alt="" />
                    </div>
                    <h3>{props.productName}</h3>
                    <p className="category"> <img src={categoryTag} alt="" /> {props.productCatName}</p>

                    <h4>$ {props.productPriceTax}</h4>
                    <span className="tax"> * Amount showing including taxes </span>
                </div>

                <button class={props.chosedColor && props.chosedSize && props.productPrice ? "saveNnewBtn" : "saveNnewBtn disabled"} onClick={props.buyProduct}>Buy <img src={aaroww} alt="" /></button>
            </div> */}

            <div className="transaction_form">
                <header className='informHeader'>
                    <h5>Select Product</h5>
                </header>
                <div className='bodytransactionForm'>
                    <div className='bodytransaction'>
                    <div className='cmnFormRow'>
                        <label className='labelWithInfo'>
                            <span>Select Product</span>
                            <span className="infoSpan">
                                <img src={info_icon} alt="" />
                                <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                            </span>
                        </label>
                        <div className="cmnFormField">
                            <div className='cmnFormSelect addProductFormField'>
                                <button className='btn btnSelect cmnFieldStyle' onClick={(e)=>addProduct(e)}>
                                    <span>{!selectedProduct || selectedProduct === undefined || selectedProduct === null ? "Select" : selectedProduct.name}</span>
                                </button>
                                {showProductList && 
                                    <div className='cmnFormSelectBody'>
                                        <button
                                        className="btn addManuallyBtn"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setAddProductModal(true)
                                        }}
                                        >+  Add New Product</button>

                                        <ul>
                                            {productItemsList.map((productItem, i) => (
                                                <li key={i} onClick={()=>selectProductToAdd(productItem, i)}>
                                                    <figure
                                                        style={{
                                                            backgroundImage: "url("+productItem.picture+")"
                                                        }}
                                                    ></figure>
                                                    <div className='productItemShorts'>
                                                        <span>{productItem.name}</span>
                                                        <strong>Price: {productItem.price}</strong>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={hasError.color ? 'cmnFormRow error' : 'cmnFormRow'}>
                        <label>Color</label>
                        <div className='cmnFormField'>
                            <div className='colorChoiceProduct'>
                            {!selectedProduct || selectedProduct === undefined || selectedProduct === null ? 
                                <>
                                    <label className='colorChoiceItem'>
                                        <input type="radio" name="select-product-color" disabled />
                                        <span></span>
                                    </label>
                                    <label className='colorChoiceItem'>
                                        <input type="radio" name="select-product-color" disabled />
                                        <span></span>
                                    </label>
                                    <label className='colorChoiceItem'>
                                        <input type="radio" name="select-product-color" disabled />
                                        <span></span>
                                    </label>
                                    <label className='colorChoiceItem'>
                                        <input type="radio" name="select-product-color" disabled />
                                        <span></span>
                                    </label>
                                </> :
                                <>
                                    {selectedProduct.colors.map((color, i) => (
                                        <label className='colorChoiceItem' key={"colorProduct"+i}>
                                            <input 
                                                type="radio" 
                                                name="select-product-color" 
                                                onChange={()=>selectedColor(color)}
                                            />
                                            <span style={{
                                                backgroundColor: color
                                            }}></span>
                                        </label>
                                    ))}
                                </>
                            }
                            </div>
                        </div>
                    </div>
                    <div className={hasError.sizes ? 'cmnFormRow error' : 'cmnFormRow'}>
                        <label>Available Sizes</label>
                        <div className='cmnFormField'>
                            <div className='sizeChoiceProduct'>
                            {!selectedProduct || selectedProduct === undefined || selectedProduct === null ? 
                                <>
                                    <label className='sizeChoiceItem'>
                                        <input type="radio" name="select-product-size" disabled />
                                        <span></span>
                                    </label>
                                    <label className='sizeChoiceItem'>
                                        <input type="radio" name="select-product-size" disabled />
                                        <span></span>
                                    </label>
                                    <label className='sizeChoiceItem'>
                                        <input type="radio" name="select-product-size" disabled />
                                        <span></span>
                                    </label>
                                </> :
                                <>
                                    {selectedProduct.sizes.map((size, i) => (
                                        <label className='sizeChoiceItem' key={"colorProduct"+i}>
                                            <input 
                                                type="radio" 
                                                name="select-product-size" 
                                                onChange={()=>selectedSize(size)}
                                            />
                                            <span>{size}</span>
                                        </label>
                                    ))}
                                </>
                            }
                            </div>
                        </div>
                    </div>
                    <div className='cmnFormRow'>
                        <div className={hasError.price ? 'cmnFormCol error' : 'cmnFormCol'}>
                            <label className='labelWithInfo'>
                                <span>Price</span>
                                <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                </span>
                            </label>
                            <div className='cmnFormField preField'>
                                <div className='unitAmount'>
                                    $
                                </div>
                                <input 
                                    type="number" 
                                    className='cmnFieldStyle' 
                                    placeholder='0' 
                                    disabled={!selectedProduct || selectedProduct === undefined || selectedProduct === null} 
                                    ref={priceInput}
                                    defaultValue={selectedProduct && parseFloat(selectedProduct.price).toFixed(2)}
                                    onChange={priceChangeProduct}
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <div className={hasError.quantity ? 'cmnFormCol error' : 'cmnFormCol'}>
                            <label className='labelWithInfo'>
                                <span>Quantity</span>
                                <span className="infoSpan">
                                    <img src={info_icon} alt="" />
                                    <span class="tooltiptextInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                                </span>
                            </label>
                            
                            <div className='cmnFormField'>
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
                                <div className='counterItem cmnFieldStyle d-flex'>
                                    <button 
                                        className='btn' 
                                        disabled={!selectedProduct || selectedProduct === undefined || selectedProduct === null}
                                        ref={decreaseQuantityBtn}
                                        onClick={(e)=>setQuantity(e)}
                                    >
                                        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.25 1.75H0.75V0.25H11.25V1.75Z" fill="#9BAEBC"/>
                                        </svg>
                                    </button>
                                    <input 
                                        disabled={!selectedProduct || selectedProduct === undefined || selectedProduct === null} 
                                        ref={productQuantity} 
                                        defaultValue={0} 
                                        value={(!selectedProduct || selectedProduct === undefined || selectedProduct.quantity === undefined) ? 0 : selectedProduct.quantity} />
                                    <button 
                                        className='btn' 
                                        disabled={!selectedProduct || selectedProduct === undefined || selectedProduct === null}
                                        ref={increaseQuantityBtn}
                                        onClick={(e)=>setQuantity(e)}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.25 6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75V5.25H11.25V6.75Z" fill="#9BAEBC"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <sub className='footnoteInfo'>* 10% Tax will be applicable</sub>
                    </div>
                    <div className='cmnFormRow'>
                        <button 
                            className='addToCart orangeBtn' 
                            disabled={!selectedProduct || selectedProduct === undefined || selectedProduct === null}
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
                <div className='cartProductInner'>
                    <header className='informHeader'>
                        <h5>Cart <span className='cartCount'>{getCartItems()}</span></h5>
                    </header>
                    <div className={cartState && cartState.length < 1 ? 'bodytransactionForm d-flex f-column f-align-center f-justify-center text-center' : 'bodytransactionForm d-flex f-column'}>
                        <div className='bodytransaction'>
                        {cartState && cartState.length > 0 ? 
                            cartState.map((cartItem, i) => 
                            <div className='cartItem' key={i}>
                                <div className='upperCart d-flex'>
                                    <figure className='productImg' style={{
                                        backgroundImage: "url("+cartItem.picture+")"
                                    }}></figure>
                                    <div className='choiceOpt f-1'>
                                        <header className='d-flex f-justify-between'>
                                            <h6>
                                                {cartItem.name}
                                            </h6>
                                            <button className='btn' onClick={(e)=>deleteCartItem(e, cartItem, i)}>
                                                <img src={delete_icon} alt="Delete Item" />
                                            </button>
                                        </header>
                                        <div className='customizedItemDeet'>
                                            <div className='colorItem'>
                                                <label>
                                                    Color
                                                </label>
                                                <figure className='colorFig' style={{
                                                    backgroundColor: cartItem.selectedColor
                                                }}></figure>
                                            </div>
                                            <div className='customizedItemSize'>
                                                <label>
                                                    Size
                                                </label>
                                                <figure className='sizeItem'>
                                                    {cartItem.selectedSize}
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer className='d-flex f-justify-between f-align-center'>
                                    <div className='counterItem'>
                                        <button className='btn' onClick={(e)=>decreaseQuantity(e, cartItem, i)}>
                                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.25 1.75H0.75V0.25H11.25V1.75Z" fill="#9BAEBC"/>
                                            </svg>
                                        </button>
                                        <span ref={cartProductQuantity}>{cartItem?.quantity}</span>
                                        <button className='btn' onClick={(e)=>increaseQuantity(e, cartItem, i)}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.25 6.75H6.75V11.25H5.25V6.75H0.75V5.25H5.25V0.75H6.75V5.25H11.25V6.75Z" fill="#9BAEBC"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='countPrice'>
                                        $ {cartItem.price}x{cartItem.quantity}
                                    </div>
                                    <div className='cartAmount'>
                                        {"$ "+cartItem.price * cartItem.quantity}
                                        {cartItem.tax &&
                                            <div className='cartTax'>
                                                + 10% Tax
                                            </div>
                                        }
                                    </div>
                                </footer>
                            </div>
                                
                            )
                            : 
                            <>
                                <figure className='noProduct'>
                                    <img src={cart_icon} alt="No product added" />
                                    <figcaption>havn’t add any Product</figcaption>
                                </figure>
                            </>
                            }
                        </div>
                    </div>
                </div>
                <footer className='cartTotal'>
                    <label>
                        Total item Price
                    </label>
                    <div className='cartPrice'>
                        <h4>$ {totalAmt}</h4>
                    </div>
                </footer>
            </div>

            <div className="createNew">
              <button
                className="saveNnewBtn"
                onClick={(e)=>showAddProduct(e)}
                disabled={!cartState || cartState.length < 1}
              >
                <span>Continue to Buy</span>
                <img className="" src={arrow_forward} alt="" />
              </button>
            </div>
        </form>
        }
        {addProductModal && 
            <div className="modalProductAdd modalBackdrop">
            {showLoader ? <Loader /> : ""}

            <div className="slickModalBody">
                <div className="slickModalHeader">
                    <button className="topCross" onClick={() => closeModal(false)}>
                        <img src={cross} alt="" />
                    </button>
                    <div className="circleForIcon">
                        <img src={product_icon} alt="" />
                    </div>
                    <h3>Add a Product</h3>
                    <p>Choose a category to add a new product below</p>
                </div>
                <div className="modalForm">
                    <Scrollbars
                        renderThumbVertical={(props) => (
                        <div className="thumb-vertical" />
                        )}
                    >
                        <form method="post" onSubmit={handleAddProductSubmit} ref={newProductCreateForm}>
                            <div className='cmnFormRow'>
                                <label className='cmnFieldName d-flex f-justify-between'>Select category</label>
                                <div className='cmnFormField'>
                                    <select className='cmnFieldStyle selectBox' ref={categoryNewProduct} onChange={setNewCategory}>
                                        <option>Select</option>
                                        <option value="Women's">Women's</option>
                                    </select>
                                </div>
                            </div>
                            <div className='cmnFormRow'>
                                <label className='cmnFieldName d-flex f-justify-between'>Enter Product Name</label>
                                <div className='cmnFormField'>
                                   <input type="text" placeholder='Enter product name...' className='cmnFieldStyle' ref={nameNewProduct} onChange={addProductName} />
                                </div>
                            </div>
                            <div className='cmnFormRow'>
                                <label className='cmnFieldName d-flex f-justify-between'>Enter Product Decription</label>
                                <div className='cmnFormField'>
                                   <textarea placeholder='Enter product description...' className='cmnFieldStyle' ref={descriptionNewProduct} onChange={addProductDescription}></textarea>
                                </div>
                            </div>
                            <div className='cmnFormRow'>
                                <label className='cmnFieldName d-flex f-justify-between'>Upload Program Picture</label>
                                <div className='cmnFormField'>
                                    <div className="imageUpload d-flex f-align-center">
                                        <input 
                                            type="file" 
                                            accept='image/jpeg, image/jpg, image/png, image/gif, image/bmp'
                                            ref={imageNewProduct} 
                                            onChange={updateNewProductImage} 
                                        />
                                        <figure 
                                            className="visualPicture"
                                            style={{
                                                background: (newProductObj && newProductObj.picture) ? newProductObj.picture : "none"
                                            }}
                                        >
                                            {console.log("UPDATED:::::::::::::::::::::", newProductObj && newProductObj.picture && newProductObj.picture)}
                                            <img src={camera_icon} alt="" />
                                        </figure>
                                        <div className="uploadImageText" ref={productImageFileName}>Program picture</div>
                                        <span className='staticUpload'>Upload</span>
                                    </div>
                                </div>
                            </div>
                            <div className='cmnFormRow'>
                                <label className='cmnFieldName d-flex f-justify-between'>Available Colours</label>
                                <div className='cmnFormField'>
                                    <ul className='newProdColors'>
                                        {newProductObj !== undefined && newProductObj !== null && newProductObj.colors ? newProductObj.colors.map((color, i) => (
                                            <>
                                                <li 
                                                    className='colorOptions' 
                                                    key={i}
                                                >
                                                    <span
                                                        style={{
                                                            backgroundColor: color
                                                        }}
                                                    ></span>
                                                    <button className='btn' onClick={(e)=>removeThisColor(e, i)}>
                                                        <img src={cross_white} alt="remove color" />
                                                    </button>
                                                </li>
                                            </>
                                        )) : ""}
                                        <li className='addNewProductColor'>
                                            <span onClick={()=>setColorPickerState(!colorPickerState)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#55BBC9">
                                                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>\
                                                </svg>
                                            </span>
                                            {colorPickerState &&
                                                <div className='colorPickerIn'>
                                                    <HexColorPicker onChange={getCurrentProductColor} />
                                                    <footer className='d-flex f-align-center f-justify-between'>
                                                        <button className='btn' onClick={(e)=>addNewColorToObj(e)}>Save</button>
                                                        <button className='btn' onClick={()=>setColorPickerState(false)}>Cancel</button>
                                                    </footer>
                                                </div>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='cmnFormRow'>
                                <label className='cmnFieldName d-flex f-justify-between'>Available Sizes</label>
                                <div className='cmnFormField'>
                                    <ul className='newProdColors'>
                                        <li>
                                            <label className='sizeChoiceItem'>
                                                <input type="checkbox" name="add-product-size" onChange={(e)=>modifySizeItem(e, "S")} />
                                                <span>S</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='sizeChoiceItem'>
                                                <input type="checkbox" name="add-product-size" onChange={(e)=>modifySizeItem(e, "M")} />
                                                <span>M</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='sizeChoiceItem'>
                                                <input type="checkbox" name="add-product-size" onChange={(e)=>modifySizeItem(e, "L")} />
                                                <span>L</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='cmnFormRow'>
                                <label className='cmnFieldName d-flex f-justify-between'>
                                    Price
                                </label>

                                <div className='cmnFormRow clearfix'>
                                    <div className='cmnFormCol'>
                                        <div className='cmnFormField preField'>
                                            <div className='unitAmount'>
                                                $
                                            </div>
                                            <input 
                                                type="number" 
                                                className='cmnFieldStyle' 
                                                placeholder='0' 
                                                ref={newPriceInput}
                                                onChange={priceAddProduct}
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                    <div className='cmnFormCol f-align-center'>                                    
                                        <div className='cmnFormField'>
                                            <label className='textCheckbox'>
                                                <input type="checkbox" name="check-tax" onChange={addTax} ref={taxAddRef} />
                                                <span>Add Sales Tax (10%)</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cmnFormRow modalbtnHolder">
                                <button className="saveNnewBtn" onClick={(e)=>{
                                    e.preventDefault()
                                    saveNewProduct()
                                }}>
                                    Save <img src={arrow_forward} alt="" />
                                </button>
                                <button className="saveNnewBtn" onClick={(e)=>{
                                    e.preventDefault()
                                    saveAndNewProduct()
                                }}>
                                    Save & New <img src={arrow_forward} alt="" />
                                </button>
                            </div>
                        </form>
                    </Scrollbars>
                </div>
            </div>
            </div>
        }
        
        {props.productTransactionPayment === true && 
            <div className='productPaymentTransaction'>
                Product Payment
            </div>
        }
        </>
    );
};

export default ProductTransaction;