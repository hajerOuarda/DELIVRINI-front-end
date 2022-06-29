import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import authHeader from "./authHeader";

const getIngredientsList = (element: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.ingredients, {
                headers: {
                    authorization: "Basic " + authHeader()
                },
                params: {
                    // page,
                    // size: rowPerPage,
                    element
                }
            })
            .then((response) => {
                if (response.data) {
                    console.log("data ingredients:", response.data);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const deleteIngredients = (id: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .delete(URLS.deleteIngredients + id, {
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

const createIngredients = (values: any, element: string): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .post(URLS.createIngredients, { values, element }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data Ingredients :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const editIngredients = (values: any, id: any, element: string): Promise<any> => {
    console.log("values", values);

    return new Promise((resolve, reject) => {
        Api
            .patch(URLS.editIngredients + id, { ...values }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {

                    console.log("data Ingredients :", response.data);
                }
                resolve(response.data.updatedIngredients);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

const findIngredientsById = (id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.findIngredientsById + id, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data Ingredients :", response.data);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

export const ingredientsService = {
    getIngredientsList,
    deleteIngredients,
    createIngredients,
    editIngredients,
    findIngredientsById
}


