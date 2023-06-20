import './App.module.scss'
import Column from "./components/Column/index.jsx";
import styles from './App.module.scss'
import Columns from "./data/columns.json"
import {useState} from "react";
const App = () => {
  const [columns, setColumns] = useState(Columns)
  console.log(columns)
  return (
    <div className={styles.main}>
        <div
          className={styles.columnsBlock}
        >
          {columns.map((e, i) => (
            <Column
              key={e.id}
              data={Columns[i]}
              changeColumns={setColumns}
            />
          ))}
        </div >
    </div>
  )
}

export default App
