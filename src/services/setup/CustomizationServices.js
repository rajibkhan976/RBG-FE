import axios from "axios";
import config from "../../configuration/config";

let headers = {
	"Content-Type": "application/json",
};

export const CustomizationServices = {
	fetchTax: async () => {
		try {
			let url = config.saleTaxUrl + "saletax";
			const result = await axios.get(url, { headers: headers });
			console.log("Customization Service : ", result);
			return result.data;
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
	updateTax: async (payload) => {
		try {
			let url = config.saleTaxUrl + "saletax";
			const result = await axios.put(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error updating tax. Please contact support"
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
	fetchCustomFields: async (pageNumber) => {
		try {
			let url = config.customizationUrl + `list/${pageNumber}`;
			const result = await axios.get(url, { headers: headers });
			return result.data;
		} catch (e) {
			if (!typeof e.data === "undefined") {
				throw new Error(e.response.data.message);
			} else {
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	addCustomField: async (payload) => {
		try {
			let url = config.customizationUrl;
			const result = await axios.post(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on add custom field. Please contact support"
				);
			}
		} catch (e) {
			if (!typeof e.response != undefined) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else {
				console.log(e.stack);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	editCustomField: async (id, payload) => {
		try {
			let url = config.customizationUrl + id;
			const result = await axios.put(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on editing custom field. Please contact support"
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
	deleteCustomField: async (id) => {
		try {
			let url = config.customizationUrl + id;
			const result = await axios.delete(url, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on deleting custom field. Please contact support"
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
	fetchAgeGroup: async () => {
		try {
			let url = config.ageGroup;
			const result = await axios.get(url, { headers: headers });
			return result.data;
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	createAgeGroup: async (payload) => {
		try {
			let url = config.ageGroup;
			const result = await axios.post(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on create age group. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	editAgeGroup: async (payload, id) => {
		try {
			let url = config.ageGroup + id;
			const result = await axios.put(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on editing age group. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	deleteAgeGroup: async (id) => {
		try {
			let url = config.ageGroup + id;
			const result = await axios.delete(url, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on deleting age group. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	fetchProductSizes: async (id) => {
		try {
			let url = config.productSizes;
			if (id != undefined) {
				url = url + "?category=" + id;
			}
			const result = await axios.get(url, { headers: headers });
			return result.data;
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	createProductSize: async (payload) => {
		try {
			let url = config.productSizes;
			const result = await axios.post(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on create product sizes. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	editProductSize: async (payload, id) => {
		try {
			let url = config.productSizes + "/" + id;
			const result = await axios.put(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on editing product sizes. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	deleteProductSize: async (id) => {
		try {
			let url = config.productSizes + "/" + id;
			const result = await axios.delete(url, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on deleting product size. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	fetchProductColors: async (category = null) => {
		try {
			let url = config.productColors;
			if (category) {
				url = url + "?category=" + category;
			}
			const result = await axios.get(url, { headers: headers });
			return result.data;
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	createProductColor: async (payload) => {
		try {
			let url = config.productColors;
			const result = await axios.post(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on create product colors. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	editProductColor: async (payload, id) => {
		try {
			let url = config.productColors + "/" + id;
			const result = await axios.put(url, payload, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on editing product sizes. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
	deleteProductColor: async (id) => {
		try {
			let url = config.productColors + "/" + id;
			const result = await axios.delete(url, { headers: headers });
			if (result.status === 200) {
				return result.data;
			} else {
				throw new Error(
					"There is an error on deleting product size. Please contact support"
				);
			}
		} catch (e) {
			if (e.response && e.response.data && e.response.data.message) {
				console.log(e.response.data.message);
				throw new Error(e.response.data.message);
			} else if (
				e.response &&
				e.response.data &&
				typeof e.response.data == "string"
			) {
				console.log(e.response.data);
				throw new Error(e.response.data);
			} else {
				console.log("Error", e.response);
				throw new Error(e.message + ". Please contact support.");
			}
		}
	},
};
