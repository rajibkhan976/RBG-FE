import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json"
};

export const RoleServices = {
    fetchRoles: async (page = null, keyword = null) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    config.fetchRolesUrl + (page ? "/" + page : '') + (keyword ? "?search=" + keyword : ''),
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Fetch roles services result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Fetch roles service error: ', error);
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
    }
};