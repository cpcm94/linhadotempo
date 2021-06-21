import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'

export const EntriesWrapper = styled(({ color, ...other }) => (
  <Grid item={true} xs={10} {...other} />
))`
  display: flex;
  flex-direction: column;
`
