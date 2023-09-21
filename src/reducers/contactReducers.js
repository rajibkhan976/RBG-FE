import * as actionTypes from "../actions/types";

const initialState = {
    count : 0,
    contact_modal_id: '',
    isFirstTime: true,
    alias_ref: ""
}

const ContactReducer = (state = initialState, action) => {
    const newState = { ...state };
    console.log(state);
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
         case actionTypes.CONTACTS_MODAL_ALIAS:
             newState.alias_ref = action.alias_ref;
             break;
        default:
            // newState.count = 0;
            // newState.contact_modal_id = '';
            break;
    }
    console.log("state",state,"action",action);

    return newState;
};

export default ContactReducer;