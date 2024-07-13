import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { employeeReducer } from "../features/employee";

const rootReducer = combineReducers({
  employee: employeeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: undefined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
