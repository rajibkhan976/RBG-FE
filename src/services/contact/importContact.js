import axios from "axios";
import config from "../../configuration/config";

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
    }

};