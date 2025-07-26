import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
