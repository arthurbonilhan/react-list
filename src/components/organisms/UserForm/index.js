import React, { useState } from 'react'
import { MyInput } from '../atoms/Input'
import { MyButton } from '../atoms/Button'
import { api } from '../../utils/api'

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
      <MyInput label="Nome" value={name} onChange={(event) => setName(event.target.value)} />
      <MyInput label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <MyInput label="Cargo" value={role} onChange={(event) => setRole(event.target.value)} />
      <MyButton type="submit" label={user.id ? 'Atualizar' : 'Cadastrar'} />
    </form>
  )
}

export default UserForm
