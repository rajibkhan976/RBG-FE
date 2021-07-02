import axios from 'axios';

const rbgInstance = axios.create({
    baseURL: 'https://rbg.com/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

rbgInstance.defaults.headers.common['Authorization'] = localStorage.getItem("_token");

export default rbgInstance;