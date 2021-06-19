import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";
import GroupReducer from "./groupReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    role: RoleReducer,
    group: GroupReducer
});

export default rootReducer;