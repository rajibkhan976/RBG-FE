let {
    apiUrl,
    hostUrl,
    baseUrl,
    socketUrlLocal,
    socketUrlProd
} = require("./env");

module.exports = {
    apiUrl: apiUrl,
    hostUrl: hostUrl,
    baseUrl: baseUrl,
    socketUrlLocal: socketUrlLocal,
    socketUrlProd: socketUrlProd,

    //Auth - Role
    loginUrl: "https://cljnebnu2g.execute-api.us-east-1.amazonaws.com/dev/login",
    roleUrl: "https://944mqenjuc.execute-api.us-east-1.amazonaws.com/dev/role",

    //Auth - Group
    groupUrl: "https://tq5eh4daa1.execute-api.us-east-1.amazonaws.com/dev/group/",

    //Auth - User
    userUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user",
    fetchUsersUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/list",
    // fetchUsersUrl: "http://localhost:3001/dev/user/list",
    imageUpload: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/image/upload",
    deleteUserUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/",
    fetchGroups: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/role/groups/",
    fetchAssociations: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/list/associations",

    // Auth - org
    orgUrl: "https://2tm7g6mwof.execute-api.us-east-1.amazonaws.com/dev/organization",

    // Auth - Association
    associationUrl: "https://vfx68urm30.execute-api.us-east-1.amazonaws.com/dev/association",

    //Bucket
    bucketUrl : "https://wrapperbucket.s3.amazonaws.com/",

    //AutomationUrl
    automationBasicUrl: "https://402pgi0zp9.execute-api.us-east-1.amazonaws.com/dev",
    //automationBasicUrl: "http://localhost:3005/dev",
    automationWebhookUrl: "https://prcriy2ij4.execute-api.us-east-1.amazonaws.com/dev",
    automationAslUrl: "https://5uetvsgrhl.execute-api.us-east-1.amazonaws.com/dev",
    // Delete Automation
    automationDeleteUrl: "https://402pgi0zp9.execute-api.us-east-1.amazonaws.com/dev/automation/delete",
    // inner left menu api service
    innerLeftMenuApiUrl: "https://4gvirnff9l.execute-api.us-east-1.amazonaws.com/dev/inner-left-menu",
    // Import Contact
    importContactUrl: 'https://04w6eb9h7e.execute-api.us-east-1.amazonaws.com/dev/contact',
    //importContactUrl: 'http://localhost:3006/dev/contact',
    // Contact Service API service
    getContactsUrl: "https://rn7zcog7n8.execute-api.us-east-1.amazonaws.com/dev/contact",
    // getContactsUrl: "http://localhost:3001/dev/contact",
    setColumnUrl: "https://g2s7gtsx35.execute-api.us-east-1.amazonaws.com/dev/contact/order",
    getColumnUrl: "https://g2s7gtsx35.execute-api.us-east-1.amazonaws.com/dev/contact/order",
    fetchCountryUrl: "https://nav26a5nii.execute-api.us-east-1.amazonaws.com/dev/country",
    // Product Service API
    fetchCategoryUrl: "https://r9zptnofq5.execute-api.us-east-1.amazonaws.com/dev/product/categories",
    otherCategoryUrl: "https://r9zptnofq5.execute-api.us-east-1.amazonaws.com/dev/product/category",
    fetchProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/dev/product/list",
    productImageUploadUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/dev/product/image",
    createProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/dev/product/create",
    editProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/dev/product",
    deleteProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/dev/product",
    colorSizeUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/dev/product/colorsize",
    // Course Service API
    courseCategoryUrl: "https://nayaxr4np3.execute-api.us-east-1.amazonaws.com/dev/course/categories",
    otherCourseCategoryUrl: "https://nayaxr4np3.execute-api.us-east-1.amazonaws.com/dev/course/category",
    fetchCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/dev/course/list",
    courseImageUploadUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/dev/course/image",
    createCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/dev/course/create",
    editCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/dev/course",
    deleteCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/dev/course",
    // Number service
    numberServiceUrl: "https://mdaifddy2k.execute-api.us-east-1.amazonaws.com/dev/number",
    // numberServiceUrl: "https://api.redbeltgym.com/number",
    //Audio template
    audioUploadUrl: "https://9b4395tv11.execute-api.us-east-1.amazonaws.com/dev/template/audio/upload",
    fetchAudiossUrl: "https://i18vj5dg2l.execute-api.us-east-1.amazonaws.com/dev/audio/list",
    audioTemplateUrl: "https://i18vj5dg2l.execute-api.us-east-1.amazonaws.com/dev/audio/",
    // audioTemplateUrl: "http://localhost:4000/dev/audio"
    callSetupUrl: "https://ltj70u1guh.execute-api.us-east-1.amazonaws.com/dev/communication/call",
    // callSetupUrl: "http://localhost:3001/dev/communication/call",
    // callWebhookUrl: "https://memz99rc6c.execute-api.us-east-1.amazonaws.com/dev/",
    callWebhookUrl: "https://api.redbeltgym.com/call/",
    ec2ApiBaseURl: "https://api.redbeltgym.com",
    // Ringtone service
    ringtoneUrl: "https://psk3w69xqd.execute-api.us-east-1.amazonaws.com/dev/number/ringtone/",
    // Billing service
    billingUrl: "https://tt7n78ndd2.execute-api.us-east-1.amazonaws.com/dev/contact/billing/",
    // Transaction Service
    transactionUrl: "https://tt7n78ndd2.execute-api.us-east-1.amazonaws.com/dev/contact/transactions/",
    // Course Service
    courseUrl: "https://nayaxr4np3.execute-api.us-east-1.amazonaws.com/dev/course/",
    // Buy Course Link
    courseBuyUrl: "https://bulitnj4tg.execute-api.us-east-1.amazonaws.com/dev/contact/registration/course",
    //Reset Password
    resetPasswordEmailUrl: "https://61ayvg0p7g.execute-api.us-east-1.amazonaws.com/dev/user/reset-password-email",
    resetPasswordUrl: "https://61ayvg0p7g.execute-api.us-east-1.amazonaws.com/dev/user/reset-password",
    // Buy Product Link
    buyProductUrl: "https://bulitnj4tg.execute-api.us-east-1.amazonaws.com/dev/contact/registration/product",

    //Customization
    customizationUrl: "https://smtis62b0e.execute-api.us-east-1.amazonaws.com/dev/customization/",

    //Saletax
    saleTaxUrl: "https://5wb0khlhj0.execute-api.us-east-1.amazonaws.com/dev/customization/",

    //Gym Details
    gymDetailsUrl: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/dev/gym",
    gym_Logo_upload: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/dev/gym/image",
    gym_detail_update: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/dev/gym/detail",
    gym_holiday: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/dev/gym/holidays/",
    timezoneListURL: 'https://vip.timezonedb.com/v2.1/list-time-zone?key=QH5NO9YQKP30&format=json',
    timezoneLatLngUrl: 'https://vip.timezonedb.com/v2.1/get-time-zone?key=QH5NO9YQKP30&by=position',

    //Dependents
    dependentUrl: "https://6raxjy89xi.execute-api.us-east-1.amazonaws.com/dev/contact/dependent/",

    //numberVerifyUrl
    numberVerifyUrl: "https://04w6eb9h7e.execute-api.us-east-1.amazonaws.com/dev/contact/validate-number"
}  
