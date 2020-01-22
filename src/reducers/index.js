import { combineReducers } from "redux";
import user from "./user";
import list from "./list";

export default history =>
  combineReducers({
    user,
    list
  });
