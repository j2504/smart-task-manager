import { useContext, useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import Loader from './components/Loader.tsx'
import { ThemeContext } from './context/ThemeContext.tsx';
import type { SortOption } from './types/SortOption.ts';
import type { Task } from './types/Task.ts';
import * as taskService from './services/taskService.ts';


/**
 * App component - top-level component managing the task list state
 */
function App() {
  //App-level state for storing all tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  //Tracks if app is still fetching tasks
  const [loading, setLoading] = useState(true);

  //Access current theme and toggle function
  const { theme, toggleTheme } = useContext(ThemeContext);

  //This state tracks the currently selected sort method from the dropdown
  const [sortBy, setSortBy] = useState<SortOption>('default');

  //Fetch tasks from backend on component mount 
  useEffect(() => {
    taskService.getTasks()
      .then(setTasks) //Set the tasks on successful response
      .catch(console.error) //Log any error for debugging (to be replaced with proper handling)
      .finally(() => setLoading(false)); //Hide loader whether request succeeded or failed
  }, []);

  //

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
   * @param newStatus  (pending, in-progress, completed)
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
      {/** Header section with dark mode toggle */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className='text-center fw-bold mb-4'>Smart Task Manager</h1>
        {/** Dark/Light toggle button */}
        <button className={`btn btn-sm ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
          onClick={toggleTheme}>
          {theme === 'dark' ? ' ☀ Light Mode' : ' 🌙 Dark Mode'}
        </button>
      </div>
      {/**Show loader while data is being fetched */}
      {
        loading ? (
          <Loader />
        ) : (
          <>
            {/* Task input form */}
            <TaskForm onAddTask={addTask} />
            {/** Dropdown menu to allow user to select how tasks are sorted */}
            <div className='mb-3'>
              <label htmlFor="sortSelect" className='form-label fw-semibold'>Sort Tasks:</label>

              {/** Select input to choose sort option */}
              <select
                id='sortSelect' // <- Associates with label
                className='form-select'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}//Cast to expected sort type
              >
                <option value='default'>Default (by creation)</option>
                <option value='status'>By Status (Pending → completed)</option>
                <option value='status-reverse'>By Status (Completed → Pending)</option>
              </select>
            </div>
            {/* Display list of the tasks */}
            <TaskList tasks={tasks}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
              sortBy={sortBy}
            />
          </>
        )}
    </div>

  );
}

export default App
