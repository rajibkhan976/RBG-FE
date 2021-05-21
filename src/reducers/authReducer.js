import * as actionTypes from "../actions/types";
import jwt from "jsonwebtoken";
import config from "../configuration/config";

let token = localStorage.getItem('_token');
let decode = token ? jwt.verify(token, config.jwtSecrete) : {}; 

const initialState = token ? {
  isLoggedIn: true,
  user: {'email' : decode.email, 'username' : decode.username}
} : {
  isLoggedIn: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      newState.isLoggedIn = true;
      newState.user = action.user;
      break;
    case actionTypes.LOGOUT:
      newState.isLoggedIn = false;
      newState.user = null;
  }
  return newState;
};

export default authReducer;