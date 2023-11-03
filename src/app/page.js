'use client'
import React , { useState , useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  
  // Load 'tasks' from local storage or initialize as an empty array
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks)
  const [task, setTask] = useState('')

  const storedCheckedState = JSON.parse(localStorage.getItem('checkedState'));

  const [checkedState, setCheckedState] = useState(() => {
    if (storedCheckedState && storedCheckedState.length === tasks.length) {
      return storedCheckedState;
    } else {
      return tasks.map(() => false);
    }
  });

  const addTask = () => {
    if (task.trim() !== '') {
      const newTasks = [...tasks, task];
      const newCheckedState = [...checkedState, false]
      setTasks(newTasks);
      setTask('')
      // Update local storage with the new tasks array
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      localStorage.setItem('checkedState', JSON.stringify(newCheckedState))
    }
  }

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    // Update local storage with the updated tasks array
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  useEffect(() => {
    // Update local storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className='main'>
      <div className='app-container'>
        <h1>to do list:</h1>
        
        <div className='tasks-container'>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <input 
                type="checkbox" 
                className="checkbox" 
                id={`task-${index}`}
                checked= {checkedState[index]}
                onChange={() => {
                  const newCheckedState = [...checkedState];
                  newCheckedState[index] = !newCheckedState[index];
                  setCheckedState(newCheckedState);
                  localStorage.setItem('checkedState', JSON.stringify(newCheckedState)); // Update checked state in local storage
                }}
                />
                <label className='checkmark' htmlFor={`task-${index}`}>{task}</label>



                <button onClick={() => deleteTask(index)}>
                  <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{ color: "#8a8a89" }} />
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
