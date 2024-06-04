import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography } from '@material-ui/core'
import api from '../../utils/api'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Entrar
        </Button>
      </form>
    </Container>
  )
}

export default Login
