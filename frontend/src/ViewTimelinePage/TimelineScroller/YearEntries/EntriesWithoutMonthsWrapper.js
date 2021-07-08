import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const EntriesWithoutMonthsWrapper = styled(({ ...other }) => (
  <Grid container={true} {...other} />
))`
  display: flex;
`
