import { useRoutes, Navigate } from "react-router-dom";
import ReducerLayout from "../layouts/reducerLayout";
import CustomizedSnackbars from "../modules/Bar/CustomizedSnackBar";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SignInPage from "../pages/SigninPage";
import SignUpPage from "../pages/SignUpPage";
import { routes, paths, app_routes } from "../utils/enums/routes";
import { AuthenticatedRoute } from "./protectedRoutes";
// theme
import ThemeProvider from '../theme';
// components
import ScrollToTop from '../components/ScrollToTop';
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";

// pages
import NotFound from '../pages/Page404';
import DashboardLayout from "../layouts/dashboard";
import { ProgressBarStyle } from "../components/ProgressBar";
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import NotistackProvider from '../components/NotistackProvider';
import { ChartStyle } from "../components/chart";
import AppLayout from "../layouts/app";

export default function App() {
  return (
    <ThemeProvider>
      <NotistackProvider>
        <MotionLazyContainer>
          <ProgressBarStyle />
          <ChartStyle />
          <ScrollToTop />
          <CustomizedSnackbars />
          {useRoutes([
            {
              path: '/dashboard',
              element: <DashboardLayout />,
              children: [
                ...routes.map(({ path, element }) => {
                  return {
                    path: path, element: <AuthenticatedRoute>
                      <ReducerLayout> {element}</ReducerLayout>
                    </AuthenticatedRoute>
                  }
                })
              ],
            },
            {
              path: '/app',
              element: <AppLayout />,
              children: [
                ...app_routes.map(({ path, element }) => {
                  return {
                    path: path, element: <AuthenticatedRoute>
                      <ReducerLayout> {element}</ReducerLayout>
                    </AuthenticatedRoute>
                  }
                })
              ],
            },
            {
              path: '/',
              element: <LogoOnlyLayout />,
              children: [
                { path: '/', element: <Navigate to="/dashboard/app" /> },
                { path: paths.resetPassword, element: <ResetPasswordPage /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> },
              ],
            },
            { path: paths.signin, element: <ReducerLayout><SignInPage /></ReducerLayout> },
            { path: paths.signup, element: <ReducerLayout><SignUpPage /></ReducerLayout> },
            { path: '*', element: <Navigate to="/404" replace /> },
          ])}
        </MotionLazyContainer>
      </NotistackProvider>
    </ThemeProvider>
  );
}
