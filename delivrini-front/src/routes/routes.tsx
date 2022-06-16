import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/layout";
import ReducerLayout from "../layouts/reducerLayout";
import CustomizedSnackbars from "../modules/Bar/CustomizedSnackBar";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SignInPage from "../pages/SigninPage";
import SignUpPage from "../pages/SignUpPage";
import { routes, paths } from "../utils/enums/routes";
import { AuthenticatedRoute } from "./protectedRoutes";

export default function App() {
  return (
    <div>
      <CustomizedSnackbars />
      <Routes>
        <Route path={paths.signin} element={<ReducerLayout> <SignInPage /></ReducerLayout>} />
        <Route path={paths.signup} element={<ReducerLayout> <SignUpPage /> </ReducerLayout>} />
        <Route path={paths.resetPassword} element={<ResetPasswordPage />} />

        {routes.map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <Layout>
                <AuthenticatedRoute> <ReducerLayout>  {element} </ReducerLayout></AuthenticatedRoute>
              </Layout>
            }
          />
        ))}

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's no path set yet !</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}
