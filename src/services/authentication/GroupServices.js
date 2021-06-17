import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',   
};

export const GroupServices = {
    fetchGroups: async (page = null, queryParams = null) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    config.groupUrl + 'list' + 
                    (page ? "/" + page : '') + 
                    (queryParams ? "?" + queryParams : ''),
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Fetch groups services result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Fetch groups service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    },
    createGroup: async (payload) => {
        headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.post(config.groupUrl, payload, { headers: headers });
            console.log('Create group service : ', result);
            return result.data;
        } catch (e) {
            console.log('Create group service error: ', e);
            return e;
        }

    }

}