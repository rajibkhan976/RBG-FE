import * as actionType from "../actions/types";
const initialState = {
    loading: true,
    data: [],
    error: '',
    saveEmailTemplate: null
}

const EmailTemplateReducer = (state = initialState, action)=>{
    switch(action.type){
        // case actionType.FETCH_TEMPLATE_REQUEST :
        //     return {
        //         ...state,
        //         loading: true
        //     }
        case actionType.FETCH_TEMPLATE_SUCCESS :
            return {
                ...state,
                loading: true,
                data: action.payload
            }
        case actionType.FETCH_TEMPLATE_FAILURE :
            return {
                loading : false,
                data: [],
                error: action.payload,
            }
        case actionType.SAVE_EMAIL_TEMPLATE :
            return {
                loading: false,
                saveEmailTemplate: action.payload,
            }
        default :
            return state
    }
}

export default EmailTemplateReducer