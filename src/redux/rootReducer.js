import { combineReducers } from "redux";
import burgerReducer from "./burger/burgerReducer";

const burgerApp = combineReducers({
  burgers: burgerReducer,
});

export default burgerApp;
