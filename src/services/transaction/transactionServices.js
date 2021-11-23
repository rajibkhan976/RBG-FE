import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const TransactionServices = {
    fetchTransactionList: async () => {
        try {
            const url = config.transactionUrl + "list/618cfc610bd605dd51cbc0b7";
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
    }

   
};