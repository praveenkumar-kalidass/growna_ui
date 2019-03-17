import {combineReducers} from "redux";
import app from "./App";
import tenant from "./Tenant";
import user from "./User";
import insurance from "./Insurance";

const rootReducer = combineReducers({
  app,
  tenant,
  user,
  insurance
});

export default rootReducer;
