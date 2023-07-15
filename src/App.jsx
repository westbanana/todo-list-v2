import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import { useActions } from "./hooks/useActions.js";


import ChangeColorMenu from "./components/ChangeColorMenu/index.jsx";
import Column from "./components/Column/index.jsx";
import { DragDropContext } from "react-beautiful-dnd";

import './App.module.scss';
import styles from './App.module.scss';

const App = () => {
  const { columns } = useSelector(prev => prev.columns);
  const { backGroundColor } = useSelector(prev => prev.background);
  useEffect(() => {
    const columnsJSON = JSON.stringify(columns)
    localStorage.setItem('columns', columnsJSON);
  }, [columns]);
  const {
    changeBackgroundColor,
    changeColumns
  } = useActions();
  const onDragEndHandler = (result) => {
    const { destination, source } = result;
    console.log(result)
    if (!destination) {
      return null;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return null;
    }
    const draggedTodo = columns.find(
      (column) => column.id === source.droppableId
    ).todos[source.index];
    const updatedColumns = columns.map((column) => {
      if (
        column.id === destination.droppableId
      ) {
        const newTodos = [...column.todos];
        newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, draggedTodo);
        return {
          ...column,
          todos: newTodos,
        };
      } else if (column.id === destination.droppableId) {
        const newTodos = [...column.todos];
        newTodos.splice(destination.index, 0, draggedTodo);
        return {
          ...column,
          todos: newTodos,
        };
      }
      else if (column.id === source.droppableId) {
        const newTodos = [...column.todos];
        newTodos.splice(source.index, 1);
        return {
          ...column,
          todos: newTodos,
        };
      }
      return column;
    })
    // const updatedColumns = columns.map((column) => {
    //   if (column.id === destination.droppableId) {
    //     const newTodos = [...column.todos];
    //     newTodos.splice(destination.index, 0, draggedTodo);
    //     return {
    //       ...column,
    //       todos: newTodos,
    //     };
    //   }
    //   if (column.id === source.droppableId) {
    //     const newTodos = [...column.todos];
    //     newTodos.splice(source.index, 1);
    //     return {
    //       ...column,
    //       todos: newTodos,
    //     };
    //   }
    //   return column;
    // });
    changeColumns({
      newColumns: updatedColumns,
    });
    // console.log(updatedColumns)
  }
  return (
    <div
      style={{
        background: backGroundColor,
      }}
      id='mainBackgroundId'
      className={styles.main}
    >
      <ChangeColorMenu
        initialValue={backGroundColor}
        callback={changeBackgroundColor}
      />
      <div
        id='blurBlock'
        className={styles.blurBlock}
      />
      <DragDropContext
        onDragEnd={onDragEndHandler}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            data={column}
          />
        ))}
      </DragDropContext>
    </div>
  )
}

export default App
