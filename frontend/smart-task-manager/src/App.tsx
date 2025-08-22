import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import TaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import { ToastContainerWrapper } from './components/ToastContainerWrapper.tsx';
import Loader from './components/Loader.tsx'
import TaskCalendar from './components/TaskCalender.tsx';
import { ThemeContext } from './context/ThemeContext.tsx';
import Sidebar from './components/Sidebar.tsx';
import LoginForm from './components/LoginForm.tsx';
import RegisterForm from './components/RegisterForm.tsx';
import { AuthContext, AuthProvider } from "./context/AuthContext.tsx";
import { TaskProvider, useTasks } from "./context/TaskContext.tsx"

/**
 * App component - top-level component managing the task list state
 */
function AppContent() {

  const [loading, setLoading] = useState(true);

  //Access current theme and toggle function
  const { theme } = useContext(ThemeContext);


  //Tracks if user is logged in
  const { isLoggedIn } = useContext(AuthContext)!;

  const { fetchTasks } = useTasks();

  useEffect(() => {
    const init = async () => {
      try {
        if (isLoggedIn) {
          await fetchTasks();
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [isLoggedIn]);





  return (
    <div className={`app ${theme}`}>
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

                </div>

                <Routes>
                  {/**Protected Routes */}
                  <Route
                    path='/'
                    element={
                      <PrivateRoute>
                        <>

                          <TaskForm />
                          {/* Display list of the tasks */}
                          <TaskList />
                        </>
                      </PrivateRoute>
                    }
                  />
                  <Route path='/calendar' element={<PrivateRoute>
                    <TaskCalendar />
                  </PrivateRoute>
                  } />
                  <Route path='/profile' element={
                    <PrivateRoute>
                      <div>User Account</div>
                    </PrivateRoute>
                  } />
                  <Route path='/login' element={!isLoggedIn
                    ? <LoginForm />
                    : <Navigate to="/" />} />
                  <Route path='/register' element={!isLoggedIn
                    ? <RegisterForm />
                    : <Navigate to="/" />} />

                  {/** Catch-all route */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <ToastContainerWrapper />
              </>
            )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </AuthProvider>
    </Router>
  )
}
export default App
