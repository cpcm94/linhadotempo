import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { colors } from '../../colors'

export const EntryIcon = styled(({ ...other }) => (
  <Grid item={true} xs={1} {...other} />
))`
  background-color: ${colors.white};
  border: solid 1px #999;
  color: #655;
  border-radius: 2px;
  min-width: 0.8rem;
  min-height: 0.8rem;
  max-width: 0.8rem !important;
  max-height: 0.8rem;
  font-size: 0.8rem;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
`
