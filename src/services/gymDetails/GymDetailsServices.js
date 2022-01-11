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
            if (!typeof e.data === 'undefined') {
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
        try {
            const url = config.gym_detail_update;
            const result = await axios.put(url, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating form. Please contact support");
            }
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

    gymHolidayUpdate: async (payload) => {
        try {
            const url = config.gym_holiday + payload._id;
            const result = await axios.put(url, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating Holiday. Please contact support");
            }
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
    gymHolidayCreate: async (payload) => {
        try {
            const url = config.gym_holiday;
            const result = await axios.post(url, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error Creating Holiday. Please contact support");
            }
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
    gymHolidayDelete: async (payload) => {
        try {
            const url = config.gym_holiday + payload;
            const result = await axios.delete(url, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error Deleting Holiday. Please contact support");
            }
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

    fetchTimeZoneList: async () => {
        const url = config.timezoneListURL;
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();
            return result;
        } catch (error) {
            console.log('error', error.response.data);
            return error.response.data;
        }
    },
    fetchTimeZoneLatLng: async (lat, lng) => {
        const url = config.timezoneLatLngUrl + "&format=json&lat=" + lat + "&lng=" + lng;
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);
            const result = await response.json();
            return result;
        } catch (error) {
            console.log('error', error.response.data);
            return error.response.data;
        }
    },
    fetchCountry: async() => {
        try {
            const url = config.fetchCountryUrl;
            const options = {
                headers: headers
            };
            const result = await axios.get(url, options);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(result.data.message);
            }
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                throw new Error("Please contact support.");
            }
        }
    }
};