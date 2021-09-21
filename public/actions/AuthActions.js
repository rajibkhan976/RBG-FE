import { userLogin, userLogout } from "../services/authentication/AuthServices";
import * as actionTypes from "./types";
import { history } from '../helpers';


const login = (email, password) => {
    console.log('auth actions login hit');
    return dispatch => {
        return new Promise((resolve, reject) => {
            userLogin(email, password)
                .then(response => {
                    //console.log('Auth actions response', response);
                    if (response) {
                        dispatch({
                            type: actionTypes.USER_LOGIN,
                            user: response
                        });
                        resolve();
                    }
                })
                .catch(error => {
                    if (error) {
                        //console.log('Auth actions error', error.response.data);
                        dispatch({
                            type: actionTypes.LOGIN_FAILURE,
                            message: error.response.data
                        });
                    }
                    reject();
                });
            
        });
    };
};

const logout = () => {
    return dispatch => {
        userLogout();
        dispatch({
            type: actionTypes.LOGOUT,
        })
        history.push('/login');
    };
}

export default {
    login,
    logout
}