import { useState } from 'react';

import AddTaskForm from './AddTaskForm.jsx';
import TaskList from './TaskList.jsx';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);

  function addTask(text) {
    if (text.trim() !== '') {
      const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
      const task = {
        id,
        text,
      };

      setTasks((prevTasks) => [...prevTasks, task]);
    }
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <div className="bg-amber-100 w-full md:w-5/6 flex justify-center flex-col">
      <TaskList tasks={tasks} onDelete={deleteTask} />
      <AddTaskForm onAddTask={addTask} />
    </div>
  );
}
