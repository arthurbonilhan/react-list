import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography, Grid } from '@material-ui/core'
import api from '../../utils/api'
import Modal from '../../molecules/Modal'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const users = await api.getUsers()
      const user = users.find((u) => u.email === email && u.senha === password)

      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user))
        navigate('/users')
      } else {
        setError('Email ou senha inválidos.')
      }
    } catch (err) {
      setError('Erro ao conectar com a API.')
    }
  }

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.tipoUsuario === 'Administrador') {
        navigate('/admin/users')
      } else {
        navigate('/users')
      }
    }
  }, [navigate])

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
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h5" align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>

          <Button variant="text" color="primary" onClick={() => handleOpenForm(null)}>
            CADASTRAR
          </Button>
        </Grid>
      </form>

      <Modal open={showFormModal} onClose={handleCloseFormModal} onSubmit={handleUserSubmit} />
    </Container>
  )
}

export default Login
