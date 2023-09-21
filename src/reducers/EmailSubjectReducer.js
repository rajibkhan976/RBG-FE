import * as actionType from "../actions/types";
const initialState = {
    loading: false,
    data: null,
    error: "",
    deleteSubject: null,
    saveSubject: null,
    customerList: null,
}

const EmailSubjectReducer = (state = initialState, action)=>{
    // console.log("Email reducer", state, action);
    switch (action.type){
        // case actionType.FETCH_SUBJECT_REQUEST :
        //     return {
        //         ...state,
        //         loading: true,
        //     }
        case actionType.FETCH_SUBJECT_SUCCESS :
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: '',
            }
        case actionType.FETCH_FILTER_FAILURE :
            return{
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        case actionType.SAVE_SUBJECT :
            return {
                ...state,
                loading: false,
                error: "",
                saveSubject: action.payload
            }
        case actionType.DELETE_SUBJECT :
            return{
                ...state,
                loading: false,
                error: "",
                deleteSubject: action.payload
            }
        case actionType.FETCH_CUSTOMER_LIST :
            return{
                ...state,
                loading: false,
                error : "",
                customerList: action.payload,
            }
        default: 
            return state
    }
}
export default EmailSubjectReducer