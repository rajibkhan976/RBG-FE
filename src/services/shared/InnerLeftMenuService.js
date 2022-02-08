import axios from "axios";
import config from "../../configuration/config";

let headers = {
    "Content-Type": "application/json",
    'Accept': 'application/json',   
};

export const InnerLeftMenuServices = {
    fetchCounts: async () => {
        headers.Authorization = localStorage.getItem("_token");
        try {
            const result = await axios.get(config.innerLeftMenuApiUrl, { headers: headers });
            return result.data;
        } catch (e) {
            console.log("fetchCounts() service error result", e);
            throw new Error(e);
        }
    }
}