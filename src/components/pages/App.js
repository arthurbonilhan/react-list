import React, { useState } from 'react'
import { Container, Paper } from '@material-ui/core'
import UsersList from '../organisms/UsersList'
import SearchInput from '../molecules/SearchInput'
import UserForm from '../organisms/UserForm'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  const handleOpenForm = (user = null) => {
    setSelectedUser(user)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedUser(null)
  }

  const handleUserSubmit = () => {
    setShowForm(false)
    setSelectedUser(null)
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <h1>Lista de Usuários</h1>
        <SearchInput onChange={handleSearchChange} />
        <UsersList searchTerm={searchTerm} onOpenForm={handleOpenForm} />
      </Paper>

      {showForm && <UserForm user={selectedUser} onSubmit={handleUserSubmit} onClose={handleCloseForm} />}
    </Container>
  )
}

export default App
