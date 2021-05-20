import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.7:8004',
})
let config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    crossDomain: true

}
export const getAsl = payload => api.post(`/create-asl`, payload, config)

const apis = {
    getAsl
}

export default apis
