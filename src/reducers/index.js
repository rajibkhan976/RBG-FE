import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";
import GroupReducer from "./groupReducer";
import automationReducer from "./automationReducers";
import PermissionReducer from "./permissionReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    role: RoleReducer,
    group: GroupReducer,
    automation: automationReducer,
    user: userReducer,
    permission: PermissionReducer,
});

export default rootReducer;