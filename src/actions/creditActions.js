import * as actionTypes from "./types";
import { OrganizationServices } from "../services/authentication/OrganizationServices";
import { CreditManagementServices } from "../services/setup/CreditManagementServices";

export const getOrganizationsList = (page) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			OrganizationServices.fetchOrganizations(page)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.FETCH_ALL_ORGANIZATIONS_LIST,
							data: response,
						});
						resolve();
					}
				})
				.catch((error) => {
					if (error) {
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: error,
							typeMessage: "error",
						});
						reject();
					}
				});
		});
	};
};

export const sendCreditGiftPoint = (payload) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			CreditManagementServices.sendCreditGiftPoint(payload)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.SEND_CREDIT_GIFT_POINT,
							data: response,
						});
						resolve();
					}
				})
				.catch((error) => {
					if (error) {
						dispatch({
							type: actionTypes.SEND_CREDIT_GIFT_POINT,
							data: "Error",
						});
						reject();
					}
				});
		});
	};
};
