
import TaskForm from './components/TaskForm.tsx'
import TaskList from './components/TaskList.tsx'

function App() {
  return (
    <div className='container py-5'>
      <header className='mb-4 text-center'>
        <h1 className='fw-bold'>Smart Task Manager</h1>
        <p className='text-muted'>Track your pending, in-progress, and completed tasks</p>
      </header>

      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App
