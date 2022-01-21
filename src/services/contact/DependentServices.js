import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const DependentServices = {
    fetchDependents: async (page = null, queryParams = null) => {
        try {
            const url = config.dependentUrl + 'list' + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching dependents. Please contact support.");
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
    createDependent: async (payload) => {
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const options = {
                headers: headers
            };
            const result = await axios.post(config.dependentUrl, payload, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while creating user. Please contact support.");
            }
        } catch (e) {
            console.log('yeah', e.response);
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if (e.response && e.response.data) {
                throw new Error(e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    searchContacts: async (payload) => {
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const options = {
                headers: headers
            };
            const result = await axios.post(config.dependentUrl + 'search', payload, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while searching contacts. Please contact support.");
            }
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if (e.response && e.response.data) {
                throw new Error(e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    archiveDependent: async (dependentId) => {
        try {
            if (isLoggedIn() === false) {
                throw new Error(message.loginFailed);
            }
            const options = {
                headers: headers
            };
            const result = await axios.delete(config.dependentUrl + dependentId, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while archiving dependent. Please contact support.");
            }
        } catch (e) {
            console.log('yeah', e.response);
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if (e.response && e.response.data) {
                throw new Error(e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
};