import * as actionTypes from "../actions/types";

const initialState = {
	isRestrictionModal: false,
	organizationListData: null,
	sentGiftPointResponse: null,
};

const creditReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case actionTypes.FETCH_ALL_ORGANIZATIONS_LIST:
			newState.organizationListData = action?.data;
			break;
		case actionTypes.SEND_CREDIT_GIFT_POINT:
			newState.sentGiftPointResponse = action?.data;
			break;
		case actionTypes.RESET_SEND_CREDIT_GIFT_POINT_RESPONSE:
			newState.sentGiftPointResponse = action?.data;
			break;
		case actionTypes.SHOW_CREDIT_RESTRICTION:
			newState.isRestrictionModal = true;
			break;
		case actionTypes.HIDE_CREDIT_RESTRICTION:
			newState.isRestrictionModal = false;
			break;
		default:
			break;
	}
	return newState;
};

export default creditReducer;
