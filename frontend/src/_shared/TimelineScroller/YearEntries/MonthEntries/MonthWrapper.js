import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import { colors } from '../../../colors'

export const MonthWrapper = styled(({ color, ...other }) => (
  <Grid item={true} xs={2} {...other} />
))`
  font-weight: bold;
  font-size: 0.85em;
  color: ${colors.grey};
`
