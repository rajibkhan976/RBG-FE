import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../../services/authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json"
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
            axios
                .post(
                    config.imageUpload,
                    {
                        currentFile: fileData.currentFile,
                        updatedFile: fileData.updatedFile,
                        type: fileData.type
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
    }
};