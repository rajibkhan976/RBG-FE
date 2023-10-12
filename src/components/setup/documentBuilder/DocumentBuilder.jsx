import { useEffect, useState } from "react";
import { utils } from "../../../helpers";
import { ProductServices } from "../../../services/setup/ProductServices";
import Loader from "../../shared/Loader";
import CreateDocumentModal from "./CreateDocumentModal";
import DocumentCategory from "./DocumentCategory";
import ProductFilter from "../product/products/productFilter";
import DocumentList from "./DocumentList";
import * as actionTypes from "../../../actions/types";
import { useDispatch } from "react-redux";

const DocumentBuilder = () => {
	document.title = "Red Belt Gym - Products";
	// const [createButton, setCreateButton] = useState(null);
	// const [stateFilter, setStateFilter] = useState(null);
	const [categoryData, setCategoryData] = useState([]);
	const [isLoaderCat, setIsLoaderCat] = useState(false);
	// const [successMsg, setSuccessMsg] = useState("");
	const [isLoader, setIsLoader] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const [updateProduct, setUpdateProduct] = useState({});
	const [productData, setProductData] = useState([]);
	const [paginationData, setPaginationData] = useState({
		count: null,
		totalPages: null,
		currentPage: 1,
		limit: 10,
	});
	const [colorSize, setColorSize] = useState({
		colors: [],
		sizes: [],
	});
	const [prodFilterModalStatus, setProdFilterModalStatus] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchCategories();
		fetchProducts();
		// fetchColorSizes();
	}, []);

	// useEffect(() => {
	//   if (successMsg) setTimeout(() => { setSuccessMsg("") }, messageDelay)
	//   if (errorMsg) setTimeout(() => { setErrorMsg("") }, messageDelay)
	// }, [successMsg, errorMsg]);

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
		const pageId = utils.getQueryVariable("page") || 1;
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
					totalPages: result.pagination.totalPages,
				});
			}
		} catch (e) {
			setErrorMsg(e.message);
		} finally {
			setIsLoader(false);
		}
	};

	// const toggleCreate = (e) => {
	//   setCreateButton(e);
	// };
	// const toggleFilter = (e) => {
	//   setStateFilter(e);
	// };

	const addProductModal = (bool = true, updateObj = {}) => {
		try {
			const action = Object.keys(updateObj).length ? "update" : "create";
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
	};

	const closeProductModal = (param) => {
		setOpenModal(false);
		if (param === "fetch") {
			fetchProducts();
			fetchCategories();
		}
	};

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
	};
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
				// setSuccessMsg(result.message);
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: result.message,
					typeMessage: "success",
				});
				fetchProducts();
			} else {
				// setErrorMsg("Error deleting product. Please try again.");
				dispatch({
					type: actionTypes.SHOW_MESSAGE,
					message: `Error deleting product. Please try again`,
					typeMessage: "error",
				});
			}
		} catch (e) {
			setErrorMsg(e.message);
		} finally {
			setIsLoader(false);
		}
	};

	return (
		<>
			{isLoader ? <Loader /> : ""}
			{/* {successMsg &&
        <SuccessAlert message={successMsg}></SuccessAlert>
      }
      {errorMsg &&
        <ErrorAlert message={errorMsg}></ErrorAlert>
      } */}
			<DocumentList
				openFilterModal={openFilterModal}
				productData={[]}
				fetchProducts={fetchProducts}
				getCategories={fetchCategories}
				paginationData={paginationData}
				openProductModal={(bool, updateObj) => addProductModal(bool, updateObj)}
				deleteProduct={(productID) => deleteProduct(productID)}
				successMsg={(msg) =>
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: msg,
						typeMessage: "success",
					})
				}
				errorMsg={(msg) =>
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: msg,
						typeMessage: "error",
					})
				}
			/>
			<DocumentCategory
				isLoader={isLoaderCat}
				setIsLoader={(bool) => setIsLoaderCat(bool)}
				categoryData={categoryData}
				fetchCategories={fetchCategories}
				successMsg={(msg) =>
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: msg,
						typeMessage: "success",
					})
				}
				errorMsg={(msg) =>
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: msg,
						typeMessage: "error",
					})
				}
				getProduct={(showLoader) => fetchProducts(showLoader)}
			/>

			{openModal && (
				<CreateDocumentModal
					closeAddProductModal={(param) => closeProductModal(param)}
					editProductItem={updateProduct}
					retriveProducts={(showLoader) => fetchProducts(showLoader)}
					retrieveCategories={fetchCategories}
					categories={categoryData}
					getcolorSize={colorSize}
				/>
			)}

			{prodFilterModalStatus && (
				<ProductFilter
					closeModal={closeFilterModal}
					categories={categoryData}
					getProduct={(showLoader) => fetchProducts(showLoader)}
					successMsg={(msg) =>
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: msg,
							typeMessage: "success",
						})
					}
					errorMsg={(msg) =>
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: msg,
							typeMessage: "error",
						})
					}
					getcolorSize={colorSize}
				/>
			)}
		</>
	);
};

export default DocumentBuilder;
