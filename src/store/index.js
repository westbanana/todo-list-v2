import {combineReducers} from "redux";
import {reducer as columnsReducers} from "./columnsReducer.js";
import {reducer as bgReducers} from "./backgroundReducer.js";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer  = combineReducers({
  columns: columnsReducers,
  background: bgReducers,
})

export const store = configureStore({
  reducer: rootReducer
})
