import axios from "axios";
import { URLS } from "../../utils/enums/axiosAPI";

const sendLogin = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(URLS.login, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          // console.log("data:", response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", response.data.accessToken);
        }
        resolve(response.data);
      })
      .catch((error) => {
        console.log("error :", error.message);
        reject(error.message);
      });
  });
};

const sendRegister = (firstName: string, lastName: string, address: string, phone: string, zipCode: string, email: string, password: string, role: string): Promise<any> => {
  return new Promise((resolve, reject) => {

    axios.post(URLS.register, {
      name: firstName,
      lastname: lastName,
      phone: phone,
      address: address,
      zipCode: zipCode,
      email: email,
      password: password,
      fk_role: role
    })
      .then((response) => {
        resolve(response.data.message);
        console.log("response.data ", response.data);
      })
      .catch((error) => {
        console.log("error :", error.response.data.code);
        reject(error.response.data.code);
      });
  });
};

const sendLogout = () => {
  localStorage.removeItem("user");
};

export const authenticationService = {
  sendLogin,
  sendLogout,
  sendRegister
};
