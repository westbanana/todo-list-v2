import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  columns: JSON.parse(localStorage.getItem('columns'))?.length
    ? JSON.parse(localStorage.getItem('columns'))
    : [
        {
          id: 1,
          title: 'Not started',
          todos: [
          ],
          color: '#FF1818'
        },
        {
          id: 2,
          title: 'In progress',
          todos: [],
          color: '#1890FF'
        },
        {
          id: 3,
          title: 'Completed',
          todos: [],
          color: '#14DE7D'
        },
      ],
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