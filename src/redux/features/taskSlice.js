import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = JSON.parse(localStorage.getItem("todo")) || [null];

export const taskSlice = createSlice({
  name: "taskOperations",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: nanoid(),
        body: { title: action.payload.title, disc: action.payload.disc },
      });
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;

export const useLocalStorageEffect = (state) => {
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(state));
  }, [state]);
};

export default taskSlice.reducer;
