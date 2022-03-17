import axios from "axios";
import config from "../../configuration/config";

const headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const NotificationServices = {
    fetchListOfNotification: async () => {
        try {
            const result = await axios.get(config.notificationUrl + "/list-fetch", { headers: headers });
            return result.data;
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    fetchNotifications: async (page = null, type = 'general') => {
        try {
            const result = await axios.get(config.notificationUrl + "/list" + (page ? "/" + page : '/1') + "/" + (type ? type : 'general'), { headers: headers });
            // console.log('Fetch notification services result in async await : ', result);
            return result.data;
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    notificationToggleStatus: async (id) => {
        try {
            const result = await axios.put(config.notificationUrl + "/status/" + id, { headers: headers });
            return result.data;
        } catch (e) {
            if (typeof e.response == 'object' && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    markAllAsRead: async (type = null) => {
        try {
            const result = await axios.put(config.notificationUrl, type, { headers: headers });
            return result.data;
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    markSingleAsRead: async (payload) => {
        try {
            const result = await axios.put(config.notificationUrl+ "/mark-read", payload, { headers: headers });
            return result.data;
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