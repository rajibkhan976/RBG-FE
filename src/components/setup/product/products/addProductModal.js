import React, { useEffect, useState, useRef } from "react";
import modalTopIcon from "../../../../assets/images/setupicon5.svg";
import crossTop from "../../../../assets/images/cross.svg";
import profileAvatar from "../../../../assets/images/camera.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import loadImg from "../../../../assets/images/loadImg.gif";
import { ProductServices } from "../../../../services/setup/ProductServices";
import Loader from "../../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../../shared/messages";
import config from "../../../../configuration/config";
import { Scrollbars } from "react-custom-scrollbars-2";

const AddProductModal = (props) => {
  const messageDelay = 5000;
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [productData, setProductData] = useState({
    category: "",
    name: "",
    colors: [],
    image: "",
    price: "",
    size: [],
    imageUrl: profileAvatar,
    tax: 0
  });

  const [errorClass, setErrorClass] = useState({
    name: "",
    nameMsg: "",
    colors: "",
    colorMsg: "",
    size: "",
    sizeMsg: "",
    price: "",
    priceMsg:""
  });
  const [categories, setCategories] = useState([]);
  const [colorSize, setColorSize] = useState({
    colors: [],
    sizes: []
  });
  const [btnType, setBtnType] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setColorSize(props.getcolorSize);
  }, []);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    if (Object.keys(props.editProductItem).length) {
      const updateItem = props.editProductItem;
      console.clear();
      console.log(updateItem);
      console.log(updateItem?.image);
      setProductData({
        category: updateItem.categoryID[0],
        name: updateItem.name,
        colors: updateItem.colors,
        size: updateItem.size,
        image: updateItem?.image,
        price: updateItem.price,
        id: updateItem._id,
        imageUrl: (updateItem?.image) ? config.bucketUrl + updateItem.image : profileAvatar,
        tax: (updateItem.tax) ? updateItem.tax : 0
      });
      setIsEditing(true);
    };

  }, [props.editProductItem])

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

  const handleImageUpload = (event) => {
    setProductData({ ...productData, imageUrl: loadImg });
    const files = event.target.files;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (read) => {
        // setLogo(read.target.result);
        ProductServices.imageUpload({
          file: read.target.result,
          name: files[0].name
        }).then((result) => {
          const avatar = result.data.publicUrl;
          setProductData({ ...productData, image: result.data.originalKey, imageUrl: result.data.publicUrl });
          console.log(avatar);
        }).catch(err => {
          console.log('Profile pic error', err);
          setProductData({ ...productData, imageUrl: profileAvatar });
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  const handleColor = (e, label) => {
    e.preventDefault();
    let choosenColors = [...productData.colors];
    if (choosenColors.indexOf(label) === -1) {
      choosenColors.push(label);
    } else {
      choosenColors = choosenColors.filter(colorlabel => colorlabel !== label);
    }
    setProductData({ ...productData, colors: choosenColors });
    setErrorClass(prevState => ({...prevState, colors: "", colorMsg: ""}));
  }

  const handleSize = (e, label) => {
    e.preventDefault();
    let choosenSizes = [...productData.size];
    if (choosenSizes.indexOf(label) === -1) {
      choosenSizes.push(label);
    } else {
      choosenSizes = choosenSizes.filter(size => size !== label);
    }
    setProductData({ ...productData, size: choosenSizes });
    setErrorClass(prevState => ({...prevState, size: "", sizeMsg: ""}));
  }

  const handleChange = (e) => {
    const elemName = e.target.name;
    const elemValue = e.target.value;
    const regex = {
      numericRegex: /[^0-9.]/,
      alphaRegex: /[^a-zA-Z0-9- ]/
    };
    switch (elemName) {
      case "price":
        if (!regex.numericRegex.test(elemValue) && elemValue.split(".")[0].length <= 5) {
          setProductData({ ...productData, price: elemValue.replace(/(\.\d{2})\d+/g, '$1') });
          setErrorClass(prevState => ({...prevState, price: "", priceMsg: ""}));
        }
        break;
      case "productName":
        if (!regex.alphaRegex.test(elemValue)) {
          setProductData({ ...productData, name: elemValue });
          setErrorClass(prevState => ({...prevState, name: "", nameMsg: ""}));
        }
        break;
      case "category":
        setProductData({ ...productData, category: elemValue });
        break;

        default:
          break;
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(productData);
      if (createValidation()) {
        setIsLoader(true);
        const data = {
          category: (productData.category) ? productData.category : categories[0]._id,
          name: productData.name,
          colors: (productData.colors.length) ? productData.colors : [],
          image: (productData.image) ? productData.image : "",
          price: productData.price.toString(),
          size: (productData.size.length) ? productData.size : [],
          tax: productData.tax.toString()
        };
        // console.log("Data to be updated or added", data);
        let msg;
        if (productData.id) {
          const updateData = { ...data, id: productData.id };
          msg = await ProductServices.editProduct(updateData);
          console.clear();
          console.log(msg)
        } else {  
          const res = await ProductServices.createProduct(data);
          console.log("res add new card : ",  res);
          if (!res._id) {
            setErrorMsg("Error adding product. Please try again");
          } else {
            msg = "Product added successfully";
          }
        }

        if (btnType !== "SaveNew") {
          console.log("Inisde Save");
          setSuccessMsg(msg);

          props.getAddedProduct &&props.getAddedProduct(data)
        } else {
          props.retriveProducts(false);
          props.retrieveCategories();
          console.log("Inside save and new");
          setSuccessMsg(msg);
          setProductData({
            category: categories[0],
            name: "",
            colors: [],
            image: "",
            price: "",
            size: [],
            imageUrl: profileAvatar,
            tax: 0
          });
        }
        setBtnType("");
        setTimeout(function () {
          props.closeAddProductModal("fetch");
        }, 1000);
      }
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
        setTimeout(function () {
          setIsLoader(false);
        }, 1000);
    }
  }

  const createValidation = () => {
    let bool = true;
    if(productData.name === "") {
      bool = false;
      setErrorClass(prevState => ({...prevState, name: "error", nameMsg: "Please enter product name"}));
    }

    // if(productData.colors.length === 0) {
    //   bool = false;
    //   setErrorClass(prevState => ({...prevState, colors: "error", colorMsg: "Please choose atleast one color from the available colors"}));
    // }

    // if(productData.size.length === 0) {
    //   bool = false;
    //   setErrorClass(prevState => ({...prevState, size: "error", sizeMsg: "Please choose atleast one size from the available sizes"}));
    // }

    if(productData.price === "" || parseFloat(productData.price) <= 0) {
      bool = false;
      setErrorClass(prevState => ({...prevState, price: "error", priceMsg: parseFloat(productData.price) === 0 ? "Price cannot be 0 or blank" :"Please enter the product price"}));
    }

    if(bool) {
      setErrorClass({
        name: "",
        nameMsg: "",
        colors: "", 
        colorMsg: "",
        size: "",
        sizeMsg: "",
        price: "", 
        priceMsg: ""
      });
    }
    return bool;
  }

  const handleTaxCheck = (isChecked) => setProductData({ ...productData, tax: (isChecked) ? 1 : 0 });

  return (
    <>
      {successMsg &&
        <SuccessAlert message={successMsg} extraclassName="productPopupMsg"></SuccessAlert>
      }
      {errorMsg &&
        <ErrorAlert message={errorMsg} extraclassName="productPopupMsg"></ErrorAlert>
      }
      <div className="modalBackdrop modalProductAdd">
        {isLoader ? <Loader /> : ''}
        <div className="slickModalBody">
          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeAddProductModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={modalTopIcon} alt="" /></div>
            <h3>{(isEditing) ? "Edit" : "Add a"} Product</h3>
            {!isEditing ? <p>Choose a category to add a new product below</p>: ""}
          </div>
          <div className="modalForm">
            <Scrollbars renderThumbVertical={(props) => <div className="thumb-vertical" />}>
              <form method="post" onSubmit={handleSubmit}>
                <div className="formControl">
                  <label>Select Category</label>
                  <select name="category" onChange={handleChange} value={productData.category}>
                    {categories.map((cat, i) => {
                      return (
                        <>
                          <option value={cat._id} defaultValue={(productData.category === cat._id) ? "selected" : ""} key={i}>{cat.name}</option>
                        </>
                      );
                    })}

                  </select>
                </div>
                <div className={"formControl " + errorClass.name}>
                  <label>Enter Product Name</label>
                  <input type="text" placeholder="Ex: v-shape gym vest" name="productName"
                    onChange={handleChange}
                    value={productData.name} 
                    className="cmnFieldStyle"/>
                  <p className="errorMsg">{errorClass.nameMsg}</p>
                </div>
                <div className="formControl">
                  <label>Upload Product Picture</label>
                  <div className="profile imageUpload d-flex f-align-center">
                    <div className="profileUpload">
                      <input type="file" onChange={(e) => handleImageUpload(e)} />
                      {/* <span>Upload</span> */}
                    </div>
                    <figure className="profilePicture visualPicture">
                      <img src={productData.imageUrl} alt="" />
                    </figure>
                    <div className="profileText uploadImageText"> Product Picture</div>
                    <span className="staticUpload">Upload</span>
                  </div>
                </div>
                <div className={"formControl " + errorClass.colors}>
                  <label>Available Colours</label>
                  <div className="pickColor">
                    {/* <button className="addColor active" style={{ backgroundColor: "#834140" }}></button>
                  <button className="addColor" style={{ backgroundColor: "#369ED5" }}></button>
                  <button className="addColor" style={{ backgroundColor: "#797D62" }}></button> */}
                  {console.log("colorSize::::::>>>>>", colorSize)}
                    {colorSize.colors.map((color, i) => {
                      if (color.type === "single") {
                        return <button className={(productData.colors.indexOf(color.label) != -1) ? "addColor active" : "addColor"}
                          style={{ backgroundColor: color.colorcode }}
                          onClick={(event) => handleColor(event, color.label)}
                          key={i}  
                        ></button>
                      }
                      else {
                        return <button className={(productData.colors.indexOf(color.label) != -1) ? "addColor multiColor active" : "addColor multiColor"}
                          onClick={(event) => handleColor(event, color.label)}
                          key={i}  
                        ></button>
                      }
                    })}
                  </div>
                  <p className="errorMsg">{errorClass.colorMsg}</p>
                </div>
                <div className={"formControl " + errorClass.size}>
                  <label>Available Sizes</label>
                  <div className="pickSize">
                    {/* <button className="size active">S</button>
                  <button className="size active">M</button>
                  <button className="size">L</button> */}
                    {colorSize.sizes.map((size, i) => {
                      return <button className={(productData.size.indexOf(size.size) != -1) ? "size active" : "size"}
                        onClick={(event) => handleSize(event, size.size)} key={i}>{size.size}</button>
                    })}
                  </div>
                  <p className="errorMsg">{errorClass.sizeMsg}</p>
                </div>

                <div className={"formControl " + errorClass.price}>
                  <label>Price</label>
                  <div className="formLeft preField">
                    <div className="unitAmount">$</div>
                    <input type="text" name="price" placeholder="Ex: 99" onChange={handleChange} value={productData.price} className="cmnFieldStyle" />
                    {/* <span>* default currency is<strong> USD</strong></span> */}
                  </div>
                  <div className="formRight addTaxProduct">
                    <label>
                      <div className="customCheckbox">
                        <input type="checkbox"
                          name="saleTax"
                          onChange={(e) => handleTaxCheck(e.target.checked)}
                          checked={(productData.tax) ? true : false}
                        />
                        
                        <span></span>
                      </div>
                      Add Sales Tax</label>
                  </div>
                  <p className="errorMsg">{errorClass.priceMsg}</p>
                </div>

                <div className="modalbtnHolder w-100">
                  {!props.productTransaction && <button type="submit" name="save"
                    className="saveNnewBtn"
                    onClick={() => setBtnType("Save")}><span>{(isEditing) ? "Update" : "Save"}</span><img src={arrow_forward} alt="" /></button>}

                  {props.productTransaction && <button type="submit" name="save"
                    className="saveNnewBtn"
                    onClick={() => setBtnType("Save")}><span>Save and Select</span><img src={arrow_forward} alt="" /></button>
                  }
                  {!props.productTransaction && <button type="submit" name="saveNew"
                    className="saveNnewBtn"
                    onClick={() => setBtnType("SaveNew")}><span>{(isEditing) ? "Update" : "Save"} &amp; New</span><img src={arrow_forward} alt="" /></button>}
                </div>
              </form>
            </Scrollbars>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddProductModal;