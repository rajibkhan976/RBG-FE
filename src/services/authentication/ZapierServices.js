import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const ZapierServices = {
    fetchKey: async () => {
        try {
            const result = await axios.get(
                config.zapierKey + "/fetch-key",{ headers: headers });
            console.log('Fetch zapier services result in async await : ', result);
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