import { userLogin } from "../services/authentication/AuthServices";
import * as actionTypes from "./types";


const login = (email, password) => {
    console.log('auth actions login hit');
    return dispatch => {
        userLogin(email, password)
            .then(response => {
                console.log('Auth actions response', response);
                if (response) {
                    dispatch({
                        type: actionTypes.USER_LOGIN,
                        value: response
                    });
                }
            })
            .catch(error => {
                console.log('Auth actions error', error);
            });
    };
};

export default {
    login
}