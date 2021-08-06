import * as actionTypes from "../actions/types";

const initialState = {
    count : 0
}

const ContactReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.CONTACTS_COUNT:
            newState.count = action.count;
            break;
        default:
            newState.count = 0;
            break;
    }
    return newState;
};

export default ContactReducer;