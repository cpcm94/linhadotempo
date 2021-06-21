import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'

export const Wrapper = styled(({ color, ...other }) => (
  <Grid item={true} xs={12} {...other} />
))`
  display: flex;
  width: 100%;
`
