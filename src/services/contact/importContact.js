import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const ImportContactServices = {
    uploadFile: async (payload) => {
        let configAxios = {
            method: 'post',
            url: config.importContactUrl + '/upload-csv',
            headers: {
                "Content-Type": "text/plain"
            },
            data : payload
        };

        return await axios(configAxios);
    },
    importContact: async (payload) => {
        let configAxios = {
            method: 'post',
            url: config.importContactUrl + '/import-csv',
            headers: {
                "Content-Type": "text/plain"
            },
            data : payload
        };

        return await axios(configAxios);
    },
    saveContact: async (payload) => {
        let configAxios = {
            method: 'post',
            url: config.importContactUrl + '/save-indivitual',
            headers: {
                "Content-Type": "text/plain"
            },
            data : payload
        };

        return await axios(configAxios);
    },
    fetchCustomFields: async () => {
        try {
            const url = config.customizationUrl + "list-all-active";
            const result = await axios.get(url, { headers: headers });
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
    }
};