import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const EntryNameWrapper = styled(({ ...other }) => (
  <Grid item={true} xs={9} {...other} />
))`
  padding-left: 5px;
`
