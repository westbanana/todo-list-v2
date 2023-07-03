import React, {useState} from 'react';

import styles from './style.module.scss'

import {ReactComponent as AddIcon} from "../../assets/add.svg";
import {useActions} from "../../hooks/useActions.js";
import {FaXmark} from "react-icons/fa6";

const Column = ({data}) => {
  const {
    id,
    title,
    todos,
    color
  } = data
  const {
    addTodo,
    deleteTodo
  } = useActions()
  const addTodoClickHandler = (columnId) => {
    addTodo({columnId});
  };
  const deleteTodoHanlder = (columnId, todoId) => {
    deleteTodo({columnId, todoId})
  }

  return (
    <div className={styles.mainColumnBlock}>
        <div className={styles.addIconBlock}>
          <AddIcon
            className={styles.addIcon}
            onClick={() => addTodoClickHandler(id)}
          />
        </div>
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
        <div className={styles.todoList}>
          {todos.map(({id: todoId, description}) => (
            <div
              draggable={true}
              key={todoId}
              className={styles.todoBlock}
            >
              <span
                className={styles.todo}
              >
                {description}
              </span>
              <div
                onClick={() => deleteTodoHanlder(
                  id,
                  todoId
                )}
                className={styles.xMarkIcon}
              >
                <FaXmark
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.bottomShadow}/>
    </div>
  );
  };

  export default Column;