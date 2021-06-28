import * as actionTypes from "../actions/types";

const initialState = {
    permission : []
}

const permissionReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
      case actionTypes.UPDATE_PERMISSION:
        newState.permission = action.permission;
        break;
      default:
        newState.permission = [];
        break;  
    }
    return newState;
  };
  
  export default permissionReducer;