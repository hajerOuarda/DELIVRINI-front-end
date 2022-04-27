import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/layout";
import SignInPage from "../pages/SigninPage";
import SignUpPage from "../pages/SignUpPage";
import { routes, paths } from "../utils/enums/routes";
import { AuthenticatedRoute } from "./protectedRoutes";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path={paths.signin} element={<SignInPage />} />
        <Route path={paths.signup} element={<SignUpPage />} />
        {routes.map(({ path, element }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <Layout>
                <AuthenticatedRoute> {element} </AuthenticatedRoute>
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
