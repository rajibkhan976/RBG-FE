import * as actionTypes from "../actions/types";

const initialState = {
	documentCategories: [],
	creatDocumentCategoryResponse: null,
	updateDocumentCategoryResponse: null,
	deleteDocumentCategoryResponse: null,
	createContractDocumentResponse: null,
	contractDocumentsData: null,
	contractDocument: null,
	updateContractDocumentResponse: null,
	deleteContractDocumentResponse: null,
};

const documentBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_DOCUMENT_CATEGORY:
			state.documentCategories = action.data;
			break;
		case actionTypes.CREATE_DOCUMENT_CATEGORY:
			state.creatDocumentCategoryResponse = action.data;
			break;
		case actionTypes.RESET_CREATE_DOCUMENT_CATEGORY_RESPONSE:
			state.creatDocumentCategoryResponse = action.data;
			break;
		case actionTypes.UPDATE_DOCUMENT_CATEGORY:
			state.updateDocumentCategoryResponse = action.data;
			break;
		case actionTypes.RESET_UPDATE_DOCUMENT_CATEGORY_RESPONSE:
			state.updateDocumentCategoryResponse = action.data;
			break;
		case actionTypes.DELETE_DOCUMENT_CATEGORY:
			state.deleteDocumentCategoryResponse = action.data;
			break;
		case actionTypes.RESET_DELETE_DOCUMENT_CATEGORY_RESPONSE:
			state.deleteDocumentCategoryResponse = action.data;
			break;
		case actionTypes.CREATE_CONTRACT_DOCUMENT:
			state.createContractDocumentResponse = action.data;
			break;
		case actionTypes.RESET_CREATE_CONTRACT_DOCUMENT_RESPONSE:
			state.createContractDocumentResponse = action.data;
			break;
		case actionTypes.FETCH_CONTRACT_DOCUMENTS:
			state.contractDocumentsData = action.data;
			break;
		case actionTypes.DELETE_CONTRACT_DOCUMENT:
			state.deleteContractDocumentResponse = action.data;
			break;
		case actionTypes.RESET_DELETE_CONTRACT_DOCUMENT_RESPONSE:
			state.deleteContractDocumentResponse = action.data;
			break;
		case actionTypes.FETCH_CONTRACT_DOCUMENT:
			state.contractDocument = action.data;
			break;
		case actionTypes.UPDATE_CONTRACT_DOCUMENT:
			state.updateContractDocumentResponse = action.data;
			break;
		case actionTypes.RESET_UPDATE_CONTRACT_DOCUMENT_RESPONSE:
			state.updateContractDocumentResponse = action.data;
			break;
		default:
			return state;
	}
	return state;
};

export default documentBuilderReducer;
