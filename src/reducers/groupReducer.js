import * as actionTypes from "../actions/types";

const initialState = {
    count : 0
}

const groupReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
      case actionTypes.GROUP_COUNT:
        newState.count = action.count;
        break;
      default:
        newState.count = 0;
        break;  
    }
    return newState;
  };
  
  export default groupReducer;