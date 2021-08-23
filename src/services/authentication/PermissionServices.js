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
            throw new Error(e.message);
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
            throw new Error(e.message);
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
            throw new Error(e.message);
        }
    }
};
