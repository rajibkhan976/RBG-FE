import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../../services/authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json"
};

export const PermissionServices = {
    entity : async() => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            axios
                .get(
                    config.groupUrl + "entity",
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Entity: ', result.data);
                    resolve(result.data);
                })
                .catch((error) => {
                    if (error != null && error.response != null) {
                        reject(error.response.data.error);
                    } else {
                        reject(message.connectionError);
                    }
                });
        });
    }
};
