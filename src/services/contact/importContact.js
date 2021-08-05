import axios from "axios";
import config from "../../configuration/config";

export const ImportContactServices = {
    uploadFile: async (payload) => {
        let configAxios = {
            method: 'post',
            url: config.importContactUrl + '/upload-csv',
            headers: {
                'Authorization': localStorage.getItem("_token"),
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
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "text/plain"
            },
            data : payload
        };

        return await axios(configAxios);
    }

};