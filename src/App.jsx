import './App.module.scss'
import styles from './App.module.scss'
import React, {useState} from "react";
import ChangeColorMenu from "./components/ChangeColorMenu/index.jsx";
const App = () => {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: 'Not started',
      todos: [],
      color: 'red'
    },
    {
      id: 1,
      title: 'In progress',
      todos: [],
      color: 'blue'
    },
    {
      id: 1,
      title: 'Completed',
      todos: [],
      color: 'green'
    },
  ]);
  const [userBackgroundColor, setUserBackGroundColor] = useState(
    localStorage.getItem('backgroundColor') ?? ''
  )

  return (
    <div
      style={{
        transition: 'all 0.3s',
        background: userBackgroundColor ?? 'white'
      }}
      className={styles.main}
    >
      <ChangeColorMenu
        initialValue={userBackgroundColor}
        callback={setUserBackGroundColor}
      />
    </div>
  )
}

export default App
