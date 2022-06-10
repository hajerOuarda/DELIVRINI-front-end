import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import { formikMealCategory } from "../actions/mealCategoryAction";
import authHeader from "./authHeader";

const getMealCategoryList = (page: number, rowPerPage: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.mealCategory, {
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
const deleteMealCategory = (id: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .delete(URLS.deleteMealCategory + id, {
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

const createMealCategory = (values: formikMealCategory): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .post(URLS.createMealCategory, { ...values }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data mealCategory :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const editMealCategory = (values: formikMealCategory, id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .patch(URLS.editMealCategory + id, values, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {

                    console.log("data mealCategory :", response.data);
                }
                resolve(response.data.updatedCategoryRestaurant);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

const findMealCategoryById = (id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.findMealCategoryById + id, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data mealCategory :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

export const mealCategoryService = {
    getMealCategoryList,
    deleteMealCategory,
    createMealCategory,
    editMealCategory,
    findMealCategoryById
}


