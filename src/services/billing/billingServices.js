import axios from "axios";
import config from "../../configuration/config";

let headers = {
  "Content-Type": "application/json",
};

export const BillingServices = {
  fetchCardBank: async () => {
    try {
      const url = config.billingUrl + "list/618cfc610bd605dd51cbc0b7";
      const result = await axios.get(url, { headers: headers });
      //   console.log("Billing Service : ", result);
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
  activeCard: async (card = {}) => {
    console.log("ACTIVE CARD BILLINGSERVICES.JS", card);
    var payload = {
      method: "put",
      url: config.billingUrl + "makeactive",
      data: card,
    };
    axios(payload)
      .then(function (response) {
        console.log("RESPONSE ACTIVE CARD", response);
      })
      .catch(function (error) {
        console.log("ERROR ACTIVE CARD", error);
      });
    // try {
    //   console.log("card : ", card);
    //   const url = config.billingUrl + "makeactive";
    //   const result = await axios.put(url, card, { headers: headers });
    //   console.log("result : ", result);
    //   if (result.status === 200) {
    //     console.log("result : ", result);
    //     // return result.data;
    //   } else {
    //     throw new Error(
    //       "There is an error updating category. Please contact support"
    //     );
    //   }
    //   if (result.status === 200) {
    //     return result.data;
    //   } else {
    //     throw new Error(result.data.message);
    //   }
    // } catch (e) {
    //   throw new Error(e.response.data.message);
    // }
  },
  makePrimary: (id, type) => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          "https://tt7n78ndd2.execute-api.us-east-1.amazonaws.com/dev/contact/billing/makeprimary",
          {
            contactID: id,
            accountType: type,
          },
          headers
        )
        .then((res) => {
          console.log("res :::", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("err::::", err);
          reject(err);
        });
    });
    // try {
    //   console.log("card : ", primaryPayload);
    //   const url = config.billingUrl + "makeprimary";
    //   const result = await axios.put(url, primaryPayload, { headers: headers });
    //   console.log("result : ", result);
    //   if (result.status === 200) {
    //     //   console.log("result : ", result);
    //     return result.data;
    //   } else {
    //     throw new Error(
    //       "There is an error updating category. Please contact support"
    //     );
    //   }
    //   //   if (result.status === 200) {
    //   //     return result.data;
    //   //   } else {
    //   //     throw new Error(result.data.message);
    //   //   }
    // } catch (e) {
    //   throw new Error(e.response.data.message);
    // }
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
