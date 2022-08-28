import { MealPage } from "../../pages/Meal";
import { NotAuthorizedPage } from "../../pages/NotAuthorizedPage";
import MealCategoryPage from "../../pages/MealCategory";
import ElementPage from "../../pages/ElementPage";
import { lazy, Suspense } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { useLocation } from "react-router-dom";

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

// DASHBOARD
const Dashboard = Loadable(lazy(() => import('../../pages/HomePage')));
// USER
const UserList = Loadable(lazy(() => import('../../pages/UserPage')));
const UserProfile = Loadable(lazy(() => import('../../pages/UserProfile')));
// Restaurant
const RestaurantList = Loadable(lazy(() => import('../../pages/RestaurantPage')));
const RestaurantCategoryList = Loadable(lazy(() => import('../../pages/RestaurantCategory')));


export enum paths {
  home = "app",
  user = "user",
  signin = "/signin",
  signup = "/signup",
  restaurant = "restaurant",
  restaurant_category = "restaurantCategory",
  meal = "meal",
  meal_category = "mealCategory",
  element = "element",
  profile = "profile",
  not_authorized = "not_authorized",
  resetPassword = "/resetPassword"
}

export const routes = [
  { path: paths.home, element: <Dashboard /> },
  { path: paths.user, element: <UserList /> },
  { path: paths.restaurant, element: <RestaurantList /> },
  { path: paths.restaurant_category, element: <RestaurantCategoryList /> },
  {
    path: paths.meal,
    element: <MealPage />,
  },
  { path: paths.meal_category, element: <MealCategoryPage /> },
  { path: paths.element, element: <ElementPage /> },
  {
    path: paths.profile,
    element: <UserProfile />,
  },
  { path: paths.not_authorized, element: <NotAuthorizedPage /> },
];
//  { path: paths.signup, element: <SignUpPage /> },
//   { path: paths.signin, element: <SignInPage /> },