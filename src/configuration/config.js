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
    automationDeleteUrl: "https://402pgi0zp9.execute-api.us-east-1.amazonaws.com/dev/automation/delete"
}