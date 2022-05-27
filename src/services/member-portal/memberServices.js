import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Content-Type": "application/json"
};
const MemberServices = {
  accessCodeVerification: async (payload) => {
    try {
      const url = config.memberCheckInPortal + "/auth";
      const result = await axios.post(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
            "There is an error verify your access code. Please contact support"
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
  memberSearch: async (payload) => {
    try {
      let url = config.memberCheckInPortal + "/search";
      const result = await axios.get(url, {params: payload}, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
            "There is an error to search your name. Please contact support"
        );
      }
    } catch (e) {
      if (e ?. response ?. status === 401) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      } else if(e.response && e.response.data && e.response.data.message) {
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
      let url = config.memberCheckInPortal + "/check-in-status/" + contactId;
      const result = await axios.get(url, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
            "There is an error in check in. Please contact support"
        );
      }
    } catch (e) {
      if (e ?. response ?. status === 401) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      } else if(e.response && e.response.data && e.response.data.message) {
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
  checkIn: async (payload) => {
    try {
      let url = config.memberCheckInPortal + "/check-in";
      const result = await axios.post(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
            "There is an error to check in. Please contact support"
        );
      }
    } catch (e) {
      if (e ?. response ?. status === 401) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      } else if(e.response && e.response.data && e.response.data.message) {
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
  }
};
export default MemberServices;
