export const API_URL = process.env.REACT_APP_API_URL ?? "" //move it to env config

export enum URLS {
  login = "user/auth/login",
  register = "user/auth/signup",
  resetPassword = "user/auth/requestPasswordReset",
  users = "user/admin/all/:limit/:page",
  oneUser = "user/admin/",
  restaurantCategory = "restaurantCategory/all?size=1&page=1",
  restaurantsList = "restaurants/all",//?size=10&page=1pass par pramettre page number 
  deleteRestaurant = "restaurants/",
  createRestaurant = "restaurants",
  findRestaurantById = "restaurants/",

}
