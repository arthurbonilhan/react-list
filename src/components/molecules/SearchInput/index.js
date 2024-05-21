import React from 'react'
import { Search } from '@material-ui/icons'
import Input from '../../atoms/Input'

const SearchInput = ({ onChange }) => {
  return (
    <div className="search-input">
      <Search />
      <Input placeholder="Buscar usuário" onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}

export default SearchInput
