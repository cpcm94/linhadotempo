import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../../../colors'
import Grid from '@material-ui/core/Grid'

export const EntryDateWrapper = styled(({ ...other }) => (
  <Grid item={true} xs={2} {...other} />
))`
  padding: 0 5px 0 0px;
  border-right: solid ${colors.lightBrown} 1px;
  font-weight: bold;
  font-size: 0.85em;
  color: ${colors.grey};
`
