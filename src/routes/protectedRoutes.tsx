import { Navigate } from "react-router-dom";

import { paths } from "../utils/enums/routes";

export const AuthenticatedRoute = ({ children }: any) => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) return children;
  else return <Navigate to={paths.signin} />;
};
