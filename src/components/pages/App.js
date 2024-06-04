import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from '../organisms/Login'
import api from '../utils/api'
import MangaUsers from './MangaUsers'
import Profile from '../organisms/Profile'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await api.getUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<MangaUsers users={users} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
