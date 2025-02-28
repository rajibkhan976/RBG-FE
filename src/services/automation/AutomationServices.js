import axios from "axios";
import config from "../../configuration/config";
let headers = {
    "Content-Type": "application/json",
};

export const AutomationServices = {
    getAsl: async (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationAslUrl + '/automation/create-asl',
                headers: {
                    "Content-Type": "text/plain"
                },
                data: payload
            };
            return await axios(configAxios);
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
    generateUrl: async (payload) => {
        try {
            console.log(config.automationWebhookUrl + '/automation/webhook/generate')
            let configAxios = {
                method: 'post',
                url: config.automationWebhookUrl + '/automation/webhook/generate',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };
            return await axios(configAxios);
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
    saveAsl: async (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationWebhookUrl + '/automation/webhook/generate',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };

            return await axios(configAxios);
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
    saveAutomation: (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationBasicUrl + '/automation',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };
            return axios(configAxios);
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
    getAutomations: (page, queryParams = null) => {
        // const pageId = utils.getQueryVariable('page') || 1;
        // const queryParams = await getQueryParams();page
        try {
            let urlPattern = config.automationBasicUrl + '/automation/list/' + page;
            urlPattern += (queryParams) ? queryParams : "";
            const configAxios = {
                method: 'get',
                url: urlPattern,
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return axios(configAxios);
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
    updateArn: (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationBasicUrl + '/automation/update-arn',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };
            return axios(configAxios);
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
    deleteArn: (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationBasicUrl + '/automation/delete-arn',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };
            return axios(configAxios);
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
    fetchFields: (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationWebhookUrl + '/automation/webhook/fetch-fields',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };
            return axios(configAxios);
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
    deleteWebhookNode: (payload) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationWebhookUrl + '/automation/webhook/delete-webhook',
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            };
            return axios(configAxios);
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
    deleteAutomation: async (automationID) => {
        try {
            const url = config.automationDeleteUrl + "/" + automationID;
            const res = await axios.delete(url);
            if (res.status == 200) {
                return {
                    status: res.status,
                    message: res.data.message,
                    details: res.data.details
                }
            } else {
                throw new Error(res.data.message)
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
    fetchTagStatusPhase: async () => {
        try {
            const url = config.automationBasicUrl + "/automation/fetch-details-tags-status-phase";
            const result = await axios.get(url, { headers: headers });
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
    fetchHistory: async (automationID, page, queryParams = null) => {
        try {
            let url = config.automationHistoryUrl + `/${page}?automationId=${automationID}`;
            url += (queryParams) ? "&" + queryParams : '';
            // const url = config.automationHistoryUrl + "?search=62d070bfae66400009db4ba2";
            const res = await axios.get(url);
            return res.data;
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
    fetchHistoryCount: async (automationID) => {
        try {
            let url = config.automationHistoryUrl + `/count?automationId=${automationID}`;
            const res = await axios.get(url);
            return res.data;
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
    refreshHistory: async (historyId) => {
        try {
            let configAxios = {
                method: 'post',
                url: config.automationHistoryUrl + '/refresh',
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    historyId: historyId
                }
            };
            return axios(configAxios);
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
    fetchContactAutomations: async (contactId) => {
        try {
            let url = config.automationBasicUrl + `/automation/contact/list/${contactId}`;
            const res = await axios.get(url);
            return res.data;
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