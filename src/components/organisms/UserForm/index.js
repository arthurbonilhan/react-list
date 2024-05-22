import React, { useState } from 'react'
import Input from '../../atoms/Input'
import ButtonConfirm from '../../atoms/Button'
import api from '../../utils/api'

const UserForm = ({ user = {}, onSubmit }) => {
  const [name, setName] = useState(user.nome || '')
  const [email, setEmail] = useState(user.email || '')
  const [role, setRole] = useState(user.tipoUsuario || '')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newUser = {
      nome: name,
      email,
      tipoUsuario: role,
    }

    if (user.id) {
      await api.updateUser(user.id, newUser)
    } else {
      await api.createUser(newUser)
    }

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Nome" value={name} onChange={(event) => setName(event.target.value)} />
      <Input label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input label="Cargo" value={role} onChange={(event) => setRole(event.target.value)} />
      <ButtonConfirm type="submit" label={user.id ? 'Atualizar' : 'Cadastrar'} />
    </form>
  )
}

export default UserForm
