import { useState } from 'react'
import TaskForm from './components/TaskForm.tsx'
import TaskList from './components/TaskList.tsx'
import type { Task } from './types/Task.ts';

/**
 * App component - top-level component managing the task list state
 */
function App() {
  //App-level state for storing all tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  /**
  *Handles adding a new task to the list
  * @param title - The title of the task
  */
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status: 'pending'
    };
    setTasks([newTask, ...tasks]);

  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task)
    )
  }

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  return (
    <div className='container py-5'>
      <header className='mb-4 text-center'>
        <h1 className='fw-bold'>Smart Task Manager</h1>
        <p className='text-muted'>Track your pending, in-progress, and completed tasks</p>
      </header>
      {/* Task input form */}
      <TaskForm onAddTask={addTask} />
      {/* Display list of the tasks */}
      <TaskList tasks={tasks} onStatusChange={updateTaskStatus} onDelete={deleteTask} />
    </div>
  )
}

export default App
