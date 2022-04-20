import axios from "axios";
import config from "../../configuration/config";
import {isLoggedIn} from "../authentication/AuthServices";
import {message} from "../../helpers";

let headers = {
    "Content-Type": "application/json"
};

export const ContactService = {
    fetchUsers: async (page = null, queryParams = null) => {
        try {
            const url = config.getContactsUrl + "/list" + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    fetchColumns: async () => {
        try {
            const url = config.getColumnUrl;
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
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
    saveColumns: async(payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.setColumnUrl, payload, options);
            if (result.status === 200) {
                return {
                    status: result.status,
                    message: result.data
                };
            } else {
                throw new Error(result.data.message);
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
    fetchCountry: async() => {
        try {
            const url = config.fetchCountryUrl;
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
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
    fetchContact: async (payload) => {
        try {
            let url = config.getContactsUrl + '/fetch';
            const result = await axios.post(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error while fetching contact. Please contact support");
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
    updateContact: async (payload, id) => {
        try {
            let url = config.getContactsUrl + '/update/' + id
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating contact. Please contact support");
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
    uploadProfilePic: async (payload) => {
        try {
            let url = config.getContactsUrl + '/uploadImage'
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error upload contact picture. Please contact support");
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
    verifyNumber: async (payload) => {
        try {
            let url = config.numberVerifyUrl
            const result = await axios.post(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error in verify number. Please contact support");
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
    showStatusOfImport: async (payload) => {
        try {
            let url = config.getContactsUrl + '/fetch-status-import'
            const result = await axios.post(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error in status import modal. Please contact support");
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
    fetchFilters: async () => {
        try {
            const url = config.getContactsUrl + '/fetch-filter-data';
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
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
    updateSelectedContact: async (payload, page = null, queryParams = null) => {
        try {
            const url = config.orderUrl + "/update-selected-contacts" + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.post(url, payload, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
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
    deleteSelectedContact: async (payload, page = null, queryParams = null) => {
        try {
            const url = config.orderUrl + "/delete-selected-contacts" + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.post(url, payload, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
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
