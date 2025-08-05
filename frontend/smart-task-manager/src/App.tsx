import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import { ToastContainerWrapper } from './components/ToastContainerWrapper.tsx';
import Loader from './components/Loader.tsx'
import TaskCalendar from './components/TaskCalender.tsx';
import { ThemeContext } from './context/ThemeContext.tsx';
import { toast } from 'react-toastify';
import type { SortOption } from './types/SortOption.ts';
import type { CreateTask, Task } from './types/Task.ts';
import * as taskService from './services/taskService.ts';
import axios from 'axios';
import Sidebar from './components/Sidebar.tsx';
import LoginForm from './components/LoginForm.tsx';
import RegisterForm from './components/RegisterForm.tsx';


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
  */
  const addTask = async (task: CreateTask) => {
    try {
      const response = await axios.post<Task>('http://localhost:8080/api/tasks', task);
      const createdTask = response.data;
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      toast.success('Task added successfully!');//show success toast
    } catch (error) {
      console.error('Failed to add task:', error);
      toast.error('Failed to add task');//show error toast
    }
  };

  /**
   * Handles updating a task 
   */

  const handleStatusChange = async (id: number, newStatus: Task["status"]) => {
    try {
      // Find the task in state by ID
      const taskToUpdate = tasks.find((task) => task.id === id);

      // If not found, exit early and show an error
      if (!taskToUpdate) {
        toast.error('Task not found');
        return;
      }

      // Create a new object with the updated status
      const updatedTask: Task = {
        ...taskToUpdate,
        status: newStatus,
      };

      // Send update request to backend
      const response = await axios.put<Task>(
        `http://localhost:8080/api/tasks/${id}`,
        updatedTask
      );

      // Update the task list in state with the returned updated task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? response.data : task
        )
      );
      toast.success(`Status updated to "${newStatus}"`);
    } catch (error) {
      console.error('Failed to update task status:', error);
      toast.error('Error updating task status');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success('Task deleted'); //succes toast
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Error deleting task'); // error toast
    }
  };

  return (
    <Router>
      <div className='d-flex'>
        {/** Sidebar on the left */}
        <Sidebar />

        {/** Main Content */}
        <div className='flex-grow-1 container py-5'>


          {/**Show loader while data is being fetched */}
          {
            loading ? (
              <Loader />
            ) : (
              <>
                {/** Header section with dark mode toggle */}
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <h1 className='text-center fw-bold mb-4'>🧠Smart Task Manager</h1>
                  {/** Dark/Light toggle button */}
                  <button className={`btn btn-sm ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                    onClick={toggleTheme}>
                    {theme === 'dark' ? ' ☀ Light Mode' : ' 🌙 Dark Mode'}
                  </button>
                </div>

                <Routes>
                  <Route
                    path='/'
                    element={
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
                          onStatusChange={handleStatusChange}
                          onDelete={deleteTask}
                          sortBy={sortBy}
                        />
                      </>
                    }
                  />
                  <Route path='/calendar' element={<TaskCalendar tasks={tasks} />} />
                  <Route path='/profile' element={<div>User Account</div>} />
                  <Route path='/login' element={<LoginForm onLoginSuccess={(token) => { localStorage.setItem("token", token) }} />} />
                  <Route path='/register' element={<RegisterForm />} />
                </Routes>
                <ToastContainerWrapper />
              </>
            )}
        </div>
      </div>
    </Router>
  );
}
export default App
