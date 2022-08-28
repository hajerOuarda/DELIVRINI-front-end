import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import authHeader from "./authHeader";

const getExtrasList = (element: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.extras, {
                headers: {
                    authorization: "Basic " + authHeader()
                },
                params: {
                    element
                }
            })
            .then((response) => {
                if (response.data) {
                    console.log("data extras:", response.data);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const deleteExtras = (id: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .delete(URLS.deleteExtras + id, {
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

const createExtras = (values: any[], element: string): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .post(URLS.createExtras, { values, element }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data Extras :", response);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};
const editExtras = (values: any, id: any, element: string): Promise<any> => {
    console.log("values", values);

    return new Promise((resolve, reject) => {
        Api
            .patch(URLS.editExtras + id, { ...values }, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {

                    console.log("data Extras :", response.data);
                }
                resolve(response.data.updatedExtras);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

const findExtrasById = (id: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.findExtrasById + id, {
                headers: {
                    authorization: "Basic " + authHeader()
                }
            },
            )
            .then((response) => {
                if (response.data) {
                    console.log("data Extras :", response.data);
                }
                resolve(response.data);
            })
            .catch((error) => {
                console.log("error :", error.message);
                reject(error.message);
            });
    });
};

export const extrasService = {
    getExtrasList,
    deleteExtras,
    createExtras,
    editExtras,
    findExtrasById
}


