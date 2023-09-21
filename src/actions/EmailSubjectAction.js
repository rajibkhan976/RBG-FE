import * as actionTypes from "./types";
import { SMSServices } from "../services/template/SMSServices";
import { CustomizationServices } from "../services/setup/CustomizationServices";

export const EmailSubjectAction = ()=>{
    return (dispatch)=>{
        // dispatch({
        //     type: actionTypes.FETCH_SUBJECT_REQUEST
        // });
        return new Promise((resolve, reject) => {
            SMSServices.fetchSMSTags().then(response => {
                    //console.log('Auth actions response', response);
                    if (response) {
                        // console.log("Response", response);
                        dispatch({
                            type: actionTypes.FETCH_SUBJECT_SUCCESS,
                            payload: response
                        })
                        resolve();
                    }
                })
                .catch(error => {
                    if (error) {
                        //console.log('Auth actions error', error.response.data);
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: error.message,
                            typeMessage: 'error'
                        })
                        dispatch({
                            type: actionTypes.FETCH_SUBJECT_FAILURE,
                            payload: error.message
                        })
                    }
                    reject();
                });
        });
    }
}

export const deleteEmailSubjectAction = (customerId)=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			CustomizationServices?.deleteCustomField(customerId)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.DELETE_SUBJECT,
							payload: response,
						});
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: response.message,
                            typeMessage: 'success'
                        })
						resolve();
					}
				})
				.catch((error) => {
					if (error) {
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: error.message,
							typeMessage: "error",
						});
						// dispatch({
						// 	type: actionTypes.TAG_SERVICE_REQUEST_FAILED,
						// 	data: true,
						// });
						reject();
					}
				});
		});
	};
}

export const saveEmailSubjectAction = (payload)=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			CustomizationServices?.addCustomField(payload)
				.then((response) => {
					if (response) {
                        // console.log("Customer fields for contacts redux save", response);
						dispatch({
							type: actionTypes.SAVE_FILTER_LIST,
							payload: response,
						});
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: "Customer field add successfully",
							typeMessage: "success",
						});
						resolve();
					}
				})
				.catch((error) => {
					if (error) {
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: error.message,
							typeMessage: "error",
						});
						reject();
					}
				});
		});
	};
}

export const fetchCustomerListAction = (pageNumber)=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			CustomizationServices?.fetchCustomFields(pageNumber)
				.then((response) => {
					if (response) {
						// console.log("Customer list", response);
						dispatch({
							type: actionTypes.FETCH_CUSTOMER_LIST,
							payload: response,
						});
						resolve();
					}
				})
				.catch((error) => {
					if (error) {
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: error.message,
							typeMessage: "error",
						});
						reject();
					}
				});
		});
	};
}

export const editCustomerFieldAction = (id, payload)=>{
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			CustomizationServices?.editCustomField(id, payload)
				.then((response) => {
					if (response) {
                        // console.log("Customer fields edit", response);
						dispatch({
							type: actionTypes.EDIT_CUSTOMER_FIELD,
							payload: response,
						});
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: "Customer field edit successfully",
							typeMessage: "success",
						});
						resolve();
					}
				})
				.catch((error) => {
					if (error) {
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: error.message,
							typeMessage: "error",
						});
						reject();
					}
				});
		});
	};
}

