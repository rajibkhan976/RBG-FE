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
    }
}