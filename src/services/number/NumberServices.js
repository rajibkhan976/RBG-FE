import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

export const NumberServices = {
    list: async (page = null, queryParams = null) => {
        try {
            const options = {
                headers: headers
            };
            const url = config.numberServiceUrl + "/list" + (page ? "/" + page : '') +     
            (queryParams ? "?" + queryParams : '');
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching phone numbers. Please contact support.");
            }
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if (e.response && typeof e.response.data == "string") {
                throw new Error("Error: " + e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    search: async (payload) => {
        try {
            const options = {
                headers: headers
            };
            const url = config.ec2ApiBaseURl + "/number/search";
            const result = await axios.post(url, payload, options);
            if (result.status === 200) {
                return result.data.body;
            } else {
                throw new Error("There is an issue while searching phone numbers. Please contact support.");
            }
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if (e.response && typeof e.response.data == "string") {
                throw new Error("Error: " + e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    purchase: async (payload) => {
        try {
            const options = {
                headers: headers
            };
            const url = config.ec2ApiBaseURl + "/number/purchase";
            const result = await axios.post(url, payload, options);
            if (result.status === 200) {
                return result.data.body;
            } else {
                throw new Error("There is an issue while purchasing phone numbers. Please contact support.");
            }
        } catch (e) {
            console.log("Exception: ", e.response);
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if (e.response && typeof e.response.data == "string") {
                throw new Error("Error: " + e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    release: async (id) => {
        try {
            const options = {
                headers: headers
            };
            const url = config.ec2ApiBaseURl + "/number/release/" + id;
            const result = await axios.delete(url, options);
            if (result.status === 200) {
                return result.data.body;
            } else {
                throw new Error("There is an issue while purchasing phone numbers. Please contact support.");
            }
        } catch (e) {
            console.log("Exception: ", e.response);
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if (e.response && typeof e.response.data == "string") {
                throw new Error("Error: " + e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
};