import {combineReducers} from "redux";
import app from "./App";
import tenant from "./Tenant";
import user from "./User";

const rootReducer = combineReducers({
  app,
  tenant,
  user
});

export default rootReducer;
