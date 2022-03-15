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
            let notification = JSON.parse(action.data);
            let index = newState.data.findIndex((c) => c._id === notification.type);
            let noti = [notification, ...newState.data[index].notifications]
            newState.data[index].notifications = noti;
            newState.data[index].unread++;
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