import React, {useEffect, useRef, useState} from 'react';
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
    deleteTodo,
    updateTodo
  } = useActions()
  const deleteTodoHanlder = (columnId, todoId) => {
    deleteTodo({columnId, todoId})
  }

  const [todoDescription, setTodoDescription] = useState(description);
  const refDescription = useRef();

  useEffect(() => {
    if (refDescription.current) {
      refDescription.current.innerHTML = todoDescription ?? 'New Todo'
    }
  }, [])

  const onInputHandler = (e) => {
    setTodoDescription(e.target.innerHTML)
  }

  useEffect(() => {
    const payload =  {
      columnId,
      todoData: {
        id: todoId,
        description: todoDescription
      }
    }
    updateTodo(payload)
  }, [todoDescription]);

  return (
    <div
      draggable={true}
      key={todoId}
      className={styles.todoBlock}
    >
      <div
        ref={refDescription}
        onInput={onInputHandler}
        contentEditable
        className={styles.todo}
      />
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