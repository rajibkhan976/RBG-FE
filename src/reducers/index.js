import { combineReducers } from "redux";
import AuthReducer from "./authReducer";

const rootReducer = combineReducers({
    authReducer: AuthReducer

});

export default rootReducer;