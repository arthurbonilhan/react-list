import React, { useState } from 'react'
import { api } from '../../utils/api'
import Input from '../../atoms/Input'
import ButtonConfirm from '../../atoms/Button'

const UserForm = ({ user = {}, onSubmit }) => {
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [role, setRole] = useState(user.role || '')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newUser = {
      name,
      email,
      role,
    }

    if (user.id) {
      api.updateUser(user.id, newUser).then(() => {
        onSubmit()
      })
    } else {
      api.createUser(newUser).then(() => {
        onSubmit()
      })
    }
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
