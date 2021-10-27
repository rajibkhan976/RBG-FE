import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const CallSetupService = {
    fetchNumber: async () => {
        try {
            const result = await axios.get(config.callSetupUrl + "call-webhook", { headers: headers });
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
    getCapabilityToken: async (payload) => {
        try {
            const result = await axios.post(config.callSetupUrl + "getCapabilityToken" , payload, { headers: headers });
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