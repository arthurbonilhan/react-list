import React, { useState, useEffect } from 'react'
import { Container, Button, Grid, IconButton } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useNavigate } from 'react-router-dom'
import * as Styled from '../style'
import UsersList from '../../organisms/UsersList'
import SearchInput from '../../molecules/SearchInput'
import api from '../../utils/api'
import Modal from '../../molecules/Modal'

const MangaUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

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

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  return (
    <Styled.Container maxWidth="md">
      <Styled.Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container justifyContent="center" alignItems="center">
          <div>
            <Styled.Typography variant="h5">Gerenciar Usuários</Styled.Typography>
            <SearchInput onChange={handleSearchChange} />
          </div>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center">
          <Button variant="contained" color="primary" onClick={() => handleOpenForm(null)}>
            CADASTRAR
          </Button>
          <div>
            <IconButton onClick={handleProfileClick} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </Grid>
      </Styled.Paper>
      <Container>
        <Styled.UserListContainer>
          <UsersList users={users} searchTerm={searchTerm} onOpenForm={handleOpenForm} />
        </Styled.UserListContainer>
      </Container>

      <Modal open={showFormModal} onClose={handleCloseFormModal} onSubmit={handleUserSubmit} />
    </Styled.Container>
  )
}

export default MangaUsers
