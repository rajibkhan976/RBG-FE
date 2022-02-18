import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const TransactionServices = {
    fetchTransactionList: async (contactId) => {
        try {
            const url = config.transactionUrl + "list/" + contactId;
            const result = await axios.get(url, { headers: headers });
            console.log('Transaction Services : ', result);
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
            
        }
    },

    fetchOldTransactions: async (contactId) => {
        try {
            const url = config.oldTransactionUrl + contactId;
            const result = await axios.get(url, { headers: headers });
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    },

    fetchUpcomingTransactions: async (contactId) => {
        try {
            const url = config.upcomingTransactionUrl;
            const result = await axios.get(url, { headers: headers });
            return result.data;
        } catch (e) {
            if(!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
    }

   
};