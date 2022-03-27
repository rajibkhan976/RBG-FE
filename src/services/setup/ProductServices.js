import axios from "axios";
import config from "../../configuration/config";
import { utils } from "../../helpers";
let headers = {
    "Content-Type": "application/json",
};

export const ProductServices = {
    fetchCategory: async () => {
        try {
            const hasPermission = utils.hasPermission("product","read");
            if(!hasPermission) throw new Error("You do not have permission");
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
            const hasPermission = utils.hasPermission("product","create");
            if(!hasPermission) throw new Error("You do not have permission");
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
            const hasPermission = utils.hasPermission("product","update");
            if(!hasPermission) throw new Error("You do not have permission");
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
            const hasPermission = utils.hasPermission("product","delete");
            if(!hasPermission) throw new Error("You do not have permission");
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
            const hasPermission = utils.hasPermission("product","read");
            if(!hasPermission) throw new Error("You do not have permission");
            const result = await axios.get(config.fetchProductUrl +
            (page ? "/" + page : '') +
            (queryParams ? "?" + decodeURI(queryParams) : ''),
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
    
    fetchAllProducts: async () => {
        try {
            const result = await axios.get(config.fetchProductUrl + "/all",
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

    fetchColorSizes: async (page=null, queryParams=null) => {
        try {
            const hasPermission = utils.hasPermission("product","read");
            if(!hasPermission) throw new Error("You do not have permission");
            const result = await axios.get(config.colorSizeUrl,{ headers: headers });
            console.log('Color Sizes: ', result);
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

    createProduct: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("product","create");
            if(!hasPermission) throw new Error("You do not have permission.");
            const result = await axios.post(config.createProductUrl, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error creating product. Please contact support");
            }
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                // throw new Error(e.message + ". Please contact support.");
                throw new Error(e.response.data);
            }
        }
    },

    editProduct: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("product","update");
            if(!hasPermission) throw new Error("You do not have permission.");
            const url = config.editProductUrl + "/" + payload.id;
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating product. Please contact support");
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

    deleteProduct: async (productID) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("product","delete");
            if(!hasPermission) throw new Error("You do not have permission.");
            const url = config.deleteProductUrl + "/" + productID;
            const result = await axios.delete(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error deleting a product. Please contact support");
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

    buyProduct: async (payload) => {
        try {
            const url = config.buyProductUrl;
            const result = await axios.post(url, payload, { headers: headers });
            
            if (result.status === 200) {
                console.log(":::RESULT 200:::", result);

                return result.data;
            } else {
                console.log("In error now", result);
                throw new Error(result);
            }
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.message + ". Please contact support.");
            }
        }
    }
};