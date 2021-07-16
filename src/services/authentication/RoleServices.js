import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("_token")
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
            console.log('Fetch roles service error: ', e);
            return e;
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
            throw new Error(e.message);
        }
        // return new Promise((resolve, reject) => {
        //     axios
        //         .post(
        //             config.roleUrl,
        //             payload,
        //             { headers: headers }
        //         )
        //         .then((result) => {
        //             console.log('Create role service result: ', result);
        //             resolve(result.data);
        //         })
        //         .catch((error) => {
        //             console.log('Create role service error: ', error);
        //             if (error != null) {
        //                 reject(error);
        //             }
        //         });
        // });
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
            throw new Error(e.message);
        }
        // return new Promise((resolve, reject) => {
        //     axios
        //         .put(
        //             config.roleUrl + "/" + payload.id,
        //             payload,
        //             { headers: headers }
        //         )
        //         .then((result) => {
        //             console.log('Create role service result: ', result);
        //             resolve(result.data);
        //         })
        //         .catch((error) => {
        //             console.log('Create role service error: ', error);
        //             if (error != null) {
        //                 reject(error);
        //             }
        //         });
        // });
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
            throw new Error(e.message);
        }
        // return new Promise((resolve, reject) => {
        //     axios
        //         .delete(
        //             config.roleUrl + "/" + roleId,
        //             { headers: headers }
        //         )
        //         .then((result) => {
        //             console.log('Delete roles services result: ', result);
        //             resolve(result.data);
        //         })
        //         .catch((error) => {
        //             console.log('Delete roles service error: ', error);
        //             if (error != null) {
        //                 reject(error);
        //             }
        //         });
        // });
    },

};