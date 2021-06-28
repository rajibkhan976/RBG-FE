import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',   
};

export const GroupServices = {
    fetchGroups: async (page = null, queryParams = null) => {
        headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.get(
                config.groupUrl + 'list' + 
                (page ? "/" + page : '') + 
                (queryParams ? "?" + queryParams : ''),
                { headers: headers });
            console.log("fetchGroups() Service result", result);
            return result.data;
        } catch (e) {
            console.log("fetchGroups() service error result", e);
            throw new Error(e);
        }
    },
    createGroup: async (payload) => {
        headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.post(config.groupUrl, payload, { headers: headers });
            // console.log('Create group service : ', result);
            return result.data;
        } catch (e) {
            // console.log('Create group service error: ', e);
            return e;
        }
    },
    editGroup: async (payload) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .put(
                    config.groupUrl + payload.id,
                    payload,
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Create group service result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Create group service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    },
    deleteGroup: async (groupId) => {
        headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.delete(config.groupUrl + groupId, { headers: headers });
            console.log('Delete group service : ', result);
            return result.data;
        } catch (e) {
            console.log('Delete Group Service Catch Block : ', e);
            throw new Error(e);
        }
    }

}