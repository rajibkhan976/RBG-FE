import * as actionTypes from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {}
};

const authReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
      case actionTypes.USER_LOGIN:
        newState.isAuthenticated = true;
        break;
      default:
        newState.isAuthenticated = false;
    }
    return newState;
  };
  
  export default authReducer;