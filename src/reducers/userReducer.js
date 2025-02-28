import * as actionTypes from "../actions/types";

const initialState = {
  filter: false,
  count: 0,
  data: null
}

const userReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.USER_FILTER:
      newState.filter = action.filter;
      break;
    case actionTypes.USER_COUNT:
      newState.count = action.count;
      break;
    case actionTypes.USER_DATA:
      newState.data = { ...newState.data, ...action.data };
      break;
    default:
      newState.filter = false;
      break;
  }
  return newState;
};

export default userReducer;