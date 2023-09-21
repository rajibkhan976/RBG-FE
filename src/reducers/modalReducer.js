import * as actionTypes from "../actions/types";

const initialState = {
  zIndex: 101,
  zIndexUser: 0,
  zIndexNotification: 0,
  zIndexCall : 0,
  zIndexSms: 0,
  zIndexEmail: 0,
  zIndexBody: 0,
  zIndexSetting: 0,
  zIndexFirstEmail: 0,
}

const modalReducer = (state = initialState, action) => {
  // console.log("I am getting called when notification is clicked", state,action)
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.MODAL_COUNT_INCREMENT:
      if (action.area === 'notification') {
        newState.zIndexNotification = state.zIndex + 1;
        newState.zIndex = state.zIndexNotification;
      } else if (action.area === 'user') {
        newState.zIndexUser = state.zIndex + 1;
        newState.zIndex = state.zIndexUser;
      }else if(action.area === 'call'){
        newState.zIndexCall = state.zIndex + 1;
        newState.zIndex = state.zIndexCall;
      }else if(action.area === 'sms'){
        newState.zIndexSms = state.zIndex + 1;
        newState.zIndex = state.zIndexSms
      }else if(action.area === 'email'){
        newState.zIndexEmail = state.zIndex + 1;
        newState.zIndex = state.zIndexEmail
      }else if(action.area === 'firstEmail'){
        newState.zIndexFirstEmail = state.zIndex + 1;
        newState.zIndex = state.zIndexFirstEmail
      }
      else if(action.area === 'bodyModal'){
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
  // console.log("final new state",newState)
  return newState;
}


// export default {modalReducers, initialState};
export default modalReducer