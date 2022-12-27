import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Content-Type": "application/json",
};
 
export const communicationLogServices = {
  fetchCommLog: async (page = null, queryParams = null) => { 
    try {
      let url = config.communicationListUrl ;
      const result = await axios.get(url +
        (page ? "/" + page : '') +
        (queryParams ? "?" + decodeURI(queryParams) : ''), { headers: headers });
      return result.data;
      
    } catch (e) { 
      if(e.response && e.response.data && e.response.data.message) {
        console.log("res",e.response.data.message);
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

  fetchInboxLog: async (page = null, contact_id) => { 
    try {
      let url = config.inboxListUrl ;
      const result = await axios.get(url +
        ("/" + page ) + ("?contact_id=" + contact_id)
        , { headers: headers });
      return result.data;
 
    } catch (e) { 
      if(e.response && e.response.data && e.response.data.message) {
        console.log("res",e.response.data.message);
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


