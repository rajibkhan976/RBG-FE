import axios from "axios";
import config from "../../configuration/config";
import jwt from "jsonwebtoken";

let headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
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
        //console.log('user login: ', result);
        //localStorage.setItem("_token", result.token);
        let response = {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhiZWMzZDQwNzBkODAwMDgxMmJjMjIiLCJmaXJzdE5hbWUiOiJTdXBlciIsImxhc3ROYW1lIjoiQWRtaW4iLCJ1c2VybmFtZSI6InN1cGVyLWFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQHJnYi5pbiIsImdyb3VwSWQiOiI2MDhiZWMzZDQwNzBkODAwMDgxMmJjMjEiLCJvcmdhbml6YXRpb25JZCI6IjYwOGJlZGRjMzBhYzk0MGFlNzUwOTYzMyIsInBhc3N3b3JkIjoiJDJhJDEwJGFXR3FzUkdtY08xeGgudXFlakpBbGV1ci5mNUJNVFVVTmZBU3V2MzVJUU5HYzNHcXdjRDJlIiwiY3JlYXRlZEJ5IjoiNjA4YmVkZGMzMGFjOTQwYWU3NTA5NjI1IiwidXBkYXRlZEJ5IjoiNjA4YmVkZGMzMGFjOTQwYWU3NTA5NjI1IiwiY3JlYXRlZEF0IjoiMjAyMS0wNC0zMCAxMTo0NTozMiIsInVwZGF0ZWRBdCI6IjIwMjEtMDQtMzAgMTE6NDU6MzIiLCJpYXQiOjE2MjE1MjY3MjgsImV4cCI6MTYyMTYxMzEyOH0.cOC3zjKE3sF56QeplK5oleFRs1AsC-PfPAocLunHIfk"
      }
      localStorage.setItem("_token", response.token);
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
  const token = localStorage.getItem("_token");
  if (!token) {
    return false;
  }
  try {
    const jwtDecode = jwt.decode(token);
    if (jwtDecode.exp < new Date().getTime() / 1000) {
      console.log("Session expired");
      localStorage.removeItem("_token");
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const userLogout = () => {
  localStorage.removeItem("_token");
}