import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import Grid from '@material-ui/core/Grid'
import { colors } from '../../../_shared/colors'

const newBackgroundColor = keyframes`
  from {
  background-color: ${colors.lightBrown};
  }
  to {
  background-color: ${colors.white};
  }
`

export const EntryAndIconWrapper = styled(({ ...other }) => (
  <Grid item={true} xs={12} {...other} />
))`
  display: flex;
  align-items: center;
  animation: ${({ isNew }) =>
    isNew
      ? css`
          ${newBackgroundColor} 4s
        `
      : null};
`
