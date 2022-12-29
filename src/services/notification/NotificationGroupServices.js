import axios from "axios";
import config from "../../configuration/config";

const headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const NotificationGroupServices = {
    fetchNotificationGroupList: async () => {
        try {
            const result = await axios.get(config.notificationGroup, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    fetchNotificationGroupListSearch: async (searchData) => {
        try {
            const result = await axios.post(config.notificationGroup + 'search', searchData, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    addNotificationGroup: async (payload)=>{
        try{
            let result = await axios.post(config.notificationGroup + 'create', payload, {headers: headers});
            if(result){
                return result.data;
            }
        }
        catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    deleteUser: async (id, payload) => {
        console.log(payload);
        try {
            const result = await axios.put(config.notificationGroup + 'remove/' + id, payload, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }

        }
    },
    deleteGroup: async (id) => {
        try {
            const result = await axios.delete(config.notificationGroup + id, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    addUserToAGroup: async (payload) => {
        try {
            const result = await axios.post(config.notificationGroup + 'addUser', payload, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    editGroup: async(id, payload) => {
        try {
            const result = await axios.put(config.notificationGroup + id , payload, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    editUser: async(id, payload) => {
        try {
            const result = await axios.put(config.notificationGroup + 'update-user/' + id , payload, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    bulkUserEdit : async (id, payload) => {
        try{
            const result = await axios.put(config.notificationGroup + 'bulk-edit/' + id , payload, {headers: headers});
            return result.data;
        }catch(e){
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    bulkUserDelete : async(id, payload) => {
        try {
            const result = await axios.put(config.notificationGroup + 'bulk-delete/' + id , payload, { headers: headers });
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
}