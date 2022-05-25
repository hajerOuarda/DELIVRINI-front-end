export const API_URL = process.env.REACT_APP_API_URL ?? "" //move it to env config

export enum URLS {
  login = "http://localhost:9002/apiDelivrini/user/auth/login",
  register = "http://localhost:9002/apiDelivrini/user/auth/signup",
  resetPassword = "http://localhost:9002/apiDelivrini/user/auth/requestPasswordReset",
  users = "http://localhost:9002/apiDelivrini/user/admin/all/:limit/:page",
  oneUser = "http://localhost:9002/apiDelivrini/user/admin/",
  restaurantCategory = "restaurantCategory/all?size=1&page=1",
  restaurantsList = "restaurants/all",//?size=10&page=1pass par pramettre page number 
  deleteRestaurant = "http://localhost:9002/apiDelivrini/restaurants/",
  createRestaurant = "http://localhost:9002/apiDelivrini/restaurants",

}
