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
import { reducer as toastrReducer } from "react-redux-toastr";
import creditReducer from "./creditReducer";
import modalReducer from "./modalReducer";
import FilterReducer from "./FilterReducer";
import tagReducer from "./tagReducer";
import EmailSubjectReducer from "./EmailSubjectReducer";
import EmailTemplateReducer from "./EmailTemplateReducer";
import documentBuilderReducer from "./documentBuilderReducer";

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
	documentBuilder: documentBuilderReducer,
	modal: modalReducer,
	filter: FilterReducer,
	tag: tagReducer,
	subject: EmailSubjectReducer,
	emailTemplate: EmailTemplateReducer,
});

export default rootReducer;
