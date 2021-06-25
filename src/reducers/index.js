import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";
import GroupReducer from "./groupReducer";
import PermissionReducer from "./permissionReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    role: RoleReducer,
    group: GroupReducer,
    user: userReducer,
    permission: PermissionReducer,
});

export default rootReducer;