import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Content-Type": "application/json",
};

export const DashboardServices = {
  fetchMRRG: async (month = 1, year = 2021) => {
    try {
      const url = config.dashboardWidgetsUrl + `mrr?month=${month}&year=${year}`
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        let errorMessage = e.response.data.message
        return errorMessage

        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        let errorMessage = e.response.data
        console.log(e.response.data);
        return errorMessage

        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        let errorMessage = e.response
        return errorMessage
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchAppointmentsScheduled: async (days = 0) => {
    try {
      const url = config.dashboardWidgetsUrl + `appointments-scheduled?days=${days}`
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        let errorMessage = e.response.data.message
        return errorMessage

        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        let errorMessage = e.response.data
        console.log(e.response.data);
        return errorMessage

        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        let errorMessage = e.response
        return errorMessage
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchAdditionalRevenue: async (month = 1, year = 2022) => {
    try {
      const url = config.dashboardWidgetsUrl + `additional-revenue?month=${month}&year=${year}`
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        let errorMessage = e.response.data.message
        return errorMessage

        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        let errorMessage = e.response.data
        console.log(e.response.data);
        return errorMessage

        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        let errorMessage = e.response
        return errorMessage
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchAppointmentsShowed: async (month = 1, year = 2022) => {
    try {
      const url = config.dashboardWidgetsUrl + `appointments-showed?month=${month}&year=${year}`
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        let errorMessage = e.response.data.message
        return errorMessage

        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        let errorMessage = e.response.data
        console.log(e.response.data);
        return errorMessage

        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        let errorMessage = e.response
        return errorMessage
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchAppointmentsCanceled: async (month = 1, year = 2022) => {
    try {
      const url = config.dashboardWidgetsUrl + `appointments-canceled?month=${month}&year=${year}`
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        let errorMessage = e.response.data.message
        return errorMessage

        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        let errorMessage = e.response.data
        console.log(e.response.data);
        return errorMessage

        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        let errorMessage = e.response
        return errorMessage
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchNewContacts: async (days = 0) => {
    try {
      const url = config.dashboardWidgetsUrl + `new-contacts?days=${days}`
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        let errorMessage = e.response.data.message
        return errorMessage

        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        let errorMessage = e.response.data
        console.log(e.response.data);
        return errorMessage

        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        let errorMessage = e.response
        return errorMessage
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  fetchRetention: async (days = 30) => {
    try {
      const url = config.dashboardWidgetsUrl + `retention?days=${days}`
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message) {
        console.log(e.response.data.message);
        let errorMessage = e.response.data.message
        return errorMessage

        throw new Error(e.response.data.message);
      } else if(e.response && e.response.data && typeof e.response.data == "string") {
        let errorMessage = e.response.data
        console.log(e.response.data);
        return errorMessage

        throw new Error(e.response.data);
      } else {
        console.log("Error", e.response);
        let errorMessage = e.response
        return errorMessage
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  setGoal: async (payload) => {
      try {
         const url = config.dashboardWidgetGoalUrl + `goal`
            const result = await axios.put(url, payload, { headers: headers });
            if (result.status === 200) {
                return result.data;
            } else {
                throw new Error("There is an error updating Goal. Please contact support");
            }
        } catch (e) {
            if (!typeof e.data === 'undefined') {
                console.log(e.response.data.message);
                throw new Error(e.response.data.message);
            } else {
                console.log(e.stack);
                throw new Error(e.message + ". Please contact support.");
            }
        }
  }
       
}

