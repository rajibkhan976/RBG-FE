import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const CallSetupService = {
    fetchNumber: async (queryParams) => {
        try {
            const result = await axios.get(config.callSetupUrl + (queryParams ? "?" + queryParams : ''), { headers: headers });
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
    saveCallConfig: async (payload) => {
        try {
            const result = await axios.post(config.callSetupUrl, payload,{ headers: headers });
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
    updateCallConfig: async (payload) => {
        try {
            const result = await axios.put(config.callSetupUrl + "/" + payload.id, payload,{ headers: headers });
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
    checkCallConfigOverlap: async (payload) => {
        try {
            const result = await axios.post(config.callSetupUrl + "/check-overlap", payload,{ headers: headers });
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
    deleteCallConfig: async (id) => {
        try {
            const result = await axios.delete(config.callSetupUrl + "/" + id, { headers: headers });
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
    callConfigToggleStatus: async (id) => {
        try {
            const result = await axios.put(config.callSetupUrl + "/status-toggle/" + id, { headers: headers });
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
    getCapabilityToken: async (payload) => {
        try {
            const result = await axios.get(config.callWebhookUrl + "token", { headers: headers });
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
    }
};