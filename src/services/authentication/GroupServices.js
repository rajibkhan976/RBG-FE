import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

export const GroupServices = {
    fetchGroups: async (page = null, queryParams = null) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.get(
                config.groupUrl + 'list' +
                (page ? "/" + page : '') +
                (queryParams ? "?" + queryParams : ''),
                { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error fetching the group. Please try to refresh the page or contact support");
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
    createGroup: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.post(config.groupUrl, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error creating a Group. Please try again or contact support");
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

    editGroup: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.put(
                config.groupUrl + payload.id,
                payload,
                { headers: headers }
            );
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error updating Group. Please try again or contact support");
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
    deleteGroup: async (groupId) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.delete(config.groupUrl + groupId, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error deleting Group. Please try again or contact support");
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
    }

}