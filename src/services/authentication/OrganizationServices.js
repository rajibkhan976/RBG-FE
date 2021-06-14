import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "./AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',   
    'Authorization': localStorage.getItem("_token")
};

export const OrganizationServices = {
    create: async (payload) => {
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            axios
                .post(
                    config.orgUrl,
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