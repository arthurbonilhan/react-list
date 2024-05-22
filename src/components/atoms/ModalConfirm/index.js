import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent } from '@material-ui/core'

const ModalConfirm = ({ open, onClose, onSubmit, idUser }) => {
  const handleSubmit = (event) => {
    onSubmit(idUser)
    onClose()
    window.location.reload()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="user-form-dialog-title">
      <DialogTitle id="user-form-dialog-title">Excluir usuário</DialogTitle>
      <DialogContent>
        <DialogContentText id="uuser-form-dialog-description">
          Não podemos reverter a ação. Tem certeza que deseja excluir este usuário?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="text" color="primary">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalConfirm
