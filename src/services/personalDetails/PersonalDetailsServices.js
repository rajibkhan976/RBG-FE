import axios from "axios";
import config, { countryUrl, timezoneListURL, timezoneLatLngUrl } from "../../configuration/config";
import { message } from "../../helpers";

let headers = {
    "Content-Type": "application/json",
};

export const PersonalDetailsServices = {
    fetchCountryDetail: async () => {
        try {
            const url = config.countryUrl;
            const result = await axios.get(url, { headers: headers });
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
  fetchTimeZoneLatLng: async (lat, lng) => {
      const url = config.timezoneLatLngUrl + "&format=json&lat=" + lat + "&lng=" + lng;
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