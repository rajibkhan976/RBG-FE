import axios from "axios";
import config from "../../configuration/config";

export const AutomationServices = {
    getAsl: async (payload) => {
        let config = {
            method: 'post',
            url: config.automationAslUrl + '/automation/create-asl',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };

        return await axios(config);
    },
    generateUrl: async(payload) => {
        let config = {
            method: 'post',
            url: config.automationWebhookUrl + '/automation/webhook/generate',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return await axios(config);
    },
    saveAsl: async(payload) => {
        let config = {
            method: 'post',
            url: config.automationWebhookUrl + '/automation/webhook/generate',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };

        return await axios(config);
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
    getAutomations: (page) => {
        let configAxios = {
            method: 'get',
            url: config.automationBasicUrl + '/automation/list '  + (page ? "/" + page : ''),
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            }
        };
        return axios(configAxios);
    },
    updateArn: (payload) => {
        let configAxios = {
            method: 'post',
            url: config.automationBasicUrl + '/update-arn',
            headers: {
                'Authorization': localStorage.getItem("_token"),
                "Content-Type": "application/json"
            },
            data : payload
        };
        return axios(configAxios);
    }

};