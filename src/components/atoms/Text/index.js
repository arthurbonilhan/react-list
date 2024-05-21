import React from 'react'
import { Typography } from '@material-ui/core'

const Text = ({ variant, children }) => {
  return <Typography variant={variant}>{children}</Typography>
}

export default Text
