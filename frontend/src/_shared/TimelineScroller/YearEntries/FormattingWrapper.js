import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const FormattingWrapper = styled(({ ...other }) => (
  <Grid item={true} xs={2} {...other} />
))``
