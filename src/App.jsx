import './App.module.scss'
import styles from './App.module.scss'
import React, {useState} from "react";
import ChangeColorMenu from "./components/ChangeColorMenu/index.jsx";
import Column from "./components/Column/index.jsx";
const App = () => {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: 'Not started',
      todos: [
        {
          id: 1,
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
            'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n' +
            'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n' +
            'optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n' +
            'obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
            'nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
            'tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
            'quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos \n' +
            'sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam\n' +
            'recusandae alias error harum maxime adipisci amet laborum. Perspiciatis ',
        },
        {
          id: 2,
          description: 'Second todo',
        },
        {
          id: 3,
          description: 'Third todo',
        },
        {
          id: 1,
          description: 'First todo',
        },
        {
          id: 2,
          description: 'Second todo',
        },
        {
          id: 3,
          description: 'Third todo',
        },
        {
          id: 1,
          description: 'First todo',
        },
        {
          id: 2,
          description: 'Second todo',
        },
        {
          id: 3,
          description: 'Third todo',
        },
        {
          id: 1,
          description: 'First todo',
        },
        {
          id: 2,
          description: 'Second todo',
        },
        {
          id: 3,
          description: 'Third todo',
        },
      ],
      color: 'red'
    },
    {
      id: 2,
      title: 'In progress',
      todos: [],
      color: 'blue'
    },
    {
      id: 3,
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
        background: userBackgroundColor ?? 'white',
      }}
      id='mainBackgroundId'
      className={styles.main}
    >
      <ChangeColorMenu
        initialValue={userBackgroundColor}
        callback={setUserBackGroundColor}
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
