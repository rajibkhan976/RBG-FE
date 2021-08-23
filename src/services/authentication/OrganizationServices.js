import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "./AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const OrganizationServices = {
    create: (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
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
    update: (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            axios
                .put(
                    config.orgUrl + "/" + payload.id,
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
    delete: (id) => {
        // headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            axios
                .delete(
                    config.orgUrl + "/" + id,
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