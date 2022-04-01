import axios from 'axios';

// const rbgInstance = axios.create({
//     baseURL: 'https://rbg.com/',
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     }
// });
export const rbgInstance = {
 authorizerInterceptor: axios.interceptors.request.use(
    (req) => {
      const token = (localStorage.getItem("_token") == null)?"":localStorage.getItem("_token");
      req.headers = {
        ...req.headers,
        Authorization: token
       };
      return req;
    },
    (err) => {
       return Promise.reject(err);
    }
  ),
  disableProdConsole: () => {
    if (process.env.REACT_APP_ENV === 'prod') {
        console.log = function() {}
    }
  }
};