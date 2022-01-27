import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const CustomizationServices = {
    fetchTax: async () => {
        try {
            let url = config.saleTaxUrl + "saletax";
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

    updateTax: async (payload) => {
        try {
            let url = config.saleTaxUrl + "saletax";
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating tax. Please contact support");
            }
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

    fetchCustomFields: async () => {
        try {
            let url = config.customizationUrl + "list/1";
            const result = await axios.get(url, { headers: headers });
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.message + ". Please contact support.");
            }
            
        }
    },

    addCustomField: async (payload) => {
        try {
            let url = config.customizationUrl;
            const result = await axios.post(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error on add custom field. Please contact support");
            }
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

    editCustomField: async (id, payload) => {
        try {
            let url = config.customizationUrl + id;
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error on editing custom field. Please contact support");
            }
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

    deleteCustomField: async (id) => {
        try {
            let url = config.customizationUrl + id;
            const result = await axios.delete(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error on deleting custom field. Please contact support");
            }
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