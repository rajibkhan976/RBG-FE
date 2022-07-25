import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const SmsSetupService = {
    fetchSmsList: async (page = null, queryParams = null) => {
        try {
            const result = await axios.get(config.smsConfigUrl + '/list' + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : ''), { headers: headers });
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    saveSmsConfig: async (payload) => {
        try {
            const result = await axios.post(config.smsConfigUrl, payload,{ headers: headers });
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    updateSmsConfig: async (payload, smsEditId) => {
        try {
            const result = await axios.put(config.smsConfigUrl + "/" + smsEditId, payload,{ headers: headers });
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    deleteSmsConfig: async (id) => {
        try {
            const result = await axios.delete(config.smsConfigUrl + "/" + id, { headers: headers });
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    smsConfigToggleStatus: async (id) => {
        try {
            const result = await axios.put(config.smsConfigUrl + "/status-toggle/" + id, { headers: headers });
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