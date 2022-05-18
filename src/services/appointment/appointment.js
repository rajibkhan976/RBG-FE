import axios from "axios";
import config from "../../configuration/config";
let headers = {
    "Content-Type": "application/json",
};

export const AppointmentServices = {
    fetchContactAppointment: async (id, page = 1) => {
        try {
            const result = await axios.get(config.appointmentContactUrl + '/' + id + "?pageId=" + page, { headers: headers });
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
    saveAppointment: async(payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.post(config.appointmentContactUrl, payload, options);
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
    deleteAppointment: async (id) => {
        try {
            const url = config.appointmentContactUrl + "/" + id;
            const result = await axios.delete(url, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(
                    "There is an error in Deleting Phase. Please contact support"
                );
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
    fetchList: async () => {
        try {
            const result = await axios.get(config.appointmentUrl + '/list', { headers: headers });
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
    editAgenda: async (id, payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.appointmentUrl + "/edit/" + id , payload, options);
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
    completeAppointment: async (id) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.appointmentUrl + "/complete/" + id , {}, options);
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
    cancelAppointment: async (id, payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.appointmentUrl + "/cancel/" + id , payload, options);
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
    addTagToAppointment: async (id, payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.appointmentUrl + "/add-tag/" + id , payload, options);
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
    removeTagFromAppointment: async (id, payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.appointmentUrl + "/remove-tag/" + id , payload, options);
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
    rescheduleAppointment: async (id, payload) => {
        try {
            const options = {
                headers: headers
            };
            const result = await axios.put(config.appointmentUrl + "/reschedule/" + id , payload, options);
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
    }
};