import React from 'react';
import styles from "./style.module.scss";
import {useActions} from "../../hooks/useActions.js";
import {HiPlus} from "react-icons/hi";

const AddTodoButton = ({data}) => {
  const {
    columnId
  } = data

  const {
    addTodo
  } = useActions();

  return (
    <div className={styles.addIconBlock}>
      <HiPlus
        className={styles.addIcon}
        onClick={() => addTodo({columnId})}
      />
    </div>
  );
};

export default AddTodoButton;