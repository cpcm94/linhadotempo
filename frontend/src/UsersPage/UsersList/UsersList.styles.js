import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const UsersListWrapper = styled.div`
  height: 100%;
`

export const UserNameWrapper = styled.div`
  flex: 1;
`
export const EditButtonWrapper = styled.div`
  align-self: center;
  :hover {
    background-color: ${colors.lightBrown};
  }
`

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem 0 1rem 1.25rem;
  :hover {
    background-color: ${colors.lightBrown};
  }
`

export const UsersWrapper = styled.div`
  display: flex;
  cursor: pointer;
`
