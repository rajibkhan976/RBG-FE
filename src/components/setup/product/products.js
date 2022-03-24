import React, { useEffect, useState } from "react";
import { utils } from "../../../helpers";
import { ProductServices } from "../../../services/setup/ProductServices";
import Loader from "../../shared/Loader";
import { ErrorAlert, SuccessAlert } from "../../shared/messages";
import AddProductModal from "./products/addProductModal";
import CategoryListing from "./products/categories";
import CategoryListing2 from "./products/categories";
import ProductFilter from "./products/productFilter";
import ProductListing from "./products/productListing";



const Products = () => {
  document.title = "Red Belt Gym - Products";
  const messageDelay = 5000; // ms
  // const [createButton, setCreateButton] = useState(null);
  // const [stateFilter, setStateFilter] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoaderCat, setIsLoaderCat] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [updateProduct, setUpdateProduct] = useState({});
  const [productData, setProductData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    count: null,
    totalPages: null,
    currentPage: 1,
    limit: 10
  });
  const [colorSize, setColorSize] = useState({
    colors: [],
    sizes: []
  });
  const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchColorSizes();
  }, []);

  useEffect(() => {
    if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
    if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
  }, [successMsg, errorMsg]);

  const getQueryParams = async () => {
    const catID = utils.getQueryVariable('catID');
    const colors = utils.getQueryVariable('colors');
    const sizes = utils.getQueryVariable('sizes');
    const fromPrice = utils.getQueryVariable('fromPriceProduct');
    const toPrice = utils.getQueryVariable('toPriceProduct');
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
  }

  const fetchCategories = async () => {
    try {
      if (!isLoaderCat) setIsLoaderCat(true);
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const hasPermission = utils.hasPermission("product", "read");
      if (!hasPermission) throw new Error("You do not have permission");
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const result = await ProductServices.fetchCategory();
      if (result.length) {
        setCategoryData(result);
        console.log("CategoryData", categoryData);
      } else {
        // setErrorMsg("No categories found");
        // props.successMsg("No categories found");
      }
    } catch (e) {
      setErrorMsg(e.message);
      // props.errorMsg(e.message);
    } finally {
      setIsLoaderCat(false);
    }
  };

  const fetchProducts = async (showLoader = true) => {
    // const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
    // console.log("Permission", permissions)
    const pageId = utils.getQueryVariable('page') || 1;
    const queryParams = await getQueryParams();
    try {
      if (showLoader) setIsLoader(true);
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const hasPermission = utils.hasPermission("product", "read");
      if (!hasPermission) throw new Error("You do not have permission");
      /************ PERMISSION CHECKING (FRONTEND) *******************/
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
  };

  const fetchColorSizes = async () => {
    try {
      if (!isLoader) setIsLoader(true);
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const hasPermission = utils.hasPermission("product", "read");
      if (!hasPermission) throw new Error("You do not have permission");
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const result = await ProductServices.fetchColorSizes();
      setColorSize({
        colors: result.colors,
        sizes: result.sizes
      });
      console.log("Color Size", colorSize);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setIsLoader(false);
    }
  }



  // const toggleCreate = (e) => {
  //   setCreateButton(e);
  // };
  // const toggleFilter = (e) => {
  //   setStateFilter(e);
  // };

  const addProductModal = (bool = true, updateObj = {}) => {
    try {
      const action = (Object.keys(updateObj).length) ? "update" : "create";
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const hasPermission = utils.hasPermission("product", action);
      if (!hasPermission) throw new Error("You do not have permission");
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      if (categoryData.length) {
        setOpenModal(bool);
        setUpdateProduct(updateObj);
      } else {
        setErrorMsg("Please add category first");
      }
    } catch (e) {
      setErrorMsg(e.message);
    }
  }

  const closeProductModal = (param) => {
    setOpenModal(false);
    if (param === "fetch") {
      fetchProducts();
      fetchCategories();
    }
  }

  const openFilterModal = () => {
    try {
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const hasPermission = utils.hasPermission("product", "read");
      if (!hasPermission) throw new Error("You do not have permission");
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      setProdFilterModalStatus(true);
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  const closeFilterModal = () => {
    setProdFilterModalStatus(false);
  }
  /**
   * Get user from pagination component
   * @param {*} dataFromChild
   */
  //   const getDataFn = (dataFromChild) => {
  //     console.log("Filtered Data from child", dataFromChild);
  //     if (dataFromChild) {
  //       setFilteredData(dataFromChild);
  //     }
  //   };

  const deleteProduct = async (productID) => {
    try {
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      const hasPermission = utils.hasPermission("product", "delete");
      if (!hasPermission) throw new Error("You do not have permission");
      /************ PERMISSION CHECKING (FRONTEND) *******************/
      setIsLoader(true);
      const result = await ProductServices.deleteProduct(productID);
      if (result) {
        setSuccessMsg(result);
        fetchProducts();
      } else {
        setErrorMsg("Error deleting product. Please try again.");
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
      <ProductListing
        openFilterModal={openFilterModal}
        productData={productData}
        fetchProducts={fetchProducts}
        getCategories={fetchCategories}
        paginationData={paginationData}
        openProductModal={(bool, updateObj) => addProductModal(bool, updateObj)}
        deleteProduct={(productID) => deleteProduct(productID)}
        successMsg={(msg) => setSuccessMsg(msg)}
        errorMsg={(msg) => setErrorMsg(msg)}
      />
      <CategoryListing
        isLoader={isLoaderCat}
        setIsLoader={(bool) => setIsLoaderCat(bool)}
        categoryData={categoryData}
        fetchCategories={fetchCategories}
        successMsg={(msg) => setSuccessMsg(msg)}
        errorMsg={(msg) => setErrorMsg(msg)}
        getProduct={(showLoader) => fetchProducts(showLoader)} />

      {openModal &&
        <AddProductModal
          closeAddProductModal={(param) => closeProductModal(param)}
          editProductItem={updateProduct}
          retriveProducts={(showLoader) => fetchProducts(showLoader)}
          retrieveCategories={fetchCategories}
          categories={categoryData}
          getcolorSize={colorSize} />}

      {prodFilterModalStatus &&
        <ProductFilter
          closeModal={closeFilterModal}
          categories={categoryData}
          getProduct={(showLoader) => fetchProducts(showLoader)}
          successMsg={(msg) => setSuccessMsg(msg)}
          errorMsg={(msg) => setErrorMsg(msg)}
          getcolorSize={colorSize}
        />}
    </>
  );
};

export default Products;
