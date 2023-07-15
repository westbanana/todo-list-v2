import React, {useEffect, useRef, useState} from 'react';
import styles from "./style.module.scss";
import {useActions} from "../../hooks/useActions.js";
import {MdDragIndicator} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";
import {cursorToEnd} from "../../helpers/cursorToEnd.js";
import DeleteTodoButton from "../DeleteTodoButton/index.jsx";
import TextLengthString from "../TextLengthString/index.jsx";

const Todo = ({data}) => {
  const {
    todoId,
    columnId,
    description,
    todoIndex
  } = data

  const {
    updateTodo
  } = useActions()

  const [todoDescription, setTodoDescription] = useState(description);
  const refDescription = useRef();
  const divRef = useRef(null);
  const todoMaxLength = 400;
  useEffect(() => {
    if (refDescription.current) {
      refDescription.current.innerHTML = todoDescription;
    }
  }, []);

  useEffect(() => {
    const payload =  {
      columnId,
      todoData: {
        id: todoId,
        description: todoDescription
      }
    };
    updateTodo(payload);
  }, [todoDescription]);

  const onInputHandler = (e) => {
    setTodoDescription(e.target.innerHTML);
  };

  const onKeyUpHandler = (e) => {
    if (refDescription.current) {
      let text = e.target.innerHTML;
      refDescription.current.innerHTML = text.replace('', '').substring(0, todoMaxLength);
      cursorToEnd(refDescription.current);
      setTodoDescription(refDescription.current.innerHTML);
    }
  };

  const onClickHandler = () => {
    refDescription.current.focus();
  };

  return (
    <Draggable draggableId={todoId} index={todoIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            key={todoId}
            className={`
              ${styles.todoBlock}
            `}
            ref={divRef}
          >
            <div
              className={styles.dragIconBlock}
            >
              <MdDragIndicator/>
            </div>
            <div
              ref={refDescription}
              onClick={onClickHandler}
              onInput={onInputHandler}
              onKeyUp={onKeyUpHandler}
              contentEditable
              className={styles.todo}
            />
            {!snapshot.isDragging && (
              <DeleteTodoButton
                columnId={columnId}
                todoId={todoId}
                todoRef={divRef}
              />
            )}
          </div>
          {!snapshot.isDragging && (
            <TextLengthString
              text={todoDescription}
              maxLength={todoMaxLength}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Todo;