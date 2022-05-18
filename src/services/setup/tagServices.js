import axios from "axios";
import config from "../../configuration/config";
let headers = {
    "Content-Type": "application/json",
};

export const TagServices = {
    fetchTags: async (page, keyword = null) => {
        try {
            let queryString = '';
            if (!page) {
                page = 1;
            }
            queryString += '?pageId='+ page;
            if (keyword) {
                queryString += '&keyword=' + keyword;
            }
            const result = await axios.get(config.tagUrl + '/list' + queryString, { headers: headers });
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
    saveTag: async(payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.post(config.tagUrl, payload, options);
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
    deleteTag: async (id) => {
        try {
            const url = config.tagUrl + "/" + id;
            const result = await axios.delete(url, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(
                    "There is an error in Deleting Tag. Please contact support"
                );
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
    }
};