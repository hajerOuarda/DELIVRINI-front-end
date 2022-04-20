import { ElementPage } from "../../pages/ElementPage";
import { HomePage } from "../../pages/HomePage";
 import { MealPage } from "../../pages/Meal";
import { MealCategoryPage } from "../../pages/MealCategory";
import { RestaurantPage } from "../../pages/RestaurantPage";
import { SignupPage } from "../../pages/SingupPage";
import { UserPage } from "../../pages/UserPage";
import { RestaurantCategoryPage } from "../../pages/RestaurantCategory";
import SignInPage from "../../pages/SigninPage";


export enum paths {
  home = "/",
  user = "user",
  signin = "signin",
  signup = "signup",
  restaurant = "restaurant",
  restaurant_category = "restaurantCategory",
  meal = "meal",
  meal_category = "mealCategory",
  element = "element",
}

export const routes = [
  { path: paths.home, element: HomePage },
  { path: paths.user, element: UserPage },
  { path: paths.signin, element: SignInPage },
  { path: paths.signup, element: SignupPage },
  { path: paths.restaurant, element: RestaurantPage },
  { path: paths.restaurant_category, element: RestaurantCategoryPage },
  { path: paths.meal, element: MealPage },
  { path: paths.meal_category, element: MealCategoryPage },
  { path: paths.element, element: ElementPage },
];
