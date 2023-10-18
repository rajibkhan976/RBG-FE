import axios from "axios";
import config from "../../configuration/config";
import { isLoggedIn } from "../authentication/AuthServices";
import { message } from "../../helpers";

let headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const DocumentBuilderService = {
	fetchDocumentCategories: async () => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const url = config.documentBuilderUrl + "/category/list";
			const options = {
				headers: headers,
			};
			const result = await axios.get(url, options);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching document categories. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				throw new Error(e.response.data.message);
			} else {
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	createDocumentCategory: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.documentBuilderUrl + "/category",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while creating document category. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	updateDocumentCategoryById: async (payload, id) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.put(
				config.documentBuilderUrl + `/category/update/${id}`,
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while updating document category. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	deleteDocumentCategoryById: async (id) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.delete(
				config.documentBuilderUrl + `/category/delete/${id}`,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while deleting document category. Please contact support."
				);
			}
		} catch (e) {
			if (!typeof e.data === "undefined") {
				throw new Error(e.response.data.message);
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
			} else {
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
};
