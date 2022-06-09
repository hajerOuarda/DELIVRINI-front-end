import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import { formikRestaurantCategory } from "../actions/restaurantCategoryAction";
import authHeader from "./authHeader";

const getRestaurantCategoryList = (page: number, rowPerPage: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.restaurantCategory, {
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
const deleteRestaurantCategory = (id: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .delete(URLS.deleterestaurantCategory + id, {
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

const createRestaurantCategory = (values: formikRestaurantCategory): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .post(URLS.createrestaurantCategory, { ...values }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data RestaurantCategory :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const editRestaurantCategory = (values: formikRestaurantCategory, id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .patch(URLS.editrestaurantCategory + id, values, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {

                    console.log("data RestaurantCategory :", response.data);
                }
                resolve(response.data.updatedCategoryRestaurant);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

const findRestaurantCategoryById = (id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.findrestaurantCategoryById + id, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data RestaurantCategory :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

export const restaurantCategoryService = {
    getRestaurantCategoryList,
    deleteRestaurantCategory,
    createRestaurantCategory,
    editRestaurantCategory,
    findRestaurantCategoryById
}


