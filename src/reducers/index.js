import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    role: RoleReducer
});

export default rootReducer;