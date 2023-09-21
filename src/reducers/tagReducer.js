import * as actionTypes from "../actions/types";

const initialState = {
	tagListData: [],
	savedTag: null,
	deletedTag: null,
	serviceError: null,
	appointmentTagData : null,
	appointmentRemoveTagData: null,
};

const tagReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_TAG_LIST_DATA:
			state.tagListData = action?.data;
			break;
		case actionTypes.SAVE_TAG_TO_LIST:
			state.tagListData.tags = [...state.tagListData?.tags, action?.data];
			state.savedTag = action?.data;
			break;
		case actionTypes.DELETE_TAG_FROM_LIST:
			state.tagListData.tags = state.tagListData?.tags?.filter(
				(tag) => tag?._id !== action?.data?.tagId
			);
			state.deletedTag = action?.data?.response;
			break;
		case actionTypes.TAG_SERVICE_REQUEST_FAILED:
			state.serviceError = action?.data;
			break;
		case actionTypes.APPOINTMENT_SAVE_TAG_DATA:
			state.appointmentTagData = action?.data;
			break;
		case actionTypes.APPOINTMENT_REMOVE_TAG_DATA :
			state.appointmentRemoveTagData = action?.data;
		default:
			return state;
	}
	return state;
};

export default tagReducer;
