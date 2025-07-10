import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import type { Task } from './types/Task.ts';
import * as taskService from './services/taskService.ts';


/**
 * App component - top-level component managing the task list state
 */
function App() {
  //App-level state for storing all tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  //Fetch tasks from backend on first load
  useEffect(() => {
    taskService.getTasks().then(setTasks);

  }, []);

  /**
  *Handles adding a new task to the list
  * @param title - The title of the task
  */
  const addTask = async (title: string) => {
    const newTask = await taskService.createTask(title);
    setTasks((prev) => [newTask, ...prev]);
  };

  /**
   * Handles updating a task status 
   * @param taskId 
   * @param newStatus 
   */
  const updateTaskStatus = async (id: number, status: Task['status']) => {
    const updateTask = await taskService.updateTaskStatus(id, status);
    setTasks((prev) =>
      prev.map((task) =>
        (task.id === id ? updateTask : task))
    );
  }

  const deleteTask = async (id: number) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter(task => task.id !== id));
  }

  return (
    <div className='container py-5'>
      <h1 className='text-center fw-bold mb-4'>Smart Task Manager</h1>
      <p className='text-muted'>Track your pending, in-progress, and completed tasks</p>
      {/* Task input form */}
      <TaskForm onAddTask={addTask} />
      {/* Display list of the tasks */}
      <TaskList tasks={tasks} onStatusChange={updateTaskStatus} onDelete={deleteTask} />
    </div>
  )
}

export default App
