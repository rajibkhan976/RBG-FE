import axios from "axios";
import config from "../../configuration/config";
import { utils } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
};

export const CourseServices = {
    fetchCategory: async () => {
        try {
            const hasPermission = utils.hasPermission("course","read");
            if(!hasPermission) throw new Error("You do not have permission.");
            const result = await axios.get(config.courseCategoryUrl, { headers: headers });
            console.log('Categories From Service : ', result);
            return result.data;
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
        }
    },

    createCategory: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("course","create");
            if(!hasPermission) throw new Error("You do not have permission.");
            const result = await axios.post(config.otherCourseCategoryUrl, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error creating category. Please contact support");
            }
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
        }
    },

    editCategory: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("course","update");
            if(!hasPermission) throw new Error("You do not have permission.");
            const url = config.otherCourseCategoryUrl + "/" + payload.id;
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating category. Please contact support");
            }
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
        }
    },

    deleteCategory: async (catID) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("course","delete");
            if(!hasPermission) throw new Error("You do not have permission.");
            const url = config.otherCourseCategoryUrl + "/" + catID;
            const result = await axios.delete(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error deleting a category. Please contact support");
            }
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
        }
    },

    fetchCourses: async (page=null, queryParams=null) => {
        try {
            const hasPermission = utils.hasPermission("course","read");
            if(!hasPermission) throw new Error("You do not have permission.");
            const result = await axios.get(config.fetchCourseUrl +
            (page ? "/" + page : '') +
            (queryParams ? "?" + decodeURI(queryParams) : ''),
            { headers: headers });
            console.log('Products From Service : ', result);
            return result.data;
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
            
        }
    },

    fetchCourseList: async (catID) => {
        try {
            const hasPermission = utils.hasPermission("course","read");
            if(!hasPermission) throw new Error("You do not have permission.");
            const url = config.fetchCourseUrl + "/1?catID=" + catID;
            const result = await axios.get(url, 
            { headers: headers });
            console.log('Course List Service : ', result);
            return result.data;
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
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

    createCourse: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("course","create");
            if(!hasPermission) throw new Error("You do not have permission.");
            const result = await axios.post(config.createCourseUrl, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error creating product. Please contact support");
            }
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
        }
    },

    editCourse: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("course","update");
            if(!hasPermission) throw new Error("You do not have permission.");
            const url = config.editCourseUrl + "/" + payload.id;
            const result = await axios.put(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating product. Please contact support");
            }
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
        }
    },

    deleteCourse: async (productID) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const hasPermission = utils.hasPermission("course","delete");
            if(!hasPermission) throw new Error("You do not have permission.");
            const url = config.deleteCourseUrl + "/" + productID;
            const result = await axios.delete(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error deleting a product. Please contact support");
            }
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
        }
    },

    initCoursePurchase: async (payload) => {
        try {
            const url = config.courseBuyUrl;
            const result = await axios.post(url, payload, { headers: headers });
            // console.log('Transaction Services : ', result);
            return result.data;
        } catch (e) {
            if(typeof e.response.data.message !== 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error(e.response.data);
            }
            
        }
    }
};