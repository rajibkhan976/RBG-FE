import * as actionTypes from "./types";
import { GymDetailsServices } from "../services/gymDetails/GymDetailsServices";


const getPosition = (lat, lng) => {
    console.clear();
    console.log("Get Position lat", lat);
    console.log("Get Position long", lng);
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            GymDetailsServices.fetchTimeZoneLatLng(lat, lng)
            .then(response => {
                console.log("Logged in user's timezone data", response);
                dispatch({
                    type: actionTypes.GET_LAT_LNG,
                    location: response
                });
                resolve(true);
            }).catch(err => {
                reject(err.message);
            });         
        });
    };
};

export default {
    getPosition
}