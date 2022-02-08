import * as actionTypes from "./types";
import { GymDetailsServices } from "../services/gymDetails/GymDetailsServices";


const getPosition = (lat, lng) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            GymDetailsServices.fetchTimeZoneLatLng(lat, lng)
            .then(response => {
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