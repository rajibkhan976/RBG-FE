import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const CustomizationServices = {
    fetchTax: async () => {
        try {
            let url = config.customizationUrl + "saletax";
            const result = await axios.get(url, { headers: headers });
            console.log('Customization Service : ', result);
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
}