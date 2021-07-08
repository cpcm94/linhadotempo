import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const EntryAndIconWrapper = styled(({ ...other }) => (
  <Grid item={true} xs={12} {...other} />
))`
  display: flex;
  align-items: center;
`
