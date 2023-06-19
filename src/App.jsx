import './App.module.scss'
import Column from "./components/Column/index.jsx";
import styles from './App.module.scss'
import Columns from "./data/columns.json"
const App = () => {

  return (
    <div className={styles.main}>
        <div className={styles.columnsBlock}>
          {Columns.map((e, i) => (
            <Column
              key={e.name + i}
              data={Columns[i]}
            />
          ))}
        </div>
    </div>
  )
}

export default App
