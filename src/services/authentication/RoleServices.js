import axios from "axios";
import config from "../../configuration/config";
import { useDispatch, useSelector } from "react-redux";

let headers = {
    "Content-Type": "application/json"
};

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     config.headers.authorization = localStorage.getItem("_token");
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

export const RoleServices = {
    fetchRoles: async (page = null) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    config.fetchRolesUrl + (page ? "/"+page : ''),
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
    searchRoles: async (keyword = null) => {
        headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            axios
                .get(
                    config.fetchRolesUrl + (keyword ? "?search="+keyword : ''),
                    { headers: headers }
                )
                .then((result) => {
                    console.log('Search roles services result: ', result);
                    resolve(result.data);
                })
                .catch((error) => {
                    console.log('Search roles service error: ', error);
                    if (error != null) {
                        reject(error);
                    }
                });
        });
    }
};