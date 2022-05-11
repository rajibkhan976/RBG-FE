import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "./AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const OrganizationServices = {
    fetchOrganizations: async (page = null, queryParams = null) => {
        try {
            const result = await axios.get(
                config.orgUrl +"/list" + 
                (page ? "/" + page : '') +     
                (queryParams ? "?" + queryParams : ''), 
                { headers: headers });
            console.log('Fetch organizations services result in async await : ', result);
            return result.data;
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
    organizationToggleStatus: async (id) => {
        try {
            const result = await axios.put(config.orgUrl + "/status-toggle/" + id, { headers: headers });
            return result.data;
        } catch (e) {
            if (typeof e.response == 'object' && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
};