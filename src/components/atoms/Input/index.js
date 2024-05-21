import React from 'react'
import { TextField } from '@material-ui/core'

const Input = ({ label, ...props }) => {
  return <TextField label={label} {...props} />
}

export default Input
