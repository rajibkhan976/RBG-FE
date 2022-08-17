import * as actionTypes from "../actions/types";

const initialState = {
    count : 0
}

const automationReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case actionTypes.AUTOMATION_COUNT:
            newState.count = action.count;
            break;
    }
    return newState;
};

export default automationReducer;