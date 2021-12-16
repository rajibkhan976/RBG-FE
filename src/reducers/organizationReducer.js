import * as actionTypes from "../actions/types";

const initialState = {
    count: 0
}

const organizationReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.ORGANIZATION_COUNT:
            newState.count = action.count;
            break;
        default:
            break;
    }
    return newState;
};

export default organizationReducer;