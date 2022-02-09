import React from 'react';
import aaroww from "../../../../../assets/images/arrow_forward.svg";
import categoryTag from "../../../../../assets/images/categoryTag.svg";

const ProductTransaction = (props) => {
    return (
        <form>
            <div className="transaction_form">                        
                <div className="formsection gap">
                    <label>Select Program</label>
                    <select className="selectBox" onChange={props.chosePosCatHandel}>
                        <option value="" >Select Pogram</option>
                        {props.productCatList.map((item, key) => (
                            <option key={"productCat_" + key} value={item._id} data-name={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className={props.posSelectedCat ? "formsection gap" : "formsection gap disabled"}>
                    <label>Select Product</label>
                    <select className="selectBox" onChange={props.chosePosProductHandel}>
                        <option>Select Product</option>
                        {props.productList.map((item, key) => (
                            <option key={"productKey_" + key} value={key} data-tax={item.taxPercent} >{item.name}</option>
                        ))}
                    </select>
                </div>
                <div class={props.posSelectedProductIndex ? "formControl" : "formControl hide"}>
                    <label>Available Colours</label>
                    <div class="pickColor">
                        {/* <button className={"addColor"} style={{ backgroundColor: "#834140" }}>
                             <img src={addActive ? tick : ""} alt=""/>
                        </button> */}
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
                        {/* <button className={addActive2 ? "size active" :  "size"}  onClick={activeClassHandler2}>S</button> */}
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
            </div>
        </form>
    );
};

export default ProductTransaction;