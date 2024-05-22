import React from 'react'
import { SearchRounded } from '@material-ui/icons'
import Input from '../../atoms/Input'

const SearchInput = ({ onChange }) => {
  return (
    <div className="search-input">
      <SearchRounded />
      <Input placeholder="Buscar usuário" onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

export default SearchInput
