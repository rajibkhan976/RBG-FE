import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../actions/types";
import noData_search_icon from "../../../assets/images/noData_search_icon.svg";
import arrow_forward from "../../../assets/images/arrow_forward.svg";
import { ProductServices } from "../../../services/setup/ProductServices";
import { CustomizationServices } from "../../../services/setup/CustomizationServices";
import { utils } from "../../../helpers";

const FilterColorModal = (props) => {
	const [fetchedCatList, setFetchedCatList] = useState(props.fetchedCatList);
	const [catList, setCatList] = useState(props.fetchedCatList);
	const [selectedCat, setSelectedCat] = useState([]);
	const [catSearchKey, setCatSearchKey] = useState("");
	const [catListIsOpen, setCatListIsOpen] = useState(false);
	const [formData, setFormData] = useState(props.filterFormData);
	const [formError, setFormError] = useState(null);
	const dispatch = useDispatch();
	const ref = useRef();
	let zIndexBody = useSelector((state) => state.modal.zIndexBody);
	useEffect(() => {
		const category = decodeURIComponent(utils.getQueryVariable("category"));
		if (category !== "false") {
			console.log("category", category);
			setSelectedCat(category.split(","));
		}
	}, []);

	const openCatListHandel = () => {
		setCatListIsOpen(true);
		document.getElementById("cz_catSearchBox").focus();
	};

	const selectCat = (item, index) => {
		setSelectedCat([...selectedCat, item._id]);
		setFormData([...formData, item._id]);
		for (var i = 0; i < catList.length; i++) {
			if (catList[i]._id === item._id) {
				catList[i].selected = true;
			}
		}
		setFormError(null);
	};

	const deselectCat = (item) => {
		console.log(item);
		console.log("Selected Cat", selectedCat);
		const filteredSelected = selectedCat.filter((el) => el !== item._id);
		setSelectedCat(filteredSelected);
	};

	const searchCatHandel = (e) => {
		setCatSearchKey(e.target.value);
		let val = e.target.value.toLowerCase();
		if (val == "") {
			setCatList(fetchedCatList);
		} else {
			setCatList(
				fetchedCatList.filter((cat) => cat.name.toLowerCase().includes(val))
			);
		}
	};

	const closeModal = () => {
		props.closeModal();
	};

	useEffect(() => {
		const checkClickOutside = (e) => {
			if (
				typeof option != "object" &&
				ref.current &&
				!ref.current.contains(e.target)
			) {
				setCatListIsOpen(false);
				setCatSearchKey("");
			}
		};

		document.addEventListener("click", checkClickOutside);
		return () => {
			document.removeEventListener("click", checkClickOutside);
		};
	});

	const clearFilter = () => {
		utils.removeQueryParameter("category");
		setFormData([]);
		setSelectedCat([]);
		// props.clearFilter();
		props.fetchProductColors();
	};

	const handleApplyFilter = () => {
		if (selectedCat.length) {
			utils.addQueryParameter("category", selectedCat.toString());
			props.fetchProductColors(selectedCat.toString());
		} else {
			utils.removeQueryParameter("category");
		}
	};

	return (
		<div className='sideMenuOuter filterUserMenu'>
			<div
				className='dialogBg'
				onClick={closeModal}
			></div>
			<div className='sideMenuInner'>
				<button
					className='btn btn-closeSideMenu'
					onClick={closeModal}
				>
					<span></span>
					<span></span>
				</button>
				<div className='sideMenuHeader'>
					<h3 className='liteHeading'>Apply Filter</h3>
				</div>
				<div className='sideMenuBody'>
					<form className='formBody'>
						<div className={formError ? "cmnFormRow errorField" : "cmnFormRow"}>
							<label className='cmnFieldName'>Category</label>
							<div
								className='cz_selectCategory cmnFieldStyle'
								ref={ref}
								onClick={openCatListHandel}
							>
								<div className='cz_categorySelectSec'>
									<div className='cz_selectedCatList'>
										<ul>
											{catList.length
												? catList
														.filter((el) => selectedCat.includes(el._id))
														.map((item, index) => {
															return (
																<li key={"selectedSearchCat_" + index}>
																	<div className='cz_selectedCat'>
																		{item.name}
																		<button
																			type='button'
																			className='cz_removeCat'
																			onClick={() => deselectCat(item)}
																		></button>
																	</div>
																</li>
															);
														})
												: ""}
											<li className={!catListIsOpen ? "hide" : ""}>
												<input
													type='text'
													id='cz_catSearchBox'
													value={catSearchKey}
													onChange={searchCatHandel}
												/>
											</li>
										</ul>
									</div>
								</div>
								{catListIsOpen ? (
									<div className='cz_categoryList'>
										{catList.length ? (
											<ul>
												{catList.map((item, index) => {
													return (
														<li
															key={"searchCat_" + index}
															onClick={() => selectCat(item, index)}
															className={
																selectedCat.includes(item._id) ? "disabled" : ""
															}
														>
															{item.name}
														</li>
													);
												})}
											</ul>
										) : catSearchKey ? (
											<div className='cz_noSearchData'>
												<figure>
													<img
														src={noData_search_icon}
														alt=''
													/>
												</figure>
												<p>Sorry! we couldn't find any match.</p>
												<div className='cr_searchedKey'>“{catSearchKey}”</div>
											</div>
										) : (
											""
										)}
									</div>
								) : (
									""
								)}
							</div>
							{formError ? <div className='errorMsg'>{formError}</div> : ""}
						</div>
						<div className='applyFilterBtn'>
							<button
								className={
									selectedCat.length ? "saveNnewBtn" : "saveNnewBtn disabled"
								}
								type='button'
								onClick={handleApplyFilter}
							>
								<span>Apply Filter</span>
								<img
									src={arrow_forward}
									alt='>'
								/>
							</button>
							<button
								className={
									selectedCat.length ? "btn-link" : "btn-link disabled"
								}
								type='button'
								onClick={clearFilter}
							>
								Clear
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FilterColorModal;
