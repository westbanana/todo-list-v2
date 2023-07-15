import React from 'react';

import styles from './style.module.scss'

import Todo from "../Todo/index.jsx";
import AddTodoButton from "../AddTodoButton/index.jsx";
import {Droppable} from "react-beautiful-dnd";

const Column = ({data, index}) => {
  const {
    id,
    title,
    todos,
    color
  } = data
  return (
        <div className={styles.mainColumnBlock}>
          {index === 0 && (
            <AddTodoButton
              data={{columnId: id}}
            />
          )}
          <div className={styles.columnTitleBlock}>
          <span
            className={styles.columnTitle}
            style={{
              color: color
            }}
          >
            {title}
          </span>
        </div>
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <div
                className={`
                  ${styles.todoList}
                  ${snapshot.isDragging ? 'dragactive' : ''}
                `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todos.map(({id: todoId, description}, index) => (
                  <Todo
                    key={todoId}
                    data={{
                      columnId: id,
                      todoId,
                      description,
                      todoIndex: index
                    }}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className={styles.bottomShadow}/>
        </div>
  );
};

  export default Column;