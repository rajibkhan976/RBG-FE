import axios from "axios";
import config, { countryUrl } from "../../configuration/config";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
};

export const PersonalDetailsServices = {
    fetchCountryDetail: async () => {
        try {
            const url = config.countryUrl;
            const result = await axios.get(url, { headers: headers });
            console.log('Personal Detail Country Services : ', result);
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
};