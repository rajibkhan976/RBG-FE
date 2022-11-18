import * as actionTypes from "../actions/types";

const initialState = {
  zIndex: 101,
  zIndexUser: 0,
  zIndexNotification: 0,
  zIndexCall : 0,
  zIndexSms: 0,
  zIndexBody: 0,
  zIndexSetting: 0,
}

const modalReducer = (state = initialState, action) => {
  console.log("I am getting called when notification is clicked", state,action)
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.MODAL_COUNT_INCREMENT:
      if (action.area === 'notification') {
        newState.zIndexNotification = state.zIndex + 1;
        newState.zIndex = state.zIndexNotification;
        // newState.zIndexUser = state.zIndex - 1;
        // newState.zIndexCall = state.zIndex - 1;
      } else if (action.area === 'user') {
        newState.zIndexUser = state.zIndex + 1;
        newState.zIndex = state.zIndexUser;
      }else if(action.area === 'call'){
        newState.zIndexCall = state.zIndex + 1;
        newState.zIndex = state.zIndexCall;
      }else if(action.area === 'sms'){
        newState.zIndexSms = state.zIndex + 1;
        newState.zIndex = state.zIndexSms
      }else if(action.area === 'bodyModal'){
        newState.zIndexBody = state.zIndex + 1;
        newState.zIndex = state.zIndexBody;
      }
      else if(action.area === 'setting'){
        newState.zIndexSetting = state.zIndex + 1;
        newState.zIndex = state.zIndexSetting;
      }
      newState.zIndex = state.zIndex + 1;
      console.log("newstate zIndex",newState)
      break;
    default:
      break; 
  }
  console.log("final new state",newState)
  return newState;
}


// export default {modalReducers, initialState};
export default modalReducer