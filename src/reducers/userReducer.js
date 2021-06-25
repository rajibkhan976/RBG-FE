import * as actionTypes from "../actions/types";

const initialState = {
    filter : false
}

const userReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
      case actionTypes.USER_FILTER:
        newState.filter = action.filter;
        break;
      default:
        newState.filter = false;
        break;  
    }
    return newState;
  };
  
  export default userReducer;