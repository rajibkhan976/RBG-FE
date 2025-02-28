import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../../services/authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

export const UserServices = {
    fetchUsers: async (page = null, queryParams = null) => {
        try {
            const url = config.fetchUsersUrl + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching users. Please contact support.");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },

    fileUpload: fileData => {
        // headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            console.log('File upload user service: ', fileData)
            axios
                .post(
                    config.imageUpload,
                    {
                        file: fileData.file,
                        name: fileData.name
                    },
                    { headers: headers }
                )
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    if(e.response && e.response.data && e.response.data.message) {
                        console.log(e.response.data.message);
                        throw new Error(e.response.data.message);
                    } else if(e.response && e.response.data && typeof e.response.data == "string") {
                        console.log(e.response.data);
                        throw new Error(e.response.data);
                    } else {
                        console.log("Error", e.response);
                        throw new Error(e.message + ". Please contact support.");
                    }
                });
        });
    },

    deleteUser: async (userId) => {
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const url = config.deleteUserUrl + userId;
            const options = {
                headers: headers
            };
            const result = await axios.delete(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while deleting user. Please contact support.");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
        // headers.Authorization = localStorage.getItem("_token");
        // return new Promise((resolve, reject) => {
        //     if (isLoggedIn() === false) {
        //         reject(message.loginFailed);
        //     }
        //     axios
        //         .delete(
        //             config.deleteUserUrl + userId,
        //             { headers: headers }
        //         )
        //         .then((result) => {
        //             console.log('Delete user services result: ', result);
        //             resolve(result.data);
        //         })
        //         .catch((error) => {
        //             console.log('Delete user service error: ', error);
        //             if (error != null) {
        //                 reject(error);
        //             }
        //         });
        // });
    },

    createUser: async (payload) => {
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const options = {
                headers: headers
            };
            const result = await axios.post(config.userUrl, payload, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while creating user. Please contact support.");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },

    editUser: async (payload) => {
        try {
            const url = config.userUrl + "/" + payload.id;
            const options = {
                headers: headers
            };
            const result = await axios.put(url, payload, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while updating the user. Please contact support.");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },

    fetchGroupsByRoleId: async (roleId) => {
        try {
            const getGroups = await axios.get(
                config.fetchGroups + roleId,
                {
                    headers: headers
                }
            );
            return getGroups.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    fetchOwners: async () => {
        try {
            const url = config.fetchUsersUrl + "/org-owners";
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching users. Please contact support.");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    fetchAssociations: async () => {
        try {
            const url = config.fetchAssociations;
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching associations. Please contact support.");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    fetchUserDetails: async (userId = null) => {
        try {
            const url = config.userUrl + '/details' + (userId ? "/" + userId : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching user details. Please contact support.");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
};