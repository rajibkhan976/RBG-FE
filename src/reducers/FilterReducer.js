import * as actionTypes from "../actions/types";
const initialState={
    loading:true,
    data:[],
    error:'',
    saveFilter: null,
    statusPhaseListed : null,
    statusDelete: null,
}

const FilterReducer = (state = initialState, action)=>{
    switch(action.type){
        
        case actionTypes.FETCH_FILTER_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload,
                error:''
            }
        case actionTypes.FETCH_FILTER_FAILURE:
            return{
                ...state,
                loading:false,
                data:[],
                error:action.payload,
                statusPhaseListed: ""
            }
        case actionTypes.SAVE_FILTER_LIST :
            return {
                ...state,
                loading : false,
                saveFilter : action.payload,
                statusPhaseListed: "",
                error: '',
            }
        case actionTypes.FETCH_FILTER_LIST :
            return {
                ...state,
                loading : false,
                statusPhaseListed : action.payload,
                error: ''
            }
        case actionTypes.DELETE_STATUS_LIST :
            return {
                ...state,
                loading:false,
                statusDelete: action.payload,
                error: '',
            }
        default: 
            return state;            
    }
    // return state
}


export default FilterReducer;