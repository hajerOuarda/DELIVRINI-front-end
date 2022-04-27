import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/enums/routes";
 export default function App() {
  return (
    <div>
      <Routes>
        {routes.map(({ path, element },index) => (
           <Route key={index} path={path} element={ element } />
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
