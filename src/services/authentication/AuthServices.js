import axios from "axios";
import config from "../../configuration/config";
import jwt from "jsonwebtoken";
import { history, utils } from "../../helpers"

let headers = {
  "Content-Type": "application/json"
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
        //console.log('user login: ', result.data);
        localStorage.setItem("_token", result.data.token);
        const permissions = utils.organizePermissions(result.data.permission);
        localStorage.setItem("permissions", JSON.stringify(permissions));
        resolve(result.data);
      })
      .catch((error) => {
        console.log("Error triggered from Login in auth service", error)
        if (error != null) {
          reject(error);
        }
      });
  });
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("_token");
  if (!token) {
    return false;
  }
  try {
    const jwtDecode = jwt.decode(token);
    if (jwtDecode.exp < new Date().getTime() / 1000) {
      console.log("Session expired");
      localStorage.removeItem("_token");
      history.go(0);
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const userLogout = () => {
  localStorage.removeItem("_token");
  localStorage.removeItem("storedSavedColList");
  localStorage.removeItem("permissions");
  return true;
};

