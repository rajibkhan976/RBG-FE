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
            'Authorization': localStorage.getItem("_token"),
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}

const generateUrl = async payload => {
    var config = {
        method: 'post',
        url: 'https://prcriy2ij4.execute-api.us-east-1.amazonaws.com/dev/generate',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}

const saveAsl = async payload => {
    var config = {
        method: 'post',
        url: 'https://prcriy2ij4.execute-api.us-east-1.amazonaws.com/dev/save',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}

const saveAutomation = async payload => {
    var config = {
        method: 'post',
        url: 'https://6je33zoyve.execute-api.us-east-1.amazonaws.com/dev/create',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}

const getAutomations = async payload => {
    var config = {
        method: 'post',
        url: 'https://6je33zoyve.execute-api.us-east-1.amazonaws.com/get-automations',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}
const updateArn = async payload => {
    var config = {
        method: 'post',
        url: 'https://6je33zoyve.execute-api.us-east-1.amazonaws.com/dev/update-arn',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            'Content-Type': 'text/plain'
        },
        data : payload
    };

    return await axios(config);
}


const apis = {
    getAsl,
    saveAsl,
    generateUrl,
    saveAutomation,
    getAutomations,
    updateArn
}

export default apis
