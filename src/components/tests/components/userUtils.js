import { findUserByEmail } from '../utils/userUtils'

jest.mock('../utils/api')

describe('findUserByEmail function', () => {
  it('should return the user object if found', async () => {
    const mockUser = { nome: 'Teste', email: 'teste@gmail.com', tipoUsuario: 'Adm', ativo: true, id: 10 }
    const mockResponse = { json: () => Promise.resolve({ data: [mockUser] }) }

    jest.mocked(fetch).mockImplementation((url) => {
      if (url.includes('teste@gmail.com')) {
        return Promise.resolve(mockResponse)
      } else {
        return Promise.reject(new Error('Usuário não encontrado'))
      }
    })

    const user = await findUserByEmail('teste@gmail.com')
    expect(user).toEqual(mockUser)
  })
})
