import { useEffect, useRef, useState } from "react";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import plus_icon from "../../../assets/images/plus_icon.svg";
import CreateDocumentModal from "./CreateDocumentModal";
import DocumentCategory from "./DocumentCategory";
import DocumentList from "./DocumentList";
import * as actionTypes from "../../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import { getContractDocuments } from "../../../actions/documentBuilderActions";

const DocumentBuilder = () => {
	document.title = "Red Belt Gym - Document Builder";
	const [isLoaderCat, setIsLoaderCat] = useState(false);
	const [isLoader, setIsLoader] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const [updateContractDocument, setUpdateContractDocument] = useState(null);
	const [contractDocumentsList, setContractDocumentsList] = useState([]);
	const [paginationData, setPaginationData] = useState({
		count: null,
		totalPages: null,
		currentPage: 1,
		limit: 10,
	});
	const [openModal, setOpenModal] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const dispatch = useDispatch();
	const documentCategories = useSelector(
		(state) => state.documentBuilder.documentCategories
	);
	const contractDocumentsData = useSelector(
		(state) => state.documentBuilder.contractDocumentsData
	);

	let fetchContractDocTimeout = useRef(null);

	const fetchContractDocuments = (showLoader = true) => {
		// const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
		// console.log("Permission", permissions)
		const queryParams = getQueryParams();
		try {
			if (showLoader) setIsLoader(true);
			/************ PERMISSION CHECKING (FRONTEND) *******************/
			// const hasPermission = utils.hasPermission("product", "read");
			// if (!hasPermission) throw new Error("You do not have permission");
			/************ PERMISSION CHECKING (FRONTEND) *******************/
			dispatch(getContractDocuments(queryParams));
		} catch (e) {
			setErrorMsg(e.message);
		}
	};

	useEffect(() => {
		fetchContractDocuments();
	}, []);

	const getQueryParams = () => {
		const catID = utils.getQueryVariable("catID");
		let page = utils.getQueryVariable("page");
		const queryParams = new URLSearchParams();
		if (searchKey) {
			page = "all";
			queryParams.append("page", page);
		} else if (!searchKey && page && page !== "all" && page !== "false") {
			queryParams.append("page", page);
		} else if (catID && !searchKey) {
			utils.removeQueryParameter("page");
			utils.addQueryParameter("page", 1);
		}
		if (catID && catID !== "all" && catID !== "false") {
			queryParams.append("catID", catID);
		}
		return queryParams;
	};

	useEffect(() => {
		fetchContractDocTimeout.current = setTimeout(() => {
			setIsLoader(false);
		}, 500);
		if (contractDocumentsData) {
			setContractDocumentsList(contractDocumentsData?.documents);
			setPaginationData({
				...paginationData,
				count: contractDocumentsData?.pagination?.count,
				currentPage: contractDocumentsData?.pagination?.currentPage,
				totalPages: contractDocumentsData?.pagination?.totalPages,
			});
		}
		return () => {
			clearTimeout(fetchContractDocTimeout.current);
		};
	}, [contractDocumentsData]);

	const createContractDocModal = (bool = true, updateObj = {}) => {
		try {
			/************ PERMISSION CHECKING (FRONTEND) *******************/
			// const hasPermission = utils.hasPermission("product", action);
			// if (!hasPermission) throw new Error("You do not have permission");
			/************ PERMISSION CHECKING (FRONTEND) *******************/
			if (documentCategories?.length) {
				setOpenModal(bool);
				setUpdateContractDocument(updateObj);
			} else {
				setErrorMsg("Please add category first");
			}
		} catch (e) {
			setErrorMsg(e.message);
		}
	};

	const closeContractDocModal = (param) => {
		setOpenModal(false);
	};

	const onSearchKeyChange = (event) => {
		setSearchKey(event.target.value?.trim());
	};

	const onEventKeyPress = (event) => {
		if (event.key === "Enter") fetchContractDocuments();
	};

	console.log(isLoader);

	return (
		<>
			<div className='dashInnerUI productSteUp'>
				<div className='userListHead product'>
					<div className='listInfo'>
						<ul className='listPath'>
							<li>Settings </li>
							<li>Document Builder</li>
						</ul>
						<h2 className='inDashboardHeader'>
							Documents ({paginationData.count ? paginationData.count : 0})
						</h2>
						<p className='userListAbout'>Manage your documents</p>
					</div>
					<div className='listFeatures'>
						<div className='searchBar contract-doc-search-bar'>
							<input
								type='search'
								name='search'
								placeholder='Search documents'
								value={searchKey}
								onChange={onSearchKeyChange}
								onKeyDown={onEventKeyPress}
								autoComplete='off'
							/>
							<div className='searchIcon'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='19.069'
									height='19'
									viewBox='0 0 19.069 19'
									id='search-ico'
								>
									<g transform='translate(-1.5 -1.5)'>
										<path
											className='a'
											d='M9.071,2a7.071,7.071,0,1,0,7.071,7.071A7.08,7.08,0,0,0,9.071,2Zm0,12.857a5.786,5.786,0,1,1,5.786-5.786A5.792,5.792,0,0,1,9.071,14.857Z'
										/>
										<path
											className='a'
											d='M26.954,26.045,23.1,22.188a.643.643,0,1,0-.909.909l3.858,3.857a.643.643,0,0,0,.909-.909Z'
											transform='translate(-7.142 -7.143)'
										/>
									</g>
								</svg>
							</div>
						</div>
						<button
							className='creatUserBtn'
							onClick={(bool, updateObj) =>
								createContractDocModal(bool, updateObj)
							}
						>
							<img
								className='plusIcon'
								src={plus_icon}
								alt=''
							/>
							<span>Create new</span>
						</button>
					</div>
				</div>

				{contractDocumentsData && !isLoader ? (
					<DocumentList
						contractDocument={contractDocumentsList}
						fetchContractDocuments={fetchContractDocuments}
						handleSetIsLoader={(status) => setIsLoader(status)}
						paginationData={paginationData}
						searchKey={searchKey}
					/>
				) : (
					<Loader />
				)}
			</div>
			{documentCategories && (
				<DocumentCategory
					isLoader={isLoaderCat}
					setIsLoader={(bool) => setIsLoaderCat(bool)}
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
					getContractDocuments={(showLoader) =>
						fetchContractDocuments(showLoader)
					}
				/>
			)}
			{openModal && (
				<CreateDocumentModal
					closeContractDocModal={(param) => closeContractDocModal(param)}
					updateContractDocument={updateContractDocument}
					categories={documentCategories}
					setIsLoader={(status) => setIsLoader(status)}
				/>
			)}
		</>
	);
};

export default DocumentBuilder;
