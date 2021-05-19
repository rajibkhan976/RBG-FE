import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
};

export const userLogin = (email, password, rememberMe = false) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        config.loginUrl,
        { email, password, remember_me: rememberMe },
        { headers: headers }
      )
      .then((result) => {
        
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
    return true;
};