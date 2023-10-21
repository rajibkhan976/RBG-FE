import * as actionTypes from "./types";
import { DocumentBuilderService } from "../services/setup/documentBuilderService";

export const getDocumentCategory = () => {
	return async (dispatch) => {
		DocumentBuilderService.fetchDocumentCategories()
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.FETCH_DOCUMENT_CATEGORY,
						data: response?.data,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Fetching categories failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const createDocumentCategory = (payload) => {
	return async (dispatch) => {
		DocumentBuilderService.createDocumentCategory(payload)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.CREATE_DOCUMENT_CATEGORY,
						data: response,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Creating category failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const updateDocumentCategory = (payload, id) => {
	return async (dispatch) => {
		DocumentBuilderService.updateDocumentCategoryById(payload, id)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.UPDATE_DOCUMENT_CATEGORY,
						data: response,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Updating category failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const deleteDocumentCategory = (id) => {
	return async (dispatch) => {
		DocumentBuilderService.deleteDocumentCategoryById(id)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.DELETE_DOCUMENT_CATEGORY,
						data: response,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Deleting category failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const createContractDocument = (payload) => {
	return async (dispatch) => {
		DocumentBuilderService.createContractDocument(payload)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.CREATE_CONTRACT_DOCUMENT,
						data: response,
					});
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: response?.message,
						typeMessage: "success",
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Creating document failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const updateContractDocument = (payload, id) => {
	return async (dispatch) => {
		DocumentBuilderService.updateContractDocumentById(payload, id)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.UPDATE_CONTRACT_DOCUMENT,
						data: response,
					});
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: response?.message,
						typeMessage: "success",
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Updating document failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const getContractDocuments = (queryParams) => {
	return async (dispatch) => {
		DocumentBuilderService.fetchContractDocuments(queryParams)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.FETCH_CONTRACT_DOCUMENTS,
						data: response?.data,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Fetching documents failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const getContractDocumentById = (id) => {
	return async (dispatch) => {
		DocumentBuilderService.fetchContractDocumentById(id)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.FETCH_CONTRACT_DOCUMENT,
						data: response?.data,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Fetching document failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const deleteContractDocument = (id) => {
	return async (dispatch) => {
		DocumentBuilderService.deleteContractDocumentById(id)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.DELETE_CONTRACT_DOCUMENT,
						data: response,
					});
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: response?.message,
						typeMessage: "success",
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Deleting document failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const signContractDocument = (payload) => {
	return async (dispatch) => {
		DocumentBuilderService.signContractDocument(payload)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.SIGN_CONTRACT_DOCUMENT,
						data: response,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Signing contract failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const getContractDocumentsByContactId = (contactId) => {
	return async (dispatch) => {
		DocumentBuilderService.fetchContractDocumenstByContactId(contactId)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.FETCH_CONTRACT_DOCUMENTS_BY_CONTACTID,
						data: response?.data,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Fetching document failed",
						typeMessage: "error",
					});
				}
			});
	};
};

export const getContractDocumentsByContactIdAndContractId = (
	contactId,
	contractId
) => {
	return async (dispatch) => {
		DocumentBuilderService.fetchContractDocumenstByContactIdAndContractId(
			contactId,
			contractId
		)
			.then((response) => {
				if (response) {
					dispatch({
						type: actionTypes.FETCH_CONTRACT_DOCUMENT_BY_CONTACTID_CONTRACTID,
						data: response?.data,
					});
				}
			})
			.catch((error) => {
				if (error) {
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Fetching document failed",
						typeMessage: "error",
					});
				}
			});
	};
};
