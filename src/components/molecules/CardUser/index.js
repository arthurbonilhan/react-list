import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import api from '../../utils/api'
import Modal from '../Modal'
import ModalConfirm from '../../atoms/ModalConfirm'

const CardUser = ({ user }) => {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [openCancelModal, setOpenCancelModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false)
    setOpenCancelModal(false)
    setSelectedUser(null)
  }

  const handleEditSubmit = async (updatedUser) => {
    await api.updateUser(updatedUser.id, updatedUser)
    handleCloseEditModal()
  }

  const handleDeleteUser = async (user) => {
    setSelectedUser(user)
    setOpenCancelModal(true)
  }

  const handleConfirmDelete = async (updatedUser) => {
    if (openCancelModal) {
      await api.deleteUser(updatedUser.id, updatedUser)
    }
    setOpenCancelModal(false)
  }

  const isAdmin = currentUser && currentUser.tipoUsuario === 'Administrador'

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuário</TableCell>
            <TableCell align="left">Tipo de usuário</TableCell>
            <TableCell align="left">Usuário ativo</TableCell>
            {isAdmin && <TableCell align="left">Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <TableRow key={user.email}>
              <TableCell>{user.nome}</TableCell>
              <TableCell align="left">{user.tipoUsuario}</TableCell>
              <TableCell align="left">{user.ativo ? 'Sim' : 'Não'}</TableCell>
              {isAdmin && (
                <TableCell align="left">
                  <IconButton aria-label="edit" onClick={() => handleEditClick(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteUser(user)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={editModalOpen} onClose={handleCloseEditModal} onSubmit={handleEditSubmit} infoUser={selectedUser} />
      <ModalConfirm
        open={openCancelModal}
        onClose={handleCloseEditModal}
        onSubmit={handleConfirmDelete}
        idUser={selectedUser}
      />
    </TableContainer>
  )
}

export default CardUser
