import axios from "axios";
import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import { formikV } from "../actions/restaurantAction";
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
        Api
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

const createRestaurant = (values: formikV): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .post(URLS.createRestaurant, values, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data restaurant :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const editRestaurant = (values: formikV, id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .patch(URLS.editRestaurant + id, values, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {

                    console.log("data restaurant :", response.data);
                }
                resolve(response.data.updatedRestaurant);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

const findRestaurantById = (id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.findRestaurantById + id, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data restaurant :", response);
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
    editRestaurant,
    findRestaurantById
}


