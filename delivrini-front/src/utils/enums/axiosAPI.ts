
export enum URLS {
  login = "user/auth/login",
  register = "user/auth/signup",
  resetPassword = "user/auth/requestPasswordReset",
  users = "user/admin/all",
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
  //** element crud */
  element = "element/all",
  deleteElement = "element/",
  createElement = "element",
  findElementById = "element/",
  editElement = "element/",
  //** ingredients crud */
  ingredients = "ingredients/all",
  deleteIngredients = "ingredients/",
  createIngredients = "ingredients",
  findIngredientsById = "ingredients/",
  editIngredients = "ingredients/",
}
