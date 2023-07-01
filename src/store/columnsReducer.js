import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  columns: JSON.parse(localStorage.getItem('columns')) || [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState: initialState,
  reducers: {
    deleteTodo: (state, {payload}) => {
      state.columns = state.columns.map(column => {
        if (column.id === payload[0]) {
          return ({
            ...column,
            todos: column.todos.filter(todo => todo.id !== payload[1])
          })
        } else {
          return column
        }
      })
    },
    addTodo: (state, {payload}) => {
      const id = payload
      const newTodo = {
        description: 'New Todo',
        id: Date.now(),
      }
      state.columns = state.columns.map(column => {
        if (column.id === id) {
          return ({
            ...column,
            todos: [newTodo,...column.todos]
          })
        } else {
          return column
        }
      })
    }
  }
})

export const { actions, reducer } = columnsSlice