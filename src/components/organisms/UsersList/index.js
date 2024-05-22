import React from 'react'
import { Grid } from '@material-ui/core'
import CardUser from '../../molecules/CardUser'

const UsersList = ({ users, searchTerm, onOpenForm }) => {
  const filteredUsers = users?.filter((user) => {
    const searchText = searchTerm.toLowerCase()
    return (
      user?.nome?.toLowerCase().includes(searchText) ||
      user?.sobrenome?.toLowerCase().includes(searchText) ||
      user?.email?.toLowerCase().includes(searchText)
    )
  })

  return (
    <Grid container spacing={3}>
      <CardUser user={filteredUsers} onOpenForm={onOpenForm} />
    </Grid>
  )
}

export default UsersList
