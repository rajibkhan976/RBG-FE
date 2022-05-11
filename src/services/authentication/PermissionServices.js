import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../../services/authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json"
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
    }
};
