import axios from 'axios'

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
        url: 'https://prcriy2ij4.execute-api.us-east-1.amazonaws.com/dev/automation/webhook/generate',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            "Content-Type": "application/json"
        },
        data : payload
    };

    return await axios(config);
}

const saveAsl = async payload => {
    var config = {
        method: 'post',
        url: 'https://prcriy2ij4.execute-api.us-east-1.amazonaws.com/dev/automation/webhook/generate',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            "Content-Type": "application/json"
        },
        data : payload
    };

    return await axios(config);
}

const saveAutomation = async payload => {
    var config = {
        method: 'post',
        url: 'https://402pgi0zp9.execute-api.us-east-1.amazonaws.com/dev/automation',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            "Content-Type": "application/json"
        },
        data : payload
    };

    return await axios(config);
}

const getAutomations = async payload => {
    var config = {
        method: 'post',
        url: 'https://402pgi0zp9.execute-api.us-east-1.amazonaws.com/dev/automation/list',
        //url: 'http://localhost:3005/dev/automation/list',
        headers: {
            'Authorization': localStorage.getItem("_token"),
            "Content-Type": "application/json"
        }
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
