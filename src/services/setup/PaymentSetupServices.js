import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
};

export const PaymentSetupServices = {

    fetchPaymentSetup: async () => {
        try {
            const result = await axios.get(config.paymentSetupUrl + "setup", { headers: headers });
            return result.data;
        } catch (e) {
            console.log(e.stack);
            const msg = (e.response?.data) ? e.response.data.message: "Something went wrong. Please contact support";
            throw new Error(msg);

        }
    },

    getMerchantId: async (payload) => {
        try {
            const result = await axios.post(config.paymentSetupUrl + "findmerchant", payload, { headers: headers });
            return result.data;
        } catch (e) {
            console.log(e.stack);
            const msg = (e.response?.data) ? e.response.data.message: "Something went wrong. Please contact support";
            throw new Error(msg);

        }
    },

    saveMerchantInfo: async (payload) => {
        try {
            const result = await axios.put(config.paymentSetupUrl + "setup", payload, { headers: headers });
            return result.data;
        } catch (e) {
            console.log(e.stack);
            const msg = (e.response?.data) ? e.response.data.message: "Something went wrong. Please contact support";
            throw new Error(msg);

        }
    },

};