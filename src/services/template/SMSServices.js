import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

export const SMSServices = {
    fetchSms: async (page = null, queryParams = null) => {
        try {
            const url = config.fetchSmsUrl + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching SMS templates. Please contact support.");
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
    createTemplate: async (payload) => {
        try {
            const result = await axios.post(config.smsUploadUrl, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error creating an SMS template. Please try again or contact support");
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
    editTemplate: async (payload, messageId) => {
        console.log("payload, messageId", payload, messageId);
        try {
            const result = await axios.put(config.smsEditUrl + "/" + messageId, payload, { headers: headers });
            if (result.status === 200) {
                console.log("result API", result);
                return result.data;
            } else {
                throw new Error("There was an error updating the SMS template. Please try again or contact support");
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
    deleteTemplate: async (messageId) => {
        try {
            const result = await axios.delete(config.smsDeleteUrl + "/" + messageId, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error deleting SMS template. Please try again or contact support");
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
    fetchSMSTags: async () => {
        try {
            const url = config.fetchSMSTags;
            console.log("url", url);
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching SMS Tags. Please contact support.");
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
    sendSMS: async (payload) => {
        try {
            const result = await axios.post(config.sendSMS, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error sending the SMS. Please try again or contact support");
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
    uploadImage: async (payload) => {
        console.log("payload :::: ", payload)
        try {
            const result = await axios.post(config.imageUpload, payload, { headers: headers });
            console.log("result :::: ", result)

            if (result.status === 200) {
                console.log("result.data :::: ", result.data)
                return result.data;
            } else {
                throw new Error("There was an error uploading the image. Please try again or contact support");
            }

        } catch (e) {
            console.log("error ::: ", e)
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
}