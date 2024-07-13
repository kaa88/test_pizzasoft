import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import data from "../../employees.json";

import { Employee, IState } from "./model";

export const initialState: IState = {
  list: data as Employee[],
  sort: {
    field: "name",
    order: "asc",
  },
  filter: {
    isArchive: false,
  },
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,

  reducers: {
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const newList = state.list.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
      state.list = newList;
    },

    addEmployee: (state, action: PayloadAction<Omit<Employee, "id">>) => {
      const newId =
        state.list.reduce((max, item) => (item.id > max ? item.id : max), 0) +
        1;
      state.list = [...state.list, { ...action.payload, id: newId }];
    },

    deleteEmployee: (state, action: PayloadAction<Employee["id"]>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },

    setSort: (
      state,
      action: PayloadAction<IState["sort"] | null | undefined>
    ) => {
      if (action.payload) state.sort = action.payload;
      else state.sort = initialState.sort;
    },

    setFilter: (
      state,
      action: PayloadAction<IState["filter"] | null | undefined>
    ) => {
      if (action.payload) state.filter = action.payload;
      else state.filter = initialState.filter;
    },
  },
});

export const {
  updateEmployee,
  addEmployee,
  deleteEmployee,
  setSort,
  setFilter,
} = employeeSlice.actions;

export default employeeSlice.reducer;
