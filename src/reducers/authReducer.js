import * as actionTypes from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      newState.isLoggedIn = true;
      break;
    default:
      newState.isLoggedIn = false;
  }
  return newState;
};

export default authReducer;