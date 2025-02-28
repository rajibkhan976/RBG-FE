import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const RoleServices = {
    fetchRoles: async (page = null, queryParams = null) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.get(
                config.roleUrl +"/list" + 
                (page ? "/" + page : '') +     
                (queryParams ? "?" + queryParams : ''), 
                { headers: headers });
            console.log('Fetch roles services result in async await : ', result);
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
    },
    createRole: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.post(config.roleUrl, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error creating Role. Please contact support");
            }
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
    },

    editRole: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const url = config.roleUrl + "/" + payload.id;
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating Role. Please contact support");
            }
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
    },

    deleteRole: async (roleId) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const url = config.roleUrl + "/" + roleId;
            const result = await axios.delete(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error deleting a Role. Please contact support");
            }
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
    },

};