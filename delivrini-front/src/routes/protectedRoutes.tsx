import { Children } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { NotAuthorizedPage } from "../pages/NotAuthorizedPage";
import { paths } from "../utils/enums/routes";

export const AuthenticatedRoute = ({ children }: any) => {
  const isAuthenticated = localStorage.getItem("token");
  console.log("token :", isAuthenticated);

  if (isAuthenticated) return children;
  else return <Navigate to={paths.not_authorized} />;
};
