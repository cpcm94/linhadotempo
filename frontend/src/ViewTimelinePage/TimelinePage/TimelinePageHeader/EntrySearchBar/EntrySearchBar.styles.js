import styled from 'styled-components'
import { colors } from '../../../../_shared/colors'

export const SearchBar = styled.input`
  border: 1px solid ${colors.brown};
  border-bottom: none;
  max-width: 100%;
  border-radius: 5px 0 0 0;
  border-radius: ${({ chosenCategories }) =>
    chosenCategories[0] ? '5px 5px 0 0' : '5px 0 0 0'};
  :focus {
    outline: 0;
  }
`

export const FilteringCategories = styled.div`
  display: flex;
  background-color: ${colors.white};
  border: 1px solid ${colors.brown};
  border-top: none;
  padding: 1px 0;
  border-radius: ${({ chosenCategories }) =>
    chosenCategories[0] ? '0 0 5px 5px' : '0 0 0 5px'};
  width: 100%;
  flex-wrap: nowrap;
  overflow: hidden;
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
export const TextAndCategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  white-space: nowrap; /* forces text to single line */
  overflow: hidden;
  text-overflow: ellipsis;
`
