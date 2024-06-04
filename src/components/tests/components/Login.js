import React from 'react'
import { render, fireEvent, getByLabelText } from '@testing-library/react'
import Login from './Login'
import { findUserByEmail } from '../utils/userUtils'

jest.mock('../utils/userUtils')

describe('Login Component', () => {
  it('should prevent default form submission', () => {
    const { getByTestId } = render(<Login />)
    const form = getByTestId('loginForm')

    fireEvent.submit(form)

    expect(form.defaultPrevented).toBe(true)
  })

  it('should call findUserByEmail with correct credentials', () => {
    const handleLogin = jest.fn()
    const { getByTestId, getByLabelText } = render(<Login handleLogin={handleLogin} />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByTestId('submitButton')

    fireEvent.change(emailInput, { target: { value: 'teste@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.click(submitButton)

    expect(findUserByEmail).toHaveBeenCalledWith('teste@gmail.com', '123')
  })

  it('should set error state and not redirect if user not found', () => {
    const handleLogin = jest.fn()
    const { getByTestId, getByText } = render(<Login handleLogin={handleLogin} />)
    const submitButton = getByTestId('submitButton')
    const errorText = getByText('Email ou senha inválidos.')

    fireEvent.click(submitButton)

    expect(findUserByEmail).toHaveBeenCalledWith('', '')
    expect(errorText).toBeInTheDocument()
  })

  it('should store user in sessionStorage and redirect if login successful', () => {
    const mockUser = { nome: 'Teste', email: 'teste@gmail.com', tipoUsuario: 'Adm', ativo: true, id: 10 }
    const handleLogin = jest.fn()
    const { getByTestId, getByText } = render(<Login handleLogin={handleLogin} />)
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Senha')
    const submitButton = getByTestId('submitButton')

    fireEvent.change(emailInput, { target: { value: mockUser.email } })
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.click(submitButton)

    expect(findUserByEmail).toHaveBeenCalledWith(mockUser.email, '123')
    expect(sessionStorage.getItem('user')).toEqual(JSON.stringify(mockUser))
    expect(getByText('Gerenciar Usuários')).toBeInTheDocument()
  })
})
