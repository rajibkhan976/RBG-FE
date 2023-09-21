import * as actionTypes from "../actions/types";
import { ContactService } from "../services/contact/ContactServices"
import {StatusServices} from "../services/contact/StatusServices";
import {PhasesServices} from "../services/contact/phasesServices";
export const FilterAction = ()=>{
    return (dispatch)=>{
        return new Promise((resolve, reject) => {
            ContactService?.fetchFilters().then(response => {
                    //console.log('Auth actions response', response);
                    if (response) {
                        dispatch({
                            type: actionTypes.FETCH_FILTER_SUCCESS,
                            payload: response
                        })
                        resolve();
                    }
                })
                .catch(error => {
                    if (error) {
                        dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: error.message,
							typeMessage: "error",
						});
                        dispatch({
                            type: actionTypes.FETCH_FILTER_FAILURE,
                            payload: error.message
                        })
                    }
                    reject();
                });
        });
    }
}
export const saveStatusAction = (payload)=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			StatusServices?.saveStatus(payload)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.SAVE_FILTER_LIST,
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
export const statusPhaseListAction = ()=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			PhasesServices?.fetchPhases()
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.FETCH_FILTER_LIST,
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

export const deleteStatusAction = (statusId)=>{
    return (dispatch) => {
		return new Promise((resolve, reject) => {
			StatusServices?.deleteStatus(statusId)
				.then((response) => {
					if (response) {
						dispatch({
							type: actionTypes.DELETE_STATUS_LIST,
							payload: response,
						});
						dispatch({
							type: actionTypes.SHOW_MESSAGE,
							message: 'Status deleted successfully.',
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
					
						reject();
					}
				});
		});
	};
}