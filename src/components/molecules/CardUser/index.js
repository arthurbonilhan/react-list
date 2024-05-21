import React from 'react'
import { Card, CardContent, CardActions } from '@material-ui/core'
import ButtonConfirm from '../../atoms/Button'
import Text from '../../atoms/Text'

const CardUser = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Text variant="h6">{user.name}</Text>
        <Text variant="subtitle1">{user.email}</Text>
        <Text variant="body2">{user.role}</Text>
      </CardContent>
      <CardActions>
        <ButtonConfirm label="Editar" />
        <ButtonConfirm label="Excluir" />
      </CardActions>
    </Card>
  )
}

export default CardUser
