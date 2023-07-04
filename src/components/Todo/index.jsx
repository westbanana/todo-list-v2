import React, {useEffect, useRef, useState} from 'react';
import styles from "./style.module.scss";
import {FaXmark} from "react-icons/fa6";
import {useActions} from "../../hooks/useActions.js";

const Todo = ({data}) => {
  const {
    todoId,
    columnId,
    description,
  } = data
  const {
    deleteTodo,
    updateTodo
  } = useActions()
  const deleteTodoHanlder = (columnId, todoId) => {
    divRef.current.classList.add(`${styles.deleteTodo}`)
    setTimeout(() => {
      deleteTodo({columnId, todoId})
    }, 300)
  }

  const [todoDescription, setTodoDescription] = useState(description);
  const refDescription = useRef();
  const divRef = useRef(null);

  useEffect(() => {
    if (refDescription.current) {
      refDescription.current.innerHTML = todoDescription ?? ''
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
      key={todoId}
      className={styles.todoBlock}
      ref={divRef}
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
        <FaXmark/>
      </div>
    </div>
  );
};

export default Todo;