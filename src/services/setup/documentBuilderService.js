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
			} else if (e.response && e.response.data) {
				throw new Error(e.response.data);
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
	createContractDocument: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.documentBuilderUrl + "/document",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while creating contract document. Please contact support."
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
	updateContractDocumentById: async (payload, id) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.put(
				config.documentBuilderUrl + `/document/update/${id}`,
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while updating document. Please contact support."
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
	fetchContractDocuments: async (queryParams = null) => {
		try {
			// const hasPermission = utils.hasPermission("product","read");
			// if(!hasPermission) throw new Error("You do not have permission");
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.get(
				config.documentBuilderUrl +
					"/document/list" +
					(queryParams ? "?" + decodeURI(queryParams) : ""),
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching contract documents. Please contact support."
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
	fetchContractDocumentById: async (id) => {
		try {
			// const hasPermission = utils.hasPermission("product","read");
			// if(!hasPermission) throw new Error("You do not have permission");
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.get(
				config.documentBuilderUrl + `/document/list/${id}`,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching contract document. Please contact support."
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
	deleteContractDocumentById: async (id) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.delete(
				config.documentBuilderUrl + `/document/remove/${id}`,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while deleting document. Please contact support."
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
	signContractDocument: async (payload) => {
		try {
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.post(
				config.documentBuilderUrl + "/contract",
				payload,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while signing contract. Please contact support."
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
	fetchContractDocumenstByContactId: async (contactId) => {
		try {
			// const hasPermission = utils.hasPermission("product","read");
			// if(!hasPermission) throw new Error("You do not have permission");
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.get(
				config.documentBuilderUrl + `/contract/${contactId}/list`,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching contract document. Please contact support."
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
	fetchContractDocumenstByContactIdAndContractId: async (
		contactId,
		contractId
	) => {
		try {
			// const hasPermission = utils.hasPermission("product","read");
			// if(!hasPermission) throw new Error("You do not have permission");
			if (isLoggedIn() === false) {
				throw new Error(message.loginFailed);
			}
			const options = {
				headers: headers,
			};
			const result = await axios.get(
				config.documentBuilderUrl + `/contract/${contactId}/list/${contractId}`,
				options
			);
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an issue while fetching contract document. Please contact support."
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
