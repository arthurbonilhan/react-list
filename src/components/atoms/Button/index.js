import React from 'react'
import { Button } from '@material-ui/core'

const ButtonConfirm = ({ label, ...props }) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      {label}
    </Button>
  )
}

export default ButtonConfirm
