import styled from 'styled-components'
import { Paper as MuiPaper, Typography as MuiTypography } from '@material-ui/core'

const Paper = styled(MuiPaper)`
  border-radius: 4px;
  elevation: 3;
`

const Container = styled.div`
  background-color: #f5f5f5;
`

const Typography = styled(MuiTypography)`
  font-size: 16px;
  font-weight: bold;
`
const UserListContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  margin-top: 20px;
`

export { Paper, Container, Typography, UserListContainer }
