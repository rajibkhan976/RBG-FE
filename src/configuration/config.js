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
    fetchRolesUrl: "https://944mqenjuc.execute-api.us-east-1.amazonaws.com/dev/role/list",
    deleteRoleUrl: "https://944mqenjuc.execute-api.us-east-1.amazonaws.com/dev/role/",

    //Auth - User
    userUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user",
    fetchUsersUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/list",
    imageUpload: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/image/upload",
    deleteUserUrl: "https://z13yjte40m.execute-api.us-east-1.amazonaws.com/dev/user/",

    //Bucket
    bucketUrl : "https://wrapperbucket.s3.amazonaws.com/"
}