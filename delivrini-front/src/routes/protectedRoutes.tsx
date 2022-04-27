import { Route } from "react-router-dom";
import { NotAuthorizedPage } from "../pages/NotAuthorizedPage";
import { paths } from "../utils/enums/routes";

export const AuthenticatedRoute = (...rest: any) => {
  const isAuthenticated = localStorage.getItem("token");
  console.log("token :", isAuthenticated);

  if (isAuthenticated) return <Route {...rest} />;
  else return <Route path={paths.not_authorized} element={<NotAuthorizedPage/>} />;
};
