import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/enums/routes";
export default function App() {
  return (
    <div>
      <Routes >
        {routes.map((route) => (
          <Route path={route.path} element={<route.element />} />
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
