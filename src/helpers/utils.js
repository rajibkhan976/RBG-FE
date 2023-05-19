import { history } from "./history";
import moment from "moment";

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
    },
    //Next due date
    getNextDueDate: (dueDate, interval, billingCycle) => {
        const now = (dueDate) ? moment(new Date(dueDate)) : moment();
        switch (billingCycle) {
            case "yearly":
                now.add(parseInt(interval), "Y");
                break;
            case "monthly":
                now.add(parseInt(interval), "M");
                break;
            case "weekly":
                now.add(parseInt(interval), "W");
                break;
            case "quarterly":
                now.add(3 * parseInt(interval), "M");
                break;
            case "fortnight":
                now.add(2 * parseInt(interval), "W");
                break;
            case "daily":
                now.add(parseInt(interval), "D");
                break;
        }
        return now.format("MM/DD/YYYY");
    },
    //Capitalize first letter
    capitalizeFirst: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    standardDateFormat: (date) => {
        return moment(date).format("MM/DD/YYYY");
    },

    hasPermission: (entityName, actionName) => {
        const permissions = JSON.parse(localStorage.getItem('permissions'));
        let bool = false;
        const entityIndex = permissions.findIndex(el => el.entity === entityName);
        if (entityIndex > -1) {
            bool = permissions[entityIndex].actions.includes(actionName);
        }
        return bool;
    },
    //Validate and format card no
    getValidCreditCard: (cardNumber) => {

        //Allow only 19
        cardNumber = cardNumber.substr(0, 19).replace(/[^\d ]/g, "");

        let visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        let visaPatternTwo = /^4\d{3}(| |-)(?:\d{4}\1){2}\d{4}$/;
        let visaPatternThree = /^4\d{12}(?:\d{3})?$/;
        let mastPattern = /^(?:5[1-5][0-9]{14})$/;
        let mastPatternTwo = /^5[1-5]\d{14}$/;
        let mastPatternThree = /^5[1-5]\d{2}(| |-)(?:\d{4}\1){2}\d{4}$/;
        let amexPattern = /^(?:3[47][0-9]{13})$/;
        let amexPatternTwo = /^3[47]\d{13,14}$/;
        let amexPatternThree = /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/;
        let discPattern = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
        let discPatternTwo = /^6(?:011|5\d\d)(| |-)(?:\d{4}\1){2}\d{4}$/
        let discPatternThree = /^(?:6011\d{12})|(?:65\d{14})$/

        let isValidCard = amexPattern.test(cardNumber) ||
            amexPatternTwo.test(cardNumber) ||
            amexPatternThree.test(cardNumber) ||
            visaPattern.test(cardNumber) ||
            visaPatternTwo.test(cardNumber) ||
            visaPatternThree.test(cardNumber) ||
            mastPattern.test(cardNumber) ||
            mastPatternTwo.test(cardNumber) ||
            mastPatternThree.test(cardNumber) ||
            discPattern.test(cardNumber) ||
            discPatternTwo.test(cardNumber) ||
            discPatternThree.test(cardNumber);


        return isValidCard;
    },
    getFormattedCardNumber: (cardNumber) => {
        // Split the card number is groups of 4
        let formattedCardNumber;
        let cardNumberSections = cardNumber.match(/\d{1,4}/g);
        if (cardNumberSections) {
            formattedCardNumber = cardNumberSections.join("-");
            console.log("formattedCardNumber", formattedCardNumber);
            if (formattedCardNumber.length > 19) {
                formattedCardNumber = formattedCardNumber.substr(0, 19);
            }
        }
        return formattedCardNumber;
    },
    validateExpiryDate: (date) => {

        let formattedCardExpairy = date.replace(/[^\d]/g, "");
        formattedCardExpairy = formattedCardExpairy.substring(0, 6);

        let cardExpairySectionsMonth = formattedCardExpairy.slice(0, 2);
        let cardExpairySectionsYear = formattedCardExpairy.slice(2, 6);

        let isValid = (cardExpairySectionsMonth.length === 2)
            && (cardExpairySectionsYear.length === 4)
        console.log('util is valid date', isValid);
        return isValid;
    },
    getFormattedExpiryDate: (date) => {
        let formattedCardExpairy = date.replace(/[^\d]/g, "");
        formattedCardExpairy = formattedCardExpairy.substring(0, 6);

        var cardExpairySectionsMonth = formattedCardExpairy.slice(0, 2);
        var cardExpairySectionsYear = formattedCardExpairy.slice(2, 6);

        if (cardExpairySectionsMonth > 0 && cardExpairySectionsYear > 0) {
            formattedCardExpairy =
                cardExpairySectionsMonth + "/" + cardExpairySectionsYear;
        } else if (formattedCardExpairy <= 2) {
            formattedCardExpairy = cardExpairySectionsMonth;
        }

        console.log('Formatted Exp d', formattedCardExpairy)

        return formattedCardExpairy;
    },
    /**
     * Convert UTC time to provided Timezone : Need to call this function in listing data only
     * @param {2022-08-08 07:55:40} date 
     * @param {UTC−05} utcOffset 
     * @param {Any locale aware formats of momentjs (ex : LLL)} dateFormat 
     * @returns 
     */
    convertUTCToTimezone(date, utcOffset = null, dateFormat = "LLL") {
        // console.log("date in convert utc to timezone function",date)
        // console.log("Utc offset in utc to timezone function",utcOffset)
        const formattedDate = moment.utc(date);
        if (!utcOffset) return "ERROR : Please send utc offset in order to convert the provided date & time";
        // if (!utcOffset) return formattedDate.format(dateFormat);
        const timezoneDate = moment.utc(formattedDate, null).utcOffset(utcOffset.split('UTC')[1].replace("−","-"));

        // console.log("final timezone conversion",timezoneDate.format(dateFormat))
        return timezoneDate.format(dateFormat)
    },

    /**
     * Convert Timezone to UTC - Need to call this func in all date inputs before sending the data to backend only
     * @param {2022-08-08 07:55:40} date 
     * @param {UTC−05}} utcOffset 
     * @param {Any locale aware formats of momentjs (ex : LLL / "")} dateFormat 
     * @returns 
     */
    convertTimezoneToUTC(date, utcOffset = null, dateFormat = "") {
        // console.log("date formate", date, utcOffset, dateFormat);
        let dateWithOffset = date.concat(utcOffset?.split('UTC')[1].replace("−","-"))
        console.log("date with offset",dateWithOffset)
        const formattedDate = moment(dateWithOffset);
        // console.log("formatted date",formattedDate)
        if (!utcOffset) return "ERROR : Please send utc offset in order to convert the provided date & time";
        return moment.utc(formattedDate).format(dateFormat).replace("T", " ").replace("Z", " ");
        // return moment.utc(formattedDate).format(dateFormat);
    },
 
    
    encodeHTML: (html) => {
        return Buffer.from(html).toString('base64');
    },
    decodeHTML: (encodedStr) => {
        return Buffer.from(encodedStr, 'base64').toString();
    },
    dateDiff: (toDate, fromDate = null) => {
        const startDate = fromDate || moment();
        const endDate = moment(toDate);
        const difference = startDate.diff(endDate, 'days');
        return {
            isUpcoming: (Math.sign(difference) === -1) ? true : false,
            difference: Math.abs(difference)
        };
    },


    timeConversion: (amPmString)=> { 
        const [time, modifier] = amPmString.split(' ');
        let [hours, minutes] = time.split(':');
        let millisecond  = "00"
        if(hours === '12'){
            hours = '0'
        }
        if(modifier === 'PM'){
            hours = parseInt(hours, 10) + 12;
        }
        if(hours <= 9){
            hours = `0${hours}`
        }
        return `${hours}:${minutes}:${millisecond}`
    },
    
    dateConversion(dateString){
        let date = new Date(dateString + " 00:00:00");
        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();
        return `${y}-${(m<=9? '0' + m : m )}-${(d<=9 ? '0'+ d : d)}`;
    }
}