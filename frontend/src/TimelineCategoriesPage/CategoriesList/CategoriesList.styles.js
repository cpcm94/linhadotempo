import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const CategoriesListWrapper = styled.div`
  height: 100%;
`

export const CategoryNameWrapper = styled.div`
  flex: 1;
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

export const CategoryWrapper = styled.div`
  display: flex;
  cursor: pointer;
`
