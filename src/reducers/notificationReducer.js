import * as actionTypes from "../actions/types";

const initialState = {
    isNew: false,
    data: null
}

const notificationReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.NOTIFICATION_DATA:
            newState.data = action.data;
            break;
        case actionTypes.NOTIFICATION_RECEIVED:
            let noti = [JSON.parse(action.data), ...newState.data[0].notifications]
            newState.data[0].notifications = noti;
            newState.data[0].unread++;
            newState.isNew = true;
            break;
        case actionTypes.NOTIFICATION_READ:
            newState.isNew = false;
            break;
        default:
            break;
    }
    return newState;
};

export default notificationReducer;