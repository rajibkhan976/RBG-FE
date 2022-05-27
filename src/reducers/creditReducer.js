import * as actionTypes from "../actions/types";

const initialState = {
    isRestrictionModal: false
}

const creditReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
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