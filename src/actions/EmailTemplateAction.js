import * as actionTypes from "../actions/types";
import { EmailServices } from "../services/setup/EmailServices";

export const EmailTemplateAction = (all, pageId, queryParams )=>{
    // console.log("Email template paramiter", all, pageId, queryParams);
    return (dispatch)=>{
        return new Promise((resolve, reject) => {
            EmailServices.fetchEmailTemplateList(all, pageId, queryParams).then(response => {
                    //console.log('Auth actions response', response);
                    if (response) {
                        // console.log("Email template list", response);
                        dispatch({
                            type: actionTypes.FETCH_TEMPLATE_SUCCESS,
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
							typeMessage: "error",
						});
                        dispatch({
                            type: actionTypes.FETCH_TEMPLATE_FAILURE,
                            payload : error.message
                        })
                    }
                    reject();
                });
        });
    }
}

export const saveTemplate = (payload)=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			EmailServices?.emailTemplateCreate(payload)
				.then((response) => {
					if (response) {
                        // console.log("Email template successfully", response);
						dispatch({
							type: actionTypes.SAVE_EMAIL_TEMPLATE,
							payload: response,
						});
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: "Email template created successfully",
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

export const deleteEmailTemplate = (templateId)=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			EmailServices?.emailTemplateDelete(templateId)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.DELETE_EMAIL_TEMPLATE,
							payload: response,
						});
                        dispatch({
                            type: actionTypes.SHOW_MESSAGE,
                            message: response.message,
                            typeMessage: 'success'
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

export const updateEmailTemplateAction = (payload, deletedId)=>{
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			EmailServices?.templateEmailUpdate(payload, deletedId)
				.then((response) => {
					if (response) {
                        // console.log("Email template successfully", response);
						dispatch({
							type: actionTypes.UPDATE_EMAIL_TEMPLATE,
							payload: response,
						});
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: response.message,
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