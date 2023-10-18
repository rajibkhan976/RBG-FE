import * as actionTypes from "../actions/types";

const initialState = {
	documentCategories: [],
	creatDocumentCategoryResponse: null,
	updateDocumentCategoryResponse: null,
	deleteDocumentCategoryResponse: null,
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
		default:
			return state;
	}
	return state;
};

export default documentBuilderReducer;
