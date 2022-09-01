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

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../../pages/dashboard/EcommerceCheckout')));


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
  resetPassword = "/resetPassword",

  ecommerce_shop = '/app/e-commerce',
  ecommerce_list = '/app/e-commerce/list-product',
  ecommerce_checkout = '/app/e-commerce/checkout',
  ecommerce_view = '/app/e-commerce/product/:id',

  admin_ecommerce_shop = '/dashboard/e-commerce',
  admin_ecommerce_list = '/dashboard/e-commerce/list-product',
  admin_ecommerce_checkout = '/dashboard/e-commerce/checkout',
  admin_ecommerce_view = '/dashboard/e-commerce/product/:id',
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
  { path: paths.admin_ecommerce_shop, element: <EcommerceShop/> },
  { path: paths.admin_ecommerce_list, element: <EcommerceProductList/> },
  { path: paths.admin_ecommerce_checkout, element: <EcommerceCheckout/> },

  { path: paths.not_authorized, element: <NotAuthorizedPage /> },
];

export const app_routes = [
  { path: paths.ecommerce_shop, element: <EcommerceShop/> },
  { path: paths.ecommerce_list, element: <EcommerceProductList/> },
  { path: paths.ecommerce_checkout, element: <EcommerceCheckout/> },
  { path: paths.ecommerce_view, element: <EcommerceProductDetails/> },

  { path: paths.not_authorized, element: <NotAuthorizedPage /> },
];
//  { path: paths.signup, element: <SignUpPage /> },
//   { path: paths.signin, element: <SignInPage /> },