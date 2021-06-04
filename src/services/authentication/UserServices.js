import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../../services/authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',   
};

export const UserServices = {
    fetchUsers: async (page = null, keyword = null) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    config.fetchUsersUrl + (page ? "/" + page : '') + (keyword ? "?search=" + keyword : ''),
                    { headers: headers }
                )
                .then((result) => {
                    //console.log('Fetch users services result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Fetch users service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    },
    fileUpload: fileData => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            console.log('File upload user service: ', fileData)
            axios
                .put(
                    config.imageUpload,
                    {
                        file : fileData.file
                    },
                    { headers: headers }
                )
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    if (error != null && error.response != null) {
                        reject(error.response.data.error);
                    } else {
                        reject(message.connectionError);
                    }
                });
        });
    },
    deleteUser: async (userId) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            axios
                .delete(
                    config.deleteUserUrl + userId,
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Delete user services result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Delete user service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    }
};