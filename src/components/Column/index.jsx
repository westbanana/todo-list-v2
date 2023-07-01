import React, {useState} from 'react';

import styles from './style.module.scss'

import {ReactComponent as AddIcon} from "../../assets/add.svg";
import {useActions} from "../../hooks/useActions.js";

const Column = ({data}) => {
  const {
    id,
    title,
    todos,
    color
  } = data
  const {
    addTodo
  } = useActions()
  return (
    <div className={styles.mainColumnBlock}>
        <div className={styles.addIconBlock}>
          <AddIcon
            className={styles.addIcon}
            onClick={() => addTodo(id)}
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
          {todos.map(({id, description}) => (
            <div
              draggable={true}
              key={id}
              className={styles.todoBlock}
            >
              <span
                className={styles.todo}
              >
                {description}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.bottomShadow}/>
    </div>
  );
  };

  export default Column;