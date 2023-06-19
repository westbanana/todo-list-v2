import React from 'react';

import styles from './style.module.scss';

const Column = ({data}) => {
  const {todos, title, color} = data
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
            {todos.map(({name, id}) => (
              <span
                draggable
                key={id}
                className={styles.listItem}
              >
              {name}
            </span>
            ))}
          </div>
      )}
    </div>
  );
};

export default Column;