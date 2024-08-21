import { combineReducers, legacy_createStore } from "redux";
import currencyReducer from "./reducer";

const rootReducer = combineReducers({
  currency: currencyReducer,
});

const store = legacy_createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
