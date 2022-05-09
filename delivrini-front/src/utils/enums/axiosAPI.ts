export const API_URL = "http://localhost:9002/apiDelivrini/";

export enum URLS {
  login = "http://localhost:9002/apiDelivrini/user/auth/login",
  register = "http://localhost:9002/apiDelivrini/user/auth/signup",
  users  = "http://localhost:9002/apiDelivrini/user/admin/all/:limit/:page",
  oneUser  = "http://localhost:9002/apiDelivrini/user/admin/",
  restaurantCategory = "restaurantCategory/all?size=1&page=1",
}
