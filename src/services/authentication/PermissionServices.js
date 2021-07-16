import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../../services/authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("_token")
};

export const PermissionServices = {
    entity : async() => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const url = config.groupUrl + "entity";
            const result = await axios.get(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error getting an entity");
            }
        } catch (e) {
            throw new Error(e.message);
        }
        // return new Promise((resolve, reject) => {
        //     if (isLoggedIn() === false) {
        //         reject(message.loginFailed);
        //     }
        //     axios
        //         .get(
        //             config.groupUrl + "entity",
        //             { headers: headers }
        //         )
        //         .then((result) => {
        //             //console.log('Entity: ', result.data);
        //             resolve(result.data);
        //         })
        //         .catch((error) => {
        //             if (error != null && error.response != null) {
        //                 reject(error.response.data.error);
        //             } else {
        //                 reject(message.connectionError);
        //             }
        //         });
        // });
    },

    action : async() => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const url = config.groupUrl + "action";
            const result = await axios.get(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error getting an action");
            }
        } catch (e) {
            throw new Error(e.message);
        }
        // return new Promise((resolve, reject) => {
        //     if (isLoggedIn() === false) {
        //         reject(message.loginFailed);
        //     }
        //     axios
        //         .get(
        //             config.groupUrl + "action",
        //             { headers: headers }
        //         )
        //         .then((result) => {
        //             //console.log('action: ', result.data);
        //             resolve(result.data);
        //         })
        //         .catch((error) => {
        //             if (error != null && error.response != null) {
        //                 reject(error.response.data.error);
        //             } else {
        //                 reject(message.connectionError);
        //             }
        //         });
        // });
    },

    actionType : async() => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const url = config.groupUrl + "actionType";
            const result = await axios.get(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error getting an action type");
            }
        } catch (e) {
            throw new Error(e.message);
        }
        // return new Promise((resolve, reject) => {
        //     if (isLoggedIn() === false) {
        //         reject(message.loginFailed);
        //     }
        //     axios
        //         .get(
        //             config.groupUrl + "actionType",
        //             { headers: headers }
        //         )
        //         .then((result) => {
        //             //console.log('action: ', result.data);
        //             resolve(result.data);
        //         })
        //         .catch((error) => {
        //             if (error != null && error.response != null) {
        //                 reject(error.response.data.error);
        //             } else {
        //                 reject(message.connectionError);
        //             }
        //         });
        // });
    }
};
