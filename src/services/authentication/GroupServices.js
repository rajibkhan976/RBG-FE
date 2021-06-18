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
}