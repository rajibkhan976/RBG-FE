import axios from "axios";
import config, { gym_detail_update } from "../../configuration/config";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
};

export const GymDetailsServices = {
    fetchGymDetail: async () => {
        try {
            const url = config.gymDetailsUrl + "/detail";
            const result = await axios.get(url, { headers: headers });
            console.log('Gym Detail Services : ', result);
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

    imageupload: fileData => {
        return new Promise((resolve, reject) => {
           
            console.log('gym logo upload service: ', fileData)
            axios
                .post(
                    config.gym_Logo_upload,
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
    gymDetailUpdate: async (payload) => {
        // headers.Authorization = localStorage.getItem("_token");
        try {
            const url = config.gym_detail_update ;
            const result = await axios.put(url, payload, { headers: headers });
            console.log("gymmmmmmmm",result);
            if(result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating form. Please contact support");
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