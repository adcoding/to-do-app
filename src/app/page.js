'use client'
import React , { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faTimes } from '@fortawesome/free-solid-svg-icons';


export default function Home() {

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task])
      setTask('')
    }
  }

  const deleteTask = (index) => {
    const updateTasks = [...tasks]
    updateTasks.splice(index, 1)
    setTasks(updateTasks)
  }

  return (
    <main className='main'>
      <div className='app-container'>
        <h1>to do list:</h1>
        
        <div className='tasks-container'>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => deleteTask(index)}>
                  <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{color: "#8a8a89"}} />
                </button>
              </li>
            ))}
          </ul>

          <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='whats next?'
          />

          <div className='add-btn'>
            <button onClick={addTask}>add</button>
          </div>
        </div>
        

        
        
      </div>
    </main>
  ) 
}
