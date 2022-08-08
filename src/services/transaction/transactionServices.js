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

    fetchOldTransactions: async (contactId, pageNumber) => {
        try {
            const url = config.transactionUrl + "transactions/old/" + contactId + "/" + pageNumber;
            const result = await axios.get(url, { headers: headers });
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

    fetchUpcomingTransactions: async (contactId, pageNumber) => {
        try {
            const url = config.transactionUrl + "transactions/upcoming/" + contactId + "/" + pageNumber;
            const result = await axios.get(url, { headers: headers });
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

    fetchContract: async (contactId, pageNumber) => {
        try {
            const url = config.transactionUrl + "contract-transactions/list/" + contactId + "/" + pageNumber;
            const result = await axios.get(url, { headers: headers });
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

    retryPayment: async (contactId, payload) => {
        try {
            const url = config.transactionUrl + "transactions/retry/" + contactId;
            const result = await axios.post(url, payload, { headers: headers });
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

    refund: async (contactId, payload) => {
        try {
            const url = config.transactionUrl + "transactions/refund/" + contactId;
            const result = await axios.post(url, payload, { headers: headers });
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

    cancelContract: async (contactId, payload) => {
        try {
            const url = config.transactionUrl + "contract-transactions/cancel/" + contactId;
            const result = await axios.post(url, payload, { headers: headers });
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

    completeTransaction: async (contactId, payload) => {
        try {
            const url = config.transactionUrl + "upcoming-cash-transactions/complete/" + contactId;
            console.log("Complete Transaction URL: " + url);
            const result = await axios.post(url, payload, { headers: headers });
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

    updateTransaction: async (contactId, payload) => {
        try {
            const url = config.transactionUrl + "transactions/update/" + contactId;
            const result = await axios.put(url, payload, { headers: headers });
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

    getInvoice: async (payload) => {
        try {
            const url = config.invoiceUrl;
            const result = await axios.post(url, payload, { headers: headers });
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
   
};