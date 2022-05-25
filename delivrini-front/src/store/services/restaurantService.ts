import axios from "axios";
import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import authHeader, { user } from "./authHeader";

const getRestaurantsList = (page: number, rowPerPage: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.restaurantsList, {

                headers: {
                    authorization: "Basic " + authHeader()
                },
                params: {
                    page,
                    size: rowPerPage
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
const deleteRestaurant = (id: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        axios
            .delete(URLS.deleteRestaurant + id, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
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

const createRestaurant = (name: string, email: string, address: string, zipCode: string, street: string): Promise<any> => {

    return new Promise((resolve, reject) => {
        axios
            .post(URLS.createRestaurant, {
                name: name,
                email: email,
                address: address,
                zipCode: zipCode,
                street: street
            }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data restaurant :", response.data);
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
    deleteRestaurant,
    createRestaurant,

}