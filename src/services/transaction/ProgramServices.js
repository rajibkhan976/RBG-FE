import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const ProgramServices = {
    fetchPrograms: async (page = null, queryParams = null) => {
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const url = config.programUrl + '/list' + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching programs. Please contact support.");
            }
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    buyProgram: async (payload) => {
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const options = {
                headers: headers
            };
            const result = await axios.post(config.courseBuyUrl, payload, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while buying a programs. Please contact support.");
            }
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
};