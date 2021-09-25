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
    imageUrl: profileAvatar
  });

  const [categories, setCategories] = useState([]);
  const [colorSize, setColorSize] = useState({
    colors: [],
    sizes: []
  });
  const [btnType, setBtnType] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // setIsLoader(true);
    fetchCategories();
    fetchColorSizes();
    // setIsLoader(false);
  }, []);

  useEffect(() => {
    if (Object.keys(props.editProductItem).length) {
      const updateItem = props.editProductItem;
      setProductData({
        category: updateItem.categoryID,
        name: updateItem.name,
        colors: updateItem.colors,
        size: updateItem.size,
        image: updateItem.image,
        price: updateItem.price,
        id: updateItem._id,
        imageUrl: config.bucketUrl + updateItem.image
      });
      setIsEditing(true);
    }

  }, [props.editProductItem])

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

  const fetchColorSizes = async () => {
    try {
      const result = await ProductServices.fetchColorSizes();
      console.log("Color size length", result);
      setColorSize({
        colors: result.colors,
        sizes: result.sizes
      })
    } catch (e) {
      // props.errorMsg(e.message);
    }
  }

  const fetchCategories = async () => {
    try {
      const result = await ProductServices.fetchCategory();
      if (result.length) {
        setCategories(result);
      }
    } catch (e) {
      // props.errorMsg(e.message);
    }
  }

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
  }

  const handleChange = (e) => {
    const elemName = e.target.name;
    const elemValue = e.target.value;
    const regex = {
      numericRegex: /[^0-9.]/,
      alphaRegex: /[^a-zA-Z0-9 ]/
    };
    switch (elemName) {
      case "price":
        if (!regex.numericRegex.test(elemValue)) {
          setProductData({ ...productData, price: elemValue });
        }
        break;
      case "productName":
        if (!regex.alphaRegex.test(elemValue)) {
          setProductData({ ...productData, name: elemValue });
        }
        break;
      case "category":
        setProductData({ ...productData, category: elemValue });
        break;
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (createValidation()) {
        const data = {
          category: (productData.category) ? productData.category : categories[0]._id,
          name: productData.name,
          colors: productData.colors,
          image: productData.image,
          price: productData.price.toString(),
          size: productData.size
        }
        let msg;
        if (productData.id) {
          const updateData = {...data, id: productData.id};
          msg = await ProductServices.editProduct(updateData);
        } else {
          const res = await ProductServices.createProduct(data);
          if (!res._id) {
            setErrorMsg("Error adding product. Please try again");
          } else {
            msg = "Product added successfully";
          }
        }
        if(btnType !== "SaveNew") {
          console.log("Inisde Save");
          props.closeAddProductModal("fetch");
        } else {
          console.log("Inside save and new");
          setSuccessMsg(msg);
          setProductData({
            category: categories[0],
            name: "",
            colors: [],
            image: "",
            price: "",
            size: [],
            imageUrl: profileAvatar
          });
        }
        setBtnType("");
      } else {
        setErrorMsg("Fields should not be left blank");
      }
    } catch (e) {
      setErrorMsg(e.message);
    }
  }

  const createValidation = () => {
    let bool = false;
    if (productData.colors.length
      && productData.image !== ""
      && productData.name !== ""
      && productData.price !== ""
      && productData.size.length) {
      bool = true;
    }
    return bool;
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
      <div className="modalBackdrop">
        <div className="slickModalBody">
          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeAddProductModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={modalTopIcon} alt="" /></div>
            <h3>{(isEditing) ? "Edit" : "Add"} a Product</h3>
            <p>Choose a category to add a new product below</p>
          </div>
          <div className="modalForm">
            <form method="post" onSubmit={handleSubmit}>
              <div className="formControl">
                <label>Select Category</label>
                <select name="category" onChange={handleChange}>
                  {categories.map(cat => {
                    return (
                      <>
                        <option value={cat._id} selected={(productData.category === cat._id) ? "selected" : ""}>{cat.name}</option>
                      </>
                    );
                  })}

                </select>
              </div>
              <div className="formControl">
                <label>Enter Product Name</label>
                <input type="text" placeholder="Ex: v-shape gym vest" name="productName"
                  onChange={handleChange}
                  value={productData.name} />
              </div>
              <div className="formControl">
                <label>Upload Product Picture</label>
                <div className="profile">
                  <div className="profilePicture">
                    <img src={productData.imageUrl} alt="" />
                  </div>
                  <div className="profileText"> Product Picture</div>
                  <div className="profileUpload">
                    <input type="file" onChange={(e) => handleImageUpload(e)} />
                    <span>Upload</span>
                  </div>
                </div>
              </div>
              <div className="formControl">
                <label>Available Colours</label>
                <div className="pickColor">
                  {/* <button className="addColor active" style={{ backgroundColor: "#834140" }}></button>
                  <button className="addColor" style={{ backgroundColor: "#369ED5" }}></button>
                  <button className="addColor" style={{ backgroundColor: "#797D62" }}></button> */}
                  {colorSize.colors.map(color => {
                    if (color.type === "single") {
                      return <button className={(productData.colors.indexOf(color.label) != -1) ? "addColor active" : "addColor"}
                        style={{ backgroundColor: color.colorcode }}
                        onClick={(event) => handleColor(event, color.label)}></button>
                    }
                  })}
                </div>
              </div>
              <div className="formControl">
                <label>Available Sizes</label>
                <div className="pickSize">
                  {/* <button className="size active">S</button>
                  <button className="size active">M</button>
                  <button className="size">L</button> */}
                  {colorSize.sizes.map(size => {
                    return <button className={(productData.size.indexOf(size.size) != -1) ? "size active" : "size"}
                      onClick={(event) => handleSize(event, size.size)}>{size.size}</button>
                  })}
                </div>
              </div>
              <div className="formControl">
                <label>Price</label>
                <div className="formLeft">
                  <input type="text" name="price" placeholder="Ex: 99" onChange={handleChange} value={productData.price} />
                  <span>* default currency is<strong> USD</strong></span>
                </div>
                <div className="formRight">
                  <label>
                    <div className="customCheckbox">
                      <input type="checkbox" />
                      <span></span>
                    </div>
                    Add Sales Tax (10%)</label>
                </div>
              </div>
              <div className="modalbtnHolder">
                <button type="submit" name="save" 
                className="saveNnewBtn"
                onClick={() => setBtnType("Save")}><span>{(isEditing)?"Update":"Save"}</span><img src={arrow_forward} alt="" /></button>
                <button type="submit" name="saveNew" 
                className="saveNnewBtn"
                onClick={() => setBtnType("SaveNew")}><span>{(isEditing)?"Update":"Save"} &amp; New</span><img src={arrow_forward} alt="" /></button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddProductModal;