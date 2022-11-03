import axios from "axios";
import config from "../../configuration/config";
import {utils} from "../../helpers";

let headers = {
    "Content-Type": "application/json",
};

export const EmailServices = {
    fetchSetupEmail: async (payload) => {
        try {
            const url = config.emailSetupUrl + "setup";
            const result = await axios.get(url,
                payload,
                {headers: headers});
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
    setupEmailUpdate: async (payload) => {
        try {
            const url = config.emailSetupUrl + "setup";
            const result = await axios.put(url, payload, {headers: headers});
            if (result.status === 200) {
                return result.data;

            } else {
                throw new Error("There is an error updating form. Please contact support");
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
    setupEmailConfig: async (payload) => {
        try {
            const url = config.emailSetupUrl + "test";
            const result = await axios.post(url, payload, {headers: headers});
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(" Please contact support");
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
    fetchEmailTemplateList: async (page = null, queryParams = null) => {
        try {
            const url = config.emailTemplateUrl + "list";
            const result = await axios.get(url +
                (page ? "/" + page : '') +
                (queryParams ? "?" + decodeURI(queryParams) : ''),
                {headers: headers});
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

    emailTemplateCreate: async (payload) => {
        try {
            const url = config.emailTemplateUrl + "create";
            const result = await axios.post(url, payload, {headers: headers});

            if (result.status === 200 || result.status === 201) {
                return result.data;
            } else {
                throw new Error(" Please contact suport");
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
    emailTemplateDelete: async (deletedId) => {
        try {
            const url = config.emailTemplateUrl + "delete/" + deletedId;
            const result = await axios.delete(url, {headers: headers});
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error Deleting. Please contact support");
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
    templateEmailUpdate: async (payload, tempId) => {
        try {
            const url = config.emailTemplateUrl + "update/" + tempId;
            const result = await axios.put(url, payload, {headers: headers});
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating form. Please contact support");
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

    emailGlobalSend: async (payload) => {
        try {
            const url = config.globalEmailSend;
            const result = await axios.post(url, payload, {headers: headers});
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(" Please contact support");
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

};
