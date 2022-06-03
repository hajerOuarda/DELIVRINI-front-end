import axios from "axios";
import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";

const sendLogin = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    Api
      .post(URLS.login, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.accessToken) {
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

const sendRegister = (firstName: string, lastName: string, address: string, phone: string, zipCode: string, street: string, email: string, password: string, role: string): Promise<any> => {
  return new Promise((resolve, reject) => {

    Api.post(URLS.register, {
      name: firstName,
      lastname: lastName,
      phone: phone,
      address: address,
      zipCode: zipCode,
      street: street,
      email: email,
      password: password,
      role: role
    })
      .then((response) => {
        resolve(response.data.message);
        console.log("response.data ", response.data);
        console.log("role", role)
      })
      .catch((error) => {
        console.log("error :", error.response.data.code);
        console.log("error2 :", error.response);
        console.log("role", role)
        reject(error.response.data.code);
      });
  });
};

const sendResetPassword = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    Api
      .post(URLS.resetPassword, {
        email: email,
      })
      .then((response) => {
        resolve(response);
        console.log(response.status);

      })
      .catch((error) => {
        console.log("error :", error.message);
        reject(error.message);
      });
  });
};

const sendLogout = () => {
  localStorage.removeItem("user");
};

export const authenticationService = {
  sendLogin,
  sendLogout,
  sendRegister,
  sendResetPassword
};
