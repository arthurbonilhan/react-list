import React, { useEffect, useState } from 'react'
import { Container, Typography, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
    return <Typography>Carregando...</Typography>
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center">
        Perfil do Usuário
      </Typography>
      <Typography variant="h6">Nome: {user.nome}</Typography>
      <Typography variant="h6">Sobrenome: {user.sobrenome}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
      <Typography variant="h6">Tipo de Usuário: {user.tipoUsuario}</Typography>
      <Typography variant="h6">Ativo: {user.ativo ? 'Sim' : 'Não'}</Typography>
      <Button variant="contained" color="primary" fullWidth onClick={handleLogout}>
        Sair
      </Button>
    </Container>
  )
}

export default Profile
