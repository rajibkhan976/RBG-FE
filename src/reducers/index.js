import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import RoleReducer from "./roleReducer";
import GroupReducer from "./groupReducer";
import automationReducer from "./automationReducers";
import PermissionReducer from "./permissionReducer";
import userReducer from "./userReducer";
import ContactReducer from "./contactReducers";
import OrganizationReducer from "./organizationReducer";
import AssociationReducer from "./associationReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    role: RoleReducer,
    group: GroupReducer,
    automation: automationReducer,
    user: userReducer,
    permission: PermissionReducer,
    contact: ContactReducer,
    organization: OrganizationReducer,
    association: AssociationReducer
});

export default rootReducer;