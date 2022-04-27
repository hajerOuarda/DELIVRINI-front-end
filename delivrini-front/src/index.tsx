import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
 import App from "./routes/routes";
import {  store } from "./store/store";
 
ReactDOM.render(
  <Provider store={store}>
     
      <BrowserRouter>
        {/* <Layout> */}
          <App />
        {/* </Layout> */}
      </BrowserRouter>
     
  </Provider>,
  document.getElementById("root")
);
