import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json'
};

export const TransactionHistoryServices = {
    fetchTransHistoryList: async (filterString, pageNo) => {
        try {
            let url = config.transactionGlobalHistotyUrl;   
            if(filterString){
                url = url + pageNo + "?" + filterString ;
            console.log("url1",url);

            } else {
                url = url + "?"+ pageNo ;
            console.log("url2", url);

            }
            const options = {
                headers: headers
            };
            const result = await axios.get(url);
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an issue while fetching programs. Please contact support.");
            }
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },
    //  fetchTransHistoryFilter: async (filter) => {
    //      try {
    //          const url = config.transactionGlobalHistotyUrl + filter ;
    //          const options = {
    //              headers: headers
    //          };
    //          const result = await axios.get(url);
    //          console.log(url);

    //          if (result.status === 200) {
    //              return result.data;
    //          } else {
    //              throw new Error("There is an issue while fetching programs. Please contact support.");
    //          }
    //      } catch (e) {
    //          if (!typeof e.data === 'undefined') {
    //              console.log(e.response.data.message);
    //              throw new Error(e.response.data.message);
    //          } else {
    //              console.log(e.stack);
    //              throw new Error(e.message + ". Please contact support.");
    //          }
    //      }
    //  },
};