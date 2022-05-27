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
      
      const accessCode = localStorage.getItem("accessCode");
      const token = (localStorage.getItem("_token") == null)?"":localStorage.getItem("_token");
      req.headers = {
        ...req.headers,
        Authorization: token
       };
       // Add header only for member check in portal
       if (accessCode && req.url.includes("member-portal")) {
        req.headers['x-access-code'] = accessCode;       
       } 
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