import React, {useState} from 'react';

import styles from './style.module.scss';

const Column = ({data, changeColumns}) => {
  const {todos, title, color} = data
  const [currentTodo, setCurrentTodo] = useState(null);
  const dragStartHandler = (e, card) => {
    setCurrentTodo(card);
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.background = color;
  };

  const dragLeaveHandler = (e) => {
    e.target.style.background = 'rgba(0, 0, 0, 0)'
  };

  const dragEndHandler = (e) => {
  };

  const dropHandler = (e, card) => {
    e.preventDefault();
    e.target.style.background = 'rgba(0, 0, 0, 0)';
    console.log(title);
    changeColumns(prev => prev.map((column, i) => {
      if (title === column.title) {
        return {
          ...column,
          todos: column.todos.map((todo) => {
            if (todo.id === card.id) {
              return {...todo, order: currentTodo.order}
            }
            if (todo.id === currentTodo.id) {
              return {...todo, order: card.order}
            }
            return todo
          })
        }
      } else {
        return column;
      }
    }))
  };

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return - 1;
    }
  }
  return (
    <div
      className={`
        ${styles.main}
        ${todos.length === 0 && styles.emptyColumn}
      `}
    >
      <div
        className={styles.columnTitleBlock}
        style={{
          background: color
        }}
      >
        <span>{title}</span>
      </div>
      {todos.length > 0 && (
          <div className={styles.list}>
            {todos.sort(sortCards).map((todo) => (
              <span
                onDragStart={(e) => dragStartHandler(e, todo)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, todo)}
                draggable
                key={todo.id}
                className={styles.listItem}
              >
              {todo.name}
            </span>
            ))}
          </div>
      )}
    </div>
  );
};

export default Column;