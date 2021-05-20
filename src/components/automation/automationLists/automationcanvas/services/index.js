import axios from 'axios'

// const api = axios.create({
//     baseURL: 'https://wrnwkinapa.execute-api.us-east-1.amazonaws.com',
// });

// let config = {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//     },
//     crossDomain: true

// }
// export const getAsl = payload => api.post(`/dev/create-asl `, payload, config)

const getAsl = async payload => {
    var config = {
        method: 'post',
        url: 'https://5uetvsgrhl.execute-api.us-east-1.amazonaws.com/dev/create-asl',
        headers: {
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}

const generateUrl = async payload => {
    var config = {
        method: 'post',
        url: 'http://localhost:3005/dev/generate',
        headers: {
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}

const saveAsl = async payload => {
    var config = {
        method: 'post',
        url: 'http://localhost:3005/dev/save',
        headers: {
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}

const apis = {
    getAsl,
    saveAsl,
    generateUrl
}

export default apis
