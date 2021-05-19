import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST',
  'Access-Control-Allow-Credentials': true,
};

export const userLogin = (email, password, rememberMe = false) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        config.loginUrl,
        { email, password, rememberMe: rememberMe },
        { headers: headers }
      )
      .then((result) => {
        console.log('use login: ', result);
        resolve(result.data);
      })
      .catch((error) => {
        if (error != null && error.response != null) {
          reject(error.response.data.message);
        } else {
          //reject(errorMessage.connectionError);
        }
      });
  });
};

export const isLoggedIn = () => {
    return false;
};