import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from '../organisms/Login'
import UserForm from '../organisms/UserForm'
import api from '../utils/api'
import MangaUsers from './MangaUsers'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await api.getUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  const handleUserSubmit = async (newUser) => {
    await api.createUser(newUser)
    const updatedUsers = await api.getUsers()
    setUsers(updatedUsers.data)
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<MangaUsers users={users} />} />
        <Route path="/users/new" element={<UserForm onSubmit={handleUserSubmit} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
