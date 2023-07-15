import React from "react";

import {useActions} from "../../hooks/useActions.js";

import todoStyles from "../Todo/style.module.scss";
import styles from './styles.module.scss';
import {FaXmark} from "react-icons/fa6";

const DeleteTodoButton = ({columnId, todoId, todoRef}) => {
  const { deleteTodo } = useActions();
  const deleteTodoHanlder = (columnId, todoId, todoRef) => {
    todoRef.current.classList.add(`${todoStyles.deleteTodo}`)
    setTimeout(() => {
      deleteTodo({columnId, todoId})
    }, 300)
  }
  return (
    <div
      onClick={() => deleteTodoHanlder(
        columnId,
        todoId,
        todoRef
      )}
      className={styles.xMarkIcon}
    >
      <FaXmark/>
    </div>
  )
}
export default DeleteTodoButton