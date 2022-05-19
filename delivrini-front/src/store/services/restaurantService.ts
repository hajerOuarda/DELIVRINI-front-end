import axios from "axios";
import { URLS } from "../../utils/enums/axiosAPI";
import authHeader, { user } from "./authHeader";

const getRestaurantsList = (): Promise<any> => {

    return new Promise((resolve, reject) => {
        axios
            .get(URLS.restaurantsList, {

                headers: {
                    authorization: "Basic " + authHeader()
                }
            })
            .then((response) => {
                if (response.data) {
                    console.log("data:", response.data);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

export const restaurantService = {
    getRestaurantsList,
}