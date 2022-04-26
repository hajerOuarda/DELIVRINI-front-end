import { ElementPage } from "../../pages/ElementPage";
import { HomePage } from "../../pages/HomePage";
import { MealPage } from "../../pages/Meal";
import { MealCategoryPage } from "../../pages/MealCategory";
import { RestaurantPage } from "../../pages/RestaurantPage";
import SignUpPage from "../../pages/SignUpPage";
import { UserPage } from "../../pages/UserPage";
import { RestaurantCategoryPage } from "../../pages/RestaurantCategory";
import SignInPage from "../../pages/SigninPage";
import { ProfilePage } from "../../pages/profilePage";
import { AuthenticatedRoute } from "../../routes/protectedRoutes";

export enum paths {
  home = "/",
  user = "/user",
  signin = "/signin",
  signup = "/signup",
  restaurant = "/restaurant",
  restaurant_category = "/restaurantCategory",
  meal = "/meal",
  meal_category = "/mealCategory",
  element = "/element",
  profile = "/profile",
}
// export const authRoutes = [
//   { path: paths.signup, element: SignUpPage },
//   { path: paths.signin, element: SignInPage },
// ];

export const routes = [
  { path: paths.home, elemen: <HomePage /> },
  { path: paths.user, element: <UserPage /> },
  { path: paths.restaurant, element: <RestaurantPage /> },
  { path: paths.restaurant_category, element: <RestaurantCategoryPage /> },
  { path: paths.meal, element: <MealPage /> },
  { path: paths.meal_category, element: <MealCategoryPage /> },
  { path: paths.element, element: <ElementPage /> },
  { path: paths.profile, element: <ProfilePage /> },
  { path: paths.signup, element: <SignUpPage /> },
  { path: paths.signin, element: <SignInPage /> },
];
