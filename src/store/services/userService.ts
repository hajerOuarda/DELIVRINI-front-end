import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import authHeader from "./authHeader";

const getUserList = (page: number, rowPerPage: number): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .get(URLS.users, {
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
const deleteUser = (id: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        Api
            .delete(URLS.oneUser + id, {
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
export const userService = {
    getUserList,
    deleteUser,
}