import { Api } from "../../utils/api";
import { URLS } from "../../utils/enums/axiosAPI";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const sendLogin = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    Api
      .post(URLS.login, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user_role", (response.data.user?.fk_role || 'client'));
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

const sendRegister = (firstName: string, lastName: string, address: string, phone: string, zipCode: string, street: string, email: string, password: string, role: string, restaurant: string): Promise<any> => {
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
      role: role,
      restaurant: restaurant
    })
      .then((response) => {
        resolve(response.data.message);
      })
      .catch((error) => {
        console.log("error :", error.response.data.code);
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
  // localStorage.removeItem("user");
  // localStorage.removeItem("token");
  storage.removeItem('root');
  localStorage.clear()
};

export const authenticationService = {
  sendLogin,
  sendLogout,
  sendRegister,
  sendResetPassword
};
