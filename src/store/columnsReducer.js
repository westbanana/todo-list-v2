import {createSlice} from "@reduxjs/toolkit";
import {createUuid} from "../helpers/createUuid.js";

const initialState = {
  columns: JSON.parse(localStorage.getItem('columns'))?.length
    ? JSON.parse(localStorage.getItem('columns'))
    : [
        {
          id: 'not-started',
          title: 'Not started',
          todos: [],
          color: '#FF1818'
        },
        {
          id: 'in-progress',
          title: 'In progress',
          todos: [],
          color: '#1890FF'
        },
        {
          id: 'completed',
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
    changeColumns: (state, {payload}) => {
      const {newColumns} = payload;
      state.columns = newColumns
    },
    deleteTodo: (state, {payload}) => {
      const {columnId, todoId} = payload;
      state.columns = state.columns.map(column => {
        if (column.id === columnId) {
          return ({
            ...column,
            todos: column.todos.filter(todo => todo.id !== todoId)
          })
        } else {
          return column
        }
      })
    },
    addTodo: (state, {payload}) => {
      console.log(payload);
      const {columnId} = payload
      const newTodo = {
        description: 'New Todo',
        id: createUuid(),
      }
      state.columns = state.columns.map(column => {
        if (column.id === columnId) {
          return ({
            ...column,
            todos: [newTodo, ...column.todos]
          })
        } else {
          return column
        }
      })
    },
    updateTodo: (state, {payload}) => {
      const { columnId, todoData } = payload
      state.columns = state.columns.map(column => {
        if (columnId === column.id) {
          return ({
            ...column,
            todos: column.todos.map((todo) => {
              if (todo.id === todoData.id) {
                return {
                  ...todo,
                  description: todoData.description
                }
              } else {
                return todo
              }
            })
          })
        } else {
          return column
        }
      })
    }
  }
})

export const { actions, reducer } = columnsSlice