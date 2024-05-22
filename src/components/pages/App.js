import React, { useState, useEffect } from 'react'
import { Container, Paper, Button, Typography, Grid } from '@material-ui/core'
import UsersList from '../organisms/UsersList'
import SearchInput from '../molecules/SearchInput'
import api from '../utils/api'
import Modal from '../molecules/Modal'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await api.getUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  const handleOpenForm = (user = null) => {
    setSelectedUser(user)
    setShowFormModal(true)
  }

  const handleCloseFormModal = () => {
    setShowFormModal(false)
    setSelectedUser(null)
  }

  const handleUserSubmit = async (newUser) => {
    await api.createUser(newUser)

    const updatedUsers = await api.getUsers()
    setUsers(updatedUsers.data)

    handleCloseFormModal()
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Gerenciar Usuários</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOpenForm(null)}>
            CADASTRAR
          </Button>
        </Grid>
        <SearchInput onChange={handleSearchChange} />
        <UsersList users={users} searchTerm={searchTerm} onOpenForm={handleOpenForm} />
      </Paper>

      <Modal open={showFormModal} onClose={handleCloseFormModal} onSubmit={handleUserSubmit} />
    </Container>
  )
}

export default App
