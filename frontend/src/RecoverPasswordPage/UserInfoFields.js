import React from 'react'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { colors } from '../_shared/colors'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
  flex: 1;
  margin-top: 2rem;
`

const StyledTextField = styled(TextField)`
  margin: 0.75rem 0 !important;
  label {
    color: ${colors.brown} !important;
  }
  .MuiSelect-root {
    min-width: 30px;
  }
  #userName {
    color: ${colors.black};
  }
  #userEmail {
    color: ${colors.black};
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: ${colors.brown} !important;
    }
    &.Mui-focused fieldset {
      border-color: ${colors.brown} !important;
    }
  }
`
export const UserInfoFields = ({ user }) => {
  return (
    <Wrapper>
      <StyledTextField
        type="text"
        id="userName"
        variant="outlined"
        label="Nome"
        value={user.name}
        disabled={true}
      />
      <StyledTextField
        type="text"
        id="userEmail"
        variant="outlined"
        label="Email"
        value={user.email}
        disabled={true}
      />
    </Wrapper>
  )
}

UserInfoFields.propTypes = {
  user: PropTypes.object,
}
