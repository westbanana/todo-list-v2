import React from 'react';
import styles from "./style.module.scss";
import {FaXmark} from "react-icons/fa6";
import {useActions} from "../../hooks/useActions.js";

const Todo = ({data}) => {
  const {
    todoId,
    columnId,
    description
  } = data
  const {
    deleteTodo
  } = useActions()
  const deleteTodoHanlder = (columnId, todoId) => {
    deleteTodo({columnId, todoId})
  }

  return (
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
          columnId,
          todoId
        )}
        className={styles.xMarkIcon}
      >
        <FaXmark
        />
      </div>
    </div>
  );
};

export default Todo;