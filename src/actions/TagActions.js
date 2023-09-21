import * as actionTypes from "./types";
import { TagServices } from "../services/setup/tagServices";
import { AppointmentServices } from "../services/appointment/appointment";
export const getTagListData = (pageNumber, keyword) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			TagServices?.fetchTags(pageNumber, keyword)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.FETCH_TAG_LIST_DATA,
							data: response,
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
};

export const saveTag = (data) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			TagServices?.saveTag(data)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.SAVE_TAG_TO_LIST,
							data: response,
						});
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: "New tag created successfully",
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
};

export const removeTag = (tagId) => {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			TagServices?.deleteTag(tagId)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.DELETE_TAG_FROM_LIST,
							data: { response, tagId },
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
						dispatch({
							type: actionTypes.TAG_SERVICE_REQUEST_FAILED,
							data: true,
						});
						reject();
					}
				});
		});
	};
};


export const addTagFromAppointment = (tagId, payload)=>{
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			AppointmentServices?.addTagToAppointment(tagId, payload)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.APPOINTMENT_SAVE_TAG_DATA,
							data: response,
						});
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: "New tag added successfully",
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

export const removeTagFromAppointment = (tagId, payload)=>{
	return (dispatch)=>{
		return new Promise((resolve, reject) =>{
			AppointmentServices.removeTagFromAppointment(tagId, payload)
			.then((response)=>{
				if(response){
					dispatch({
						type: actionTypes.APPOINTMENT_REMOVE_TAG_DATA,
						data : response
					})
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: "Remove tag Successfully",
						typeMessage: "success"
					});
					resolve()
				}
			})
			.catch((error) =>{
				if(error){
					dispatch({
						type: actionTypes.SHOW_MESSAGE,
						message: error.message,
						typeMessage: "error"
					});
					reject();
				}
			})
		})
	}
}