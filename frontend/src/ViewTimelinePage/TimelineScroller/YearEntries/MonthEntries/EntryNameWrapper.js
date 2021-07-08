import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const EntryNameWrapper = styled(({ ...other }) => (
  <Grid item={true} xs={12} {...other} />
))`
  padding: 0 0 0 5px;
`
