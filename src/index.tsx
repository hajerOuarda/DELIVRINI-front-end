import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./routes/routes";
import { persistor, store } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react'
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// cache client
serviceWorker.register();