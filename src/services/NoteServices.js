import axios from "axios";
import config from "../configuration/config";
import {utils} from "../helpers";

let headers = {
    "Content-Type": "application/json",
};

export const NoteServices = {
    fetchNoteList: async (contactID, page = null, queryParams = null) => {
        try {
            const url = config.noteContactModalUrl;
            const result = await axios.get(url +
                ("/" + contactID ) +
                (page ? "/" + page : '')
                ,
                {headers: headers});
            return result.data;
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
   
    addNote: async (payload) => {
        try {
            const url = config.noteContactModalUrl;
            const result = await axios.post(url, payload, {headers: headers});
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error(" Please contact support");
            }
        } catch (e) {
            if(e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else if(e.response && e.response.data && typeof e.response.data == "string") {
                console.log(e.response.data);
                throw new Error(e.response.data);
            } else {
                console.log("Error", e.response);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    

};
