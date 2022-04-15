import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
 import App from "./routes/routes";

ReactDOM.render(
  <BrowserRouter>
    <Layout>
    <App />
    </Layout>
  </BrowserRouter>,

  document.getElementById("root")
);
