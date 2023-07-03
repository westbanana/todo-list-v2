import React, {useState} from 'react';

import styles from './style.module.scss'

import {ReactComponent as AddIcon} from "../../assets/add.svg";
import {useActions} from "../../hooks/useActions.js";
import {FaXmark} from "react-icons/fa6";
import Todo from "../Todo/index.jsx";
import AddTodoButton from "../AddTodoButton/index.jsx";

const Column = ({data}) => {
  const {
    id,
    title,
    todos,
    color
  } = data

  return (
    <div className={styles.mainColumnBlock}>
        <AddTodoButton
          data={{columnId: id}}
        />
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
            <Todo
              data={{
                columnId: id,
                todoId,
                description
              }}
            />
          ))}
        </div>
        <div className={styles.bottomShadow}/>
    </div>
  );
  };

  export default Column;