import axios from "axios";
import config from "../../configuration/config";
import {
  message
} from "../../helpers";

let headers = {
  "Content-Type": "application/json",
};

export const PersonalDetailsServices = {
  fetchCountryDetail: async () => {
    try {
      const url = config.countryUrl;
      const result = await axios.get(url, {
        headers: headers
      });
      console.log('Personal Detail Country Services : ', result);
      return result.data;
    } catch (e) {
      if (!typeof e.data === 'undefined') {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.stack);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },


  fetchPersonalDetail: async () => {
    try {
      const url = config.personalDetailsUrl + "/personal-details";
      const result = await axios.get(url, {
        headers: headers
      });
      console.log('Personal Detail Infos : ', result);
      return result.data;
    } catch (e) {
      if (!typeof e.data === 'undefined') {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.stack);
        throw new Error(e.message + ". Please contact support.");
      }

    }
  },
  updateAccountDetail: async (payload) => {
    try {
      const url = config.personalDetailsUrl + "/account-details";
      const result = await axios.put(url, payload, {
        headers: headers
      });
      return result.data;
    } catch (e) {
      if(!typeof e.data === 'undefined') {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else if (e.response && typeof e.response.data == "string") {
          throw new Error("Error: " + e.response.data);
      } else {
          console.log(e.stack);
          throw new Error(e.message + ". Please contact support.");
      }
    }
  },


  updateBasicSetting: async (payload) => {
    try {
      const url = config.personalDetailsUrl + "/basic-settings";
      const result = await axios.put(url, payload, {
        headers: headers
      });
      return result.data;
    } catch (e) {
      if(!typeof e.data === 'undefined') {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else if (e.response && typeof e.response.data == "string") {
          throw new Error("Error: " + e.response.data);
      } else {
          console.log(e.stack);
          throw new Error(e.message + ". Please contact support.");
      }
    }
  },



  fetchTimeZoneList: async () => {
    const url = config.timezoneListURL;
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log('error', error.response.data);
      return error.response.data;
    }
  },
};