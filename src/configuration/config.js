let {
    apiUrl,
    hostUrl,
    baseUrl
} = require("./env");

module.exports = {
    apiUrl: apiUrl,
    hostUrl: hostUrl,
    baseUrl: baseUrl,

    //Auth - Role
    loginUrl: "https://cljnebnu2g.execute-api.us-east-1.amazonaws.com/dev/login",
    roleUrl: "https://944mqenjuc.execute-api.us-east-1.amazonaws.com/dev/role",

    //Auth - Group
    groupUrl: "https://tq5eh4daa1.execute-api.us-east-1.amazonaws.com/dev/group/",

    //Auth - User
    userUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user",
    fetchUsersUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/list",
    imageUpload: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/image/upload",
    deleteUserUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/",
    fetchGroups: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/role/groups/",

    // Auth - org
    orgUrl: "https://2tm7g6mwof.execute-api.us-east-1.amazonaws.com/dev/organization",
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
    // Contact Service API service
    getContactsUrl: "https://rn7zcog7n8.execute-api.us-east-1.amazonaws.com/dev/contact",
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
    // numberServiceUrl: "https://mdaifddy2k.execute-api.us-east-1.amazonaws.com/dev/number"
    numberServiceUrl: "http://localhost:3001/dev/number",
    //Audio template
    audioUploadUrl: "https://9b4395tv11.execute-api.us-east-1.amazonaws.com/dev/template/audio/upload",
    fetchAudiossUrl: "https://i18vj5dg2l.execute-api.us-east-1.amazonaws.com/dev/audio/list",
    audioTemplateUrl: "https://i18vj5dg2l.execute-api.us-east-1.amazonaws.com/dev/audio/"
    // audioTemplateUrl: "http://localhost:4000/dev/audio"
}  
