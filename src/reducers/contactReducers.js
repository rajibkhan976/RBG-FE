import * as actionTypes from "../actions/types";

const initialState = {
    count : 0,
    contact_modal_id: '',
    isFirstTime: true
}

const ContactReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.CONTACTS_COUNT:
            newState.count = action.count;
            break;
        case actionTypes.CONTACTS_MODAL_ID:
            newState.contact_modal_id = action.contact_modal_id;
            newState.isFirstTime = false;
            break;
        case actionTypes.CONTACTS_MODAL_RESET:
            newState.isFirstTime = true;
            break;
        default:
            newState.count = 0;
            newState.contact_modal_id = '';
            break;
    }
    return newState;
};

export default ContactReducer;