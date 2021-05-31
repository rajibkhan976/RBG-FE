let {
    apiUrl,
    hostUrl,
    baseUrl,
    jwtSecrete
} = require("./env");

module.exports = {
    apiUrl: apiUrl,
    hostUrl: hostUrl,
    baseUrl: baseUrl,

    //Auth
    loginUrl: "https://cljnebnu2g.execute-api.us-east-1.amazonaws.com/dev/login",
    //loginUrl: "https://jsonplaceholder.typicode.com/users",
    jwtSecrete : jwtSecrete,
    fetchRolesUrl: "https://cpl2p29j5c.execute-api.us-east-1.amazonaws.com/dev/role/list",
    deleteRoleUrl: "https://cpl2p29j5c.execute-api.us-east-1.amazonaws.com/dev/role/"
}