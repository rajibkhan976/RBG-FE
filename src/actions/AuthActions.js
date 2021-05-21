import { userLogin, userLogout } from "../services/authentication/AuthServices";
import * as actionTypes from "./types";
import { history } from '../helpers';


const login = (email, password) => {
    console.log('auth actions login hit');
    return dispatch => {
        userLogin(email, password)
            .then(response => {
                console.log('Auth actions response', response);
                if (response) {
                    dispatch({
                        type: actionTypes.USER_LOGIN,
                        user: response
                    });
                }
            })
            .then(() => {
                history.push('/dashboard')
            })
            .catch(error => {
                console.log('Auth actions error', error);
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