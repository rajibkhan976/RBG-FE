import * as actionTypes from "./types";
import { DocumentBuilderService } from "../services/document/documentBuilderService";

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
