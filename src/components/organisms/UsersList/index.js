import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { api } from '../../utils/api'
import CardUser from '../../molecules/CardUser'

const UsersList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.getUsers().then((response) => {
      setUsers(response.data)
    })
  }, [])

  return (
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid item xs={12} md={6} key={user.id}>
          <CardUser user={user} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UsersList
