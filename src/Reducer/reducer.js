import {combineReducers} from "redux";
import app from "./App";
import user from "./User";

const rootReducer = combineReducers({
  app,
  user
});

export default rootReducer;
