import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const CreditManagementServices = {
	fetchPackages: async () => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const url = config.creditManagemetnUrl + "package/list";
			const options = {
				headers: headers,
			};
			const result = await axios.get(url, options);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching credit packages. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	fetchUsage: async () => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const url = config.creditUsageUrl + "usage";
			const options = {
				headers: headers,
			};
			const result = await axios.get(url, options);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching credit packages. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	fetchCardBanks: async () => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const url = config.creditManagemetnUrl + "package/billing/card-bank/list";
			const options = {
				headers: headers,
			};
			const result = await axios.get(url, options);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching credit packages. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	createPackage: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.creditManagemetnUrl + "package",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while creating package. Please contact support."
				);
			}
		} catch (e) {
			console.log("yeah", e.response);
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	createUsage: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.creditUsageUrl + "usage",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while creating package. Please contact support."
				);
			}
		} catch (e) {
			console.log("yeah", e.response);
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	updatePackage: async (payload) => {
		try {
			const result = await axios.put(
				config.creditManagemetnUrl + "package/" + payload.id,
				payload,
				{ headers: headers }
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There was an error in package update. Please try again or contact support"
				);
			}
		} catch (e) {
			console.log("yeah", e.response);
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	toggleStatus: async (id) => {
		try {
			const result = await axios.put(
				config.creditManagemetnUrl + "package/status-toggle/" + id,
				{ headers: headers }
			);
			return result.data;
		} catch (e) {
			if (typeof e.response == "object" && typeof e.response.data == "string") {
				throw new Error(e.response.data);
			} else if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	toggleFavourite: async (id) => {
		try {
			const result = await axios.put(
				config.creditManagemetnUrl + "package/favourite-toggle/" + id,
				{ headers: headers }
			);
			return result.data;
		} catch (e) {
			if (typeof e.response == "object" && typeof e.response.data == "string") {
				throw new Error(e.response.data);
			} else if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	deletePackage: async (id) => {
		try {
			const url = config.creditManagemetnUrl + "package/" + id;
			const result = await axios.delete(url, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error deleting a package. Please contact support"
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	purchasePackage: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.creditManagemetnUrl + "package/purchase",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while creating package. Please contact support."
				);
			}
		} catch (e) {
			console.log("yeah", e.response);
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	insertCard: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.creditManagemetnUrl + "package/billing/card",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while creating org card. Please contact support."
				);
			}
		} catch (e) {
			console.log("yeah", e.response);
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	fetchTransaction: async (page, queryParams) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const url =
				config.creditManagemetnUrl +
				"transaction/list" +
				(page ? "/" + page : "") +
				(queryParams ? "?" + queryParams : "");
			const options = {
				headers: headers,
			};
			const result = await axios.get(url, options);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching credit transaction. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	insertBank: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.creditManagemetnUrl + "package/billing/bank",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while creating org card. Please contact support."
				);
			}
		} catch (e) {
			console.log("yeah", e.response);
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	sendCreditGiftPoint: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.put(
				config.creditGiftPointnUrl + "gift",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while sending gift points. Please contact support."
				);
			}
		} catch (e) {
			console.log("yeah", e.response);
			if (!typeof e.data === "undefined") {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
};
