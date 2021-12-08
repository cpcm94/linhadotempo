import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const SearchBar = styled.input`
  border: 1px solid ${colors.brown};
  border-right: none;
  border-left: none;
  width: 8rem;
  :focus {
    outline: 0;
  }
`

export const FilteringCategories = styled.div`
  display: flex;
  background-color: ${colors.white};
  border: 1px solid ${colors.brown};
  border-right: none;
  padding: 1px 0;
  border-radius: 5px 0 0 5px;
  margin-left: 0.25rem;
  max-width: max(25%, 5rem);
`

export const Category = styled.div`
  border-radius: 5px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : colors.lightBrown)};
  color: ${colors.black};
  margin-left: 0.25rem;
  display: block;
  white-space: nowrap; /* forces text to single line */
  overflow: hidden;
  text-overflow: ellipsis;
`
