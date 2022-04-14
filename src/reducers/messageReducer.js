import * as actionTypes from "../actions/types";

const initialState = {
    message : '',
    typeMessage: ''
}

const MessageReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.SHOW_MESSAGE:
            newState.message = action.message;
            newState.typeMessage = action.typeMessage;
            break;
        case actionTypes.MESSAGE:
            newState.message = "";
            newState.typeMessage = "";
            break;
        default:
            newState.message = "";
            newState.typeMessage = "";
            break;
    }
    return newState;
};

export default MessageReducer;