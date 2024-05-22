import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const LoginForm = () => {
  const { handleLogin } = useAuthContext()
  const { register, handleSubmit, errors, formState } = useForm()

  const onSubmit = (data) => {
    const { email, password } = data
    handleLogin(email, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        ref={register({ required: 'O email é obrigatório', pattern: /\S+@\S+\.\S+/ })}
        className={errors.email ? 'error-input' : ''}
      />
      {errors.email && <span className="error-message">Email inválido</span>}

      <label>Senha:</label>
      <input
        type="password"
        name="password"
        ref={register({ required: 'A senha é obrigatória', minLength: 6 })}
        className={errors.password ? 'error-input' : ''}
      />
      {errors.password && <span className="error-message">Senha inválida (mínimo 6 caracteres)</span>}

      <button type="submit" disabled={!formState.isValid}>
        Entrar
      </button>

      <Link to="/register">Ainda não tem conta? Cadastre-se!</Link>
    </form>
  )
}

export default LoginForm
