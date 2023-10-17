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
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
};
