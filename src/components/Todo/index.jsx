import React, {useEffect, useRef, useState} from 'react';
import styles from "./style.module.scss";
import {FaXmark} from "react-icons/fa6";
import {useActions} from "../../hooks/useActions.js";
import {MdDragIndicator} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";

const Todo = ({data}) => {
  const {
    todoId,
    columnId,
    description,
    todoIndex
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
      refDescription.current.innerHTML = todoDescription;
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
    <Draggable draggableId={todoId} index={todoIndex}>
      {(provided, snapshot) => (
        <div
          className={`${snapshot.isDragging ? 'drag' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            key={todoId}
            className={styles.todoBlock}
            ref={divRef}
          >
            <div
              className={`
              ${styles.dragIconBlock}
            `}
            >
              <MdDragIndicator/>
            </div>
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
        </div>
      )}
    </Draggable>
  );
};

export default Todo;