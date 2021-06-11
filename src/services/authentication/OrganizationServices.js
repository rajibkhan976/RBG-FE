import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "./AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',   
};

export const UserServices = {
    create: async (payload) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            axios
                .post(
                    config.userUrl,
                    payload,
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Create organization service result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Create organization service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    },
};