import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from '@material-ui/core'

const Modal = ({ open, onClose, onSubmit, infoUser }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Usuário Padrão')
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (open) {
      setName(infoUser?.nome || '')
      setSurname(infoUser?.sobrenome || '')
      setEmail(infoUser?.email || '')
      setPassword(infoUser?.senha || '')
      setRole(infoUser?.tipoUsuario || 'Usuário Padrão')
      setActive(infoUser?.ativo || false)
    }
  }, [open, infoUser])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newUser = {
      id: infoUser.id,
      nome: name,
      sobrenome: surname,
      email: email,
      senha: password,
      tipoUsuario: role,
      ativo: active,
    }
    onSubmit(newUser)
    onClose()
    window.location.reload()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="user-form-dialog-title">
      <DialogTitle id="user-form-dialog-title">Cadastrar Usuário</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch checked={active} onChange={(event) => setActive(event.target.checked)} color="primary" />
              }
              label="Usuário Ativo"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Tipo de Usuário</FormLabel>
              <RadioGroup value={role} onChange={(event) => setRole(event.target.value)} row>
                <FormControlLabel value="Administrador" control={<Radio />} label="Administrador" />
                <FormControlLabel value="Usuário Padrão" control={<Radio />} label="Usuário Padrão" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Nome" value={name} onChange={(event) => setName(event.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sobrenome"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="text" color="primary">
          {infoUser ? 'Editar' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
