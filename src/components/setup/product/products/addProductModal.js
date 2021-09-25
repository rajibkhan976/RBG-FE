import React, { useEffect, useState, useRef } from "react";
import modalTopIcon from "../../../../assets/images/setupicon5.svg";
import crossTop from "../../../../assets/images/cross.svg";
import profileAvatar from "../../../../assets/images/camera.svg";
import arrow_forward from "../../../../assets/images/arrow_forward.svg";
import { ProductServices } from "../../../../services/setup/ProductServices";

const AddProductModal = (props) => {

  const [productData, setProductData] = useState({
    category: "",
    name: "",
    colors: [],
    image: "",
    price: "",
    size: []
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // if (!isLoader) setIsLoader(true);
      const result = await ProductServices.fetchCategory();
      if (result.length) {
        setCategories(result);
        console.log("CategoryData", result);
      } else {
        // props.successMsg("No categories found");
      }
    } catch (e) {
      // props.errorMsg(e.message);
    } finally {
      // setIsLoader(false);
    }
  }

  const handleImageUpload = (event) => {
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
          console.log(avatar);
        }).catch(err => {
          console.log('Profile pic error', err);
        });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  return (
    <>
      <div className="modalBackdrop">
        <div className="slickModalBody">
          <div className="slickModalHeader">
            <button className="topCross" onClick={props.closeAddProductModal}><img src={crossTop} alt="" /></button>
            <div className="circleForIcon"><img src={modalTopIcon} alt="" /></div>
            <h3>Add a Product</h3>
            <p>Choose a category to add a new product below</p>
          </div>
          <div className="modalForm">
            <form>
              <div className="formControl">
                <label>Select Category</label>
                <select>
                  {categories.map(cat => {
                    return (
                      <>
                        <option value={cat._id}>{cat.name}</option>
                      </>
                    );
                  })}

                </select>
              </div>
              <div className="formControl">
                <label>Enter Product Name</label>
                <input type="text" placeholder="Ex: v-shape gym vest" />
              </div>
              <div className="formControl">
                <label>Upload Product Picture</label>
                <div className="profile">
                  <div className="profilePicture">
                    <img src={profileAvatar} alt="" />
                  </div>
                  <div className="profileText"> Profile Picture</div>
                  <div className="profileUpload">
                    <input type="file" onChange={(e) => handleImageUpload(e)} />
                    <span>Upload</span>
                  </div>
                </div>
              </div>
              <div className="formControl">
                <label>Available Colours</label>
                <div className="pickColor">
                  <button className="addColor active" style={{ backgroundColor: "#834140" }}></button>
                  <button className="addColor" style={{ backgroundColor: "#369ED5" }}></button>
                  <button className="addColor" style={{ backgroundColor: "#797D62" }}></button>
                </div>
              </div>
              <div className="formControl">
                <label>Available Sizes</label>
                <div className="pickSize">
                  <button className="size active">S</button>
                  <button className="size active">M</button>
                  <button className="size">L</button>
                </div>
              </div>
              <div className="formControl">
                <label>Price</label>
                <div className="formLeft">
                  <input type="text" placeholder="Ex: 99" />
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
                <button className="saveNnewBtn"><span>Save</span><img src={arrow_forward} alt="" /></button>
                <button className="saveNnewBtn"><span>Save &amp; New</span><img src={arrow_forward} alt="" /></button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddProductModal;