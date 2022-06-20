import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import { formikElement } from "../actions/elementAction";
import authHeader from "./authHeader";

const getElementList = (page: number, rowPerPage: number, restaurant: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.element, {
                headers: {
                    authorization: "Basic " + authHeader()
                },
                params: {
                    page,
                    size: rowPerPage,
                    restaurant
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
const deleteElement = (id: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .delete(URLS.deleteElement + id, {
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

const createElement = (values: formikElement, restaurant: string): Promise<any> => {
    console.log("restaurant element", restaurant, "and ");

    return new Promise((resolve, reject) => {
        Api
            .post(URLS.createElement, { ...values, restaurant: restaurant }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data Element :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const editElement = (values: formikElement,   id: number): Promise<any> => {
    console.log("values", values);

    return new Promise((resolve, reject) => {
        Api
            .patch(URLS.editElement + id, { ...values }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {

                    console.log("data Element :", response.data);
                }
                resolve(response.data.updatedElement);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

const findElementById = (id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.findElementById + id, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data Element :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

export const elementService = {
    getElementList,
    deleteElement,
    createElement,
    editElement,
    findElementById
}


