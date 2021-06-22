import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";
import GroupReducer from "./groupReducer";
import automationReducer from "./automationReducers";

const rootReducer = combineReducers({
    auth: AuthReducer,
    role: RoleReducer,
    group: GroupReducer,
    automation: automationReducer
});

export default rootReducer;