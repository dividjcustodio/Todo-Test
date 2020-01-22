import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import history from "./services/history";
import rootReducer from "./reducers";

let userData = {
  isAuthenticated: false
};
let dataLocal = localStorage.getItem("user");
if (dataLocal) {
  userData = {
    isAuthenticated: true,
    ...JSON.parse(dataLocal)
  };
}

const store = createStore(
  rootReducer(history),
  { user: { ...userData }, list: { data: [] } },
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
