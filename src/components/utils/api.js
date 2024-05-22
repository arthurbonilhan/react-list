import axios from 'axios'

const baseURL = 'https://apiv2-nine.vercel.app/usuarios' || 'http://localhost:3001/usuarios'

const getUsers = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createUser = async (user) => {
  const response = await axios.post(baseURL, user)
  return response.data
}

const updateUser = async (id, user) => {
  const response = await axios.put(`${baseURL}/${id}`, user)
  return response.data
}

const deleteUser = async (id) => {
  await axios.delete(`${baseURL}/${id}`)
}

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}
