export const API_URL = process.env.REACT_APP_API_URL ?? "" //move it to env config

export enum URLS {
  login = "user/auth/login",
  register = "user/auth/signup",
  resetPassword = "user/auth/requestPasswordReset",
  users = "user/admin/all/:limit/:page",
  oneUser = "user/admin/",
  //** restaurant crud */
  restaurantsList = "restaurants/all",//?size=10&page=1pass par pramettre page number 
  deleteRestaurant = "restaurants/",
  createRestaurant = "restaurants",
  findRestaurantById = "restaurants/",
  editRestaurant = "restaurants/",
  //** restaurantCategory crud */
  restaurantCategory = "restaurantCategory/all",
  deleteRestaurantCategory = "restaurantCategory/",
  createRestaurantCategory = "restaurantCategory",
  findRestaurantCategoryById = "restaurantCategory/",
  editRestaurantCategory = "restaurantCategory/",
  //** restaurantCategory crud */
  mealCategory = "mealCategory/all",
  deleteMealCategory = "mealCategory/",
  createMealCategory = "mealCategory",
  findMealCategoryById = "mealCategory/",
  editMealCategory = "mealCategory/",
}
