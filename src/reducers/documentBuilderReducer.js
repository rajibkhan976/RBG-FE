import * as actionTypes from "../actions/types";

const initialState = {
	documentCategories: [],
};

const documentBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_DOCUMENT_CATEGORY:
			state.documentCategories = action.data;
			break;
		default:
			return state;
	}
	return state;
};

export default documentBuilderReducer;
