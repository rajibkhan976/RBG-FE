import { useEffect, useState, useRef } from "react";
import arrowRightWhite from "../../../assets/images/arrowRightWhite.svg";
import dot3White from "../../../assets/images/info_3dot_white.svg";
import { utils } from "../../../helpers";
import {
	createDocumentCategory,
	deleteDocumentCategory,
	getDocumentCategory,
	updateDocumentCategory,
} from "../../../actions/documentBuilderActions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmBox from "../../shared/confirmBox";
import Loader from "../../shared/Loader";
import cross from "../../../assets/images/cross.svg";
import { Scrollbars } from "react-custom-scrollbars-2";

const DocumentCategory = (props) => {
	const [defaultCatID, setDefaultCatID] = useState(null);
	const [category, setCategory] = useState({
		name: "",
		id: null,
		btnName: "Add Category",
		showCross: false,
	});
	const [isConfirmed, setConfirmed] = useState({
		show: false,
		id: null,
	});
	const optionsToggleRef = useRef();
	const [option, setOption] = useState(null);
	const toogleActionList = (index) => {
		setOption(index !== option ? index : null);
	};
	const [errorCatMsg, setErrorCatMsg] = useState("");
	const dispatch = useDispatch();
	const documentCategories = useSelector(
		(state) => state.documentBuilder.documentCategories
	);
	const creatDocumentCategoryResponse = useSelector(
		(state) => state.documentBuilder.creatDocumentCategoryResponse
	);
	const updateDocumentCategoryResponse = useSelector(
		(state) => state.documentBuilder.updateDocumentCategoryResponse
	);
	const deleteDocumentCategoryResponse = useSelector(
		(state) => state.documentBuilder.deleteDocumentCategoryResponse
	);

	useEffect(() => {
		dispatch(getDocumentCategory());
		const catID = utils.getQueryVariable("catID");
		setDefaultCatID(catID);
	}, []);

	const handleChange = (e) => {
		const name = e.target.value;
		const regex = /[^a-zA-Z0-9- ]/;
		name.trim().length > 0
			? setErrorCatMsg("")
			: setErrorCatMsg("Category name should not be empty.");
		if (!regex.test(name)) {
			setCategory({ ...category, name: name, showCross: true });
		}

		if (!name.length && !category.id)
			setCategory({
				name: "",
				id: null,
				btnName: "Add Category",
				showCross: false,
			});
	};

	const handleCatBlur = (e) => {
		if (e.target.value.trim().length === 0) {
			setErrorCatMsg("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (category.name.trim() !== "") {
			try {
				/************ PERMISSION CHECKING (FRONTEND) *******************/
				// const hasPermission = utils.hasPermission("product", "read");
				// if (!hasPermission) throw new Error("You do not have permission");
				/************ PERMISSION CHECKING (FRONTEND) *******************/
				let catData = { name: category.name };
				if (!catData.name.length) {
					throw new Error("Category name should not be empty");
				} else {
					props.setIsLoader(true);
					if (category.id) {
						// catData = { ...catData, id: category.id };
						dispatch(updateDocumentCategory(catData, category.id));
						props.successMsg("Category updated successfully");
					} else {
						dispatch(createDocumentCategory(catData));
						props.successMsg("Category created successfully");
					}
					setCategory({
						name: "",
						id: null,
						btnName: "Add Category",
						showCross: false,
					});
				}
			} catch (e) {
				props.errorMsg(e.message);
			} finally {
				setErrorCatMsg("");
			}
		} else {
			setErrorCatMsg("Category name should not be empty.");
		}
	};

	const editCategory = (category) => {
		setOption(null);
		console.log("Edit Triggered", category);
		setCategory({
			name: category.name,
			id: category._id,
			btnName: "Update",
			showCross: true,
		});
	};

	useEffect(() => {
		props.setIsLoader(false);
		return () => {
			dispatch({
				type: "RESET_CREATE_DOCUMENT_CATEGORY_RESPONSE",
				data: null,
			});
		};
	}, [creatDocumentCategoryResponse]);

	useEffect(() => {
		props.setIsLoader(false);
		return () => {
			dispatch({
				type: "RESET_UPDATE_DOCUMENT_CATEGORY_RESPONSE",
				data: null,
			});
		};
	}, [updateDocumentCategoryResponse]);

	const deleteCategory = async (catID, isConfirmed = null) => {
		setOption(null);
		if (isConfirmed == null && catID) {
			console.log("Category ID", catID);
			setConfirmed({
				show: true,
				id: catID,
			});
		} else if (isConfirmed === "cancel") {
			setConfirmed({
				show: false,
				id: null,
			});
		} else {
			setConfirmed({
				show: false,
				id: null,
			});
			try {
				props.setIsLoader(true);
				dispatch(deleteDocumentCategory(catID));
			} catch (e) {
				props.errorMsg(e.message);
			}
		}
	};

	useEffect(() => {
		props.setIsLoader(false);
		if (
			deleteDocumentCategoryResponse &&
			deleteDocumentCategoryResponse.message
		) {
			props.successMsg(deleteDocumentCategoryResponse.message);
		} else if (
			deleteDocumentCategoryResponse &&
			!deleteDocumentCategoryResponse.data
		) {
			props.errorMsg("Error deleting category. Please try again.");
		}
		return () => {
			dispatch({
				type: "RESET_DELETE_DOCUMENT_CATEGORY_RESPONSE",
				data: null,
			});
		};
	}, [deleteDocumentCategoryResponse]);

	const handleCategoryClick = (catID) => {
		setOption(null);
		if (catID) {
			utils.removeQueryParameter("page");
			utils.addQueryParameter("page", 1);
			utils.addQueryParameter("catID", catID);
		} else {
			utils.removeQueryParameter("catID");
		}
		props.getContractDocuments();
	};

	return (
		<>
			{isConfirmed.show ? (
				<ConfirmBox
					callback={(confirmedMsg) =>
						deleteCategory(isConfirmed.id, confirmedMsg)
					}
				/>
			) : (
				""
			)}
			<div className='productRightSetUpPanel'>
				{props.isLoader ? <Loader /> : ""}
				<Scrollbars
					renderThumbVertical={(props) => <div className='thumb-vertical' />}
				>
					<div className='innerScroll'>
						<h3 className='productListingHeader'>Document Categories</h3>
						<div className='productSearchPanel'>
							<form
								method='post'
								onSubmit={handleSubmit}
								className={errorCatMsg !== "" ? "error" : ""}
							>
								{category.showCross ? (
									<button
										className='deleteIt'
										onClick={() =>
											setCategory({
												...category,
												name: "",
												id: null,
												btnName: "Add Category",
												showCross: false,
											})
										}
									>
										<img
											src={cross}
											alt=''
										/>
									</button>
								) : (
									""
								)}
								<input
									type='text'
									name='catname'
									onChange={handleChange}
									onBlur={(e) => handleCatBlur(e)}
									value={category.name}
									placeholder='Enter a Document Category'
								/>
								<button
									className='btn'
									type='submit'
								>
									{category.btnName}
									<img
										src={arrowRightWhite}
										alt=''
									/>
								</button>
								<p className='errorMsg'>{errorCatMsg}</p>
							</form>
						</div>
						<ul className='ProCategoryListing'>
							{documentCategories?.map((elem, key) => {
								return (
									<div key={key + "_category"}>
										<li
											ref={optionsToggleRef}
											className={defaultCatID === elem._id ? "active" : ""}
											key={elem._id}
										>
											<button
												className={
													elem.slug === "uncategorized"
														? "smallListName"
														: "bigListName"
												}
												onClick={() => handleCategoryClick(elem._id)}
											>
												{elem.name} ({elem?.documents?.length})
											</button>
											{elem.slug !== "uncategorized" ? (
												<button
													className='showList'
													onClick={() => toogleActionList(key)}
												>
													<img
														src={dot3White}
														alt=''
													/>
												</button>
											) : (
												""
											)}
											<div key={key + "_fragment"}>
												<div
													className={
														option === key
															? "dropdownOptions listOpen"
															: "listHide"
													}
												>
													<button
														className='btn btnEdit'
														onClick={() => {
															editCategory(elem);
														}}
													>
														<span>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																viewBox='0 0 13.553 13.553'
																className='editIcon'
															>
																<g transform='translate(0.75 0.75)'>
																	<path
																		className='a'
																		d='M12.847,10.424v3.218a1.205,1.205,0,0,1-1.205,1.205H3.205A1.205,1.205,0,0,1,2,13.642V5.205A1.205,1.205,0,0,1,3.205,4H6.423'
																		transform='translate(-2 -2.795)'
																	/>
																	<path
																		className='a'
																		d='M14.026,2l2.411,2.411-6.026,6.026H8V8.026Z'
																		transform='translate(-4.384 -2)'
																	/>
																</g>
															</svg>
														</span>
														Edit
													</button>
													<button
														className='btn btnDelete'
														onClick={() => deleteCategory(elem._id)}
													>
														<span>
															<svg
																className='deleteIcon'
																xmlns='http://www.w3.org/2000/svg'
																width='12.347'
																height='13.553'
																viewBox='0 0 12.347 13.553'
															>
																<g transform='translate(0.75 0.75)'>
																	<path
																		className='a'
																		d='M3,6H13.847'
																		transform='translate(-3 -3.589)'
																	/>
																	<path
																		className='a'
																		d='M13.437,4.411v8.437a1.205,1.205,0,0,1-1.205,1.205H6.205A1.205,1.205,0,0,1,5,12.847V4.411m1.808,0V3.205A1.205,1.205,0,0,1,8.013,2h2.411a1.205,1.205,0,0,1,1.205,1.205V4.411'
																		transform='translate(-3.795 -2)'
																	/>
																	<line
																		className='a'
																		y2='3'
																		transform='translate(4.397 6.113)'
																	/>
																	<line
																		className='a'
																		y2='3'
																		transform='translate(6.397 6.113)'
																	/>
																</g>
															</svg>
														</span>
														Delete
													</button>
												</div>
											</div>
										</li>
									</div>
								);
							})}
						</ul>
					</div>
				</Scrollbars>
			</div>
		</>
	);
};

export default DocumentCategory;
