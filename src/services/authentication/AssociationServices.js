import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "./AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const AssociationServices = {
    fetchAssociations: async (page = null, queryParams = null) => {
        try {
            const result = await axios.get(
                config.associationUrl +"/list" + 
                (page ? "/" + page : '') +     
                (queryParams ? "?" + queryParams : ''), 
                { headers: headers });
            console.log('Fetch associations services result in async await : ', result);
            return result.data;
        } catch (e) {
            if (typeof e.response == 'object' && typeof e.response.data == "string") {
                throw new Error(e.response.data);
            } else if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
            
        }
    },
};