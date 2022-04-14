import axios from "axios";
import config from "../../configuration/config";
import {utils} from "../../helpers";

let headers = {
    "Content-Type": "application/json",
};

export const StatusServices = {
    fetchStatus: async (id) => {
        try {
            const result = await axios.get(config.statusUrl + '/list/' + id, {headers: headers});
            console.log('Status From Service : ', result);
            return result.data;
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
    saveStatus: async (payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.post(config.statusUrl, payload, options);
            return result.data;
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    deleteStatus: async (id) => {
        try {
            const url = config.statusUrl + "/" + id;
            const result = await axios.delete(url, {headers: headers});
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(
                    "There is an error in Deleting Status. Please contact support"
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