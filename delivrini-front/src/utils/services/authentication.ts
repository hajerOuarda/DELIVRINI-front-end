import axios from "axios";
import { URLS } from "../enums/axiosAPI";
 
export const login = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(URLS.login, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          console.log("data:", response.data);

          localStorage.setItem("user", JSON.stringify(response.data));
        }
        resolve(response.data);
      })
      .catch((error) => {
        console.log("error :", error.message);
        reject(error);
      });
  });
};
