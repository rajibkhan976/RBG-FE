module.exports = {
	appUrl: process.env.REACT_APP_APP_URL,
	//Auth - Role
	loginUrl:
		"https://" +
		process.env.REACT_APP_LOGIN +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/login",
	roleUrl:
		"https://" +
		process.env.REACT_APP_ROLE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/role",

	//Auth - Group
	groupUrl:
		"https://" +
		process.env.REACT_APP_GROUP +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/group/",

	//Auth - User
	userUrl:
		"https://" +
		process.env.REACT_APP_USER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/user",
	fetchUsersUrl:
		"https://" +
		process.env.REACT_APP_USER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/user/list",
	// fetchUsersUrl: "http://localhost:3001/"+process.env.REACT_APP_ENV+"/user/list",
	imageUpload:
		"https://" +
		process.env.REACT_APP_USER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/user/image/upload",
	deleteUserUrl:
		"https://" +
		process.env.REACT_APP_USER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/user/",
	fetchGroups:
		"https://" +
		process.env.REACT_APP_USER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/role/groups/",
	fetchAssociations:
		"https://" +
		process.env.REACT_APP_USER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/user/list/associations",

	// Auth - org
	orgUrl:
		"https://" +
		process.env.REACT_APP_ORG +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/organization",
	//orgUrl: "http://localhost:4000/dev/organization",
	// Auth - Association
	associationUrl:
		"https://" +
		process.env.REACT_APP_ASSOCIATION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/association",

	//Bucket
	bucketUrl: process.env.REACT_APP_BUCKET,

	//AutomationUrl
	automationBasicUrl:
		"https://" +
		process.env.REACT_APP_AUTOMATION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV,
	automationDeleteUrl:
		"https://" +
		process.env.REACT_APP_AUTOMATION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/automation/delete",
	//automationBasicUrl: "http://localhost:3005/"+process.env.REACT_APP_ENV+"",
	automationWebhookUrl:
		"https://" +
		process.env.REACT_APP_AUTOMATION_WEBHOOK +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV,
	automationAslUrl:
		"https://" +
		process.env.REACT_APP_AUTOMATION_ASL +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV,
	// Delete Automation
	// Automation History
	automationHistoryUrl:
		"https://" +
		process.env.REACT_APP_AUTOMATION_HISTORY +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/automation/history",
	// automationHistoryUrl: "http://localhost:4000/dev/automation/history",
	// inner left menu api service
	innerLeftMenuApiUrl:
		"https://" +
		process.env.REACT_APP_INNERLEFT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/inner-left-menu",
	// Import Contact
	importContactUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_IMPORT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact",
	//importContactUrl: 'http://localhost:4000/"+process.env.REACT_APP_ENV+"/contact',
	// Contact Service API service
	getContactsUrl:
		"https://" +
		process.env.REACT_APP_CONTACT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact",
	contactsUrlRevised:
		"https://" +
		process.env.REACT_APP_CONTACT_REVISED +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact",

	// getContactsUrl: "http://localhost:3001/"+process.env.REACT_APP_ENV+"/contact",
	setColumnUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_COLUMNS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/order",
	getColumnUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_COLUMNS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/order",
	orderUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_COLUMNS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact",
	fetchCountryUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_COUNTRY +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/country",
	// Product Category Service API
	fetchCategoryUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT_CATEGORY +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product/categories",
	otherCategoryUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT_CATEGORY +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product/category",
	// Product Service API
	fetchProductUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product/list",
	productImageUploadUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product/image",
	createProductUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product/create",
	editProductUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product",
	deleteProductUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product",
	// fetchProductUrl: "http://localhost:4000/dev/product/list",
	// productImageUploadUrl: "http://localhost:4000/dev/product/image",
	// createProductUrl: "http://localhost:4000/dev/product/create",
	// editProductUrl: "http://localhost:4000/dev/product",
	// deleteProductUrl: "http://localhost:4000/dev/product",
	colorSizeUrl:
		"https://" +
		process.env.REACT_APP_PRODUCT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/product/colorsize",
	// Course Category Service API
	courseCategoryUrl:
		"https://" +
		process.env.REACT_APP_COURSE_CATEGORY +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course/categories",
	otherCourseCategoryUrl:
		"https://" +
		process.env.REACT_APP_COURSE_CATEGORY +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course/category",
	courseUrl:
		"https://" +
		process.env.REACT_APP_COURSE_CATEGORY +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course/",
	// Course Service API
	fetchCourseUrl:
		"https://" +
		process.env.REACT_APP_COURSE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course/list",
	courseImageUploadUrl:
		"https://" +
		process.env.REACT_APP_COURSE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course/image",
	createCourseUrl:
		"https://" +
		process.env.REACT_APP_COURSE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course/create",
	editCourseUrl:
		"https://" +
		process.env.REACT_APP_COURSE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course",
	deleteCourseUrl:
		"https://" +
		process.env.REACT_APP_COURSE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course",
	programUrl:
		"https://" +
		process.env.REACT_APP_COURSE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/course",

	// fetchCourseUrl: "http://localhost:4000/dev/course/list",
	// courseImageUploadUrl: "http://localhost:4000/dev/course/image",
	// createCourseUrl: "http://localhost:4000/dev/course/create",
	// editCourseUrl: "http://localhost:4000/dev/course",
	// deleteCourseUrl: "http://localhost:4000/dev/course",
	// programUrl: "http://localhost:4000/dev/course",
	// Number service
	numberServiceUrl:
		"https://" +
		process.env.REACT_APP_NUMBER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/number",
	// numberServiceUrl: "https://" + api.redbeltgym.com/number",
	//Audio template
	audioUploadUrl:
		"https://" +
		process.env.REACT_APP_AUDIO_UPLOAD +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/template/audio/upload",
	fetchAudiossUrl:
		"https://" +
		process.env.REACT_APP_TEMPLATE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/audio/list",
	audioTemplateUrl:
		"https://" +
		process.env.REACT_APP_TEMPLATE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/audio/",
	// audioTemplateUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/audio"
	callSetupUrl:
		"https://" +
		process.env.REACT_APP_CALL +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/communication/call",
	// callSetupUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/communication/call",
	// callWebhookUrl: "https://" + memz99rc6c process.env.REACT_APP + ".execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/",
	callWebhookUrl:
		"https://" +
		process.env.REACT_APP_EC2_API_BASE_URL +
		".redbeltgym.com/call/",
	ec2ApiBaseURl:
		"https://" + process.env.REACT_APP_EC2_API_BASE_URL + ".redbeltgym.com",
	// Ringtone service
	ringtoneUrl:
		"https://" +
		process.env.REACT_APP_RINGTONE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/number/ringtone/",
	// Billing service
	billingUrl:
		"https://" +
		process.env.REACT_APP_BILLING +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/billing/",
	// Transaction Service
	//transactionUrl: "https://" + tt7n78ndd2 process.env.REACT_APP + ".execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/transactions/",

	transactionUrl:
		"https://" +
		process.env.REACT_APP_TRANSACTION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/",
	// transactionUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/contact/",
	// Refund & Complete transaction Url
	refundUrl:
		"https://" +
		process.env.REACT_APP_REFUND +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/old-transactions/refund/",
	completeTransaction:
		"https://" +
		process.env.REACT_APP_REFUND +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/upcoming-cash-transactions/complete",

	// Buy Course and product Link
	courseBuyUrl:
		"https://" +
		process.env.REACT_APP_REGISTRATION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/registration/course",
	buyProductUrl:
		"https://" +
		process.env.REACT_APP_REGISTRATION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/registration/product",
	//Reset Password
	resetPasswordEmailUrl:
		"https://" +
		process.env.REACT_APP_RESET +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/user/reset-password-email",
	resetPasswordUrl:
		"https://" +
		process.env.REACT_APP_RESET +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/user/reset-password",

	//Customization
	customizationUrl:
		"https://" +
		process.env.REACT_APP_CUSTOMIZATION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/customization/",
	//customizationUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/customization/",

	// Appointment tag
	appointmentTag:
		"https://" +
		process.env.REACT_APP_TAGS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/tag/",

	// Age Aroup
	ageGroup:
		"https://" +
		process.env.REACT_APP_AGE_GROUP +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/agegroup/",

	// Age Sizes
	productSizes:
		"https://" +
		process.env.REACT_APP_PRODUCT_SIZES +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/sizes",

	// Product Colors
	productColors:
		"https://" +
		process.env.REACT_APP_PRODUCT_COLORS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/colors",

	//Saletax
	saleTaxUrl:
		"https://" +
		process.env.REACT_APP_SALETAX +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/customization/",

	//Gym Details
	gymDetailsUrl:
		"https://" +
		process.env.REACT_APP_GYM +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/gym",
	gym_Logo_upload:
		"https://" +
		process.env.REACT_APP_GYM +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/gym/image",
	gym_detail_update:
		"https://" +
		process.env.REACT_APP_GYM +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/gym/detail",
	gym_holiday:
		"https://" +
		process.env.REACT_APP_GYM +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/gym/holidays/",

	timezoneListURL:
		"https://" +
		process.env.REACT_APP_ORG +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/organization/timezones",
	timezoneLatLngUrl:
		process.env.REACT_APP_TIMZONE_URL +
		"/v2.1/get-time-zone?key=QH5NO9YQKP30&by=position",

	//Dependents
	dependentUrl:
		"https://" +
		process.env.REACT_APP_DEPENDENT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/dependent/",

	//numberVerifyUrl
	numberVerifyUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_IMPORT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/validate-number",

	//Notifications
	notificationUrl:
		"https://" +
		process.env.REACT_APP_NOTIFICATION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/notification",

	zapierKey:
		"https://" +
		process.env.REACT_APP_ZAPIER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/zapier",

	//Payment setup url
	paymentSetupUrl:
		"https://" +
		process.env.REACT_APP_PAYMENT_SETUP +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/payment/",

	//Status & Phase URl
	phaseUrl:
		"https://" +
		process.env.REACT_APP_PHASE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/phases",
	//phaseUrl: "http://localhost:4000/dev/phases",
	statusUrl:
		"https://" +
		process.env.REACT_APP_STATUS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/status",
	//statusUrl: "http://localhost:4000/dev/status",

	//Credit management
	creditManagemetnUrl:
		"https://" +
		process.env.REACT_APP_CREDIT_MANAGEMENT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/credit/",
	creditUsageUrl:
		"https://" +
		process.env.REACT_APP_CREDIT_USAGE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/credit/",
	creditGiftPointUrl:
		"https://" +
		process.env.REACT_APP_CREDIT_GIFT_POINT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/credit/",
	documentBuilderUrl:
		"https://" +
		process.env.REACT_APP_DOCUMENT_BUILDER +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV,
	tagUrl:
		"https://" +
		process.env.REACT_APP_TAG +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/tag",
	//tagUrl: "http://localhost:4000/dev/tag",
	appointmentContactUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_APPOINTMENT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/appointment/contact",
	//appointmentContactUrl: "http://localhost:4000/dev/appointment/contact",
	appointmentUrl:
		"https://" +
		process.env.REACT_APP_APPOINTMENT +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/appointment",
	//appointmentUrl: "http://localhost:4000/dev/appointment",

	//Attendance Url
	attendaneUrl:
		"https://" +
		process.env.REACT_APP_ATTENDANCE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV,

	// Member Portal
	memberCheckInPortal:
		"https://" +
		process.env.REACT_APP_MEMBER_CHECKIN_PORTAL +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/member-portal",

	// Dont remove it
	personalDetailsUrl:
		"https://" +
		process.env.REACT_APP_PERSONALDETAILS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV,
	contactTag:
		"https://" +
		process.env.REACT_APP_CONTACT_TAG +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact",

	// SMS Template
	fetchSmsUrl:
		"https://" +
		process.env.REACT_APP_SMS_TEMPLATE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/sms/list",
	smsUploadUrl:
		"https://" +
		process.env.REACT_APP_SMS_TEMPLATE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/sms",
	smsEditUrl:
		"https://" +
		process.env.REACT_APP_SMS_TEMPLATE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/sms",
	smsDeleteUrl:
		"https://" +
		process.env.REACT_APP_SMS_TEMPLATE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/sms",

	// SMS Config
	smsConfigUrl:
		"https://" +
		process.env.REACT_APP_SMS_CONFIG +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/communication/sms",

	// SMS Tags
	fetchSMSTags:
		"https://" +
		process.env.REACT_APP_SMS_TAGS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/sms/tags",

	// Global SMS
	sendSMS:
		"https://" +
		process.env.REACT_APP_SMS_TAGS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/sms/send",
	//Dashboard -
	dashboardWidgetsUrl:
		"https://" +
		process.env.REACT_APP_DASHBOARD +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/widgets/",

	//Dashboard_goals
	dashboardWidgetGoalUrl:
		"https://" +
		process.env.REACT_APP_DASHBOARD_GOAL +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/widgets/",
	contactFetchFields:
		"https://" +
		process.env.REACT_APP_CONTACT_FETCH_FIELDS +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/field",
	// Invoice
	invoiceUrl: `https://${process.env.REACT_APP_INVOICE}.execute-api.us-east-1.amazonaws.com/${process.env.REACT_APP_ENV}/contact/transactions/downloadInvoice`,
	// invoiceUrl: "http://localhost:4000/dev/contact/transactions/downloadInvoice"
	//Dashboard widgets (drag n drop)
	dashboardWidgetsPosition:
		"https://" +
		process.env.REACT_APP_DASHBOARD_SAVE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/widgets/",

	// Global transaction history
	transactionGlobalHistotyUrl:
		"https://" +
		process.env.REACT_APP_TRANSACTION +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/transactions/list/",
	// global Email
	emailSetupUrl:
		"https://" +
		process.env.REACT_APP_EMAIL_SETUP +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/communication/email/",
	emailTemplateUrl:
		"https://" +
		process.env.REACT_APP_EMAIL_TEMPLATE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/email/",
	globalEmailSend:
		"https://" +
		process.env.REACT_APP_EMAIL_GLOBAL +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/email/send",

	//Note on contact modal
	noteContactModalUrl:
		"https://" +
		process.env.REACT_APP_CONTACT_MODAL_NOTE +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/notes",
	//communication log
	communicationListUrl:
		"https://" +
		process.env.REACT_APP_COMMUNICATION_LOG +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/communication/log",
	//communicationListUrl: " http://localhost:4000/dev/communication/log",
	//inboxListUrl: " http://localhost:4000/dev/communication/contact/log",
	inboxListUrl:
		"https://" +
		process.env.REACT_APP_COMMUNICATION_LOG +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/communication/contact/log",
	// Notification Group
	notificationGroup:
		"https://" +
		process.env.REACT_APP_NOTIFICATION_GROUP +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/notification-group/",
	bulkContact:
		"https://" +
		process.env.REACT_APP_BULK +
		".execute-api.us-east-1.amazonaws.com/" +
		process.env.REACT_APP_ENV +
		"/contact/bulkservice",
	//notificationGroup: "http://localhost:4000/dev/notification-group/"
};
