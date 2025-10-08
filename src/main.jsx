import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from './context/ThemeContext' // Your existing context
import { AuthProvider } from "./context/AuthContext"; // 👈 NEW: Import AuthProvider
import './theme.css'  // add custom styles


createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    {/* BrowserRouter wraps everything to enable routing */}
  <BrowserRouter> 
        {/* Place global providers here, usually with the most frequently accessed context outermost */}
   <ThemeProvider> 
            {/* 👈 NEW: AuthProvider wraps the App component */}
            <AuthProvider> 
          <App />
            </AuthProvider>
   </ThemeProvider>
  </BrowserRouter>
 </React.StrictMode>
)