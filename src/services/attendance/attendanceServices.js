import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Content-Type": "application/json",
};

export const AttendanceServices = {
  fetchAccessCode: async (contactId = null) => {
    try {
      let url = config.attendaneUrl + "/access-code";
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log("res",e.response.data.message);
        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        console.log(e.response.data);
        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchAccessCodeGenerate: async (payload) => {
    try {
      let url = config.attendaneUrl + "/access-code";
      const result = await axios.put(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
            "There is an error updating. Please contact support"
        );
      }
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        console.log(e.response.data);
        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },

  //stuffAttendance

  checkInByStaff: async (payload) => {
    try {
      let url = config.attendaneUrl + "/contact/attendance/check-in-by-staff";
      const result = await axios.post(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Check in failed");
      }
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        console.log(e.response.data);
        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  checkInStatus: async (contactId) => {
    try {
      let url = config.attendaneUrl + "/contact/attendance/checkin-status/" + contactId;
      const result = await axios.get(url, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error("Check in failed");
      }
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        console.log(e.response.data);
        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchAttendances: async (payload, contactId, pageId) => {
    try {
      let url = config.attendaneUrl + "/attendance";

      if (contactId) {
        url = config.attendaneUrl + "/contact/attendance/" + contactId;
      }
      if (pageId) {
        url += "/" + pageId
      }
      const result = await axios.get(url,{params: payload}, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
            "There is an error updating. Please contact support"
        );
      }
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        console.log(e.response.data);
        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
};
