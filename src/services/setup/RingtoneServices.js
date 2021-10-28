import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const RingtoneServices = {
    fetchRingtone: async () => {
        try {
            const result = await axios.get(config.ringtoneUrl, { headers: headers });
            console.log('Ringtone Service : ', result);
            return result.data;
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
    updateRingtone: async (payload) => {
        try {
            const url = config.ringtoneUrl + "create";
            const result = await axios.post(url, payload, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating Ringtone. Please contact support");
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
    deleteRingtone: async (id) => {
        // axios
        //     .delete(
        //         config.ringtoneUrl + "delete/" + id,
        //         { headers: headers }
        //     );

        try {
            const url = config.ringtoneUrl + "delete/" + id;
            const result = await axios.delete(url, { headers: headers });
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error in Deleting Ringtone. Please contact support");
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
};