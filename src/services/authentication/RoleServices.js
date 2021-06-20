import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json"
};

export const RoleServices = {
    fetchRoles: async (page = null, keyword = null) => {
        headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.get(
                config.fetchRolesUrl + 
                (page ? "/" + page : '') + 
                (keyword ? "?search=" + keyword : ''), 
                { headers: headers });
            console.log('Fetch roles services result in async await : ', result);
            return result.data;
        } catch (e) {
            console.log('Fetch roles service error: ', e);
            return e;
        }
    },
    createRole: async (payload) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .post(
                    config.roleUrl,
                    payload,
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Create role service result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Create role service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    },
    editRole: async (payload) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .put(
                    config.roleUrl + "/" + payload.id,
                    payload,
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Create role service result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Create role service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    },
    deleteRole: async (roleId) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .delete(
                    config.deleteRoleUrl + roleId,
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Delete roles services result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Delete roles service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    },

};