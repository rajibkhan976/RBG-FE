import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Content-Type": "application/json",
};

export const BillingServices = {
  fetchCardBank: async (contactId = null) => {
    try {
      const url = config.billingUrl + "list/" + contactId;
      const result = await axios.get(url, { headers: headers });
      return result.data;
    } catch (e) {
      if (!typeof e.data === "undefined") {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.stack);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  activeCard: async (payload) => {
    console.log("====================================");
    console.log("payload", payload);
    console.log("====================================");
    try {
      const url = config.billingUrl + "makeactive";
      const result = await axios.put(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
          "There is an error updating product. Please contact support"
        );
      }
    } catch (e) {
      if (!typeof e.data === "undefined") {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.stack);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  makePrimary: async (payload) => {
    try {
      const url = config.billingUrl + "makeprimary";
      const result = await axios.put(url, payload, { headers: headers });
      return result.data;
    } catch (e) {
      if (!typeof e.data === "undefined") {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.stack);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  addCard: async (payload) => {
    try {
      const url = config.billingUrl + "card";
      const result = await axios.post(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
          "There is an error adding this Card. Please contact support"
        );
      }
    } catch (e) {
      console.log(e.response.data);
      throw new Error(
        e.response.data.message
      )
    }
  },
  addBank: async (payload) => {
    try {
      const url = config.billingUrl + "bank";
      const result = await axios.post(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
          "There is an error adding this Bank Account. Please contact support"
        );
      }
    } catch (e) {
      console.log(e.response.data.message);
      throw new Error(e.response.data.message);
    }
  },
  //   editRole: async (payload) => {
  //     try {
  //       const url = config.roleUrl + "/" + payload.id;
  //       const result = await axios.put(url, payload, { headers: headers });
  //       if (result.status === 200) {
  //         return result.data;
  //       } else {
  //         throw new Error(
  //           "There is an error updating Role. Please contact support"
  //         );
  //       }
  //     } catch (e) {
  //       if (!typeof e.data === "undefined") {
  //         console.log(e.response.data.message);
  //         throw new Error(e.response.data.message);
  //       } else {
  //         console.log(e.stack);
  //         throw new Error(e.message + ". Please contact support.");
  //       }
  //     }
  //   },
  updateRingtone: async (payload) => {
    try {
      const url = config.ringtoneUrl + "create";
      const result = await axios.post(url, payload, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
          "There is an error updating Ringtone. Please contact support"
        );
      }
    } catch (e) {
      if (!typeof e.data === "undefined") {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.stack);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
  deleteRingtone: async (id) => {
    // axios
    //     .delete(
    //         config.ringtoneUrl + "delete/" + id,
    //         { headers: headers }
    //     );

    try {
      const url = config.ringtoneUrl + "delete/" + id;
      const result = await axios.delete(url, { headers: headers });
      if (result.status === 200) {
        return result.data;
      } else {
        throw new Error(
          "There is an error in Deleting Ringtone. Please contact support"
        );
      }
    } catch (e) {
      if (!typeof e.data === "undefined") {
        console.log(e.response.data.message);
        throw new Error(e.response.data.message);
      } else {
        console.log(e.stack);
        throw new Error(e.message + ". Please contact support.");
      }
    }
  },
};
