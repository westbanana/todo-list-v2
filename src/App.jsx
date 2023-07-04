import './App.module.scss'
import styles from './App.module.scss'
import React, {useEffect} from "react";
import ChangeColorMenu from "./components/ChangeColorMenu/index.jsx";
import Column from "./components/Column/index.jsx";
import { useSelector} from "react-redux";
import {useActions} from "./hooks/useActions.js";
import {BsFillTrashFill} from "react-icons/bs";
const App = () => {
  const { columns } = useSelector(prev => prev.columns)
  const { backGroundColor } = useSelector(prev => prev.background)
  useEffect(() => {
    const columnsJSON = JSON.stringify(columns)
    localStorage.setItem('columns', columnsJSON);
  }, [columns])
  const {
    changeBackgroundColor,
  } = useActions();

  return (
    <div
      style={{
        background: backGroundColor,
      }}
      id='mainBackgroundId'
      className={styles.main}
    >
      <ChangeColorMenu
        initialValue={backGroundColor}
        callback={changeBackgroundColor}
      />
      <div
        id='blurBlock'
        className={styles.blurBlock}
      />
      {columns.map(column => (
        <Column
          key={column.id}
          data={column}
        />
      ))}
    </div>
  )
}

export default App
