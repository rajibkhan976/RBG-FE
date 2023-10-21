import { useEffect, useRef, useState } from "react";
import { utils } from "../../../helpers";
import Loader from "../../shared/Loader";
import CreateDocumentModal from "./CreateDocumentModal";
import DocumentCategory from "./DocumentCategory";
import DocumentList from "./DocumentList";
import * as actionTypes from "../../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import {
	getDocumentCategory,
	getContractDocuments,
} from "../../../actions/documentBuilderActions";

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
	const dispatch = useDispatch();
	const documentCategories = useSelector(
		(state) => state.documentBuilder.documentCategories
	);
	const contractDocumentsData = useSelector(
		(state) => state.documentBuilder.contractDocumentsData
	);

	useEffect(() => {
		fetchContractDocuments();
		dispatch(getDocumentCategory());
	}, []);

	console.log(documentCategories);

	const getQueryParams = () => {
		const catID = utils.getQueryVariable("catID");
		const page = utils.getQueryVariable("page");
		const queryParams = new URLSearchParams();
		if (catID && catID !== "all" && catID !== "false") {
			queryParams.append("catID", catID);
		}
		if (page && page !== "all" && page !== "false") {
			queryParams.append("page", page);
		}
		return queryParams;
	};

	let fetchContractDocTimeout = useRef(null);

	const fetchContractDocuments = (showLoader = true) => {
		// const readPermission = (Object.keys(permissions).length) ? await permissions.actions.includes("read") : false;
		// console.log("Permission", permissions)
		const pageId = utils.getQueryVariable("page") || 1;
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
		if (contractDocumentsData) {
			fetchContractDocTimeout.current = setTimeout(() => {
				setIsLoader(false);
			}, 1000);
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
		if (param === "fetch") {
			fetchContractDocuments();
		}
	};

	return (
		<>
			{contractDocumentsData && !isLoader ? (
				<DocumentList
					contractDocument={contractDocumentsList}
					fetchContractDocuments={fetchContractDocuments}
					paginationData={paginationData}
					openContractDocModal={(bool, updateObj) =>
						createContractDocModal(bool, updateObj)
					}
					handleSetIsLoader={(status) => setIsLoader(status)}
				/>
			) : (
				<Loader />
			)}
			{documentCategories && (
				<DocumentCategory
					isLoader={isLoaderCat}
					setIsLoader={(bool) => setIsLoaderCat(bool)}
					categoryData={documentCategories}
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
				/>
			)}
		</>
	);
};

export default DocumentBuilder;
