import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const ProductServices = {
    fetchCategory: async () => {
        try {
            const result = await axios.get(config.fetchCategoryUrl, { headers: headers });
            console.log('Categories From Service : ', result);
            return result.data;
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

    createCategory: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.post(config.otherCategoryUrl, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error creating category. Please contact support");
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

    editCategory: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const url = config.otherCategoryUrl + "/" + payload.id;
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating category. Please contact support");
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

    deleteCategory: async (catID) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const url = config.otherCategoryUrl + "/" + catID;
            const result = await axios.delete(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error deleting a category. Please contact support");
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

    fetchProducts: async (page=null, queryParams=null) => {
        try {
            const result = await axios.get(config.fetchProductUrl +
            (page ? "/" + page : '') +
            (queryParams ? "?" + queryParams : ''),
            { headers: headers });
            console.log('Products From Service : ', result);
            return result.data;
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

    imageUpload: fileData => {
        // headers.Authorization = localStorage.getItem("_token");
        return new Promise((resolve, reject) => {
            console.log('Image Upload Data: ', fileData)
            axios
                .post(
                    config.productImageUploadUrl,
                    {
                        file: fileData.file,
                        name: fileData.name
                    },
                    { headers: headers }
                )
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    reject(error.response.data.message);
                    // if (error != null && error.response != null) {
                    //     reject(error.response.data.message);
                    // } else {
                    //     reject(message.connectionError);
                    // }
                });
        });
    },
};