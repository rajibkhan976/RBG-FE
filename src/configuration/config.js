let {
    apiUrl,
    hostUrl,
    baseUrl,
    socketUrlLocal,
    socketUrlProd,
    STAGE
} = require("./env");

module.exports = {
    apiUrl: apiUrl,
    hostUrl: hostUrl,
    baseUrl: baseUrl,
    socketUrlLocal: socketUrlLocal,
    socketUrlProd: socketUrlProd,

    //Auth - Role
    loginUrl: "https://cljnebnu2g.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/login",
    roleUrl: "https://944mqenjuc.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/role",

    //Auth - Group
    groupUrl: "https://tq5eh4daa1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/group/",

    //Auth - User
    userUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/user",
    fetchUsersUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/user/list",
    // fetchUsersUrl: "http://localhost:3001/"+process.env.REACT_APP_ENV+"/user/list",
    imageUpload: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/user/image/upload",
    deleteUserUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/user/",
    fetchGroups: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/role/groups/",
    fetchAssociations: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/user/list/associations",

    // Auth - org
    orgUrl: "https://2tm7g6mwof.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/organization",

    // Auth - Association
    associationUrl: "https://vfx68urm30.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/association",

    //Bucket
    bucketUrl : "https://wrapperbucket.s3.amazonaws.com/",

    //AutomationUrl
    automationBasicUrl: "https://402pgi0zp9.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV,
    //automationBasicUrl: "http://localhost:3005/"+process.env.REACT_APP_ENV+"",
    automationWebhookUrl: "https://prcriy2ij4.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV,
    automationAslUrl: "https://5uetvsgrhl.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV,
    // Delete Automation
    automationDeleteUrl: "https://402pgi0zp9.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/automation/delete",
    // inner left menu api service
    innerLeftMenuApiUrl: "https://4gvirnff9l.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/inner-left-menu",
    // Import Contact
    importContactUrl: 'https://04w6eb9h7e.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact',
    //importContactUrl: 'http://localhost:4000/"+process.env.REACT_APP_ENV+"/contact',
    // Contact Service API service
    getContactsUrl: "https://rn7zcog7n8.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact",
    // getContactsUrl: "http://localhost:3001/"+process.env.REACT_APP_ENV+"/contact",
    setColumnUrl: "https://g2s7gtsx35.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/order",
    getColumnUrl: "https://g2s7gtsx35.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/order",
    fetchCountryUrl: "https://nav26a5nii.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/country",
    // Product Service API
    fetchCategoryUrl: "https://r9zptnofq5.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product/categories",
    otherCategoryUrl: "https://r9zptnofq5.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product/category",
    fetchProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product/list",
    productImageUploadUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product/image",
    createProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product/create",
    editProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product",
    deleteProductUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product",
    colorSizeUrl: "https://6ek1w9gsj1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/product/colorsize",
    // Course Service API
    courseCategoryUrl: "https://nayaxr4np3.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course/categories",
    otherCourseCategoryUrl: "https://nayaxr4np3.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course/category",
    fetchCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course/list",
    courseImageUploadUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course/image",
    createCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course/create",
    editCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course",
    deleteCourseUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course",
    // Number service
    numberServiceUrl: "https://mdaifddy2k.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/number",
    // numberServiceUrl: "https://api.redbeltgym.com/number",
    //Audio template
    audioUploadUrl: "https://9b4395tv11.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/template/audio/upload",
    fetchAudiossUrl: "https://i18vj5dg2l.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/audio/list",
    audioTemplateUrl: "https://i18vj5dg2l.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/audio/",
    // audioTemplateUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/audio"
    callSetupUrl: "https://ltj70u1guh.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/communication/call",
    // callSetupUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/communication/call",
    // callWebhookUrl: "https://memz99rc6c.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/",
    callWebhookUrl: "https://api.redbeltgym.com/call/",
    ec2ApiBaseURl: "https://api.redbeltgym.com",
    // Ringtone service
    ringtoneUrl: "https://psk3w69xqd.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/number/ringtone/",
    // Billing service
    billingUrl: "https://tt7n78ndd2.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/billing/",
    // Transaction Service
    //transactionUrl: "https://tt7n78ndd2.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/transactions/",
    
    transactionUrl: "https://xuenomxey1.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/",
    // transactionUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/contact/",
    // Refund Url
    refundUrl: "https://susx9c3bvl.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/old-transactions/refund/",
    // Complete Transaction
    completeTransaction: "https://susx9c3bvl.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/upcoming-cash-transactions/complete",
    // Course Service
    courseUrl: "https://nayaxr4np3.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course/",
    // Buy Course Link
    courseBuyUrl: "https://bulitnj4tg.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/registration/course",
    //Reset Password
    resetPasswordEmailUrl: "https://61ayvg0p7g.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/user/reset-password-email",
    resetPasswordUrl: "https://61ayvg0p7g.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/user/reset-password",
    // Buy Product Link
    buyProductUrl: "https://bulitnj4tg.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/registration/product",

    //Customization
    customizationUrl: "https://smtis62b0e.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/customization/",
    //customizationUrl: "http://localhost:4000/"+process.env.REACT_APP_ENV+"/customization/",

    //Saletax
    saleTaxUrl: "https://5wb0khlhj0.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/customization/",

    //Gym Details
    gymDetailsUrl: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/gym",
    gym_Logo_upload: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/gym/image",
    gym_detail_update: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/gym/detail",
    gym_holiday: "https://tkdm8gb41d.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/gym/holidays/",
    timezoneListURL: 'https://vip.timezonedb.com/v2.1/list-time-zone?key=QH5NO9YQKP30&format=json',
    timezoneLatLngUrl: 'https://vip.timezonedb.com/v2.1/get-time-zone?key=QH5NO9YQKP30&by=position',

    //Dependents
    dependentUrl: "https://6raxjy89xi.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/dependent/",

    //numberVerifyUrl
    numberVerifyUrl: "https://04w6eb9h7e.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/contact/validate-number",

    //Notifications
    notificationUrl: "https://dll0rsopl3.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/notification",

    //Program
    programUrl: "https://fbde3pjlce.execute-api.us-east-1.amazonaws.com/"+process.env.REACT_APP_ENV+"/course"
}  
