import axios from "axios";
import config from "../../configuration/config";
import { utils } from "../../helpers";
let headers = {
    "Content-Type": "application/json",
};

export const PhasesServices = {
    fetchPhases: async () => {
        try {
            const result = await axios.get(config.phaseUrl + '/list', { headers: headers });
            console.log('Phases From Service : ', result);
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
    savePhases: async(payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.post(config.phaseUrl, payload, options);
            return result.data;
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    deletePhases: async (id) => {
        try {
            const url = config.phaseUrl + "/" + id;
            const result = await axios.delete(url, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(
                    "There is an error in Deleting Phase. Please contact support"
                );
            }
        } catch (e) {
            if (!typeof e.data === "undefined") {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    }
};