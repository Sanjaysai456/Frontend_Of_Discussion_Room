// App.jsx
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'
import StudentForm from './components/StudentForm'
import AdminHistory from './pages/AdminHistroy'
import Hero from './components/Hero'

function App() {
  return (
    
      <Routes>
        <Route path="/vinay-sir-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/admin-history" element={<AdminHistory />} />
        <Route path="/" element={<Hero />} />

        


      </Routes>
    
  )
}

export default App
