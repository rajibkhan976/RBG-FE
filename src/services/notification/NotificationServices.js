import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const NotificationServices = {
    fetchNotifications: async (page = null, queryParams = null) => {
        try {
            const result = await axios.get(
                config.notificationUrl + "/list" +
                (page ? "/" + page : '') +
                (queryParams ? "?" + queryParams : ''),
                { headers: headers });
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
            console.log('Mark all as read result in async await : ', result);
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
};