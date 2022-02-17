import { history } from "./history";

export const utils = {
    /**
     * Get query string form url
     * @param {*} variable
     */
    getQueryVariable: (variable) => {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return false;
    },
    /**
     * Add query parameter
     */
    addQueryParameter: (param, value) => {
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set(param, value);
        history.push(
            window.location.pathname + "?" + currentUrlParams.toString()
        );
    },
    /**
     * Remove query parameter
     */
    removeQueryParameter: (param) => {
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.delete(param);
        history.push(
            window.location.pathname + "?" + currentUrlParams.toString()
        );
    },
    /**
     * Organize the permission object
     * @param {Object} permissionObj Permission object which is being sent by backend
     */
    organizePermissions: (permissionObj) => {
        try {
            const permissions = [...permissionObj];
            const organizedPermissions = permissions.map(el => {
                const mergedActions = [];
                el.actions.forEach((action, index) => {
                    mergedActions.push(action);
                });
                return {
                    "entity": el.entity,
                    "actions": mergedActions
                }
            });

            return organizedPermissions;
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Format time
     * @param {*} secs 
     * @returns 
     */
    formatSecondsAsTime: (secs) => {
        var hr = Math.floor(secs / 3600);
        var min = Math.floor((secs - (hr * 3600)) / 60);
        var sec = Math.floor(secs - (hr * 3600) - (min * 60));

        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        if (isNaN(min)) {
            min = "0"
        }
        if (isNaN(sec)) {
            sec = "0"
        }

        return min + ':' + sec;
    },
    /**
     * Generate excerpt
     * @param {*} str 
     * @returns 
     */
    generateExcerpt: (str) => {
        return (str.length > 12) ? str.substr(0, 12) + '...' : str;
    }
}