import * as actionTypes from "../actions/types";

const initialState = {
    count : 0
}

const roleReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
      case actionTypes.ROLE_COUNT:
        newState.count = action.count;
        break;
      default:
        // newState.count = 0;
        break;  
    }
    return newState;
  };
  
  export default roleReducer;