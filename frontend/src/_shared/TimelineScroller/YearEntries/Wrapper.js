import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const Wrapper = styled(({ color, ...other }) => (
  <Grid container={true} {...other} />
))`
  display: flex;
  min-height: 80px;
`
