import React from 'react';
import styles from "./styles.module.scss";

const TextLengthString = ({text, maxLength}) => {
  return (
    <>
      <span
        className={styles.todoLength}
      >
        {`${text.length}/${maxLength}`}
      </span>
    </>
  );
};

export default TextLengthString;