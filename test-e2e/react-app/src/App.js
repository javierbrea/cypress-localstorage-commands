import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { storeManager } from "@data-provider/core";
import "./App.css";
import AcceptCookies from "./modules/accept-cookies";
import RejectCookies from "./modules/reject-cookies";
import CookiesValue from "./modules/cookies-value";

const store = createStore(
  combineReducers({
    dataProviders: storeManager.reducer,
  }),
  window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

storeManager.setStore(store, "dataProviders");

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>Click cookies button and reload the page to see how value is maintained</p>
          <AcceptCookies />
          <RejectCookies />
          <CookiesValue />
        </header>
      </div>
    </Provider>
  );
}

export default App;
