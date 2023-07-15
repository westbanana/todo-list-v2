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
    let updatedColumns;
    if (destination.droppableId === source.droppableId) {
      const currentColumn = columns.find(e => e.id === destination.droppableId);
      updatedColumns = columns.map((column) => {
        if (source.droppableId === column.id) {
          const newTodos = [...column.todos];
          newTodos.splice(source.index, 1);
          newTodos.splice(destination.index, 0, currentColumn.todos[source.index])
          return {
            ...column,
            todos: newTodos
          }
        } else {
          return column
        }
      })
    } else {
      updatedColumns = columns.map((column) => {
      if (column.id === destination.droppableId) {
        const newTodos = [...column.todos];
        newTodos.splice(destination.index, 0, draggedTodo);
        return {
          ...column,
          todos: newTodos,
        };

      } else if (column.id === source.droppableId) {
        const newTodos = [...column.todos];
        newTodos.splice(source.index, 1);
        return {
          ...column,
          todos: newTodos,
        };
      } else {
        return column;
      }
      })
    }
    changeColumns({
      newColumns: updatedColumns,
    });
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
        {columns.map((column, index) => (
          <Column
            key={column.id}
            index={index}
            data={column}
          />
        ))}
      </DragDropContext>
    </div>
  )
}

export default App
