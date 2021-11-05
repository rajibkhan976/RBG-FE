import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json"
};

export const ContactService = {
    fetchUsers: async (page = null, queryParams = null) => {
        try {
            const url = config.getContactsUrl + "/list" + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                console.log(result)
            }
        } catch (e) {
            // console.log("Service Message", e.response.data.message)
            throw new Error(e.response.data.message);
        }
    },
    fetchColumns: async () => {
        try {
            const url = config.getColumnUrl;
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
            }
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    saveColumns: async(payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.setColumnUrl, payload, options);
            if (result.status === 200) {
                return {
                    status: result.status,
                    message: result.data
                };
            } else {
                throw new Error(result.data.message);
            }
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    fetchCountry: async() => {
        try {
            const url = config.fetchCountryUrl;
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
            }
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    fetchContact: (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.getContactsUrl + '/fetch',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };
            return axios(configAxios);
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    }
};