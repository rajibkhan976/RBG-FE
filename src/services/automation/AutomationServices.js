import axios from "axios";
import config from "../../configuration/config";

export const AutomationServices = {
    getAsl: async (payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationAslUrl + '/automation/create-asl',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "text/plain"
            },
            data : payload
        };

        return await axios(configAxios);
    },
    generateUrl: async(payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationWebhookUrl + '/automation/webhook/generate',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return await axios(configAxios);
    },
    saveAsl: async(payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationWebhookUrl + '/automation/webhook/generate',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };

        return await axios(configAxios);
    },
    saveAutomation: (payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationBasicUrl + '/automation',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return axios(configAxios);
    },
    getAutomations: (page, queryParams = null) => {
        // const pageId = utils.getQueryVariable('page') || 1;
        // const queryParams = await getQueryParams();page
        try {
            let urlPattern = config.automationBasicUrl + '/automation/list/' + page;
            urlPattern += (queryParams)? queryParams: "";
            const configAxios = {
                method: 'get',
                url: urlPattern,
                headers: {
                    'Authorization': localStorage.getItem("_token"),
                    "Content-Type": "application/json"
                }
            };
            return axios(configAxios);
        } catch (e) {
            alert(e);
        }
    },
    updateArn: (payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationBasicUrl + '/automation/update-arn',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return axios(configAxios);
    },
    deleteArn: (payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationBasicUrl + '/automation/delete-arn',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return axios(configAxios);
    },
    fetchFields: (payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationWebhookUrl + '/automation/webhook/fetch-fields',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return axios(configAxios);
    },
    deleteWebhookNode: (payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationWebhookUrl + '/automation/webhook/delete-webhook',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return axios(configAxios);
    },
    deleteAutomation: async (automationID) => {
        try {
            const url = config.automationDeleteUrl + "/" + automationID;
            const options = {
                headers: {
                    Authorization: localStorage.getItem("_token")
                }
            }
            const res = await axios.delete(url, options);
            console.log(res);
            if(res.status == 200) {
                return {
                    status: res.status,
                    message: res.data.message,
                    details: res.data.details
                }
            } else {
                throw new Error(res.data.message)
            }
            console.log(res.data);
        } catch (e) {
            throw new Error(e.message)
        }
    }
};