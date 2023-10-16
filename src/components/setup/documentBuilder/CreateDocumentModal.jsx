import React, { useEffect, useRef, useState } from "react";
import modalTopIcon from "../../../assets/images/setupicon5.svg";
import crossTop from "../../../assets/images/cross.svg";
import profileAvatar from "../../../assets/images/camera.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import arrow_backward from "../../../assets/images/leftCaretIcon.svg";
import loadImg from "../../../assets/images/loadImg.gif";
import { ProductServices } from "../../../services/setup/ProductServices";
import Loader from "../../shared/Loader";
import config from "../../../configuration/config";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Editor } from "@tinymce/tinymce-react";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import * as actionTypes from "../../../actions/types";
import { useDispatch } from "react-redux";

const CreateDocumentModal = (props) => {
	const [isLoader, setIsLoader] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const editorCreateRef = useRef(null);
	const [productData, setProductData] = useState({
		category: "",
		name: "",
		colors: [],
		image: "",
		price: "",
		size: [],
		imageUrl: profileAvatar,
		tax: 0,
	});
	const [isReadyForNextStep, setIsReadyForNextStep] = useState(false);
	const [dirty, setDirty] = useState(false);
	const base_url = window.location.origin;
	const [errorClass, setErrorClass] = useState({
		name: "",
		nameMsg: "",
		colors: "",
		colorMsg: "",
		size: "",
		sizeMsg: "",
		price: "",
		priceMsg: "",
	});
	const [categories, setCategories] = useState([]);
	const [colorSize, setColorSize] = useState({
		colors: [],
		sizes: [],
	});
	const [btnType, setBtnType] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (productData.category) {
			fetchSize();
			fetchColors();
		}
	}, [productData.category]);

	useEffect(() => {
		setCategories(props.categories);
		return () => {
			setCategories([]);
		};
	}, [props.categories]);

	useEffect(() => {
		if (Object.keys(props.editProductItem).length) {
			const updateItem = props.editProductItem;
			console.log("Selected Categories", updateItem.categoryID[0]);
			setProductData({
				category: updateItem.categoryID[0],
				name: updateItem.name,
				colors: updateItem.colors.length
					? updateItem.colors.map((el) => el._id)
					: [],
				size: updateItem.size.length ? updateItem.size.map((el) => el._id) : [],
				image: updateItem?.image,
				price: updateItem.price,
				id: updateItem._id,
				imageUrl: updateItem?.image
					? config.bucketUrl + updateItem.image
					: profileAvatar,
				tax: updateItem.tax ? updateItem.tax : 0,
			});
			setIsEditing(true);
		} else {
			setProductData((prevState) => ({
				...prevState,
				category: props.categories[0]._id,
			}));
		}

		return () => {
			setProductData({
				category: "",
				name: "",
				colors: [],
				image: "",
				price: "",
				size: [],
				imageUrl: profileAvatar,
				tax: 0,
			});
		};
	}, [props.editProductItem]);

	const fetchSize = async () => {
		try {
			const res = await CustomizationServices.fetchProductSizes(
				productData.category ? productData.category : props.categories[0]._id
			);
			console.log(res);
			setColorSize((prevstate) => ({ ...prevstate, sizes: res.sizes }));
		} catch (e) {}
	};

	const fetchColors = async () => {
		try {
			const res = await CustomizationServices.fetchProductColors(
				productData.category ? productData.category : props.categories[0]._id
			);
			console.log(res);
			setColorSize((prevstate) => ({ ...prevstate, colors: res.colors }));
		} catch (e) {}
	};

	const handleChange = (e) => {
		const elemName = e.target.name;
		const elemValue = e.target.value;
		const regex = {
			numericRegex: /[^0-9.]/,
			alphaRegex: /[^a-zA-Z0-9- ]/,
		};
		switch (elemName) {
			case "price":
				if (
					!regex.numericRegex.test(elemValue) &&
					elemValue.split(".")[0].length <= 5
				) {
					setProductData({
						...productData,
						price: elemValue.replace(/(\.\d{2})\d+/g, "$1"),
					});
					setErrorClass((prevState) => ({
						...prevState,
						price: "",
						priceMsg: "",
					}));
				}
				break;
			case "productName":
				if (!regex.alphaRegex.test(elemValue)) {
					setProductData({ ...productData, name: elemValue });
					setErrorClass((prevState) => ({
						...prevState,
						name: "",
						nameMsg: "",
					}));
				}
				break;
			case "category":
				setProductData({ ...productData, category: elemValue });
				break;

			default:
				break;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(productData);
			if (createValidation()) {
				setIsLoader(true);
				const data = {
					category: productData.category
						? productData.category
						: categories[0]._id,
					name: productData.name,
					colors: productData.colors.length ? productData.colors : [],
					image: productData.image ? productData.image : "",
					price: productData.price.toString(),
					size: productData.size.length ? productData.size : [],
					tax: productData.tax.toString(),
				};
				// console.log("Data to be updated or added", data);
				let msg;
				if (productData.id) {
					const updateData = { ...data, id: productData.id };
					const res = await ProductServices.editProduct(updateData);
					msg = res.message;
				} else {
					const res = await ProductServices.createProduct(data);
					console.log("res add new card : ", res);
					if (!res._id) {
						setErrorMsg("Error adding product. Please try again");
					} else {
						msg = "Product added successfully";
					}
				}

				if (btnType !== "SaveNew") {
					console.log("Inisde Save");
					// setSuccessMsg(msg);
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: msg,
						typeMessage: "success",
					});

					props.getAddedProduct && props.getAddedProduct(data);
				} else {
					props.retriveProducts(false);
					props.retrieveCategories();
					console.log("Inside save and new");
					// setSuccessMsg(msg);
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: msg,
						typeMessage: "success",
					});
					setProductData({
						category: categories[0],
						name: "",
						colors: [],
						image: "",
						price: "",
						size: [],
						imageUrl: profileAvatar,
						tax: 0,
					});
				}
				setBtnType("");
				setTimeout(function () {
					props.closeAddProductModal("fetch");
				}, 1000);
			}
		} catch (e) {
			// setErrorMsg(e.message);
			dispatch({
				type: actionTypes.SHOW_MESSAGE,
				message: e.message,
				typeMessage: "error",
			});
		} finally {
			setTimeout(function () {
				setIsLoader(false);
			}, 1000);
		}
	};

	const createValidation = () => {
		let bool = true;
		if (productData.name === "") {
			bool = false;
			setErrorClass((prevState) => ({
				...prevState,
				name: "error",
				nameMsg: "Please enter product name",
			}));
		}

		if (productData.price === "" || parseFloat(productData.price) <= 0) {
			bool = false;
			setErrorClass((prevState) => ({
				...prevState,
				price: "error",
				priceMsg:
					parseFloat(productData.price) === 0
						? "Price cannot be 0 or blank"
						: "Please enter the product price",
			}));
		}

		if (bool) {
			setErrorClass({
				name: "",
				nameMsg: "",
				colors: "",
				colorMsg: "",
				size: "",
				sizeMsg: "",
				price: "",
				priceMsg: "",
			});
		}
		return bool;
	};

	const handleTaxCheck = (isChecked) =>
		setProductData({ ...productData, tax: isChecked ? 1 : 0 });

	const [validateMsg, setValidateMsg] = useState({
		title: "",
		subject: "",
		template: "",
	});

	const selectableFields = [
		{ field: "Name", hasCheckbox: false, hasMandatoryField: false },
		{ field: "Phone number", hasCheckbox: false, hasMandatoryField: false },
		{ field: "Email id", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Company name", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Emergency number", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Notes", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Contact type", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Date of birth", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Address 1", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Address 2", hasCheckbox: true, hasMandatoryField: true },
		{ field: "State", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Zip", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Source", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Source details", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Mother name", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Father name", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Company", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Job role", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Status", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Phase", hasCheckbox: true, hasMandatoryField: true },
		{ field: "Created by", hasCheckbox: true, hasMandatoryField: true },
	];

	return (
		<>
			<div className='modalBackdrop modalProductAdd'>
				<div
					className='dialogBg'
					onClick={props.closeAddProductModal}
				></div>
				{isLoader ? <Loader /> : ""}
				<div className='slickModalBody create-document-modal-body'>
					<div className='slickModalHeader'>
						<button
							className='topCross'
							onClick={props.closeAddProductModal}
						>
							<img
								src={crossTop}
								alt=''
							/>
						</button>
						<div className='circleForIcon'>
							<img
								src={modalTopIcon}
								alt=''
							/>
						</div>
						<h3>{isEditing ? "Edit" : "Create"} Document</h3>
						{!isEditing ? (
							<p>Choose a category to add a new product below</p>
						) : (
							""
						)}
					</div>
					<div className='modalForm'>
						<Scrollbars
							renderThumbVertical={(props) => (
								<div className='thumb-vertical' />
							)}
						>
							<form
								method='post'
								onSubmit={handleSubmit}
							>
								{!isReadyForNextStep && (
									<>
										<div className={"formControl " + errorClass.name}>
											<label>Header</label>
											<input
												type='text'
												placeholder='Ex: Jujutsu program'
												name='productName'
												onChange={handleChange}
												value={productData.name}
												className='cmnFieldStyle'
											/>
											<p className='errorMsg'>{errorClass.nameMsg}</p>
										</div>
										<div className={"formControl " + errorClass.name}>
											<label>Body</label>
											<div
												className={
													validateMsg.template
														? "cmnFormField createNewEmailField error editor-width"
														: "cmnFormField createNewEmailField editor-width"
												}
											>
												<Editor
													apiKey='u8o9qjaz9gdqhefua3zs1lyixgg709tgzlqredwdnd0452z0'
													statusBar={true}
													onInit={(evt, editor) =>
														(editorCreateRef.current = editor)
													}
													onDirty={() => setDirty(true)}
													theme='advanced'
													onEditorChange={(newText) => console.log(newText)}
													init={{
														height: "100%",
														menubar: false,
														plugins: [
															"advlist autolink lists link image charmap print preview anchor",
															"searchreplace visualblocks code fullscreen",
															"insertdatetime media table paste code help wordcount save autosave",
														],
														file_picker_types: "file image media",
														automatic_uploads: true,
														relative_urls: false,
														remove_script_host: false,
														document_base_url: base_url,

														toolbar: [
															"fontselect fontsizeselect h1 forecolor | bold italic underline | alignleft aligncenter alignright alignjustify | numlist bullist | image | link | table | code",
															"undo redo | help",
														],
														autosave_interval: "10s",
														save_enablewhendirty: true,
													}}
												/>
											</div>
											<div className='errorMsg'>{validateMsg.template}</div>
										</div>
									</>
								)}
								{isReadyForNextStep && (
									<div className={"formControl" + errorClass.price}>
										<div className='select-fields-control'>
											<label className='select-fields-label'>
												<span>Select fields</span>
												<span className='top-underline'></span>
											</label>
											{selectableFields.map((item, index) => (
												<div
													className='formRight addTaxProduct'
													key={index}
												>
													<label className='select-field-chekbox'>
														<div className='customCheckbox'>
															<input
																type='checkbox'
																name='saleTax'
																onChange={(e) =>
																	handleTaxCheck(e.target.checked)
																}
																checked={productData.tax ? true : false}
															/>

															<span></span>
														</div>
														{item.field}
													</label>
													{item.hasMandatoryField && (
														<label className='mandatory-chekbox'>
															<div className='customCheckbox'>
																<input
																	type='checkbox'
																	name='saleTax'
																	onChange={(e) =>
																		handleTaxCheck(e.target.checked)
																	}
																	checked={productData.tax ? true : false}
																/>

																<span></span>
															</div>
															<span>{"is mandatory?"}</span>
														</label>
													)}
												</div>
											))}
										</div>
										<div className='formRight e-sign-check'>
											<label>
												<div className='customCheckbox'>
													<input
														type='checkbox'
														name='saleTax'
														onChange={(e) => handleTaxCheck(e.target.checked)}
														checked={productData.tax ? true : false}
													/>

													<span></span>
												</div>
												E-Signature
											</label>
										</div>
										<span className='bottom-underline'></span>
										<div className='doc-builder-form-end'>
											<div className='select-doc-category'>
												<label>Select Category</label>
												<select
													name='category'
													onChange={handleChange}
													value={productData.category}
												>
													{categories.map((cat, i) => {
														return (
															<>
																<option
																	value={cat._id}
																	defaultValue={
																		productData.category === cat._id
																			? "selected"
																			: ""
																	}
																	key={"category_" + i}
																>
																	{cat.name}
																</option>
															</>
														);
													})}
												</select>
											</div>
											<div className='formControl doc-title-input'>
												<label>Title</label>
												<div className='formLeft preField doc-title-control'>
													<input
														type='text'
														name='price'
														placeholder='Contract for new members'
														onChange={handleChange}
														value={productData.price}
														className='cmnFieldStyle'
													/>
													{/* <span>* default currency is<strong> USD</strong></span> */}
												</div>
												<p className='errorMsg'>{errorClass.priceMsg}</p>
											</div>
										</div>
									</div>
								)}
								<div className='modalbtnHolder w-100'>
									{!isReadyForNextStep && (
										<button
											type='submit'
											name='save'
											className='saveNnewBtn'
											onClick={() => setIsReadyForNextStep(true)}
										>
											<span>Next step</span>
											<img
												src={arrow_forward}
												alt=''
											/>
										</button>
									)}
									{isReadyForNextStep && (
										<>
											<button
												type='submit'
												name='save'
												className='saveNnewBtn prev-btn'
												onClick={() => setIsReadyForNextStep(false)}
											>
												<img
													className='vertically-center me-1'
													src={arrow_backward}
													alt=''
												/>
												<span className='vertically-center'>Previous step</span>
											</button>
											<button
												type='submit'
												name='saveNew'
												className='saveNnewBtn'
												onClick={() => setBtnType("SaveNew")}
											>
												<span>{isEditing ? "Update" : "Save"}</span>
												<img
													src={arrow_forward}
													alt=''
												/>
											</button>
										</>
									)}
								</div>
							</form>
						</Scrollbars>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateDocumentModal;
