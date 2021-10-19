import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../../services/authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

export const AudioServices = {
    fetchAudios: async (page = null, queryParams = null) => {
        try {
            const url = config.fetchAudiossUrl + (page ? "/" + page : '') + (queryParams ? "?" + queryParams : '');
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching audio templates. Please contact support.");
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
            const result = await axios.post(config.audioTemplateUrl, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error creating an audio template. Please try again or contact support");
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
    editTemplate: async (payload) => {
        try {
            const result = await axios.put(
                config.audioTemplateUrl + payload.id,
                payload,
                { headers: headers }
            );
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error updating audio template. Please try again or contact support");
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
    deleteTemplate: async (audioId) => {
        try {
            const result = await axios.delete(config.audioTemplateUrl + audioId, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There was an error deleting audio template. Please try again or contact support");
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
    fileUpload: fileData => {
        return new Promise((resolve, reject) => {
            if (isLoggedIn() === false) {
                reject(message.loginFailed);
            }
            console.log('File upload audio service: ', fileData)
            axios
                .post(
                    config.audioUploadUrl,
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
                    if (error != null && error.response != null) {
                        reject(error.response.data.error);
                    } else {
                        reject(message.connectionError);
                    }
                });
        });
    },
}