import * as actionTypes from "../actions/types";

const initialState = {
    count: 0,
    location: {}
}

const organizationReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.ORGANIZATION_COUNT:
            newState.count = action.count;
            break;
        case actionTypes.GET_LAT_LNG:
            newState.location = action.location;
            break;
        case actionTypes.IS_NUMBER_ASSIGNED:
            newState.data = action.data;
            break;
        default:
            break;
    }
    return newState;
};

export default organizationReducer;