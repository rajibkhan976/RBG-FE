import * as actionTypes from "./types";
import { DocumentBuilderService } from "../services/document/document";

export const getDocumentCategory = () => {
	return async (dispatch) => {
		return DocumentBuilderService.fetchDocumentCategories()
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
						message: error,
						typeMessage: "error",
					});
				}
			});
	};
};
