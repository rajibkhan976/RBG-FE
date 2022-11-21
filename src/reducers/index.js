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
import NotificationReducer from "./notificationReducer";
import MessageReducer from "./messageReducer";
import {reducer as toastrReducer} from 'react-redux-toastr'
import creditReducer from "./creditReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    role: RoleReducer,
    group: GroupReducer,
    automation: automationReducer,
    user: userReducer,
    permission: PermissionReducer,
    contact: ContactReducer,
    organization: OrganizationReducer,
    association: AssociationReducer,
    notification: NotificationReducer,
    message: MessageReducer,
    toastr: toastrReducer,
    credit: creditReducer,
    modal: modalReducer
});

export default rootReducer;