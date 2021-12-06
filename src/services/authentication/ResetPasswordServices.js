import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

export const ResetPasswordServices = {
    resetPasswordEmail: async (payload) => {
        try {
            const result = await axios.post(config.resetPasswordEmailUrl, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error sending reset password link. Please contact support");
            }
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data) {
                throw new Error(e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    resetPassword: async (payload) => {
        try {
            const result = await axios.post(config.resetPasswordUrl, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating your password. Please contact support");
            }
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data) {
                throw new Error(e.response.data);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },

}